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
import agcLogo from './assets/company_logo/agc_logo.png';
import newtonschoolLogo from './assets/company_logo/newtonschool_logo.png';

// Education Section Logo's
import glaLogo from './assets/education_logo/gla_logo.png';
import cuetLogo from './assets/education_logo/Cover.png';
import vpsLogo from './assets/education_logo/vps_logo.png';

// Project Section Logo's
import githubdetLogo from './assets/work_logo/github_det.png';
import csprepLogo from './assets/work_logo/cs_prep.png';
import movierecLogo from './assets/work_logo/movie_rec.png';
import taskremLogo from './assets/work_logo/task_rem.png';
import npmLogo from './assets/work_logo/npm.png';
import webverLogo from './assets/work_logo/web_dig.png';
import cmLogo from './assets/work_logo/cm.png';
import imagesearchLogo from './assets/work_logo/image_search.png';
import removebgLogo from './assets/work_logo/remove_bg.png';


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
    image: githubdetLogo,
    tags: ["Web Development", "Healthcare", "Management System"],
    github: "https://github.com/ashraf1600/CUET-Hospital-Management-System",
    webapp: "https://github.com/ashraf1600/CUET-Hospital-Management-System",
    category: "Web Development",
  },
  {
    id: 1,
    title: "CUET Peer Delivery",
    description: "A peer-to-peer delivery platform designed specifically for CUET students. Built with the MERN stack, this application enables students to send and receive items within the campus community safely and efficiently.",
    image: csprepLogo,
    tags: ["React", "Node.js", "MongoDB", "Express", "MERN"],
    github: "https://github.com/ashraf1600/CUET_Peer_Delivery",
    webapp: "https://github.com/ashraf1600/CUET_Peer_Delivery",
    category: "Web Development",
  },
  {
    id: 2,
    title: "MultiMart E-commerce",
    description: "A dynamic e-commerce marketplace built with Django and Bootstrap. Features product browsing, detailed views, user authentication, shopping cart functionality, and a seamless checkout process for an intuitive online shopping experience.",
    image: movierecLogo,
    tags: ["Django", "Python", "Bootstrap", "E-commerce"],
    github: "https://github.com/ashraf1600/MultiMart",
    webapp: "https://github.com/ashraf1600/MultiMart",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Personal AI Assistant",
    description: "An intelligent personal AI assistant built with Gemini API, Streamlit, and OOP principles. Features conversational AI capabilities, task automation, and a clean Streamlit interface for seamless user interaction.",
    image: npmLogo,
    tags: ["Gemini API", "Streamlit", "Python", "AI", "OOP"],
    github: "https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-",
    webapp: "https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-",
    category: "Machine Learning",
  },
  {
    id: 4,
    title: "JARVIS Voice Assistant",
    description: "An advanced voice-activated assistant system inspired by JARVIS. Implements speech recognition, natural language processing, and voice synthesis for hands-free interaction and task automation.",
    image: taskremLogo,
    tags: ["Python", "Voice Recognition", "NLP", "AI"],
    github: "https://github.com/ashraf1600/JARVIS-Voice-Assistant-System",
    webapp: "https://github.com/ashraf1600/JARVIS-Voice-Assistant-System",
    category: "Machine Learning",
  },
  {
    id: 5,
    title: "Django Portfolio Website",
    description: "A professional portfolio website built with Django framework. Features responsive design, project showcase, skills section, contact form, and an admin panel for easy content management.",
    image: webverLogo,
    tags: ["Django", "Python", "Portfolio", "Web Development"],
    github: "https://github.com/ashraf1600/Django-Portfolio-Website",
    webapp: "https://github.com/ashraf1600/Django-Portfolio-Website",
    category: "Web Development",
  },
  {
    id: 6,
    title: "My Portfolio",
    description: "Personal portfolio website showcasing projects, skills, and professional experience. Built with modern web technologies featuring responsive design and smooth animations.",
    image: cmLogo,
    tags: ["React", "Portfolio", "Web Development"],
    github: "https://github.com/ashraf1600/My-Portfolio",
    webapp: "https://github.com/ashraf1600/My-Portfolio",
    category: "Web Development",
  },
  {
    id: 7,
    title: "Blog Website",
    description: "A full-featured blogging platform with user authentication, post creation/editing, comments system, and content management. Built for writers and content creators.",
    image: imagesearchLogo,
    tags: ["Web Development", "Blog", "CMS"],
    github: "https://github.com/ashraf1600/Blog-website",
    webapp: "https://github.com/ashraf1600/Blog-website",
    category: "Web Development",
  },
  {
    id: 8,
    title: "Task Management System",
    description: "A productivity-focused task management application. Features task creation, assignment, deadline tracking, priority management, and team collaboration tools.",
    image: removebgLogo,
    tags: ["Task Management", "Productivity", "Web App"],
    github: "https://github.com/ashraf1600/task_management_system",
    webapp: "https://github.com/ashraf1600/task_management_system",
    category: "Web Development",
  },
  {
    id: 9,
    title: "Event Management System",
    description: "Comprehensive event planning and management platform. Includes event creation, registration, ticketing, schedule management, and attendee tracking features.",
    image: githubdetLogo,
    tags: ["Event Management", "Web Development"],
    github: "https://github.com/ashraf1600/Event_Management_System1",
    webapp: "https://github.com/ashraf1600/Event_Management_System1",
    category: "Web Development",
  },
  {
    id: 10,
    title: "Scribbles Cafe",
    description: "A modern cafe website featuring menu display, online ordering, reservation system, and location information. Built with a focus on user experience and visual appeal.",
    image: csprepLogo,
    tags: ["Restaurant", "Web Development", "UI/UX"],
    github: "https://github.com/ashraf1600/Scribbles_Cafe",
    webapp: "https://github.com/ashraf1600/Scribbles_Cafe",
    category: "Web Development",
  },
  {
    id: 11,
    title: "Shopping Cart",
    description: "An e-commerce shopping cart implementation with product management, cart operations, price calculation, and checkout functionality. Demonstrates core e-commerce features.",
    image: movierecLogo,
    tags: ["E-commerce", "Shopping Cart", "JavaScript"],
    github: "https://github.com/ashraf1600/Shopping-Cart",
    webapp: "https://github.com/ashraf1600/Shopping-Cart",
    category: "Web Development",
  },
  {
    id: 12,
    title: "REST Countries API",
    description: "A React application consuming REST Countries API to display country information. Features search, filter by region, detailed country views, and responsive design.",
    image: npmLogo,
    tags: ["React", "API", "REST", "Web Development"],
    github: "https://github.com/ashraf1600/REST-Countries-API---with-React",
    webapp: "https://github.com/ashraf1600/REST-Countries-API---with-React",
    category: "Web Development",
  },
  {
    id: 13,
    title: "Chat Application",
    description: "Real-time chat application with messaging, user authentication, chat rooms, and online status indicators. Built for seamless communication.",
    image: taskremLogo,
    tags: ["Chat", "Real-time", "Web Sockets"],
    github: "https://github.com/ashraf1600/Chat_app",
    webapp: "https://github.com/ashraf1600/Chat_app",
    category: "Web Development",
  },

  // Machine Learning & AI Projects
  {
    id: 14,
    title: "Traffic Light Control with RL",
    description: "An intelligent traffic light control system using Reinforcement Learning. Optimizes traffic flow, reduces congestion, and improves urban mobility through adaptive signal timing.",
    image: webverLogo,
    tags: ["Reinforcement Learning", "AI", "Smart City", "Python"],
    github: "https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning",
    webapp: "https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning",
    category: "Machine Learning",
  },
  {
    id: 15,
    title: "E-commerce Fraud Detection",
    description: "Machine learning-based fraud detection system for e-commerce transactions. Utilizes supervised learning algorithms to identify fraudulent activities and protect customers.",
    image: cmLogo,
    tags: ["Supervised Learning", "Flask", "Python", "ML"],
    github: "https://github.com/ashraf1600/Fraud-Detection-ML",
    webapp: "https://github.com/ashraf1600/Fraud-Detection-ML",
    category: "Machine Learning",
  },
  {
    id: 16,
    title: "Forest Fire Prediction",
    description: "Supervised machine learning model predicting forest fire likelihood based on environmental factors. Features Flask interface for real-time predictions and early warning.",
    image: imagesearchLogo,
    tags: ["ML", "Flask", "Sklearn", "Python", "Data Science"],
    github: "https://github.com/ashraf1600/Forest-Fire-Prediction-Using-Supervised-Machine-Learning-Models-",
    webapp: "https://github.com/ashraf1600/Forest-Fire-Prediction-Using-Supervised-Machine-Learning-Models-",
    category: "Machine Learning",
  },
  {
    id: 17,
    title: "ML Projects Collection",
    description: "A comprehensive collection of machine learning projects covering various algorithms, techniques, and real-world applications. Includes implementations and documentation.",
    image: removebgLogo,
    tags: ["Machine Learning", "Python", "Projects"],
    github: "https://github.com/ashraf1600/mlprojects",
    webapp: "https://github.com/ashraf1600/mlprojects",
    category: "Machine Learning",
  },
  {
    id: 18,
    title: "100 Days of ML",
    description: "A structured 100-day machine learning learning journey by CampusX. Daily notes, implementations, and outputs covering ML fundamentals to advanced topics.",
    image: githubdetLogo,
    tags: ["Machine Learning", "Learning", "Python"],
    github: "https://github.com/ashraf1600/100-days-of-ML-by-CampusX",
    webapp: "https://github.com/ashraf1600/100-days-of-ML-by-CampusX",
    category: "Machine Learning",
  },
  {
    id: 19,
    title: "Hands-On Machine Learning",
    description: "Practical machine learning implementations and exercises. Covers supervised learning, unsupervised learning, neural networks, and hands-on projects.",
    image: csprepLogo,
    tags: ["Machine Learning", "Python", "Hands-on"],
    github: "https://github.com/ashraf1600/Hands_On_Machine_Learning",
    webapp: "https://github.com/ashraf1600/Hands_On_Machine_Learning",
    category: "Machine Learning",
  },

  // Data Science Projects
  {
    id: 20,
    title: "Data Analysis for DS & AI",
    description: "Comprehensive data analysis projects for data science and AI applications. Includes exploratory data analysis, visualization, and statistical techniques.",
    image: movierecLogo,
    tags: ["Data Analysis", "Python", "Data Science"],
    github: "https://github.com/ashraf1600/Data-Analysis-For-Data-Science-and-AI",
    webapp: "https://github.com/ashraf1600/Data-Analysis-For-Data-Science-and-AI",
    category: "Data Science",
  },
  {
    id: 21,
    title: "Pandas for Data Science",
    description: "Tutorials and projects demonstrating Pandas library for data manipulation and analysis. Covers data cleaning, transformation, and analysis techniques.",
    image: npmLogo,
    tags: ["Pandas", "Python", "Data Science"],
    github: "https://github.com/ashraf1600/Pandas-For-Data-Science",
    webapp: "https://github.com/ashraf1600/Pandas-For-Data-Science",
    category: "Data Science",
  },

  // Academic & Computer Science Projects
  {
    id: 22,
    title: "Competitive Programming",
    description: "Comprehensive collection of competitive programming solutions in C++. Efficient algorithms, data structures, and contest solutions from various online judges.",
    image: taskremLogo,
    tags: ["C++", "Algorithms", "Data Structures", "CP"],
    github: "https://github.com/ashraf1600/Competitive-Programming",
    webapp: "https://github.com/ashraf1600/Competitive-Programming",
    category: "Academic",
  },
  {
    id: 23,
    title: "Data Structures & Algorithms",
    description: "Well-organized repository of fundamental data structures and algorithms in C++. Includes explanations, complexity analysis, and practical implementations.",
    image: webverLogo,
    tags: ["C++", "Data Structures", "Algorithms", "DSA"],
    github: "https://github.com/ashraf1600/DSA",
    webapp: "https://github.com/ashraf1600/DSA",
    category: "Academic",
  },
  {
    id: 24,
    title: "LeetCode Solutions 2024",
    description: "Curated LeetCode problem solutions from 2024. Optimized C++ implementations with detailed comments, multiple approaches, and complexity analysis.",
    image: cmLogo,
    tags: ["C++", "LeetCode", "Problem Solving", "Algorithms"],
    github: "https://github.com/ashraf1600/LeetCode24",
    webapp: "https://github.com/ashraf1600/LeetCode24",
    category: "Academic",
  },
  {
    id: 25,
    title: "CPU Scheduling Algorithms",
    description: "Implementation of existing CPU scheduling algorithms and design of a new custom scheduling algorithm. Includes performance analysis and comparisons.",
    image: imagesearchLogo,
    tags: ["Operating Systems", "Algorithms", "C++"],
    github: "https://github.com/ashraf1600/Implement-existing-CPU-scheduling-algorithms-and-design-a-new-algorithm.",
    webapp: "https://github.com/ashraf1600/Implement-existing-CPU-scheduling-algorithms-and-design-a-new-algorithm.",
    category: "Academic",
  },
  {
    id: 26,
    title: "ReactJS Practice",
    description: "Collection of ReactJS practice projects and exercises. Covers React fundamentals, hooks, state management, and component development.",
    image: removebgLogo,
    tags: ["React", "JavaScript", "Practice", "Web Development"],
    github: "https://github.com/ashraf1600/ReactJs_Practice",
    webapp: "https://github.com/ashraf1600/ReactJs_Practice",
    category: "Academic",
  },
  {
    id: 27,
    title: "InceptionBD Python",
    description: "Python programming projects and exercises. Covers Python fundamentals, advanced concepts, and practical applications.",
    image: githubdetLogo,
    tags: ["Python", "Programming", "Projects"],
    github: "https://github.com/ashraf1600/InceptionBD-Python",
    webapp: "https://github.com/ashraf1600/InceptionBD-Python",
    category: "Academic",
  },
  {
    id: 28,
    title: "Django Authentication Practice",
    description: "Practice project implementing Django authentication system. Covers user registration, login, logout, password management, and session handling.",
    image: csprepLogo,
    tags: ["Django", "Authentication", "Python", "Security"],
    github: "https://github.com/ashraf1600/Django-basic-authentication-practice",
    webapp: "https://github.com/ashraf1600/Django-basic-authentication-practice",
    category: "Web Development",
  },

  // Tools & Utilities
  {
    id: 29,
    title: "Node.js Uptime Monitor",
    description: "Raw Node.js uptime monitoring tool for tracking website availability. Monitors server uptime, sends alerts, and generates availability reports.",
    image: movierecLogo,
    tags: ["Node.js", "Monitoring", "DevOps"],
    github: "https://github.com/ashraf1600/raw-node-uptime-monitor",
    webapp: "https://github.com/ashraf1600/raw-node-uptime-monitor",
    category: "Web Development",
  },
  {
    id: 30,
    title: "LaTeX CV Template",
    description: "Professional CV/Resume template built with LaTeX. Clean design, customizable sections, and academic formatting for professional documentation.",
    image: npmLogo,
    tags: ["LaTeX", "CV", "Template", "Documentation"],
    github: "https://github.com/ashraf1600/CV_Latex",
    webapp: "https://github.com/ashraf1600/CV_Latex",
    category: "Academic",
  },
];

