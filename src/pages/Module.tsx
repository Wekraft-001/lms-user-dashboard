import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Play, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { EvidenceChain } from "@/components/games/EvidenceChain";
import { VoicesFirst } from "@/components/games/VoicesFirst";
import { EquityBuilder } from "@/components/games/EquityBuilder";
import { KnowledgeCheck } from "@/components/KnowledgeCheck";

const Module = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSegment, setCurrentSegment] = useState(0);

  const moduleContent = {
    title: "Understanding the Foundations of PPR and CLM",
    description: "This module lays the foundation for your learning journey, introducing global and African PPR systems and placing CLM as a mechanism for accountability, justice, and participation.",
    totalSegments: 16,
    segments: [
      {
        title: "Module Overview",
        type: "reading",
        content: `Who decides what "preparedness" means, and who gets to define whether we are prepared?

This module explores how Community-Led Monitoring (CLM) and Pandemic Preparedness and Response (PPR) can reinforce one another, creating health systems that are not only resilient but democratic—where data is not just collected about communities, but by and for them.

**Learning Objectives:**

By the end of this module, you will be able to:

1. Explain the basic purpose and structure of PPR systems at global and national levels
2. Describe the origins, purpose, and principles of CLM in health and development contexts
3. Identify the linkages and gaps between institutional preparedness systems and community realities
4. Reflect on why integrating community voices into preparedness is not optional but essential`,
        duration: "5 min"
      },
      {
        title: "Part 1: The Global Architecture of PPR",
        type: "reading",
        content: `The global PPR architecture is made up of a web of frameworks, agreements, and institutions that aim to get us ready for the next emergency.

**The International Health Regulations (IHR, 2005)** form the backbone. They are legally binding for 196 countries and set out what each country must do to detect, assess, report, and respond to public health threats.

To assess compliance, countries undergo two main processes:

**State Party Self-Assessment Annual Reporting (SPAR)**: An annual self-review where countries evaluate their public health capabilities across various domains such as surveillance, laboratory capacity, workforce, and emergency response.

**Joint External Evaluation (JEE)**: A voluntary, external review of national capacities across 19 technical areas spread across four main sections: Prevention, Detection, Response, and IHR-related Hazards and Points of Entry.`,
        videoUrl: "https://extranet.who.int/sph/sites/default/files/IHRMEF%20Tutorial.mp4",
        duration: "12 min"
      },
      {
        title: "Global PPR Instruments",
        type: "reading",
        content: `Supporting the IHR and its assessment processes are newer global instruments:

**WHO Pandemic Agreement**: Adopted by WHO member states on 20 May 2025, this agreement complements the IHR and outlines a framework for pandemic prevention, preparedness, and response (PPR), including equity in access to vaccines, diagnostics, and therapeutics.

**The Pandemic Fund**: Formally titled "Financial Intermediary Fund for Pandemic Prevention, Preparedness and Response," it's housed at the World Bank with WHO as the technical lead. Established following a G20 request in April 2022, it finances capacity building for prevention and response, focusing on low- and middle-income countries.

**Africa CDC's New Public Health Order**: This framework emphasizes five enablers: strong African public health institutions, expanded manufacturing of vaccines/diagnostics/therapeutics in Africa, workforce capacity, disease prevention (One Health), and collaboration.

**Africa's Health Security and Sovereignty Agenda**: Adopted in September 2025, this vision reflects the recognition that achieving universal health coverage and pandemic preparedness requires health sovereignty—the ability of African nations to finance, produce, and govern their own health systems.`,
        duration: "10 min"
      },
      {
        title: "Reflection: COVID-19 in Your Country",
        type: "interactive",
        content: `Think about the COVID-19 pandemic in your country.

**Reflection Questions:**

1. Who noticed the problem first—communities or institutions?
2. How quickly did local concerns reach decision-makers?
3. What gaps existed between community experiences and official responses?

Take a moment to consider these questions. Your reflections help contextualize how PPR systems work in practice versus theory.`,
        duration: "8 min"
      },
      {
        title: "Part 2: What is Community-Led Monitoring?",
        type: "reading",
        content: `CLM emerged from the HIV movement and has since been adopted across multiple health and social sectors. It is a rights-based approach in which communities systematically collect and use data to monitor the quality and accessibility of services, policies, and funding.

Unlike traditional monitoring efforts, CLM starts from the bottom up:

• **Who collects the data?** Communities themselves
• **Whose questions are asked?** The people directly affected shape and frame questions
• **Who acts on the findings?** Both communities and decision-makers, through evidence-based dialogue and advocacy

**CLM is not just a technical exercise—it is a political act.**

The true power of CLM is that it shifts power to communities, centers lived experience, and ensures that no one speaks about communities without speaking with them.`,
        duration: "8 min"
      },
      {
        title: "The Five Principles of CLM",
        type: "reading",
        content: `At its core, CLM is guided by five principles:

**1. Ownership**: Communities design and lead monitoring activities.
*Example: Kenya's I-Monitor system puts communities in full control—designing tools, selecting indicators, leading facility assessments, and negotiating service improvements.*

**2. Accountability**: Findings are used to demand and negotiate change.
*Example: South Africa's Ritshidze collects real-time feedback from thousands of public clinics, escalating issues to authorities and triggering joint action plans.*

**3. Transparency**: Data and decisions are shared openly.
*Example: In Malawi's malaria CLM programme, findings are openly discussed in Health Centre Advisory Committee meetings, building trust.*

**4. Participation**: All voices, especially those of marginalized groups, are included.
*Example: In Mozambique, sex workers, MSM, and AGYW lead monitoring, ensuring those most affected shape the agenda.*

**5. Equity**: Monitoring focuses on underserved communities.
*Example: Nigeria's CLM focuses on remote villages where surveillance is weakest, pushing programs to prioritize marginalized populations.*`,
        duration: "12 min"
      },
      {
        title: "Evidence Chain Game",
        type: "game",
        gameType: "evidence-chain",
        content: "Build an evidence chain by arranging CLM elements in the correct sequence: data collection → analysis → community dialogue → advocacy → system change. Complete cycles build trust!",
        duration: "15 min"
      },
      {
        title: "CLM Knowledge Check",
        type: "quiz",
        question: "Which of the following best describes Community-Led Monitoring?",
        options: [
          {
            id: "a",
            text: "Monitoring by government institutions for programme evaluation",
            isCorrect: false
          },
          {
            id: "b",
            text: "A donor-funded mechanism for data collection",
            isCorrect: false
          },
          {
            id: "c",
            text: "Community-owned monitoring for accountability and advocacy",
            isCorrect: true
          },
          {
            id: "d",
            text: "A health survey managed by international partners",
            isCorrect: false
          }
        ],
        duration: "5 min"
      },
      {
        title: "Part 3: Where PPR and CLM Meet",
        type: "reading",
        content: `PPR frameworks focus on the capacities of health systems—laboratories, surveillance, emergency operations. CLM focuses on people and how health systems function in reality. When the two intersect, the result is both technical and democratic strength.

**Real-World Examples:**

During COVID-19, community groups in Kenya and South Africa tracked PPE shortages and vaccine access, alerting authorities before official systems registered the gaps.

During Mpox outbreaks, key population networks in Nigeria provided real-time data on stigma and service access, helping shape public communication.

These examples show that CLM can act as:
• An early warning system within national PPR frameworks
• A feedback mechanism that captures service quality data
• A critical enabler of trust between communities and government

**Trust is non-negotiable.** In a crisis, effective public health strategies—from mass vaccination to contact tracing—hinge entirely on public trust.`,
        duration: "10 min"
      },
      {
        title: "Scenario: Risk Communication",
        type: "interactive",
        content: `**Scenario Activity:**

Imagine your country's PPR plan lists "risk communication" as a key objective.

**Question:** How could CLM contribute to ensuring that communication is inclusive, trusted, and grounded in local realities?

Consider:
• What community data would be valuable?
• How would you ensure marginalized voices are included?
• What feedback loops would strengthen trust?

Type your response and reflect on how community evidence makes preparedness more effective and equitable.`,
        duration: "10 min"
      },
      {
        title: "Voices First Game",
        type: "game",
        gameType: "voices-first",
        content: "Match community voices reporting early crisis signs with appropriate system responses. Build the trust bar by correctly connecting community alerts to institutional actions!",
        duration: "15 min"
      },
      {
        title: "Part 4: The Politics of Preparedness",
        type: "reading",
        content: `Preparedness is never neutral. It is a mirror of power: who is seen, who is heard, and who is protected when crisis strikes.

Every emergency response carries a quiet hierarchy of concern. Some lives are counted faster. Some data is trusted more. Some communities are remembered only after the damage is done.

For decades, global health systems have prioritized efficiency over equity. During the HIV crisis, data from sex workers and queer communities was dismissed. During COVID-19, migrants, informal workers, and people with disabilities were often invisible to surveillance systems.

**CLM challenges this order.** It insists that preparedness is not a technical checklist but a political contract.

CLM forces PPR frameworks to face uncomfortable questions:
• Who decides what counts as an emergency?
• Who sits at the table when budgets are written?
• Whose voices are heard when global agencies declare success?

When communities define risk, measure readiness, and monitor response, health security stops being charity and becomes justice.`,
        duration: "10 min"
      },
      {
        title: "Reflection: Invisible Until Counted",
        type: "interactive",
        content: `**Reflective Activity: "Invisible Until Counted"**

Think about one community in your country that was overlooked during COVID-19 or another public health emergency.

Ask yourself:
1. What made them invisible to official systems?
2. What kind of data or evidence could have made them visible earlier?
3. How might a CLM approach have changed their outcome?

"Visibility is power. CLM ensures that no life waits for permission to matter."`,
        duration: "8 min"
      },
      {
        title: "Equity Builder Game",
        type: "game",
        gameType: "equity-builder",
        content: "Distribute 10 Preparedness Tokens across five African communities. Balance risk and equity by investing in high-need, low-visibility areas. Fill the Justice Meter!",
        duration: "20 min"
      },
      {
        title: "Case Study: South Africa's Vaccine Roll-Out",
        type: "reading",
        content: `**Community Monitoring During South Africa's COVID-19 Vaccine Roll-Out**

In 2021, as South Africa launched its national COVID-19 vaccination drive, official systems reported strong progress. But CLM teams in Gauteng and KwaZulu-Natal began collecting real-time feedback from clinics, taxi ranks, and informal settlements.

**Their data told another story:**
• Many clinics lacked cold-chain equipment
• Mobile sites were undersupplied
• Undocumented migrants were being turned away

CLM partners compiled weekly briefs for provincial health departments and advocacy coalitions. Within weeks, provincial authorities adjusted logistics, retrained site staff, and added mobile units.

**Key Takeaway:** When communities monitor systems from below, national data becomes more honest, equitable, and useful. Preparedness is not built in labs—it is built in trust.

**Reflection:** What would preparedness look like if every community could produce evidence like this?`,
        duration: "12 min"
      },
      {
        title: "Module Summary",
        type: "reading",
        content: `**Key Takeaways:**

• PPR provides the structures for readiness, but structure without justice collapses under pressure
• CLM provides the eyes, ears, and conscience of preparedness, ensuring that the invisible become visible
• Together, they redefine preparedness as a matter of equity and shared power

**You've completed Module 1!** You now understand:
✓ How global PPR frameworks operate
✓ The five principles of Community-Led Monitoring
✓ Where CLM strengthens PPR systems
✓ Why preparedness is a political and ethical imperative

Next, you'll take a comprehensive assessment to demonstrate your mastery of these foundations.`,
        duration: "5 min"
      }
    ]
  };

  const currentContent = moduleContent.segments[currentSegment];
  const progress = ((currentSegment + 1) / moduleContent.totalSegments) * 100;

  const handleNext = () => {
    if (currentSegment < moduleContent.totalSegments - 1) {
      setCurrentSegment(currentSegment + 1);
    } else {
      toast.success("Module completed! Moving to assessment...");
      navigate("/quiz/" + id);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
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
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Module {id}</p>
                <p className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">{moduleContent.title}</h1>
            <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Segment {currentSegment + 1} of {moduleContent.totalSegments}
          </p>
        </div>

        {/* Learning Objectives Card */}
        {currentSegment === 0 && (
          <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Explain the basic purpose and structure of PPR systems at global and national levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Describe the origins, purpose, and principles of CLM in health and development contexts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Identify the linkages and gaps between institutional preparedness systems and community realities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Reflect on why integrating community voices into preparedness is not optional but essential</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Main Content Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl mb-2">{currentContent.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {currentContent.type === "reading" && <FileText className="h-4 w-4" />}
                  {currentContent.type === "interactive" && <Play className="h-4 w-4" />}
                  {currentContent.duration}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentContent.type === "game" ? (
              <div className="py-4">
                {currentContent.gameType === "evidence-chain" && <EvidenceChain />}
                {currentContent.gameType === "voices-first" && <VoicesFirst />}
                {currentContent.gameType === "equity-builder" && <EquityBuilder />}
              </div>
            ) : currentContent.type === "quiz" ? (
              <KnowledgeCheck 
                question={currentContent.question!}
                options={currentContent.options!}
              />
            ) : (
              <Tabs defaultValue="read" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="read">Read</TabsTrigger>
                  {currentContent.videoUrl && <TabsTrigger value="watch">Watch</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="read" className="space-y-4">
                  <div className="prose prose-slate max-w-none">
                    {currentContent.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {currentContent.type === "interactive" && (
                    <div className="mt-6 p-6 bg-muted/50 rounded-lg border-2 border-dashed border-primary/30">
                      <p className="text-center text-muted-foreground italic">
                        💡 Interactive element: Reflection prompt or mini-activity would appear here
                      </p>
                    </div>
                  )}
                </TabsContent>

                {currentContent.videoUrl && (
                  <TabsContent value="watch">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-full"
                        src={currentContent.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSegment === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {currentSegment === moduleContent.totalSegments - 1 ? "Complete Module" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module;
