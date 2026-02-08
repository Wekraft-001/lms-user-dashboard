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
  gameType?: "evidence-chain" | "voices-first" | "equity-builder" | "close-the-loop" | "evidence-to-action" | "risks-or-rights" | "find-the-entry-point";
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
  learningObjectives: string[];
  segments: ModuleSegment[];
}
