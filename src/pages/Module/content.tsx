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
  type: "reading" | "interactive" | "game" | "quiz";
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
}

export interface ModuleContent {
  title: string;
  description: string;
  totalSegments: number;
  segments: ModuleSegment[];
}

const module1Content: ModuleContent = {
  title: "Understanding the Foundations of PPR and CLM",
  description:
    "This module lays the foundation for your learning journey, introducing global and African PPR systems and placing CLM as a mechanism for accountability, justice, and participation.",
  totalSegments: 16,
  segments: [
    {
      title: "Module Overview",
      type: "reading",
      content: `This module lays the foundation for your learning journey. It introduces systems that shape PPR, and places CLM within that landscape as a mechanism for accountability, justice, and pariticipation.

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
      title: "Part 1: The Global Architecture of PPR",
      type: "reading",
      content: `The global PPR architecture is made up of a web of frameworks, agreements, and institutions that aim to get us ready for the next emergency.

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
      title: "Global PPR Instruments",
      type: "reading",
      content: `Supporting the IHR and its assessment processes are newer global instruments and mechanisms:

<b>WHO Pandemic Agreement:</b> Formally titled the "WHO Pandemic Agreement" was adopted by member states of the WHO at the World Health Assenbly on 20 May 2025. The agreement complements the IHR and outlines a framework for pandemic prevention, preparedness, and response (PPR), including equity in access to vaccines, diagnostics, and therapeutics.

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
        <p>In Zambia, between 2021 and 2025 Amref Zambia and Grassroots Soccer Zambia implemented a CLM project aimed at ensuring the voices and recommendations of people living with HIV were incorporated into the design and approach of HIV care and treatment. Initially, a standardised questionnaire was used to collect data but each year, the questionnaire was revised by community monitors to ensure local relevance. This is a clear demonstration of community ownership of the project.    
        </p>
    </li>
    <li><b>Accountability: Findings are used to demand and negotiate change. South Africa - Ritshidze Community Monitoring</b><br/>
        <p>Ritshidze, led by people living with HIV networks such as the Treatment Action Campaign, collects real-time feedback from thousands of public clinics. The community teams escalate issues such as ARV stockouts, long waits, and unfriendly services to district and provincial health authorities. Quarterly reports trigger joint action plans, resulting in documented improvements in staffing, medicine availability, and service quality. This is accountability in practice: community evidence driving system change.
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
      title: "Part 3: Where PPR and CLM Meet",
      type: "reading",
      content: `PPR frameworks focus on the capacities of health systems laboratories, surveillance, emergency operations. CLM focuses on people and how health systems function in reality. When the two intersect, the result is both technical and democratic strength.

<b>Real-World Examples:</b>

During COVID-19, community groups in Kenya and South Africa tracked PPE shortages and vaccine access, alerting authorities before official systems registered the gaps.

During Mpox outbreaks, key population networks in Nigeria provided real-time data on stigma and service access, helping shape public communication.

These examples show that CLM can act as an early warning system and feedback mechanism within national PPR frameworks, filling gaps that formal surveillance often misses. CLM can also be more effective than other monitoring mechanisms at collecting qualitative data about the quality of health service. Finally, CLM can act as a critical enabler of trust and dialogue between communities and the government. This trust is non-negotiable in the context of pandemic preparedness and response. In a crisis, effective public health strategies, from mass vaccination campaigns and contact tracing to adherence to social distancing measures, can hinge entirely on the public trust.
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

<b>Key Takeaway:</b> When communities monitor systems from below, national data becomes more honest, equitable, and useful. Preparedness is not built in labs, it is built in trust.

<b>Reflection:</b> What would preparedness look like if every community could produce evidence like this?`,
      duration: "12 min",
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
  ],
};

const module2Content: ModuleContent = {
  title: "CLM Data Collection and Analysis",
  description:
    "Learn how to design and implement effective CLM data collection methods and analyze community-generated data for advocacy.",
  totalSegments: 4,
  segments: [
    {
      title: "Module 2 Overview",
      type: "reading",
      content: `This module explores the practical aspects of CLM data collection and analysis. You will learn how to design data collection tools, train community monitors, and analyze data to generate actionable insights.

      <b>Learning Objectives:</b>

      By the end of this module, you will be able to:

      <ol>
        <li>Design effective CLM data collection instruments</li>
        <li>Train and support community monitors</li>
        <li>Analyze community-generated data for patterns and insights</li>
        <li>Present findings in compelling ways for advocacy</li>
      </ol>`,
      duration: "5 min",
    },
    {
      title: "Part 1: Designing Data Collection Tools",
      type: "reading",
      content: `Effective CLM begins with well-designed data collection tools. These tools must be community-owned, culturally appropriate, and focused on the issues that matter most to affected populations.

<b>Key Principles for Tool Design:</b>

<ul>
<li><b>Community-Centered:</b> Questions should reflect community priorities, not just donor or government interests</li>
<li><b>Accessible:</b> Tools should be available in local languages and appropriate for varying literacy levels</li>
<li><b>Actionable:</b> Data collected should directly inform advocacy and accountability efforts</li>
<li><b>Ethical:</b> Ensure informed consent, data protection, and do-no-harm principles</li>
</ul>

<b>Types of Data Collection Methods:</b>

<ol>
<li><b>Facility exit interviews:</b> Short surveys with service users immediately after receiving services</li>
<li><b>Mystery client visits:</b> Trained community members visit facilities as clients to assess service quality</li>
<li><b>Community scorecards:</b> Participatory assessments where communities rate services against agreed standards</li>
<li><b>Focus group discussions:</b> In-depth conversations with specific population groups</li>
</ol>`,
      duration: "10 min",
    },
    {
      title: "Part 2: Training Community Monitors",
      type: "reading",
      content: `Community monitors are the backbone of CLM. They are trusted members of their communities who collect data, facilitate dialogues, and advocate for change.

<b>Essential Training Topics:</b>

<ul>
<li>Understanding the purpose and principles of CLM</li>
<li>Data collection techniques and tool usage</li>
<li>Ethics, consent, and confidentiality</li>
<li>Safety and self-care</li>
<li>Documentation and reporting</li>
</ul>

<b>Qualities of Effective Community Monitors:</b>

<ol>
<li><b>Trusted:</b> Known and respected within their community</li>
<li><b>Representative:</b> Reflect the diversity of the community (age, gender, key population status)</li>
<li><b>Committed:</b> Motivated by community service, not just compensation</li>
<li><b>Connected:</b> Have relationships with both community members and service providers</li>
</ol>`,
      duration: "8 min",
    },
    {
      title: "Module 2 Summary",
      type: "reading",
      content: `<b>Key Takeaways:</b>

<ul>
<li>Effective CLM data collection requires community-centered, accessible, and ethical tools</li>
<li>Community monitors must be carefully selected and thoroughly trained</li>
<li>Data analysis should focus on patterns that inform advocacy</li>
<li>Findings must be shared in ways that drive accountability</li>
</ul>

<strong>You've completed Module 2!</strong>

Next, you'll take an assessment to demonstrate your understanding of CLM data collection and analysis.`,
      duration: "5 min",
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
