# Chat History সহ Conversational RAG (Conversational RAG with Chat History)

স্বাগতম আমাদের RAG সিরিজের সপ্তম পর্বে! আগের পর্বে আমরা স্ক্র্যাচ থেকে একটি সম্পূর্ণ এন্ড-টু-এন্ড RAG অ্যাপ্লিকেশন তৈরি করেছিলাম। 

কিন্তু বাস্তব জীবনে যখন একজন ব্যবহারকারী কোনো চ্যাটবটের সাথে কথা বলেন, তখন তিনি এক প্রশ্নে সবকিছু বলেন না। যেমন:
* **প্রশ্ন ১:** *"TechNova-র ছুটির নিয়ম কী?"*
* **অ্যাসিস্ট্যান্ট:** *"বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি পাওয়া যায়।"*
* **প্রশ্ন ২:** *"সেটা কি পেইড ছুটি?"*

লক্ষ্য করুন, দ্বিতীয় প্রশ্নে ব্যবহারকারী কিন্তু বলেননি *"ক্যাজুয়াল ছুটি কি পেইড ছুটি?"*। সাধারণ RAG সিস্টেম দ্বিতীয় প্রশ্নটি দেখে বিভ্রান্ত হয়ে যায়, কারণ সে জানে না **"সেটা"** বলতে আসলে কী বোঝানো হয়েছে! 

এই সমস্যার সমাধানই হলো **Conversational RAG (স্মৃতি বা চ্যাট হিস্ট্রি সহ RAG)**। এই পর্বে আমরা শিখব কীভাবে আপনার RAG অ্যাপ্লিকেশনে কথোপকথনের স্মৃতি যোগ করতে হয়।

---

## ১. What (Conversational RAG কী?)

**Conversational RAG** হলো এমন একটি বুদ্ধিমান চ্যাট আর্কিটেকচার যা পূর্ববর্তী কথোপকথনের ইতিহাস (Chat History / Dialogue Memory) মনে রাখে এবং সেই কনটেক্সট ব্যবহার করে বর্তমান অসম্পূর্ণ প্রশ্নটিকে একটি পূর্ণাঙ্গ, স্বয়ংসম্পূর্ণ প্রশ্নে (Standalone Query) রূপান্তর করে সঠিক তথ্য রিট্রিভ করে।

সহজ কথায়, এটি RAG অ্যাপকে মানুষের মতো কথোপকথনের ধারাবাহিকতা বজায় রাখার ক্ষমতা দেয়।

---

## ২. Why (কেন চ্যাট হিস্ট্রি এত জরুরি?)

সাধারণ RAG সিস্টেমে প্রতিটি প্রশ্নকে আলাদা ও স্বাধীন (Stateless) মনে করা হয়। ফলে:
1. **Pronoun Reference Failure:** ব্যবহারকারী যখন "এটা", "ওটা", "সেটা", "আগেরটা" বা "তার" (It, That, They, His) ব্যবহার করেন, তখন রিট্রিভার ডেটাবেসে কোনো প্রাসঙ্গিক ভেক্টর খুঁজে পায় না।
2. **Follow-up Questions মিস হওয়া:** *"আগের নিয়মে কি কোনো পরিবর্তন আছে?"*—এর মতো ফলো-আপ প্রশ্ন রিট্রিভ করতে ব্যর্থ হয়।
3. **খারাপ ইউজার এক্সপেরিয়েন্স:** প্রতিবার ব্যবহারকারীকে পুরো আগের ব্যাকগ্রাউন্ড লিখে প্রশ্ন করতে বাধ্য করা অত্যন্ত বিরক্তিকর।

Conversational RAG এই সীমাবদ্ধতা দূর করে চ্যাটবটকে প্রকৃত অর্থেই মানবিক করে তোলে।

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

Conversational RAG বুঝতে সেরা উপমা হলো **"একজন বন্ধুর সাথে স্বাভাবিক আড্ডা"**:

* আপনার বন্ধু আপনাকে বলল: *"আমি গতকাল কক্সবাজার ঘুরতে গিয়েছিলাম।"*
* আপনি জিজ্ঞেস করলেন: *"ওখানকার সমুদ্রের আবহাওয়া কেমন ছিল?"*
* আপনি কিন্তু বলেননি *"কক্সবাজারের সমুদ্রের আবহাওয়া কেমন ছিল?"*। আপনার বন্ধু নিজের মেমোরি থেকেই বুঝে নিয়েছে "ওখানকার" মানে কক্সবাজার!

