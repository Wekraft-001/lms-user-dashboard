import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Region {
  id: string;
  name: string;
  population: number;
  vulnerability: "high" | "medium" | "low";
  allocated: number;
}

const regions: Region[] = [
  { id: "north", name: "Northern Region", population: 15, vulnerability: "high", allocated: 0 },
  { id: "south", name: "Southern Region", population: 20, vulnerability: "medium", allocated: 0 },
  { id: "east", name: "Eastern Region", population: 12, vulnerability: "high", allocated: 0 },
  { id: "west", name: "Western Region", population: 18, vulnerability: "low", allocated: 0 },
  { id: "central", name: "Central Region", population: 25, vulnerability: "medium", allocated: 0 },
];

const TOTAL_RESOURCES = 100;

export const EquityBuilder = () => {
  const [regionData, setRegionData] = useState<Region[]>(regions);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [equityScore, setEquityScore] = useState(0);

  const totalAllocated = regionData.reduce((sum, region) => sum + region.allocated, 0);
  const remaining = TOTAL_RESOURCES - totalAllocated;

  const handleAllocation = (regionId: string, change: number) => {
    if (isSubmitted) return;
    setRegionData(
      regionData.map((region) => {
        if (region.id === regionId) {
          const newValue = Math.max(0, Math.min(TOTAL_RESOURCES, region.allocated + change));
          return { ...region, allocated: newValue };
        }
        return region;
      })
    );
  };

  const calculateEquityScore = () => {
    let score = 0;
    regionData.forEach((region) => {
      const expectedMin = region.vulnerability === "high" ? 25 : region.vulnerability === "medium" ? 20 : 15;
      const expectedMax = region.vulnerability === "high" ? 35 : region.vulnerability === "medium" ? 25 : 20;
      
      if (region.allocated >= expectedMin && region.allocated <= expectedMax) {
        score += 25;
      } else if (region.allocated >= expectedMin - 5 && region.allocated <= expectedMax + 5) {
        score += 15;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    if (totalAllocated !== TOTAL_RESOURCES) return;
    const score = calculateEquityScore();
    setEquityScore(score);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setRegionData(regions.map((r) => ({ ...r, allocated: 0 })));
    setIsSubmitted(false);
    setEquityScore(0);
  };

  const getVulnerabilityColor = (vulnerability: Region["vulnerability"]) => {
    switch (vulnerability) {
      case "high":
        return "text-copper-red";
      case "medium":
        return "text-golden-yellow";
      case "low":
        return "text-olive-green";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Equity Builder</h3>
        <p className="text-muted-foreground">
          Distribute {TOTAL_RESOURCES} preparedness resources across African regions based on population and vulnerability
        </p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-sm">
            <span className="font-medium">Allocated:</span>{" "}
            <span className="text-primary font-bold">{totalAllocated}/{TOTAL_RESOURCES}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Remaining:</span>{" "}
            <span className={cn("font-bold", remaining === 0 ? "text-success" : "text-destructive")}>
              {remaining}
            </span>
          </div>
          {isSubmitted && (
            <div className="text-sm">
              <span className="font-medium">Justice Score:</span>{" "}
              <span className="text-primary font-bold">{equityScore}/100</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {regionData.map((region) => (
          <Card
            key={region.id}
            className={cn(
              "p-6 transition-all",
              isSubmitted &&
                (region.allocated >= (region.vulnerability === "high" ? 25 : region.vulnerability === "medium" ? 20 : 15)
                  ? "border-success bg-success/5"
                  : "border-destructive bg-destructive/5")
            )}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold text-lg">{region.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Population: {region.population}M</span>
                    <span className="flex items-center gap-1">
                      Vulnerability:{" "}
                      <span className={cn("font-semibold uppercase", getVulnerabilityColor(region.vulnerability))}>
                        {region.vulnerability}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{region.allocated}</div>
                  <div className="text-xs text-muted-foreground">resources</div>
                </div>
              </div>

              {!isSubmitted && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAllocation(region.id, -5)}
                    disabled={region.allocated === 0}
                  >
                    -5
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAllocation(region.id, -1)}
                    disabled={region.allocated === 0}
                  >
                    -1
                  </Button>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-300"
                      style={{ width: `${(region.allocated / TOTAL_RESOURCES) * 100}%` }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAllocation(region.id, 1)}
                    disabled={remaining === 0}
                  >
                    +1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAllocation(region.id, 5)}
                    disabled={remaining < 5}
                  >
                    +5
                  </Button>
                </div>
              )}

              {isSubmitted && (
                <div className="flex items-center gap-2">
                  {region.allocated >= (region.vulnerability === "high" ? 25 : region.vulnerability === "medium" ? 20 : 15) ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <p className="text-sm text-success font-medium">
                        Well distributed based on {region.vulnerability} vulnerability
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-destructive" />
                      <p className="text-sm text-destructive font-medium">
                        Needs more resources - high vulnerability areas require greater support
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 space-y-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-golden-yellow mt-0.5" />
          <div className="space-y-2 flex-1">
            <h4 className="font-semibold">Equity Principle</h4>
            <p className="text-sm text-muted-foreground">
              Equitable distribution doesn't mean equal distribution. High vulnerability regions need more resources 
              to achieve the same level of pandemic preparedness. Consider both population size and vulnerability levels.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-copper-red font-semibold">HIGH: 25-35 resources</span>
              <span className="text-golden-yellow font-semibold">MEDIUM: 20-25 resources</span>
              <span className="text-olive-green font-semibold">LOW: 15-20 resources</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={totalAllocated !== TOTAL_RESOURCES}
            size="lg"
          >
            Check My Distribution
          </Button>
        ) : (
          <div className="text-center space-y-4">
            {equityScore >= 75 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-success">
                  <CheckCircle2 className="w-6 h-6" />
                  <p className="font-semibold text-lg">Excellent! You've achieved equitable distribution!</p>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Your resource allocation prioritizes vulnerable populations while considering regional needs. 
                  This is how CLM principles ensure no one is left behind in pandemic preparedness.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <XCircle className="w-6 h-6" />
                  <p className="font-semibold text-lg">Your distribution needs adjustment</p>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Remember: equity means giving more support to those facing greater vulnerability. 
                  Try prioritizing high-vulnerability regions to improve pandemic readiness.
                </p>
              </div>
            )}
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
