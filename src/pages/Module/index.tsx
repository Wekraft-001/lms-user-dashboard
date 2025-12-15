import { useState } from "react";
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
import { moduleContent } from "./content";

const Module = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSegment, setCurrentSegment] = useState(0);

  const currentContent = moduleContent.segments[currentSegment];
  const progress = ((currentSegment + 1) / moduleContent.totalSegments) * 100;

  const handleNext = () => {
    if (currentSegment < moduleContent.totalSegments - 1) {
      setCurrentSegment(currentSegment + 1);
    } else {
      toast.success("Module completed! Moving to assessment...");
      navigate("/quiz/" + id);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

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
                    Explain the basic purpose and structure of PPR systems at
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
            ) : (
              <Tabs defaultValue="read" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="read">Read</TabsTrigger>
                  {currentContent.videoUrl && (
                    <TabsTrigger value="watch">Watch</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="read" className="space-y-4">
                  {/* <div className="prose prose-slate max-w-none">
                    {currentContent.content
                      .split("\n\n")
                      .map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-muted-foreground leading-relaxed mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div> */}
                  <div className="max-w-none space-y-4">
                    {(() => {
                      // Split content but preserve HTML structure
                      const parts = currentContent.content.split(
                        /(<ol>[\s\S]*?<\/ol>|<ul>[\s\S]*?<\/ul>)/
                      );

                      return parts.map((part, idx) => {
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
                    })()}
                  </div>
                  {currentContent.type === "interactive" && (
                    <div className="mt-6 p-6 bg-muted/50 rounded-lg border-2 border-dashed border-primary/30">
                      <p className="text-center text-muted-foreground italic">
                        💡 Interactive element: Reflection prompt or
                        mini-activity would appear here
                      </p>
                    </div>
                  )}
                </TabsContent>

                {currentContent.videoUrl && (
                  <TabsContent value="watch">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-full"
                        src={currentContent.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
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
          <Button onClick={handleNext} className="flex-1">
            {currentSegment === moduleContent.totalSegments - 1
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
