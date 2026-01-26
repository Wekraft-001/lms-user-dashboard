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
import { ArrowLeft, ArrowRight, BookOpen, Play, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { EvidenceChain } from "@/components/games/EvidenceChain";
import { VoicesFirst } from "@/components/games/VoicesFirst";
import { EquityBuilder } from "@/components/games/EquityBuilder";
import { KnowledgeCheck } from "@/components/KnowledgeCheck";
import { ScenarioActivity } from "@/components/interactive/ScenarioActivity";
import { ReflectionActivity } from "@/components/interactive/ReflectionActivity";
import CycleDiagram from "@/components/interactive/CycleDiagram";
import { getModuleContent } from "./content";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const Module = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const moduleId = parseInt(id || "1");
  const moduleContent = getModuleContent(moduleId);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [completedSegments, setCompletedSegments] = useState(new Set());
  const currentContent = moduleContent.segments[currentSegment];
  const progress = ((currentSegment + 1) / moduleContent.totalSegments) * 100;

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
        // Get completed parts from backend
        const completed = new Set(
          currentModule.parts
            .filter((part) => part.completed)
            .map((part) => part.partId - 1)
        );
        setCompletedSegments(completed);

        // Set current segment to first incomplete part
        const firstIncomplete = currentModule.parts.findIndex(
          (part) => !part.completed
        );
        if (firstIncomplete !== -1) {
          setCurrentSegment(firstIncomplete);
        }
      }
    }
  }, [progressData, id]);

  // Mutation to update module progress percentage
  const updateModuleProgressMutation = useMutation({
    mutationFn: async (progressPercentage: number) => {
      const { data } = await axios.put(
        `${apiURL}/progress/module/${id}`,
        { progress: progressPercentage },
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
    },
    onError: (error) => {
      console.error("Error updating module progress:", error);
      toast.error("Failed to save progress");
    },
  });

  // Mutation to mark a part (segment) as complete
  const markPartCompleteMutation = useMutation({
    mutationFn: async ({ partId, completed }: { partId: number; completed: boolean }) => {
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
    },
    onError: (error) => {
      console.error("Error marking part as complete:", error);
      toast.error("Failed to save progress");
    },
  });

  // Mark current segment as complete when moving forward
  const markCurrentSegmentComplete = async () => {
    const partId = currentSegment + 1; //Parts are 1-indexed in backend

    // Add to complete segments locally
    setCompletedSegments((prev) => new Set([...prev, currentSegment]));

    // Update backend - mark part as complete
    await markPartCompleteMutation.mutateAsync({ partId, completed: true });

    // Calculate and update overall module progress
    const newCompletedCount = completedSegments.size + 1;
    const newProgress = Math.round(
      (newCompletedCount / moduleContent.totalSegments) * 100
    );

    // Update module progress percentage
    await updateModuleProgressMutation.mutateAsync(newProgress);
  };

  const handleNext = async () => {
    // Mark current segment as complete before moving
    await markCurrentSegmentComplete();

    if (currentSegment < moduleContent.totalSegments - 1) {
      setCurrentSegment(currentSegment + 1);
    } else {
      toast.success("Content completed! Moving to assessment...");
      // Don't set to 100% here - that only happens when quiz is passed
      // Calculate content progress (max 80% without assessment)
      const contentProgress = Math.min(80, Math.round(
        (moduleContent.totalSegments / moduleContent.totalSegments) * 80
      ));
      await updateModuleProgressMutation.mutateAsync(contentProgress);
      navigate("/quiz/" + id);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  // Auto-save progress when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (completedSegments.has(currentSegment)) return;

      // Calculate current progress
      const currentProgress = Math.round(
        ((currentSegment + 1) / moduleContent.totalSegments) * 100
      );

      // Save progress before leaving
      updateModuleProgressMutation.mutate(currentProgress);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentSegment, completedSegments]);

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
                  {Math.round(progress)}% Complete
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
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Segment {currentSegment + 1} of {moduleContent.totalSegments}
          </p>
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
                  {currentContent.duration}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentContent.type === "game" ? (
              <div className="py-4">
                {currentContent.gameType === "evidence-chain" && (
                  <EvidenceChain />
                )}
                {currentContent.gameType === "voices-first" && <VoicesFirst />}
                {currentContent.gameType === "equity-builder" && (
                  <EquityBuilder />
                )}
              </div>
            ) : currentContent.type === "quiz" ? (
              <KnowledgeCheck
                question={currentContent.question!}
                options={currentContent.options!}
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
                    />
                  )}
                {currentContent.interactiveType === "reflection" &&
                  currentContent.reflectionData && (
                    <ReflectionActivity
                      title={currentContent.reflectionData.title}
                      context={currentContent.reflectionData.context}
                      prompts={currentContent.reflectionData.prompts}
                      closingQuote={currentContent.reflectionData.closingQuote}
                    />
                  )}
              </div>
            ) : (
              <Tabs defaultValue="read" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="read">Read</TabsTrigger>
                  {(currentContent.videoUrl || currentContent.videos) && (
                    <TabsTrigger value="watch">Watch</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="read" className="space-y-4">
                  <div className="max-w-none space-y-4">
                    {(() => {
                      // Split content but preserve HTML structure
                      const parts = currentContent.content.split(
                        /(<ol>[\s\S]*?<\/ol>|<ul>[\s\S]*?<\/ul>)/
                      );

                      const contentElements = parts.map((part, idx) => {
                        const trimmed = part.trim();
                        if (!trimmed) return null;

                        // Check if this part is an ordered list
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

                        // Check if this part is an unordered list
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

                        // Regular text - split into paragraphs
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

                      // Insert cycle diagram after first paragraph if present
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
                </TabsContent>

                {(currentContent.videoUrl || currentContent.videos) && (
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
                      {currentContent.videos?.map((video, idx) => {
                        // Convert YouTube URLs to embed format
                        const getEmbedUrl = (url: string) => {
                          // Handle youtu.be format
                          const youtubeShortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
                          if (youtubeShortMatch) {
                            return `https://www.youtube.com/embed/${youtubeShortMatch[1]}`;
                          }
                          // Handle youtube.com/watch?v= format
                          const youtubeMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
                          if (youtubeMatch) {
                            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
                          }
                          // Already embed format or other URL
                          return url;
                        };
                        
                        return (
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
                                src={getEmbedUrl(video.url)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.label}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
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
            disabled={
              updateModuleProgressMutation.isPending ||
              markPartCompleteMutation.isPending
            }
          >
            {updateModuleProgressMutation.isPending ||
            markPartCompleteMutation.isPending
              ? "Saving..."
              : currentSegment === moduleContent.totalSegments - 1
              ? "Complete Module"
              : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module;
