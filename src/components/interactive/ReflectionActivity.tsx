import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ReflectionPrompt {
  id: number;
  question: string;
}

interface ReflectionActivityProps {
  title: string;
  context: string;
  prompts: ReflectionPrompt[];
  closingQuote?: string;
}

export const ReflectionActivity = ({
  title,
  context,
  prompts,
  closingQuote,
}: ReflectionActivityProps) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentPrompt = prompts[currentPromptIndex];
  const currentResponse = responses[currentPrompt?.id] || "";
  const isLastPrompt = currentPromptIndex === prompts.length - 1;
  const isValidResponse = currentResponse.trim().length >= 10;

  const handleResponseChange = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [currentPrompt.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastPrompt) {
      setIsComplete(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e41f28', '#007a87', '#a9d04f']
      });
    } else {
      setCurrentPromptIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentPromptIndex(0);
    setResponses({});
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border-green-200 dark:border-green-800">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Reflection Complete!
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for taking the time to reflect deeply. Your thoughts contribute to building a more community-centered understanding of health systems.
            </p>
          </div>
        </Card>

        {/* Summary of Reflections */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Your Reflections:</h4>
          {prompts.map((prompt, idx) => (
            <Card key={prompt.id} className="p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {idx + 1}. {prompt.question}
              </p>
              <p className="text-sm text-foreground">{responses[prompt.id]}</p>
            </Card>
          ))}
        </div>

        {closingQuote && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex gap-3">
              <Quote className="h-6 w-6 text-primary shrink-0" />
              <p className="text-foreground italic">{closingQuote}</p>
            </div>
          </Card>
        )}

        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reflect Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-2">{title}</Badge>
            <p className="text-muted-foreground">{context}</p>
          </div>
        </div>
      </Card>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2">
        {prompts.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              idx === currentPromptIndex
                ? "bg-primary"
                : idx < currentPromptIndex
                ? "bg-green-500"
                : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Current Prompt */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
            {currentPromptIndex + 1}
          </span>
          <p className="text-lg font-medium text-foreground pt-1">
            {currentPrompt.question}
          </p>
        </div>

        <Textarea
          placeholder="Take your time to reflect... There's no right or wrong answer."
          value={currentResponse}
          onChange={(e) => handleResponseChange(e.target.value)}
          className="min-h-[120px] resize-none"
        />

        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm",
            isValidResponse ? "text-green-600" : "text-muted-foreground"
          )}>
            {currentResponse.trim().length} characters
            {isValidResponse && <CheckCircle2 className="inline-block ml-1 h-4 w-4" />}
          </p>
          
          <Button 
            onClick={handleNext}
            disabled={!isValidResponse}
            className="gap-2"
          >
            {isLastPrompt ? "Complete Reflection" : "Next Question"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Previously answered */}
      {currentPromptIndex > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">Previous reflections:</p>
          <div className="space-y-2">
            {prompts.slice(0, currentPromptIndex).map((prompt, idx) => (
              <Card key={prompt.id} className="p-3 bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">{idx + 1}. {prompt.question}</p>
                <p className="text-sm text-foreground truncate">{responses[prompt.id]}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
