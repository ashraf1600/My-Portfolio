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
//  Machine Learning Data Analysis
import scikitlearnLogo from './assets/tech_logo/sklearn.png';
import numpylogo from './assets/tech_logo/numpy.png';
import pandasLogo from './assets/tech_logo/pandas.png';
import matplotlibLogo from './assets/tech_logo/matplotlib.png';
import seabornLogo from './assets/tech_logo/seaborn.png';
import jupyterLogo from './assets/tech_logo/jupyter.png';


// Experience Section Logo's
import webverseLogo from './assets/company_logo/webverse_logo.png';

// Education Section Logo's

import cuetLogo from './assets/education_logo/Cover.png';


// Project Section Logo's
// import cmLogo from './assets/work_logo/cm.png';
// import csprepLogo from './assets/work_logo/cs_prep.png';
// import movierecLogo from './assets/work_logo/movie_rec.png';
// import taskremLogo from './assets/work_logo/task_rem.png';
// import npmLogo from './assets/work_logo/npm.png';

import CUET_Hos from './assets/work_logo/CUET_Hos.png';
import CUET_Peer from './assets/work_logo/CUET_Peer.png';
import Multi from './assets/work_logo/Multi.png';
import Personal_AI from './assets/work_logo/Personal_AI.png';
import Traffic from './assets/work_logo/Traffic.png';
import Fraud from './assets/work_logo/Fraud.png';


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
    title: 'Deep Learning & Artificial Intelligence',
    skills: [
      { name: 'PyTorch', logo: pytorch },

    ],
  },
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', logo: pythonLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'C', logo: cLogo },
      { name: 'JavaScript', logo: javascriptLogo },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Django', logo: pythonLogo },
      { name: 'Flask', logo: pythonLogo },
      { name: 'Node JS', logo: nodejsLogo },
      // { name: 'Express JS', logo: expressjsLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
      { name: 'MySQL', logo: mysqlLogo },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React JS', logo: reactjsLogo },
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
      { name: 'Streamlit', logo: pythonLogo },
      { name: 'Vercel', logo: vercelLogo },
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
    desc: "I’m pursuing a B.Sc. in Computer Science and Engineering at CUET, Chittagong. My coursework covers Data Structures, Algorithms, Web Development, Machine Learning, and AI. I’ve gained practical experience through coding contests, hackathons, and collaborative projects..",
    degree: "B.Sc. in Computer Science and Engineering",
    type: "University",


  },
];

export const projects = [
  // Web Development Projects
  {
    id: 0,
    title: "CUET Hospital Management System",
    description: "A comprehensive hospital management system built for CUET. Features patient registration, appointment scheduling, doctor management, medical records tracking, and administrative functions for efficient healthcare facility operations.",
    image: CUET_Hos,
    tags: ["Web Development", "Healthcare", "Django", "Bootstrap"],
    github: "https://github.com/ashraf1600/CUET-Hospital-Management-System",
    webapp: "https://github.com/ashraf1600/CUET-Hospital-Management-System",
    category: ["Web Development", "Academic Project"],
  },
  {
    id: 1,
    title: "CUET Peer Delivery",
    description: "A peer-to-peer delivery platform designed specifically for CUET students. Built with the MERN stack, this application enables students to send and receive items within the campus community safely and efficiently.",
    image: CUET_Peer,
    tags: ["React", "Node.js", "MongoDB", "Express", "MERN"],
    github: "",
    webapp: "https://github.com/ashraf1600/CUET_Peer_Delivery",
    category: ["Web Development", "Academic Project"],
  },
  {
    id: 2,
    title: "MultiMart E-commerce",
    description: "A dynamic e-commerce marketplace built with Django and Bootstrap. Features product browsing, detailed views, user authentication, shopping cart functionality, and a seamless checkout process for an intuitive online shopping experience.",
    image: Multi,
    tags: ["Django", "Python", "Bootstrap", "E-commerce"],
    github: "https://github.com/ashraf1600/MultiMart",
    webapp: "https://github.com/ashraf1600/MultiMart",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Personal AI Assistant",
    description: "An intelligent personal AI assistant built with Gemini API, Streamlit, and OOP principles. Features conversational AI capabilities, task automation, and a clean Streamlit interface for seamless user interaction.",
    image: Personal_AI,
    tags: ["Gemini API", "Streamlit", "Python", "AI", "OOP"],
    github: "https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-/tree/main",
    webapp: "https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-/tree/main",
    category: "Machine Learning",
  },
  {
    id: 4,
    title: "Traffic Light Control with RL",
    description: "An intelligent traffic light control system using Reinforcement Learning. Optimizes traffic flow, reduces congestion, and improves urban mobility through adaptive signal timing.",
    image: Traffic,
    tags: ["Reinforcement Learning", "AI", "Smart City", "Python"],
    github: "https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning",
    webapp: "https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning",
    category: "Machine Learning",
  },
  {
    id: 5,
    title: "E-commerce Fraud Detection",
    description: "Machine learning-based fraud detection system for e-commerce transactions. Utilizes supervised learning algorithms to identify fraudulent activities and protect customers.",
    image: Fraud,
    tags: ["Supervised Learning", "Flask", "Python", "ML"],
    github: "https://github.com/ashraf1600/Fraud-Detection-ML",
    webapp: "https://github.com/ashraf1600/Fraud-Detection-ML",
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
    category: "Machine Learning",
  },
  {
    id: 1,
    title: "Unveiling Facial Forensic Traces: A Hybrid Xception-Vision Transformer Framework for Robust Morphing Attack Detection with 10-Channel Feature Fusion",
    authors: "Ashraf Ahmed, Dr. Mohammad Hasan",
    conference: "Not Submitted yet",
    year: 2026,
    status: "In Progress",
    tags: ["Deep Learning", "Image Processing"],
    link: "https://example.com/research/traffic-prediction",
    category: "Deep Learning",
  },
  {
    id: 2,
    title: "Towards Robust Counterfeit Detection of Bangladesh Currency Using Vision Transformer Models",
    authors: "Ashraf Ahmed, Dr. Mohammad Hasan",
    conference: " Submitted Yet",
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
    category: "Deep Learning"
  }


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
    logo: cppLogo,
    date: "February 2026",
    expiryDate: null,
    credentialId: "M5SWX0PJJFIY",
    credentialURL: "https://gale.udemy.com/certificate/UC-f84f7912-d28b-428a-a774-147226448486/",
    credentialUrl: "https://gale.udemy.com/certificate/UC-f84f7912-d28b-428a-a774-147226448486/",
    description: "",
    skills: ["EDA", "Python"],
  },
];
