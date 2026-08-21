---
title: Environment Variables — Docker বাংলা গাইড
description: Docker-এ Environment Variables পরিচালনার সম্পূর্ণ গাইড — -e ফ্ল্যাগ, --env-file, প্রেসিডেন্স বা অগ্রাধিকার নিয়ম, পাইথন FastAPI-তে ইন্টিগ্রেশন এবং সিকিউরিটি বেস্ট প্র্যাকটিস।
head:
  - - meta
    - name: keywords
      content: docker environment variables bangla, docker -e flag, docker --env-file, docker env precedence, docker secrets vs env
---

# 🔐 Environment Variables

## Environment Variables কী? (What)

**Environment Variables (পরিবেশ ভেরিয়েবল বা Env Vars)** হলো এমন কিছু ডায়নামিক Key-Value পেয়ার (যেমন `DATABASE_URL=postgresql://...`, `DEBUG=True`), যা অ্যাপ্লিকেশনের সোর্স কোডে হার্ডকোড না করে রানটাইমে অপারেটিং সিস্টেম বা ডকার কন্টেইনারের পরিবেশে ইনজেক্ট করা হয়।

সহজ ভাষায়: ডকার ইমেজকে একটি "জেনেরিক প্যাকেজ" হিসেবে তৈরি রাখা হয়, আর কন্টেইনার চালু করার সময় এনভায়রনমেন্ট ভেরিয়েবলের মাধ্যমে তাকে বলা হয়— "তুমি এখন ডেভেলপমেন্ট ডাটাবেজে কানেক্ট হও" অথবা "তুমি এখন প্রোডাকশন সিক্রেট কি ব্যবহার করো"।

:::info The 12-Factor App দর্শন
মডার্ন ক্লাউড-নেটিভ সফটওয়্যার আর্কিটেকচারের ৩ নম্বর নিয়ম হলো: **"Store config in the environment"**। কোড এবং কনফিগারেশনকে সম্পূর্ণ আলাদা রাখাই ডকারের স্ট্যান্ডার্ড নিয়ম।
:::

---

## কেন Environment Variables অপরিহার্য? (Why)

```
❌ কোড বা ডকারফাইলে পাসওয়ার্ড লিখে রাখলে (Before):
   - ডাটাবেজ পাসওয়ার্ড বা OpenAI API Key সোর্স কোডে থাকলে Git বা GitHub-এ ফাঁস হয়ে যায়
   - ডকারফাইলে `ENV PASSWORD=123` লিখলে `docker history` দিয়ে যে কেউ তা বের করে নিতে পারে
   - Dev, Staging এবং Production-এর জন্য বারবার আলাদা আলাদা ইমেজ বিল্ড করতে হয়

✅ Environment Variables ব্যবহার করলে (After):
   - একই ডকার ইমেজ লোকাল ল্যাপটপ এবং প্রোডাকশন ক্লাউডে বিভিন্ন কনফিগারেশনে চলে
   - পাসওয়ার্ড বা এপিআই কি কখনো ইমেজের লেয়ারে সেভ হয় না — সম্পূর্ণ নিরাপদ
   - `.env` ফাইলের মাধ্যমে মাত্র এক ফাইলে সমস্ত কনফিগারেশন সুশৃঙ্খলভাবে রাখা যায়
```

---

## Analogy — পরিচয়পত্র ও কনফিগারেশন ব্যাজের উপমা 🏷️

Environment Variables-কে একজন **কর্মচারীর আইডি কার্ড ও ডিপার্টমেন্ট ব্যাজ**-এর সাথে তুলনা করা যায়:

- **Docker Image** = একজন দক্ষ নতুন কর্মী (যার কাজ করার ক্ষমতা আছে, কিন্তু সে জানে না সে কোন ডেস্কে বসবে)।
- **Environment Variables** = অফিসে প্রবেশের সময় তার গলায় ঝুলিয়ে দেওয়া আইডি কার্ড — যাতে লেখা আছে:
  - `DEPARTMENT=Artificial_Intelligence`
  - `ROOM_NO=304`
  - `DATABASE_ACCESS_KEY=Secret_XYZ`

