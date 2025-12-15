import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface KnowledgeCheckProps {
  question: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

export const KnowledgeCheck = ({ question, options }: KnowledgeCheckProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const selected = options.find((opt) => opt.id === selectedAnswer);
    if (selected) {
      setIsCorrect(selected.isCorrect);
      setHasSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-muted/30 rounded-lg border-2 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {question}
        </h3>

        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          disabled={hasSubmitted}
        >
          <div className="space-y-3">
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  hasSubmitted
                    ? option.isCorrect
                      ? "bg-green-50 border-green-300 dark:bg-green-950 dark:border-green-800"
                      : selectedAnswer === option.id
                      ? "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-800"
                      : "bg-background border-border"
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-foreground"
                >
                  {option.text}
                </Label>
                {hasSubmitted && option.isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}
                {hasSubmitted &&
                  !option.isCorrect &&
                  selectedAnswer === option.id && (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
              </div>
            ))}
          </div>
        </RadioGroup>

        {!hasSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="mt-4 w-full"
          >
            Check Answer
          </Button>
        ) : (
          <div className="mt-4 space-y-3">
            <div
              className={`p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100"
                  : "bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100"
              }`}
            >
              <p className="font-medium">
                {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p className="text-sm mt-1">
                {isCorrect
                  ? "Great job! You've understood this concept well."
                  : "Review the material and try again."}
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
