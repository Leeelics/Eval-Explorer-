
export enum ResourceType {
  PAPER = 'PAPER',
  DATASET = 'DATASET'
}

export enum Category {
  GENERAL = 'General',
  REASONING = 'Reasoning',
  CODING = 'Coding',
  MATH = 'Math',
  SAFETY = 'Safety',
  MULTILINGUAL = 'Multilingual'
}

export interface RelatedPaper {
  title: string;
  link: string;
}

export interface CitationData {
  year: number;
  count: number;
}

export interface LeaderboardEntry {
  modelName: string;
  score: string;
  metric: string;
  date: string;
}

// New Interface for Dataset Samples
export interface DatasetExample {
  id: string;
  prompt: string;
  options?: string[]; // For multiple choice
  answer: string;
  reasoning?: string; // For Chain-of-Thought explanation
}

// New Interface for Metric Details
export interface MetricConfig {
  name: string;
  description: string;
  formula?: string; // Pseudo-code or short explanation
  range?: string; // e.g., "0-100%"
}

export interface ResearchItem {
  id: string;
  title: string;
  authors: string[];
  year: number;
  type: ResourceType;
  category: Category;
  description: string;
  link: string;
  projectLink?: string;
  tags: string[];
  itemCount?: string;
  methodology?: string;
  domain?: string;
  citationCount?: number;
  relatedPapers?: RelatedPaper[];
  citationHistory?: CitationData[];
  metrics?: string[];
  involvedModels?: string[];
  leaderboard?: LeaderboardEntry[];
  // New Fields
  exampleQuestions?: DatasetExample[];
  metricConfigs?: MetricConfig[];
}

export interface ModelItem {
  id: string;
  name: string;
  organization: string;
  releaseDate: string;
  description: string;
  tasks: string[];
  evalData: {
    datasetId: string;
    datasetName: string;
    score: string;
    metric: string;
  }[];
  predecessorId?: string;
  predecessorName?: string;
  successorId?: string;
  successorName?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
