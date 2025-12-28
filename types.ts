
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

// Added ChatMessage interface to fix 'Module has no exported member' error
export interface ChatMessage {
  role: 'user' | 'assistant';
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
  link: string; // Paper link
  projectLink?: string; // GitHub/Website link
  tags: string[];
  // New detail fields
  itemCount?: string; // For datasets
  methodology?: string; // For papers
  domain?: string; // For papers
  citationCount?: number;
  relatedPapers?: RelatedPaper[];
}