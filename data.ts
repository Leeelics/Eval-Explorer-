
import { ResourceType, Category, ResearchItem } from './types';

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'mmlu',
    title: 'MMLU: Measuring Massive Multitask Language Understanding',
    authors: ['Dan Hendrycks', 'Collin Burns', 'Saurav Kadavath', 'et al.'],
    year: 2021,
    type: ResourceType.DATASET,
    category: Category.GENERAL,
    description: 'A benchmark designed to measure knowledge acquired during pretraining by evaluating models across 57 subjects such as STEM, the humanities, the social sciences, and more.',
    link: 'https://arxiv.org/abs/2009.03300',
    projectLink: 'https://github.com/hendrycks/test',
    tags: ['Benchmark', 'Knowledge', 'STEM'],
    itemCount: '15,908 questions',
    citationCount: 4200,
    domain: 'General Knowledge / STEM / Humanities',
    methodology: 'Multiple-choice questions across 57 subjects spanning various difficulty levels from elementary to professional.',
    relatedPapers: [
      { title: 'GPQA: A Graduate-Level Google-Proof Q&A Benchmark', link: 'https://arxiv.org/abs/2311.12022' },
      { title: 'ARC: AI2 Reasoning Challenge', link: 'https://arxiv.org/abs/1803.05457' }
    ]
  },
  {
    id: 'helm',
    title: 'Holistic Evaluation of Language Models (HELM)',
    authors: ['Percy Liang', 'Rishi Bommasani', 'Tony Lee', 'et al.'],
    year: 2022,
    type: ResourceType.PAPER,
    category: Category.GENERAL,
    description: 'A comprehensive framework to evaluate language models across a diverse set of scenarios and metrics, providing a holistic view of model performance.',
    link: 'https://arxiv.org/abs/2211.09110',
    projectLink: 'https://crfm.stanford.edu/helm/latest/',
    tags: ['Framework', 'Holistic', 'Benchmarking'],
    citationCount: 850,
    domain: 'Model Evaluation Frameworks',
    methodology: 'Establishing a top-down taxonomy of 16 scenarios and 7 metrics (accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency).',
    relatedPapers: [
      { title: 'Evaluating Large Language Models: A Comprehensive Survey', link: 'https://arxiv.org/abs/2307.03109' }
    ]
  },
  {
    id: 'gsm8k',
    title: 'GSM8K: Grade School Math 8K',
    authors: ['Karl Cobbe', 'Vineet Kosaraju', 'Mohammad Bavarian', 'et al.'],
    year: 2021,
    type: ResourceType.DATASET,
    category: Category.MATH,
    description: 'A dataset of 8.5K high quality grade school math word problems. Solving these requires multi-step reasoning.',
    link: 'https://arxiv.org/abs/2110.14168',
    projectLink: 'https://github.com/openai/grade-school-math',
    tags: ['Math', 'Reasoning', 'Chain-of-Thought'],
    itemCount: '8,500 problems',
    citationCount: 1200,
    domain: 'Mathematical Reasoning',
    methodology: 'Crowdsourced grade school math problems that require multi-step reasoning to solve, specifically designed to test Chain-of-Thought capabilities.',
    relatedPapers: [
      { title: 'Training Verifiers to Solve Math Word Problems', link: 'https://arxiv.org/abs/2110.14168' }
    ]
  },
  {
    id: 'human-eval',
    title: 'HumanEval: Evaluating Large Language Models Trained on Code',
    authors: ['Mark Chen', 'Jerry Tworek', 'Heewoo Jun', 'et al.'],
    year: 2021,
    type: ResourceType.DATASET,
    category: Category.CODING,
    description: 'A dataset released by OpenAI for evaluating code generation capabilities, specifically measuring Python code completion performance.',
    link: 'https://arxiv.org/abs/2107.03374',
    projectLink: 'https://github.com/openai/human-eval',
    tags: ['Coding', 'Python', 'Synthesis'],
    itemCount: '164 problems',
    citationCount: 3100,
    domain: 'Software Engineering / Code Generation',
    methodology: '164 handwritten Python programming problems with unit tests to measure functional correctness via pass@k metric.',
    relatedPapers: [
      { title: 'MBPP: Mostly Basic Python Problems', link: 'https://arxiv.org/abs/2108.07732' }
    ]
  },
  {
    id: 'truthfulqa',
    title: 'TruthfulQA: Measuring How Models Mimic Human Falsehoods',
    authors: ['Stephanie Lin', 'Jacob Hilton', 'Owain Evans'],
    year: 2022,
    type: ResourceType.DATASET,
    category: Category.SAFETY,
    description: 'A benchmark to measure whether a language model is truthful in generating answers to questions, specifically targeting common human misconceptions.',
    link: 'https://arxiv.org/abs/2109.07958',
    projectLink: 'https://github.com/sylinrl/TruthfulQA',
    tags: ['Safety', 'Hallucination', 'Truthfulness'],
    itemCount: '817 questions',
    citationCount: 950,
    domain: 'AI Safety / Fact-checking',
    methodology: 'Adversarially constructed questions spanning 38 categories that test for false beliefs and common misconceptions.',
    relatedPapers: [
      { title: 'HaluEval: A Large-Scale Hallucination Evaluation Benchmark', link: 'https://arxiv.org/abs/2305.11747' }
    ]
  }
];