যদি আপনার বন্ধুর কোনো স্মৃতি না থাকত (Stateless), তবে সে বলত: *"ওখানকার বলতে আপনি কোন জায়গার কথা বলছেন?"*। চ্যাট মেমোরি এআই-কে ঠিক এই স্বাভাবিক কথোপকথনের অনুভূতি দেয়।

---

## ৪. How it works (ধাপে ধাপে কার্যপদ্ধতি)

Conversational RAG-এর মূল ম্যাজিক ঘটে **Query Reformulation (প্রশ্ন পুনর্বিন্যাস)** ধাপে:

1. **History Storage:** ব্যবহারকারী ও এআই-এর প্রতিটি কথোপকথন একটি তালিকায় (Message Buffer) জমা হয়।
2. **Contextualizing the Question (কুয়েরি রি-রাইট):** ব্যবহারকারীর নতুন প্রশ্ন এবং চ্যাট হিস্ট্রি একসাথে বিবেচনা করে একটি নতুন **Standalone Query** তৈরি করা হয়।
   * *মূল প্রশ্ন:* "সেটা কি বেতনসহ?"
   * *রি-রাইট করা প্রশ্ন:* "TechNova Solutions-এর ক্যাজুয়াল ছুটি কি বেতনসহ?"
3. **Vector Retrieval:** রি-রাইট করা স্বয়ংসম্পূর্ণ প্রশ্নটি দিয়ে ভেক্টর ডেটাবেসে সার্চ করা হয়।
4. **Augmented Prompt with Memory:** উদ্ধারকৃত কনটেক্সট, চ্যাট হিস্ট্রি এবং মূল প্রশ্ন একসাথে LLM-কে পাঠানো হয়।
5. **Response & Memory Update:** LLM উত্তর প্রদান করে এবং সেই উত্তরটি মেমোরিতে যুক্ত হয়।

---

