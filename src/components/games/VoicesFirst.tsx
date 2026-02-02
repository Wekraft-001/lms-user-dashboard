import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Match {
  id: number;
  communityVoice: string;
  systemResponse: string;
}

const matches: Match[] = [
  {
    id: 1,
    communityVoice: '"The clinic runs out of HIV test kits every month, forcing us to travel far for testing."',
    systemResponse: "Stock-out data collected through CLM triggers emergency supply chain review",
  },
  {
    id: 2,
    communityVoice: '"Health workers treat us poorly when we come for TB medication. Many people stop treatment."',
    systemResponse: "CLM reports on provider attitudes lead to sensitivity training and patient feedback systems",
  },
  {
    id: 3,
    communityVoice: '"Young women avoid the health center because there\'s no privacy for family planning services."',
    systemResponse: "Community evidence drives facility redesign for confidential youth-friendly services",
  },
  {
    id: 4,
    communityVoice: '"During the pandemic, we had no information about where to get tested or vaccinated."',
    systemResponse: "CLM findings inform development of community-led risk communication strategies",
  },
];

export const VoicesFirst = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleCommunityClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    setSelectedCommunity(id);
    if (selectedSystem !== null) {
      checkMatch(id, selectedSystem);
    }
  };

  const handleSystemClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    setSelectedSystem(id);
    if (selectedCommunity !== null) {
      checkMatch(selectedCommunity, id);
    }
  };

  const checkMatch = (communityId: number, systemId: number) => {
    if (communityId === systemId) {
      setMatchedPairs([...matchedPairs, communityId]);
      setSelectedCommunity(null);
      setSelectedSystem(null);
      if (matchedPairs.length + 1 === matches.length) {
        setIsComplete(true);
      }
    } else {
      setIncorrectAttempts(incorrectAttempts + 1);
      setTimeout(() => {
        setSelectedCommunity(null);
        setSelectedSystem(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    setSelectedCommunity(null);
    setSelectedSystem(null);
    setMatchedPairs([]);
    setIncorrectAttempts(0);
    setIsComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Voices First</h3>
        <p className="text-muted-foreground">
          First click community voice then match with the most appropriate system response.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="text-sm">
            <span className="font-medium">Matched:</span>{" "}
            <span className="text-primary font-bold">{matchedPairs.length}/{matches.length}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Attempts:</span>{" "}
            <span className="text-destructive font-bold">{incorrectAttempts}</span>
          </div>
        </div>
      </div>

      {!isComplete ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-copper-red" />
              Community Voices
            </h4>
            <div className="space-y-3">
              {matches.map((match) => (
                <Card
                  key={`community-${match.id}`}
                  className={cn(
                    "p-4 cursor-pointer transition-all",
                    matchedPairs.includes(match.id)
                      ? "bg-success/10 border-success opacity-50"
                      : selectedCommunity === match.id
                      ? "bg-primary/10 border-primary shadow-lg scale-105"
                      : "hover:bg-red-100"
                  )}
                  onClick={() => handleCommunityClick(match.id)}
                >
                  <p className="text-sm italic">{match.communityVoice}</p>
                  {matchedPairs.includes(match.id) && (
                    <CheckCircle2 className="w-5 h-5 text-success mt-2" />
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-navy-blue" />
              System Responses
            </h4>
            <div className="space-y-3">
              {matches
                .sort(() => Math.random() - 0.5)
                .map((match) => (
                  <Card
                    key={`system-${match.id}`}
                    className={cn(
                      "p-4 cursor-pointer transition-all",
                      matchedPairs.includes(match.id)
                        ? "bg-success/10 border-success opacity-50"
                        : selectedSystem === match.id
                        ? "bg-primary/10 border-primary shadow-lg scale-105"
                        : "hover:bg-red-100"
                    )}
                    onClick={() => handleSystemClick(match.id)}
                  >
                    <p className="text-sm font-medium">{match.systemResponse}</p>
                    {matchedPairs.includes(match.id) && (
                      <CheckCircle2 className="w-5 h-5 text-success mt-2" />
                    )}
                  </Card>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 py-12">
          <div className="flex items-center justify-center gap-2 text-success">
            <CheckCircle2 className="w-8 h-8" />
            <h4 className="text-2xl font-bold">Excellent Work!</h4>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You've successfully connected community voices to system action. This is the power of CLM – 
            ensuring that those who experience health services directly can drive meaningful change.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      )}

      {selectedCommunity !== null && selectedSystem !== null && selectedCommunity !== selectedSystem && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-2 rounded-lg">
            <XCircle className="w-5 h-5" />
            <p className="text-sm font-medium">Not a match. Try again!</p>
          </div>
        </div>
      )}
    </div>
  );
};
