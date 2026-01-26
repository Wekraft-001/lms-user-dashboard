import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.svg";

const Policy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <img src={Logo} className="w-[100px]" alt="Kujua360 Logo" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <Card className="border-2">
          <CardContent className="p-8 prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Kujua360 platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kujua360 is an interactive e-learning platform developed by African Alliance in partnership with the COPPER Consortium. The platform provides educational content on Community-Led Monitoring (CLM) and Pandemic Prevention, Preparedness and Response (PPPR).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To access the full features of Kujua360, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on Kujua360, including but not limited to text, graphics, logos, videos, and course materials, is the property of African Alliance and the COPPER Consortium. You may not reproduce, distribute, or create derivative works from this content without express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">5. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use the platform for any unlawful purpose</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to interfere with the proper functioning of the platform</li>
                <li>Upload or transmit harmful content or malware</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">6. Certificates</h2>
              <p className="text-muted-foreground leading-relaxed">
                Upon successful completion of all course modules and assessments, you may receive a certificate of completion. Certificates are issued based on your demonstrated learning and are non-transferable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">7. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. We collect and use personal information only as necessary to provide our services. We do not sell or share your personal information with third parties except as required by law or to provide our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">8. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kujua360 is provided "as is" without warranties of any kind. We do not guarantee that the platform will be uninterrupted, secure, or error-free. Educational content is provided for informational purposes and should not be considered professional medical or health advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                African Alliance and the COPPER Consortium shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>African Alliance</strong><br />
                Email: info@africanhealthalliance.org
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            © {new Date().getFullYear()} African Alliance & COPPER Consortium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Policy;
