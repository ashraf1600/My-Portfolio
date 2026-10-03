# স্ক্র্যাচ থেকে আপনার প্রথম RAG অ্যাপ্লিকেশন তৈরি (Build Your First RAG App)

স্বাগতম আমাদের RAG সিরিজের ষষ্ঠ পর্বে! আগের পাঁচটি পর্বে আমরা RAG-এর সমস্ত মৌলিক উপাদানগুলো আলাদা আলাদাভাবে শিখেছি—ডেটা ইনজেশন, টেক্সট চাংকিং, ভেক্টর এম্বেডিং, রিট্রিভাল এবং কোসাইন সিমিলারিটি।

এখন সেই জাদুকরী মুহূর্ত! এই পর্বে আমরা এই সবগুলো উপাদানকে একত্রিত করে আমাদের নিজস্ব **প্রথম পূর্ণাঙ্গ এন্ড-টু-এন্ড RAG অ্যাপ্লিকেশন** তৈরি করব। 

---

## ১. What (এন্ড-টু-এন্ড RAG অ্যাপ্লিকেশন কী?)

একটি **End-to-End RAG Application** হলো এমন একটি সম্পূর্ণ সফটওয়্যার পাইপলাইন যা কাঁচা নথি গ্রহণ করা থেকে শুরু করে ব্যবহারকারীর সাথে মানুষের মতো স্বাভাবিক ভাষায় প্রশ্নোত্তর করা পর্যন্ত পুরো প্রক্রিয়াটি পরিচালনা করে।

এটিতে প্রধান ৪টি উপাদান একসাথে কাজ করে:
1. **Document Knowledge Base:** কোম্পানির তথ্য সম্বলিত ডকুমেন্টস।
2. **Embedding & Vector Store:** তথ্যগুলোর ভেক্টর ইনডেক্স।
3. **Retriever:** ব্যবহারকারীর প্রশ্নের ভিত্তিতে প্রাসঙ্গিক নথি খোঁজা।
4. **Augmented Generator (LLM):** সংগৃহীত তথ্যের ভিত্তিতে চূড়ান্ত উত্তর তৈরি করা।

---

## ২. Why (কেন সম্পূর্ণ অ্যাপ্লিকেশন তৈরি জরুরি?)

আলাদা আলাদাভাবে কোড চালানো এবং একটি সম্পূর্ণ অ্যাপ্লিকেশনের মধ্যে পার্থক্য অনেক:
* ব্যবহারকারী কীভাবে ইনপুট দেবেন এবং কীভাবে আউটপুট পাবেন তা সুনির্দিষ্ট হয়।
* যদি ডকুমেন্টে কোনো প্রশ্নের উত্তর না থাকে, তখন মডেল হ্যালুসিনেশন না করে কীভাবে বিনয়ের সাথে *"তথ্যটি আমার নথিতে নেই"* বলবে—তা প্রম্পট ইঞ্জিনিয়ারিংয়ের মাধ্যমে নিশ্চিত করা হয়।
* এটি পরবর্তীতে যেকোনো ওয়েব ইন্টারফেস (যেমন: Streamlit, FastAPI বা React)-এ সহজে যুক্ত করা যায়।

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

একটি সম্পূর্ণ RAG অ্যাপ বুঝতে সবচেয়ে সুন্দর উপমা হলো **"একটি রেস্তোরাঁ ও দক্ষ ওয়েটার"**:

* **গ্রাহক (User):** টেবিলে বসে মেনু দেখে খাবারের অর্ডার বা প্রশ্ন করেন (User Query)।
* **ওয়েটার (Retriever):** রান্নাঘরের বিশাল স্টোররুম থেকে ঠিক নির্দিষ্ট উপকরণগুলো সংগ্রহ করে আনেন (Relevant Context)।
* **শেফ (LLM / Generator):** সেই উপকরণগুলোকে সুন্দরভাবে রান্না ও সাজিয়ে সুস্বাদু ডিশ প্রস্তুত করেন (Final Response)।
* **রেস্তোরাঁর পুরো সার্ভিস (RAG Application):** অর্ডার নেওয়া থেকে শুরু করে ডিশ পরিবেশন পর্যন্ত সমন্বিত সম্পূর্ণ ব্যবস্থা।

---

## ৪. How it works (ধাপে ধাপে আর্কিটেকচার)

