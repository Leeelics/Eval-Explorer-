
import { ResourceType, Category, ResearchItem, ModelItem } from './types';

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'mmlu',
    title: 'MMLU: Measuring Massive Multitask Language Understanding',
    authors: ['Dan Hendrycks', 'Collin Burns', 'Saurav Kadavath', 'et al.'],
    year: 2021,
    type: ResourceType.DATASET,
    category: Category.GENERAL,
    description: 'A benchmark designed to measure knowledge acquired during pretraining by evaluating models across 57 subjects.',
    link: 'https://arxiv.org/abs/2009.03300',
    projectLink: 'https://github.com/hendrycks/test',
    tags: ['Benchmark', 'Knowledge', 'STEM'],
    itemCount: '15,908 questions',
    citationCount: 4200,
    domain: 'General Knowledge / STEM / Humanities',
    methodology: 'Multiple-choice questions across 57 subjects spanning various difficulty levels.',
    citationHistory: [
      { year: 2021, count: 120 },
      { year: 2022, count: 850 },
      { year: 2023, count: 1800 },
      { year: 2024, count: 1430 }
    ],
    metrics: ['Accuracy'],
    metricConfigs: [
      {
        name: 'Accuracy (Zero-shot / 5-shot)',
        description: 'The proportion of questions where the model selects the correct option (A, B, C, or D).',
        formula: 'Correct Predictions / Total Questions',
        range: '0 - 100%'
      },
      {
        name: 'Weighted Accuracy',
        description: 'Averages the accuracy across 57 subjects, treating each subject equally rather than each question equally.',
        formula: 'Sum(Subject Accuracies) / 57',
        range: '0 - 100%'
      }
    ],
    exampleQuestions: [
      {
        id: 'mmlu-1',
        prompt: 'Subject: High School Physics\n\nA ball is thrown vertically upward. At the very top of its trajectory, which of the following is true?',
        options: [
          'A) Its velocity is zero and its acceleration is zero.',
          'B) Its velocity is zero and its acceleration is 9.8 m/s^2 downwards.',
          'C) Its velocity is 9.8 m/s^2 and its acceleration is zero.',
          'D) Its velocity is 9.8 m/s^2 and its acceleration is 9.8 m/s^2.'
        ],
        answer: 'B',
        reasoning: 'At the peak of the trajectory, the object momentarily stops (velocity = 0), but gravity is still acting on it (acceleration = g).'
      }
    ],
    involvedModels: ['GPT-4', 'Claude 3.5', 'Llama 3', 'Qwen 2'],
    leaderboard: [
      { modelName: 'GPT-4o', score: '88.7%', metric: 'Accuracy', date: '2024-05' },
      { modelName: 'Claude 3.5 Sonnet', score: '88.1%', metric: 'Accuracy', date: '2024-06' },
      { modelName: 'Gemini 1.5 Pro', score: '85.9%', metric: 'Accuracy', date: '2024-04' },
      { modelName: 'Llama 3 70B', score: '82.0%', metric: 'Accuracy', date: '2024-04' }
    ],
    relatedPapers: [
      { title: 'GPQA: A Graduate-Level Google-Proof Q&A Benchmark', link: '#' }
    ]
  },
  {
    id: 'gsm8k',
    title: 'GSM8K: Grade School Math 8K',
    authors: ['Karl Cobbe', 'et al.'],
    year: 2021,
    type: ResourceType.DATASET,
    category: Category.MATH,
    description: 'A dataset of 8.5K high quality grade school math word problems.',
    link: 'https://arxiv.org/abs/2110.14168',
    projectLink: 'https://github.com/openai/grade-school-math',
    tags: ['Math', 'Reasoning'],
    itemCount: '8,500 problems',
    citationCount: 1200,
    citationHistory: [
      { year: 2021, count: 45 },
      { year: 2022, count: 310 },
      { year: 2023, count: 580 },
      { year: 2024, count: 265 }
    ],
    metrics: ['Exact Match (EM)'],
    metricConfigs: [
      {
        name: 'Exact Match (EM)',
        description: 'The model must generate the final numerical answer correctly. Typically extracted after "####" in the solution.',
        formula: 'if extracted_answer == golden_answer: 1 else 0',
        range: '0 - 100%'
      }
    ],
    exampleQuestions: [
      {
        id: 'gsm8k-1',
        prompt: 'Janet has 5 apples. She buys 3 more at the store, then eats 2 on the way home. How many apples does she have left?',
        answer: '6',
        reasoning: 'Janet starts with 5 apples. \nShe buys 3 more: 5 + 3 = 8. \nShe eats 2: 8 - 2 = 6. \n\nAnswer: 6'
      }
    ],
    leaderboard: [
      { modelName: 'o1-preview', score: '94.8%', metric: 'EM', date: '2024-09' },
      { modelName: 'GPT-4o', score: '92.0%', metric: 'EM', date: '2024-05' },
      { modelName: 'Claude 3.5 Sonnet', score: '91.5%', metric: 'EM', date: '2024-06' }
    ]
  }
];

export const MODEL_ITEMS: ModelItem[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    organization: 'OpenAI',
    releaseDate: '2024-05-13',
    description: 'A multimodal model that reasons across audio, vision, and text in real time.',
    tasks: ['Multimodal reasoning', 'Coding', 'Creative writing'],
    evalData: [
      { datasetId: 'mmlu', datasetName: 'MMLU', score: '88.7%', metric: 'Accuracy' },
      { datasetId: 'gsm8k', datasetName: 'GSM8K', score: '92.0%', metric: 'EM' }
    ],
    predecessorId: 'gpt-4-turbo',
    predecessorName: 'GPT-4 Turbo',
    successorId: 'o1',
    successorName: 'o1-series'
  },
  {
    id: 'qwen-2',
    name: 'Qwen-2',
    organization: 'Alibaba Cloud',
    releaseDate: '2024-06-07',
    description: 'The next generation of Qwen series, featuring significantly improved performance in coding, mathematics, and reasoning.',
    tasks: ['General purpose', 'Coding', 'Math'],
    evalData: [
      { datasetId: 'mmlu', datasetName: 'MMLU', score: '84.2%', metric: 'Accuracy' },
      { datasetId: 'gsm8k', datasetName: 'GSM8K', score: '91.1%', metric: 'EM' }
    ],
    predecessorId: 'qwen-1.5',
    predecessorName: 'Qwen-1.5',
    successorId: 'qwen-2.5',
    successorName: 'Qwen-2.5'
  }
];