কর্মীকে (Image) পরিবর্তন না করেই শুধু গলার ব্যাজ (Env Vars) বদলে তাকে ডেভেলপমেন্ট শাখা থেকে প্রোডাকশন শাখায় বদলি করা যায়!

---

## How it Works — কনফিগারেশন ইনজেকশন মেকানিজম

```mermaid
graph TB
    subgraph "Host Machine"
        CLI["🖥️ docker run -e DATABASE_URL=..."]
        EnvFile["📄 .env File<br/>(SECRET_KEY=...)"]
    end

    subgraph "Docker Engine"
        Daemon["🐳 Docker Daemon (dockerd)"]
    end

    subgraph "Running Container"
        subgraph "Container OS Environment"
            ENV_VARS["Key-Value Store<br/>os.environ"]
        end

        subgraph "NexGen FastAPI Application"
            PyApp["🐍 main.py / Pydantic Settings<br/>os.getenv('DATABASE_URL')"]
        end
        
        ENV_VARS --> PyApp
    end

    CLI --> Daemon
    EnvFile --> Daemon
    Daemon -->|"Injects at Container Spawn"| ENV_VARS
```

---

## ডকারে Environment Variables পাস করার ৪টি উপায়

ডকারে প্রধানত ৪টি উপায়ে ভেরিয়েবল সেট করা যায়:

### ১. ইনলাইন CLI ফ্ল্যাগ (`-e` বা `--env`)
সরাসরি কমান্ড লাইনে ভেরিয়েবল পাস করা:
```bash
docker run -e KEY=VALUE -e KEY2=VALUE2 ...
```

### ২. হোস্ট এনভায়রনমেন্ট থেকে সরাসরি পাস করা
যদি আপনার হোস্ট টার্মিনালে ইতিমধ্যে ভেরিয়েবল এক্সপোর্ট করা থাকে, তবে মান উল্লেখ না করে শুধু কী (Key) পাস করলেই ডকার হোস্ট থেকে ভ্যালু নিয়ে নেয়:
```bash
export OPENAI_API_KEY="sk-proj-12345"
docker run -e OPENAI_API_KEY ...
```

### ৩. এনভায়রনমেন্ট ফাইল ব্যবহার করে (`--env-file`)
একটি ফাইলে সমস্ত ভেরিয়েবল লিখে রেখে পুরো ফাইলটি কন্টেইনারে লোড করা:
```bash
docker run --env-file .env ...
```

### ৪. ডকারফাইলে ডিফল্ট ভ্যালু সেট করে (`ENV`)
ডকারফাইলে ডিফল্ট বা ফলব্যাক মান ডিফাইন করে রাখা (যা রানটাইমে ওভাররাইড করা যায়):
```dockerfile
ENV PORT=8000
ENV ENVIRONMENT=production
```

---

## Precedence Rule — অগ্রাধিকার বা ওভাররাইডের নিয়ম ⚖️

যদি একই ভেরিয়েবল একাধিক জায়গায় ডিফাইন করা থাকে, তবে ডকার কোনটিকে প্রাধান্য দেবে?

```mermaid
graph LR
    P1["1. CLI Flag (-e)<br/>(সর্বোচ্চ অগ্রাধিকার 🥇)"] --> P2["2. --env-file File<br/>(দ্বিতীয় অগ্রাধিকার 🥈)"]
    P2 --> P3["3. Dockerfile ENV<br/>(সর্বনিম্ন / ডিফল্ট 🥉)"]

    style P1 fill:#D4EDDA,stroke:#28A745,stroke-width:2px
    style P2 fill:#FFF3CD,stroke:#FFA500
    style P3 fill:#E6F3FF,stroke:#0066CC
```