1. **Initialization:** অ্যাপ্লিকেশন চালুর সময় কোম্পানির ডকুমেন্টস পড়ে ইন-মেমোরি ভেক্টর স্টোর তৈরি করে নেওয়া হয়।
2. **Query Reception:** ব্যবহারকারী কনসোলে বা চ্যাটবক্সে একটি প্রশ্ন লেখেন।
3. **Context Retrieval:** রিট্রিভার ব্যবহারকারীর প্রশ্নের সাথে ডকুমেন্টের ভেক্টর মিলিয়ে শীর্ষ $k$ সংখ্যক সবচেয়ে প্রাসঙ্গিক অংশ তুলে আনে।
4. **Prompt Augmentation:** একটি সিস্টেম প্রম্পটের ভেতর এই নিয়মটি সেট করা হয়:
   > *"তুমি শুধুমাত্র নিচের তথ্যের ওপর নির্ভর করে উত্তর দেবে। তথ্যে উত্তর না থাকলে নিজে থেকে বানিয়ে বলবে না।"*
5. **Generation & Guardrail:** LLM প্রাপ্ত কনটেক্সট পড়ে সুনির্দিষ্ট উত্তর প্রদান করে।

---

## ৫. Architecture Diagram (এন্ড-টু-এন্ড RAG সিকোয়েন্স আর্কিটেকচার)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 460" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="v6Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="v6Glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="v6UserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <linearGradient id="v6AppGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="v6VdbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <linearGradient id="v6LlmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <marker id="v6ArrowRose" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fb7185"/>
    </marker>
    <marker id="v6ArrowAmber" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fcd34d"/>
    </marker>
    <marker id="v6ArrowCyan" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#67e8f9"/>
    </marker>
    <marker id="v6ArrowGreen" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#34d399"/>
    </marker>
    <style>
      .v6-pulse-rose { stroke-dasharray: 8, 8; animation: v6Anim 1.4s linear infinite; }
      .v6-pulse-amber { stroke-dasharray: 8, 8; animation: v6Anim 1.3s linear infinite; }
      .v6-pulse-cyan { stroke-dasharray: 8, 8; animation: v6Anim 1.3s linear infinite; }
      .v6-pulse-green { stroke-dasharray: 8, 8; animation: v6Anim 1.2s linear infinite; }
      @keyframes v6Anim { from { stroke-dashoffset: 32; } to { stroke-dashoffset: 0; } }
    </style>
  </defs>
  <!-- Title & Subtitle -->
  <text x="470" y="38" font-family="'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#f8fafc" text-anchor="middle">End-to-End RAG Application Sequence Flow</text>
  <text x="470" y="62" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Interaction pipeline across User, Orchestrator App, Vector DB, and LLM</text>
  <!-- Lifeline Columns Headers -->
  <!-- Column 1: User -->
  <g transform="translate(60, 85)">
    <rect width="160" height="48" rx="10" fill="url(#v6UserGrad)" filter="url(#v6Shadow)"/>
    <text x="80" y="29" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">User / Employee</text>
    <!-- Lifeline -->
    <line x1="80" y1="52" x2="80" y2="340" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
  </g>
  <!-- Column 2: TechNova App -->
  <g transform="translate(290, 85)">
    <rect width="160" height="48" rx="10" fill="url(#v6AppGrad)" filter="url(#v6Shadow)"/>
    <text x="80" y="29" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">TechNova RAG App</text>
    <!-- Lifeline -->
    <line x1="80" y1="52" x2="80" y2="340" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
  </g>
  <!-- Column 3: Vector Store -->
  <g transform="translate(520, 85)">
    <rect width="160" height="48" rx="10" fill="url(#v6VdbGrad)" filter="url(#v6Shadow)"/>
    <text x="80" y="29" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">Vector Database</text>
    <!-- Lifeline -->
    <line x1="80" y1="52" x2="80" y2="340" stroke="#06b6d4" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
  </g>
  <!-- Column 4: LLM Engine -->
  <g transform="translate(740, 85)">
    <rect width="160" height="48" rx="10" fill="url(#v6LlmGrad)" filter="url(#v6Shadow)"/>
    <text x="80" y="29" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">LLM Engine</text>
    <!-- Lifeline -->
    <line x1="80" y1="52" x2="80" y2="340" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4" opacity="0.4"/>
  </g>
  <!-- Interaction 1: User to App -->
  <path d="M 140 170 L 365 170" fill="none" stroke="#fb7185" stroke-width="2.5" class="v6-pulse-rose" marker-end="url(#v6ArrowRose)"/>
  <rect x="170" y="148" width="165" height="20" rx="4" fill="#1e1b4b" opacity="0.8"/>
  <text x="252" y="162" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#fecdd3" text-anchor="middle">1. "ইন্টারনেট বিলের নিয়ম কী?"</text>
  <!-- Interaction 2: App to VectorDB (Query Search) -->
  <path d="M 370 215 L 595 215" fill="none" stroke="#fcd34d" stroke-width="2.5" class="v6-pulse-amber" marker-end="url(#v6ArrowAmber)"/>
  <rect x="400" y="193" width="165" height="20" rx="4" fill="#1e1b4b" opacity="0.8"/>
  <text x="482" y="207" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#fef08a" text-anchor="middle">2. Embedding Cosine Search</text>
  <!-- Interaction 3: VectorDB returns context to App -->
  <path d="M 600 260 L 375 260" fill="none" stroke="#67e8f9" stroke-width="2.5" class="v6-pulse-cyan" marker-end="url(#v6ArrowCyan)"/>
  <rect x="400" y="238" width="175" height="20" rx="4" fill="#1e1b4b" opacity="0.8"/>
  <text x="487" y="252" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#a5f3fc" text-anchor="middle">3. Return: "১৫০০ টাকা বিল ভাতা..."</text>
  <!-- Interaction 4: App to LLM (Augmented Prompt) -->
  <path d="M 370 305 L 815 305" fill="none" stroke="#a78bfa" stroke-width="2.5" class="v6-pulse-amber" marker-end="url(#v6ArrowAmber)"/>
  <rect x="495" y="283" width="200" height="20" rx="4" fill="#1e1b4b" opacity="0.8"/>
  <text x="595" y="297" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#ddd6fe" text-anchor="middle">4. Augmented Prompt [Context+Question]</text>
  <!-- Interaction 5: LLM returns response to App -->
  <path d="M 820 350 L 375 350" fill="none" stroke="#34d399" stroke-width="2.5" class="v6-pulse-green" marker-end="url(#v6ArrowGreen)"/>
  <rect x="500" y="328" width="190" height="20" rx="4" fill="#1e1b4b" opacity="0.8"/>
  <text x="595" y="342" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#a7f3d0" text-anchor="middle">5. Synthesized Accurate Answer</text>
  <!-- Interaction 6: App displays response to User -->
  <path d="M 370 395 L 145 395" fill="none" stroke="#34d399" stroke-width="2.5" class="v6-pulse-green" marker-end="url(#v6ArrowGreen)"/>
  <rect x="175" y="373" width="165" height="20" rx="4" fill="#064e3b" opacity="0.9"/>
  <text x="257" y="387" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#d1fae5" text-anchor="middle">6. স্ক্রিনে সঠিক উত্তর প্রদর্শন</text>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন একটি সম্পূর্ণ ক্লাস-ভিত্তিক RAG অ্যাসিস্ট্যান্ট তৈরি করি। কোনো জটিল থার্ড-পার্টি সাবস্ক্রিপশন ছাড়াই যেন প্রত্যেকে নিজের পিসিতে এটি চালিয়ে শিখতে পারেন, সেজন্য আমরা একটি স্বয়ংসম্পূর্ণ ও মার্জিত পাইথন কোড তৈরি করেছি।

