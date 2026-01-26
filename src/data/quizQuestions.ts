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
        "What is the most important principle when designing CLM data collection tools?",
      options: [
        "Using standardized international templates",
        "Ensuring tools are community-centered and reflect community priorities",
        "Maximizing the number of questions asked",
        "Focusing primarily on quantitative data",
      ],
      correctAnswer: 1,
      explanation:
        "Community-centered design ensures that CLM tools address the issues that matter most to affected populations, not just donor or government interests.",
    },
    {
      id: 2,
      question:
        "Which data collection method involves trained community members visiting facilities as clients?",
      options: [
        "Facility exit interviews",
        "Community scorecards",
        "Mystery client visits",
        "Focus group discussions",
      ],
      correctAnswer: 2,
      explanation:
        "Mystery client visits involve trained community members who visit facilities as clients to assess service quality from a user perspective.",
    },
    {
      id: 3,
      question:
        "What is the most important quality for effective community monitors?",
      options: [
        "Having formal education in public health",
        "Being trusted and respected within their community",
        "Having experience working for government",
        "Being fluent in English",
      ],
      correctAnswer: 1,
      explanation:
        "Trust is foundational for CLM. Community monitors must be known and respected within their communities to collect authentic data and facilitate meaningful dialogue.",
    },
    {
      id: 4,
      question: "Why is informed consent essential in CLM data collection?",
      options: [
        "It is required by donors",
        "It protects participants and upholds ethical principles",
        "It makes data more accurate",
        "It speeds up data collection",
      ],
      correctAnswer: 1,
      explanation:
        "Informed consent is an ethical requirement that protects participants' rights, ensures they understand how their information will be used, and maintains trust in the CLM process.",
    },
    {
      id: 5,
      question: "What should be the primary focus when analyzing CLM data?",
      options: [
        "Creating impressive visualizations for donors",
        "Identifying patterns that inform advocacy and drive accountability",
        "Comparing results with other countries",
        "Validating government statistics",
      ],
      correctAnswer: 1,
      explanation:
        "CLM data analysis should focus on identifying patterns and insights that can be used for advocacy and to hold duty-bearers accountable for service quality.",
    },
  ],
  3: [
    {
      id: 1,
      question: "What is the first step in the evidence-to-advocacy pathway?",
      options: [
        "Meeting with decision-makers",
        "Analyzing CLM data for patterns and priority issues",
        "Building advocacy coalitions",
        "Launching media campaigns",
      ],
      correctAnswer: 1,
      explanation:
        "The first step is to analyze CLM data to identify patterns, trends, and priority issues that will form the basis of advocacy efforts.",
    },
    {
      id: 2,
      question: "Why should advocacy messages lead with community stories?",
      options: [
        "Stories are easier to remember than statistics",
        "Stories illustrate data and make issues concrete and human",
        "Decision-makers prefer stories over evidence",
        "Stories require less preparation than data analysis",
      ],
      correctAnswer: 1,
      explanation:
        "Community stories humanize data and make abstract issues concrete. They help decision-makers understand the real-world impact of policy choices.",
    },
    {
      id: 3,
      question:
        "Which stakeholder category includes government officials and budget controllers?",
      options: ["Influencers", "Implementers", "Decision-makers", "Allies"],
      correctAnswer: 2,
      explanation:
        "Decision-makers are those with direct authority to make policy or resource allocation decisions, including government officials, health managers, and budget controllers.",
    },
    {
      id: 4,
      question: "What is the purpose of coalition building in CLM advocacy?",
      options: [
        "To share costs of data collection",
        "To amplify community voice and increase advocacy impact",
        "To satisfy donor requirements",
        "To reduce workload for community monitors",
      ],
      correctAnswer: 1,
      explanation:
        "Coalitions bring together organizations with shared goals, amplifying community voice, pooling resources, and increasing the credibility and impact of advocacy efforts.",
    },
    {
      id: 5,
      question:
        "What should happen after decision-makers make commitments based on CLM evidence?",
      options: [
        "End the CLM program",
        "Track commitments and hold stakeholders accountable",
        "Move on to new advocacy targets",
        "Publish a final report",
      ],
      correctAnswer: 1,
      explanation:
        "Advocacy doesn't end with commitments. CLM should continue monitoring implementation and holding stakeholders accountable for their promises.",
    },
  ],
  4: [
    {
      id: 1,
      question:
        "Which of the following is an entry point for CLM in national PPPR frameworks?",
      options: [
        "Private sector health insurance schemes",
        "National Action Plans for Health Security (NAPHS)",
        "International pharmaceutical companies",
        "Academic research institutions",
      ],
      correctAnswer: 1,
      explanation:
        "NAPHS is a key entry point where CLM can inform development and monitor implementation of national health security plans.",
    },
    {
      id: 2,
      question:
        "How can community evidence contribute to JEE and SPAR processes?",
      options: [
        "By replacing official government assessments",
        "By validating and supplementing official assessments with ground-level perspectives",
        "By providing financial data on health spending",
        "By training government evaluators",
      ],
      correctAnswer: 1,
      explanation:
        "Community evidence can validate and supplement official JEE and SPAR assessments, providing ground-level perspectives that may not be captured in formal evaluations.",
    },
    {
      id: 3,
      question: "What is the most sustainable approach to CLM financing?",
      options: [
        "Relying entirely on international donor funding",
        "Diversifying funding sources including government budgets and domestic resources",
        "Depending on volunteer labor only",
        "Seeking one-time large grants",
      ],
      correctAnswer: 1,
      explanation:
        "Sustainable CLM financing requires diversified funding sources, including government budget line items, domestic resource mobilization, and various funding streams.",
    },
    {
      id: 4,
      question:
        "What is the key argument for including CLM in Pandemic Fund investments?",
      options: [
        "CLM is cheaper than other monitoring approaches",
        "Donors require community engagement",
        "CLM provides early warning and builds community trust essential for pandemic response",
        "International regulations mandate CLM",
      ],
      correctAnswer: 2,
      explanation:
        "CLM's value for pandemic preparedness lies in its early warning capabilities and its role in building the community trust that is essential for effective outbreak response.",
    },
    {
      id: 5,
      question:
        "What is essential for institutionalizing CLM beyond formal mechanisms?",
      options: [
        "International certification",
        "Advanced technology systems",
        "Relationship building with PPPR governance structures",
        "Legal enforcement powers",
      ],
      correctAnswer: 2,
      explanation:
        "Institutionalization requires both formal mechanisms and ongoing relationship building with PPPR governance structures to ensure community participation becomes permanent.",
    },
  ],
};

export const getQuizQuestions = (moduleId: number): QuizQuestion[] => {
  return quizQuestionsByModule[moduleId] || quizQuestionsByModule[1];
};