:::tip নিয়ম মনে রাখুন
কমান্ড লাইনে দেওয়া **`-e` ফ্ল্যাগ সর্বদা বিজয়ী হয়**। এটি `--env-file` এবং ডকারফাইলের `ENV` নির্দেশিকা দুটোকেই ওভাররাইড করে দেয়।
:::

---

## Hands-on: আমাদের প্রজেক্টে Environment Variables অনুশীলন

আমাদের **NexGen AI** প্রজেক্টের FastAPI ব্যাকএন্ডে কীভাবে এনভায়রনমেন্ট ভেরিয়েবল সেট ও রিড করতে হয় তা বাস্তবে দেখি:

### ১. ইনলাইন `-e` ফ্ল্যাগ দিয়ে ভেরিয়েবল পাস করা

```bash
# আমাদের পাইথন কন্টেইনারে এপিআই কি ও মোড পাস করি
docker container run --rm \
  --name nexgen-env-test \
  -e APP_NAME="NexGen AI Core" \
  -e ENVIRONMENT="development" \
  -e DEBUG="True" \
  python:3.12-slim \
  python3 -c "import os; print(f'Connected to: {os.getenv(\"APP_NAME\")} in [{os.getenv(\"ENVIRONMENT\")}] mode (Debug={os.getenv(\"DEBUG\")})')"
```

**বাস্তব Output:**
```text
Connected to: NexGen AI Core in [development] mode (Debug=True)
```

---

### ২. `.env` ফাইলের মাধ্যমে প্রফেশনাল কনফিগারেশন

প্রোডাকশন বা বড় প্রজেক্টে ২০-৩০টি ভেরিয়েবল টার্মিনালে লেখা অসম্ভব। তাই আমরা একটি `.env` ফাইল তৈরি করি:

```bash
# হোস্টে একটি .env ফাইল বানাই
cat << 'EOF' > .env
# NexGen AI Configuration
APP_NAME=NexGen AI Enterprise
PORT=8000
ENVIRONMENT=production
DATABASE_URL=postgresql://postgres:nexgenpass@nexgen-postgres:5432/nexgendb
OPENAI_API_KEY=sk-test-ai-key-12345
EOF
```

```bash
# --env-file দিয়ে কন্টেইনার রান করি
docker container run -d \
  --name nexgen-api-env \
  --env-file .env \
  -p 8000:8000 \
  python:3.12-slim \
  python3 -m http.server 8000
```

```bash
# কন্টেইনারের ভেতরের সমস্ত এনভায়রনমেন্ট ভেরিয়েবল প্রিন্ট করে দেখি
docker container exec nexgen-api-env printenv
```

**বাস্তব Output:**
```text
PATH=/usr/local/bin:/usr/local/sbin:...
HOSTNAME=3a4b5c6d7e8f
APP_NAME=NexGen AI Enterprise
PORT=8000
ENVIRONMENT=production
DATABASE_URL=postgresql://postgres:nexgenpass@nexgen-postgres:5432/nexgendb
OPENAI_API_KEY=sk-test-ai-key-12345
HOME=/root
```
*(দেখলেন? `.env` ফাইলের সব ভেরিয়েবল স্বয়ংক্রিয়ভাবে কন্টেইনারের ভেতরে চলে এসেছে!)*

---

### ৩. Python FastAPI-তে Env Vars রিড করার স্ট্যান্ডার্ড কোড

FastAPI অ্যাপ্লিকেশনে Pydantic Settings দিয়ে ভেরিয়েবল পড়ার স্ট্যান্ডার্ড উপায়:

```python
# app/config.py
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "NexGen AI"
    environment: str = "development"
    database_url: str
    openai_api_key: str

    class Config:
        env_file = ".env"

# ইনস্ট্যান্স তৈরি
settings = Settings()

# ব্যবহারের উদাহরণ:
# print(settings.database_url)
```
*(ডকার থেকে আসা ভেরিয়েবলগুলো Pydantic স্বয়ংক্রিয়ভাবে টাইপ ভ্যালিডেশন করে অ্যাপ্লিকেশনে সরবরাহ করে।)*