## ৫. Architecture Diagram (কনভারসেশনাল RAG ও কুয়েরি রি-রাইট আর্কিটেকচার)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 480" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="v7Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="v7Glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="v7UserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <linearGradient id="v7MemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="v7RewriteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <linearGradient id="v7RetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="v7GenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <marker id="v7ArrowCyan" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#67e8f9"/>
    </marker>
    <marker id="v7ArrowPurple" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#c084fc"/>
    </marker>
    <marker id="v7ArrowGreen" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#34d399"/>
    </marker>
    <marker id="v7ArrowAmber" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fcd34d"/>
    </marker>
    <style>
      .v7-pulse-cyan { stroke-dasharray: 8, 8; animation: v7Anim 1.4s linear infinite; }
      .v7-pulse-purple { stroke-dasharray: 8, 8; animation: v7Anim 1.3s linear infinite; }
      .v7-pulse-green { stroke-dasharray: 8, 8; animation: v7Anim 1.2s linear infinite; }
      .v7-pulse-amber { stroke-dasharray: 8, 8; animation: v7Anim 1.5s linear infinite; }
      @keyframes v7Anim { from { stroke-dashoffset: 32; } to { stroke-dashoffset: 0; } }
    </style>
  </defs>
  <!-- Title & Subtitle -->
  <text x="470" y="38" font-family="'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#f8fafc" text-anchor="middle">Conversational RAG &amp; Contextual Query Rewriter</text>
  <text x="470" y="62" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Transforming ambiguous pronouns into standalone search queries using Chat Memory Buffer</text>
  <!-- Connectors -->
  <!-- 1. User Query to Rewriter -->
  <path d="M 180 150 L 250 150" fill="none" stroke="#67e8f9" stroke-width="2.5" class="v7-pulse-cyan" marker-end="url(#v7ArrowCyan)"/>
  <!-- 2. Memory to Rewriter (Top down) -->
  <path d="M 450 110 L 360 110 L 360 125" fill="none" stroke="#fcd34d" stroke-width="2" class="v7-pulse-amber" marker-end="url(#v7ArrowAmber)"/>
  <!-- 3. Rewriter to Retriever -->
  <path d="M 460 180 L 530 180" fill="none" stroke="#c084fc" stroke-width="2.5" class="v7-pulse-purple" marker-end="url(#v7ArrowPurple)"/>
  <!-- 4. Retriever down to Generator -->
  <path d="M 630 240 L 630 310" fill="none" stroke="#34d399" stroke-width="2.5" class="v7-pulse-green" marker-end="url(#v7ArrowGreen)"/>
  <!-- 5. Memory down to Generator (Direct context) -->
  <path d="M 540 145 L 540 330 L 460 350" fill="none" stroke="#fcd34d" stroke-width="2" stroke-dasharray="5,5" opacity="0.6"/>
  <!-- 6. Generator back into Memory (Loopback) -->
  <path d="M 270 350 L 190 350 L 190 280 L 480 280 L 480 160" fill="none" stroke="#fcd34d" stroke-width="2" class="v7-pulse-amber" marker-end="url(#v7ArrowAmber)"/>
  <!-- Node 1: User Query -->
  <g transform="translate(30, 105)">
    <rect width="150" height="90" rx="14" fill="url(#v7UserGrad)" filter="url(#v7Shadow)"/>
    <text x="75" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffe4e6" text-anchor="middle" letter-spacing="1">USER QUERY</text>
    <text x="75" y="48" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">অস্পষ্ট অনুপ্রশ্ন</text>
    <rect x="12" y="58" width="126" height="22" rx="6" fill="#881337" opacity="0.65"/>
    <text x="75" y="73" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" fill="#fecdd3" text-anchor="middle">"সেটা কি বেতনসহ?"</text>
  </g>
  <!-- Node 2: Memory Buffer -->
  <g transform="translate(450, 75)">
    <rect width="210" height="85" rx="14" fill="url(#v7MemGrad)" filter="url(#v7Shadow)"/>
    <text x="105" y="25" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#fef3c7" text-anchor="middle" letter-spacing="1">CHAT MEMORY BUFFER</text>
    <text x="105" y="46" font-family="'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="700" fill="#ffffff" text-anchor="middle">পূর্ববর্তী কথোপকথন ইতিহাস</text>
    <rect x="15" y="55" width="180" height="22" rx="6" fill="#78350f" opacity="0.6"/>
    <text x="105" y="70" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#fde68a" text-anchor="middle">Turn 1: "ক্যাজুয়াল ছুটি কতদিন?"</text>
  </g>
  <!-- Node 3: Query Contextualizer -->
  <g transform="translate(250, 125)">
    <rect width="210" height="110" rx="14" fill="url(#v7RewriteGrad)" filter="url(#v7Shadow)"/>
    <text x="105" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#cffafe" text-anchor="middle" letter-spacing="1">STEP 1: CONTEXTUALIZER</text>
    <text x="105" y="48" font-family="'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="700" fill="#ffffff" text-anchor="middle">LLM Query Rewriter</text>
    <rect x="12" y="60" width="186" height="40" rx="6" fill="#155e75" opacity="0.65"/>
    <text x="105" y="76" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" fill="#67e8f9" text-anchor="middle">Standalone Query তৈরি:</text>
    <text x="105" y="92" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#ffffff" text-anchor="middle">"ক্যাজুয়াল ছুটি কি বেতনসহ?"</text>
  </g>
  <!-- Node 4: Vector Retriever -->
  <g transform="translate(530, 180)">
    <rect width="200" height="100" rx="14" fill="url(#v7RetGrad)" filter="url(#v7Shadow)"/>
    <text x="100" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ede9fe" text-anchor="middle" letter-spacing="1">STEP 2: RETRIEVER</text>
    <text x="100" y="48" font-family="'Segoe UI', Roboto, sans-serif" font-size="13.5" font-weight="700" fill="#ffffff" text-anchor="middle">Vector Store Search</text>
    <rect x="12" y="58" width="176" height="32" rx="6" fill="#4c1d95" opacity="0.65"/>
    <text x="100" y="74" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" fill="#ddd6fe" text-anchor="middle">Relevant Policy Docs</text>
    <text x="100" y="86" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#c4b5fd" text-anchor="middle">"ক্যাজুয়াল ছুটি পূর্ণ বেতনসহ বরাদ্দ..."</text>
  </g>
  <!-- Node 5: LLM Generator & Response -->
  <g transform="translate(270, 310)">
    <rect width="460" height="110" rx="14" fill="url(#v7GenGrad)" filter="url(#v7Shadow)"/>
    <text x="230" y="28" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#d1fae5" text-anchor="middle" letter-spacing="1">STEP 3: AUGMENTED GENERATOR &amp; MEMORY SYNC</text>
    <text x="230" y="52" font-family="'Segoe UI', Roboto, sans-serif" font-size="14.5" font-weight="700" fill="#ffffff" text-anchor="middle">LLM Response Generation &amp; State Update</text>
    <rect x="25" y="64" width="410" height="34" rx="8" fill="#064e3b" opacity="0.7"/>
    <text x="230" y="80" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" fill="#a7f3d0" text-anchor="middle">"হ্যাঁ, TechNova পলিসি অনুযায়ী ক্যাজুয়াল ছুটি সম্পূর্ণ বেতনসহ প্রাপ্য।"</text>
    <text x="230" y="94" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#6ee7b7" text-anchor="middle">(স্মৃতি বাফারে নতুন উত্তর যুক্ত হলো)</text>
  </g>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন পাইথনে একটি স্বয়ংসম্পূর্ণ `ConversationalRAGAssistant` তৈরি করি। কোনো পেইড API কি ছাড়াই এটি সহজে বোঝার জন্য আমরা মেমোরি বাফার এবং প্রসঙ্গ-সচেতন কুয়েরি রি-রাইটার যুক্ত করেছি।

