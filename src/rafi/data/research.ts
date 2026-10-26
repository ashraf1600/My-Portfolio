/**
 * Research papers authored and co-authored by Ashraful Islam.
 */
export type ResearchLink = { label: string; url: string; note: string };
export type ResearchRecord = {
  id: string;
  title: string;
  shortTitle: string;
  domain: string;
  venue: string;
  year: string;
  status: string;
  statusKind: 'accepted' | 'submitted' | 'proposal' | 'ongoing';
  statusDetail: string;
  abstract: string;
  authors?: string;
  tags: string[];
  cover: string;
  accent: string;
  index: string;
  links: ResearchLink[];
};

export const researchRecords: ResearchRecord[] = [
  {
    id: 'iot-cyber-attack',
    index: '01',
    title: 'An Explainable Machine Learning and Ensemble Voting Classifier for Cyber Attack Detection in Highly Imbalanced IoT Networks',
    shortTitle: 'IOT CYBER ATTACK DETECTION',
    domain: 'IOT SECURITY & XAI',
    venue: 'IEEE 2026 3rd International Conference on Data Science and Business Systems (ICDSBS 2026)',
    year: '2026',
    status: 'ACCEPTED FOR PUBLICATION',
    statusKind: 'accepted',
    statusDetail: 'Accepted for presentation and IEEE Xplore proceedings publication at ICDSBS 2026.',
    abstract: 'Proposes an explainable ensemble voting classifier for detecting sophisticated cyber attacks in highly imbalanced IoT network environments. Combines diverse base learners with dynamic class-balancing and utilizes SHAP (SHapley Additive exPlanations) to interpret model decisions on critical minority attack vectors.',
    authors: 'Ashraful Islam · Towhidul Islam · Dr. Mahfuzulhoq Chowdhury',
    tags: ['IoT Security', 'Explainable AI (XAI)', 'Ensemble Classifier', 'SHAP', 'Cybersecurity'],
    cover: '/assets/research/iot-cyber-attack.webp',
    accent: '#dfaa8d',
    links: [],
  },
  {
    id: 'ccmk-rag',
    index: '02',
    title: 'CCMK-RAG: Content-Conditioned Multi-Key Watermarking for Passage-Level Attribution in Retrieval-Augmented Generation',
    shortTitle: 'CCMK-RAG WATERMARKING',
    domain: 'GENAI & LLMOPS',
    venue: 'IEEE OMLET 2026',
    year: '2026',
    status: 'ACCEPTED · IEEE OMLET 2026',
    statusKind: 'accepted',
    statusDetail: 'Accepted at IEEE OMLET 2026. Introduces novel cryptographic and semantic watermarking for provenance tracing in LLMs.',
    abstract: 'Introduces a content-conditioned multi-key watermarking framework specifically formulated for granular passage-level attribution in Retrieval-Augmented Generation. Enables high-precision recovery of source provenance in LLM outputs while preserving semantic fidelity and language naturalness.',
    authors: 'Towhidul Islam · Ashraful Islam · Dr. Mahfuzul Hoq Chowdhury',
    tags: ['RAG', 'Watermarking', 'Passage Attribution', 'LLMOps', 'Information Retrieval'],
    cover: '/assets/research/ccmk-rag.webp',
    accent: '#edbb92',
    links: [],
  },
  {
    id: 'banknote-vit',
    index: '03',
    title: 'Vision Transformer-Based Detection of Counterfeit Bangladeshi Banknotes Using the DeiT-Tiny Architecture',
    shortTitle: 'DEIT BANKNOTE AUTHENTICATION',
    domain: 'COMPUTER VISION & VIT',
    venue: 'International Conference on Circuit Power & Computing Technologies (ICCPCT-2026)',
    year: '2026',
    status: 'ACCEPTED FOR PUBLICATION',
    statusKind: 'accepted',
    statusDetail: 'Accepted for presentation and proceedings publication at ICCPCT 2026. Powers the NoteCheck industry system.',
    abstract: 'Fine-tunes a Data-efficient Image Transformer (DeiT-Tiny) architecture coupled with bilateral edge extraction and homography rectification to discriminate micro-print, watermark fidelity, and intaglio ink patterns on Bangladeshi banknotes with ~97.88% accuracy.',
    authors: 'Ashraful Islam · Dr. Mahfuzulhoq Chowdhury · Towhidul Islam',
    tags: ['Vision Transformer', 'DeiT', 'Counterfeit Detection', 'PyTorch', 'OpenCV'],
    cover: '/assets/research/banknote-vit.webp',
    accent: '#c99195',
    links: [
      { label: 'VIEW LIVE SYSTEM (NOTECHECK)', url: 'https://notecheck-frontend.onrender.com/', note: 'Production web application' }
    ],
  },
  {
    id: 'labour-law-rag',
    index: '04',
    title: 'Section-Aware Retrieval-Augmented Generation for Bangladesh Labour Law Question Answering: A Comparative Study',
    shortTitle: 'SECTION-AWARE LEGAL RAG',
    domain: 'DOMAIN-SPECIFIC RAG',
    venue: 'IEEE OMLET 2026',
    year: '2026',
    status: 'ACCEPTED · IEEE OMLET 2026',
    statusKind: 'accepted',
    statusDetail: 'Accepted at IEEE OMLET 2026. Comprehensive comparative evaluation on Bangladesh Labour Law retrieval benchmarks.',
    abstract: 'Examines hierarchical and section-aware retrieval strategies for domain-specific statutory legal QA. Demonstrates that preserving structural section context within vector indices significantly minimizes statutory hallucination compared to naive dense embedding baselines.',
    authors: 'Towhidul Islam · Ashraf-Ul-Islam · Dr. Mahfuzulhoq Chowdhury',
    tags: ['Legal NLP', 'Section-Aware RAG', 'LangChain', 'Dense Retrieval', 'Evaluation'],
    cover: '/assets/research/labour-law-rag.webp',
    accent: '#c8a5a9',
    links: [],
  },
  {
    id: 'traffic-violation-shap',
    index: '05',
    title: 'A Traffic Rules Violation Prediction Scheme Based on Hybrid Stacking Ensemble Classifier and SHAP Analysis',
    shortTitle: 'TRAFFIC VIOLATION & SHAP',
    domain: 'INTELLIGENT MOBILITY & XAI',
    venue: '2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)',
    year: '2026',
    status: 'COPYRIGHT CONFIRMED · IEEE',
    statusKind: 'accepted',
    statusDetail: 'IEEE Copyright completed and confirmed for publication in QPAIN 2026 proceedings.',
    abstract: 'Formulates a multi-tiered stacking ensemble incorporating gradient boosted decision trees and deep tabular models to forecast traffic infractions. Couples granular SHAP feature attribution to surface temporal, geospatial, and demographic risk drivers for urban traffic management.',
    authors: 'Dr. Mahfuzul Hoq Chowdhury · Oarisa Rebayet · Ifath Jeba Chowdhury · Ashraf-ul-Islam · Isnat Mehrin Sami · Snaholata Mondal',
    tags: ['Traffic Analytics', 'Stacking Ensemble', 'SHAP Analysis', 'Explainable AI'],
    cover: '/assets/research/traffic-violation-shap.webp',
    accent: '#d29d67',
    links: [],
  },
  {
    id: 'tax-fraud-optuna',
    index: '06',
    title: 'A Double Layer Stacking Classifier Based Explainable Tax Evasion Fraud Prediction with Optuna and SMOTE-Tomek',
    shortTitle: 'EXPLAINABLE TAX FRAUD',
    domain: 'FINANCIAL AI & FRAUD DETECTION',
    venue: '1st International Conference on Next-Generation Electrical & Electronics, Computer Systems, and Technologies (iCONEECT 2026)',
    year: '2026',
    status: 'UNDER PEER REVIEW',
    statusKind: 'submitted',
    statusDetail: 'Submitted to iCONEECT 2026. Features automated Bayesian optimization with Optuna and SMOTE-Tomek resampling.',
    abstract: 'Addresses severe imbalance in enterprise tax filing data using a synchronized SMOTE-Tomek resampling technique and Optuna hyperparameter exploration. Deploys a two-layer stacking architecture with SHAP force plots to facilitate transparent financial fraud auditing.',
    authors: 'Dr. Mahfuzulhoq Chowdhury · Saklain Ahmed · Ashraful Islam',
    tags: ['Fraud Detection', 'Stacking Classifier', 'SMOTE-Tomek', 'Optuna', 'SHAP'],
    cover: '/assets/research/tax-fraud-optuna.webp',
    accent: '#b6a8c6',
    links: [],
  },
  {
    id: 'face-morphing-vit',
    index: '07',
    title: 'Unveiling Facial Forensic Traces: A Hybrid Xception-Vision Transformer Framework for Robust Morphing Attack Detection with 10-Channel Feature Fusion',
    shortTitle: 'FACIAL FORENSICS & MORPHING',
    domain: 'BIOMETRIC SECURITY & DL',
    venue: 'Working Manuscript / Target Journal (2026)',
    year: '2026',
    status: 'ACTIVE INVESTIGATION',
    statusKind: 'ongoing',
    statusDetail: 'Working manuscript in final preparation with Dr. Mahfuzulhoq Chowdhury and collaborators.',
    abstract: 'Investigates biometric face morphing vulnerability in automated border control systems. Synthesizes high-frequency texture anomalies extracted via Xception with long-range contextual attention vectors from a Vision Transformer across a novel 10-channel forensic representation.',
    authors: 'Ashraful Islam · Towhidul Islam · Dr. Mahfuzulhoq Chowdhury',
    tags: ['Face Morphing', 'Vision Transformer', 'Xception', 'Forensics', 'Deep Learning'],
    cover: '/assets/research/face-morphing-vit.webp',
    accent: '#e28d84',
    links: [],
  },
];

export const unmatchedManuscripts = [];
