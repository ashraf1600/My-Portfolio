/** Verified public repository metadata for Ashraful Islam. */
export type ProjectGroup = 'ai' | 'web' | 'systems' | 'client' | 'experimental';
export type ProjectArt = 'structure' | 'route' | 'signal' | 'device' | 'type' | 'lens';
export type ProjectRecord = {
  slug: string;
  title: string;
  group: ProjectGroup;
  kicker: string;
  summary: string;
  stack: string[];
  repo: string;
  art: ProjectArt;
  tone: 'wine' | 'paper' | 'ink' | 'ember';
  note?: string;
  highlights?: string[];
  liveUrl?: string;
};

const gh = 'https://github.com/ashraf1600/';

export const projectGroups: {key: ProjectGroup | 'all'; name: string; count: number}[] = [
  {key:'all',name:'All projects',count:12},
  {key:'ai',name:'AI / Deep Learning',count:4},
  {key:'web',name:'Web Platforms',count:4},
  {key:'systems',name:'Distributed / Systems',count:2},
  {key:'client',name:'Production Client',count:2},
];

export const selectedProjects: ProjectRecord[] = [
  {
    slug: 'notecheck',
    title: 'NOTECHECK AI',
    group: 'ai',
    kicker: 'Vision Transformer / Currency Authentication',
    summary: 'An end-to-end computer vision and ViT platform developed during industrial attachment at Synesis IT PLC to verify Bangladeshi banknote authenticity in real-time with ~97.88% accuracy.',
    stack: ['Vision Transformer (DeiT)', 'PyTorch', 'OpenCV', 'FastAPI', 'React 18', 'Docker'],
    highlights: [
      'DeiT-Tiny Vision Transformer backbone fine-tuned for micro-print & watermark discrimination (~97.88% accuracy)',
      'Automated OpenCV pipeline: bilateral filtering, Canny edges, Otsu gradients & 4-point homography perspective rectification',
      'CLAHE lighting normalization in LAB color space to equalize harsh ambient shadows and reflections',
      'High-throughput asynchronous FastAPI REST backend with live cloud deployment on Render'
    ],
    repo: 'https://github.com/CUET-Synesis-IT/NoteCheck',
    liveUrl: 'https://notecheck-frontend.onrender.com/',
    art: 'lens',
    tone: 'wine'
  },
  {
    slug: 'flembe-essence',
    title: 'FLEMBE ESSENCE',
    group: 'client',
    kicker: 'Production Client E-Commerce',
    summary: 'An elegant, production client e-commerce platform built for a fashion and jewellery brand. Features dynamic catalog browsing, mobile-first storefront, instant Cash on Delivery (COD), and campus delivery.',
    stack: ['React 19', 'Django REST Framework', 'PostgreSQL', 'Tailwind CSS', 'Cloudinary'],
    highlights: [
      'Production client e-commerce platform with elegant mobile-first shopping experience',
      'Django REST Framework backend with JWT security & Cloudinary asset pipeline',
      'Seamless checkout supporting Cash on Delivery (COD) and campus-specific delivery',
      'Integrated product categories, shopping cart, and WhatsApp direct client support'
    ],
    repo: gh + 'FLEMBE-ESSENCE',
    liveUrl: 'https://flembe-essence-frontend.onrender.com/',
    art: 'type',
    tone: 'ember'
  },
  {
    slug: 'clinisync',
    title: 'CLINISYNC CLINIC',
    group: 'web',
    kicker: 'Smart Healthcare & Real-Time Queue',
    summary: 'An enterprise-grade, bilingual hospital and doctor chamber appointment platform. Features live queue tracking with estimated wait times and PostgreSQL GiST exclusion concurrency protection.',
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'AWS CloudFront', 'Docker'],
    highlights: [
      'Real-time live queue tracker with dynamic token updates & estimated wait time',
      'PostgreSQL GiST exclusion constraint preventing double-booking race conditions',
      'Multi-chamber doctor scheduling with digital chamber passes & printable receipts',
      'Production AWS deployment with CloudFront CDN caching, S3, Docker, and CI/CD'
    ],
    repo: gh + 'Clinisync',
    liveUrl: 'https://d15yucoed6jmf7.cloudfront.net/#home',
    art: 'route',
    tone: 'paper'
  },
  {
    slug: 'personal-ai-agent',
    title: 'PERSONAL AI AGENT',
    group: 'ai',
    kicker: 'Agentic AI / Gemini & LangChain',
    summary: 'An intelligent personal AI assistant and agentic workflow engine built with Gemini API, LangChain, Streamlit, and OOP principles. Features multi-turn conversational memory and dynamic tool execution.',
    stack: ['Gemini API', 'LangChain', 'Agentic AI', 'Streamlit', 'Python', 'OOP'],
    highlights: [
      'Conversational Agentic AI powered by Gemini API & LangChain',
      'Object-oriented modular architecture for dynamic tool calling & reasoning',
      'Context-aware document retrieval and streaming inference'
    ],
    repo: gh + 'Personal-AI-Assistant-Gemini-API-OOP-Streamlit-/tree/main',
    art: 'signal',
    tone: 'ink'
  },
  {
    slug: 'traffic-light-rl',
    title: 'TRAFFIC LIGHT RL',
    group: 'ai',
    kicker: 'Deep Reinforcement Learning / Mobility',
    summary: 'An intelligent urban traffic light control system using Deep Q-Networks (DQN) integrated with the SUMO traffic simulator, dynamically adjusting signal phases to minimize vehicular wait times.',
    stack: ['Deep Q-Learning (DQN)', 'SUMO Simulator', 'PyTorch', 'Python', 'Reinforcement Learning'],
    highlights: [
      'Deep Q-Learning (DQN) agent for real-time signal timing control',
      'Adaptive timing reducing vehicular intersection wait times by >25%',
      'Integrated with SUMO micro-traffic simulator for urban mobility benchmarks'
    ],
    repo: gh + 'Traffic_Light_Control_using_Reinforcement_Learning',
    art: 'structure',
    tone: 'ember'
  },
  {
    slug: 'fraud-detection',
    title: 'FRAUD DETECTION ML',
    group: 'ai',
    kicker: 'Imbalanced Machine Learning & XAI',
    summary: 'An end-to-end machine learning system for real-time e-commerce transaction fraud detection. Handles extreme class imbalance using SMOTE-Tomek, tunes hyperparameters with Optuna, and serves sub-100ms predictions.',
    stack: ['XGBoost', 'SMOTE-Tomek', 'Optuna', 'Flask', 'Docker', 'Python'],
    highlights: [
      'Extreme class imbalance handled with SMOTE-Tomek resampling & Optuna Bayesian tuning',
      'Containerized Flask REST API delivering real-time scoring in sub-100ms',
      'Robust evaluation with ROC-AUC and Precision-Recall metrics'
    ],
    repo: gh + 'Fraud-Detection-ML',
    art: 'lens',
    tone: 'wine'
  },
  {
    slug: 'resqnet',
    title: 'RESQNET DISASTER',
    group: 'systems',
    kicker: 'Distributed Disaster Coordination',
    summary: 'A real-time disaster and emergency resource coordination platform connecting Requesters, Responders, and Coordinators with auditable need-lifecycles and atomic conditional updates.',
    stack: ['Django REST Framework', 'React', 'PostgreSQL', 'Docker'],
    highlights: [
      'Auditable need-lifecycle with atomic conditional updates to prevent duplicate commitments',
      'Strict role-based access control (RBAC) enforced server-side',
      'Locked API contract for parallel frontend and backend engineering'
    ],
    repo: 'https://github.com/Towhid454/Resqnet/tree/backend',
    art: 'structure',
    tone: 'paper'
  },
  {
    slug: 'stacks',
    title: 'STACKS CONCURRENCY',
    group: 'systems',
    kicker: 'Row-Level Locking / Django DRF',
    summary: 'A modular-monolith library management system implementing concurrency-safe borrow/return via row-level locking (select_for_update), role-based access control, and book reservations with waitlisting.',
    stack: ['Django REST Framework', 'PostgreSQL', 'Docker', 'Row-Level Locking'],
    highlights: [
      'Concurrency-safe transactions via row-level locking (select_for_update)',
      '35/35 tests passing against live PostgreSQL database',
      'Book reservations with waitlisting and in-app notification events'
    ],
    repo: gh + 'Stacks----A-Library-System',
    art: 'type',
    tone: 'ink'
  },
  {
    slug: 'exportmart',
    title: 'EXPORTMART PLATFORM',
    group: 'web',
    kicker: 'E-Commerce API & Storefront',
    summary: 'A full-stack e-commerce platform with a Django REST Framework API and React + Vite storefront. Features JWT authentication via Djoser, cart and wishlist workflows, and Swagger documentation.',
    stack: ['Django REST Framework', 'React', 'Vite', 'Tailwind CSS', 'Docker'],
    highlights: [
      'JWT authentication with Djoser for secure session management',
      'Cart, wishlist, checkout, and order lifecycle management',
      'Auto-generated Swagger / Redoc interactive API documentation'
    ],
    repo: gh + 'ExportMart-Full',
    art: 'route',
    tone: 'ember'
  },
  {
    slug: 'coxs-bazar-forum',
    title: 'COX’S BAZAR FORUM',
    group: 'client',
    kicker: 'Community Platform / Production Live',
    summary: 'A community platform for Cox’s Bazar district students and alumni at CUET. Features admin-approved registration, public feed with interactions, event management, and moderation panel. Live on Render.',
    stack: ['Django', 'Bootstrap', 'SQLite', 'Render Live'],
    highlights: [
      'Admin-approved registration and moderation pipeline',
      'Public community feed with posts, likes, and comments',
      'Event and announcement coordination for district alumni'
    ],
    repo: gh + 'Cox-s-Bazar-Student-Forum-CUET',
    liveUrl: 'https://cox-s-bazar-student-forum-cuet.onrender.com',
    art: 'signal',
    tone: 'paper'
  },
  {
    slug: 'cuet-hospital',
    title: 'CUET HOSPITAL SYSTEM',
    group: 'web',
    kicker: 'Campus Healthcare Management',
    summary: 'A comprehensive medical facility operations system built for CUET. Features patient registration, appointment scheduling, doctor management, and medical records tracking.',
    stack: ['Django', 'Bootstrap', 'Python', 'Relational DB'],
    highlights: [
      'Patient registration with appointment scheduling workflows',
      'Doctor management and medical records tracking',
      'Administrative controls for medical center staff'
    ],
    repo: gh + 'CUET-Hospital-Management-System',
    art: 'lens',
    tone: 'wine'
  },
  {
    slug: 'cuet-peer-delivery',
    title: 'CUET PEER DELIVERY',
    group: 'web',
    kicker: 'Campus Logistics / MERN Stack',
    summary: 'A peer-to-peer delivery platform designed specifically for the CUET campus community. Built with MongoDB, Express, React, and Node.js for safe, student-driven campus exchanges.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express', 'MERN'],
    highlights: [
      'Campus-only peer-to-peer parcel and item delivery exchange',
      'Full MERN stack architecture with token authentication',
      'Safe and verified student exchange workflows'
    ],
    repo: gh + 'CUET_Peer_Delivery',
    art: 'device',
    tone: 'ink'
  },
];
