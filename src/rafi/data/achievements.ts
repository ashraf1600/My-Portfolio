/**
 * Recognitions and milestones for Ashraful Islam.
 */
export type Achievement = {
  id: string;
  number: string;
  level: string;
  award: string;
  displayLines: [string, string];
  subtitle: string;
  issuer: string;
  date: string;
  spotlight: string;
  detail: string;
  context: string;
  photo: string;
  proof: string;
  photoAlt: string;
  photoWidth: number;
  photoHeight: number;
  externalUrl: string;
  note: string;
};

export const achievements: Achievement[] = [
  {
    id: 'ieee-research',
    number: '01',
    level: 'SCHOLARLY DISTINCTION',
    award: '7 Peer-Reviewed Research Publications',
    displayLines: ['7 RESEARCH', 'PUBLICATIONS.'],
    subtitle: 'IEEE & International Conferences · 2026',
    issuer: 'IEEE SPICSCON, OMLET, ICCPCT, QPAIN, etc.',
    date: '2026',
    spotlight: '7 research papers accepted or submitted across IEEE conferences covering Vision Transformers, RAG watermarking, and IoT cyber security.',
    detail: 'Authored and co-authored multiple landmark papers including CCMK-RAG for passage-level watermarking in LLMs, DeiT Vision Transformers for currency authentication, and XAI ensembles for IoT network defense.',
    context: 'Consistent undergraduate research output at Chittagong University of Engineering & Technology (CUET).',
    photo: '/assets/achievements/research-papers.webp',
    proof: '/assets/achievements/research-papers.webp',
    photoAlt: 'Typographic card: 7 papers across ICDSBS, IEEE OMLET, ICCPCT, IEEE QPAIN and iCONEECT 2026',
    photoWidth: 1050,
    photoHeight: 778,
    externalUrl: '#research',
    note: 'Full list in the Research section',
  },
  {
    id: 'codeforces-specialist',
    number: '02',
    level: 'COMPETITIVE PROGRAMMING',
    award: 'Codeforces Specialist (Rating 1450+)',
    displayLines: ['CODEFORCES', 'SPECIALIST.'],
    subtitle: 'Global Competitive Programming · Specialist Rank',
    issuer: 'Codeforces',
    date: '2024 — 2026',
    spotlight: 'Demonstrated deep algorithmic problem solving and data structure mastery in high-stakes timed contests.',
    detail: 'Achieved the coveted Specialist title on Codeforces with a peak rating exceeding 1450, solving complex dynamic programming, graph theory, and mathematical problems.',
    context: 'Rigorous algorithmic foundation backing real-world machine learning and software engineering.',
    photo: '/assets/achievements/codeforces-specialist.webp',
    proof: '/assets/achievements/codeforces-specialist.webp',
    photoAlt: 'Typographic card: Codeforces Specialist, peak rating 1450+, handle ashraf1600',
    photoWidth: 1050,
    photoHeight: 778,
    externalUrl: 'https://codeforces.com/profile/ashraf1600',
    note: 'Official Codeforces Profile: ashraf1600',
  },
  {
    id: 'synesis-attachment',
    number: '03',
    level: 'INDUSTRY EXCELLENCE',
    award: 'Industrial Attachment — Synesis IT PLC',
    displayLines: ['INDUSTRY', 'ATTACHMENT.'],
    subtitle: 'AI & Software Engineering · NoteCheck Project',
    issuer: 'Synesis IT PLC',
    date: 'SEP 2026',
    spotlight: 'Spearheaded research and production development of an automated AI banknote authentication system.',
    detail: 'Delivered NoteCheck: a high-throughput DeiT-Tiny Vision Transformer backend coupled with OpenCV 4-point homography warping, achieving ~97.88% authentication accuracy.',
    context: 'Selected for intensive industrial training and production microservice delivery at Synesis IT PLC.',
    photo: '/assets/achievements/notecheck-synesis.webp',
    proof: '/assets/achievements/notecheck-synesis.webp',
    photoAlt: 'NoteCheck banknote authentication interface built during the Synesis IT PLC attachment',
    photoWidth: 1400,
    photoHeight: 620,
    externalUrl: 'https://notecheck-frontend.onrender.com/',
    note: 'Delivered NoteCheck production deployment and technical report',
  },
];
