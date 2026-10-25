/** Public portfolio skill taxonomy for Ashraful Islam. */
export type SkillGroup = {
  id: string;
  short: string;
  title: string;
  subtitle: string;
  note: string;
  skills: string[];
  kind: 'cv';
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-ml',
    short: 'AI / ML',
    title: 'Machine Learning & DataOps',
    subtitle: 'From exploratory modeling to robust production pipelines.',
    note: 'Deep Learning, computer vision models, and automated DataOps workflows.',
    skills: ['PyTorch', 'Vision Transformer (ViT)', 'OpenCV', 'Scikit-Learn', 'TensorFlow', 'XGBoost', 'Optuna', 'SMOTE-Tomek', 'SHAP (Explainable AI)', 'Pandas', 'NumPy'],
    kind: 'cv'
  },
  {
    id: 'genai',
    short: 'GENAI & RAG',
    title: 'Generative AI & Agentic Systems',
    subtitle: 'Intelligent reasoning, grounded retrieval, and LLM automation.',
    note: 'Architectures for autonomous agents and retrieval-augmented generation.',
    skills: ['LangChain', 'LangGraph', 'Gemini API', 'RAG Pipelines', 'Vector Databases', 'Prompt Engineering', 'Passage Attribution', 'Multi-Agent Workflows'],
    kind: 'cv'
  },
  {
    id: 'backend',
    short: 'BACKEND & CLOUD',
    title: 'Backend Engineering & MLOps',
    subtitle: 'Low-latency APIs, distributed data, and cloud infrastructure.',
    note: 'Microservices, database concurrency, and containerized deployments.',
    skills: ['FastAPI', 'Django & DRF', 'Docker', 'PostgreSQL', 'AWS CloudFront', 'AWS S3', 'Redis', 'CI/CD Pipelines', 'REST API Design', 'JWT Security'],
    kind: 'cv'
  },
  {
    id: 'languages',
    short: 'LANGUAGES',
    title: 'Programming Languages',
    subtitle: 'Algorithmic efficiency and software design.',
    note: 'Primary languages for machine learning, systems, and full-stack builds.',
    skills: ['Python', 'C++', 'C', 'JavaScript', 'TypeScript', 'C#', 'SQL'],
    kind: 'cv'
  },
  {
    id: 'frontend',
    short: 'FRONTEND',
    title: 'Frontend Engineering',
    subtitle: 'High-performance interactive interfaces.',
    note: 'Modern component architectures and responsive client platforms.',
    skills: ['React.js', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3', 'Responsive Design'],
    kind: 'cv'
  },
  {
    id: 'tools',
    short: 'TOOLS',
    title: 'Developer Tools & Platforms',
    subtitle: 'Productivity, version control, and collaboration.',
    note: 'Essential workflow tooling supporting production software engineering.',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux / Bash', 'Jupyter', 'Render', 'Streamlit'],
    kind: 'cv'
  },
];

export const projectLevelTools = [
  'FastAPI', 'PyTorch', 'DeiT', 'LangChain', 'LangGraph',
  'Docker', 'PostgreSQL', 'AWS CloudFront', 'GSAP', 'Lenis',
  'Tailwind CSS', 'React 19', 'Django REST', 'SUMO'
] as const;
