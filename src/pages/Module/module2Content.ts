import { ModuleContent } from "./types";

export const module2Content: ModuleContent = {
  title: "The Principles and Practice of CLM",
  description:
    "This module goes deeper into the practice of CLM. It answers two big questions: How does CLM actually work in real life, from the first complaint to the final policy change? And how can we treat data not just as information, but as a tool for justice?",
  totalSegments: 22,
  segments: [
    // OVERVIEW
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

    // PART 1: THE CLM CYCLE IN PRACTICE
    {
      title: "Part 1: The CLM Cycle in Practice",
      type: "reading",
      content: `<b>CLM as a Cycle, Not a Project</b>

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
      content: `<b>Step 1: Identify Gaps and Priorities</b>

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
      content: `<b>Step 2: Collect Data</b>

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
      title: "Steps 3-5: Analyse, Share, Act and Track",
      type: "reading",
      content: `<b>Step 3: Analyse and Interpret</b>

Data alone does not change anything. It needs interpretation.

Community analysis sessions ask questions such as:
<ul>
<li>What patterns are we seeing across facilities, districts or groups?</li>
<li>Which communities are affected most severely?</li>
<li>How do these patterns connect to policies, budgets or PPR plans?</li>
<li>From a community perspective, what would "success" look like in six months?</li>
</ul>

When communities lead analysis, they decide which findings are politically important, not only which are statistically significant.

<b>Step 4: Share and Negotiate</b>

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

<b>Step 5: Act, Track and Re-design</b>

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
      gameType: "close-the-loop",
      content: "Complete the CLM cycle by matching real-life activities to the correct stage: Identify, Collect, Analyse, Share, Act, Track. By repeating rounds, you'll internalise the cycle and see that leaving out a stage weakens the entire process.",
      duration: "10 min",
    },
    {
      title: "Part 1: Read / Listen / Watch",
      type: "resources",
      duration: "100 min",
      summaryCards: [
        {
          title: "Community Monitoring as a Cycle, Not a One-Off",
          source: "CLM Technical Brief (2023)",
          type: "Brief Article",
          readingTime: "15 min",
          description: "This article explains CLM as a living process that moves through several connected stages: identifying priority gaps, collecting evidence, analysing and interpreting findings, sharing results with both communities and duty bearers, acting on commitments, tracking whether change occurs, and redesigning the approach when it does not.",
          link: "https://www.unaids.org/sites/default/files/media_asset/JC3085E_community-led-monitoring-in-action_en.pdf"
        },
        {
          title: "From Complaint to Commitment: Case Stories",
          source: "Community-Led Accountability Network",
          type: "Case Study Collection",
          readingTime: "60 min",
          description: "Real stories that show how community complaints were turned into service improvements through systematic monitoring and negotiation.",
          link: "https://www.unaids.org/sites/default/files/media_asset/JC3085E_community-led-monitoring-in-action_en.pdf"
        },
        {
          title: "Switching Up the Dial on Community Voices",
          source: "UHC2030 Partner Sessions",
          type: "Audio/Video Panel",
          readingTime: "25 min",
          description: "Civil society leaders reflecting on their experience of engaging health systems with community-generated evidence. Discussions centre on what happens after data is produced and where accountability processes stall.",
          link: "https://www.uhc2030.org/news-and-events/news/partner-insights/partner-insights/switching-up-the-dial-on-community-voices-for-uhc-545649/"
        }
      ],
    },

    // PART 2: DATA FOR JUSTICE
    {
      title: "Part 2: Data for Justice",
      type: "reading",
      content: `<b>Data is Never Neutral</b>

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

<b>Data for Justice</b> means using information to expose and correct these patterns, not to hide them.`,
      duration: "5 min",
    },
    {
      title: "Ethical Principles in CLM Data",
      type: "reading",
      content: `<b>Ethical Principles in CLM Data</b>

Because CLM works with real people in real communities, ethics cannot be outsourced to a separate committee. They must be part of the daily practice of monitoring.

<b>Key ethical questions:</b>
<ul>
<li><b>Consent:</b> Do people understand what monitoring is about, what will be recorded, and how it will be used? Can they say no without losing access to services?</li>
<li><b>Confidentiality:</b> How are notes, recordings and digital forms stored? Who can see them, and how is that access controlled?</li>
<li><b>Safety and non-harm:</b> Could a specific quote or photo expose someone to violence, arrest or stigma? Could a staff member be unfairly targeted if data is shared without context?</li>
<li><b>Collective benefit:</b> Will this evidence ultimately help the communities who provided it? Are communities part of decisions about what to publish, what to keep private and where to focus advocacy?</li>
</ul>

These questions become even sharper when CLM monitors PPR issues that intersect with law enforcement or politics, such as cross-border movement, vaccine refusal, or antimicrobial resistance.`,
      duration: "5 min",
    },
    {
      title: "Justice-Oriented Indicators",
      type: "reading",
      content: `<b>Justice-Oriented Indicators</b>

Data for justice is not only about how you collect and share information. It is also about <b>what you decide to measure</b>.

<b>Examples of justice-oriented CLM indicators in a PPR context:</b>
<ul>
<li>Availability and affordability of diagnostic tests for respiratory infections in rural clinics.</li>
<li>Presence and actual use of IPC measures in facilities that serve poor or marginalised communities.</li>
<li>Reports of people being turned away from emergency services because of migration status, gender identity or occupation.</li>
<li>Drop-off in health service utilisation during crises, disaggregated by location, gender, age and key population status.</li>
<li>Whether communities are actively involved in designing and delivering risk-communication campaigns.</li>
</ul>

<b>Turning Data into Power</b>

Evidence becomes justice when it changes decisions, resources or narratives. That requires strategy.

<b>Some common pathways:</b>
<ul>
<li><b>Evidence to negotiation:</b> Presenting CLM findings at facility, district or national level and negotiating concrete action plans with timelines.</li>
<li><b>Evidence to budget:</b> Comparing CLM findings with available budget information to show where spending does not match community priorities. Advocating for re-allocation or new investments.</li>
<li><b>Evidence to representation:</b> Using CLM data to make the case for community seats in PPR decision-making spaces such as technical working groups, emergency task teams or national advisory committees.</li>
<li><b>Evidence to narrative:</b> Turning numbers into stories that journalists, community leaders and politicians cannot ignore. Showing how preparedness fails when certain groups are ignored, and how it improves when they are centred.</li>
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
          { id: 2, question: "Suggest at least two ways CLM teams could still use the evidence while protecting those involved (e.g., anonymisation, closed-door advocacy, secure storage)." },
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
      title: "From Evidence to Action Game",
      type: "game",
      gameType: "evidence-to-action",
      content: "Match CLM findings to the most appropriate action pathway: Evidence to negotiation, Evidence to budget, Evidence to representation, or Evidence to narrative. Learn how different types of evidence require different advocacy strategies.",
      duration: "12 min",
    },
    {
      title: "Part 2: Read / Listen / Watch",
      type: "resources",
      duration: "42 min",
      summaryCards: [
        {
          title: "Ethics in Community-Led Monitoring: A Practical Checklist",
          source: "HIS Engage Scotland (Adapted)",
          type: "Tool",
          readingTime: "10 min",
          description: "A step-by-step guide to putting ethics into everyday CLM practice. It walks CLM teams through key considerations around informed consent, confidentiality, data security and community control, with a focus on sensitive PPR contexts.",
          link: "https://www.hisengage.scot/engaging-communities/participation-toolkit/ethical-checklist/"
        },
        {
          title: "Counting What Counts: Equity Indicators in CLM",
          source: "Global CLM Network Webinar",
          type: "Webinar Recording",
          readingTime: "20 min",
          description: "Activists from three regions explain how they adapted their CLM indicators to better capture inequities in access to diagnostics, IPC, vaccines and emergency care.",
          link: "https://youtu.be/SeWl4W46hpk?si=ReVLPrzVHTAHhIDa"
        },
        {
          title: "Data Is People (Podcast)",
          source: "Community Voices Series",
          type: "Podcast",
          readingTime: "12 min",
          description: "Short testimonies from individuals whose experiences only began to matter to the system once they were recorded and presented through CLM.",
          link: "https://youtu.be/oj9guQevQeE?si=n1nehFxrTzMaa80e"
        }
      ],
    },

    // CASE STUDY
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

    // RISKS OR RIGHTS GAME
    {
      title: "Risks or Rights Game",
      type: "game",
      gameType: "risks-or-rights",
      content: "A decision-making game where you explore ethical choices in CLM data use. Each round presents a scenario with possible actions. Your choices affect three meters: Safety, Impact, and Trust. You'll see that there is rarely a perfect choice, but some choices balance these factors better than others.",
      duration: "15 min",
    },

    // REFLECTION ON CASE STUDY
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

    // SUMMARY
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

Next, you'll complete an applied scenario and self-assessment to demonstrate your understanding of the principles and practice of CLM.`,
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

    // APPLIED SCENARIO
    {
      title: "Applied Scenario: PPR in Practice",
      type: "interactive",
      interactiveType: "scenario",
      scenarioData: {
        scenario: "You are part of a national network that uses CLM to monitor primary health care services. After adding some basic PPR questions to your tools, you find that: (1) Clinics in informal settlements often lack IPC supplies such as soap and gloves; (2) Rural clinics experience frequent stockouts of rapid diagnostic tests; (3) Community members say they rarely receive clear information about outbreaks.",
        question: "In 120 to 150 words, describe how you would use the CLM cycle to turn these findings into action.",
        prompts: [
          "Which stakeholders would you map and engage?",
          "How would you document and share findings?",
          "What negotiation approach would you take with decision-makers?",
          "How would you ensure community feedback and follow-up monitoring?"
        ],
        sampleResponse: "We would begin by mapping the key stakeholders responsible for IPC supplies, diagnostics and risk communication at district and national levels. We would then document our findings in a short report and slide deck, disaggregated by location and type of facility, and share them back with communities to validate the analysis. Next, we would organise meetings with district health managers and national planners to present the evidence and negotiate clear actions and timelines, for example improving supply chains for informal settlements and rural clinics and revising communication plans. Finally, we would conduct follow-up CLM visits after an agreed period to see whether conditions improved, and if not, escalate our advocacy through media, civil society coalitions and relevant national forums."
      },
      duration: "15 min",
    },
  ],
};
