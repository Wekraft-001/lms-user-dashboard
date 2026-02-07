import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, RotateCcw, Shield, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import confetti from "canvas-confetti";

interface Scenario {
  id: number;
  situation: string;
  options: {
    id: string;
    text: string;
    safety: number; // -20 to +20
    impact: number; // -20 to +20
    trust: number;  // -20 to +20
    feedback: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: "Your CLM data shows that sex workers are refused treatment at an emergency clinic during disease outbreaks. A national journalist asks for detailed data, including facility names and direct quotes.",
    options: [
      {
        id: "a",
        text: "Share everything openly to maximise public pressure",
        safety: -20,
        impact: 15,
        trust: -10,
        feedback: "High impact but puts vulnerable people at significant risk. Trust with community may be damaged."
      },
      {
        id: "b",
        text: "Provide aggregated, anonymised data with facility types but no names",
        safety: 15,
        impact: 10,
        trust: 15,
        feedback: "Good balance—maintains pressure while protecting individuals. Builds trust with community."
      },
      {
        id: "c",
        text: "Refuse to share any data with media",
        safety: 20,
        impact: -15,
        trust: 5,
        feedback: "Maximum safety but missed opportunity for advocacy. Limited system accountability."
      }
    ]
  },
  {
    id: 2,
    situation: "A ministry official privately admits that IPC supplies are being diverted to private hospitals. They're willing to fix it but don't want public exposure. Your CLM data confirms the problem.",
    options: [
      {
        id: "a",
        text: "Accept closed-door resolution and monitor implementation",
        safety: 15,
        impact: 10,
        trust: 10,
        feedback: "Strategic choice—gets results while maintaining relationship. Must verify follow-through."
      },
      {
        id: "b",
        text: "Publish findings immediately to ensure accountability",
        safety: 5,
        impact: 5,
        trust: -10,
        feedback: "May achieve reform but risks losing cooperative relationship. Future access may be limited."
      },
      {
        id: "c",
        text: "Set a deadline: if not fixed in 3 months, data goes public",
        safety: 10,
        impact: 15,
        trust: 15,
        feedback: "Strategic leverage—allows resolution while maintaining accountability pressure. Community sees results."
      }
    ]
  },
  {
    id: 3,
    situation: "Community health workers who shared CLM data on vaccine stockouts are facing workplace retaliation. More witnesses want to speak but are afraid.",
    options: [
      {
        id: "a",
        text: "Continue collecting testimonies to strengthen the case",
        safety: -15,
        impact: 10,
        trust: -10,
        feedback: "More evidence but puts more people at risk. Community may stop trusting CLM processes."
      },
      {
        id: "b",
        text: "Pause collection and focus on protecting those already exposed",
        safety: 20,
        impact: -5,
        trust: 15,
        feedback: "Prioritises safety over data. Community sees you value their wellbeing over your report."
      },
      {
        id: "c",
        text: "Anonymise existing data and advocate through coalitions without naming sources",
        safety: 15,
        impact: 10,
        trust: 10,
        feedback: "Uses evidence strategically while limiting additional exposure. Balanced approach."
      }
    ]
  },
  {
    id: 4,
    situation: "An international agency wants your CLM data for a global report. They offer funding but want full control over how findings are presented.",
    options: [
      {
        id: "a",
        text: "Accept the partnership and funding for sustainability",
        safety: 10,
        impact: 5,
        trust: -15,
        feedback: "Financial security but loss of community control. Data may be reframed or decontextualised."
      },
      {
        id: "b",
        text: "Negotiate joint control with community veto on how data is used",
        safety: 10,
        impact: 15,
        trust: 15,
        feedback: "Best balance—resources plus community control. Models ethical partnership."
      },
      {
        id: "c",
        text: "Decline and maintain full community control",
        safety: 15,
        impact: 0,
        trust: 20,
        feedback: "Maximum community control but missed opportunity for wider influence. Very high trust."
      }
    ]
  }
];

const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.7 },
    colors: ["#e41f28", "#007a87", "#a9d04f"],
  });
};

interface RisksOrRightsProps {
  onComplete?: () => void;
}

