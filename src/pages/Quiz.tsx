import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy, Award } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  // Quiz data for Module 1 - Foundations of PPR and CLM
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary purpose of Community-Led Monitoring (CLM) in pandemic preparedness?",
      options: [
        "To replace government health monitoring systems",
        "To create real-time feedback loops identifying service gaps and ensuring accountability",
        "To collect data for academic research only",
        "To provide employment opportunities for community members"
      ],
      correctAnswer: 1,
      explanation: "CLM creates real-time feedback loops that help identify service gaps, address issues, and ensure health systems remain accountable to the communities they serve."
    },
    {
      id: 2,
      question: "Which of the following is NOT a key principle of Community-Led Monitoring?",
      options: [
        "Community ownership and leadership",
        "Evidence-based advocacy",
        "Top-down decision making",
        "Transparent reporting"
      ],
      correctAnswer: 2,
      explanation: "CLM is based on community ownership and leadership, not top-down decision making. It emphasizes putting communities at the center of health system accountability."
    },
    {
      id: 3,
      question: "How did countries with strong CLM systems respond differently to COVID-19?",
      options: [
        "They had more medical supplies stockpiled",
        "They could identify service gaps, address misinformation, and ensure equitable access in real-time",
        "They closed borders earlier than other countries",
        "They relied solely on international aid"
      ],
      correctAnswer: 1,
      explanation: "Countries with strong CLM systems were able to identify service gaps, address misinformation, and ensure equitable access to care because communities were active leaders in the response, not just recipients."
    },
    {
      id: 4,
      question: "What role does CLM play in pandemic preparedness frameworks?",
      options: [
        "It replaces the need for medical professionals",
        "It serves as an early warning system by monitoring health services in real-time",
        "It focuses only on post-pandemic recovery",
        "It operates independently from health systems"
      ],
      correctAnswer: 1,
      explanation: "CLM acts as an early warning system for pandemic preparedness. When communities actively monitor health services, they notice changes immediately—unusual patterns, supply shortages, or access barriers that could signal the start of an outbreak."
    },
    {
      id: 5,
      question: "What is required to effectively integrate CLM into PPR systems?",
      options: [
        "Large financial investments only",
        "Intentional design, capacity building, and commitment from both communities and health systems",
        "Government mandate alone",
        "International organization oversight"
      ],
      correctAnswer: 1,
      explanation: "Effective integration of CLM into PPR requires intentional design, capacity building, and commitment from both communities and health systems. When done right, it creates resilience that extends far beyond any single pandemic."
    }
  ];

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = quizQuestions[currentQuestion];

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    
    const isCorrect = optionIndex === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! Well done!");
    } else {
      toast.error("Not quite right. Review the explanation below.");
    }
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNext = () => {
    if (!isAnswered) {
      toast.error("Please select an answer before proceeding.");
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  const getScorePercentage = () => Math.round((score / totalQuestions) * 100);
  const isPassing = getScorePercentage() >= 70;

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4">
                {isPassing ? (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-alliance-green to-alliance-lime flex items-center justify-center animate-scale-in">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                {isPassing ? "Congratulations!" : "Keep Learning"}
              </CardTitle>
              <CardDescription className="text-lg">
                {isPassing 
                  ? "You've successfully completed the assessment"
                  : "Review the module content and try again"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {getScorePercentage()}%
                </div>
                <p className="text-muted-foreground">
                  {score} out of {totalQuestions} questions correct
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Your Score</span>
                  <span>Passing: 70%</span>
                </div>
                <Progress value={getScorePercentage()} className="h-3" />
              </div>

              {isPassing ? (
                <div className="bg-gradient-to-br from-alliance-green/10 to-alliance-lime/10 p-6 rounded-lg border border-alliance-green/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-alliance-green" />
                    <h3 className="font-semibold text-lg text-foreground">What's Next?</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    You've demonstrated strong understanding of the foundations of PPR and CLM. 
                    Download your certificate and continue your journey to unlock more modules.
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => navigate(`/certificate/${id}`)}
                      className="flex-1"
                    >
                      <Award className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                    <Button 
                      onClick={() => navigate("/dashboard")}
                      variant="outline"
                      className="flex-1"
                    >
                      Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={handleRetry}
                    className="w-full"
                  >
                    Retry Assessment
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/module/${id}`)}
                    className="w-full"
                  >
                    Review Module
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(`/module/${id}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module
            </Button>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                Score: {score}/{answeredQuestions.filter(Boolean).length}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">Module {id} Assessment</h1>
            <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Question {currentQuestion + 1}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correctAnswer;
                const showCorrect = isAnswered && isCorrect;
                const showIncorrect = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`
                      w-full p-4 text-left rounded-lg border-2 transition-all
                      ${!isAnswered && 'hover:border-primary hover:bg-primary/5 cursor-pointer'}
                      ${isAnswered && 'cursor-not-allowed'}
                      ${!isAnswered && isSelected && 'border-primary bg-primary/5'}
                      ${showCorrect && 'border-alliance-green bg-alliance-green/10'}
                      ${showIncorrect && 'border-alliance-red bg-alliance-red/10'}
                      ${!isSelected && !showCorrect && 'border-border'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5
                        ${showCorrect && 'border-alliance-green bg-alliance-green'}
                        ${showIncorrect && 'border-alliance-red bg-alliance-red'}
                        ${!isAnswered && isSelected && 'border-primary bg-primary'}
                        ${!isAnswered && !isSelected && 'border-border'}
                      `}>
                        {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                        {!isAnswered && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className={`
                        ${showCorrect && 'text-alliance-green font-medium'}
                        ${showIncorrect && 'text-alliance-red'}
                        ${!showCorrect && !showIncorrect && 'text-foreground'}
                      `}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border animate-fade-in">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-alliance-green" />
                  Explanation
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1"
          >
            {currentQuestion === totalQuestions - 1 ? "View Results" : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
