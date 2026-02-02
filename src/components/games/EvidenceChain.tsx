import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface Stage {
  id: number;
  text: string;
  correctOrder: number;
}

const stages: Stage[] = [
  { id: 1, text: "Community identifies health service gaps", correctOrder: 1 },
  { id: 2, text: "Data collection using CLM tools", correctOrder: 2 },
  { id: 3, text: "Analysis and validation with community", correctOrder: 3 },
  { id: 4, text: "Evidence presentation to decision-makers", correctOrder: 4 },
  { id: 5, text: "Advocacy for system improvements", correctOrder: 5 },
  { id: 6, text: "Monitoring implementation of changes", correctOrder: 6 },
];

const triggerConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#e41f28", "#002776", "#007a87", "#a9d04f"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#e41f28", "#002776", "#007a87", "#a9d04f"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

interface EvidenceChainProps {
  onComplete?: () => void;
}

export const EvidenceChain = ({ onComplete }: EvidenceChainProps) => {
  const [shuffledStages, setShuffledStages] = useState<Stage[]>(() =>
    [...stages].sort(() => Math.random() - 0.5)
  );
  const [selectedStages, setSelectedStages] = useState<Stage[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [trustPoints, setTrustPoints] = useState(0);

  const handleStageClick = (stage: Stage) => {
    if (isComplete) return;
    setSelectedStages([...selectedStages, stage]);
    setShuffledStages(shuffledStages.filter((s) => s.id !== stage.id));
  };

  const handleRemoveStage = (stage: Stage, index: number) => {
    if (isComplete) return;
    const newSelected = [...selectedStages];
    newSelected.splice(index, 1);
    setSelectedStages(newSelected);
    setShuffledStages([...shuffledStages, stage]);
  };

  const handleSubmit = () => {
    const correct = selectedStages.every(
      (stage, index) => stage.correctOrder === index + 1
    );
    setIsCorrect(correct);
    setIsComplete(true);
    if (correct) {
      setTrustPoints(100);
      triggerConfetti();
      onComplete?.();
    }
  };

  const handleReset = () => {
    setShuffledStages([...stages].sort(() => Math.random() - 0.5));
    setSelectedStages([]);
    setIsComplete(false);
    setIsCorrect(false);
    setTrustPoints(0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Evidence Chain</h3>
        <p className="text-muted-foreground">
          Arrange the CLM stages in the correct order to build community trust
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-medium">Trust Points:</div>
          <div className="text-2xl font-bold text-primary">{trustPoints}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Available Stages</h4>
          <div className="space-y-2 min-h-[300px] p-4 rounded-lg bg-muted/30">
            {shuffledStages.map((stage) => (
              <Card
                key={stage.id}
                className="p-4 cursor-pointer hover:bg-red-100 transition-colors"
                onClick={() => handleStageClick(stage)}
              >
                <p className="text-sm">{stage.text}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Your Sequence</h4>
          <div className="space-y-2 min-h-[300px] p-4 rounded-lg bg-primary/5 border-2 border-dashed border-primary/20">
            {selectedStages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Click stages to build your evidence chain
              </p>
            ) : (
              selectedStages.map((stage, index) => (
                <Card
                  key={stage.id}
                  className={cn(
                    "p-4 cursor-pointer transition-colors",
                    isComplete &&
                      (stage.correctOrder === index + 1
                        ? "bg-success/10 border-success"
                        : "bg-destructive/10 border-destructive")
                  )}
                  onClick={() => handleRemoveStage(stage, index)}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <p className="text-sm flex-1">{stage.text}</p>
                    {isComplete && (
                      <>
                        {stage.correctOrder === index + 1 ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                      </>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!isComplete ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedStages.length !== stages.length}
            size="lg"
          >
            Check My Answer
          </Button>
        ) : (
          <div className="text-center space-y-4">
            {isCorrect ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-success">
                  <CheckCircle2 className="w-6 h-6" />
                  <p className="font-semibold text-lg">
                    Perfect! You've mastered the CLM evidence chain!
                  </p>
                </div>
                <p className="text-muted-foreground">
                  This sequence shows how communities build accountability
                  through systematic monitoring.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <XCircle className="w-6 h-6" />
                  <p className="font-semibold text-lg">
                    Not quite right. Try again!
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Think about how evidence flows from community observation to
                  system change.
                </p>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
