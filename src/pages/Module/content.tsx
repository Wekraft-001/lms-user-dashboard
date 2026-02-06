import { SummaryCard } from "@/components/interactive/SummaryFlashCards";

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

export interface VideoItem {
  label: string;
  url: string;
  description?: string;
}

export interface CycleDiagramData {
  title?: string;
  steps: string[];
}

export interface ModuleSegment {
  title: string;
   type: "reading" | "interactive" | "game" | "quiz" | "resources";
  interactiveType?: "scenario" | "reflection";
  content?: string;
  duration: string;
  videoUrl?: string;
  videos?: VideoItem[];
  gameType?: "evidence-chain" | "voices-first" | "equity-builder";
  question?: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  scenarioData?: ScenarioData;
  reflectionData?: ReflectionData;
  cycleDiagram?: CycleDiagramData;
  summaryCards?: SummaryCard[];
}

export interface ModuleContent {
  title: string;
  description: string;
  totalSegments: number;
  segments: ModuleSegment[];
}

const module1Content: ModuleContent = {
  title: "Understanding the Foundations of PPPR and CLM",
  description:
    "This module lays the foundation for your learning journey, introducing global and African PPPR systems and placing CLM as a mechanism for accountability, justice, and participation.",
   totalSegments: 21,
  segments: [
    {
      title: "Module Overview",
      type: "reading",
      content: `This module lays the foundation for your learning journey. It introduces systems that shape PPPR, and places CLM within that landscape as a mechanism for accountability, justice, and pariticipation.

      We begin by asking a simple but urgent question:

      
      Who decides what "preparedness" means, and who gets to define whether we are prepared?

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
      title: "Part 1: The Global Architecture of PPPR",
      type: "reading",
      content: `The global PPPR architecture is made up of a web of frameworks, agreements, and institutions that aim to get us ready for the next emergency.

      <b>The International Health Regulations (IHR, 2005)</b> form the backbone. They are legally binding for 196 countries and set out what each country must do to detect, assess, report, and respond to public health threats.

      To assess compliance, countries undergo two main processes:
      <ol>
      <li>
      <b>State Party Self-Assessment Annual Reporting (SPAR):</b> An annual self-review where countries evaluate their public health capabilities across various domains such as surveillance, laboratory capacity, workforce, and emergency response.
      </li>
      <p><i>In the context of global health security, the readiness of individual nations to prevent, detect, and respond to health threats is paramount. This preparedness is closely monitored through tools like the SPAR (State Party Self-Assessment Annual Reporting), which assesses a country's public health capabilities in relation to the International Health Regulations (IHR). As health risks become increasingly complex and interconnected, having a robust and accurate assessment framework is crucial for identifying vulnerabilities and building resilient health systems.
      The SPAR tool provides a comprehensive mechanism for countries to evaluate their public health capacities, address gaps, and develop action plans (including NAPHS) that strengthen their health security infrastructure. The SPAR aims to is approach helps countries nations understand their preparedness levels across various domains, such as surveillance, laboratory capacity, workforce, and emergency response. By using SPAR, countries can prioritise critical areas, ensure that health systems are equipped for future health threats, and make informed decisions to enhance national and global health security
      </i></p>
      <li>
      <b>Joint External Evaluation (JEE):</b> A voluntary, external review of national capacities across 19 technical areas spread across four main sections: Prevention, Detection, Response, and IHR-related Hazards and Points of Entry.
      </li>
      <p><i>The JEE Tool is a comprehensive assessment framework designed to evaluate a country's technical capacities for health security across 19 technical areas. These 19 areas are spread across four main sections: Prevention, Detection, Response, and IHR-related Hazards and Points of Entry. By identifying strengths and weaknesses within these areas, the JEE helps countries understand where they need to improve their health security systems. This assessment is crucial for creating action plans (in particular, National Action Plans for Health Security or "NAPHS") , prioritising resources, and mobilising international support to build robust health systems that can effectively manage health risks.
      </i></p>
      </ol>

      `,
      videoUrl: "https://extranet.who.int/sph/sites/default/files/IHRMEF%20Tutorial.mp4",
      videos: [
        {
          label: "SPAR Explainer",
          url: "https://youtu.be/bzAPYSr6q-M?si=QCPZtJQmn7yZU_G3",
          description: "Understanding the State Party Self-Assessment Annual Reporting (SPAR) process"
        },
        {
          label: "JEE Explainer", 
          url: "https://www.youtube.com/watch?v=RvLcDOijj6A",
          description: "Understanding the Joint External Evaluation (JEE) framework"
        }
      ],
      duration: "12 min",
    },
    {
      title: "Global PPPR Instruments",
      type: "reading",
      content: `Supporting the IHR and its assessment processes are newer global instruments and mechanisms:

<b>WHO Pandemic Agreement:</b> Formally titled the "WHO Pandemic Agreement" was adopted by member states of the WHO at the World Health Assenbly on 20 May 2025. The agreement complements the IHR and outlines a framework for pandemic prevention, preparedness, and response (PPPR), including equity in access to vaccines, diagnostics, and therapeutics.

<b>The World Bank's Pandemic Fund:</b> Formally titled the "Financial Intermediary Fund for Pandemic Prevention, Preparedness and Response," the "Pandemic Fund" is housed at the World Bank with WHO as the technical lead. It was established following a G20 request in April 2022 and approved by the Board of the World Bank on the 30th of June 2022. It became operational in September 2022. The Pandemic Fund finances capacity building for prevention and response,  focusing on low- and middle-income countries (LMICs) and investing in various systems: surveillance, labs, workforce, and One Health approaches.

<b>The Africa CDC's New Public Health Order for Africa's Health Security:</b> This framework was launched and articulated by Africa CDC in the context of strengthening Africa’s self-reliance, networks, manufacturing capacity and public health institutions. It calls for a stronger, self-reliant, and networked Africa and emphasises five enablers: strong African public health institutions, expanded manufacturing of vaccines/diagnostics/therapeutics in Africa, workforce capacity, disease prevention (One Health) and collaboration. 

<b>Africa's Health Security and Sovereignty Agenda - </i>a new way forward</i>:</b> In light of recent geopolitical shifts, declining donor funding, in September 2025 the Committee of Healds of State and Government of the Africa CDC adopted an even more robust vision for the continent than the NPHO. This new strategic transition, termed Africa’s Health Security and Sovereignty, reflects the growing recognition that achieving universal health coverage, pandemic preparedness, and sustainable development cannot be realised without health sovereignty i.e. the ability of African nations to finance, produce, and govern their own health systems and countermeasures. 
`,
      duration: "8 min",
      videos: [
        {
          label: "WHO Pandemic Agreement",
          url: "https://www.youtube.com/watch?v=FmUirzJ4X-4",
          description: "Straight facts on pandemic"
        },
        {
          label: "World Bank's Pandemic Fund", 
          url: "https://www.youtube.com/watch?v=LJyjGQg2Qd4",
          description: "Financial Intermediary Fund for PPR"
        },{
            label: "Africa CDC", 
            url: "https://www.youtube.com/watch?v=tZJenI6QQX0",
            description: "Financial Intermediary Fund for PPR"
          }
      ],
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
       title: "Part 1: Read / Listen / Watch",
       type: "resources",
       duration: "30 min",
       summaryCards: [
         {
           title: "The New Public Health Order for Africa",
           source: "Africa CDC (2021)",
           type: "Policy Brief",
           readingTime: "8 min",
           description: "Africa CDC outlines a bold continental vision for health sovereignty built on five pillars: workforce, manufacturing, institutions, financing, and leadership. The framework shows how Africa is shifting from dependency to ownership in pandemic preparedness."
         },
         {
           title: "International Health Regulations (2005) Overview",
           source: "World Health Organization (2022)",
           type: "Framework",
           readingTime: "10 min",
           description: "This overview explains the global legal foundation of PPR: how countries detect, report, and respond to outbreaks. It introduces the IHR's core capacities and reporting mechanisms such as JEE and SPAR."
         },
         {
           title: "Joint External Evaluation Tool: 3rd Edition",
           source: "WHO (2022)",
           type: "Framework",
           readingTime: "7 min",
           description: "The JEE is the main global process for assessing national preparedness. This summary describes the JEE's indicators and scoring system."
         },
         {
           title: "Pandemic Fund Overview",
           source: "World Bank (2023)",
           type: "Fact Sheet",
           readingTime: "5 min",
           description: "A concise explainer of how the Pandemic Fund mobilises financing for prevention, preparedness, and response. It highlights funding priorities and governance arrangements."
         }
       ],
     },
    {
      title: "Part 2: What is Community-Led Monitoring (CLM)?",
      type: "reading",
      content: `CLM emerged from the HIV movement and has since been adopted across multiple health and social sectors. It is a rights-based approach in which communities systematically collect and use data to monitor the quality and accessibility of services, policies, and funding.

<ul>
<p>Unlike traditional monitoring efforts, CLM starts from the bottom up:</p>
<li><b>Who collects the data?</b> Communities themselves</li>
<li><b>Whose questions are asked?</b> The people directly affected shape and frame questions</li>
<li><b>Who acts on the findings?</b> Both communities and decision-makers, through evidence-based dialogue and advocacy</li>
</ul>

<b>CLM is not just a technical exercise, it is a political act.</b>

The true power of CLM is that it shifts power to communities, centers lived experience, and ensures that no one speaks about communities without speaking with them.`,
      cycleDiagram: {
        title: "The CLM Cycle",
        steps: ["Collect", "Analyse", "Share", "Advocate", "Improve"]
      },
      duration: "3 min",
    },
    {
      title: "The Five Principles of CLM",
      type: "reading",
      content: `At its core, CLM is guided by five principles:

    <ol>
    <li><b>Ownership: Communities design and lead monitoring activities.</b><br/>
        <p>In Zambia, between 2021 and 2025 Amref Zambia and Grassroots Soccer Zambia implemented a CLM project aimed at ensuring the voices and recommendations of people living with HIV were incorporated into the design and approach of HIV care and treatment. Initially, a standardised questionnaire was used to collect data but each year, the questionnaire was revised by community monitors to ensure local relevance. This is a clear demonstration of community ownership of the project. <a href="https://grassrootsoccer.org/zambia/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">Learn more about Grassroots Soccer Zambia →</a>
        </p>
    </li>
    <li><b>Accountability: Findings are used to demand and negotiate change. South Africa - Ritshidze Community Monitoring</b><br/>
        <p>Ritshidze, led by people living with HIV networks such as the Treatment Action Campaign, collects real-time feedback from thousands of public clinics. The community teams escalate issues such as ARV stockouts, long waits, and unfriendly services to district and provincial health authorities. Quarterly reports trigger joint action plans, resulting in documented improvements in staffing, medicine availability, and service quality. This is accountability in practice: community evidence driving system change. <a href="https://ritshidze.org.za/the-model/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">Learn more about the Ritshidze Model →</a>
        </p>
    </li>
    <li><b>Transparency: Data and decisions are shared openly. Malawi - CLM for Malaria Service Quality</b><br/>
        <p>In Malawi’s malaria CLM programme, community monitors share all findings openly with health facilities, district malaria units, and community structures. Data dashboards summarising stockouts, diagnostic quality, and patient experiences are publicly discussed during Health Centre Advisory Committee meetings. This open sharing of evidence builds trust and ensures that decisions are made transparently, with communities seeing both the problems and the responses.</p>
    </li>
    <li><b>Participation: All voices, especially those of marginalized groups, are included. Mozambique - Key Population-Led Service Monitoring</b><br/>
        <p>In Mozambique, key population organisations lead the charge in CLM for HIV prevention services. Sex workers, men who have sex with men (MSM), and adolescent girls and young women (AGYW) are trained as monitors, ensuring those most affected shape the monitoring agenda. The project’s findings focused on stigma, safety, and access barriers and are integrated into national HIV programme reviews. This ensures that those usually left out are meaningfully included.</p>
    </li>
    <li><b>Equity: Monitoring focuses on underserved communities. Nigeria – CLM in Hard-to-Reach Malaria-Endemic Communities
    </b><br/>
        <p>Nigeria’s community-led malaria monitoring initiative focuses deliberately on remote, underserved villages where surveillance and service delivery are weakest. Community volunteers document stockouts of rapid diagnostic tests, insecticide-treated nets, and treatment interruptions. Their evidence pushes malaria programmes to re-prioritise distribution and re-allocate commodities to the most marginalised populations, an explicit application of equity.
        </p>
    </li>
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
       title: "Part 2: Read / Listen / Watch",
       type: "resources",
       duration: "37 min",
       summaryCards: [
         {
           title: "Community-Led Monitoring Operational Guide",
           source: "UNAIDS & Global Fund (2021)",
           type: "Guide",
           readingTime: "15 min",
           description: "The foundational global manual on CLM. It details how communities collect, analyse, and use data to drive accountability. Learners will see CLM not as data extraction but as a process of empowerment."
         },
         {
           title: "Community-Led Monitoring in Practice: Case Studies from East and Southern Africa",
           source: "EANNASO (2023)",
           type: "Case Study",
           readingTime: "12 min",
           description: "Real stories from Malawi, Kenya, and Tanzania illustrate CLM in action. Each example shows how local groups gathered evidence and used it to negotiate change with authorities."
         },
         {
           title: "Communities at the Centre: CLM Success Stories",
           source: "Global Fund (2022)",
           type: "Case Study",
           readingTime: "10 min",
           description: "Short success stories show how communities have influenced national HIV, TB, and COVID-19 programmes. They demonstrate how data and advocacy merge to hold systems accountable."
         }
       ],
     },
    {
      title: "Part 3: Where PPPR and CLM Meet",
      type: "reading",
      content: `PPPR frameworks focus on the capacities of health systems laboratories, surveillance, emergency operations. CLM focuses on people and how health systems function in reality. When the two intersect, the result is both technical and democratic strength.

<b>Real-World Examples:</b>

During COVID-19, community groups in Kenya and South Africa tracked PPE shortages and vaccine access, alerting authorities before official systems registered the gaps.

During Mpox outbreaks, key population networks in Nigeria provided real-time data on stigma and service access, helping shape public communication.

These examples show that CLM can act as an early warning system and feedback mechanism within national PPPR frameworks, filling gaps that formal surveillance often misses. CLM can also be more effective than other monitoring mechanisms at collecting qualitative data about the quality of health service. Finally, CLM can act as a critical enabler of trust and dialogue between communities and the government. This trust is non-negotiable in the context of pandemic preparedness and response. In a crisis, effective public health strategies, from mass vaccination campaigns and contact tracing to adherence to social distancing measures, can hinge entirely on the public trust.
`,
      duration: "5 min",
      videos: [
        {
          label: "MPOX Nigeria",
          url: "https://www.youtube.com/watch?v=keWXhcUdscY",
          description: ""
        },
      ],
    },
    {
      title: "Scenario: Risk Communication",
      type: "interactive",
      interactiveType: "scenario",
      scenarioData: {
        scenario: "Your country's PPPR plan lists 'risk communication' as a key objective. The government wants to improve how health information reaches all communities during emergencies.",
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
       title: "Part 3: Read / Listen / Watch",
       type: "resources",
       duration: "19 min",
       summaryCards: [
         {
           title: "Why Community Data Matters More Than Ever",
           source: "Bhekisisa Centre for Health Journalism (2022)",
           type: "News Feature",
           readingTime: "6 min",
           description: "A vivid journalistic look at why official statistics often miss the real story. Using examples from South Africa's COVID-19 response, it argues that data from below can expose hidden inequalities."
         },
         {
           title: "Reclaiming Preparedness: Community Knowledge in the Time of Crisis",
           source: "Tian Johnson, Devex / Health Policy Watch (2023)",
           type: "Article",
           readingTime: "7 min",
           description: "This piece challenges top-down preparedness models and calls for decolonial, community-led approaches. It captures the moral and political argument for integrating CLM into PPR systems."
         },
         {
           title: "Dr John Nkengasong on Africa's New Public Health Order",
           source: "Africa CDC YouTube (2022)",
           type: "Video",
           readingTime: "6 min",
           description: "Dr Nkengasong explains why Africa must build its own institutions and manufacturing capacity for health security. His optimism and clarity anchor the idea that preparedness and self-determination go hand in hand."
         }
       ],
     },
    {
      title: "Part 4: The Politics of Preparedness",
      type: "reading",
      content: `Preparedness is never neutral. It is a mirror of power: who is seen, who is heard, and who is protected when crisis strikes. Every emergency response carries a quiet hierarchy of concern. Some lives are counted faster. Some data is trusted more. Some communities are remembered only after the damage is done.

For decades, global health systems have prioritized efficiency over equity. During the HIV crisis, data from sex workers and queer communities was dismissed as "unreliable". During COVID-19, migrants, informal workers, and people with disabilities were often invisible to surveillance systems that defined who deserved PPE, testing, and vaccines. The result was predictable: those most at risk were protected last.

<b>CLM challenges this order.</b> It insists that preparedness is not a technical checklist but a political contract.

CLM forces PPR frameworks to face uncomfortable questions:
<ul>
<li>Who decides what counts as an emergency?</li>
<li>Who sits at the table when budgets are written?</li>
<li>Whose voices are heard when global agencies declare success?</li>
</ul>

By grounding PPR in lived experience, CLM shifts the centre of gravity, from ministries to markets, from boardrooms to town halls, from surveillance systems to social networks. It replaces extraction with participation and token consultation with co-creation.


Preparedness becomes not just the ability to respond to crises, but the ability to do so justly. It recognises that community knowledge is not a supplement to science; it is science: deep, experiential, and rooted in care. When communities define risk, measure readiness, and monitor response, health security stops being charity and becomes justice.
`,
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
      content: `Community Monitoring During South Africa's COVID-19 Vaccine Roll-Out

In 2021, as South Africa launched its national COVID-19 vaccination drive, official systems reported strong progress. But CLM teams in Gauteng and KwaZulu-Natal began collecting real-time feedback from clinics, taxi ranks, and informal settlements.

Their data told another story:
<ul>
<li>Many clinics lacked cold-chain equipment</li>
<li>Mobile sites were undersupplied</li>
<li>Undocumented migrants were being turned away</li>
</ul>

CLM partners compiled weekly briefs for provincial health departments and advocacy coalitions. Within weeks, provincial authorities adjusted logistics, retrained site staff, and added mobile units.

<b>Key Takeaway:</b> When communities monitor systems from below, national data becomes more honest, equitable, and useful. Preparedness is not built in labs, it is built in trust.`,
      duration: "12 min",
    },
    {
      title: "Reflection: Preparedness Through Community Evidence",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Preparedness Through Community Evidence",
        context: "Reflecting on the South Africa case study, consider how community-generated evidence can transform pandemic preparedness in your own context.",
        prompts: [
          { id: 1, question: "What would preparedness look like if every community could produce evidence like this?" },
          { id: 2, question: "What barriers exist in your context that prevent communities from generating this kind of real-time data?" },
          { id: 3, question: "How could you help establish a CLM system to monitor vaccine or health service delivery in your community?" }
        ],
        closingQuote: "Preparedness is not built in labs—it is built in trust."
      },
      duration: "8 min",
    },
    {
      title: "Module Summary",
      type: "reading",
      content: `<b>Key Takeaways:</b>

      <ul>
      <li><b>PPR</b> provides the structures for readiness, but structure without justice collapses under pressure</li>
      <li><b>CLM</b> provides the eyes, ears, and conscience of preparedness, ensuring that the invisible become visible</li>
      <li>Together, they redefine preparedness as a matter of equity and shared power</li>
      </ul>

<strong>You've completed Module 1!</strong> 

You now understand:
<ol>
<li>How global PPR frameworks operate</li>
<li>The five principles of Community-Led Monitoring</li>
<li>Where CLM strengthens PPR systems</li>
<li>Why preparedness is a political and ethical imperative</li>
</ol>

Next, you'll take a comprehensive assessment to demonstrate your mastery of these foundations.`,
      duration: "5 min",
    },
     {
       title: "Part 4: Read / Listen / Watch",
       type: "resources",
       duration: "30 min",
       summaryCards: [
         {
           title: "Accountability, Health Systems and the Politics of Participation",
           source: "Parker & Kelly (2021) Global Public Health 16(8)",
           type: "Academic Article",
           readingTime: "20 min",
           description: "An academic but accessible paper linking accountability and participation within health systems. It helps learners situate CLM in a broader theoretical context."
         },
         {
           title: "Decolonising Global Health Systems: Knowledge from the Margins",
           source: "Abimbola S. (2023) BMJ Global Health 8(3)",
           type: "Commentary",
           readingTime: "10 min",
           description: "A concise reflection on whose knowledge counts in global health governance. Abimbola argues for shifting epistemic power toward communities and local experts."
         }
       ],
     },
  ],
};