```python
import math
from collections import Counter

# ==========================================
# ১. ডেটা মডেল ও ডকুমেন্টস
# ==========================================
class Document:
    def __init__(self, page_content, metadata=None):
        self.page_content = page_content
        self.metadata = metadata or {}

# TechNova Solutions-এর মূল নলেজবেস
technova_knowledge_base = [
    Document(
        page_content="TechNova Solutions-এ সকল ফুল-টাইম কর্মী বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন।",
        metadata={"source": "HR Policy", "category": "Leave"}
    ),
    Document(
        page_content="আমাদের নিয়মিত অফিস সময় সকাল ৯:৩০ টা থেকে সন্ধ্যা ৬:০০ টা পর্যন্ত। শুক্র ও শনিবার সাপ্তাহিক ছুটি।",
        metadata={"source": "HR Policy", "category": "Timing"}
    ),
    Document(
        page_content="বাসা থেকে কাজের সুবিধার্থে কর্মীরা ইন্টারনেট বিল বাবদ প্রতি মাসে ১,৫০০ টাকা রিইমবার্সমেন্ট দাবি করতে পারবেন।",
        metadata={"source": "Finance Policy", "category": "Allowance"}
    ),
    Document(
        page_content="অসুস্থতাজনিত ছুটির ক্ষেত্রে টানা ২ দিনের বেশি অফিসে অনুপস্থিত থাকলে রেজিস্ট্রার্ড চিকিৎসকের প্রেসক্রিপশন জমা দিতে হবে।",
        metadata={"source": "HR Policy", "category": "Medical"}
    )
]

# ==========================================
# ২. ইন-মেমোরি ভেক্টর রিট্রিভার
# ==========================================
class LocalVectorRetriever:
    def __init__(self, documents, k=2, similarity_threshold=0.15):
        self.documents = documents
        self.k = k
        self.similarity_threshold = similarity_threshold

    def _get_tf_vector(self, text):
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

    def search(self, query):
        query_vec = self._get_tf_vector(query)
        scored = []
        for doc in self.documents:
            doc_vec = self._get_tf_vector(doc.page_content)
            score = self._cosine_similarity(query_vec, doc_vec)
            if score >= self.similarity_threshold:
                scored.append((score, doc))
        
        scored.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in scored[:self.k]]

# ==========================================
# ৩. সম্পূর্ণ RAG অ্যাপ্লিকেশন
# ==========================================
class TechNovaRAGApp:
    def __init__(self, documents):
        self.retriever = LocalVectorRetriever(documents=documents, k=1)
        print("🤖 TechNova AI Assistant সফলভাবে ইনিশিয়ালাইজ হয়েছে!")

    def answer_query(self, user_query):
        print(f"\n💬 ব্যবহারকারীর প্রশ্ন: '{user_query}'")
        
        # ধাপ ১: প্রাসঙ্গিক নথি উদ্ধার (Retrieval)
        matched_docs = self.retriever.search(user_query)
        
        # গার্ডরেল: কোনো মিল না পেলে হ্যালুসিনেশন রোধ
        if not matched_docs:
            return "দুঃখিত, TechNova Solutions-এর পলিসি নথিতে এই বিষয়ে কোনো তথ্য পাওয়া যায়নি।"

        best_doc = matched_docs[0]
        context = best_doc.page_content
        source = best_doc.metadata.get("source", "Unknown")

        # ধাপ ২: অগমেন্টেড প্রম্পট তৈরি (Augmentation)
        augmented_prompt = f"""
[সিস্টেম নির্দেশিকা]: তুমি TechNova Solutions-এর প্রাতিষ্ঠানিক পলিসি সহায়ক। শুধুমাত্র নিচের তথ্যের ভিত্তিতে উত্তর দেবে।
[প্রাসঙ্গিক তথ্য]: {context}
[ব্যবহারকারীর প্রশ্ন]: {user_query}
"""
        
        # ধাপ ৩: জেনারেশন (বাস্তব প্রোডাকশনে এখানে OpenAI/Gemini কল করা হয়)
        # এখানে প্রাপ্ত কনটেক্সট ও রেফারেন্স দিয়ে সুন্দর উত্তর তৈরি হচ্ছে:
        response = f"নথির তথ্যমতে: {context}\n(রেফারেন্স: {source})"
        return response

# ==========================================
# ৪. অ্যাপ রান ও টেস্টিং
# ==========================================
if __name__ == "__main__":
    app = TechNovaRAGApp(documents=technova_knowledge_base)

    # টেস্ট ১: ডকুমেন্টে থাকা তথ্য নিয়ে প্রশ্ন
    q1 = "বাসা থেকে কাজ করলে ইন্টারনেটের জন্য কত টাকা পাওয়া যায়?"
    print(app.answer_query(q1))

    # টেস্ট ২: এমন প্রশ্ন যার কোনো তথ্য নথিতে নেই (হ্যালুসিনেশন গার্ডরেল টেস্ট)
    q2 = "কোম্পানি কি দুপুরের লাঞ্চের ব্যবস্থা করে?"
    print(app.answer_query(q2))
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `LocalVectorRetriever`: মেমোরিতে থাকা তথ্যের সাথে প্রশ্নের মিল খুঁজে আনে এবং `similarity_threshold` দিয়ে নিশ্চিত করে যে বাজে বা অপ্রাসঙ্গিক মিল বাতিল হবে।
* `TechNovaRAGApp`: মূল অ্যাপ্লিকেশন ক্লাস যা রিট্রিভার এবং জেনারেটরকে একটি একক মেথড `answer_query()`-এর মধ্যে সংযুক্ত করেছে।
* **Guardrail কন্ডিশন:** `if not matched_docs` ব্লকটি অত্যন্ত গুরুত্বপূর্ণ; এটি মডেলকে আন্দাজে উত্তর বানানো থেকে রক্ষা করে।

---

## ৭. Output উদাহরণ

উপরের কোডটি রান করলে নিচের মতো স্পষ্ট ও সুশৃঙ্খল আউটপুট পাবেন:

```text
🤖 TechNova AI Assistant সফলভাবে ইনিশিয়ালাইজ হয়েছে!

