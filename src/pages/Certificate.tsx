import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Award, Download, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Certificate = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const certificateRef = useRef<HTMLDivElement>(null);

  // User Data (includes date of completion)
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
    queryKey: ["userDetails-certificate"],
    queryFn: fetchUserDetails,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // Sample user data - in production, this would come from authentication
  const userData = {
    name: `${userProfile?.firstName} ${userProfile?.lastName}`,
    completionDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  // Module titles mapping
  const moduleTitle =
    moduleId === "final"
      ? "Complete Kujua360 Learning Program"
      : `Module ${moduleId} - ${getModuleTitle(moduleId)}`;

  function getModuleTitle(id: string | undefined) {
    const titles: Record<string, string> = {
      "1": "Foundations of PPR and CLM",
      "2": "Principles and Practice of CLM",
      "3": "Integrating CLM into PPR Systems",
      "4": "Advocacy for Sustainable Integration",
    };
    return titles[id || "1"] || "Learning Module";
  }

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      toast.info("Generating your certificate...");

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `Kujua360-Certificate-${userData.name.replace(/\s+/g, "-")}.pdf`
      );

      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate certificate. Please try again.");
    }
  };

  const handleShare = () => {
    toast.info("Share feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                size="sm"
                onClick={handleDownload}
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Celebration Message */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <Award className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              Congratulations, {userData.name}! 🎉
            </h1>
            <p className="text-muted-foreground text-lg">
              You've successfully completed {moduleTitle}
            </p>
          </div>

          {/* Certificate */}
          <Card className="overflow-hidden shadow-2xl mb-8">
            <div
              ref={certificateRef}
              className="bg-white p-12 md:p-16 relative"
              style={{ aspectRatio: "1.414/1" }}
            >
              {/* Decorative Border */}
              <div
                className="absolute inset-4 border-4 border-double pointer-events-none"
                style={{ borderColor: "#e41f28" }}
              />

              {/* Inner Border */}
              <div
                className="absolute inset-6 border pointer-events-none"
                style={{ borderColor: "#a9d04f" }}
              />

              {/* Certificate Content */}
              <div className="relative h-full flex flex-col items-center justify-between text-center">
                {/* Logos */}
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-white"
                    style={{ backgroundColor: "#e41f28" }}
                  >
                    AA
                  </div>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-white"
                    style={{ backgroundColor: "#007a87" }}
                  >
                    C
                  </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: "#002776" }}
                  >
                    Certificate of Completion
                  </h2>
                  <div
                    className="w-32 h-1 mx-auto"
                    style={{ backgroundColor: "#6a8438" }}
                  />
                </div>

                {/* Body Text */}
                <div className="space-y-6 flex-1 flex flex-col justify-center">
                  <p className="text-lg" style={{ color: "#000000" }}>
                    This is to certify that
                  </p>

                  <h3
                    className="text-3xl md:text-4xl font-bold px-8 py-2 border-b-2 inline-block"
                    style={{ color: "#e41f28", borderColor: "#a9d04f" }}
                  >
                    {userData.name}
                  </h3>

                  <p
                    className="text-lg max-w-2xl mx-auto"
                    style={{ color: "#000000" }}
                  >
                    has successfully completed
                  </p>

                  <h4
                    className="text-xl md:text-2xl font-semibold max-w-2xl mx-auto"
                    style={{ color: "#002776" }}
                  >
                    {moduleTitle}
                  </h4>

                  <p className="text-base" style={{ color: "#000000" }}>
                    as part of the{" "}
                    <strong>Kujua360: Knowing Together, Acting Faster</strong>{" "}
                    learning program
                  </p>
                </div>

                {/* Footer */}
                <div
                  className="w-full grid grid-cols-2 gap-8 pt-8 border-t"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <div>
                    <div
                      className="w-32 h-px mx-auto mb-2"
                      style={{ backgroundColor: "#000000" }}
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#000000" }}
                    >
                      African Alliance
                    </p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      Lead Organization
                    </p>
                  </div>
                  <div>
                    <div
                      className="w-32 h-px mx-auto mb-2"
                      style={{ backgroundColor: "#000000" }}
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#000000" }}
                    >
                      COPPER Consortium
                    </p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      Strategic Partner
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-4">
                  <p className="text-sm" style={{ color: "#6b7280" }}>
                    Awarded on {userData.completionDate}
                  </p>
                </div>

                {/* Watermark */}
                <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
                  <Award className="h-32 w-32" style={{ color: "#e41f28" }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Continue Learning
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore more modules and deepen your understanding of CLM and
                PPR integration.
              </p>
              <Button variant="outline" className="w-full">
                View Dashboard
              </Button>
            </Card>

            <Card
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/library")}
            >
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Access Resources
              </h3>
              <p className="text-muted-foreground mb-4">
                Browse our library of materials, videos, and policy briefs to
                support your work.
              </p>
              <Button variant="outline" className="w-full">
                Visit Library
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