const module2Content: ModuleContent = {
  title: "The Principles and Practice of CLM",
  description:
    "This module goes deeper into the practice of CLM. It answers two big questions: How does CLM actually work in real life, from the first complaint to the final policy change? And how can we treat data not just as information, but as a tool for justice?",
  totalSegments: 18,
  segments: [
    {
      title: "Module 2 Overview",
      type: "reading",
      content: `In Module 1, you explored how global and African PPR systems are built, and where communities often find themselves on the outside looking in. You were introduced to Community-Led Monitoring (CLM) as one way to change that.

Module 2 goes deeper into the practice of CLM. It answers two big questions:

<ol>
<li>How does CLM actually work in real life, from the first complaint to the final policy change?</li>
<li>How can we treat data not just as information, but as a tool for justice?</li>
</ol>

We do this through two sub-modules:
<ul>
<li><b>The CLM Cycle:</b> identifying gaps, collecting and analysing evidence, engaging duty bearers, and tracking whether anything really changes.</li>
<li><b>Data for Justice:</b> how communities use evidence to shift power, while protecting people from harm.</li>
</ul>

<b>Learning Objectives:</b>

By the end of this module, you will be able to:

<ol>
<li>Explain each step of the CLM cycle and give at least one practical example from your context.</li>
<li>Describe how CLM can be expanded to include PPR issues such as laboratories, IPC, surveillance, immunisation and emergency response.</li>
<li>Recognise key ethical considerations in community data collection, storage and use.</li>
<li>Identify concrete ways CLM amplifies community voices in health system and PPR decision-making spaces.</li>
</ol>`,
      duration: "5 min",
    },
    {
      title: "Part 1: The CLM Cycle in Practice",
      type: "reading",
      content: `<b>1.1 CLM as a Cycle, Not a Project</b>

CLM is not a workshop, a survey or a report. It is a cycle of actions that communities repeat and refine over time. We describe the CLM Cycle as:

<b>Identify → Collect → Analyse → Share → Act → Track → Re-design</b>

In reality, this looks like people:
<ul>
<li>A peer educator in Kano keeping notes on who is turned away from vaccination sites.</li>
<li>A sex worker organiser in Nairobi recording how emergency wards treat clients with fever and rash.</li>
<li>A community health worker in Lusaka checking whether the oxygen cylinders promised in a meeting actually arrived.</li>
</ul>

When the cycle is working, communities do not only document problems. They shape solutions and watch to see if those solutions hold.`,
      cycleDiagram: {
        title: "The CLM Cycle",
        steps: ["Identify", "Collect", "Analyse", "Share", "Act", "Track", "Re-design"]
      },
      duration: "5 min",
    },
    {
      title: "Step 1: Identify Gaps and Priorities",
      type: "reading",
      content: `<b>1.2 Step 1: Identify Gaps and Priorities</b>

CLM begins with a simple question:

<i>"Where are people being failed, and who is being failed first?"</i>

Communities map:
<ul>
<li>Services that collapse early during crises.</li>
<li>Groups who are consistently invisible in official statistics.</li>
<li>Places where fear, stigma or corruption keep people away from care.</li>
</ul>

<b>For PPR, this could include:</b>
<ul>
<li>Clinics where infection prevention and control is weak, despite national claims of progress.</li>
<li>Rural areas where immunisation outreach disappears long before roads are officially declared unsafe.</li>
<li>Border communities where migrant workers are excluded from emergency plans.</li>
</ul>

<b>This step is political.</b> It tells us whose reality will define the monitoring agenda.`,
      duration: "4 min",
    },
    {
      title: "Step 2: Collect Data",
      type: "reading",
      content: `<b>1.3 Step 2: Collect Data</b>

Once priorities are clear, communities design or adapt tools: surveys, observation checklists, focus-group guides, key-informant interviews, simple digital forms.

<b>Good CLM data collection answers at least four questions:</b>

<ol>
<li><b>Availability:</b> Is the service or commodity there at all?</li>
<li><b>Accessibility:</b> Can people reach it physically, financially and legally?</li>
<li><b>Acceptability:</b> Is it delivered in a way that respects dignity and rights?</li>
<li><b>Quality:</b> Is it safe, reliable and effective?</li>
</ol>

<b>In a PPR context, CLM data might track:</b>
<ul>
<li>Turnaround time for diagnostic tests for respiratory illnesses.</li>
<li>Presence of handwashing facilities, soap and safe waste disposal in clinics.</li>
<li>Whether antibiotics are overused in private pharmacies while public clinics face stockouts.</li>
<li>Whether people in informal settlements receive timely and accurate risk-communication messages.</li>
</ul>

The crucial point is that <b>communities decide what to count</b>, based on what threatens their health and rights.`,
      duration: "5 min",
    },
    {
      title: "Step 3-5: Analyse, Share, and Act",
      type: "reading",
      content: `<b>1.4 Step 3: Analyse and Interpret</b>

Data alone does not change anything. It needs interpretation.

Community analysis sessions ask questions such as:
<ul>
<li>What patterns are we seeing across facilities, districts or groups?</li>
<li>Which communities are affected most severely?</li>
<li>How do these patterns connect to policies, budgets or PPR plans?</li>
<li>From a community perspective, what would "success" look like in six months?</li>
</ul>

When communities lead analysis, they decide which findings are politically important, not only which are statistically significant.

<b>1.5 Step 4: Share and Negotiate</b>

CLM is about evidence with a destination. Communities use multiple formats to share their findings:
<ul>
<li>Short reports and slide decks for health managers and planners.</li>
<li>Community meetings and local radio discussions so that people hear the results.</li>
<li>One-page briefs or infographics tailored for PPR technical working groups.</li>
</ul>

Sharing is followed by <b>negotiation</b>. CLM is not just "naming and shaming." It is structured dialogue where communities come with evidence and clear asks:
<ul>
<li>"Increase clinic opening hours during outbreaks."</li>
<li>"Prioritise oxygen and PPE for primary care, not only central hospitals."</li>
<li>"Include key populations in your risk communication strategy."</li>
</ul>

<b>1.6 Step 5: Act, Track and Re-design</b>

Implementation is where many monitoring efforts die. CLM insists on a different ending.

Communities track:
<ul>
<li>Did staff get hired where shortages were documented?</li>
<li>Did oxygen supplies or IPC conditions improve?</li>
<li>Were migrants or key populations included in revised emergency plans?</li>
</ul>

If nothing changes, communities:
<ul>
<li>Escalate through coalition action, media and advocacy.</li>
<li>Adjust their tools to better capture the problem.</li>
<li>Revisit strategies and alliances.</li>
</ul>

The cycle does not stop. It becomes sharper. Over time, this is how CLM grows from a data exercise into a <b>governance practice</b>.`,
      duration: "8 min",
    },
    {
      title: "Reflection: The CLM Cycle in Your Context",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Reflecting on the CLM Cycle",
        context: "Think of one monitoring activity you know about, or imagine one in your context.",
        prompts: [
          { id: 1, question: "Which step of the CLM cycle has been strongest in monitoring efforts you've seen or participated in? Why do you think that is?" },
          { id: 2, question: "Which step has been weakest? What barriers prevent this step from being done well?" },
          { id: 3, question: "If you could change one thing about how monitoring is done in your context, what would it be?" }
        ],
        closingQuote: "Many CLM initiatives are strong on data collection but weak on tracking change and budgets. Recognising this pattern is the first step to breaking it."
      },
      duration: "5 min",
    },
    {
      title: "Close the Loop Game",
      type: "game",
      gameType: "evidence-chain",
      content: "Complete the CLM cycle by matching real-life activities to the correct stage: Identify, Collect, Analyse, Share, Act, Track. By repeating rounds, you'll internalise the cycle and see that leaving out a stage weakens the entire process.",
      duration: "10 min",
    },
    {
      title: "Part 1: Read / Listen / Watch",
      type: "resources",
      duration: "30 min",
      summaryCards: [
        {
          title: "Community Monitoring as a Cycle, Not a One-Off",
          source: "CLM Technical Brief (2023)",
          type: "Brief Article",
          readingTime: "15 min",
          description: "This article explains CLM as a living process that moves through several connected stages: identifying priority gaps, collecting evidence, analysing and interpreting findings, sharing results with both communities and duty bearers."
        },
        {
          title: "From Complaint to Commitment: Case Stories",
          source: "Community-Led Accountability Network",
          type: "Case Study Collection",
          readingTime: "60 min",
          description: "Real stories that show how community complaints were turned into service improvements through systematic monitoring and negotiation."
        },
        {
          title: "Switching Up the Dial on Community Voices",
          source: "UHC2030 Partner Sessions",
          type: "Audio/Video Panel",
          readingTime: "25 min",
          description: "Civil society leaders reflect on their experience of engaging health systems with community-generated evidence. They examine where accountability processes stall and strategies to keep evidence alive across planning cycles.",
          link: "https://www.uhc2030.org/news-and-events/news/partner-insights/partner-insights/switching-up-the-dial-on-community-voices-for-uhc-545649/"
        }
      ],
    },
    {
      title: "Part 2: Data for Justice",
      type: "reading",
      content: `<b>2.1 Data is Never Neutral</b>

In many health systems, data is treated as if it floats above politics. But every dataset reflects choices:
<ul>
<li>Who is counted and who is not.</li>
<li>Which questions are asked and which are ignored.</li>
<li>Which findings are amplified and which are quietly buried.</li>
</ul>

CLM confronts this directly. It asks:
<ul>
<li>Why are deaths in informal settlements undercounted?</li>
<li>Why are key populations absent from official PPR reports?</li>
<li>Why do surveillance systems record cases but not the violence and stigma that shape who seeks care?</li>
</ul>

<b>Data for Justice</b> means using information to expose and correct these patterns, not to hide them.

<b>2.2 Ethical Principles in CLM Data</b>

Because CLM works with real people in real communities, ethics cannot be outsourced to a separate committee. They must be part of the daily practice of monitoring.

<b>Key ethical questions:</b>
<ul>
<li><b>Consent:</b> Do people understand what monitoring is about, what will be recorded, and how it will be used? Can they say no without losing access to services?</li>
<li><b>Confidentiality:</b> How are notes, recordings and digital forms stored? Who can see them?</li>
<li><b>Safety and non-harm:</b> Could a specific quote or photo expose someone to violence, arrest or stigma?</li>
<li><b>Collective benefit:</b> Will this evidence ultimately help the communities who provided it?</li>
</ul>

These questions become even sharper when CLM monitors PPR issues that intersect with law enforcement or politics.`,
      duration: "6 min",
    },
    {
      title: "Justice-Oriented Indicators",
      type: "reading",
      content: `<b>2.3 Justice-Oriented Indicators</b>

Data for justice is not only about how you collect and share information. It is also about <b>what you decide to measure</b>.

<b>Examples of justice-oriented CLM indicators in a PPR context:</b>
<ul>
<li>Availability and affordability of diagnostic tests for respiratory infections in rural clinics.</li>
<li>Presence and actual use of IPC measures in facilities that serve poor or marginalised communities.</li>
<li>Reports of people being turned away from emergency services because of migration status, gender identity or occupation.</li>
<li>Drop-off in health service utilisation during crises, disaggregated by location, gender, age and key population status.</li>
<li>Whether communities are actively involved in designing and delivering risk-communication campaigns.</li>
</ul>

<b>2.4 Turning Data into Power</b>

Evidence becomes justice when it changes decisions, resources or narratives. That requires strategy.

<b>Some common pathways:</b>
<ul>
<li><b>Evidence to negotiation:</b> Presenting CLM findings at facility, district or national level and negotiating concrete action plans with timelines.</li>
<li><b>Evidence to budget:</b> Comparing CLM findings with available budget information to show where spending does not match community priorities.</li>
<li><b>Evidence to representation:</b> Using CLM data to make the case for community seats in PPR decision-making spaces.</li>
<li><b>Evidence to narrative:</b> Turning numbers into stories that journalists, community leaders and politicians cannot ignore.</li>
</ul>

At every step, communities decide which risks they are willing to take, and which alliances will make action more likely.`,
      duration: "6 min",
    },
    {
      title: "Reflection: When Evidence Hurts",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Reflective Activity: When Evidence Hurts",
        context: "Think of a situation, real or hypothetical, where sharing CLM data publicly could put someone at risk. Examples: key populations in a criminalised setting, undocumented migrants, or whistle-blower health workers.",
        prompts: [
          { id: 1, question: "Describe the risk: who could be harmed, and how?" },
          { id: 2, question: "Suggest at least two ways CLM teams could still use the evidence while protecting those involved." },
          { id: 3, question: "Reflect on who should have the final say on how that data is used." }
        ],
        closingQuote: "Strong evidence protects systems only when it first protects people. Protection is not the opposite of accountability—it is what makes accountability sustainable."
      },
      duration: "8 min",
    },
    {
      title: "Knowledge Check: Data for Justice",
      type: "quiz",
      question: "What best captures the idea of 'Data for Justice' in CLM?",
      options: [
        { id: "a", text: "Collecting data only when donors request it", isCorrect: false },
        { id: "b", text: "Using community-generated evidence to shift power, resources and narratives in favour of marginalised groups", isCorrect: true },
        { id: "c", text: "Sharing all data publicly, regardless of risk", isCorrect: false },
        { id: "d", text: "Prioritising national averages over disaggregated data", isCorrect: false }
      ],
      duration: "3 min",
    },
    {
      title: "Risk or Rights Game",
      type: "game",
      gameType: "voices-first",
      content: "A decision-making game where you explore ethical choices in CLM data use. Each round presents a scenario with possible actions. Choose wisely to balance Safety, Impact, and Trust. You'll see that there is rarely a perfect choice, but some choices balance these factors better than others.",
      duration: "12 min",
    },
    {
      title: "Part 2: Read / Listen / Watch",
      type: "resources",
      duration: "40 min",
      summaryCards: [
        {
          title: "Ethics in Community-Led Monitoring: A Practical Checklist",
          source: "HIS Engage Scotland (Adapted)",
          type: "Tool",
          readingTime: "10 min",
          description: "A step-by-step guide to putting ethics into everyday CLM practice. It walks teams through informed consent, confidentiality, data security and community control, with focus on sensitive PPR contexts.",
          link: "https://www.hisengage.scot/engaging-communities/participation-toolkit/ethical-checklist/"
        },
        {
          title: "Counting What Counts: Equity Indicators in CLM",
          source: "Global CLM Network Webinar",
          type: "Webinar Recording",
          readingTime: "20 min",
          description: "Activists from three regions explain how they adapted their CLM indicators to better capture inequities in access to diagnostics, IPC, vaccines and emergency care."
        },
        {
          title: "Data Is People (Podcast)",
          source: "Community Voices Series",
          type: "Podcast",
          readingTime: "12 min",
          description: "Short testimonies from individuals whose experiences only began to matter to the system once they were recorded and presented through CLM."
        }
      ],
    },
    {
      title: "Case Study: Tracking Oxygen and IPC",
      type: "reading",
      content: `<b>Case Study: Tracking Oxygen and IPC in a Provincial Hospital Network</b>

A coalition of community organisations in a Southern African country had been using CLM to monitor HIV and TB services. After severe COVID-19 waves, they decided to include PPR issues in their work.

Together with local health workers and community volunteers, they:
<ul>
<li>Reviewed national emergency and health security plans to understand existing commitments on oxygen and IPC.</li>
<li>Added new questions to their CLM tools on oxygen cylinder availability, refill frequency, bed spacing, handwashing facilities and PPE use.</li>
<li>Collected data from clinics and district hospitals across two provinces.</li>
<li>Analysed the results and found that oxygen cylinders were often present but empty, and that IPC standards were weakest in facilities serving poorer communities.</li>
<li>Produced a short report and visual summary and presented it to provincial health managers, national planners and civil society allies.</li>
</ul>

<b>Results:</b> Within months, provincial authorities shifted part of their health budget toward oxygen refills and IPC supplies for peripheral facilities. Follow-up CLM rounds showed improvements, although not yet evenly across all sites.

<b>Why this matters:</b>
<ul>
<li>It illustrates the CLM cycle from identification to tracking change.</li>
<li>It shows Data for Justice in practice: evidence used to shift resources and correct inequities.</li>
<li>It demonstrates how CLM can plug directly into national PPR planning and monitoring processes.</li>
</ul>`,
      duration: "6 min",
    },
    {
      title: "Reflection: Equity Indicator",
      type: "interactive",
      interactiveType: "reflection",
      reflectionData: {
        title: "Case Study Reflection",
        context: "Based on the oxygen and IPC case study you just read, consider how you might strengthen CLM's focus on equity.",
        prompts: [
          { id: 1, question: "If you were part of this monitoring team, what one extra indicator would you add to capture equity concerns, and why?" },
          { id: 2, question: "How would you ensure that the communities most affected by IPC gaps are involved in the monitoring process itself?" }
        ],
        closingQuote: "Equity is not just about what we measure—it's about who does the measuring and who benefits from the findings."
      },
      duration: "5 min",
    },
    {
      title: "Module 2 Summary",
      type: "reading",
      content: `<b>Key Takeaways from Module 2:</b>

<ul>
<li><b>CLM is a cycle of action, not a one-time project.</b> Identify, collect, analyse, share, act, track and re-design.</li>
<li><b>When communities lead every stage of this cycle</b>, CLM becomes a governance practice, not only a data exercise.</li>
<li><b>Data is never neutral.</b> Data for Justice means choosing what to measure, how to measure it, and how to use it in ways that advance equity and protect people from harm.</li>
<li><b>Integrated into PPR</b>, CLM provides both an early warning system and a moral compass—ensuring that preparedness is judged not only by technical capacity but by whose lives are made safer.</li>
</ul>

<strong>You've completed Module 2!</strong>

Next, you'll take an assessment to demonstrate your understanding of the principles and practice of CLM.`,
      duration: "4 min",
    },
    {
      title: "Part 4: Read / Listen / Watch",
      type: "resources",
      duration: "30 min",
      summaryCards: [
        {
          title: "The Evidence Safety Filter",
          source: "CLM Ethics Working Group",
          type: "Infographic",
          readingTime: "5 min",
          description: "A visual guide showing how raw community evidence passes through safety filters (anonymisation, closed-door advocacy, secure storage, community control) before becoming responsible evidence products that drive action without harm."
        },
        {
          title: "Community Data Governance Principles",
          source: "Open Data Institute (2023)",
          type: "Framework",
          readingTime: "15 min",
          description: "Principles for ensuring communities maintain control over data about them, including consent frameworks, data minimisation, and collective decision-making about data use."
        },
        {
          title: "From Monitoring to Movement: CLM and Social Accountability",
          source: "EANNASO & Partners (2024)",
          type: "Policy Brief",
          readingTime: "10 min",
          description: "Analysis of how CLM has evolved from a technical monitoring approach into a social movement strategy that challenges power and transforms governance."
        }
      ],
    },
  ],
};

