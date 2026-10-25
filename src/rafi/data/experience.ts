/**
 * Experience content for Ashraful Islam.
 */
export type ExperienceOrganization = {
  id: 'datapulse' | 'boraq' | 'robotics' | 'poridhi' | 'synesis' | 'cuet';
  name: string;
  short: string;
  eyebrow: string;
  role: string;
  arrangement: string;
  dates: string;
  location: string;
  introduction: string;
  background: string;
  accent: string;
  projects: { name: string; note: string; label?: string }[];
  progression?: { position: string; period: string }[];
};

export const experienceOrganizations: ExperienceOrganization[] = [
  {
    id: 'datapulse',
    name: 'Poridhi.io',
    short: 'PORIDHI.IO',
    eyebrow: '01 / INDUSTRY EXPERIENCE',
    role: 'Machine Learning & DataOps Intern',
    arrangement: 'HYBRID / ONSITE',
    dates: 'AUG 2026 — PRESENT',
    location: 'DHAKA, BANGLADESH',
    introduction: 'Engineering scalable DataOps pipelines for automated data ingestion, quality validation, and feature preprocessing while architecting containerized FastAPI inference microservices and Agentic AI workflows.',
    background: '/assets/experience/poridhi.webp',
    accent: '#42DED1',
    projects: [
      { name: 'Automated ML Ingestion Pipelines', note: 'Data validation, preprocessing and feature engineering' },
      { name: 'Containerized AI Microservices', note: 'FastAPI + Docker inference endpoints with CI/CD', label: 'PRODUCTION' },
      { name: 'Agentic LLM Workflows', note: 'Dynamic tool execution and LangChain / LangGraph pipelines' },
      { name: 'MLOps Experiment Tracking', note: 'Reproducible Docker runtime environments & automation' },
    ],
    progression: [
      { position: 'MLOps & Pipeline Research', period: 'AUG 2026' },
      { position: 'Containerized AI Endpoints', period: 'SEP 2026' },
      { position: 'Agentic AI & Production Pipelines', period: 'OCT 2026 — PRESENT' },
    ],
  },
  {
    id: 'boraq',
    name: 'Synesis IT PLC',
    short: 'SYNESIS IT',
    eyebrow: '02 / INDUSTRIAL ATTACHMENT',
    role: 'AI & Software Engineering Trainee',
    arrangement: 'ON-SITE',
    dates: 'SEP 2026',
    location: 'DHAKA, BANGLADESH',
    introduction: 'Completed intensive industrial training researching and developing NoteCheck — an AI-powered counterfeit Bangladeshi banknote authentication system using fine-tuned Vision Transformers and real-time computer vision.',
    background: '/assets/experience/synesis.webp',
    accent: '#F36A35',
    projects: [
      { name: 'NoteCheck ViT Engine', note: 'DeiT-Tiny Vision Transformer achieving ~97.88% accuracy', label: 'FLAGSHIP' },
      { name: 'OpenCV Perspective Rectification', note: 'Canny edges, Otsu gradients & 4-point homography warping' },
      { name: 'CLAHE Lighting Normalization', note: 'LAB color space shadow equalization for harsh ambient light' },
      { name: 'Asynchronous FastAPI Microservice', note: 'High-throughput REST backend with interactive React dashboard' },
    ],
  },
  {
    id: 'robotics',
    name: 'CUET Research & Engineering',
    short: 'CUET LABS',
    eyebrow: '03 / ACADEMIC & RESEARCH',
    role: 'AI Researcher & Full-Stack Lead',
    arrangement: 'UNIVERSITY',
    dates: 'JAN 2023 — PRESENT',
    location: 'CUET · CHATTOGRAM, BANGLADESH',
    introduction: 'Leading research initiatives across Computer Vision, RAG architectures, and cybersecurity, authoring 7 research papers for IEEE & international conferences while maintaining competitive programming excellence.',
    background: '/assets/experience/cuet.webp',
    accent: '#69E49C',
    projects: [
      { name: '7 Research Publications', note: 'Accepted at IEEE SPICSCON, OMLET, ICCPCT, QPAIN, etc.', label: '7 PAPERS' },
      { name: 'CliniSync Healthcare Platform', note: 'AWS CloudFront, PostgreSQL GiST exclusion & FastAPI', label: 'AWS' },
      { name: 'Codeforces Specialist', note: 'Active competitive programmer with rating 1450+', label: '1450+' },
      { name: 'Flembe Essence Client Store', note: 'Live production client e-commerce platform with DRF', label: 'CLIENT LIVE' },
    ],
    progression: [
      { position: 'B.Sc. CSE Undergraduate', period: 'JAN 2023' },
      { position: 'Competitive Programmer (Specialist)', period: '2024 — 2025' },
      { position: 'Lead AI Researcher & Intern', period: '2025 — PRESENT' },
    ],
  },
];
