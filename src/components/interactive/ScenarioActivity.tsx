import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lightbulb, Send, RotateCcw, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScenarioActivityProps {
  scenario: string;
  question: string;
  prompts: string[];
  sampleResponse?: string;
}

export const ScenarioActivity = ({
  scenario,
  question,
  prompts,
  sampleResponse,
}: ScenarioActivityProps) => {
  const [response, setResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const handleSubmit = () => {
    if (response.trim().length >= 20) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setResponse("");
    setIsSubmitted(false);
    setShowSample(false);
  };

  const wordCount = response.trim().split(/\s+/).filter(Boolean).length;
  const minWords = 15;
  const isValidLength = wordCount >= minWords;

  return (
    <div className="space-y-6">
      {/* Scenario Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-2">Scenario</Badge>
            <p className="text-foreground font-medium">{scenario}</p>
          </div>
        </div>
      </Card>

      {/* Question */}
      <div className="space-y-3">
        <h4 className="font-semibold text-lg text-foreground">{question}</h4>
        
        {/* Guiding Prompts */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Consider:</p>
          <ul className="space-y-1.5">
            {prompts.map((prompt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <span>{prompt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Response Area */}
      {!isSubmitted ? (
        <div className="space-y-3">
          <Textarea
            placeholder="Type your response here... Think critically about how CLM principles apply to this scenario."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[150px] resize-none"
          />
          <div className="flex items-center justify-between">
            <p className={cn(
              "text-sm",
              isValidLength ? "text-green-600" : "text-muted-foreground"
            )}>
              {wordCount} / {minWords} words minimum
              {isValidLength && <CheckCircle2 className="inline-block ml-1 h-4 w-4" />}
            </p>
            <Button 
              onClick={handleSubmit} 
              disabled={!isValidLength}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Response
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* User's Response */}
          <Card className="p-4 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <span className="font-medium text-green-700 dark:text-green-400">Your Response</span>
            </div>
            <p className="text-muted-foreground text-sm">{response}</p>
          </Card>

          {/* Feedback */}
          <Card className="p-4 bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
            <p className="font-medium text-blue-700 dark:text-blue-400 mb-2">
              Great thinking! 🎉
            </p>
            <p className="text-sm text-muted-foreground">
              Your response demonstrates engagement with CLM principles. Remember: there's no single "correct" answer—what matters is applying community-led thinking to real-world scenarios.
            </p>
          </Card>

          {/* Sample Response Toggle */}
          {sampleResponse && (
            <div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSample(!showSample)}
                className="mb-3"
              >
                {showSample ? "Hide" : "View"} Sample Response
              </Button>
              
              {showSample && (
                <Card className="p-4 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
                  <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">
                    Sample Response
                  </p>
                  <p className="text-sm text-muted-foreground">{sampleResponse}</p>
                </Card>
              )}
            </div>
          )}

          <Button variant="ghost" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Revise Response
          </Button>
        </div>
      )}
    </div>
  );
};
