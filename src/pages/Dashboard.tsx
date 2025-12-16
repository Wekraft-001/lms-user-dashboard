import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Lock,
  CheckCircle2,
  Library,
  Award,
  HelpCircle,
  Sparkles,
  PlayCircle,
  Target,
  Users,
  Clock,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg";

const Dashboard = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user profile (includes hasStartedCourse)
  const fetchUserDetails = async () => {
    const { data } = await axios.get(`${apiURL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return data;
  };

  const {
    data: userProfile,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["userDetails-home"],
    queryFn: fetchUserDetails,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch progress data (only when course is started)
  const fetchProgressData = async () => {
    const { data } = await axios.get(`${apiURL}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return data;
  };

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["userProgress"],
    queryFn: fetchProgressData,
    enabled: !!token && userProfile?.hasStartedCourse === true,
    staleTime: 2 * 60 * 1000,
  });

  // Mutation to start the course
  const startCourseMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${apiURL}/progress/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetails-home"] });
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
      toast.success("Welcome! Your learning journey has begun 🎉");
    },
    onError: (error) => {
      console.error("Error starting course:", error);
      toast.error("Failed to start course. Please try again.");
    },
  });

  const handleStartLearning = () => {
    startCourseMutation.mutate();
  };

  const handleModuleClick = (module) => {
    if (module.status === "locked") {
      toast.info("Complete previous modules to unlock this one");
      return;
    }
    // Navigate to module page
    window.location.href = `/module/${module.id}`;
  };

  // Loading state
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (userError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Failed to load user data. Please refresh the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userData = {
    name: `${userProfile?.firstName} ${userProfile?.lastName}`,
    progress: progressData?.overallProgress || 0,
    completedModules: progressData?.completedModules || 0,
    totalModules: progressData?.totalModules || 4,
    hasStartedCourse: userProfile?.hasStartedCourse || false,
  };

  // Map backend modules to frontend format
  const modules = progressData?.modules || [
    {
      id: 1,
      title: "Understanding the Foundations of PPR and CLM",
      description:
        "Introducing global and African PPR systems and CLM as a mechanism for accountability, justice, and participation",
      status: "locked",
      progress: 0,
      duration: "90 min",
      parts: 4,
    },
    {
      id: 2,
      title: "The Principles and Practice of CLM",
      description:
        "Deep dive into community engagement methods, data collection, and accountability mechanisms",
      status: "locked",
      progress: 0,
      duration: "85 min",
      parts: 4,
    },
    {
      id: 3,
      title: "Integrating CLM into PPR Frameworks",
      description:
        "Practical frameworks and strategies for bringing communities and health systems together",
      status: "locked",
      progress: 0,
      duration: "80 min",
      parts: 4,
    },
    {
      id: 4,
      title: "Action, Advocacy and Sustainability",
      description:
        "Building lasting change through strategic advocacy, policy influence, and institutional partnerships",
      status: "locked",
      progress: 0,
      duration: "75 min",
      parts: 4,
    },
  ];

  // Map backend module data if available
  const mappedModules = progressData?.modules
    ? progressData.modules.map((mod) => ({
        id: mod.moduleId,
        title: mod.title,
        description:
          modules.find((m) => m.id === mod.moduleId)?.description || "",
        status: mod.status,
        progress: mod.progress,
        duration:
          modules.find((m) => m.id === mod.moduleId)?.duration || "90 min",
        parts: mod.parts.length,
      }))
    : modules;

  // Welcome/Onboarding View for New Users
  const WelcomeView = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold">Welcome to Kujua360</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Welcome, {userData.name}! 👋
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          You're about to embark on a transformative journey to strengthen
          pandemic preparedness and community-led monitoring across Africa
        </p>
        <Button
          size="lg"
          className="text-lg px-8 py-6"
          onClick={handleStartLearning}
          disabled={startCourseMutation.isPending}
        >
          {startCourseMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Starting...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Your Learning Journey
            </>
          )}
        </Button>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-8 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">What You'll Learn</CardTitle>
          <CardDescription>
            Master the essentials of PPR and community-led monitoring through 4
            comprehensive modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="flex gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base mb-1">{module.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </span>
                    <span>{module.parts} parts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center border-2">
          <CardContent className="pt-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Practical Knowledge</h3>
            <p className="text-sm text-muted-foreground">
              Real-world frameworks and strategies you can apply immediately in
              your work
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-2">
          <CardContent className="pt-6">
            <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Community Focus</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to engage communities and build accountability
              mechanisms
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-2">
          <CardContent className="pt-6">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-bold text-lg mb-2">Earn Certificate</h3>
            <p className="text-sm text-muted-foreground">
              Complete all modules and receive a certificate of completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Stats */}
      <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 border-2 border-primary/20">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">4</p>
              <p className="text-sm text-muted-foreground">
                Comprehensive Modules
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary mb-2">~5.5</p>
              <p className="text-sm text-muted-foreground">Hours of Content</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success mb-2">16</p>
              <p className="text-sm text-muted-foreground">Interactive Parts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">1</p>
              <p className="text-sm text-muted-foreground">
                Certificate Earned
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Active Learning View
  const ActiveLearningView = () => {
    if (progressLoading) {
      return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            Welcome, {userData.name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Continue your journey to strengthen pandemic preparedness across
            Africa
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>
              Keep up the great work! You're making real impact.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Overall Completion
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {userData.progress}%
                  </span>
                </div>
                <Progress value={userData.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {userData.completedModules}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">
                    {userData.totalModules - userData.completedModules}
                  </p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-success">
                    {userData.totalModules}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Modules</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              Learning Modules
            </h3>
            {/* <Button variant="outline">
              <Award className="mr-2 h-4 w-4" />
              My Certificates
            </Button> */}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mappedModules.map((module) => (
              <Card
                key={module.id}
                className={`border-2 transition-all cursor-pointer ${
                  module.status === "completed"
                    ? "border-success/50 hover:border-success"
                    : module.status === "in-progress"
                    ? "border-primary/50 hover:border-primary hover:shadow-lg"
                    : "border-muted hover:border-muted-foreground/30 opacity-75"
                }`}
                onClick={() => handleModuleClick(module)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        {module.status === "completed" && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                        {module.status === "in-progress" && (
                          <BookOpen className="h-5 w-5 text-primary" />
                        )}
                        {module.status === "locked" && (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="text-lg">Module {module.id}</span>
                      </CardTitle>
                      <h4 className="font-bold text-xl mb-2 text-foreground">
                        {module.title}
                      </h4>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {module.status !== "locked" && (
                      <>
                        <Progress value={module.progress} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {module.duration}
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            {module.progress}%
                          </span>
                        </div>
                      </>
                    )}

                    <Button
                      className="w-full"
                      variant={
                        module.status === "locked" ? "outline" : "default"
                      }
                      disabled={module.status === "locked"}
                    >
                      {module.status === "completed" && "Review Module"}
                      {module.status === "in-progress" && "Continue Learning"}
                      {module.status === "locked" && "Locked"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <p className="text-xl font-semibold italic text-foreground">
              "You are part of something bigger. Your knowledge helps Africa act
              faster."
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <img src={Logo} className="w-[100px]" />
                <p className="text-xs text-muted-foreground">
                  Learning Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/library")}
              >
                <Library className="mr-2 h-4 w-4" />
                Library
              </Button>
              {/* <Button variant="ghost" size="sm">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </Button> */}
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                <span className="text-primary font-semibold text-sm">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Conditional Rendering */}
      {userData.hasStartedCourse ? <ActiveLearningView /> : <WelcomeView />}
    </div>
  );
};

export default Dashboard;