---

## Comparison Table — ভেরিয়েবল পাস করার পদ্ধতির তুলনা

| পদ্ধতি | সিনট্যাক্স | সুবিধা | অসুবিধা / ঝুঁকি |
|---|---|---|---|
| **CLI `-e`** | `docker run -e KEY=VAL` | কুইক টেস্টিং ও ওভাররাইড করার জন্য সেরা | শেল হিস্ট্রিতে (`history`) পাসওয়ার্ড থেকে যায় |
| **`--env-file`** | `docker run --env-file .env` | পরিচ্ছন্ন, এক ফাইলে সব থাকে, টিম ফ্রেন্ডলি | `.env` ফাইল গিটহাবে ভুলবশত পুশ হওয়ার ঝুঁকি |
| **Dockerfile `ENV`** | `ENV PORT=8000` | ডিফল্ট কনফিগারেশন সেটের জন্য ভালো | ⚠️ **ইমেজে পাসওয়ার্ড হার্ডকোড হয়ে ফাঁস হতে পারে** |
| **Docker Secrets** | `docker secret create` | প্রোডাকশনে এন্টারপ্রাইজ গ্রেড সিকিউরিটি | শুধুমাত্র Swarm / K8s এ সাপোর্ট করে |

---

## Security Alert — ডকার ইমেজে সিক্রেট ফাঁস হওয়া রোধ 🛡️

### কেন ডকারফাইলে পাসওয়ার্ড বা সিক্রেট `ENV` দিয়ে রাখা আত্মঘাতী?

ধরুন আপনি ডকারফাইলে এভাবে লিখলেন:
```dockerfile
# ❌ মারাত্মক ভুল!
ENV DATABASE_PASSWORD="SuperSecretPassword123"
```
এখন আপনি ইমেজ বিল্ড করে ডকার হাবে পুশ করলেন। 

যে কেউ আপনার ইমেজ পুল করে যদি এই কমান্ড দেয়:
```bash
docker image history --no-trunc <your-image>
# অথবা:
docker image inspect <your-image>
```
তবে সে মুহূর্তের মধ্যে আপনার সমস্ত পাসওয়ার্ড ও সিক্রেট প্লেইন টেক্সটে দেখতে পাবে!

```mermaid
graph LR
    BadDF["❌ Dockerfile ENV PASSWORD=123"] --> Built["📀 Docker Image Layer"]
    Built --> Public["☁️ Docker Hub"]
    Public --> Hacker["🕵️ Attacker runs 'docker history' ➔ 💥 Password Leaked!"]

    style BadDF fill:#F8D7DA,stroke:#DC3545
    style Hacker fill:#F8D7DA,stroke:#DC3545
```

:::danger গোল্ডেন সিকিউরিটি রুল
**কখনো কোনো পাসওয়ার্ড, টোকেন, প্রাইভেট কি বা সিক্রেট ডকারফাইলে বা ইমেজের ভেতর রাখবেন না।**
সবসময় রানটাইমে `-e` অথবা `--env-file` এর মাধ্যমে কন্টেইনারে ইনজেক্ট করুন।
:::

---

## Common Mistakes — নতুনদের সাধারণ ভুল

### ১. `.gitignore` ফাইলে `.env` যোগ না করা
❌ **ভুল:** `.env` ফাইল গিট কমিট করে পাবলিক গিটহাব রিপোজিটরিতে পাঠিয়ে দেওয়া (বটরা সেকেন্ডে এপিআই কি চুরি করে ফেলে)।
✅ **সঠিক:** প্রজেক্ট শুরুর প্রথমেই `.gitignore` ফাইলে `.env` লিখে দিন এবং টিমের জন্য ডামি ভ্যালুসহ একটি `.env.example` ফাইল রাখুন।