export const RisksOrRights = ({ onComplete }: RisksOrRightsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({ safety: 50, impact: 50, trust: 50 });
  const [isComplete, setIsComplete] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);

  const currentScenario = scenarios[currentIndex];

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const option = currentScenario.options.find(o => o.id === selectedOption);
    if (option) {
      setScores(prev => ({
        safety: Math.max(0, Math.min(100, prev.safety + option.safety)),
        impact: Math.max(0, Math.min(100, prev.impact + option.impact)),
        trust: Math.max(0, Math.min(100, prev.trust + option.trust)),
      }));
      setChoices(prev => [...prev, selectedOption]);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
      const avgScore = (scores.safety + scores.impact + scores.trust) / 3;
      if (avgScore >= 60) {
        triggerConfetti();
      }
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScores({ safety: 50, impact: 50, trust: 50 });
    setIsComplete(false);
    setChoices([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-amber-600";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-success";
    if (score >= 40) return "bg-amber-500";
    return "bg-destructive";
  };

  if (isComplete) {
    const avgScore = Math.round((scores.safety + scores.impact + scores.trust) / 3);

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Risk or Rights?</h3>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{avgScore}%</p>
              <p className="text-lg font-medium text-foreground">Overall Balance Score</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Safety</span>
                  </div>
                  <span className={cn("font-bold", getScoreColor(scores.safety))}>{scores.safety}%</span>
                </div>
                <Progress value={scores.safety} className={cn("h-2", getProgressColor(scores.safety))} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">Impact</span>
                  </div>
                  <span className={cn("font-bold", getScoreColor(scores.impact))}>{scores.impact}%</span>
                </div>
                <Progress value={scores.impact} className={cn("h-2", getProgressColor(scores.impact))} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Trust</span>
                  </div>
                  <span className={cn("font-bold", getScoreColor(scores.trust))}>{scores.trust}%</span>
                </div>
                <Progress value={scores.trust} className={cn("h-2", getProgressColor(scores.trust))} />
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Key Learning:</strong> There is rarely a perfect choice in CLM ethics. 
                Some choices balance safety, impact, and community control better than others. 
                Ethics are about practice, not only principles—every decision involves trade-offs.
              </p>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const selectedOptionData = currentScenario.options.find(o => o.id === selectedOption);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Risk or Rights?</h3>
        <p className="text-muted-foreground">
          Navigate ethical choices in CLM data use. Balance Safety, Impact, and Trust.
        </p>
        <div className="text-sm font-medium">
          Scenario {currentIndex + 1} of {scenarios.length}
        </div>
      </div>

      {/* Score Bars */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Safety</span>
          </div>
          <Progress value={scores.safety} className="h-2" />
          <span className={cn("text-sm font-bold", getScoreColor(scores.safety))}>{scores.safety}%</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Impact</span>
          </div>
          <Progress value={scores.impact} className="h-2" />
          <span className={cn("text-sm font-bold", getScoreColor(scores.impact))}>{scores.impact}%</span>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Trust</span>
          </div>
          <Progress value={scores.trust} className="h-2" />
          <span className={cn("text-sm font-bold", getScoreColor(scores.trust))}>{scores.trust}%</span>
        </div>
      </div>

      {/* Scenario */}
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
          <p className="text-foreground">{currentScenario.situation}</p>
        </div>
      </Card>

      {/* Options */}
      <div className="space-y-3">
        {currentScenario.options.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <Card
              key={option.id}
              className={cn(
                "p-4 cursor-pointer transition-all",
                isSelected && !showResult && "ring-2 ring-primary bg-primary/5",
                showResult && isSelected && "ring-2 ring-primary",
                !showResult && !isSelected && "hover:bg-muted/50"
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <p className="text-foreground">{option.text}</p>
            </Card>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && selectedOptionData && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Consequence</span>
            </div>
            <p className="text-sm text-muted-foreground">{selectedOptionData.feedback}</p>
            <div className="flex gap-4 text-sm">
              <span className={selectedOptionData.safety >= 0 ? "text-success" : "text-destructive"}>
                Safety: {selectedOptionData.safety >= 0 ? "+" : ""}{selectedOptionData.safety}
              </span>
              <span className={selectedOptionData.impact >= 0 ? "text-success" : "text-destructive"}>
                Impact: {selectedOptionData.impact >= 0 ? "+" : ""}{selectedOptionData.impact}
              </span>
              <span className={selectedOptionData.trust >= 0 ? "text-success" : "text-destructive"}>
                Trust: {selectedOptionData.trust >= 0 ? "+" : ""}{selectedOptionData.trust}
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption}
            size="lg"
          >
            Make Decision
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg">
            {currentIndex < scenarios.length - 1 ? "Next Scenario" : "See Final Scores"}
          </Button>
        )}
      </div>
    </div>
  );
};
