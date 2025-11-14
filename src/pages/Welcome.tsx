import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Target, TrendingUp } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import communityLearning from "@/assets/community-learning.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  const modules = [
    {
      icon: BookOpen,
      title: "Foundations of PPR and CLM",
      description: "Understanding pandemic preparedness and community-led monitoring basics"
    },
    {
      icon: Users,
      title: "Principles and Practice of CLM",
      description: "Deep dive into community engagement and accountability mechanisms"
    },
    {
      icon: Target,
      title: "Integrating CLM into PPR Systems",
      description: "Practical frameworks for bringing communities and systems together"
    },
    {
      icon: TrendingUp,
      title: "Advocacy for Sustainable Integration",
      description: "Building lasting change through strategic advocacy and policy influence"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logos */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Kujua360</h1>
              <p className="text-xs text-muted-foreground">Knowing Together, Acting Faster</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-medium text-muted-foreground">Powered by</p>
              <p className="text-sm font-bold text-primary">African Alliance + COPPER</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kujua360: Knowing Together, Acting Faster
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              An interactive learning experience on CLM and PPR Integration
            </p>
            <p className="text-lg text-white/80 mb-10">
              Brought to you by African Alliance in partnership with the Communities in Pandemic Preparedness & Response (COPPER) Consortium
            </p>
            <Button 
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold animate-scale-in"
            >
              Begin Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">About African Alliance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  African Alliance is a community-centered organization advancing health justice, accountability, and advocacy across Africa. They lead the development of Kujua360 to strengthen community participation in health systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">About COPPER</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Communities in Pandemic Preparedness & Response (COPPER) is a Global Fund-supported consortium strengthening community-led approaches that enhance Africa's readiness and response to pandemics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                From the Frontlines to the Frameworks
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Kujua360 is an interactive e-learning platform developed by the African Alliance, as part of the Global Fund supported COPPER Consortium to bring Community-Led Monitoring (CLM) and Pandemic Prevention, Preparedness and Response (PPR) together in one dynamic learning space.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                CLM has proven to be a powerful mechanism for accountability and advocacy in the health sector. In a world facing the growing threat of pandemics, understanding how CLM strengthens PPR frameworks has become critical. Kujua360 turns this understanding into action.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through engaging modules, Kujua360 simplifies complex PPR concepts, explains the principles and value of CLM, and demonstrates how communities can drive integration between the two. Designed for CLM implementers, advocates, policymakers, and partners, the platform transforms knowledge into shared capacity.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <img 
                src={communityLearning} 
                alt="Community learning together" 
                className="w-full h-auto"
              />
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 rounded-2xl p-8 mb-16 border-2 border-primary/20">
              <p className="text-2xl font-semibold text-center text-foreground italic">
                "When the next crisis strikes, it won't start in a boardroom. It starts where people live, work, and care."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Overview */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Your Learning Journey</h2>
            <p className="text-xl text-muted-foreground">Four interactive modules to transform understanding into action</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={index}
                  className="border-2 hover:border-primary transition-all hover:shadow-lg group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">{module.title}</h3>
                        <p className="text-muted-foreground">{module.description}</p>
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
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Why It Matters</h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Preparedness is not a distant policy goal but a living, community-led practice across Africa. 
            Kujua360 ensures that when the next crisis strikes, communities are not just prepared—they are leading the response.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary via-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Knowledge into Action?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of advocates, implementers, and policymakers building a stronger, more prepared Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
            >
              Get Started Now
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-semibold"
            >
              Already Have an Account?
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 mb-2">
            © 2024 African Alliance & COPPER Consortium. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Empowering communities. Building resilience. Saving lives.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
