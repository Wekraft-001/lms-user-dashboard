import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Target, TrendingUp, CheckCircle, Globe, Shield, Award, ArrowRight, Play } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import communityLearning from "@/assets/community-learning.jpg";
import Logo from "@/assets/logo.svg";
import AALogo from "@/assets/AA-LOGO.svg";
import CopperLogo from "@/assets/copper-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  const modules = [
    {
      icon: BookOpen,
      number: 1,
      title: "Understanding the Foundations of PPPR and CLM",
      description: "Understanding pandemic preparedness and community-led monitoring basics",
    },
    {
      icon: Users,
      number: 2,
      title: "The Principles and Practice of CLM",
      description: "Deep dive into community engagement and accountability mechanisms",
    },
    {
      icon: Target,
      number: 3,
      title: "Integrating CLM into PPPR Frameworks",
      description: "Practical frameworks for bringing communities and systems together",
    },
    {
      icon: TrendingUp,
      number: 4,
      title: "Action, Advocacy and Sustainability",
      description: "Building lasting change through strategic advocacy and policy influence",
    },
  ];

  const features = [
    {
      icon: Play,
      title: "Interactive Learning",
      description: "Engaging videos, scenarios, and games that bring concepts to life",
    },
    {
      icon: BookOpen,
      title: "Evidence-Based",
      description: "Built on proven CLM frameworks and WHO-endorsed PPPR standards",
    },
    {
      icon: Award,
      title: "Earn Certificate",
      description: "Complete all modules and receive your certificate of achievement",
    },
  ];

  const stats = [
    { value: "4", label: "Comprehensive Modules" },
    { value: "5.5", label: "Hours of Content" },
    { value: "16+", label: "Interactive Activities" },
    { value: "1", label: "Certificate Earned" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logos */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <img src={Logo} className="w-[120px] md:w-[140px]" alt="Kujua360 Logo" />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={AALogo} className="w-[200px]" alt="African Alliance" />
              <span className="text-muted-foreground">+</span>
              <img src={CopperLogo} className="w-[115px]" alt="COPPER" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button size="sm" onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] md:min-h-[85vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D00000]/95 via-[#D00000]/85 to-[#002776]/90" />
        </div>

        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-300" />
        </div>

        <div className="relative container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 animate-fade-in">
              {/* <Globe className="h-4 w-4" /> */}
              <span className="text-sm font-medium">Powered by African Alliance & COPPER Consortium </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Kujua360
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 mb-4 font-medium animate-fade-in animation-delay-100">
              Knowing Together, Acting Faster
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              An interactive e-learning experience on Community-Led Monitoring and Pandemic Prevention, Preparedness & Response Integration
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
              <Button
                onClick={() => navigate("/register")}
                size="lg"
                className="bg-white text-[#d00000] hover:bg-white/90 text-lg  h-auto p-3 md:p-4 rounded-md font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg h-auto p-3 md:p-4 font-semibold bg-white/5 backdrop-blur-sm"
              >
                Already Have an Account?
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose Kujua360?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern learning platform designed for African health advocates and practitioners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all group text-center">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Partners
            </h2>
            <p className="text-xl text-muted-foreground">
              Brought to you by leading African health organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-xl transition-all group overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img src={AALogo} className="h-12" alt="African Alliance" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">African Alliance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A community-centered organization advancing health justice, accountability, and advocacy across Africa. They lead the development of Kujua360 to strengthen community participation in health systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-all group overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img src={CopperLogo} className="h-12" alt="COPPER" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">COPPER Consortium</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Communities in Pandemic Preparedness & Response (COPPER) is a Global Fund-supported consortium strengthening community-led approaches that enhance Africa's readiness and response to pandemics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                From the Frontlines to the Frameworks
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Kujua360 is an interactive e-learning platform developed by the African Alliance, as part of the Global Fund supported COPPER Consortium to bring Community-Led Monitoring (CLM) and Pandemic Prevention, Preparedness and Response (PPR) together in one dynamic learning space.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  CLM has proven to be a powerful mechanism for accountability and advocacy in the health sector. Through engaging modules, Kujua360 simplifies complex PPR concepts and demonstrates how communities can drive integration between the two.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={communityLearning}
                  alt="Community learning together"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 border-2 border-primary/20">
              <CardContent className="p-8">
                <p className="text-xl md:text-2xl font-medium text-center text-foreground italic">
                  "When the next crisis strikes, it won't start in a boardroom. It starts where people live, work, and care."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Modules Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Your Learning Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Four interactive modules to transform understanding into action
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 transition-all hover:shadow-xl group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-16 md:w-20 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl md:text-4xl font-bold text-primary">{module.number}</span>
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <h3 className="text-lg font-bold text-foreground">{module.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm pl-8">{module.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 bg-gradient-to-br from-[#D00000] via-[#D00000] to-[#002776] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why It Matters</h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
            Preparedness is not a distant policy goal but a living, community-led practice across Africa. Kujua360 ensures that when the next crisis strikes, communities are not just prepared — they are leading the response.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Knowledge into Action?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join advocates, implementers, and policymakers building a stronger, more prepared Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg p-3 h-auto font-semibold"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              variant="outline"
              className="border-2 border-white text-[#D00000] hover:bg-red-600/10 text-lg p-3 h-auto font-semibold"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <img src={Logo} className="w-[150px] mb-3 mx-auto md:mx-0 brightness-0 invert" alt="Kujua360" />
              <p className="text-white/60 text-sm">
                Empowering communities. Building resilience. Saving lives.
              </p>
            </div>

            {/* <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <a
                onClick={() => navigate("/policy")}
                className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm"
              >
                Terms & Conditions
              </a>
              <a
                href="mailto:info@africanhealthalliance.org"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </a>
            </div> */}

            <div className="flex items-center gap-4">
              <img src={AALogo} className="w-[200px] brightness-0 invert opacity-70" alt="African Alliance" />
              <img src={CopperLogo} className="w-[120px] brightness-0 invert opacity-70" alt="COPPER" />
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} African Alliance & COPPER Consortium. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