// Research Publications
export const research = [
  {
    id: 0,
    title: "An Explainable Machine Learning and Ensemble Voting Classifier for Cyber Attack Detection in Highly Imbalanced IoT Networks",
    authors: "Ashraful Islam, Towhidul Islam, Dr. Mahfuzulhoq Chowdhury",
    conference: "International Conference on Electrical, Computer and Communication Technologies (ECCT 2026)",
    year: 2026,
    status: "Under Review",
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
 
];

// Certifications
export const certifications = [
  {
    id: 0,
    name: "Deep Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    date: "December 2024",
    expiryDate: null,
    credentialId: "DL-SPEC-2024-12345",
    credentialURL: "https://coursera.org/verify/specialization/DL-SPEC-2024",
    description: "Comprehensive specialization covering neural networks, CNNs, RNNs, and sequence models",
    skills: ["Neural Networks", "CNN", "RNN", "Deep Learning"],
  },
  {
    id: 1,
    name: "Machine Learning by Andrew Ng",
    issuer: "Coursera",
    date: "November 2024",
    expiryDate: null,
    credentialId: "ML-NG-2024-67890",
    credentialURL: "https://coursera.org/verify/ML-NG-2024",
    description: "Master machine learning fundamentals including supervised learning, unsupervised learning, and best practices",
    skills: ["Supervised Learning", "Unsupervised Learning", "Regression", "Classification"],
  },
  {
    id: 2,
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "October 2024",
    expiryDate: "October 2027",
    credentialId: "AWS-CP-2024-11111",
    credentialURL: "https://aws.amazon.com/verification/AWS-CP-2024",
    description: "Certification validating foundational knowledge of AWS cloud services and best practices",
    skills: ["AWS", "Cloud Computing", "EC2", "S3", "Lambda"],
  },
  {
    id: 3,
    name: "Google Cloud Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "September 2024",
    expiryDate: "September 2026",
    credentialId: "GCP-ACE-2024-22222",
    credentialURL: "https://cloud.google.com/certification/verify/GCP-ACE-2024",
    description: "Associate-level certification for deploying and managing applications on Google Cloud",
    skills: ["GCP", "Cloud Computing", "Compute Engine", "Cloud Storage"],
  },
  {
    id: 4,
    name: "Data Science with Python",
    issuer: "Udacity",
    date: "August 2024",
    expiryDate: null,
    credentialId: "DS-PY-2024-33333",
    credentialURL: "https://udacity.com/certificate/DS-PY-2024",
    description: "Nanodegree program covering data analysis, machine learning, and data visualization",
    skills: ["Python", "Pandas", "NumPy", "Data Visualization", "Machine Learning"],
  },
  {
    id: 5,
    name: "Full Stack Web Development with MERN",
    issuer: "Udemy",
    date: "July 2024",
    expiryDate: null,
    credentialId: "MERN-2024-44444",
    credentialURL: "https://udemy.com/certificate/MERN-2024",
    description: "Complete MERN stack development course covering MongoDB, Express, React, and Node.js",
    skills: ["React", "Node.js", "MongoDB", "Express", "Web Development"],
  },
  {
    id: 6,
    name: "Python for Data Science and Machine Learning",
    issuer: "Coursera / University of Michigan",
    date: "June 2024",
    expiryDate: null,
    credentialId: "PY-DS-ML-2024-55555",
    credentialURL: "https://coursera.org/verify/PY-DS-ML-2024",
    description: "Intermediate Python course focusing on data analysis, machine learning applications, and real-world projects",
    skills: ["Python", "Data Analysis", "Machine Learning", "Jupyter Notebook"],
  },
  {
    id: 7,
    name: "Advanced CSS and Sass",
    issuer: "Udemy",
    date: "May 2024",
    expiryDate: null,
    credentialId: "CSS-SASS-2024-66666",
    credentialURL: "https://udemy.com/certificate/CSS-SASS-2024",
    description: "Advanced CSS techniques including Sass preprocessing, responsive design, and modern CSS features",
    skills: ["CSS3", "Sass", "Responsive Design", "CSS Architecture"],
  },
  {
    id: 8,
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "April 2024",
    expiryDate: null,
    credentialId: "RWD-FCC-2024-77777",
    credentialURL: "https://freecodecamp.org/certificate/RWD-2024",
    description: "Comprehensive course on building responsive and mobile-first web applications",
    skills: ["HTML", "CSS", "Responsive Design", "Web Standards"],
  },
  {
    id: 9,
    name: "Introduction to Artificial Intelligence",
    issuer: "Coursera / UC Berkeley",
    date: "March 2024",
    expiryDate: null,
    credentialId: "AI-INTRO-2024-88888",
    credentialURL: "https://coursera.org/verify/AI-INTRO-2024",
    description: "Foundational course covering AI concepts, search algorithms, constraint satisfaction, and game playing",
    skills: ["Artificial Intelligence", "Search Algorithms", "Problem Solving"],
  },
];