### ২. `.env` ফাইলে স্পেস বা কোটেশন নিয়ে ভুল
❌ **ভুল:** `.env` ফাইলে এভাবে লেখা: `KEY = "VALUE "` (স্পেস দিলে ডকার ভ্যালুর সাথে স্পেসসহ লোড করে ফেলে)।
✅ **সঠিক:** কোনো স্পেস ছাড়া লিখুন: `KEY=VALUE`।

### ৩. `docker inspect` দিয়ে যে কেউ Env দেখতে পারে তা না জানা
❌ **ভুল:** ভাবা যে কন্টেইনারের ভেতরের Env Vars কেউ দেখতে পায় না।
✅ **সঠিক:** হোস্টের রুট ইউজার `docker inspect <container>` চালিয়ে সমস্ত Env Vars দেখতে পারে। তাই হোস্ট সার্ভারের রুট অ্যাক্সেস সর্বদা সুরক্ষিত রাখুন।

---

## Best Practices

1. **একটি `.env.example` ফাইল মেইনটেইন করুন**:
   আসল ভ্যালু ছাড়া শুধু ভেরিয়েবলের তালিকা গিটহাবে শেয়ার করুন:
   ```text
   # .env.example
   PORT=8000
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   OPENAI_API_KEY=your_key_here
   ```
2. **ডকারফাইলে শুধুমাত্র নন-সেনসিটিভ ডিফল্ট রাখুন**: যেমন `ENV PORT=8000` বা `ENV PYTHONUNBUFFERED=1`।
3. **Pydantic Settings বা `python-dotenv` ব্যবহার করুন**: অ্যাপ্লিকেশনের ভেতরে ম্যানুয়াল `os.environ["KEY"]` এর বদলে টাইপ-সেফ ভ্যালিডেটর ব্যবহার করুন।
4. **CI/CD তে সিক্রেট ম্যানেজমেন্ট ব্যবহার করুন**: GitHub Actions Secrets বা AWS Secrets Manager থেকে ভেরিয়েবল কন্টেইনারে পাস করুন।

---

## Interview Questions ও Answers

### ১. Dockerfile-এর `ENV` এবং `ARG` নির্দেশিকার মধ্যে পার্থক্য কী?

**উত্তর:** 
- **`ARG` (Build-time Variable):** এটি শুধুমাত্র ইমেজ **বিল্ড করার সময়** (`docker build`) সক্রিয় থাকে। ইমেজ বিল্ড শেষ হয়ে গেলে এর অস্তিত্ব বিলীন হয়ে যায়। কন্টেইনার চালু থাকা অবস্থায় এর কোনো মান পাওয়া যায় না।
- **`ENV` (Runtime Environment Variable):** এটি ইমেজ বিল্ড করার সময় এবং পরবর্তীতে ইমেজ থেকে যখনই কন্টেইনার চালু করা হয় (**রানটাইমে**), উভয় সময়ই কন্টেইনারের ওএস পরিবেশে সক্রিয় থাকে।

---

### ২. ডকারে একই এনভায়রনমেন্ট ভেরিয়েবল `-e`, `--env-file` এবং ডকারফাইলে থাকলে কোনটি কার্যকর হবে?

**উত্তর:** ডকার একটি নির্দিষ্ট প্রেসিডেন্স বা অগ্রাধিকার নিয়ম মেনে চলে:
১. **`-e` বা `--env` ফ্ল্যাগ (সর্বোচ্চ অগ্রাধিকার):** এটি সবার উপরে থাকে এবং অন্য সব কিছুকে ওভাররাইড করে।
২. **`--env-file` (দ্বিতীয় অগ্রাধিকার):** ডকারফাইলের মানকে ওভাররাইড করে কিন্তু `-e` এর নিচে থাকে।
৩. **Dockerfile `ENV` (সর্বনিম্ন অগ্রাধিকার):** এটি কেবল ডিফল্ট বা ফলব্যাক মান হিসেবে কাজ করে।

