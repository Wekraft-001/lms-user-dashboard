import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Heart,
  Calendar,
  BookOpen,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface ReflectionResponse {
  promptId: number;
  question: string;
  response: string;
}

interface Reflection {
  id: string;
  moduleId: number;
  segmentId: number;
  activityTitle: string;
  responses: ReflectionResponse[];
  createdAt: string;
}

const moduleNames: Record<number, string> = {
  1: "Understanding the Foundations of PPPR and CLM",
  2: "The Principles and Practice of CLM",
  3: "Advocacy and Stakeholder Engagement",
  4: "Institutionalizing CLM in PPR Systems",
};

const MyReflections = () => {
  const navigate = useNavigate();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedReflections, setExpandedReflections] = useState<Set<string>>(new Set());

  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchReflections();
  }, [token, navigate]);

  const fetchReflections = async () => {
    try {
      const response = await axios.get(`${apiURL}/reflections/my-reflections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReflections(response.data || []);
    } catch (error) {
      console.error("Error fetching reflections:", error);
      toast.error("Failed to load reflections");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedReflections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupedReflections = reflections.reduce((acc, reflection) => {
    const moduleId = reflection.moduleId;
    if (!acc[moduleId]) {
      acc[moduleId] = [];
    }
    acc[moduleId].push(reflection);
    return acc;
  }, {} as Record<number, Reflection[]>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">My Reflections</h1>
                <p className="text-sm text-muted-foreground">
                  Your learning journey thoughts
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </Card>
            ))}
          </div>
        ) : reflections.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Reflections Yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              As you progress through the modules, your reflections will appear here.
              Start learning to share your thoughts and insights.
            </p>
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{reflections.length}</p>
                <p className="text-sm text-muted-foreground">Total Reflections</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-secondary">
                  {Object.keys(groupedReflections).length}
                </p>
                <p className="text-sm text-muted-foreground">Modules Covered</p>
              </Card>
              <Card className="p-4 text-center col-span-2 md:col-span-1">
                <p className="text-3xl font-bold text-success">
                  {reflections.reduce((acc, r) => acc + r.responses.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Questions Answered</p>
              </Card>
            </div>

            {/* Reflections by Module */}
            {Object.entries(groupedReflections)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([moduleId, moduleReflections]) => (
                <div key={moduleId} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">
                      Module {moduleId}: {moduleNames[Number(moduleId)] || "Unknown"}
                    </h2>
                    <Badge variant="secondary">{moduleReflections.length}</Badge>
                  </div>

                  <div className="space-y-4">
                    {moduleReflections.map((reflection) => {
                      const isExpanded = expandedReflections.has(reflection.id);
                      return (
                        <Card key={reflection.id} className="overflow-hidden">
                          <button
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                            onClick={() => toggleExpanded(reflection.id)}
                          >
                            <div className="flex-1">
                              <h3 className="font-medium text-foreground">
                                {reflection.activityTitle}
                              </h3>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(reflection.createdAt)}
                                <span className="mx-1">•</span>
                                <MessageSquare className="h-3.5 w-3.5" />
                                {reflection.responses.length} response{reflection.responses.length !== 1 ? "s" : ""}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="border-t border-border p-4 space-y-4 bg-muted/20">
                              {reflection.responses.map((response, idx) => (
                                <div key={response.promptId} className="space-y-2">
                                  <p className="text-sm font-medium text-muted-foreground">
                                    {idx + 1}. {response.question}
                                  </p>
                                  <p className="text-foreground bg-card p-3 rounded-md border border-border">
                                    {response.response}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyReflections;
