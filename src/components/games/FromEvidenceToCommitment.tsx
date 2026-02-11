import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, Zap, Target, Shield, TrendingUp, Users, Sparkles, Trophy, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface EvidenceCard {
    id: number;
    text: string;
    icon: "pulse" | "message" | "access" | "users" | "coins" | "target";
}

interface ChallengeCard {
    id: number;
    title: string;
    description: string;
    color: string;
}

interface ActionCard {
    id: number;
    text: string;
    isStrong: boolean;
    feedback: string;
}

interface DecisionSpaceCard {
    id: number;
    title: string;
    focus: string;
    outcome: "symbolic" | "partial" | "conditional" | "concrete" | "structural";
    icon: string;
}

interface CommitmentCard {
    id: number;
    type: string;
    description: string;
    isGood: boolean;
}

interface FollowUpCard {
    id: number;
    text: string;
    isSustainable: boolean;
}

const evidenceCards: EvidenceCard[] = [
    {
        id: 1,
        text: "Community monitors documented repeated stockouts of essential medicines during emergency periods, despite national reports showing adequate supply at central level.",
        icon: "pulse",
    },
    {
        id: 2,
        text: "People in informal settlements reported that risk communication messages did not reach them until weeks after official announcements.",
        icon: "message",
    },
    {
        id: 3,
        text: "Health facilities serving key populations reduced operating hours during the outbreak, effectively cutting access without issuing formal service suspension notices.",
        icon: "access",
    },
    {
        id: 4,
        text: "Community members reported discriminatory treatment and delayed referrals during outbreak response, particularly affecting marginalised groups.",
        icon: "users",
    },
    {
        id: 5,
        text: "Emergency funds were released nationally, but local clinics reported no increase in operational resources or staffing support.",
        icon: "coins",
    },
    {
        id: 6,
        text: "Preparedness plans list community engagement as a priority, but no indicators or budget lines exist to operationalise it.",
        icon: "target",
    },
];

const challengeCards: ChallengeCard[] = [
    {
        id: 1,
        title: "Political Sensitivity",
        description:
            "Officials acknowledge the issue privately but say addressing it publicly could undermine confidence in the response.",
        color: "from-red-500/20 to-orange-500/20",
    },
    {
        id: 2,
        title: "Budget Constraint",
        description:
            "Decision-makers agree with the findings but argue that no additional funds are available this financial year.",
        color: "from-amber-500/20 to-yellow-500/20",
    },
    {
        id: 3,
        title: "Institutional Denial",
        description:
            "Authorities dispute the findings, claiming they contradict official data and reports.",
        color: "from-rose-500/20 to-pink-500/20",
    },
    {
        id: 4,
        title: "Mandate Confusion",
        description:
            "Each institution involved claims the issue falls under another department's responsibility.",
        color: "from-purple-500/20 to-indigo-500/20",
    },
    {
        id: 5,
        title: "Crisis Fatigue",
        description:
            "Leadership argues that the system is already overstretched and cannot absorb new demands.",
        color: "from-orange-500/20 to-red-500/20",
    },
    {
        id: 6,
        title: "Token Participation",
        description:
            "Communities are invited to present findings, but no mechanism exists for decisions or follow-up.",
        color: "from-yellow-500/20 to-amber-500/20",
    },
];