const module3Content: ModuleContent = {
  title: "Advocacy and Stakeholder Engagement",
  description:
    "Learn how to translate CLM findings into effective advocacy strategies and engage diverse stakeholders for systemic change.",
  totalSegments: 4,
  segments: [
    {
      title: "Module 3 Overview",
      type: "reading",
      content: `This module focuses on translating CLM evidence into advocacy action. You will learn how to engage stakeholders, build coalitions, and create sustainable change through strategic advocacy.

      <b>Learning Objectives:</b>

      By the end of this module, you will be able to:

      <ol>
        <li>Develop evidence-based advocacy strategies using CLM data</li>
        <li>Identify and engage key stakeholders at different levels</li>
        <li>Build and maintain advocacy coalitions</li>
        <li>Navigate power dynamics in health governance spaces</li>
      </ol>`,
      duration: "5 min",
    },
    {
      title: "Part 1: From Evidence to Advocacy",
      type: "reading",
      content: `CLM data is only valuable when it leads to action. Effective advocacy translates community evidence into policy and practice changes.

<b>The Evidence-to-Advocacy Pathway:</b>

<ol>
<li><b>Analyze:</b> Identify patterns, trends, and priority issues from CLM data</li>
<li><b>Validate:</b> Share findings with communities to ensure accuracy and ownership</li>
<li><b>Strategize:</b> Determine advocacy targets, messages, and tactics</li>
<li><b>Engage:</b> Meet with decision-makers, present evidence, propose solutions</li>
<li><b>Monitor:</b> Track commitments and hold stakeholders accountable</li>
</ol>

<b>Effective Advocacy Messages:</b>

<ul>
<li>Lead with community stories that illustrate the data</li>
<li>Be specific about the problem and the solution</li>
<li>Use local evidence to make the issue concrete</li>
<li>Propose realistic, actionable recommendations</li>
</ul>`,
      duration: "10 min",
    },
    {
      title: "Part 2: Stakeholder Mapping and Engagement",
      type: "reading",
      content: `Successful advocacy requires understanding who has the power to create change and how to engage them effectively.

<b>Key Stakeholder Categories:</b>

<ul>
<li><b>Decision-makers:</b> Government officials, health managers, budget controllers</li>
<li><b>Influencers:</b> Media, civil society leaders, academic experts</li>
<li><b>Implementers:</b> Health workers, facility managers, program staff</li>
<li><b>Allies:</b> Other community organizations, development partners, professional associations</li>
</ul>

<b>Engagement Strategies:</b>

<ol>
<li><b>Formal channels:</b> Official meetings, written submissions, public consultations</li>
<li><b>Informal channels:</b> Relationship building, networking, media engagement</li>
<li><b>Coalition building:</b> Partnering with organizations that share your goals</li>
<li><b>Accountability mechanisms:</b> Using formal grievance processes and oversight bodies</li>
</ol>`,
      duration: "8 min",
    },
    {
      title: "Module 3 Summary",
      type: "reading",
      content: `<b>Key Takeaways:</b>

<ul>
<li>CLM evidence must be translated into strategic advocacy action</li>
<li>Effective advocacy requires understanding stakeholder power and interests</li>
<li>Coalitions amplify community voice and increase advocacy impact</li>
<li>Sustained engagement is needed to achieve and maintain change</li>
</ul>

<strong>You've completed Module 3!</strong>

Next, you'll take an assessment to demonstrate your understanding of advocacy and stakeholder engagement.`,
      duration: "5 min",
    },
  ],
};

