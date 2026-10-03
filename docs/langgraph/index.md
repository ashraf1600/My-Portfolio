---
title: "Agentic AI using LangGraph — সম্পূর্ণ হ্যান্ডস-অন গাইড"
description: "CampusX-এর Agentic AI using LangGraph কোর্সের সম্পূর্ণ বাংলা ডকুমেন্টেশন। Foundations, Core LangGraph, Multi-Agent Systems এবং Production Deployment।"
---

# Agentic AI using LangGraph — মাস্টারক্লাস ডকুমেন্টেশন

স্বাগতম **"Agentic AI using LangGraph"** সম্পূর্ণ প্র্যাকটিক্যাল ডকুমেন্টেশনে! এই সিরিজটি বিশেষভাবে ডিজাইন করা হয়েছে সেই সমস্ত ডেভেলপার ও এআই ইঞ্জিনিয়ারদের জন্য, যারা চ্যাটবটের গণ্ডি পেরিয়ে স্বায়ত্তশাসিত (Autonomous), গোল-ড্রিভেন এবং প্রোডাকশন-রেডি মাল্টি-এজেন্ট সিস্টেম তৈরি করতে চান।

---

## 🎯 এই সিরিজের লক্ষ্য ও ব্যাপ্তি

সাধারণ Generative AI বা RAG অ্যাপ্লিকেশন শুধু তথ্যের উত্তর দিতে পারে, কিন্তু বাস্তব পৃথিবীর জটিল কাজগুলো সম্পন্ন করতে পারে না। এই সিরিজে আমরা শিখব কীভাবে **LangGraph** ব্যবহার করে স্টেটফুল (Stateful), সাইক্লিক (Cyclic) এবং সেলফ-কারেক্টিং AI এজেন্ট আর্কিটেকচার তৈরি করতে হয়।

```mermaid
flowchart LR
    classDef m1 fill:#2563EB,color:#fff,stroke:#1E40AF
    classDef m2 fill:#059669,color:#fff,stroke:#047857
    classDef m3 fill:#7C3AED,color:#fff,stroke:#6D28D9
    classDef m4 fill:#D97706,color:#fff,stroke:#B45309
    classDef m5 fill:#0891B2,color:#fff,stroke:#0E7490
    classDef m6 fill:#DC2626,color:#fff,stroke:#B91C1C

    M1["Module 1<br/>Foundations"]:::m1 --> M2["Module 2<br/>LangGraph Core"]:::m2
    M2 --> M3["Module 3<br/>Advanced Concepts"]:::m3
    M3 --> M4["Module 4<br/>Building Agents"]:::m4
    M4 --> M5["Module 5<br/>Agentic RAG"]:::m5
    M5 --> M6["Module 6<br/>Production"]:::m6
```

---

## 📚 কোর্স মডিউল ও সিলেবাস

### Module 1 — Foundations of Agentic AI
* [১. Generative AI থেকে Agentic AI এর বিবর্তন](./evolution-from-genai-to-agentic-ai.md)
* *২. Anatomy of an AI Agent (Brain, Memory, Planning, Tools) — (শীঘ্রই আসছে)*

### Module 2 — LangGraph Fundamentals
* *Graph, State, Nodes এবং Edges এর পরিচিতি — (শীঘ্রই আসছে)*
* *StateGraph তৈরি ও কম্পাইলেশন — (শীঘ্রই আসছে)*

### Module 3 — Advanced LangGraph Concepts
* *Conditional Edges এবং Dynamic Routing — (শীঘ্রই আসছে)*
* *Human-in-the-loop (Checkpointer, Breakpoints) — (শীঘ্রই আসছে)*
* *Time Travel ও State Inspection — (শীঘ্রই আসছে)*

### Module 4 — Building AI Agents
* *ReAct Agent স্ক্র্যাচ থেকে তৈরি — (শীঘ্রই আসছে)*
* *Plan-and-Execute Architecture — (শীঘ্রই আসছে)*
* *Multi-Agent Collaboration ও Supervisor Architecture — (শীঘ্রই আসছে)*

### Module 5 — Agentic RAG Applications
* *Self-RAG (Self-Reflective RAG) — (শীঘ্রই আসছে)*
* *Adaptive RAG ও Query Routing — (শীঘ্রই আসছে)*
* *Corrective RAG (CRAG) — (শীঘ্রই আসছে)*

### Module 6 — Production & Deployment
* *LangGraph Studio ও LangSmith Tracing — (শীঘ্রই আসছে)*
* *LangServe / FastAPI ডিপ্লয়মেন্ট ও স্কেলিং — (শীঘ্রই আসছে)*

---

:::tip শেখার পূর্বশর্ত
এই কোর্সটি ইন্টারমিডিয়েট লেভেলের ডেভেলপারদের জন্য। পাইথন এবং সাধারণ LangChain বা LLM API সম্পর্কে প্রাথমিক ধারণা থাকলে সবচেয়ে দ্রুত বুঝতে পারবেন।
:::

👉 **প্রথম অধ্যায় শুরু করুন:** **[১. Generative AI থেকে Agentic AI এর বিবর্তন →](./evolution-from-genai-to-agentic-ai.md)**
