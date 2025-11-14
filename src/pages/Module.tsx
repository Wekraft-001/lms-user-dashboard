import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Play, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Module = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSegment, setCurrentSegment] = useState(0);

  const moduleContent = {
    title: "Foundations of PPR and CLM",
    description: "Understanding pandemic preparedness and community-led monitoring basics",
    totalSegments: 4,
    segments: [
      {
        title: "Introduction to Pandemic Preparedness",
        type: "reading",
        content: `Pandemic preparedness isn't just about stockpiling medical supplies or having emergency plans on paper. It's about having living, breathing systems that can respond when crisis strikes—systems that include the voices and actions of communities themselves.

Community-Led Monitoring (CLM) has transformed how we approach health accountability. Rather than waiting for problems to be discovered through formal channels, communities identify issues in real-time, creating feedback loops that save lives.

When COVID-19 emerged, countries with strong CLM systems were able to identify service gaps, address misinformation, and ensure equitable access to care. Communities weren't just recipients of pandemic response—they were leaders in it.`,
        videoUrl: "https://example.com/intro-video",
        duration: "10 min"
      },
      {
        title: "What is Community-Led Monitoring?",
        type: "interactive",
        content: `CLM puts communities at the center of health system accountability. It's based on a simple but powerful principle: those closest to health services are best positioned to monitor their quality and accessibility.

Key principles of CLM:
• Community ownership and leadership
• Evidence-based advocacy
• Real-time data collection
• Transparent reporting
• Actionable feedback loops`,
        duration: "12 min"
      },
      {
        title: "The Connection Between CLM and PPR",
        type: "reading",
        content: `Think of CLM as the early warning system for pandemic preparedness. When communities are actively monitoring health services, they notice changes immediately—unusual patterns, supply shortages, or access barriers that could signal the start of an outbreak.

This integration isn't automatic. It requires intentional design, capacity building, and commitment from both communities and health systems. But when done right, it creates resilience that extends far beyond any single pandemic.`,
        duration: "8 min"
      },
      {
        title: "Knowledge Check",
        type: "quiz",
        content: "Test your understanding of CLM and PPR fundamentals",
        duration: "5 min"
      }
    ]
  };

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
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Module {id}</p>
                <p className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">{moduleContent.title}</h1>
            <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
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
                  <span>Understand the fundamentals of pandemic preparedness frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Learn the core principles of Community-Led Monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Recognize the vital connection between CLM and PPR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Identify key stakeholders in effective pandemic response</span>
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
                <CardTitle className="text-xl mb-2">{currentContent.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {currentContent.type === "reading" && <FileText className="h-4 w-4" />}
                  {currentContent.type === "interactive" && <Play className="h-4 w-4" />}
                  {currentContent.duration}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="read" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="read">Read</TabsTrigger>
                {currentContent.videoUrl && <TabsTrigger value="watch">Watch</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="read" className="space-y-4">
                <div className="prose prose-slate max-w-none">
                  {currentContent.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {currentContent.type === "interactive" && (
                  <div className="mt-6 p-6 bg-muted/50 rounded-lg border-2 border-dashed border-primary/30">
                    <p className="text-center text-muted-foreground italic">
                      💡 Interactive element: Reflection prompt or mini-activity would appear here
                    </p>
                  </div>
                )}
              </TabsContent>

              {currentContent.videoUrl && (
                <TabsContent value="watch">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Video player would be embedded here</p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
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
          >
            {currentSegment === moduleContent.totalSegments - 1 ? "Complete Module" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module;
