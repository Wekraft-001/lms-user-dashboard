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
  Quote,
  AlertCircle
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
  onComplete?: () => void;
}

// Check if response is gibberish or low quality
const isQualityResponse = (text: string): boolean => {
  if (!text || text.trim().length < 10) return false;
  
  const words = text.trim().split(/\s+/);
  
  // Check for minimum word count (at least 5 words for reflection)
  if (words.length < 5) return false;
  
  // Check for repeated characters (like "asdfasdf")
  const hasRepeatedPatterns = /(.)\1{4,}/.test(text);
  if (hasRepeatedPatterns) return false;
  
  // Check if most words are very short (potential gibberish)
  const shortWords = words.filter(w => w.length <= 2);
  if (shortWords.length / words.length > 0.7) return false;
  
  // Check for random character sequences
  const randomPattern = /[^aeiou]{5,}/i;
  const randomMatches = text.match(randomPattern);
  if (randomMatches && randomMatches.length > 2) return false;
  
  // Check for minimal vowel content (indicates keyboard mashing)
  const vowelCount = (text.match(/[aeiou]/gi) || []).length;
  const letterCount = (text.match(/[a-z]/gi) || []).length;
  if (letterCount > 0 && vowelCount / letterCount < 0.15) return false;
  
  return true;
};

export const ReflectionActivity = ({
  title,
  context,
  prompts,
  closingQuote,
  onComplete,
}: ReflectionActivityProps) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showError, setShowError] = useState(false);

  const currentPrompt = prompts[currentPromptIndex];
  const currentResponse = responses[currentPrompt?.id] || "";
  const isLastPrompt = currentPromptIndex === prompts.length - 1;
  const isValidLength = currentResponse.trim().length >= 10;
  const isQuality = isQualityResponse(currentResponse);

  const handleResponseChange = (value: string) => {
    setShowError(false);
    setResponses(prev => ({
      ...prev,
      [currentPrompt.id]: value
    }));
  };

  const handleNext = () => {
    // Validate response quality
    if (!isQuality) {
      setShowError(true);
      return;
    }
    
    if (isLastPrompt) {
      setIsComplete(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e41f28', '#007a87', '#a9d04f']
      });
      onComplete?.();
    } else {
      setCurrentPromptIndex(prev => prev + 1);
      setShowError(false);
    }
  };

  const handleReset = () => {
    setCurrentPromptIndex(0);
    setResponses({});
    setIsComplete(false);
    setShowError(false);
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
          placeholder="Take your time to reflect... Share your genuine thoughts and experiences."
          value={currentResponse}
          onChange={(e) => handleResponseChange(e.target.value)}
          className={cn(
            "min-h-[120px] resize-none",
            showError && "border-amber-500 focus-visible:ring-amber-500"
          )}
        />

        {showError && (
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">
              Please provide a more thoughtful response. Share your genuine reflections on the question.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm",
            isValidLength ? "text-green-600" : "text-muted-foreground"
          )}>
            {currentResponse.trim().length} characters
            {isValidLength && <CheckCircle2 className="inline-block ml-1 h-4 w-4" />}
          </p>
          
          <Button 
            onClick={handleNext}
            disabled={!isValidLength}
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
