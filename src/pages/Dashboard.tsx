import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Lock, CheckCircle2, Library, Award, HelpCircle, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Sample user data
  const userData = {
    name: "Sarah Mukasa",
    progress: 25,
    completedModules: 1,
    totalModules: 4
  };

  const modules = [
    {
      id: 1,
      title: "Understanding the Foundations of PPR and CLM",
      description: "Introducing global and African PPR systems and CLM as a mechanism for accountability, justice, and participation",
      status: "in-progress",
      progress: 35,
      duration: "90 min",
      parts: 4
    },
    {
      id: 2,
      title: "The Principles and Practice of CLM",
      description: "Deep dive into community engagement methods, data collection, and accountability mechanisms",
      status: "locked",
      progress: 0,
      duration: "85 min",
      parts: 4
    },
    {
      id: 3,
      title: "Integrating CLM into PPR Systems",
      description: "Practical frameworks and strategies for bringing communities and health systems together",
      status: "locked",
      progress: 0,
      duration: "80 min",
      parts: 4
    },
    {
      id: 4,
      title: "Advocacy for Sustainable Integration",
      description: "Building lasting change through strategic advocacy, policy influence, and institutional partnerships",
      status: "locked",
      progress: 0,
      duration: "75 min",
      parts: 4
    }
  ];

  const handleModuleClick = (module: typeof modules[0]) => {
    if (module.status === "locked") {
      toast.info("Complete previous modules to unlock this one");
      return;
    }
    navigate(`/module/${module.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Kujua360</h1>
                <p className="text-xs text-muted-foreground">Learning Dashboard</p>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.info("Support feature coming soon")}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </Button>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                <span className="text-primary font-semibold text-sm">
                  {userData.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome back, {userData.name}! 👋</h2>
          <p className="text-muted-foreground">Continue your journey to strengthen pandemic preparedness across Africa</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>Keep up the great work! You're making real impact.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Completion</span>
                  <span className="text-sm font-bold text-primary">{userData.progress}%</span>
                </div>
                <Progress value={userData.progress} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{userData.completedModules}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">{userData.totalModules - userData.completedModules}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-success">{userData.totalModules}</p>
                  <p className="text-sm text-muted-foreground">Total Modules</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Learning Modules</h3>
            <Button variant="outline" onClick={() => navigate("/certificates")}>
              <Award className="mr-2 h-4 w-4" />
              My Certificates
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
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
                      <h4 className="font-bold text-xl mb-2 text-foreground">{module.title}</h4>
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
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                          <span className="text-sm font-semibold text-primary">{module.progress}%</span>
                        </div>
                      </>
                    )}
                    
                    <Button 
                      className="w-full"
                      variant={module.status === "locked" ? "outline" : "default"}
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
              "You are part of something bigger. Your knowledge helps Africa act faster."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