const module4Content: ModuleContent = {
  title: "Institutionalizing CLM in PPR Systems",
  description:
    "Learn how to embed CLM into national and regional PPR frameworks for sustainable community participation in health security.",
  totalSegments: 4,
  segments: [
    {
      title: "Module 4 Overview",
      type: "reading",
      content: `This final module explores how to institutionalize CLM within formal PPR systems, ensuring community voice is permanently embedded in health security governance.

      <b>Learning Objectives:</b>

      By the end of this module, you will be able to:

      <ol>
        <li>Identify entry points for CLM in national PPR frameworks</li>
        <li>Develop strategies for sustainable CLM financing</li>
        <li>Build relationships with PPR governance structures</li>
        <li>Create mechanisms for ongoing community participation in health security</li>
      </ol>`,
      duration: "5 min",
    },
    {
      title: "Part 1: Entry Points for CLM in PPR",
      type: "reading",
      content: `National PPR systems offer multiple entry points for community-led monitoring. Understanding these opportunities is essential for sustainable integration.

<b>Key Entry Points:</b>

<ul>
<li><b>National Action Plans for Health Security (NAPHS):</b> CLM can inform NAPHS development and monitor implementation</li>
<li><b>JEE and SPAR processes:</b> Community evidence can validate and supplement official assessments</li>
<li><b>Emergency operations:</b> CLM can provide real-time community feedback during health emergencies</li>
<li><b>Health sector governance:</b> Community representatives can participate in technical working groups and oversight committees</li>
</ul>

<b>Building the Case for Integration:</b>

<ol>
<li>Demonstrate CLM's value through documented improvements</li>
<li>Align CLM with existing policy frameworks and commitments</li>
<li>Identify champions within government and partner organizations</li>
<li>Propose specific, practical integration mechanisms</li>
</ol>`,
      duration: "10 min",
    },
    {
      title: "Part 2: Sustainable CLM Financing",
      type: "reading",
      content: `Long-term CLM impact requires sustainable financing beyond short-term project funding.

<b>Financing Strategies:</b>

<ul>
<li><b>Government funding:</b> Advocate for CLM line items in health budgets</li>
<li><b>Global health security financing:</b> Integrate CLM into Pandemic Fund and other PPR investments</li>
<li><b>Domestic resource mobilization:</b> Work with local governments and private sector</li>
<li><b>Community contributions:</b> In-kind support and volunteer networks</li>
</ul>

<b>Making the Investment Case:</b>

<ol>
<li>Document cost-effectiveness of CLM compared to other monitoring approaches</li>
<li>Show return on investment through improved service quality and outcomes</li>
<li>Highlight risk reduction value for pandemic preparedness</li>
<li>Demonstrate alignment with government priorities and international commitments</li>
</ol>`,
      duration: "8 min",
    },
    {
      title: "Module 4 Summary",
      type: "reading",
      content: `<b>Key Takeaways:</b>

<ul>
<li>Multiple entry points exist for integrating CLM into PPR systems</li>
<li>Sustainable financing requires diversified funding strategies</li>
<li>Institutionalization requires both formal mechanisms and relationship building</li>
<li>Community participation must be embedded as a permanent feature of health security governance</li>
</ul>

<strong>You've completed Module 4!</strong>

Congratulations on completing all four modules of the Kujua360 course. You now have a comprehensive understanding of how CLM strengthens PPR systems and how to implement CLM in your context.

Take the final assessment to earn your certificate of completion.`,
      duration: "5 min",
    },
  ],
};

// Function to get module content by ID
export const getModuleContent = (moduleId: number): ModuleContent => {
  switch (moduleId) {
    case 1:
      return module1Content;
    case 2:
      return module2Content;
    case 3:
      return module3Content;
    case 4:
      return module4Content;
    default:
      return module1Content;
  }
};

// Export for backward compatibility
export const moduleContent = module1Content;
