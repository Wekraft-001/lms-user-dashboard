import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileText, Video, ExternalLink, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Library = () => {
  const navigate = useNavigate();

  const resources = [
    {
      type: "pdf",
      title: "WHO Framework for Pandemic Preparedness",
      module: "Module 1",
      size: "2.4 MB",
      description: "Comprehensive guide to global pandemic preparedness standards"
    },
    {
      type: "video",
      title: "Community-Led Monitoring in Action",
      module: "Module 2",
      duration: "12:34",
      description: "Real-world examples of CLM implementation across Africa"
    },
    {
      type: "pdf",
      title: "Integration Toolkit: CLM + PPR",
      module: "Module 3",
      size: "5.1 MB",
      description: "Step-by-step guide for integrating CLM into PPR frameworks"
    },
    {
      type: "link",
      title: "Africa CDC PPR Resources",
      module: "Module 1",
      url: "https://africacdc.org",
      description: "External resource hub from Africa CDC"
    },
    {
      type: "pdf",
      title: "Advocacy Strategy Template",
      module: "Module 4",
      size: "1.8 MB",
      description: "Customizable template for advocacy campaigns"
    },
    {
      type: "video",
      title: "Interview: CLM Success Stories",
      module: "Module 2",
      duration: "18:45",
      description: "Conversations with community advocates and implementers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">Resource Library</h1>
          <p className="text-lg text-muted-foreground">
            Access all course materials, videos, and external resources in one place
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-2 group hover:border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    resource.type === "pdf" ? "bg-primary/10" :
                    resource.type === "video" ? "bg-secondary/10" :
                    "bg-success/10"
                  }`}>
                    {resource.type === "pdf" && <FileText className="h-6 w-6 text-primary" />}
                    {resource.type === "video" && <Video className="h-6 w-6 text-secondary" />}
                    {resource.type === "link" && <ExternalLink className="h-6 w-6 text-success" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {resource.module}
                      </Badge>
                      {resource.size && (
                        <span className="text-xs text-muted-foreground">{resource.size}</span>
                      )}
                      {resource.duration && (
                        <span className="text-xs text-muted-foreground">{resource.duration}</span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>

                    <div className="flex gap-2">
                      {resource.type === "link" ? (
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Link
                        </Button>
                      ) : (
                        <>
                          {resource.type === "video" ? (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Video className="mr-2 h-4 w-4" />
                              Watch
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          )}
                          <Button size="sm" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
