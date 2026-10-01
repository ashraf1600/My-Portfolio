# 🌐 Ashraful Islam — Software & AI Engineer Portfolio

A modern, responsive, and high-performance **developer portfolio** showcasing full-stack web applications, client solutions, machine learning systems, and peer-reviewed research publications. Built with **React.js**, **Tailwind CSS**, and **Vite**.

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-ashrafulislam.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ashrafulislam.vercel.app/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-ashraf1600-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ashraf1600)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ashraful_Islam-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ashraf-islam16/)

---

## 🚀 Featured Top Projects

### 1. 🛍️ [Flembe Essence — E-Commerce Platform](https://flembe-essence-frontend.onrender.com/) *(Client Project)*
> **Live Demo:** [flembe-essence-frontend.onrender.com](https://flembe-essence-frontend.onrender.com/) • **Repository:** [github.com/ashraf1600/FLEMBE-ESSENCE](https://github.com/ashraf1600/FLEMBE-ESSENCE)

An elegant, mobile-first full-stack e-commerce platform built for a real-world client brand specializing in affordable jewellery and fashion accessories.
- **Frontend:** React 19, Vite, Tailwind CSS, TanStack React Query, Lucide Icons
- **Backend:** Django 5, Django REST Framework, SimpleJWT, Cloudinary Storage, PostgreSQL
- **Key Features:** Fast catalog browsing, category filtering, cart & checkout with Cash on Delivery (COD) & campus delivery, WhatsApp client consultation, and dynamic announcements.

---

### 2. 🏥 [CliniSync — Smart Clinic & Queue Management System](https://d15yucoed6jmf7.cloudfront.net/#home)
> **Live Demo:** [d15yucoed6jmf7.cloudfront.net](https://d15yucoed6jmf7.cloudfront.net/#home) • **Repository:** [github.com/ashraf1600/Clinisync](https://github.com/ashraf1600/Clinisync)

An enterprise-grade, bilingual (Bangla & English) hospital and doctor chamber appointment management platform designed to eliminate waiting lines and double bookings.
- **Frontend & Mobile:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Flutter 3
- **Backend & DB:** FastAPI (Python 3.11), PostgreSQL, Redis, SQLAlchemy Async, Alembic
- **Cloud & DevOps:** AWS (S3, CloudFront CDN, ECR, RDS), Terraform, Docker, GitHub Actions CI/CD
- **Key Features:** Real-time live queue tracking with estimated wait times, PostgreSQL GiST exclusion concurrency protection against double-booking, multi-chamber doctor scheduling, and digital QR-ready chamber passes.

---

### 🌟 Additional Flagship Projects

| Project | Domain | Stack | Links |
| :--- | :--- | :--- | :--- |
| **Personal AI Assistant** | Agentic AI & LLMs | Gemini API, LangChain, Streamlit, OOP, Python | [Code](https://github.com/ashraf1600/Personal-AI-Assistant-Gemini-API-OOP-Streamlit-/tree/main) |
| **Traffic Light Control with RL** | Reinforcement Learning | PyTorch, Deep Q-Learning (DQN), SUMO Simulator | [Code](https://github.com/ashraf1600/Traffic_Light_Control_using_Reinforcement_Learning) |
| **E-commerce Fraud Detection** | Machine Learning / MLOps | XGBoost, SMOTE-Tomek, Optuna, Flask, Docker | [Code](https://github.com/ashraf1600/Fraud-Detection-ML) |
| **ResQNet** | Emergency Coordination | Django REST Framework, React, PostgreSQL, Docker | [Code](https://github.com/Towhid454/Resqnet/tree/backend) |
| **Stacks Library System** | Distributed Systems | Django, DRF, PostgreSQL (Row-level Locking), Docker | [Code](https://github.com/ashraf1600/Stacks----A-Library-System) |
| **ExportMart** | Full-Stack E-commerce | Django REST Framework, React, Vite, Tailwind CSS, Docker | [Code](https://github.com/ashraf1600/ExportMart-Full) |

---

## 🛠️ Portfolio Tech Stack

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom responsive utilities & dark mode
- **Animations & Interaction:** Framer Motion, Lenis Smooth Scroll, React Parallax Tilt
- **Icons:** React Icons (`fi`, `hi2`, `si`, `bi`)
- **Interactive Features:** Multi-category filtering (Client Project, Web Development, Machine Learning, Academic), Spotlight & Grid view switchers, multi-screenshot architecture modal, and live AI assistant chat bubble.
- **Contact:** EmailJS integration for direct inquiry submissions
- **Deployment:** Vercel

---

## 📁 Repository Structure

```text
├── public/                 # Static assets & icons
├── src/
│   ├── assets/             # Brand logos, tech badges, and work screenshots
│   │   ├── work_logo/      # High-resolution project screenshots & galleries
│   │   │   ├── Flembe_Essence.png
│   │   │   ├── Clinisync.png
│   │   │   └── flembe/     # Multi-page screenshot gallery
│   │   ├── tech_logo/      # Tech stack SVG and PNG icons
│   │   └── education_logo/ # Institutional logos
│   ├── components/         # Modular UI components
│   │   ├── About/          # About section & profile overview
│   │   ├── Contact/        # Contact form, direct email & FloatingChat
│   │   ├── Education/      # Academic background & degrees
│   │   ├── Experience/     # Work & engineering experience
│   │   ├── Footer/         # Footer navigation & social links
│   │   ├── Header/         # Navigation bar & theme toggles
│   │   ├── Hero/           # Dynamic hero section with typewriter effect
│   │   ├── Research/       # Peer-reviewed publications & abstracts
│   │   ├── Skills/         # Categorized skills matrix
│   │   └── Work/           # Projects section with spotlight, filters & modals
│   ├── constants.js        # Central data source for projects, research & skills
│   ├── App.jsx             # Root application component
│   └── index.css           # Global typography, scrollbars & Tailwind rules
├── docs/                   # VitePress technical documentation
└── package.json            # Project dependencies & scripts
```

---

## 🧑‍💻 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/ashraf1600/Ashraf-s-Portfolio.git
cd Ashraf-s-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 🌟 About Ashraf

Ashraful Islam is a Computer Science and Engineering student at **Chittagong University of Engineering and Technology (CUET)** specializing in:
- **Full-Stack Engineering:** Django REST Framework, FastAPI, React, TypeScript, PostgreSQL, Docker, AWS
- **Artificial Intelligence & Machine Learning:** Deep Reinforcement Learning, Computer Vision, Vision Transformers (ViT), NLP, and Explainable AI (SHAP)
- **Research:** Author of accepted papers at IEEE conferences (ICDSBS 2026, ICCPCT 2026) focusing on IoT network attack detection and banknote forgery classification.

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