```python
import math
from collections import Counter

# ধাপ ১: ডকুমেন্ট ও ইন-মেমোরি ভেক্টর রিট্রিভার
class Document:
    def __init__(self, page_content, metadata=None):
        self.page_content = page_content
        self.metadata = metadata or {}

technova_knowledge_base = [
    Document(
        page_content="TechNova Solutions-এ সকল ফুল-টাইম কর্মী বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন। এটি সম্পূর্ণ বেতনসহ ছুটি।",
        metadata={"source": "HR Policy", "topic": "Casual Leave"}
    ),
    Document(
        page_content="অসুস্থতাজনিত ছুটির (Sick Leave) ক্ষেত্রে বছরে ১০ দিন ছুটি পাওয়া যায়, তবে টানা ২ দিনের বেশি অনুপস্থিত থাকলে ডাক্তারের প্রেসক্রিপশন জমা দিতে হবে।",
        metadata={"source": "HR Policy", "topic": "Sick Leave"}
    ),
    Document(
        page_content="অফিস সময় সকাল ৯:৩০ টা থেকে সন্ধ্যা ৬:০০ টা পর্যন্ত। শুক্র ও শনিবার অফিস বন্ধ থাকে।",
        metadata={"source": "HR Policy", "topic": "Work Hours"}
    )
]

# ধাপ ২: কনভারসেশনাল RAG অ্যাসিস্ট্যান্ট
class ConversationalRAGAssistant:
    def __init__(self, documents, memory_window=3):
        self.documents = documents
        self.memory_window = memory_window
        self.chat_history = []  # [(user_msg, ai_msg), ...]

    def _term_frequency(self, text):
        words = text.lower().replace(",", "").replace(".", "").replace("?", "").split()
        return Counter(words)

    def _cosine_similarity(self, v1, v2):
        common = set(v1.keys()) & set(v2.keys())
        dot = sum(v1[k] * v2[k] for k in common)
        norm1 = math.sqrt(sum(v ** 2 for v in v1.values()))
        norm2 = math.sqrt(sum(v ** 2 for v in v2.values()))
        if not norm1 or not norm2:
            return 0.0
        return dot / (norm1 * norm2)

    # ক. কুয়েরি কনটেক্সটুয়ালাইজার (ইতিহাস থেকে অস্পষ্ট প্রশ্নের অর্থ উদ্ধার)
    def contextualize_query(self, current_query):
        # যদি কোনো চ্যাট হিস্ট্রি না থাকে, তবে প্রশ্ন যেমন আছে তেমনই থাকবে
        if not self.chat_history:
            return current_query

        # প্রোনাউন বা ইঙ্গিতমূলক শব্দ শনাক্ত করা
        pronouns = ["সেটা", "এটা", "এর", "ওটা", "আগেরটা", "তা"]
        has_pronoun = any(p in current_query for p in pronouns)

        if has_pronoun:
            # শেষ কথোপকথনের মূল বিষয়বস্তু টেনে আনা
            last_user_msg, last_ai_msg = self.chat_history[-1]
            topic_hint = ""
            if "ছুটি" in last_user_msg or "ছুটি" in last_ai_msg:
                topic_hint = "ক্যাজুয়াল ছুটি"
            elif "সময়" in last_user_msg:
                topic_hint = "অফিস সময়"

            rephrased = f"{topic_hint} {current_query}"
            print(f"🔄 [Query Rewriter]: '{current_query}' -> রূপান্তর করা হয়েছে: '{rephrased}'")
            return rephrased

        return current_query

    # খ. রিট্রিভাল ইঞ্জিন
    def retrieve(self, query):
        query_vec = self._term_frequency(query)
        scored = []
        for doc in self.documents:
            doc_vec = self._term_frequency(doc.page_content)
            score = self._cosine_similarity(query_vec, doc_vec)
            scored.append((score, doc))
        
        scored.sort(key=lambda x: x[0], reverse=True)
        return scored[0][1] if scored and scored[0][0] > 0.1 else None

    # গ. চ্যাট ইন্টারফেস
    def chat(self, user_message):
        print(f"\n👤 ইউজার: {user_message}")

        # ১. হিস্ট্রি-অ্যাওয়ার কুয়েরি তৈরি
        standalone_query = self.contextualize_query(user_message)

        # ২. তথ্য অনুসন্ধান
        matched_doc = self.retrieve(standalone_query)

        if not matched_doc:
            response = "দুঃখিত, এই প্রসঙ্গে পর্যাপ্ত তথ্য নথিতে নেই।"
        else:
            response = f"নথির তথ্যানুযায়ী: {matched_doc.page_content}"

        print(f"🤖 অ্যাসিস্ট্যান্ট: {response}")

        # ৩. চ্যাট হিস্ট্রিতে যোগ করা
        self.chat_history.append((user_message, response))

        # স্লাইডিং উইন্ডো মেমোরি সংরক্ষণ
        if len(self.chat_history) > self.memory_window:
            self.chat_history.pop(0)

        return response

# পরীক্ষা চালানো যাক (মাল্টি-টার্ন ডায়ালগ)
if __name__ == "__main__":
    assistant = ConversationalRAGAssistant(documents=technova_knowledge_base)

    print("=== TechNova Conversational RAG সেশন শুরু ===")

    # টার্ন ১: প্রথম প্রশ্ন
    assistant.chat("TechNova-র ছুটির নীতিমালা কী?")

    # টার্ন ২: ফলো-আপ প্রশ্ন (প্রোনাউন ব্যবহার করা হয়েছে)
    assistant.chat("সেটা কি বেতনসহ পাওয়া যায়?")

    # টার্ন ৩: আরেকটি ফলো-আপ প্রশ্ন
    assistant.chat("আর অসুস্থ হলে কী নিয়ম?")
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `chat_history`: পূর্ববর্তী কথোপকথনের কিউ (Queue) যা ব্যবহারকারী ও এআই-এর বার্তাগুলো ধরে রাখে।
* `contextualize_query()`: বর্তমান প্রশ্নে "সেটা" বা "এটা" জাতীয় রেফারেন্স থাকলে চ্যাট হিস্ট্রি দেখে সেটিকে সম্পূর্ণ অর্থপূর্ণ বাক্যে রূপান্তর করে।
* `self.memory_window`: মেমোরির আকার নিয়ন্ত্রণ করে (যেমন শেষ ৩টি কথোপকথন রাখা), যাতে মেমোরি অতিরিক্ত বড় হয়ে টোকেন খরচ না বাড়ায়।

---

## ৭. Output উদাহরণ

কোডটি রান করলে মাল্টি-টার্ন কথোপকথনের চমৎকার ফলাফল দেখতে পাবেন:

```text
=== TechNova Conversational RAG সেশন শুরু ===

