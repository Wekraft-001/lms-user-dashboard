import { ModuleContent } from "./types";

export const module3Content: ModuleContent = {
  title: "Integrating CLM into PPPR",
  description:
    "This module explores how CLM can be embedded into national and regional PPPR frameworks so that community evidence informs preparedness assessments, planning, response monitoring, and accountability processes.",
  totalSegments: 18,
  learningObjectives: [
    "Identify concrete entry points where CLM data can be integrated into existing PPPR processes",
    "Explain how community-generated evidence can strengthen preparedness assessments, plans, and response monitoring",
    "Recognise common political, technical, and institutional barriers to integrating CLM into PPPR systems",
    "Analyse case studies where CLM influenced preparedness and response decisions",
    "Reflect on the governance implications of integrating community data into state-led health security systems",
  ],
  segments: [
    // OVERVIEW
    {
      title: "Module 3 Overview",
      type: "reading",
      content: `In Module 1, you explored how global and African pandemic prevention, preparedness, and response (PPPR) systems are designed, and where communities are often positioned at the margins of those systems.

In Module 2, you learned how Community-Led Monitoring (CLM) works in practice, as a cycle of action and as a tool for justice. You examined how communities generate evidence, engage duty bearers, and track whether change actually happens.

<b>Module 3 takes the next step.</b>

It asks a critical question:

<i>If communities are producing credible, ethical, and actionable evidence through CLM, how does that evidence enter the formal systems that govern preparedness and response?</i>

This module focuses on <b>integration, not participation</b>. It explores how CLM can be embedded into national and regional PPPR frameworks so that community evidence informs preparedness assessments, planning, response monitoring, and accountability processes, rather than sitting outside them.`,
      duration: "5 min",
    },

    // PART 1: FROM MONITORING TO INTEGRATION
    {
      title: "Part 1: CLM and PPPR Systems – Where Do They Meet?",
      type: "reading",
      content: `Most countries already have PPPR architectures in place. These may include preparedness assessments, surveillance systems, national action plans, emergency operations centres, response dashboards, and after-action reviews.

<b>On paper, these systems appear comprehensive.</b>

In practice, they often struggle to answer basic questions:
<ul>
<li>Are services actually functioning where people live?</li>
<li>Who is excluded when systems are under pressure?</li>
<li>Which failures appear first, and where?</li>
</ul>

<b>CLM enters at this point.</b>

CLM does not replace epidemiological surveillance or technical indicators. Instead, it adds a layer of <b>lived system intelligence</b> that formal systems consistently lack.

Community evidence captures how policies, plans, and response measures perform in real settings, under real stress, and for people who are often invisible in official reporting.

<b>Integration</b> means that CLM data is recognised as a legitimate input into PPPR processes, rather than being treated as anecdotal feedback or advocacy noise.`,
      duration: "6 min",
    },
    {
      title: "Entry Points for CLM Integration",
      type: "reading",
      content: `CLM does not integrate everywhere at once. It enters through specific moments and processes.

<b>Common entry points include:</b>
<ul>
<li><b>Preparedness assessments and reviews:</b> where CLM data can surface blind spots in official self-reporting.</li>
<li><b>National action plans and strategies:</b> where community evidence can inform priorities and sequencing.</li>
<li><b>Response monitoring dashboards:</b> where CLM tracks service continuity, access, and harm alongside case counts.</li>
<li><b>After-action reviews:</b> where CLM challenges sanitised narratives of success and documents what actually happened.</li>
</ul>

<b>Integration is most likely where there is:</b>
<ul>
<li>A formal review or planning cycle</li>
<li>A requirement to demonstrate accountability</li>
<li>Political openness to community engagement</li>
<li>Existing relationships between CLM networks and officials</li>
</ul>`,
      duration: "5 min",
    },
    {
      title: "What Meaningful Integration Looks Like",
      type: "reading",
      content: `<b>Integration is not achieved simply by submitting a report.</b>

Meaningful integration occurs when:
<ul>
<li>CLM indicators are referenced in preparedness plans or response documents.</li>
<li>Community findings are discussed in technical working groups, task teams, or review panels.</li>
<li>Duty bearers make documented commitments with timelines and responsible actors.</li>
<li>Follow-up monitoring is expected and acted upon.</li>
</ul>

<b>Watch out for symbolic integration:</b>

This is when CLM is cited rhetorically but does not influence decisions, budgets, or response design. We must distinguish between genuine integration and window dressing.

<b>Key insight:</b> Integration is shaped by power, mandates, and incentives—not just evidence strength.`,
      duration: "4 min",
    },
    {
      title: "Reflection: PPPR Integration in Your Context",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Reflective Activity: Integration Entry Points",
        context:
          "Think of a PPPR process you are familiar with, such as a preparedness plan, emergency task team, or response review.",
        prompts: [
          {
            id: 1,
            question:
              "Name one point where CLM evidence could be integrated into this process.",
          },
          {
            id: 2,
            question:
              "What would make integration easier or harder in that space?",
          },
          {
            id: 3,
            question:
              "Who holds the power to decide whether community evidence is taken seriously?",
          },
        ],
        closingQuote:
          "Integration is shaped by power, mandates, and incentives—not just evidence strength.",
      },
      duration: "6 min",
    },
    {
      title: "Part 1: Read / Listen / Watch",
      type: "resources",
      duration: "45 min",
      summaryCards: [
        {
          title: "From Evidence to Influence: Integrating Community Data into Preparedness Systems",
          source: "UNAIDS (2023)",
          type: "Guide",
          readingTime: "15 min",
          description:
            "This report profiles CLM as a systematic, evidence-driven advocacy tool. It shows how community data has been used in national decision spaces, contributed to dialogue with health officials, and reinforced accountability across disease programmes.",
          link: "https://www.unaids.org/sites/default/files/media_asset/JC3085E_community-led-monitoring-in-action_en.pdf",
        },
        {
          title: "Preparedness Is a Process, Not a Score",
          source: "Global Health Security Webinar",
          type: "Webinar Recording",
          readingTime: "20 min",
          description:
            "Explores why preparedness assessments often miss lived system performance and how CLM corrects this. Covers governance, political leadership, and why scores alone do not capture real-world readiness.",
          link: "https://youtu.be/feJK-QR3_zU",
        },
        {
          title: "Whose Data Counts in a Crisis?",
          source: "Africa Public Health Podcast",
          type: "Podcast",
          readingTime: "10 min",
          description:
            "Expert conversations on pandemic preparedness and data-driven decision making in African contexts. Discusses political resistance, data credibility, and how data influences response strategies.",
          link: "https://africacdc.org/africa-public-health-podcast/",
        },
      ],
    },
    {
      title: "Let's Play! Find the Entry Point",
      type: "game",
      gameType: "find-the-entry-point",
      content:
        "A strategy game where you match CLM evidence to the most effective PPPR integration point. Drag CLM findings to the right process: Preparedness Assessment, National Action Plan, Emergency Task Team, Response Dashboard, or After-Action Review.",
      duration: "12 min",
    },

    // PART 2: CASE STUDIES OF INTEGRATION
    {
      title: "Part 2: Case Studies of Integration",
      type: "reading",
      content: `<b>Learning from Real-World Examples</b>

Case studies help us understand how integration works in practice—and why it often fails. They reveal how power, resistance, and timing shape whether community evidence gets heard.

In this section, we examine three cases:
<ol>
<li>CLM and COVID-19 Vaccine Equity</li>
<li>CLM During Mpox and Emerging Outbreaks</li>
<li>Protecting HIV Service Continuity During Crises</li>
</ol>

Each case shows where integration succeeded, where it failed, and what strategies helped community evidence gain traction.`,
      duration: "3 min",
    },
    {
      title: "Case Study 1: CLM and COVID-19 Vaccine Equity",
      type: "reading",
      content: `<b>CLM and COVID-19 Vaccine Equity</b>

During COVID-19, many CLM initiatives documented unequal access to vaccines, information, and adverse event responses.

<b>Community monitors tracked:</b>
<ul>
<li>Who was reached first and who waited longest</li>
<li>Where risk communication failed or excluded certain groups</li>
<li>How vaccine safety concerns were addressed or ignored</li>
</ul>

In several contexts, CLM evidence was used to challenge official rollout narratives and push for changes in delivery strategies, including outreach models and communication approaches.

<b>Where integration failed:</b>
This case also shows where integration broke down—particularly when equity concerns were seen as politically inconvenient. Some governments dismissed community findings as "anecdotal" or "inflammatory."

<b>Key lesson:</b> Evidence needs allies inside institutions to break through political resistance.`,
      duration: "5 min",
    },
    {
      title: "Case Study 2: CLM During Mpox Outbreaks",
      type: "reading",
      content: `<b>CLM During Mpox and Emerging Outbreaks</b>

Mpox responses exposed how stigma, fear, and discrimination shape access to care.

<b>CLM documented:</b>
<ul>
<li>Discriminatory treatment in health facilities</li>
<li>Delays in diagnosis and referral</li>
<li>Gaps in risk communication for affected communities</li>
</ul>

In some settings, this evidence informed response planning and communication strategies. In others, it was dismissed as sensitive or disruptive.

<b>Why integration varied:</b>
<ul>
<li>Where key population networks had pre-existing relationships with health officials, evidence was taken seriously</li>
<li>Where stigma was high and political will low, CLM findings were sidelined</li>
</ul>

<b>Key lesson:</b> Trust and relationships built before a crisis determine whether evidence is heard during one.`,
      duration: "5 min",
    },
    {
      title: "Case Study 3: Protecting HIV Service Continuity",
      type: "reading",
      content: `<b>Protecting HIV Service Continuity During Crises</b>

Existing CLM platforms monitoring HIV services expanded their scope during emergencies.

By adding PPPR-related indicators, communities tracked:
<ul>
<li>Stockouts and service disruptions</li>
<li>Shifts to emergency delivery models</li>
<li>Which populations lost access when systems were strained</li>
</ul>

<b>Results:</b>
This case demonstrates how CLM helped protect chronic care during acute crises and influenced broader preparedness discussions.

<b>Key lesson:</b> CLM platforms built for one purpose can pivot to new emergencies—if they have the flexibility and resources to do so.`,
      duration: "4 min",
    },
    {
      title: "Scenario: Positioning CLM Evidence",
      type: "interactive",
      interactiveType: "scenario",
      scenarioData: {
        scenario:
          "You are part of a CLM network monitoring health services. A national preparedness review is approaching. You have strong CLM evidence on service failures affecting specific communities.",
        question:
          "Choose one process (Preparedness review, Emergency response dashboard, or After-action review) and explain how you would position your CLM data for integration.",
        prompts: [
          "How would you position your CLM data for integration?",
          "What resistance do you expect?",
          "How would you respond to that resistance?",
        ],
        sampleResponse:
          "For a preparedness review, I would present CLM findings as a complement to official self-assessments, highlighting gaps that technical indicators miss. I would expect resistance around data credibility and political sensitivity. To respond, I would bring community monitors to present their own findings, partner with sympathetic officials, and frame the evidence as strengthening (not attacking) national preparedness.",
      },
      duration: "8 min",
    },
    {
      title: "Part 2: Read / Listen / Watch",
      type: "resources",
      duration: "40 min",
      summaryCards: [
        {
          title: "Community Evidence in COVID-19 Vaccine Rollout Decisions",
          source: "MDPI Vaccines Journal",
          type: "Case Study",
          readingTime: "10 min",
          description:
            "Illustrates how community-generated evidence was used to adapt vaccine delivery strategies, making rollouts more equitable and responsive to lived realities.",
          link: "https://www.mdpi.com/2076-393X/11/7/1180",
        },
        {
          title: "Monitoring Mpox Beyond Case Counts",
          source: "WHO Africa Regional Office",
          type: "Webinar Recording",
          readingTime: "15 min",
          description:
            "Showcases how African countries responded to mpox, with discussion on community engagement, risk communication, and addressing stigma barriers.",
          link: "https://www.youtube.com/watch?v=sqGW83MmFhs",
        },
        {
          title: "Getting the Most from After-Action Reviews",
          source: "BMJ Global Health",
          type: "Article",
          readingTime: "15 min",
          description:
            "Reviews the role of After Action Reviews (AARs) and how CLM can ensure that post-crisis learning reflects what people experienced on the ground.",
          link: "https://gh.bmj.com/content/5/10/e003276",
        },
      ],
    },

    // SUMMARY
    {
      title: "Module 3 Summary",
      type: "reading",
      content: `<b>Key Takeaways from Module 3:</b>

<ul>
<li><b>CLM produces evidence, but integration determines impact.</b> Without integration, community data sits outside the systems that govern preparedness and response.</li>
<li><b>Integration means community data shaping plans, decisions, and accountability.</b> Not just being cited, but being acted upon.</li>
<li><b>Entry points matter.</b> Timing and governance shape what evidence is heard and when.</li>
<li><b>African experience shows integration is possible but contested.</b> Power dynamics, political will, and pre-existing relationships all play a role.</li>
<li><b>Integrated CLM strengthens PPPR</b> by grounding preparedness in lived reality.</li>
</ul>

<strong>You've completed Module 3!</strong>

Next, you'll take an assessment to demonstrate your understanding of CLM integration into PPPR frameworks.`,
      duration: "4 min",
    },

    // APPLIED SCENARIO
    {
      title: "Applied Scenario: CLM Integration",
      type: "interactive",
      interactiveType: "scenario",
      scenarioData: {
        scenario:
          "Describe a situation where CLM evidence could strengthen a PPPR process in your context.",
        question:
          "In 120-150 words, explain your approach to integrating CLM evidence.",
        prompts: [
          "The entry point you would target",
          "The type of CLM data you would use",
          "One barrier you expect, and how you would address it",
        ],
        sampleResponse:
          "I would target the annual preparedness review process, where national health security plans are assessed. I would present CLM data on IPC compliance in peripheral health facilities, showing gaps between official reports and community observations. The main barrier I expect is that officials may dismiss community data as 'unscientific.' To address this, I would partner with academic institutions to validate CLM methodology, bring community monitors to present findings directly, and frame the evidence as complementary to—not competing with—official assessments.",
      },
      duration: "12 min",
    },

    // SELF-ASSESSMENT REFLECTION
    {
      title: "Self-Assessment Reflection",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Final Reflection: Your Role in Integration",
        context:
          "As you complete this module, consider your own role in advancing CLM integration.",
        prompts: [
          {
            id: 1,
            question:
              "What is one concrete action you could take in the next 3 months to advocate for CLM integration in a PPPR process?",
          },
          {
            id: 2,
            question:
              "What skills or relationships would you need to develop to be more effective?",
          },
          {
            id: 3,
            question:
              "What support would you need from your network or organisation?",
          },
        ],
        closingQuote:
          "Integration is not a technical problem—it is a political one. And politics is shaped by people who show up.",
      },
      duration: "8 min",
    },
  ],
};