const actionCards: ActionCard[] = [
    {
        id: 1,
        text: "Reframe the evidence to show how the failure increases future outbreak risk and long-term system costs.",
        isStrong: true,
        feedback:
            "You have repositioned the evidence in a way decision-makers cannot easily dismiss.",
    },
    {
        id: 2,
        text: "Link the findings directly to commitments already made in national preparedness plans or response frameworks.",
        isStrong: true,
        feedback:
            "By connecting to existing commitments, you create accountability pressure that is harder to ignore.",
    },
    {
        id: 3,
        text: "Demand immediate public acknowledgment",
        isStrong: false,
        feedback:
            "This response increases visibility but does not shift decision-making power. The issue stalls.",
    },
    {
        id: 4,
        text: "Translate community findings into a small number of clear, actionable demands with timelines.",
        isStrong: true,
        feedback:
            "Specific, time-bound demands make it harder for officials to offer vague promises instead of action.",
    },
    {
        id: 5,
        text: "Build a coalition with other civil society or professional groups affected by the same failure.",
        isStrong: true,
        feedback:
            "A broader coalition increases political weight and makes it harder to dismiss the evidence as isolated complaints.",
    },
    {
        id: 6,
        text: "Publish the findings without engagement",
        isStrong: false,
        feedback:
            "Publishing without strategic engagement may generate attention but rarely leads to concrete commitments.",
    },
    {
        id: 7,
        text: "Wait until the crisis ends",
        isStrong: false,
        feedback:
            "Waiting allows momentum to fade and makes it easier for the issue to be forgotten or deprioritised.",
    },
];

const decisionSpaceCards: DecisionSpaceCard[] = [
    {
        id: 1,
        title: "National Preparedness Review",
        focus: "Lessons learned and future readiness",
        outcome: "concrete",
        icon: "🎯",
    },
    {
        id: 2,
        title: "Emergency Task Team",
        focus: "Immediate operational decisions",
        outcome: "partial",
        icon: "⚡",
    },
    {
        id: 3,
        title: "Budget Planning Hearing",
        focus: "Resource allocation",
        outcome: "structural",
        icon: "💰",
    },
    {
        id: 4,
        title: "After-Action Review",
        focus: "What went wrong and what must change",
        outcome: "concrete",
        icon: "🔍",
    },
    {
        id: 5,
        title: "Oversight Committee",
        focus: "Accountability and public justification",
        outcome: "conditional",
        icon: "👥",
    },
];

const commitmentOutcomes = {
    symbolic: {
        type: "Symbolic",
        description:
            "Findings are acknowledged in the final report, but no actions, timelines, or responsibilities are specified.",
        isGood: false,
        emoji: "📝",
    },
    partial: {
        type: "Partial",
        description:
            "A task team is established to explore the issue, without budget allocation or deadline.",
        isGood: false,
        emoji: "⏳",
    },
    conditional: {
        type: "Conditional",
        description:
            "Commitment is made, but implementation is dependent on future funding or donor support.",
        isGood: false,
        emoji: "🤝",
    },
    concrete: {
        type: "Concrete",
        description:
            "Specific actions are agreed, responsible actors named, and timelines recorded.",
        isGood: true,
        emoji: "✅",
    },
    structural: {
        type: "Structural",
        description:
            "Changes are made to plans, budgets, or governance processes to prevent recurrence.",
        isGood: true,
        emoji: "🏗️",
    },
};

const followUpCards: FollowUpCard[] = [
    {
        id: 1,
        text: "Community monitors track whether commitments are implemented at facility level.",
        isSustainable: true,
    },
    {
        id: 2,
        text: "Progress is reviewed at the next formal planning or accountability meeting.",
        isSustainable: true,
    },
    {
        id: 3,
        text: "No follow-up mechanism is established, and the issue quietly disappears.",
        isSustainable: false,
    },
    {
        id: 4,
        text: "CLM indicators are integrated into routine monitoring or preparedness reviews.",
        isSustainable: true,
    },
    {
        id: 5,
        text: "Communities are excluded from follow-up discussions, despite being affected.",
        isSustainable: false,
    },
];

type GameStage =
    | "intro"
    | "evidence"
    | "challenge"
    | "action"
    | "decision-space"
    | "commitment"
    | "follow-up"
    | "complete";

const triggerConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#e41f28", "#002776", "#007a87", "#a9d04f"],
    });
};

const triggerFireworks = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ["#e41f28", "#002776", "#007a87"],
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ["#a9d04f", "#002776", "#007a87"],
        });
    }, 250);
};

interface FromEvidenceToCommitmentProps {
    onComplete?: () => void;
}