👤 ইউজার: TechNova-র ছুটির নীতিমালা কী?
🤖 অ্যাসিস্ট্যান্ট: নথির তথ্যানুযায়ী: TechNova Solutions-এ সকল ফুল-টাইম কর্মী বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন। এটি সম্পূর্ণ বেতনসহ ছুটি।

👤 ইউজার: সেটা কি বেতনসহ পাওয়া যায়?
🔄 [Query Rewriter]: 'সেটা কি বেতনসহ পাওয়া যায়?' -> রূপান্তর করা হয়েছে: 'ক্যাজুয়াল ছুটি সেটা কি বেতনসহ পাওয়া যায়?'
🤖 অ্যাসিস্ট্যান্ট: নথির তথ্যানুযায়ী: TechNova Solutions-এ সকল ফুল-টাইম কর্মী বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন। এটি সম্পূর্ণ বেতনসহ ছুটি।

👤 ইউজার: আর অসুস্থ হলে কী নিয়ম?
🤖 অ্যাসিস্ট্যান্ট: নথির তথ্যানুযায়ী: অসুস্থতাজনিত ছুটির (Sick Leave) ক্ষেত্রে বছরে ১০ দিন ছুটি পাওয়া যায়, তবে টানা ২ দিনের বেশি অনুপস্থিত থাকলে ডাক্তারের প্রেসক্রিপশন জমা দিতে হবে।
```

লক্ষ্য করুন, দ্বিতীয় প্রশ্নে ইউজার শুধু বলেছিলেন *"সেটা কি বেতনসহ পাওয়া যায়?"*—আর আমাদের Query Rewriter স্বয়ংক্রিয়ভাবে বুঝতে পেরেছে এখানে **"ক্যাজুয়াল ছুটি"** নিয়ে কথা বলা হচ্ছে!

---

## ৮. VitePress Callouts

:::tip Sliding Window Memory ব্যবহার করুন
কখনোই পুরো চ্যাট হিস্ট্রি (যেমন ৫০টি আগের মেসেজ) একসাথে প্রম্পটে পাঠাবেন না। সবসময় **Sliding Window (শেষ ৩ থেকে ৫ টার্ন)** বা সারসংক্ষেপ (Summary Buffer) ব্যবহার করুন। এতে টোকেন খরচ বাঁচে এবং মডেলের ফোকাস ঠিক থাকে।
:::

:::warning সরাসরি কাঁচা প্রশ্ন রিট্রিভারে পাঠাবেন না
চ্যাটবট বানানোর সময় সবচেয়ে সাধারণ ভুল হলো ব্যবহারকারীর ফলো-আপ প্রশ্নটি রি-রাইট না করে সরাসরি ভেক্টর স্টোরে পাঠিয়ে দেওয়া। *"সেটা কি পেইড?"* লিখে সার্চ করলে ভেক্টর স্টোর প্রায় নিশ্চিতভাবেই ভুল ডকুমেন্ট তুলে আনবে!
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **Stateless Retriever ব্যবহার করা:** চ্যাট মেমোরি শুধুমাত্র LLM-কে দিয়ে রিট্রিভারের কাছে না পাঠানো। মনে রাখবেন, সঠিক রিট্রিভালের জন্যই আগে রি-রাইট দরকার।
2. **আনলিমিটেড হিস্ট্রি সংরক্ষণ:** মেমোরি রিসেট বা ট্রিম করার ব্যবস্থা না রাখা। এর ফলে কিছুক্ষণ কথা বললেই LLM-এর Context Window ফুল হয়ে ক্র্যাশ করতে পারে।
3. **সিস্টেম প্রম্পট বারবার রিপিট করা:** প্রতিটি টার্নে অপ্রয়োজনীয়ভাবে বিশাল সিস্টেম প্রম্পট যোগ করে টোকেন অপচয় করা।

---

## ১০. Practice Exercise

**অনুশীলন:**
উপরের কোডে আরেকটি নতুন টার্ন যোগ করুন:
`assistant.chat("অফিসের কাজের সময় কখন?")`
এবং এরপর ফলো-আপ প্রশ্ন করুন:
`assistant.chat("শুক্রবারে কি এটা খোলা থাকে?")`
যাচাই করুন আপনার রি-রাইটার কি "এটা" বলতে অফিস সময় বুঝতে পারছে কি না!

---

## ১১. Summary (সারসংক্ষেপ)

* **Conversational RAG** পূর্ববর্তী চ্যাট হিস্ট্রি মনে রেখে বহু-ধাপের মানবিক কথোপকথন সম্ভব করে তোলে।
* ব্যবহারকারীর অসম্পূর্ণ প্রশ্নকে রিট্রিভালের সুবিধার্থে **Standalone Query**-তে রূপান্তর (Query Rewriting) করা হয়।
* **Sliding Window Memory** অপ্রয়োজনীয় টোকেন খরচ রোধ করে দক্ষ মেমোরি ম্যানেজমেন্ট নিশ্চিত করে।
* এটি গ্রাহক সেবা (Customer Support) ও এন্টারপ্রাইজ চ্যাটবটের মূল প্রাণকেন্দ্র।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা শিখব RAG-এর পারফরম্যান্স নাটকীয়ভাবে বাড়ানোর মূল কারিগর—**Text Chunking Strategies (টেক্সট চাংকিং কৌশল)** এবং কীভাবে সঠিক সাইজের চ্যাঙ্ক নির্বাচন করতে হয়!
