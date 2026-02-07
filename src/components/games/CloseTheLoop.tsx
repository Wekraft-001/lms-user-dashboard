import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface Activity {
  id: number;
  text: string;
  correctStage: string;
}

const clmStages = ["Identify", "Collect", "Analyse", "Share", "Act", "Track"];

const activities: Activity[] = [
  { id: 1, text: "Hold community meetings to ask what failed during the last flood.", correctStage: "Identify" },
  { id: 2, text: "Update monitoring tools to include questions on oxygen and IPC.", correctStage: "Collect" },
  { id: 3, text: "Summarise findings in a two-page brief.", correctStage: "Analyse" },
  { id: 4, text: "Present evidence to the district health management team.", correctStage: "Share" },
  { id: 5, text: "Map which ministry department controls emergency budgets.", correctStage: "Act" },
  { id: 6, text: "Three months later, visit the same facilities to see if supplies improved.", correctStage: "Track" },
];

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#e41f28", "#002776", "#007a87", "#a9d04f"],
  });
};

interface CloseTheLoopProps {
  onComplete?: () => void;
}

export const CloseTheLoop = ({ onComplete }: CloseTheLoopProps) => {
  const [shuffledActivities, setShuffledActivities] = useState<Activity[]>(() =>
    [...activities].sort(() => Math.random() - 0.5)
  );
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: Activity | null }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: boolean }>({});
  const [isComplete, setIsComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleActivityClick = (activity: Activity) => {
    if (feedback[activity.id] !== undefined || isComplete) return;
    setSelectedActivity(activity);
  };

  const handleStageClick = (stage: string) => {
    if (!selectedActivity || isComplete) return;

    const isCorrect = selectedActivity.correctStage === stage;
    
    setFeedback(prev => ({ ...prev, [selectedActivity.id]: isCorrect }));
    
    if (isCorrect) {
      setMatches(prev => ({ ...prev, [stage]: selectedActivity }));
      setShuffledActivities(prev => prev.filter(a => a.id !== selectedActivity.id));
      setCorrectCount(prev => {
        const newCount = prev + 1;
        if (newCount === activities.length) {
          setIsComplete(true);
          triggerConfetti();
          onComplete?.();
        }
        return newCount;
      });
    }
    
    setSelectedActivity(null);
  };

  const handleReset = () => {
    setShuffledActivities([...activities].sort(() => Math.random() - 0.5));
    setSelectedActivity(null);
    setMatches({});
    setFeedback({});
    setIsComplete(false);
    setCorrectCount(0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Close the Loop</h3>
        <p className="text-muted-foreground">
          Match each activity card to the correct stage of the CLM cycle
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-medium">Progress:</div>
          <div className="text-2xl font-bold text-primary">{correctCount} / {activities.length}</div>
        </div>
      </div>

      {/* CLM Cycle Diagram */}
      <div className="flex flex-wrap justify-center gap-3 p-4 bg-muted/30 rounded-lg">
        {clmStages.map((stage, index) => (
          <div key={stage} className="flex items-center">
            <Button
              variant={matches[stage] ? "default" : selectedActivity ? "outline" : "ghost"}
              className={cn(
                "min-w-[100px] transition-all",
                matches[stage] && "bg-success text-success-foreground hover:bg-success/90",
                selectedActivity && !matches[stage] && "border-primary border-2 hover:bg-primary/10"
              )}
              onClick={() => handleStageClick(stage)}
              disabled={!!matches[stage] || !selectedActivity || isComplete}
            >
              <Circle className="w-3 h-3 mr-2" />
              {stage}
            </Button>
            {index < clmStages.length - 1 && (
              <span className="mx-2 text-muted-foreground">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Activity Cards</h4>
        <p className="text-sm text-muted-foreground">
          {selectedActivity 
            ? "Now click on the CLM stage above where this activity belongs" 
            : "Click an activity card, then select the correct CLM stage"}
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {shuffledActivities.map((activity) => {
            const hasResult = feedback[activity.id] !== undefined;
            const isCorrect = feedback[activity.id];
            const isSelected = selectedActivity?.id === activity.id;

            return (
              <Card
                key={activity.id}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  isSelected && "ring-2 ring-primary bg-primary/5",
                  hasResult && isCorrect && "bg-success/10 border-success",
                  hasResult && !isCorrect && "bg-destructive/10 border-destructive animate-pulse",
                  !hasResult && !isSelected && "hover:bg-muted/50"
                )}
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-start gap-2">
                  <p className="text-sm flex-1">{activity.text}</p>
                  {hasResult && (
                    <>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive shrink-0" />
                      )}
                    </>
                  )}
                </div>
                {hasResult && !isCorrect && (
                  <p className="text-xs text-destructive mt-2">
                    Try again! This activity belongs to a different stage.
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Matched Activities */}
      {Object.keys(matches).length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Matched Activities</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {clmStages.map(stage => matches[stage] && (
              <Card key={stage} className="p-3 bg-success/10 border-success">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">{stage}</span>
                </div>
                <p className="text-xs text-muted-foreground">{matches[stage]?.text}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center space-y-4 p-6 bg-success/10 rounded-lg border border-success">
          <div className="flex items-center justify-center gap-2 text-success">
            <CheckCircle2 className="w-6 h-6" />
            <p className="font-semibold text-lg">
              Excellent! You've mastered the CLM cycle!
            </p>
          </div>
          <p className="text-muted-foreground">
            By repeating rounds, you've internalized the cycle and understand that leaving out any stage weakens the entire process.
          </p>
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};