💬 ব্যবহারকারীর প্রশ্ন: 'বাসা থেকে কাজ করলে ইন্টারনেটের জন্য কত টাকা পাওয়া যায়?'
নথির তথ্যমতে: বাসা থেকে কাজের সুবিধার্থে কর্মীরা ইন্টারনেট বিল বাবদ প্রতি মাসে ১,৫০০ টাকা রিইমবার্সমেন্ট দাবি করতে পারবেন।
(রেফারেন্স: Finance Policy)

💬 ব্যবহারকারীর প্রশ্ন: 'কোম্পানি কি দুপুরের লাঞ্চের ব্যবস্থা করে?'
দুঃখিত, TechNova Solutions-এর পলিসি নথিতে এই বিষয়ে কোনো তথ্য পাওয়া যায়নি।
```

লক্ষ্য করুন, দ্বিতীয় প্রশ্নে কোনো তথ্য না পেয়ে অ্যাসিস্ট্যান্ট কিন্তু ভুল তথ্য বানায়নি; বরং স্পষ্টভাবে জানিয়েছে যে তথ্য নথিতে নেই!

---

## ৮. VitePress Callouts

:::tip অ্যান্টি-হ্যালুসিনেশন প্রম্পট নিয়ম
প্রোডাকশন RAG-এ সিস্টেম প্রম্পটে সবসময় এই লাইনটি যুক্ত রাখবেন:
*"যদি প্রদত্ত তথ্যের ভেতরে প্রশ্নের উত্তর না থাকে, তবে বিনীতভাবে বলুন যে তথ্যটি আপনার কাছে নেই। কোনো অবস্থাতেই নিজে থেকে কাল্পনিক তথ্য বানিয়ে বলবেন না।"*
:::

:::warning সাইটেশন বা রেফারেন্স প্রদান
একটি বিশ্বাসযোগ্য RAG অ্যাপ্লিকেশন সবসময় উত্তরের নিচে সোর্স ফাইলের নাম বা রেফারেন্স (`metadata['source']`) প্রদর্শন করে। এতে ব্যবহারকারী সহজেই যাচাই করতে পারেন।
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **কোনো থ্রেশহোল্ড না রাখা:** সম্পূর্ণ অপ্রাসঙ্গিক প্রশ্নেও যদি রিট্রিভার কম স্কোরের ডকুমেন্ট পাঠায়, তবে LLM ভুল তথ্য দিয়ে উত্তর বানিয়ে ফেলে।
2. **রেফারেন্স বা মেটাডেটা বাদ দেওয়া:** ব্যবহারকারীকে শুধুমাত্র টেক্সট উত্তর দিলে তারা আস্থার সাথে বিশ্বাস করতে পারে না।
3. **একক দীর্ঘ প্রম্পট পাঠানো:** ব্যবহারকারীর প্রশ্ন স্পষ্ট না হলে রিট্রিভার প্রায়ই সঠিক চ্যাঙ্ক মিস করে।

---

## ১০. Practice Exercise

**অনুশীলন:**
TechNova অ্যাপে আরও দুটি নতুন ডকুমেন্ট যোগ করুন:
1. প্রভিডেন্ট ফান্ড পলিসি।
2. মাতৃত্বকালীন ছুটির নিয়ম।
এরপর প্রশ্ন করে দেখুন আপনার অ্যাসিস্ট্যান্ট কি নতুন নথির তথ্য এবং সোর্স সঠিকভাবে দেখাতে পারছে?

---

## ১১. Summary (সারসংক্ষেপ)

* একটি সম্পূর্ণ RAG অ্যাপ্লিকেশন রিট্রিভার, প্রম্পট অগমেন্টেশন এবং জেনারেশন লজিককে এক ছাতার নিচে আনে।
* এটি ব্যবহারকারীর প্রশ্নের ভিত্তিতে সঠিক তথ্য খুঁজে এনে রেফারেন্স সহ উত্তর প্রদান করে।
* থ্রেশহোল্ড এবং সিস্টেম প্রম্পট ব্যবহারের মাধ্যমে **Hallucination** সম্পূর্ণরূপে রোধ করা সম্ভব।
* এটি যেকোনো চ্যাটবট বা এন্টারপ্রাইজ সার্চ সিস্টেমের মূল আর্কিটেকচার।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা শিখব বাস্তব চ্যাটবটের মতো পূর্ববর্তী কথোপকথন মনে রাখার কৌশল—**Chat History সহ Conversational RAG**!
