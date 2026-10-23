// Copy used only by the v2 (neo-brutalist) page.
// Projects, experience, research, skills and certifications come from ../constants.js.

export const hero = {
  roles: ["ML Engineer", "LLMOps Engineer", "AI Researcher", "Full-Stack Dev"],
  intro:
    "Engineering practical AI. I take models from research to production: Vision Transformers, RAG pipelines and the FastAPI + Docker services that ship them.",
};

export const marqueeWords = ["Data", "Model", "Train", "Retrieve", "Evaluate", "Deploy", "Research", "Ship"];

export const about = {
  facts: [
    { icon: "pin", label: "CUET, Chattogram" },
    { icon: "code", label: "ML & DataOps Intern" },
    { icon: "cap", label: "B.Sc. in CSE" },
  ],
  build: [
    "Computer vision with Vision Transformers & OpenCV",
    "RAG pipelines, agents & LLM workflows (LangChain, LangGraph)",
    "Explainable ML for imbalanced, real-world data",
    "FastAPI & Django REST backends, containerized with Docker",
    "Full-stack products on React, PostgreSQL & AWS",
  ],
  workflow: [
    { step: "01", title: "Data", desc: "Collect & validate" },
    { step: "02", title: "Explore", desc: "EDA & features" },
    { step: "03", title: "Model", desc: "Train & tune" },
    { step: "04", title: "Evaluate", desc: "Metrics & XAI" },
    { step: "05", title: "Deploy", desc: "API & Docker" },
    { step: "06", title: "Monitor", desc: "Track & retrain" },
  ],
  focus: [
    "Vision Transformers",
    "Retrieval-Augmented Generation",
    "Agentic AI",
    "MLOps & DataOps",
    "Explainable AI",
    "Computer Vision",
    "Backend APIs",
  ],
};

// Numbers shown on case-study cards, keyed by project id. Only facts stated in
// the project data are listed; projects without an entry show highlights instead.
export const projectMetrics = {
  0: [
    { label: "Accuracy", value: "~97.88%" },
    { label: "Backbone", value: "DeiT-Tiny" },
    { label: "Deployed", value: "Render" },
  ],
  4: [
    { label: "Less wait time", value: ">25%" },
    { label: "Agent", value: "DQN" },
    { label: "Simulator", value: "SUMO" },
  ],
  7: [
    { label: "Tests passing", value: "35/35" },
    { label: "Locking", value: "Row-level" },
    { label: "Database", value: "PostgreSQL" },
  ],
};

export const quickProfile = [
  { title: "B.Sc.", subtitle: "Computer Science & Engineering", subtext: "CUET, Chattogram", variant: "lime" },
  { title: "7", subtitle: "Research papers", subtext: "IEEE & international", variant: "dark", dynamic: "papers" },
  { title: "1450", subtitle: "Codeforces rating", subtext: "Specialist", variant: "lime" },
  { title: "AI/ML", subtitle: "Primary focus", subtext: "+ full stack", variant: "dark" },
];

export const contactTopics = ["Internship / Role", "Research", "Project collab", "Just saying hi"];
