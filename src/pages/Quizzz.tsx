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
import { Badge } from "@/components/ui/badge";
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

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

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

  // Fetch progress data to check all modules status
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

  // Mutation to mark module as complete and unlock next module
  // const completeModuleMutation = useMutation({
  //   mutationFn: async () => {
  //     const { data } = await axios.put(
  //       `${apiURL}/progress/module/${id}`,
  //       { progress: 100, assessmentPassed: true },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       }
  //     );
  //     return data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["userProgress"] });
  //   },
  //   onError: (error) => {
  //     console.error("Error completing module:", error);
  //   },
  // });

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

  // Quiz data for each module
  const quizQuestionsByModule: Record<number, QuizQuestion[]> = {
    1: [
      {
        id: 1,
        question:
          "Which statement best describes the International Health Regulations (2005)?",
        options: [
          "A voluntary global guideline for pandemic response",
          "A legally binding agreement that sets out core capacities of Member States of the WHO to respond to public health threats",
          "A financing instrument for the Global Fund",
          "A regional policy of the Africa CDC",
        ],
        correctAnswer: 1,
        explanation:
          "The IHR (2005) are legally binding for 196 countries and define what each must do to detect, assess, and respond to health threats.",
      },
      {
        id: 2,
        question:
          "Which two tools assess a country's PPR capacity under the IHR?",
        options: [
          "Country Performance Review (CPR) and Self-Monitoring Tool (SMT)",
          "Joint External Evaluation (JEE) and State Party Annual Report (SPAR)",
          "Global Pandemic Scorecard (GPS) and World Bank Assessment Form (WBAF)",
          "National Response Index (NRI) and Continental Health Assessment (CHA)",
        ],
        correctAnswer: 1,
        explanation:
          "The JEE is an external review across 19 technical areas, and SPAR is the annual self-assessment process used by countries.",
      },
      {
        id: 3,
        question:
          "What distinguishes Community-Led Monitoring from traditional monitoring?",
        options: [
          "It is conducted solely by international experts",
          "It relies on top-down data collection from government systems",
          "It is community-owned and used to drive accountability and advocacy",
          "It replaces national statistical surveys",
        ],
        correctAnswer: 2,
        explanation:
          "CLM is designed and implemented by communities to ensure their experiences inform accountability and policy action. It's a rights-based, bottom-up approach.",
      },
      {
        id: 4,
        question:
          "Which of the following is NOT one of the five core CLM principles?",
        options: ["Ownership", "Accountability", "Transparency", "Efficiency"],
        correctAnswer: 3,
        explanation:
          "CLM is a rights-based approach driven by social justice values such as ownership, accountability, transparency, participation, and equity—not efficiency or other technical gains.",
      },
      {
        id: 5,
        question:
          "Why can CLM serve as an early-warning system within PPR frameworks?",
        options: [
          "It provides quick financial audits of donor spending",
          "It gathers real-time community evidence that detects service gaps before formal surveillance systems",
          "It replaces national epidemic-intelligence networks",
          "It focuses only on post-crisis evaluations",
        ],
        correctAnswer: 1,
        explanation:
          "Because communities observe and report changes immediately, CLM helps identify issues that may not yet appear in official data. This makes it an invaluable early-warning mechanism.",
      },
    ],
    2: [
      {
        id: 1,
        question:
          "What is the most important principle when designing CLM data collection tools?",
        options: [
          "Using standardized international templates",
          "Ensuring tools are community-centered and reflect community priorities",
          "Maximizing the number of questions asked",
          "Focusing primarily on quantitative data",
        ],
        correctAnswer: 1,
        explanation:
          "Community-centered design ensures that CLM tools address the issues that matter most to affected populations, not just donor or government interests.",
      },
      {
        id: 2,
        question:
          "Which data collection method involves trained community members visiting facilities as clients?",
        options: [
          "Facility exit interviews",
          "Community scorecards",
          "Mystery client visits",
          "Focus group discussions",
        ],
        correctAnswer: 2,
        explanation:
          "Mystery client visits involve trained community members who visit facilities as clients to assess service quality from a user perspective.",
      },
      {
        id: 3,
        question:
          "What is the most important quality for effective community monitors?",
        options: [
          "Having formal education in public health",
          "Being trusted and respected within their community",
          "Having experience working for government",
          "Being fluent in English",
        ],
        correctAnswer: 1,
        explanation:
          "Trust is foundational for CLM. Community monitors must be known and respected within their communities to collect authentic data and facilitate meaningful dialogue.",
      },
      {
        id: 4,
        question: "Why is informed consent essential in CLM data collection?",
        options: [
          "It is required by donors",
          "It protects participants and upholds ethical principles",
          "It makes data more accurate",
          "It speeds up data collection",
        ],
        correctAnswer: 1,
        explanation:
          "Informed consent is an ethical requirement that protects participants' rights, ensures they understand how their information will be used, and maintains trust in the CLM process.",
      },
      {
        id: 5,
        question: "What should be the primary focus when analyzing CLM data?",
        options: [
          "Creating impressive visualizations for donors",
          "Identifying patterns that inform advocacy and drive accountability",
          "Comparing results with other countries",
          "Validating government statistics",
        ],
        correctAnswer: 1,
        explanation:
          "CLM data analysis should focus on identifying patterns and insights that can be used for advocacy and to hold duty-bearers accountable for service quality.",
      },
    ],
    3: [
      {
        id: 1,
        question: "What is the first step in the evidence-to-advocacy pathway?",
        options: [
          "Meeting with decision-makers",
          "Analyzing CLM data for patterns and priority issues",
          "Building advocacy coalitions",
          "Launching media campaigns",
        ],
        correctAnswer: 1,
        explanation:
          "The first step is to analyze CLM data to identify patterns, trends, and priority issues that will form the basis of advocacy efforts.",
      },
      {
        id: 2,
        question: "Why should advocacy messages lead with community stories?",
        options: [
          "Stories are easier to remember than statistics",
          "Stories illustrate data and make issues concrete and human",
          "Decision-makers prefer stories over evidence",
          "Stories require less preparation than data analysis",
        ],
        correctAnswer: 1,
        explanation:
          "Community stories humanize data and make abstract issues concrete. They help decision-makers understand the real-world impact of policy choices.",
      },
      {
        id: 3,
        question:
          "Which stakeholder category includes government officials and budget controllers?",
        options: ["Influencers", "Implementers", "Decision-makers", "Allies"],
        correctAnswer: 2,
        explanation:
          "Decision-makers are those with direct authority to make policy or resource allocation decisions, including government officials, health managers, and budget controllers.",
      },
      {
        id: 4,
        question: "What is the purpose of coalition building in CLM advocacy?",
        options: [
          "To share costs of data collection",
          "To amplify community voice and increase advocacy impact",
          "To satisfy donor requirements",
          "To reduce workload for community monitors",
        ],
        correctAnswer: 1,
        explanation:
          "Coalitions bring together organizations with shared goals, amplifying community voice, pooling resources, and increasing the credibility and impact of advocacy efforts.",
      },
      {
        id: 5,
        question:
          "What should happen after decision-makers make commitments based on CLM evidence?",
        options: [
          "End the CLM program",
          "Track commitments and hold stakeholders accountable",
          "Move on to new advocacy targets",
          "Publish a final report",
        ],
        correctAnswer: 1,
        explanation:
          "Advocacy doesn't end with commitments. CLM should continue monitoring implementation and holding stakeholders accountable for their promises.",
      },
    ],
    4: [
      {
        id: 1,
        question:
          "Which of the following is an entry point for CLM in national PPR frameworks?",
        options: [
          "Private sector health insurance schemes",
          "National Action Plans for Health Security (NAPHS)",
          "International pharmaceutical companies",
          "Academic research institutions",
        ],
        correctAnswer: 1,
        explanation:
          "NAPHS is a key entry point where CLM can inform development and monitor implementation of national health security plans.",
      },
      {
        id: 2,
        question:
          "How can community evidence contribute to JEE and SPAR processes?",
        options: [
          "By replacing official government assessments",
          "By validating and supplementing official assessments with ground-level perspectives",
          "By providing financial data on health spending",
          "By training government evaluators",
        ],
        correctAnswer: 1,
        explanation:
          "Community evidence can validate and supplement official JEE and SPAR assessments, providing ground-level perspectives that may not be captured in formal evaluations.",
      },
      {
        id: 3,
        question: "What is the most sustainable approach to CLM financing?",
        options: [
          "Relying entirely on international donor funding",
          "Diversifying funding sources including government budgets and domestic resources",
          "Depending on volunteer labor only",
          "Seeking one-time large grants",
        ],
        correctAnswer: 1,
        explanation:
          "Sustainable CLM financing requires diversified funding sources, including government budget line items, domestic resource mobilization, and various funding streams.",
      },
      {
        id: 4,
        question:
          "What is the key argument for including CLM in Pandemic Fund investments?",
        options: [
          "CLM is cheaper than other monitoring approaches",
          "Donors require community engagement",
          "CLM provides early warning and builds community trust essential for pandemic response",
          "International regulations mandate CLM",
        ],
        correctAnswer: 2,
        explanation:
          "CLM's value for pandemic preparedness lies in its early warning capabilities and its role in building the community trust that is essential for effective outbreak response.",
      },
      {
        id: 5,
        question:
          "What is essential for institutionalizing CLM beyond formal mechanisms?",
        options: [
          "International certification",
          "Advanced technology systems",
          "Relationship building with PPR governance structures",
          "Legal enforcement powers",
        ],
        correctAnswer: 2,
        explanation:
          "Institutionalization requires both formal mechanisms and ongoing relationship building with PPR governance structures to ensure community participation becomes permanent.",
      },
    ],
  };

  const quizQuestions =
    quizQuestionsByModule[moduleId] || quizQuestionsByModule[1];

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

  // const handleNext = async () => {
  //   if (!isAnswered) {
  //     toast.error("Please select an answer before proceeding.");
  //     return;
  //   }

  //   if (currentQuestion < totalQuestions - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //     setSelectedAnswer(null);
  //     setIsAnswered(false);
  //   } else {
  //     // Calculate final score
  //     const finalScore = score;
  //     const finalPercentage = Math.round((finalScore / totalQuestions) * 100);
  //     const passed = finalPercentage >= 70;

  //     if (passed) {
  //       // Mark module as 100% complete and unlock next
  //       await completeModuleMutation.mutateAsync();
  //     }

  //     setQuizComplete(true);
  //   }
  // };

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
      const correctAnswers =
        score + (selectedAnswer === currentQ.correctAnswer ? 1 : 0);
      const finalPercentage = Math.round(
        (correctAnswers / totalQuestions) * 100
      );

      // Submit assessment to backend
      await submitAssessmentMutation.mutateAsync({
        score: finalPercentage,
        totalQuestions,
        correctAnswers,
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

        {/* <div className="container mx-auto px-4 py-12 max-w-3xl">
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
                    <h3 className="font-semibold text-lg text-foreground">
                      What's Next?
                    </h3>
                  </div>
                  {(() => {
                    // Check if all 4 modules are now complete
                    const allModulesComplete =
                      progressData?.modules?.length === 4 &&
                      progressData.modules.every(
                        (mod: { status: string }) => mod.status === "completed"
                      );
                    const currentModuleId = parseInt(id || "1");
                    const isLastModule = currentModuleId === 4;

                    if (isLastModule && allModulesComplete) {
                      return (
                        <>
                          <p className="text-muted-foreground mb-4">
                            🎉 Congratulations! You've completed all modules!
                            You can now download your final certificate of
                            completion.
                          </p>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => navigate("/certificate/final")}
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
                        </>
                      );
                    } else {
                      return (
                        <>
                          <p className="text-muted-foreground mb-4">
                            You've passed Module {id} assessment!
                            {currentModuleId < 4
                              ? " Continue to the next module to keep learning."
                              : " Complete all modules to earn your certificate."}
                          </p>
                          <div className="flex gap-3">
                            {currentModuleId < 4 && (
                              <Button
                                onClick={() =>
                                  navigate(`/module/${currentModuleId + 1}`)
                                }
                                className="flex-1"
                              >
                                Next Module
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              onClick={() => navigate("/dashboard")}
                              variant={
                                currentModuleId < 4 ? "outline" : "default"
                              }
                              className="flex-1"
                            >
                              Dashboard
                            </Button>
                          </div>
                        </>
                      );
                    }
                  })()}
                </div>
              ) : (
                <div className="space-y-3">
                  <Button onClick={handleRetry} className="w-full">
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
        </div> */}
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(`/module/${id}`)}>
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
                      ${
                        !isAnswered &&
                        "hover:border-primary hover:bg-primary/5 cursor-pointer"
                      }
                      ${isAnswered && "cursor-not-allowed"}
                      ${
                        !isAnswered &&
                        isSelected &&
                        "border-primary bg-primary/5"
                      }
                      ${
                        showCorrect &&
                        "border-alliance-green bg-alliance-green/10"
                      }
                      ${
                        showIncorrect &&
                        "border-alliance-red bg-alliance-red/10"
                      }
                      ${!isSelected && !showCorrect && "border-border"}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                        flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5
                        ${
                          showCorrect &&
                          "border-alliance-green bg-alliance-green"
                        }
                        ${
                          showIncorrect && "border-alliance-red bg-alliance-red"
                        }
                        ${
                          !isAnswered &&
                          isSelected &&
                          "border-primary bg-primary"
                        }
                        ${!isAnswered && !isSelected && "border-border"}
                      `}
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
                      <span
                        className={`
                        ${showCorrect && "text-alliance-green font-medium"}
                        ${showIncorrect && "text-alliance-red"}
                        ${!showCorrect && !showIncorrect && "text-foreground"}
                      `}
                      >
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
            {currentQuestion === totalQuestions - 1
              ? "View Results"
              : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
