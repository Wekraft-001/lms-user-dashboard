import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileText, Video, ExternalLink, Download, Play, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { getAllLibraryResources, LibraryResource } from "@/data/libraryResources";
import Logo from "@/assets/logo.svg";

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const allResources = useMemo(() => getAllLibraryResources(), []);

  const filteredResources = useMemo(() => {
    let resources = allResources;

    // Filter by type
    if (activeTab !== "all") {
      resources = resources.filter((r) => r.type === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      resources = resources.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description?.toLowerCase().includes(query) ||
          r.module.toLowerCase().includes(query)
      );
    }

    return resources;
  }, [allResources, activeTab, searchQuery]);

  const videoCount = allResources.filter((r) => r.type === "video").length;
  const pdfCount = allResources.filter((r) => r.type === "pdf").length;
  const linkCount = allResources.filter((r) => r.type === "link").length;

  const handleResourceAction = (resource: LibraryResource) => {
    if (resource.type === "link") {
      window.open(resource.url, "_blank");
    } else if (resource.type === "video") {
      // For videos, open in new tab or play inline
      window.open(resource.url, "_blank");
    }
    // PDFs would typically trigger download
  };

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
            <img src={Logo} className="w-[100px]" alt="Kujua360 Logo" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">Resource Library</h1>
          <p className="text-lg text-muted-foreground">
            Access all course videos, materials, and external resources in one place
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-2 bg-primary/5">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-primary">{videoCount}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </CardContent>
          </Card>
          <Card className="border-2 bg-secondary/5">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-secondary">{pdfCount}</p>
              <p className="text-sm text-muted-foreground">Documents</p>
            </CardContent>
          </Card>
          <Card className="border-2 bg-success/5">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-success">{linkCount}</p>
              <p className="text-sm text-muted-foreground">External Links</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              All ({allResources.length})
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos ({videoCount})
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents ({pdfCount})
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Links ({linkCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No resources found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredResources.map((resource, index) => (
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
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {resource.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
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

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </p>

                      <div className="flex gap-2">
                        {resource.type === "link" ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleResourceAction(resource)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Link
                          </Button>
                        ) : resource.type === "video" ? (
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleResourceAction(resource)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Watch Video
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" className="flex-1">
                              <FileText className="mr-2 h-4 w-4" />
                              View
                            </Button>
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
        )}
      </div>
    </div>
  );
};

export default Library;
