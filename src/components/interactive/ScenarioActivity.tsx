import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lightbulb, Send, RotateCcw, MessageSquare, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ScenarioActivityProps {
  scenario: string;
  question: string;
  prompts: string[];
  sampleResponse?: string;
  onComplete?: () => void;
}

// Helper function to calculate similarity between two texts
const calculateSimilarity = (text1: string, text2: string): number => {
  if (!text1 || !text2) return 0;
  
  // Normalize texts
  const normalize = (text: string) => 
    text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  
  const words1 = normalize(text1);
  const words2 = normalize(text2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  // Key concepts that should be present in CLM-related responses
  const clmKeywords = [
    'community', 'monitor', 'data', 'evidence', 'feedback', 
    'trust', 'accountability', 'advocacy', 'dialogue', 'health',
    'service', 'quality', 'access', 'barrier', 'marginalized',
    'vulnerable', 'communication', 'channel', 'local', 'grassroots',
    'participate', 'voice', 'stakeholder', 'system', 'change',
    'collect', 'report', 'identify', 'gap', 'improvement'
  ];
  
  // Count matching words
  const matchingWords = words1.filter(word => words2.includes(word));
  
  // Count CLM keywords in user response
  const clmKeywordsFound = words1.filter(word => 
    clmKeywords.some(keyword => word.includes(keyword) || keyword.includes(word))
  );
  
  // Calculate base similarity
  const baseSimilarity = matchingWords.length / Math.max(words1.length, words2.length);
  
  // Bonus for CLM-relevant keywords
  const keywordBonus = Math.min(clmKeywordsFound.length * 0.05, 0.3);
  
  return Math.min(baseSimilarity + keywordBonus, 1);
};

// Check if response is gibberish
const isGibberish = (text: string): boolean => {
  if (!text || text.trim().length < 20) return true;
  
  const words = text.trim().split(/\s+/);
  
  // Check for minimum word count
  if (words.length < 8) return true;
  
  // Check for repeated characters (like "asdfasdf")
  const hasRepeatedPatterns = /(.)\1{4,}/.test(text);
  if (hasRepeatedPatterns) return true;
  
  // Check if most words are very short (potential gibberish)
  const shortWords = words.filter(w => w.length <= 2);
  if (shortWords.length / words.length > 0.6) return true;
  
  // Check for random character sequences
  const randomPattern = /[^aeiou]{5,}/i;
  const randomMatches = text.match(randomPattern);
  if (randomMatches && randomMatches.length > 2) return true;
  
  // Check for minimal vowel content (indicates keyboard mashing)
  const vowelCount = (text.match(/[aeiou]/gi) || []).length;
  const letterCount = (text.match(/[a-z]/gi) || []).length;
  if (letterCount > 0 && vowelCount / letterCount < 0.15) return true;
  
  return false;
};

export const ScenarioActivity = ({
  scenario,
  question,
  prompts,
  sampleResponse,
  onComplete,
}: ScenarioActivityProps) => {
  const [response, setResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'excellent' | 'good' | 'needs-work' | null>(null);

  const handleSubmit = () => {
    const trimmedResponse = response.trim();
    
    if (trimmedResponse.length < 20) return;
    
    // Check for gibberish first
    if (isGibberish(trimmedResponse)) {
      setFeedbackType('needs-work');
      setIsSubmitted(true);
      return;
    }
    
    // Calculate similarity with sample response
    if (sampleResponse) {
      const similarity = calculateSimilarity(trimmedResponse, sampleResponse);
      
      if (similarity >= 0.5) {
        setFeedbackType('excellent');
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#e41f28', '#007a87', '#a9d04f']
        });
        onComplete?.();
      } else if (similarity >= 0.25) {
        setFeedbackType('good');
        onComplete?.();
      } else {
        setFeedbackType('needs-work');
      }
    } else {
      // No sample response, just check it's not gibberish
      setFeedbackType('good');
      onComplete?.();
    }
    
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setResponse("");
    setIsSubmitted(false);
    setShowSample(false);
    setFeedbackType(null);
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
          <Card className={cn(
            "p-4 border",
            feedbackType === 'excellent' && "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
            feedbackType === 'good' && "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
            feedbackType === 'needs-work' && "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"
          )}>
            <div className="flex items-start gap-2 mb-2">
              {feedbackType === 'needs-work' ? (
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              )}
              <span className={cn(
                "font-medium",
                feedbackType === 'excellent' && "text-green-700 dark:text-green-400",
                feedbackType === 'good' && "text-blue-700 dark:text-blue-400",
                feedbackType === 'needs-work' && "text-amber-700 dark:text-amber-400"
              )}>
                Your Response
              </span>
            </div>
            <p className="text-muted-foreground text-sm">{response}</p>
          </Card>

          {/* Feedback */}
          <Card className={cn(
            "p-4 border",
            feedbackType === 'excellent' && "bg-green-100 border-green-300 dark:bg-green-950/30 dark:border-green-700",
            feedbackType === 'good' && "bg-blue-100 border-blue-300 dark:bg-blue-950/30 dark:border-blue-700",
            feedbackType === 'needs-work' && "bg-amber-100 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
          )}>
            {feedbackType === 'excellent' && (
              <>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">
                  Excellent thinking! 🎉
                </p>
                <p className="text-sm text-muted-foreground">
                  Your response demonstrates strong engagement with CLM principles and addresses the key aspects of the scenario effectively.
                </p>
              </>
            )}
            {feedbackType === 'good' && (
              <>
                <p className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                  Good effort! 👍
                </p>
                <p className="text-sm text-muted-foreground">
                  Your response shows understanding of the concepts. Consider reviewing the sample response to see additional perspectives on applying CLM principles.
                </p>
              </>
            )}
            {feedbackType === 'needs-work' && (
              <>
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">
                  Let's try again 💭
                </p>
                <p className="text-sm text-muted-foreground">
                  Your response needs more detail and should address how CLM principles apply to this scenario. Think about community data collection, feedback loops, and how marginalized voices can be included.
                </p>
              </>
            )}
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
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <p className="font-medium text-primary mb-2">
                    Sample Response
                  </p>
                  <p className="text-sm text-muted-foreground">{sampleResponse}</p>
                </Card>
              )}
            </div>
          )}

          {feedbackType === 'needs-work' && (
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
