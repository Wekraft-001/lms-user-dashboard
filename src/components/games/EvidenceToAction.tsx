import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface EvidenceItem {
  id: number;
  evidence: string;
  correctAction: string;
  explanation: string;
}

const evidenceItems: EvidenceItem[] = [
  {
    id: 1,
    evidence: "CLM data shows 60% of rural clinics have no rapid diagnostic tests for respiratory infections",
    correctAction: "Evidence to budget",
    explanation: "This finding shows a clear resource allocation gap that should trigger advocacy for budget reallocation to procurement."
  },
  {
    id: 2,
    evidence: "Community monitors document that migrants are consistently turned away from emergency services",
    correctAction: "Evidence to representation",
    explanation: "This pattern shows a population being systematically excluded—advocacy should focus on getting migrant representation in planning committees."
  },
  {
    id: 3,
    evidence: "Three facilities in the district have chronic oxygen supply shortages affecting patient care",
    correctAction: "Evidence to negotiation",
    explanation: "This is a concrete service delivery issue that can be addressed through direct negotiation with facility and district managers."
  },
  {
    id: 4,
    evidence: "Data reveals that deaths in informal settlements during outbreaks are significantly undercounted",
    correctAction: "Evidence to narrative",
    explanation: "This is a story about invisible communities—it needs to become a public narrative that politicians and journalists cannot ignore."
  },
];

const actionTypes = [
  { id: "negotiation", label: "Evidence to negotiation", description: "Present findings and negotiate action plans with timelines" },
  { id: "budget", label: "Evidence to budget", description: "Compare findings with budgets to advocate for reallocation" },
  { id: "representation", label: "Evidence to representation", description: "Use data to make the case for community seats in decision-making" },
  { id: "narrative", label: "Evidence to narrative", description: "Turn numbers into stories that cannot be ignored" },
];

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#e41f28", "#002776", "#007a87", "#a9d04f"],
  });
};

interface EvidenceToActionProps {
  onComplete?: () => void;
}

export const EvidenceToAction = ({ onComplete }: EvidenceToActionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentEvidence = evidenceItems[currentIndex];
  const isCorrect = selectedAction === currentEvidence.correctAction;

  const handleActionSelect = (actionLabel: string) => {
    if (showResult) return;
    setSelectedAction(actionLabel);
  };

  const handleSubmit = () => {
    if (!selectedAction) return;
    setShowResult(true);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < evidenceItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAction(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
      if (correctAnswers >= evidenceItems.length - 1) {
        triggerConfetti();
      }
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAction(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((correctAnswers / evidenceItems.length) * 100);
    const passed = percentage >= 75;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">From Evidence to Action</h3>
        </div>

        <Card className={cn(
          "p-6 text-center",
          passed ? "bg-success/10 border-success" : "bg-amber-50 border-amber-300 dark:bg-amber-950/20"
        )}>
          <div className="space-y-4">
            <div className={cn(
              "text-4xl font-bold",
              passed ? "text-success" : "text-amber-600"
            )}>
              {correctAnswers} / {evidenceItems.length}
            </div>
            <p className={cn(
              "font-semibold text-lg",
              passed ? "text-success" : "text-amber-600"
            )}>
              {passed ? "Excellent! You understand how to turn evidence into action!" : "Good effort! Review the pathways and try again."}
            </p>
            <p className="text-muted-foreground">
              Evidence becomes justice when it changes decisions, resources, or narratives. Each pathway has its place depending on the problem and the power dynamics involved.
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
        <h3 className="text-2xl font-bold text-foreground">From Evidence to Action</h3>
        <p className="text-muted-foreground">
          Match each CLM finding to the most appropriate action pathway
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-medium">Evidence:</div>
          <div className="text-2xl font-bold text-primary">{currentIndex + 1} / {evidenceItems.length}</div>
        </div>
      </div>

      {/* Evidence Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="space-y-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wide">CLM Finding</p>
          <p className="text-lg font-medium text-foreground">{currentEvidence.evidence}</p>
        </div>
      </Card>

      {/* Action Options */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">What's the best pathway for this evidence?</p>
        <div className="grid md:grid-cols-2 gap-3">
          {actionTypes.map((action) => {
            const isSelected = selectedAction === action.label;
            const isCorrectAnswer = showResult && action.label === currentEvidence.correctAction;
            const isWrongAnswer = showResult && isSelected && !isCorrect;

            return (
              <Card
                key={action.id}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  isSelected && !showResult && "ring-2 ring-primary bg-primary/5",
                  isCorrectAnswer && "bg-success/10 border-success",
                  isWrongAnswer && "bg-destructive/10 border-destructive",
                  !showResult && !isSelected && "hover:bg-muted/50"
                )}
                onClick={() => handleActionSelect(action.label)}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-foreground flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {action.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
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
        <Card className={cn(
          "p-4",
          isCorrect ? "bg-success/10 border-success" : "bg-amber-50 border-amber-300 dark:bg-amber-950/20"
        )}>
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={cn(
                "font-medium",
                isCorrect ? "text-success" : "text-amber-600"
              )}>
                {isCorrect ? "Correct!" : `The best pathway is: ${currentEvidence.correctAction}`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {currentEvidence.explanation}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAction}
            size="lg"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg">
            {currentIndex < evidenceItems.length - 1 ? "Next Evidence" : "See Results"}
          </Button>
        )}
      </div>
    </div>
  );
};
