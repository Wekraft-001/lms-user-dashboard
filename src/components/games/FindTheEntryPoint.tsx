import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface EvidenceCard {
  id: number;
  evidence: string;
  correctProcess: string;
  explanation: string;
}

const evidenceCards: EvidenceCard[] = [
  {
    id: 1,
    evidence: "Community reports show IPC failures in peripheral clinics",
    correctProcess: "Emergency Task Team",
    explanation:
      "This is urgent, operational information about an ongoing failure in infection prevention and control. An active Emergency Task Team can act immediately to investigate, re-supply, retrain, or reinforce protocols.",
  },
  {
    id: 2,
    evidence: "Migrant workers excluded from emergency plans",
    correctProcess: "National Action Plan",
    explanation:
      "This is a systemic gap in preparedness. The National Action Plan outlines who is covered and how. Integrating this evidence here ensures future plans are inclusive.",
  },
  {
    id: 3,
    evidence: "Oxygen supplies present but not functional",
    correctProcess: "Response Dashboard",
    explanation:
      "This is a critical, real-time status update during a response. A Response Dashboard tracks key resources. Placing it here triggers immediate action—maintenance, redistribution, or alternative sourcing.",
  },
  {
    id: 4,
    evidence: "Risk communication not reaching informal settlements",
    correctProcess: "After-Action Review",
    explanation:
      "This is a key lesson learned about a failure in the response system. The After-Action Review process captures such lessons to improve future plans and messaging approaches.",
  },
];

const pprProcesses = [
  {
    id: "preparedness",
    label: "Preparedness Assessment",
    description: "Evaluates national capacities and identifies gaps",
  },
  {
    id: "national-plan",
    label: "National Action Plan",
    description: "Strategic document outlining priorities and coverage",
  },
  {
    id: "task-team",
    label: "Emergency Task Team",
    description: "Operational body managing active response",
  },
  {
    id: "dashboard",
    label: "Response Dashboard",
    description: "Real-time tracking of resources and indicators",
  },
  {
    id: "after-action",
    label: "After-Action Review",
    description: "Post-crisis learning and documentation",
  },
];

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#e41f28", "#002776", "#007a87", "#a9d04f"],
  });
};

interface FindTheEntryPointProps {
  onComplete?: () => void;
}

export const FindTheEntryPoint = ({ onComplete }: FindTheEntryPointProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = evidenceCards[currentIndex];
  const isCorrect = selectedProcess === currentCard.correctProcess;

  const handleProcessSelect = (processLabel: string) => {
    if (showResult) return;
    setSelectedProcess(processLabel);
  };

  const handleSubmit = () => {
    if (!selectedProcess) return;
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < evidenceCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedProcess(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
      if (correctAnswers >= evidenceCards.length - 1) {
        triggerConfetti();
      }
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedProcess(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((correctAnswers / evidenceCards.length) * 100);
    const passed = percentage >= 75;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Find the Entry Point
          </h3>
        </div>

        <Card
          className={cn(
            "p-6 text-center",
            passed
              ? "bg-success/10 border-success"
              : "bg-amber-50 border-amber-300 dark:bg-amber-950/20"
          )}
        >
          <div className="space-y-4">
            <div
              className={cn(
                "text-4xl font-bold",
                passed ? "text-success" : "text-amber-600"
              )}
            >
              {correctAnswers} / {evidenceCards.length}
            </div>
            <p
              className={cn(
                "font-semibold text-lg",
                passed ? "text-success" : "text-amber-600"
              )}
            >
              {passed
                ? "Excellent! You understand how to match evidence to entry points!"
                : "Good effort! Review the entry points and try again."}
            </p>
            <p className="text-muted-foreground">
              Evidence creates impact only when it meets the right process at
              the right moment. Timing and governance shape what gets heard.
            </p>
            {!passed && (
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          Find the Entry Point
        </h3>
        <p className="text-muted-foreground">
          Match each CLM finding to the PPPR process where it will have the most
          impact
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-medium">Evidence:</div>
          <div className="text-2xl font-bold text-primary">
            {currentIndex + 1} / {evidenceCards.length}
          </div>
        </div>
      </div>

      {/* Evidence Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="space-y-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wide">
            CLM Finding
          </p>
          <p className="text-lg font-medium text-foreground">
            "{currentCard.evidence}"
          </p>
        </div>
      </Card>

      {/* Process Options */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">
          Which PPPR process is the best entry point?
        </p>
        <div className="grid gap-3">
          {pprProcesses.map((process) => {
            const isSelected = selectedProcess === process.label;
            const isCorrectAnswer =
              showResult && process.label === currentCard.correctProcess;
            const isWrongAnswer = showResult && isSelected && !isCorrect;

            return (
              <Card
                key={process.id}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  isSelected &&
                    !showResult &&
                    "ring-2 ring-primary bg-primary/5",
                  isCorrectAnswer && "bg-success/10 border-success",
                  isWrongAnswer && "bg-destructive/10 border-destructive",
                  !showResult && !isSelected && "hover:bg-muted/50"
                )}
                onClick={() => handleProcessSelect(process.label)}
              >
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {process.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {process.description}
                    </p>
                  </div>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  )}
                  {isWrongAnswer && (
                    <XCircle className="w-5 h-5 text-destructive shrink-0" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showResult && (
        <Card
          className={cn(
            "p-4",
            isCorrect
              ? "bg-success/10 border-success"
              : "bg-amber-50 border-amber-300 dark:bg-amber-950/20"
          )}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className={cn(
                  "font-medium",
                  isCorrect ? "text-success" : "text-amber-600"
                )}
              >
                {isCorrect
                  ? "Correct!"
                  : `The best entry point is: ${currentCard.correctProcess}`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {currentCard.explanation}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!showResult ? (
          <Button onClick={handleSubmit} disabled={!selectedProcess} size="lg">
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg">
            {currentIndex < evidenceCards.length - 1
              ? "Next Evidence"
              : "See Results"}
          </Button>
        )}
      </div>
    </div>
  );
};
