export interface ScenarioData {
  scenario: string;
  question: string;
  prompts: string[];
  sampleResponse?: string;
}

export interface ReflectionData {
  title: string;
  context: string;
  prompts: Array<{ id: number; question: string }>;
  closingQuote?: string;
}

export interface ModuleSegment {
  title: string;
  type: "reading" | "interactive" | "game" | "quiz";
  interactiveType?: "scenario" | "reflection";
  content?: string;
  duration: string;
  videoUrl?: string;
  gameType?: "evidence-chain" | "voices-first" | "equity-builder";
  question?: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  scenarioData?: ScenarioData;
  reflectionData?: ReflectionData;
}

export interface ModuleContent {
  title: string;
  description: string;
  totalSegments: number;
  segments: ModuleSegment[];
}

export const moduleContent: ModuleContent = {
  title: "Understanding the Foundations of PPR and CLM",
  description:
    "This module lays the foundation for your learning journey, introducing global and African PPR systems and placing CLM as a mechanism for accountability, justice, and participation.",
  totalSegments: 16,
  segments: [
    {
      title: "Module Overview",
      type: "reading",
      content: `Who decides what "preparedness" means, and who gets to define whether we are prepared?

This module explores how Community-Led Monitoring (CLM) and Pandemic Preparedness and Response (PPR) can reinforce one another, creating health systems that are not only resilient but democratic where data is not just collected about communities, but by and for them.

<b>Learning Objectives:</b>

By the end of this module, you will be able to:

<ol>
  <li>Explain the basic purpose and structure of PPR systems at global and national levels</li>
  <li>Describe the origins, purpose, and principles of CLM in health and development contexts</li>
  <li>Identify the linkages and gaps between institutional preparedness systems and community realities</li>
  <li>Reflect on why integrating community voices into preparedness is not optional but essential</li>
</ol>`,
      duration: "5 min",
    },
    {
      title: "Part 1: The Global Architecture of PPR",
      type: "reading",
      content: `The global PPR architecture is made up of a web of frameworks, agreements, and institutions that aim to get us ready for the next emergency.

<b>The International Health Regulations (IHR, 2005)</b> form the backbone. They are legally binding for 196 countries and set out what each country must do to detect, assess, report, and respond to public health threats.

To assess compliance, countries undergo two main processes:
<ol>
<li>
<b>State Party Self-Assessment Annual Reporting (SPAR):</b> An annual self-review where countries evaluate their public health capabilities across various domains such as surveillance, laboratory capacity, workforce, and emergency response.
</li>
<p><i>In the context of global health security, the readiness of individual nations to prevent, detect, and respond to health threats is paramount. This preparedness is closely monitored through tools like the SPAR (State Party Self-Assessment Annual Reporting), which assesses a country’s public health capabilities in relation to the International Health Regulations (IHR). As health risks become increasingly complex and interconnected, having a robust and accurate assessment framework is crucial for identifying vulnerabilities and building resilient health systems.
The SPAR tool provides a comprehensive mechanism for countries to evaluate their public health capacities, address gaps, and develop action plans (including NAPHS) that strengthen their health security infrastructure. The SPAR aims to is approach helps countries nations understand their preparedness levels across various domains, such as surveillance, laboratory capacity, workforce, and emergency response. By using SPAR, countries can prioritise critical areas, ensure that health systems are equipped for future health threats, and make informed decisions to enhance national and global health security
</i></p>
<li>
<b>Joint External Evaluation (JEE):</b> A voluntary, external review of national capacities across 19 technical areas spread across four main sections: Prevention, Detection, Response, and IHR-related Hazards and Points of Entry.
</li>
<p><i>The JEE Tool is a comprehensive assessment framework designed to evaluate a country’s technical capacities for health security across 19 technical areas. These 19 areas are spread across four main sections: Prevention, Detection, Response, and IHR-related Hazards and Points of Entry. By identifying strengths and weaknesses within these areas, the JEE helps countries understand where they need to improve their health security systems. This assessment is crucial for creating action plans (in particular, National Action Plans for Health Security or “NAPHS”) , prioritising resources, and mobilising international support to build robust health systems that can effectively manage health risks.
</i></p>
</ol>

`,
      videoUrl:
        "https://extranet.who.int/sph/sites/default/files/IHRMEF%20Tutorial.mp4",
      duration: "12 min",
    },
    {
      title: "Global PPR Instruments",
      type: "reading",
      content: `Supporting the IHR and its assessment processes are newer global instruments:

<b>WHO Pandemic Agreement:</b> Adopted by WHO member states on 20 May 2025, this agreement complements the IHR and outlines a framework for pandemic prevention, preparedness, and response (PPR), including equity in access to vaccines, diagnostics, and therapeutics.

<b>The Pandemic Fund:</b> Formally titled "Financial Intermediary Fund for Pandemic Prevention, Preparedness and Response," it's housed at the World Bank with WHO as the technical lead. Established following a G20 request in April 2022, it finances capacity building for prevention and response, focusing on low- and middle-income countries.

<b>Africa CDC's New Public Health Order:</b> This framework emphasizes five enablers: strong African public health institutions, expanded manufacturing of vaccines/diagnostics/therapeutics in Africa, workforce capacity, disease prevention (One Health), and collaboration.

<b>Africa's Health Security and Sovereignty Agenda:</b> Adopted in September 2025, this vision reflects the recognition that achieving universal health coverage and pandemic preparedness requires health sovereignty the ability of African nations to finance, produce, and govern their own health systems.`,
      duration: "2 min",
    },
    {
      title: "Reflection: COVID-19 in Your Country",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Reflective Activity",
        context: "Think about the COVID-19 pandemic in your country. Reflect on how communities and institutions responded.",
        prompts: [
          { id: 1, question: "Who noticed the problem first communities or institutions? Share a specific example you witnessed or heard about." },
          { id: 2, question: "How quickly did local concerns reach decision-makers? What barriers existed?" },
          { id: 3, question: "What gaps existed between community experiences and official responses?" }
        ],
        closingQuote: "Your reflections help contextualize how PPR systems work in practice versus theory."
      },
      duration: "5 min",
    },
    {
      title: "Part 2: What is Community-Led Monitoring?",
      type: "reading",
      content: `CLM emerged from the HIV movement and has since been adopted across multiple health and social sectors. It is a rights-based approach in which communities systematically collect and use data to monitor the quality and accessibility of services, policies, and funding.

Unlike traditional monitoring efforts, CLM starts from the bottom up:

<ul>
<li><b>Who collects the data?</b> Communities themselves</li>
<li><b>Whose questions are asked?</b> The people directly affected shape and frame questions</li>
<li><b>Who acts on the findings?</b> Both communities and decision-makers, through evidence-based dialogue and advocacy</li>
</ul>

<i>CLM is not just a technical exercise, it is a political act.</i>

The true power of CLM is that it shifts power to communities, centers lived experience, and ensures that no one speaks about communities without speaking with them.`,
      duration: "3 min",
    },
    {
      title: "The Five Principles of CLM",
      type: "reading",
      content: `At its core, CLM is guided by five principles:

      <ol>
      <li><b>Ownership:</b> Communities design and lead monitoring activities.<br/>
<i>Example: Kenya's I-Monitor system puts communities in full control designing tools, selecting indicators, leading facility assessments, and negotiating service improvements.</i></li>
      <li><b>Accountability:</b> Findings are used to demand and negotiate change.<br/>
<i>Example: South Africa's Ritshidze collects real-time feedback from thousands of public clinics, escalating issues to authorities and triggering joint action plans.</i></li>
      <li><b>Transparency:</b> Data and decisions are shared openly.<br/>
<i>Example: In Malawi's malaria CLM programme, findings are openly discussed in Health Centre Advisory Committee meetings, building trust.</i></li>
      <li><b>Participation:</b> All voices, especially those of marginalized groups, are included.<br/>
<i>Example: In Mozambique, sex workers, MSM, and AGYW lead monitoring, ensuring those most affected shape the agenda.</i></li>
      <li><b>Equity:</b> Monitoring focuses on underserved communities.<br/>
<i>Example: Nigeria's CLM focuses on remote villages where surveillance is weakest, pushing programs to prioritize marginalized populations.</i></li>
      </ol>
`,
      duration: "5 min",
    },
    {
      title: "Evidence Chain Game",
      type: "game",
      gameType: "evidence-chain",
      content:
        "Build an evidence chain by arranging CLM elements in the correct sequence: data collection → analysis → community dialogue → advocacy → system change. Complete cycles build trust!",
      duration: "15 min",
    },
    {
      title: "CLM Knowledge Check",
      type: "quiz",
      question:
        "Which of the following best describes Community-Led Monitoring?",
      options: [
        {
          id: "a",
          text: "Monitoring by government institutions for programme evaluation",
          isCorrect: false,
        },
        {
          id: "b",
          text: "A donor-funded mechanism for data collection",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Community-owned monitoring for accountability and advocacy",
          isCorrect: true,
        },
        {
          id: "d",
          text: "A health survey managed by international partners",
          isCorrect: false,
        },
      ],
      duration: "5 min",
    },
    {
      title: "Part 3: Where PPR and CLM Meet",
      type: "reading",
      content: `PPR frameworks focus on the capacities of health systems laboratories, surveillance, emergency operations. CLM focuses on people and how health systems function in reality. When the two intersect, the result is both technical and democratic strength.

<b>Real-World Examples:</b>

During COVID-19, community groups in Kenya and South Africa tracked PPE shortages and vaccine access, alerting authorities before official systems registered the gaps.

During Mpox outbreaks, key population networks in Nigeria provided real-time data on stigma and service access, helping shape public communication.

These examples show that CLM can act as:
<ul>
<li>An early warning system within national PPR frameworks</li>
<li>A feedback mechanism that captures service quality data</li>
<li>A critical enabler of trust between communities and government</li>
</ul>

<b>Trust is non-negotiable.</b> In a crisis, effective public health strategies from mass vaccination to contact tracing hinge entirely on public trust.`,
      duration: "5 min",
    },
    {
      title: "Scenario: Risk Communication",
      type: "interactive",
      interactiveType: "scenario",
      scenarioData: {
        scenario: "Your country's PPR plan lists 'risk communication' as a key objective. The government wants to improve how health information reaches all communities during emergencies.",
        question: "How could CLM contribute to ensuring that communication is inclusive, trusted, and grounded in local realities?",
        prompts: [
          "What community data would be valuable for improving risk communication?",
          "How would you ensure marginalized voices are included in the process?",
          "What feedback loops would strengthen trust between communities and authorities?"
        ],
        sampleResponse: "CLM could contribute by having community monitors collect data on which communication channels people actually use and trust (radio, WhatsApp groups, community leaders). They could identify language barriers and misinformation patterns. For marginalized groups like migrants or sex workers, trusted peer networks could provide feedback on whether messages reach them. Regular community dialogues would create feedback loops, allowing authorities to adapt messaging based on real-time community input."
      },
      duration: "10 min",
    },
    {
      title: "Voices First Game",
      type: "game",
      gameType: "voices-first",
      content:
        "Match community voices reporting early crisis signs with appropriate system responses. Build the trust bar by correctly connecting community alerts to institutional actions!",
      duration: "15 min",
    },
    {
      title: "Part 4: The Politics of Preparedness",
      type: "reading",
      content: `Preparedness is never neutral. It is a mirror of power: who is seen, who is heard, and who is protected when crisis strikes.

Every emergency response carries a quiet hierarchy of concern. Some lives are counted faster. Some data is trusted more. Some communities are remembered only after the damage is done.

For decades, global health systems have prioritized efficiency over equity. During the HIV crisis, data from sex workers and queer communities was dismissed. During COVID-19, migrants, informal workers, and people with disabilities were often invisible to surveillance systems.

<b>CLM challenges this order.</b> It insists that preparedness is not a technical checklist but a political contract.

CLM forces PPR frameworks to face uncomfortable questions:
<ul>
<li>Who decides what counts as an emergency?</li>
<li>Who sits at the table when budgets are written?</li>
<li>Whose voices are heard when global agencies declare success?</li>
</ul>

When communities define risk, measure readiness, and monitor response, health security stops being charity and becomes justice.`,
      duration: "4 min",
    },
    {
      title: "Reflection: Invisible Until Counted",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Invisible Until Counted",
        context: "Think about one community in your country that was overlooked during COVID-19 or another public health emergency.",
        prompts: [
          { id: 1, question: "What made them invisible to official systems? (e.g., lack of documentation, geographic isolation, social stigma)" },
          { id: 2, question: "What kind of data or evidence could have made them visible earlier?" },
          { id: 3, question: "How might a CLM approach have changed their outcome?" }
        ],
        closingQuote: "Visibility is power. CLM ensures that no life waits for permission to matter."
      },
      duration: "8 min",
    },
    {
      title: "Equity Builder Game",
      type: "game",
      gameType: "equity-builder",
      content:
        "Distribute 10 Preparedness Tokens across five African communities. Balance risk and equity by investing in high-need, low-visibility areas. Fill the Justice Meter!",
      duration: "20 min",
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
      duration: "12 min",
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
      duration: "5 min",
    },
  ],
};
