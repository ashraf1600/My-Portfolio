// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';

import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';

import pythonLogo from './assets/tech_logo/python.png';

import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import csharpLogo from './assets/tech_logo/csharp.png';
import pytorch from './assets/tech_logo/pytorch.png';
import cppLogo from './assets/tech_logo/cpp.png';
import cLogo from './assets/tech_logo/c.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';

//  Machine Learning / Data Analysis
import scikitlearnLogo from './assets/tech_logo/sklearn.png';
import numpylogo from './assets/tech_logo/numpy.png';
import pandasLogo from './assets/tech_logo/pandas.png';
import matplotlibLogo from './assets/tech_logo/matplotlib.png';
import seabornLogo from './assets/tech_logo/seaborn.png';
import jupyterLogo from './assets/tech_logo/jupyter.png';

// Deep Learning & GenAI (previously missing / reusing pythonLogo as placeholder)
import tensorflowLogo from './assets/tech_logo/tensorflow.svg';
import langchainLogo from './assets/tech_logo/langchain.svg';
import langgraphLogo from './assets/tech_logo/langgraph.svg';

// Backend (previously missing / reusing pythonLogo as placeholder)
import djangoLogo from './assets/tech_logo/django.svg';
import flaskLogo from './assets/tech_logo/flask.svg';
import expressjsLogo from './assets/tech_logo/express.svg';

// Dev Tools (previously reusing pythonLogo as placeholder)
import streamlitLogo from './assets/tech_logo/streamlit.svg';

// Experience Section Logo's
// import webverseLogo from './assets/company_logo/webverse_logo.png';

// Education Section Logo's
import cuetLogo from './assets/education_logo/Cover.png';

// Project Section Logo's
import CUET_Hos from './assets/work_logo/CUET_Hos.png';
import CUET_Peer from './assets/work_logo/CUET_Peer.png';
import Multi from './assets/work_logo/Multi.png';
import Personal_AI from './assets/work_logo/Personal_AI.png';
import Traffic from './assets/work_logo/Traffic.png';
import Fraud from './assets/work_logo/Fraud.png';
import ResQNet from './assets/work_logo/ResQNet.png';
import Stacks from './assets/work_logo/Stacks.png';
import ExportMart from './assets/work_logo/ExportMart.png';
import CoxsBazar from './assets/work_logo/CoxsBazar.png';



export const SkillsInfo = [
  {
    title: 'Machine Learning & Data Analysis',
    skills: [
      { name: 'Scikit-Learn', logo: scikitlearnLogo },
      { name: 'NumPy', logo: numpylogo },
      { name: 'Pandas', logo: pandasLogo },
      { name: 'Matplotlib', logo: matplotlibLogo },
      { name: 'Seaborn', logo: seabornLogo },
      { name: 'Jupyter', logo: jupyterLogo },
    ],
  },
  {
    title: 'Deep Learning & Generative AI',
    skills: [
      { name: 'PyTorch', logo: pytorch },
      { name: 'TensorFlow', logo: tensorflowLogo },
      { name: 'LangChain', logo: langchainLogo },
      { name: 'LangGraph', logo: langgraphLogo },
    ],
  },
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', logo: pythonLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'C', logo: cLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'C#', logo: csharpLogo },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Django & DRF', logo: djangoLogo },
      { name: 'Flask', logo: flaskLogo },
      { name: 'Node.js', logo: nodejsLogo },
      { name: 'Express.js', logo: expressjsLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
      { name: 'MySQL', logo: mysqlLogo },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', logo: reactjsLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
    ],
  },
  {
    title: 'Developer Tools & Platform',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Streamlit', logo: streamlitLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'Netlify', logo: netlifyLogo },
    ],
  },
];

export const experiences = [
  // Experience data will be added as needed
];

export const education = [
  {
    id: 0,
    img: cuetLogo,
    school: "Chittagong University of Engineering & Technology (CUET)",
    date: "January 2023 - Present",
    desc: "I'm pursuing a B.Sc. in Computer Science and Engineering at CUET, Chittagong. My coursework covers Data Structures, Algorithms, Web Development, Machine Learning, and AI. I've gained practical experience through coding contests, hackathons, and collaborative projects.",
    degree: "B.Sc. in Computer Science and Engineering",
    type: "University",
  },
];

