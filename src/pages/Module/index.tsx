// src/pages/Module/index.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Play, FileText, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { EvidenceChain } from "@/components/games/EvidenceChain";
import { VoicesFirst } from "@/components/games/VoicesFirst";
import { EquityBuilder } from "@/components/games/EquityBuilder";
import { CloseTheLoop } from "@/components/games/CloseTheLoop";
import { EvidenceToAction } from "@/components/games/EvidenceToAction";
import { RisksOrRights } from "@/components/games/RisksOrRights";
import { KnowledgeCheck } from "@/components/KnowledgeCheck";
import { ScenarioActivity } from "@/components/interactive/ScenarioActivity";
import { ReflectionActivity } from "@/components/interactive/ReflectionActivity";
import CycleDiagram from "@/components/interactive/CycleDiagram";
import { SummaryFlashCards } from "@/components/interactive/SummaryFlashCards";
import { getModuleContent } from "./content";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Helper function to convert YouTube URLs to embed format
const convertToEmbedUrl = (url: string): string => {
  // Handle youtu.be format
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // Handle youtube.com/watch format
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const videoId = urlParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }
  // Already an embed URL or other format
  return url;
};

const Module = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSegment, setCurrentSegment] = useState(0);
  const [completedSegments, setCompletedSegments] = useState<Set<number>>(
    new Set()
  );
  const [segmentCompleted, setSegmentCompleted] = useState(false);

  const moduleContent = getModuleContent(parseInt(id || "1"));
  const currentContent = moduleContent.segments[currentSegment];
  const progress = ((currentSegment + 1) / moduleContent.totalSegments) * 100;

  // Check if current segment requires interaction to complete
  const requiresInteraction = () => {
    const type = currentContent.type;
    if (type === "game" || type === "quiz") return true;
    if (type === "interactive") return true;
    return false;
  };
 
   // Check if segment is a resources segment (Read/Listen/Watch)
   const isResourcesSegment = () => {
     return currentContent.type === "resources";
   };

  // Reset segment completion when changing segments
  useEffect(() => {
    if (requiresInteraction()) {
      setSegmentCompleted(false);
    } else {
      setSegmentCompleted(true);
    }
  }, [currentSegment, currentContent]);

  // Fetch progress data to sync with backend
  const { data: progressData } = useQuery({
    queryKey: ["userProgress"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiURL}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      return data;
    },
    enabled: !!token,
  });

  // Initialize completed segments from backend data
  useEffect(() => {
    if (progressData && progressData.modules) {
      const currentModule = progressData.modules.find(
        (mod) => mod.moduleId === parseInt(id)
      );

      if (currentModule) {
        // Collect all completed parts
        const completed = new Set<number>();
        currentModule.parts.forEach((part, idx) => {
          if (part.completed) {
            completed.add(idx);
          }
        });

        setCompletedSegments(completed);

        // Set current segment to first incomplete part
        let firstIncomplete = -1;
        for (let i = 0; i < currentModule.parts.length; i++) {
          if (!currentModule.parts[i].completed) {
            firstIncomplete = i;
            break;
          }
        }

        if (firstIncomplete !== -1) {
          setCurrentSegment(firstIncomplete);
        } else if (completed.size === currentModule.parts.length) {
          // All parts complete, stay at last one
          setCurrentSegment(currentModule.parts.length - 1);
        }
      }
    }
  }, [progressData, id]);

  useEffect(() => {
    setCurrentSegment(0);
    setCompletedSegments(new Set());
  }, [id]);

  // Mutation to mark part as complete
  const markPartCompleteMutation = useMutation({
    mutationFn: async ({
      partId,
      completed,
    }: {
      partId: number;
      completed: boolean;
    }) => {
      const { data } = await axios.put(
        `${apiURL}/progress/module/${id}/part/${partId}`,
        { completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
      toast.success("Progress saved!");
    },
    onError: (error) => {
      console.error("Error marking part as complete:", error);
      toast.error("Failed to save progress");
    },
  });

  const markCurrentSegmentComplete = async () => {
    // Only mark if not already completed
    if (!completedSegments.has(currentSegment)) {
      setCompletedSegments((prev) => new Set([...prev, currentSegment]));
      const partId = currentSegment + 1; // Parts are 1-indexed
      await markPartCompleteMutation.mutateAsync({ partId, completed: true });
    }
  };

  const handleNext = async () => {
    // Check if segment requires completion
    if (requiresInteraction() && !segmentCompleted) {
      toast.error("Please complete the activity before proceeding.");
      return;
    }

    // Mark current segment as complete before moving
    await markCurrentSegmentComplete();

    if (currentSegment < moduleContent.totalSegments - 1) {
      setCurrentSegment(currentSegment + 1);
    } else {
      // All segments completed - redirect to assessment
      toast.success("Module content completed! Time for the assessment.");
      navigate(`/quiz/${id}`);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  // Handler for when interactive segments are completed
  const handleSegmentComplete = () => {
    setSegmentCompleted(true);
  };

  // Calculate actual progress from backend data
  const actualProgress =
    progressData?.modules?.find((mod) => mod.moduleId === parseInt(id))
      ?.progress || 0;

  // Check if next button should be disabled
  const isNextDisabled =
    markPartCompleteMutation.isPending ||
    (requiresInteraction() && !segmentCompleted);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  Module {id}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(actualProgress)}% Complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              {moduleContent.title}
            </h1>
            <span className="text-sm font-semibold text-primary">
              {Math.round(actualProgress)}%
            </span>
          </div>
          <Progress value={actualProgress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Segment {currentSegment + 1} of {moduleContent.totalSegments}
          </p>
        </div>

        {/* Segment Progress Indicators */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: moduleContent.totalSegments }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (completedSegments.has(idx) || idx <= currentSegment) {
                  setCurrentSegment(idx);
                }
              }}
              className={`flex-shrink-0 h-2 rounded-full transition-all ${completedSegments.has(idx)
                ? "bg-success w-8"
                : idx === currentSegment
                  ? "bg-primary w-12"
                  : idx < currentSegment
                    ? "bg-primary/50 w-8"
                    : "bg-muted w-8"
                }`}
              disabled={idx > currentSegment && !completedSegments.has(idx)}
            />
          ))}
        </div>

        {/* Learning Objectives Card */}
        {currentSegment === 0 && (
          <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Explain the basic purpose and structure of PPPR systems at
                    global and national levels
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Describe the origins, purpose, and principles of CLM in
                    health and development contexts
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Identify the linkages and gaps between institutional
                    preparedness systems and community realities
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Reflect on why integrating community voices into
                    preparedness is not optional but essential
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Main Content Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl mb-2">
                  {currentContent.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {currentContent.type === "reading" && (
                    <FileText className="h-4 w-4" />
                  )}
                  {currentContent.type === "interactive" && (
                    <Play className="h-4 w-4" />
                  )}
                 {currentContent.type === "resources" && (
                   <BookOpen className="h-4 w-4" />
                 )}
                  {currentContent.duration}
                </CardDescription>
              </div>
              {/* Show completion badge if segment is completed */}
              {completedSegments.has(currentSegment) && (
                <div className="flex items-center gap-1 text-success text-sm font-medium">
                  <BookOpen className="h-4 w-4" />
                  Completed
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Your existing content rendering logic */}
             {currentContent.type === "resources" ? (
               <div className="py-4">
                 {currentContent.summaryCards && currentContent.summaryCards.length > 0 && (
                   <SummaryFlashCards cards={currentContent.summaryCards} />
                 )}
               </div>
             ) : currentContent.type === "game" ? (
              <div className="py-4">
                {currentContent.gameType === "evidence-chain" && (
                  <EvidenceChain onComplete={handleSegmentComplete} />
                )}
                {currentContent.gameType === "voices-first" && (
                  <VoicesFirst onComplete={handleSegmentComplete} />
                )}
                {currentContent.gameType === "equity-builder" && (
                  <EquityBuilder onComplete={handleSegmentComplete} />
                )}
                {currentContent.gameType === "close-the-loop" && (
                  <CloseTheLoop onComplete={handleSegmentComplete} />
                )}
                {currentContent.gameType === "evidence-to-action" && (
                  <EvidenceToAction onComplete={handleSegmentComplete} />
                )}
                {currentContent.gameType === "risks-or-rights" && (
                  <RisksOrRights onComplete={handleSegmentComplete} />
                )}
              </div>
            ) : currentContent.type === "quiz" ? (
              <KnowledgeCheck
                question={currentContent.question!}
                options={currentContent.options!}
                onComplete={handleSegmentComplete}
              />
            ) : currentContent.type === "interactive" ? (
              <div className="py-4">
                {currentContent.interactiveType === "scenario" &&
                  currentContent.scenarioData && (
                    <ScenarioActivity
                      scenario={currentContent.scenarioData.scenario}
                      question={currentContent.scenarioData.question}
                      prompts={currentContent.scenarioData.prompts}
                      sampleResponse={
                        currentContent.scenarioData.sampleResponse
                      }
                      onComplete={handleSegmentComplete}
                    />
                  )}
                {currentContent.interactiveType === "reflection" &&
                  currentContent.reflectionData && (
                    <ReflectionActivity
                      title={currentContent.reflectionData.title}
                      context={currentContent.reflectionData.context}
                      prompts={currentContent.reflectionData.prompts}
                      closingQuote={currentContent.reflectionData.closingQuote}
                      onComplete={handleSegmentComplete}
                      moduleId={parseInt(id)}
                      segmentId={currentSegment}
                    />
                  )}
              </div>
            ) : (currentContent.videoUrl || currentContent.videos) ? (
              <Tabs defaultValue="read" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="read">Read</TabsTrigger>
                  <TabsTrigger value="watch">Watch</TabsTrigger>
                </TabsList>

                <TabsContent value="read" className="space-y-4">
                  <div className="max-w-none space-y-4">
                    {(() => {
                      const parts = currentContent.content.split(
                        /(<ol>[\s\S]*?<\/ol>|<ul>[\s\S]*?<\/ul>)/
                      );

                      const contentElements = parts.map((part, idx) => {
                        const trimmed = part.trim();
                        if (!trimmed) return null;

                        if (trimmed.startsWith("<ol>")) {
                          return (
                            <ol
                              key={idx}
                              className="list-decimal pl-6 space-y-2 text-muted-foreground"
                              dangerouslySetInnerHTML={{
                                __html: trimmed
                                  .replace("<ol>", "")
                                  .replace("</ol>", ""),
                              }}
                            />
                          );
                        }

                        if (trimmed.startsWith("<ul>")) {
                          return (
                            <ul
                              key={idx}
                              className="list-disc pl-6 space-y-2 text-muted-foreground"
                              dangerouslySetInnerHTML={{
                                __html: trimmed
                                  .replace("<ul>", "")
                                  .replace("</ul>", ""),
                              }}
                            />
                          );
                        }

                        return trimmed
                          .split("\n\n")
                          .map((p, pIdx) => (
                            <p
                              key={`${idx}-${pIdx}`}
                              className="text-muted-foreground leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: p }}
                            />
                          ));
                      });

                      if (currentContent.cycleDiagram) {
                        const firstParagraphIndex = contentElements.findIndex(
                          (el) => el !== null
                        );
                        if (firstParagraphIndex !== -1) {
                          contentElements.splice(
                            firstParagraphIndex + 1,
                            0,
                            <CycleDiagram
                              key="cycle-diagram"
                              title={currentContent.cycleDiagram.title}
                              steps={currentContent.cycleDiagram.steps}
                            />
                          );
                        }
                      }

                      return contentElements;
                    })()}
                  </div>

                  {/* Summary Flashcards */}
                  {currentContent.summaryCards && currentContent.summaryCards.length > 0 && (
                    <SummaryFlashCards cards={currentContent.summaryCards} />
                  )}
                </TabsContent>

                <TabsContent value="watch">
                  <div className="space-y-6">
                    {currentContent.videoUrl && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          Introduction
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          IHR Monitoring and Evaluation Framework Tutorial
                        </p>
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <video
                            controls
                            className="w-full h-full"
                            src={currentContent.videoUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )}
                    {currentContent.videos?.map((video, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {video.label}
                        </h4>
                        {video.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {video.description}
                          </p>
                        )}
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <iframe
                            src={convertToEmbedUrl(video.url)}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.label}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              // Reading-only content (no video)
              <div className="max-w-none space-y-4">
                {(() => {
                  const parts = currentContent.content.split(
                    /(<ol>[\s\S]*?<\/ol>|<ul>[\s\S]*?<\/ul>)/
                  );

                  const contentElements = parts.map((part, idx) => {
                    const trimmed = part.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith("<ol>")) {
                      return (
                        <ol
                          key={idx}
                          className="list-decimal pl-6 space-y-2 text-muted-foreground"
                          dangerouslySetInnerHTML={{
                            __html: trimmed
                              .replace("<ol>", "")
                              .replace("</ol>", ""),
                          }}
                        />
                      );
                    }

                    if (trimmed.startsWith("<ul>")) {
                      return (
                        <ul
                          key={idx}
                          className="list-disc pl-6 space-y-2 text-muted-foreground"
                          dangerouslySetInnerHTML={{
                            __html: trimmed
                              .replace("<ul>", "")
                              .replace("</ul>", ""),
                          }}
                        />
                      );
                    }

                    return trimmed
                      .split("\n\n")
                      .map((p, pIdx) => (
                        <p
                          key={`${idx}-${pIdx}`}
                          className="text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      ));
                  });

                  if (currentContent.cycleDiagram) {
                    const firstParagraphIndex = contentElements.findIndex(
                      (el) => el !== null
                    );
                    if (firstParagraphIndex !== -1) {
                      contentElements.splice(
                        firstParagraphIndex + 1,
                        0,
                        <CycleDiagram
                          key="cycle-diagram"
                          title={currentContent.cycleDiagram.title}
                          steps={currentContent.cycleDiagram.steps}
                        />
                      );
                    }
                  }

                  return contentElements;
                })()}

                {/* Summary Flashcards for reading-only content */}
                {currentContent.summaryCards && currentContent.summaryCards.length > 0 && (
                  <SummaryFlashCards cards={currentContent.summaryCards} />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSegment === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
            disabled={isNextDisabled}
          >
            {markPartCompleteMutation.isPending ? (
              "Saving..."
            ) : isNextDisabled && requiresInteraction() ? (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Complete Activity
              </>
            ) : currentSegment === moduleContent.totalSegments - 1 ? (
              "Take Assessment"
            ) : (
              "Next"
            )}
            {!isNextDisabled && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module;