---

### ৩. কেন ডকার ইমেজে সিক্রেট বা পাসওয়ার্ড সেভ করা অনিরাপদ?

**উত্তর:** ডকার ইমেজ একটি স্তরভিত্তিক (Layered) রিড-অনলি ফাইলসিস্টেম। ডকারফাইলে `ENV` বা `RUN` দিয়ে কোনো পাসওয়ার্ড লিখলে তা চিরতরে ঐ নির্দিষ্ট লেয়ারের মেটাডেটাতে জমা হয়ে যায়। 
পরবর্তীতে `docker image inspect` অথবা `docker image history` কমান্ড দিলে যে কেউ সম্পূর্ণ প্লেইন টেক্সটে সেই গোপন পাসওয়ার্ড পড়ে ফেলতে পারে। এমনকি ডকারফাইল থেকে ফাইল ডিলিট করলেও পূর্বের লেয়ারে সেটি অক্ষত থাকে। তাই সিক্রেট সবসময় রানটাইমে ইনজেক্ট করতে হয়।

---

### ৪. হোস্ট টার্মিনালের কোনো ভেরিয়েবল ভ্যালু ছাড়া কীভাবে সরাসরি কন্টেইনারে পাস করা যায়?

**উত্তর:** যদি হোস্ট মেশিনে কোনো ভেরিয়েবল ইতিমধ্যে এক্সপোর্ট করা থাকে (যেমন `export DB_PASS=secret123`), তবে `docker run` কমান্ডে ভ্যালু না লিখে শুধু কী (Key) উল্লেখ করলেই ডকার হোস্টের মানটি কন্টেইনারে কপি করে নেয়:
```bash
docker run -e DB_PASS my-image
```
এতে কমান্ড লাইনে বা ব্যাশ হিস্ট্রিতে সরাসরি গোপন পাসওয়ার্ড লিখতে হয় না।

---

## Summary

| বিষয় | কমান্ড / মেথড | ব্যবহার ও অগ্রাধিকার |
|---|---|---|
| **ইনলাইন পাস** | `docker run -e KEY=VAL` | সর্বোচ্চ অগ্রাধিকার (টেস্টিং ও ওভাররাইড) |
| **ফাইল থেকে লোড** | `docker run --env-file .env` | মাঝারি অগ্রাধিকার (প্রোডাকশন ও টিম কনফিগ) |
| **ডকারফাইল ডিফল্ট** | `ENV KEY=VAL` | সর্বনিম্ন অগ্রাধিকার (নন-সেনসিটিভ ডিফল্ট) |
| **হোস্ট পাস-থ্রু** | `docker run -e KEY` | হোস্ট থেকে ভ্যালু স্বয়ংক্রিয়ভাবে ধার নেয় |
| **মান পরীক্ষা** | `docker exec <name> printenv` | কন্টেইনারের সমস্ত ভেরিয়েবল প্রদর্শন করে |
| **মূল সিকিউরিটি রুল** | `.gitignore` এ `.env` রাখা | ইমেজে কখনো পাসওয়ার্ড হার্ডকোড না করা |

---

## পরবর্তী ধাপ

আমরা সফলভাবে এনভায়রনমেন্ট ভেরিয়েবল ও কনফিগারেশন ম্যানেজমেন্ট শিখে ফেলেছি। এবার আমরা পৌঁছে গেছি **Level 1: Foundation-এর চূড়ান্ত পর্বে** — **Docker Hub** (`docker/hub.md`) — যেখানে শিখব কীভাবে ডকার হাবে অ্যাকাউন্ট খুলে আমাদের তৈরি করা ইমেজ পুশ করতে হয়, রিপোজিটরি ম্যানেজ করতে হয় এবং অন্যদের সাথে শেয়ার করতে হয়।
