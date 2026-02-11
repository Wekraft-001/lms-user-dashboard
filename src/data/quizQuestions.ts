export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestionsByModule: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 1,
      question:
        "Which statement best describes the International Health Regulations (2005)?",
      options: [
        "A voluntary global guideline for pandemic response",
        "A legally binding agreement that sets out core capacities of Member States of the WHO to respond to public health threats",
        "A financing instrument for the Global Fund",
        "A regional policy of the Africa CDC",
      ],
      correctAnswer: 1,
      explanation:
        "The IHR (2005) are legally binding for 196 countries and define what each must do to detect, assess, and respond to health threats.",
    },
    {
      id: 2,
      question:
        "Which two tools assess a country's PPPR capacity under the IHR?",
      options: [
        "Country Performance Review (CPR) and Self-Monitoring Tool (SMT)",
        "Joint External Evaluation (JEE) and State Party Annual Report (SPAR)",
        "Global Pandemic Scorecard (GPS) and World Bank Assessment Form (WBAF)",
        "National Response Index (NRI) and Continental Health Assessment (CHA)",
      ],
      correctAnswer: 1,
      explanation:
        "The JEE is an external review across 19 technical areas, and SPAR is the annual self-assessment process used by countries.",
    },
    {
      id: 3,
      question:
        "What distinguishes Community-Led Monitoring from traditional monitoring?",
      options: [
        "It is conducted solely by international experts",
        "It relies on top-down data collection from government systems",
        "It is community-owned and used to drive accountability and advocacy",
        "It replaces national statistical surveys",
      ],
      correctAnswer: 2,
      explanation:
        "CLM is designed and implemented by communities to ensure their experiences inform accountability and policy action. It's a rights-based, bottom-up approach.",
    },
    {
      id: 4,
      question:
        "Which of the following is NOT one of the five core CLM principles?",
      options: ["Ownership", "Accountability", "Transparency", "Efficiency"],
      correctAnswer: 3,
      explanation:
        "CLM is a rights-based approach driven by social justice values such as ownership, accountability, transparency, participation, and equity—not efficiency or other technical gains.",
    },
    {
      id: 5,
      question:
        "Why can CLM serve as an early-warning system within PPPR frameworks?",
      options: [
        "It provides quick financial audits of donor spending",
        "It gathers real-time community evidence that detects service gaps before formal surveillance systems",
        "It replaces national epidemic-intelligence networks",
        "It focuses only on post-crisis evaluations",
      ],
      correctAnswer: 1,
      explanation:
        "Because communities observe and report changes immediately, CLM helps identify issues that may not yet appear in official data. This makes it an invaluable early-warning mechanism.",
    },
  ],
  2: [
    {
      id: 1,
      question:
        "Which option best describes the purpose of the CLM cycle?",
      options: [
        "To collect as much data as possible for research institutions",
        "To move communities through repeated steps of identifying gaps, collecting and analysing data, engaging duty bearers and tracking change",
        "To replace all government monitoring systems",
        "To focus only on stockouts of medicines",
      ],
      correctAnswer: 1,
      explanation:
        "The CLM cycle is a repeating process where communities identify problems, gather evidence, engage decision-makers and then monitor whether change actually happens.",
    },
    {
      id: 2,
      question:
        "Which of the following activities belongs most clearly to the 'Identify' stage of the CLM cycle?",
      options: [
        "Writing a policy brief for parliament",
        "Mapping which communities were excluded from services during the last outbreak",
        "Comparing last year's and this year's data to see if conditions improved",
        "Checking whether a ministry has implemented its commitments",
      ],
      correctAnswer: 1,
      explanation:
        "Identification is about understanding where and for whom systems are failing, before tools and surveys are designed.",
    },
    {
      id: 3,
      question:
        "What best captures the idea of 'Data for Justice' in CLM?",
      options: [
        "Collecting data only when donors request it",
        "Using community-generated evidence to shift power, resources and narratives in favour of marginalised groups",
        "Sharing all data publicly, regardless of risk",
        "Prioritising national averages over disaggregated data",
      ],
      correctAnswer: 1,
      explanation:
        "Data for Justice is about using evidence to advance equity and rights, not only to describe problems.",
    },
    {
      id: 4,
      question:
        "Which ethical concern is especially important when CLM monitors highly stigmatised or criminalised communities?",
      options: [
        "Making questionnaires as long as possible",
        "Ensuring informed consent, confidentiality and safety in how data is collected and shared",
        "Handing all raw data to security agencies",
        "Avoiding any engagement with those communities",
      ],
      correctAnswer: 1,
      explanation:
        "Rights-based CLM requires strong safeguards around consent and confidentiality, particularly where people face legal or social risks.",
    },
    {
      id: 5,
      question:
        "Why is it important to track what happens after CLM findings are shared with duty bearers?",
      options: [
        "Because it helps CLM teams apply for more funding",
        "Because without tracking, communities cannot know whether commitments were implemented or if new strategies are needed",
        "Because laws require a fixed number of follow-up visits",
        "Because tracking is easier than collecting new data",
      ],
      correctAnswer: 1,
      explanation:
        "Tracking closes the loop. It shows whether evidence leads to real change and informs the next round of monitoring and advocacy.",
    },
  ],
  3: [
    {
      id: 1,
      question: "What does meaningful integration of CLM into PPPR systems involve?",
      options: [
        "Collecting more data than governments",
        "Using community evidence to inform assessments, plans, and response decisions",
        "Replacing national surveillance systems",
        "Limiting CLM to public complaints",
      ],
      correctAnswer: 1,
      explanation:
        "Meaningful integration means that CLM data is recognised as a legitimate input into PPPR processes, informing assessments, plans, and accountability mechanisms.",
    },
    {
      id: 2,
      question: "What most often determines whether CLM evidence is integrated into PPPR systems?",
      options: [
        "Sample size",
        "Donor preference",
        "Governance rules and power dynamics",
        "Use of digital tools",
      ],
      correctAnswer: 2,
      explanation:
        "Integration is shaped by power, mandates, and incentives—not just evidence strength. Governance rules and power dynamics determine whether community evidence gets heard.",
    },
    {
      id: 3,
      question: "Which PPPR process is often a strong entry point for CLM?",
      options: [
        "Media interviews",
        "Preparedness reviews and action plans",
        "Academic publications",
        "Internal community meetings",
      ],
      correctAnswer: 1,
      explanation:
        "Preparedness reviews and national action plans are key entry points where CLM data can surface blind spots in official self-reporting and inform priorities.",
    },
    {
      id: 4,
      question: "What signals symbolic rather than real integration of CLM?",
      options: [
        "CLM is referenced but not acted on",
        "Communities are consulted early",
        "Commitments are documented with timelines",
        "Follow-up monitoring occurs",
      ],
      correctAnswer: 0,
      explanation:
        "Symbolic integration is when CLM is cited rhetorically but does not influence decisions, budgets, or response design. Real integration leads to documented commitments and action.",
    },
    {
      id: 5,
      question: "Why are case studies important for understanding CLM integration?",
      options: [
        "They provide perfect models",
        "They reveal how power, resistance, and timing shape outcomes",
        "They replace theory",
        "They remove political risk",
      ],
      correctAnswer: 1,
      explanation:
        "Case studies reveal how power dynamics, political will, and pre-existing relationships shape whether community evidence gets heard and acted upon.",
    },
  ],
  4: [
    {
      id: 1,
      question:
        "Why is integration of CLM evidence sufficient on its own?",
      options: [
        "Evidence is always incomplete",
        "Systems change only through advocacy and decision-making",
        "Communities lack credibility",
        "Integration replaces accountability",
      ],
      correctAnswer: 1,
      explanation:
        "",
    },
    {
      id: 2,
      question:
        "What is a key risk of project-based CLM?",
      options: [
        "Too much data",
        "Short-terms impact without structural change",
        "Excessive community control",
        "Technical complexity",
      ],
      correctAnswer: 1,
      explanation:
        "",
    },
    {
      id: 3,
      question: "Which area is most critical for sustainability?",
      options: [
        "Media visibility",
        "Donor branding",
        "Governance and financing mechanisms",
        "Academic publication",
      ],
      correctAnswer: 2,
      explanation:
        "",
    },
    {
      id: 4,
      question:
        "What role does budgeting play in preparedness advocacy?",
      options: [
        "It limits ambition",
        "It turns commitments into reality",
        "It replaces planning",
        "It reduces equity",
      ],
      correctAnswer: 1,
      explanation:
        "",
    },
    {
      id: 5,
      question:
        "What ethical tension can institutionalisation create?",
      options: [
        "Reduces data quality",
        "Increased workload",
        "Risk of co-optation versus influence",
        "Loss of community interest",
      ],
      correctAnswer: 2,
      explanation:
        "",
    },
  ],
};

export const getQuizQuestions = (moduleId: number): QuizQuestion[] => {
  return quizQuestionsByModule[moduleId] || quizQuestionsByModule[1];
};
