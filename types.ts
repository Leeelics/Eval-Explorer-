
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
  MULTILINGUAL = 'Multilingual',
  LONG_CONTEXT = 'Long Context',
  MEDICAL = 'Medical'
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

export interface DatasetExample {
  id: string;
  prompt: string;
  options?: string[];
  answer: string;
  reasoning?: string;
}

export interface MetricConfig {
  name: string;
  description: string;
  formula?: string;
  range?: string;
}

// New: Expert Analysis/Insights for Datasets (The "Think Tank" factor)
export interface AnalysisInsight {
  type: 'WARNING' | 'CRITIQUE' | 'SATURATION' | 'INFO';
  title: string;
  content: string;
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
  exampleQuestions?: DatasetExample[];
  metricConfigs?: MetricConfig[];
  // New field
  analysisInsights?: AnalysisInsight[];
}

// New: Model Variants and Capabilities
export interface ModelVariant {
  name: string;
  params: string;
  contextWindow: string;
  license: string;
  recommendedUse: string; // Guidance on when to use this specific variant
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
  // New ecosystem fields
  variants?: ModelVariant[];
  strengths?: string[];
  limitations?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