export const projects = [
  // Newest & Most Advanced Work
  {
    id: 0,
    title: "ResQNet",
    description: "A real-time disaster and emergency resource coordination platform connecting Requesters, Responders, and Coordinators. Features an auditable need-lifecycle (pending → open → committed → resolved), atomic conditional updates to prevent duplicate commitments, server-side role enforcement, and a locked API contract enabling parallel frontend/backend development.",
    image: ResQNet,
    screenshots: [ResQNet, ResQNet],
    tags: ["Django REST Framework", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Towhid454/Resqnet/tree/backend",
    webapp: "https://github.com/Towhid454/Resqnet/tree/backend",
    featured: true,
    highlights: [
      "Auditable need-lifecycle with atomic conditional updates",
      "Role-based access control enforced server-side",
      "Locked API contract for parallel team development",
      "Production-ready Docker deployment",
    ],
    category: ["Web Development", "Academic Project"],
  },
  {
    id: 1,
    title: "Stacks — A Library Management System",
    description: "A modular-monolith library management system built with Django + DRF, built as hackathon rehearsal practice. Implements concurrency-safe borrow/return via row-level locking (select_for_update), role-based access control, book reservations with waitlisting, and in-app notifications. 35/35 tests passing against live PostgreSQL, fully containerized and deployed.",
    image: Stacks,
    screenshots: [Stacks, Stacks],
    tags: ["Django", "Django REST Framework", "PostgreSQL", "Docker", "Concurrency"],
    github: "https://github.com/ashraf1600/Stacks----A-Library-System",
    webapp: "https://github.com/ashraf1600/Stacks----A-Library-System",
    featured: true,
    highlights: [
      "Concurrency-safe borrow/return via row-level locking",
      "35/35 tests passing against live PostgreSQL",
      "Book reservations with waitlisting and in-app notifications",
      "Fully containerized and deployment-ready",
    ],
    category: ["Web Development", "Academic Project"],
  },
  {
    id: 2,
    title: "ExportMart",
    description: "A full-stack e-commerce platform with a Django REST Framework API and a React + Vite storefront. Features product/category browsing, cart and wishlist workflows, JWT authentication via Djoser, checkout and order management, product reviews, and Swagger/Redoc API docs. Fully Dockerized for local dev and deployment.",
    image: ExportMart,
    screenshots: [ExportMart, ExportMart],
    tags: ["Django REST Framework", "React", "Vite", "Tailwind CSS", "Docker", "E-commerce"],
    github: "https://github.com/ashraf1600/ExportMart-Full",
    webapp: "https://github.com/ashraf1600/ExportMart-Full",
    featured: true,
    highlights: [
      "JWT authentication with Djoser for secure sessions",
      "Cart, wishlist, checkout, and order management",
      "Product reviews and category browsing",
      "Auto-generated Swagger/Redoc API documentation",
    ],
    category: ["Web Development", "Personal Project"],
  },
  {
    id: 3,
    title: "CSF-CUET — Cox's Bazar Student Forum",
    description: "A community platform for Cox's Bazar district students and alumni at CUET. Includes user registration with admin approval, a public community feed with posts/likes/comments, event and announcement management, committee/department organization, and a full Django admin moderation panel. Live in production on Render.",
    image: CoxsBazar,
    screenshots: [CoxsBazar, CoxsBazar],
    tags: ["Django", "Bootstrap", "SQLite", "Community Platform"],
    github: "https://github.com/ashraf1600/Cox-s-Bazar-Student-Forum-CUET",
    webapp: "https://cox-s-bazar-student-forum-cuet.onrender.com",
    featured: true,
    highlights: [
      "Admin-approved registration and moderation pipeline",
      "Public feed with posts, likes, and comments",
      "Event and announcement management",
      "Live in production on Render",
    ],
    category: ["Web Development", "Personal Project"],
  },

  // Web Development
  {
    id: 4,
    title: "CUET Hospital Management System",
    description: "A comprehensive hospital management system built for CUET. Features patient registration, appointment scheduling, doctor management, medical records tracking, and administrative functions for efficient healthcare facility operations.",
    image: CUET_Hos,
    screenshots: [CUET_Hos, CUET_Hos],
    tags: ["Web Development", "Healthcare", "Django", "Bootstrap"],
    github: "https://github.com/ashraf1600/CUET-Hospital-Management-System",
    webapp: "https://github.com/ashraf1600/CUET-Hospital-Management-System",
    featured: false,
    highlights: [
      "Patient registration with appointment scheduling",
      "Doctor management and medical records tracking",
      "Administrative functions for clinic operations",
    ],
    category: ["Web Development", "Academic Project"],
  },
  {
    id: 5,
    title: "CUET Peer Delivery",
    description: "A peer-to-peer delivery platform designed specifically for CUET students. Built with the MERN stack, this application enables students to send and receive items within the campus community safely and efficiently.",
    image: CUET_Peer,
    screenshots: [CUET_Peer, CUET_Peer],
    tags: ["React", "Node.js", "MongoDB", "Express", "MERN"],
    github: "",
    webapp: "https://github.com/ashraf1600/CUET_Peer_Delivery",
    featured: false,
    highlights: [
      "Campus-only peer-to-peer delivery system",
      "MERN stack architecture (MongoDB, Express, React, Node)",
      "Safe and efficient item exchange workflows",
    ],
    category: ["Web Development", "Academic Project"],
  },
  {
    id: 6,
    title: "MultiMart E-commerce",
    description: "A dynamic e-commerce marketplace built with Django and Bootstrap. Features product browsing, detailed views, user authentication, shopping cart functionality, and a seamless checkout process for an intuitive online shopping experience.",
    image: Multi,
    screenshots: [Multi, Multi],
    tags: ["Django", "Python", "Bootstrap", "E-commerce"],
    github: "https://github.com/ashraf1600/MultiMart",
    webapp: "https://github.com/ashraf1600/MultiMart",
    featured: false,
    highlights: [
      "Product browsing with detailed views",
      "User authentication and shopping cart",
      "Streamlined checkout experience",
    ],
    category: "Web Development",
  },

  // Machine Learning / AI
  {
    id: 7,
    title: "Personal AI Assistant",
    description: "An intelligent personal AI assistant built with Gemini API, Streamlit, and OOP principles. Features conversational AI capabilities, task automation, and a clean Streamlit interface for seamless user interaction.",
    image: Personal_AI,
    screenshots: [Personal_AI, Personal_AI],
    tags: ["Gemini API", "Streamlit", "Python", "AI", "OOP"],
    github: "https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-/tree/main",
    webapp: "https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-/tree/main",
    featured: false,
    highlights: [
      "Conversational AI powered by Gemini API",
      "Object-oriented architecture for extensibility",
      "Clean Streamlit UI for instant interaction",
    ],
    category: "Machine Learning",
  },
  {
    id: 8,
    title: "Traffic Light Control with RL",
    description: "An intelligent traffic light control system using Reinforcement Learning. Optimizes traffic flow, reduces congestion, and improves urban mobility through adaptive signal timing.",
    image: Traffic,
    screenshots: [Traffic, Traffic],
    tags: ["Reinforcement Learning", "AI", "Smart City", "Python"],
    github: "https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning",
    webapp: "https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning",
    featured: false,
    highlights: [
      "Reinforcement learning agent for signal control",
      "Adaptive timing to reduce congestion",
      "Urban mobility optimization for smart cities",
    ],
    category: "Machine Learning",
  },
  {
    id: 9,
    title: "E-commerce Fraud Detection",
    description: "Machine learning-based fraud detection system for e-commerce transactions. Utilizes supervised learning algorithms to identify fraudulent activities and protect customers.",
    image: Fraud,
    screenshots: [Fraud, Fraud],
    tags: ["Supervised Learning", "Flask", "Python", "ML"],
    github: "https://github.com/ashraf1600/Fraud-Detection-ML",
    webapp: "https://github.com/ashraf1600/Fraud-Detection-ML",
    featured: false,
    highlights: [
      "Supervised learning classifiers on transaction data",
      "Flask API for real-time scoring",
      "Productionized fraud alerts for end users",
    ],
    category: "Machine Learning",
  },
];

// Research Publications
export const research = [
  {
    id: 0,
    title: "An Explainable Machine Learning and Ensemble Voting Classifier for Cyber Attack Detection in Highly Imbalanced IoT Networks",
    authors: "Ashraful Islam, Towhidul Islam, Dr. Mahfuzulhoq Chowdhury",
    conference: "IEEE 2026 3rd International Conference on Data Science and Business Systems (ICDSBS 2026)",
    year: 2026,
    status: "Accepted",
    tags: ["Machine Learning", "IoT Security", "Ensemble Methods", "Cyber Attack Detection"],
    link: "https://example.com/research/iot-cyber-attack-detection",
    abstract: "This work proposes an explainable ensemble voting classifier for detecting cyber attacks in highly imbalanced IoT network traffic. We combine multiple base learners with class-balancing strategies and use SHAP to surface model decisions, achieving strong detection on minority attack categories.",
    category: "Machine Learning",
  },
  {
    id: 1,
    title: "Unveiling Facial Forensic Traces: A Hybrid Xception-Vision Transformer Framework for Robust Morphing Attack Detection with 10-Channel Feature Fusion",
    authors: "Ashraful Islam, Towhidul Islam, Dr. Mahfuzulhoq Chowdhury",
    conference: "Not Submitted yet",
    year: 2026,
    status: "In Progress",
    tags: ["Deep Learning", "Image Processing"],
    link: "https://example.com/research/traffic-prediction",
    abstract: "We present a hybrid Xception + Vision Transformer framework for morphing attack detection on face images. A 10-channel feature fusion module captures low-level forensic cues alongside global semantic structure, improving robustness to post-processed morphs.",
    category: "Deep Learning",
  },
  {
    id: 2,
    title: "Vision Transformer-Based Detection of Counterfeit Bangladeshi Banknotes Using the DeiT-Tiny Architecture",
    authors: "Ashraful Islam, Dr. Mahfuzulhoq Chowdhury, Towhidul Islam",
    conference: "INTERNATIONAL CONFERENCE ON CIRCUIT POWER & COMPUTING TECHNOLOGIES (ICCPCT-2026)",
    year: 2026,
    status: "Accepted",
    tags: [
      "Vision Transformer",
      "Counterfeit Detection",
      "Banknote Authentication",
      "Deep Learning",
      "Computer Vision",
    ],
    link: "https://example.com/research/bangladesh-currency-counterfeit-vit",
    abstract: "We fine-tune a DeiT-Tiny Vision Transformer to classify Bangladeshi banknotes as genuine or counterfeit, achieving high accuracy with a compact model suitable for mobile deployment. Ablations cover data augmentation, class weighting, and attention visualization.",
    category: "Deep Learning",
  },
  {
    id: 3,
    title: "A Double Layer Stacking Classifier Based Explainable Tax Evasion Fraud Prediction with Optuna and SMOTE-Tomek",
    authors: "Dr. Mahfuzulhoq Chowdhury, Saklain Ahmed, Ashraful Islam",
    conference: "1st International Conference on Next-Generation Electrical & Electronics, Computer Systems, and Technologies (iCONEECT 2026)",
    year: 2026,
    status: "Submitted",
    tags: [
      "Tax Fraud Detection",
      "Explainable AI",
      "Stacking Classifier",
      "SMOTE-Tomek",
      "Optuna",
      "SHAP",
      "Machine Learning",
      "Data Engineering",
    ],
    link: "https://example.com/research/tax-fraud-prediction-stacking",
    abstract: "This paper introduces a double-layer stacking classifier for tax evasion prediction, with Optuna-tuned base learners, SMOTE-Tomek resampling, and SHAP-based explanations to support auditing workflows.",
    category: "Machine Learning",
  },
  {
    id: 4,
    title: "A Traffic Rules Violation Prediction Scheme Based on Hybrid Stacking Ensemble Classifier and SHAP Analysis",
    authors: "Dr. Mahfuzul Hoq Chowdhury, Oarisa Rebayet, Ifath Jeba Chowdhury, Ashraf-ul-Islam, Isnat Mehrin Sami, Snaholata Mondal",
    conference: "2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)",
    year: 2026,
    status: "Copyright Confirmed",
    tags: [
      "Traffic Violation Prediction",
      "Stacking Ensemble",
      "SHAP Analysis",
      "Explainable AI",
      "Machine Learning",
      "Traffic Analytics",
      "Hybrid Classifier",
      "Deep Learning",
    ],
    link: "https://example.com/research/traffic-rules-violation-prediction",
    abstract: "We propose a hybrid stacking ensemble for predicting traffic rules violations, combining gradient boosting, random forests, and a deep tabular model. SHAP analysis isolates the contextual and behavioral factors that drive high-risk predictions.",
    category: "Machine Learning",
  },
];

// Certifications
export const certifications = [
  {
    id: 0,
    title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    name: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    issuer: "Udemy",
    organization: "Udemy",
    logo: pythonLogo,
    date: "October 2025",
    expiryDate: null,
    credentialId: "UDEMY-DS-ML-DL-NLP-2025",
    credentialURL: "https://udemy.com/certificate/complete-data-science-ml-dl-nlp",
    credentialUrl: "https://udemy.com/certificate/complete-data-science-ml-dl-nlp",
    description: "Comprehensive bootcamp covering data science, machine learning, deep learning, and natural language processing with hands-on projects",
    skills: ["Data Science", "Machine Learning", "Deep Learning", "NLP", "Python"],
  },
  {
    id: 1,
    title: "SQL (Intermediate)",
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    organization: "HackerRank",
    logo: mysqlLogo,
    date: "December 2024",
    expiryDate: "December 2034",
    credentialId: "394942fba94b",
    credentialURL: "https://www.hackerrank.com/certificates/394942fba94b",
    credentialUrl: "https://www.hackerrank.com/certificates/394942fba94b",
    description: "HackerRank certification for intermediate SQL skills covering advanced queries, joins, and data manipulation",
    skills: ["SQL", "Database", "Query Optimization"],
  },
  {
    id: 2,
    title: "SQL (Basic)",
    name: "SQL (Basic)",
    issuer: "HackerRank",
    organization: "HackerRank",
    logo: mysqlLogo,
    date: "December 2024",
    expiryDate: "December 2034",
    credentialId: "a330a67b3ceb",
    credentialURL: "https://www.hackerrank.com/certificates/a330a67b3ceb",
    credentialUrl: "https://www.hackerrank.com/certificates/a330a67b3ceb",
    description: "HackerRank certification for basic SQL skills covering fundamental database operations and query writing",
    skills: ["SQL", "Database Basics", "Query Writing"],
  },
  {
    id: 3,
    title: "Database Structures and Management with MySQL",
    name: "Database Structures and Management with MySQL",
    issuer: "Meta",
    organization: "Meta",
    logo: mysqlLogo,
    date: "December 2024",
    expiryDate: null,
    credentialId: "9PRJPMKUNGTF",
    credentialURL: "https://coursera.org/verify/database-structures-mysql",
    credentialUrl: "https://coursera.org/verify/database-structures-mysql",
    description: "Meta professional certificate for database design, implementation, and management using MySQL",
    skills: ["MySQL", "Database Design", "Database Management", "SQL"],
  },
  {
    id: 4,
    title: "Divide and Conquer, Sorting and Searching, and Randomized Algorithms",
    name: "Divide and Conquer, Sorting and Searching, and Randomized Algorithms",
    issuer: "Stanford University",
    organization: "Stanford University",
    logo: cppLogo,
    date: "December 2024",
    expiryDate: null,
    credentialId: "M5SWX0PJJFIY",
    credentialURL: "https://coursera.org/verify/divide-conquer-algorithms",
    credentialUrl: "https://coursera.org/verify/divide-conquer-algorithms",
    description: "Stanford University course on fundamental computer science algorithms including divide and conquer strategies, sorting algorithms, and randomized algorithms",
    skills: ["Algorithms", "Data Structures", "Sorting", "Searching", "Problem Solving"],
  },
  {
    id: 5,
    title: "Exploratory Data Analysis in Python",
    name: "Exploratory Data Analysis in Python",
    issuer: "Gianluca Malato",
    organization: "Udemy",
    logo: pythonLogo,
    date: "February 2026",
    expiryDate: null,
    credentialId: "UC-f84f7912-d28b-428a-a774-147226448486",
    credentialURL: "https://gale.udemy.com/certificate/UC-f84f7912-d28b-428a-a774-147226448486/",
    credentialUrl: "https://gale.udemy.com/certificate/UC-f84f7912-d28b-428a-a774-147226448486/",
    description: "Course covering exploratory data analysis techniques in Python.",
    skills: ["EDA", "Python"],
  },
];