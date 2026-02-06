// src/pages/Quiz/index.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getQuizQuestions, QuizQuestion } from "@/data/quizQuestions";

const Quiz = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const moduleId = parseInt(id || "1");

  // Fetch progress data
  const { data: progressData } = useQuery({
    queryKey: ["userProgress"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiURL}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      return data;
    },
    enabled: !!token,
  });

  // Submit assessment mutation
  const submitAssessmentMutation = useMutation({
    mutationFn: async (results: {
      score: number;
      totalQuestions: number;
      correctAnswers: number;
    }) => {
      const { data } = await axios.post(
        `${apiURL}/progress/module/${id}/assessment`,
        results,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });

      // Check if certificate was earned
      if (data.certificateEarned) {
        toast.success("🎉 Congratulations! You've earned your certificate!");
      }
    },
    onError: (error: any) => {
      console.error("Error submitting assessment:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit assessment";
      toast.error(errorMessage);
    },
  });

  const quizQuestions = getQuizQuestions(moduleId);
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
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNext = async () => {
    if (!isAnswered) {
      toast.error("Please select an answer before proceeding.");
      return;
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Calculate final score
      // const correctAnswers =
      //   score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0);
      // const finalPercentage = Math.round(
      //   (correctAnswers / totalQuestions) * 100
      // );
      const finalPercentage = Math.round((score / totalQuestions) * 100)

      // Submit assessment to backend
      await submitAssessmentMutation.mutateAsync({
        score: finalPercentage,
        totalQuestions,
        correctAnswers: score,
      });

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
    setQuizStarted(false);
  };

  const getScorePercentage = () => Math.round((score / totalQuestions) * 100);
  const isPassing = getScorePercentage() >= 70;

  // Get current module from progress data
  const currentModule = progressData?.modules?.find(
    (mod) => mod.moduleId === moduleId
  );

  // Start screen
  if (!quizStarted) {
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
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">
                Module {id} Assessment
              </CardTitle>
              <CardDescription>
                Test your understanding of the module content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Assessment Details:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{totalQuestions} multiple-choice questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Passing score: 70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      You can retake the assessment to improve your score
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Module completion requires passing the assessment with 70%
                      or above
                    </span>
                  </li>
                </ul>

                {currentModule?.assessmentAttempts > 0 && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-foreground">
                      Previous Attempts: {currentModule.assessmentAttempts}
                    </p>
                    {currentModule.assessmentScore && (
                      <p className="text-sm text-muted-foreground">
                        Best Score: {currentModule.assessmentScore}%
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setQuizStarted(true)}
              >
                {currentModule?.assessmentAttempts > 0
                  ? "Retake Assessment"
                  : "Start Assessment"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen
  if (quizComplete) {
    const currentModuleData = progressData?.modules?.find(
      (mod) => mod.moduleId === moduleId
    );
    const allModulesComplete = progressData?.modules?.every(
      (mod) => mod.status === "completed" && mod.assessmentPassed
    );
    const isLastModule = moduleId === 4;

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
          <Card
            className={`border-2 ${isPassing ? "border-success" : "border-destructive"
              }`}
          >
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4">
                {isPassing ? (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <XCircle className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                {isPassing ? "Congratulations!" : "Keep Learning"}
              </CardTitle>
              <CardDescription className="text-lg">
                {isPassing
                  ? "You've successfully passed the assessment"
                  : "Review the module content and try again"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {currentModuleData?.assessmentScore || getScorePercentage()}%
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
                <Progress
                  value={
                    currentModuleData?.assessmentScore || getScorePercentage()
                  }
                  className="h-3"
                />
              </div>

              {isPassing ? (
                <div className="bg-success/10 p-6 rounded-lg border border-success/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-success" />
                    <h3 className="font-semibold text-lg text-foreground">
                      What's Next?
                    </h3>
                  </div>

                  {isLastModule && allModulesComplete ? (
                    <>
                      <p className="text-muted-foreground mb-4">
                        🎉 Congratulations! You've completed all 4 modules! Your
                        final certificate score is {progressData.averageScore}%.
                        You can now download your certificate.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => navigate("/certificate")}
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
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground mb-4">
                        You've passed Module {id}!
                        {moduleId < 4
                          ? " Continue to the next module."
                          : " Complete all modules to earn your certificate."}
                      </p>
                      <div className="flex gap-3">
                        {moduleId < 4 && (
                          <Button
                            onClick={() => navigate(`/module/${moduleId + 1}`)}
                            className="flex-1"
                          >
                            Next Module
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => navigate("/dashboard")}
                          variant={moduleId < 4 ? "outline" : "default"}
                          className="flex-1"
                        >
                          Dashboard
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Button onClick={handleRetry} className="w-full">
                    Retake Assessment
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
  // Quiz questions screen (your existing quiz UI)
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/module/${id}")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module
            </Button>
            <div className="text-sm font-medium">
              Score: {score}/{answeredQuestions.filter(Boolean).length}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              Module {id} Assessment
            </h1>
            <span className="text-sm font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
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
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${!isAnswered && "hover:border-primary cursor-pointer"
                      } ${isAnswered && "cursor-not-allowed"} ${!isAnswered && isSelected && "border-primary bg-primary/5"
                      } ${showCorrect && "border-success bg-success/10"} ${showIncorrect && "border-destructive bg-destructive/10"
                      } ${!isSelected && !showCorrect && "border-border"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${showCorrect && "border-success bg-success"
                          } ${showIncorrect && "border-destructive bg-destructive"
                          } ${!isAnswered &&
                          isSelected &&
                          "border-primary bg-primary"
                          } ${!isAnswered && !isSelected && "border-border"}`}
                      >
                        {showCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                        {showIncorrect && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                        {!isAnswered && isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
                <h4 className="font-semibold text-foreground mb-2">
                  Explanation
                </h4>
                <p className="text-sm text-muted-foreground">
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
            disabled={!isAnswered || submitAssessmentMutation.isPending}
            className="flex-1"
          >
            {submitAssessmentMutation.isPending
              ? "Submitting..."
              : currentQuestion === totalQuestions - 1
                ? "Submit Assessment"
                : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