export const FromEvidenceToCommitment = ({
    onComplete,
}: FromEvidenceToCommitmentProps) => {
    const [stage, setStage] = useState<GameStage>("intro");
    const [selectedEvidence, setSelectedEvidence] = useState<EvidenceCard | null>(null);
    const [selectedChallenge, setSelectedChallenge] = useState<ChallengeCard | null>(null);
    const [selectedAction, setSelectedAction] = useState<ActionCard | null>(null);
    const [actionAttempted, setActionAttempted] = useState(false);
    const [selectedDecisionSpace, setSelectedDecisionSpace] = useState<DecisionSpaceCard | null>(null);
    const [commitment, setCommitment] = useState<CommitmentCard | null>(null);
    const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUpCard | null>(null);
    const [score, setScore] = useState(0);

    const getProgressPercentage = () => {
        const stages = ["intro", "evidence", "challenge", "action", "decision-space", "commitment", "follow-up", "complete"];
        const currentIndex = stages.indexOf(stage);
        return ((currentIndex + 1) / stages.length) * 100;
    };

    // Pathway visualization component
    const PathwayProgress = () => {
        const steps = [
            { name: "Evidence", icon: Target, active: ["evidence", "challenge", "action", "decision-space", "commitment", "follow-up", "complete"].includes(stage) },
            { name: "Challenge", icon: Shield, active: ["challenge", "action", "decision-space", "commitment", "follow-up", "complete"].includes(stage) },
            { name: "Action", icon: Zap, active: ["action", "decision-space", "commitment", "follow-up", "complete"].includes(stage) },
            { name: "Decision", icon: Users, active: ["decision-space", "commitment", "follow-up", "complete"].includes(stage) },
            { name: "Commitment", icon: TrendingUp, active: ["commitment", "follow-up", "complete"].includes(stage) },
            { name: "Follow-Up", icon: Sparkles, active: ["follow-up", "complete"].includes(stage) },
        ];

        return (
            <div className="relative mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.name} className="flex flex-col items-center relative z-10">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 transform",
                                        step.active
                                            ? "bg-gradient-to-br from-primary to-secondary scale-110 shadow-lg shadow-primary/50"
                                            : "bg-muted scale-100"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "w-6 h-6 transition-all duration-300",
                                            step.active ? "text-white" : "text-muted-foreground"
                                        )}
                                    />
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-medium mt-2 transition-all duration-300",
                                        step.active ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {step.name}
                                </span>
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "absolute top-6 left-12 w-full h-0.5 transition-all duration-500",
                                            steps[index + 1].active ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                                        )}
                                        style={{ width: "calc(100% + 2rem)" }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Intro stage
    if (stage === "intro") {
        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                        <Trophy className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">Strategic Advocacy Game</span>
                    </div>

                    <h3 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700 delay-100">
                        From Evidence to Commitment
                    </h3>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-3xl animate-pulse" />
                        <Card className="relative p-8 bg-gradient-to-br from-background via-primary/5 to-secondary/5 border-2 border-primary/20 shadow-2xl animate-in slide-in-from-bottom-4 duration-700 delay-200">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-6 h-6 text-primary shrink-0 mt-1 animate-pulse" />
                                    <p className="text-lg text-muted-foreground leading-relaxed text-left">
                                        You are part of a CLM network trying to turn community evidence
                                        into <span className="font-bold text-primary">real, lasting change</span>.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Target className="w-6 h-6 text-secondary shrink-0 mt-1" />
                                    <p className="text-lg text-muted-foreground leading-relaxed text-left">
                                        At each step, choose how you will move the evidence forward. Some
                                        choices lead to <span className="font-bold text-success">action</span>. Others lead to <span className="font-bold text-destructive">delay</span> or <span className="font-bold text-amber-600">symbolic recognition</span>.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Button
                        onClick={() => setStage("evidence")}
                        size="lg"
                        className="group relative overflow-hidden from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl px-8 py-6 text-lg animate-in slide-in-from-bottom-4 duration-700 delay-300"
                    >
                        <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Start Your Journey
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        );
    }

    // Evidence selection stage
    if (stage === "evidence") {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <PathwayProgress />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 1 of 6</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                        Select Your <span className="text-primary">Evidence</span>
                    </h3>
                    <p className="text-muted-foreground">
                        Choose a CLM finding to move through the advocacy pathway
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {evidenceCards.map((evidence, index) => (
                        <Card
                            key={evidence.id}
                            className={cn(
                                "p-5 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 animate-in slide-in-from-bottom-4",
                                selectedEvidence?.id === evidence.id
                                    ? "ring-2 ring-primary bg-gradient-to-br from-primary/10 to-secondary/5 border-primary shadow-lg shadow-primary/20 scale-105"
                                    : "hover:bg-gradient-to-br hover:from-muted/50 hover:to-background border-border hover:border-primary/30 hover:scale-102"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => setSelectedEvidence(evidence)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                                    selectedEvidence?.id === evidence.id
                                        ? "bg-gradient-to-br from-primary to-secondary shadow-lg"
                                        : "bg-muted"
                                )}>
                                    <Target className={cn(
                                        "w-5 h-5 transition-colors duration-300",
                                        selectedEvidence?.id === evidence.id ? "text-white" : "text-muted-foreground"
                                    )} />
                                </div>
                                <p className="text-sm text-foreground leading-relaxed flex-1">{evidence.text}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => {
                            if (selectedEvidence) {
                                const randomChallenge = challengeCards[Math.floor(Math.random() * challengeCards.length)];
                                setSelectedChallenge(randomChallenge);
                                setStage("challenge");
                            }
                        }}
                        disabled={!selectedEvidence}
                        size="lg"
                        className="group from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        );
    }

    // Challenge stage
    if (stage === "challenge") {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <PathwayProgress />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 2 of 6</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                        Facing <span className="text-amber-600">Resistance</span>
                    </h3>
                </div>

                <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-lg animate-in slide-in-from-bottom-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">
                                Your Evidence
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                            {selectedEvidence?.text}
                        </p>
                    </div>
                </Card>

                <Card className={cn(
                    "p-6 border-2 shadow-xl animate-in slide-in-from-bottom-4 delay-100",
                    `bg-gradient-to-br ${selectedChallenge?.color} border-amber-500/30`
                )}>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center shadow-lg shrink-0">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-lg text-amber-600 mb-2 flex items-center gap-2">
                                ⚠️ Challenge: {selectedChallenge?.title}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedChallenge?.description}
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="text-center">
                    <p className="text-lg font-semibold text-foreground mb-6">
                        How will you respond to this challenge?
                    </p>
                    <Button
                        onClick={() => setStage("action")}
                        size="lg"
                        className="group from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Choose Your Strategy
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        );
    }

    // Action selection stage
    if (stage === "action") {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <PathwayProgress />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Step 3 of 6</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                        Choose Your <span className="text-secondary">Advocacy Action</span>
                    </h3>
                    <p className="text-muted-foreground">
                        Select the strategy that will advance your evidence
                    </p>
                </div>

                <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-500/30 shadow-lg animate-in slide-in-from-top-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                        <p className="text-sm text-muted-foreground">
                            <span className="font-bold text-amber-600">Active Challenge:</span>{" "}
                            {selectedChallenge?.title}
                        </p>
                    </div>
                </Card>

                <div className="grid gap-3">
                    {actionCards.map((action, index) => {
                        const isSelected = selectedAction?.id === action.id;
                        const showFeedback = actionAttempted && isSelected;

                        return (
                            <div
                                key={action.id}
                                className="space-y-2 animate-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Card
                                    className={cn(
                                        "p-5 cursor-pointer transition-all duration-300 border-2 relative overflow-hidden group",
                                        isSelected && !actionAttempted && "ring-2 ring-secondary bg-gradient-to-br from-secondary/10 to-primary/5 border-secondary shadow-lg scale-102",
                                        showFeedback && action.isStrong && "bg-gradient-to-br from-success/10 to-emerald-500/5 border-success shadow-lg shadow-success/20",
                                        showFeedback && !action.isStrong && "bg-gradient-to-br from-destructive/10 to-red-500/5 border-destructive shadow-lg shadow-destructive/20",
                                        !actionAttempted && !isSelected && "hover:bg-gradient-to-br hover:from-muted/50 hover:to-background hover:border-secondary/50 hover:shadow-md hover:scale-101"
                                    )}
                                    onClick={() => {
                                        if (!actionAttempted) {
                                            setSelectedAction(action);
                                        }
                                    }}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                    <div className="flex items-start gap-3 relative z-10">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                                            isSelected && !showFeedback && "bg-gradient-to-br from-secondary to-primary",
                                            showFeedback && action.isStrong && "bg-gradient-to-br from-success to-emerald-600",
                                            showFeedback && !action.isStrong && "bg-gradient-to-br from-destructive to-red-600",
                                            !isSelected && !showFeedback && "bg-muted group-hover:bg-gradient-to-br group-hover:from-secondary/50 group-hover:to-primary/50"
                                        )}>
                                            {showFeedback ? (
                                                action.isStrong ? (
                                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-white" />
                                                )
                                            ) : (
                                                <Zap className={cn(
                                                    "w-5 h-5 transition-colors",
                                                    isSelected ? "text-white" : "text-muted-foreground group-hover:text-secondary"
                                                )} />
                                            )}
                                        </div>
                                        <p className="text-sm text-foreground leading-relaxed flex-1 font-medium">
                                            {action.text}
                                        </p>
                                    </div>
                                </Card>

                                {showFeedback && (
                                    <Card
                                        className={cn(
                                            "p-4 border-2 animate-in slide-in-from-top-2",
                                            action.isStrong
                                                ? "bg-gradient-to-br from-success/10 to-emerald-500/5 border-success/50"
                                                : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-500/30"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            {action.isStrong ? (
                                                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                            )}
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {action.feedback}
                                            </p>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    {!actionAttempted ? (
                        <Button
                            onClick={() => {
                                if (selectedAction) {
                                    setActionAttempted(true);
                                    if (selectedAction.isStrong) {
                                        setScore((prev) => prev + 1);
                                        triggerConfetti();
                                    }
                                }
                            }}
                            disabled={!selectedAction}
                            size="lg"
                            className="group from-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            Submit Response
                        </Button>
                    ) : selectedAction?.isStrong ? (
                        <Button
                            onClick={() => setStage("decision-space")}
                            size="lg"
                            className="group bg-gradient-to-r from-success to-emerald-600 hover:from-success/90 hover:to-emerald-600/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-success/20"
                        >
                            <TrendingUp className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                            Move to Decision Space
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setSelectedAction(null);
                                setActionAttempted(false);
                            }}
                            variant="outline"
                            size="lg"
                            className="group border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                        >
                            Try a Different Approach
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // Decision space stage
    if (stage === "decision-space") {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <PathwayProgress />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 4 of 6</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                        Select <span className="text-primary">Decision Space</span>
                    </h3>
                    <p className="text-muted-foreground">
                        Where will you push this issue for maximum impact?
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {decisionSpaceCards.map((space, index) => (
                        <Card
                            key={space.id}
                            className={cn(
                                "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 group animate-in slide-in-from-bottom-4",
                                selectedDecisionSpace?.id === space.id
                                    ? "ring-2 ring-primary bg-gradient-to-br from-primary/10 to-secondary/5 border-primary shadow-lg shadow-primary/20 scale-105"
                                    : "hover:bg-gradient-to-br hover:from-muted/50 hover:to-background border-border hover:border-primary/30 hover:scale-102"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => setSelectedDecisionSpace(space)}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "text-3xl transform transition-all duration-300",
                                        selectedDecisionSpace?.id === space.id ? "scale-110" : "group-hover:scale-110"
                                    )}>
                                        {space.icon}
                                    </div>
                                    <h4 className="font-bold text-foreground text-lg flex-1">
                                        {space.title}
                                    </h4>
                                </div>
                                <div className={cn(
                                    "h-0.5 w-12 bg-gradient-to-r from-primary to-secondary transition-all duration-300",
                                    selectedDecisionSpace?.id === space.id ? "w-full" : "group-hover:w-20"
                                )} />
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">Focus:</span> {space.focus}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => {
                            if (selectedDecisionSpace) {
                                const outcome = commitmentOutcomes[selectedDecisionSpace.outcome];
                                setCommitment({
                                    id: 1,
                                    type: outcome.type,
                                    description: outcome.description,
                                    isGood: outcome.isGood,
                                });
                                if (outcome.isGood) {
                                    setScore((prev) => prev + 1);
                                    triggerConfetti();
                                }
                                setStage("commitment");
                            }
                        }}
                        disabled={!selectedDecisionSpace}
                        size="lg"
                        className="group from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        );
    }

    // Commitment outcome stage
    if (stage === "commitment") {
        const outcome = commitmentOutcomes[selectedDecisionSpace?.outcome || "symbolic"];

        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <PathwayProgress />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Step 5 of 6</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                        Commitment <span className={commitment?.isGood ? "text-success" : "text-amber-600"}>Outcome</span>
                    </h3>
                </div>

                <Card
                    className={cn(
                        "p-8 border-2 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-6",
                        commitment?.isGood
                            ? "bg-gradient-to-br from-success/10 via-emerald-500/5 to-success/10 border-success"
                            : "bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-amber-950/20 border-amber-500/30"
                    )}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
                    <div className="relative z-10 flex items-start gap-6">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-xl",
                            commitment?.isGood
                                ? "bg-gradient-to-br from-success to-emerald-600"
                                : "bg-gradient-to-br from-amber-500 to-orange-500"
                        )}>
                            {outcome.emoji}
                        </div>
                        <div className="flex-1">
                            <h4 className={cn(
                                "font-bold text-2xl mb-3 flex items-center gap-2",
                                commitment?.isGood ? "text-success" : "text-amber-600"
                            )}>
                                {commitment?.isGood ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                Outcome: {commitment?.type}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {commitment?.description}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-lg animate-in slide-in-from-bottom-4 delay-100">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-primary mb-2">
                                Critical Reflection:
                            </p>
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                Is this enough to ensure real change? Or will momentum fade without sustained follow-up?
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => setStage("follow-up")}
                        size="lg"
                        className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        Proceed to Follow-Up
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        );
    }

    // Follow-up stage
    if (stage === "follow-up") {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <PathwayProgress />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                        <span className="text-xs font-bold text-success uppercase tracking-wider">Final Step - Step 6 of 6</span>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground">
                        Ensure <span className="text-success">Sustainability</span>
                    </h3>
                    <p className="text-muted-foreground text-lg">
                        What will you do to prevent this from disappearing?
                    </p>
                </div>

                <div className="grid gap-4">
                    {followUpCards.map((followUp, index) => (
                        <Card
                            key={followUp.id}
                            className={cn(
                                "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 group animate-in slide-in-from-bottom-4",
                                selectedFollowUp?.id === followUp.id
                                    ? "ring-2 ring-success bg-gradient-to-br from-success/10 to-emerald-500/5 border-success shadow-lg shadow-success/20 scale-102"
                                    : "hover:bg-gradient-to-br hover:from-muted/50 hover:to-background border-border hover:border-success/30 hover:scale-101"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => setSelectedFollowUp(followUp)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                                    selectedFollowUp?.id === followUp.id
                                        ? "bg-gradient-to-br from-success to-emerald-600 shadow-lg"
                                        : followUp.isSustainable
                                            ? "bg-success/20 group-hover:bg-gradient-to-br group-hover:from-success/50 group-hover:to-emerald-600/50"
                                            : "bg-destructive/20 group-hover:bg-destructive/30"
                                )}>
                                    {followUp.isSustainable ? (
                                        <Sparkles className={cn(
                                            "w-5 h-5 transition-colors",
                                            selectedFollowUp?.id === followUp.id ? "text-white" : "text-success"
                                        )} />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-destructive" />
                                    )}
                                </div>
                                <p className="text-sm text-foreground leading-relaxed flex-1 font-medium">
                                    {followUp.text}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => {
                            if (selectedFollowUp) {
                                if (selectedFollowUp.isSustainable) {
                                    setScore((prev) => prev + 1);
                                    triggerFireworks();
                                }
                                setStage("complete");
                                onComplete?.();
                            }
                        }}
                        disabled={!selectedFollowUp}
                        size="lg"
                        className="group bg-gradient-to-r from-success to-emerald-600 hover:from-success/90 hover:to-emerald-600/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-success/20"
                    >
                        <Trophy className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Complete Journey
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        );
    }

    // Complete stage
    if (stage === "complete") {
        const maxScore = 3;
        const passed = score >= 2;
        const perfect = score === maxScore;

        return (
            <div className="space-y-8 animate-in fade-in duration-700">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-success/10 to-emerald-500/10 border border-success/20 animate-in slide-in-from-top-4">
                        <Trophy className="w-5 h-5 text-success" />
                        <span className="text-sm font-semibold text-success">Journey Complete</span>
                    </div>

                    <h3 className="text-4xl font-bold text-foreground animate-in slide-in-from-bottom-4 delay-100">
                        {perfect ? "Outstanding! 🎉" : passed ? "Well Done! 👏" : "Good Effort! 💪"}
                    </h3>
                </div>

                <Card
                    className={cn(
                        "p-8 text-center border-2 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-700 delay-200",
                        passed
                            ? "bg-gradient-to-br from-success/10 via-emerald-500/5 to-success/10 border-success"
                            : "bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-amber-950/20 border-amber-500/30"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse" />
                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-2xl mb-4 animate-bounce">
                            <Trophy className="w-12 h-12 text-white" />
                        </div>
                        <div
                            className={cn(
                                "text-6xl font-bold tracking-tight",
                                passed ? "text-success" : "text-amber-600"
                            )}
                        >
                            {score} / {maxScore}
                        </div>
                        <p
                            className={cn(
                                "font-semibold text-xl max-w-md mx-auto",
                                passed ? "text-success" : "text-amber-600"
                            )}
                        >
                            {perfect
                                ? "Perfect! You created a complete pathway to sustainable change!"
                                : passed
                                    ? selectedFollowUp?.isSustainable
                                        ? "Excellent! You navigated the advocacy pathway successfully!"
                                        : "Good progress, but sustainability needs stronger follow-up."
                                    : "The evidence moved forward, but stronger strategies are needed for lasting impact."}
                        </p>
                    </div>
                </Card>

                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl animate-in slide-in-from-bottom-4 delay-300">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xl text-foreground mb-2">Key Learning</h4>
                        </div>
                    </div>
                    <div className="space-y-4 pl-4 border-l-4 border-primary/30">
                        <p className="text-muted-foreground leading-relaxed">
                            Sustainability is not achieved when evidence is heard once. It is
                            achieved when evidence is <span className="font-bold text-foreground">used repeatedly</span>, tracked over time, and
                            embedded in decisions that survive leadership changes and funding
                            cycles.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Impact depends on <span className="font-bold text-primary">persistence</span>, <span className="font-bold text-secondary">strategy</span>, and the ability to turn
                            community evidence into <span className="font-bold text-success">enforceable commitments</span>, not just
                            recognition.
                        </p>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-secondary/20 shadow-lg animate-in slide-in-from-bottom-4 delay-400">
                    <div className="flex items-start gap-3">
                        <Target className="w-6 h-6 text-secondary shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-secondary mb-2">
                                Reflection Question:
                            </p>
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                Where did <span className="font-semibold text-foreground">power, not evidence</span>, shape the outcome?
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-center gap-4 pt-4">
                    <Button
                        onClick={() => {
                            setStage("intro");
                            setSelectedEvidence(null);
                            setSelectedChallenge(null);
                            setSelectedAction(null);
                            setActionAttempted(false);
                            setSelectedDecisionSpace(null);
                            setCommitment(null);
                            setSelectedFollowUp(null);
                            setScore(0);
                        }}
                        variant="outline"
                        size="lg"
                        className="group border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    >
                        <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Play Again
                    </Button>
                </div>
            </div>
        );
    }

    return null;
};