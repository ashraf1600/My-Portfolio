# LangChain দিয়ে Document Retrieval বাস্তবায়ন (Document Retrieval with LangChain)

স্বাগতম আমাদের RAG সিরিজের চতুর্থ পর্বে! আগের পর্বে আমরা পাইথন দিয়ে নিজস্ব ডেটা ইনজেশন পাইপলাইন তৈরি করেছিলাম। 

বাস্তব প্রজেক্টে এআই অ্যাপ্লিকেশন তৈরির জন্য আমরা প্রতিটি জিনিস একদম স্ক্র্যাচ থেকে কোড করি না; বরং বিশ্বমানের প্রোডাকশন-রেডি ফ্রেমওয়ার্ক ব্যবহার করি। আর এই ক্ষেত্রে বর্তমান বিশ্বের সবচেয়ে জনপ্রিয় ফ্রেমওয়ার্ক হলো **LangChain**। এই পর্বে আমরা দেখব কীভাবে LangChain ব্যবহার করে ডকুমেন্টস প্রস্তুত করতে হয় এবং একটি বুদ্ধিমান **Document Retriever** তৈরি করতে হয়।

---

## ১. What (Document Retrieval ও Retriever কী?)

LangChain-এ **Document Retrieval** হলো ব্যবহারকারীর অনুসন্ধানের (Query) ভিত্তিতে একটি বিশাল ডাটাবেস থেকে সবচেয়ে প্রাসঙ্গিক ডকুমেন্টস বা টেক্সট খণ্ডগুলো খুঁজে বের করার প্রক্রিয়া।

আর এই কাজটি যে কম্পোনেন্ট বা অবজেক্টটি করে, তাকে বলা হয় **Retriever**। 

সহজ কথায়, Retriever হলো এমন একটি ইন্টারফেস যা ইনপুট হিসেবে একটি স্ট্রিং কুয়েরি (প্রশ্ন) গ্রহণ করে এবং আউটপুট হিসেবে প্রাসঙ্গিক `Document` অবজেক্টের একটি লিস্ট প্রদান করে।

---

## ২. Why (কেন LangChain এর Retriever ব্যবহার করব?)

স্ক্র্যাচ থেকে নিজে লুপ চালিয়ে সার্চ করার বদলে LangChain ব্যবহার করার মূল সুবিধাগুলো হলো:

1. **স্ট্যান্ডার্ড `Document` ইন্টারফেস:** LangChain-এর প্রতিটি ডকুমেন্টে দুটি নির্দিষ্ট প্রোপার্টি থাকে: `page_content` (মূল লেখা) এবং `metadata` (উৎস, পেজ নম্বর ইত্যাদি)। ফলে ডেটা হ্যান্ডলিং খুব সহজ হয়।
2. **ভেক্টর ডাটাবেসের সাথে প্লাগ-অ্যান্ড-প্লে:** আপনি Chroma, FAISS, Pinecone বা Qdrant—যে ডেটাবেসই ব্যবহার করুন না কেন, LangChain-এ রিট্রিভাল কোড লেখার নিয়ম সবার জন্য একই (`vectorstore.as_retriever()`)।
3. **LCEL (LangChain Expression Language) সাপোর্ট:** LangChain-এর আধুনিক পাইপলাইনে রিট্রিভারকে পাইপ অপারেটর (`|`) দিয়ে সরাসরি LLM ও প্রম্পটের সাথে চেইনে যুক্ত করা যায়।

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

LangChain Retriever বুঝতে সবচেয়ে কার্যকর উপমা হলো **"একজন অভিজ্ঞ লাইব্রেরিয়ান সহকারী"**:

* ধরুন আপনি বিশাল একটি পাবলিক লাইব্রেরিতে গেলেন। সেখানে হাজার হাজার বই রয়েছে।
* আপনি নিজে গিয়ে প্রতিটি সেলফ খুঁজে বই বের না করে কাউন্টারে গিয়ে লাইব্রেরিয়ানকে বললেন: *"TechNova কোম্পানির ছুটির নিয়ম নিয়ে কোন বইয়ে লেখা আছে?"*
* লাইব্রেরিয়ান আপনার কথা শুনে লাইব্রেরির ক্যাটালগ সার্চ করে তাক থেকে নির্দিষ্ট ৩টি রেফারেন্স বই বা ফাইল এনে আপনার টেবিলে খুলে দিলেন।

LangChain-এর **Retriever** ঠিক এই লাইব্রেরিয়ানের মতোই কাজ করে!

---

## ৪. How it works (ধাপে ধাপে কার্যপদ্ধতি)

1. **Document Object Creation:** কাঁচা টেক্সটকে LangChain-এর `Document` অবজেক্টে রূপান্তর করা হয়।
2. **Vector Store Ingestion:** ডকুমেন্টগুলোকে একটি Vector Store (যেমন: FAISS বা Chroma)-এ এম্বেডিংসহ ইনডেক্স করা হয়।
3. **Retriever কনফিগারেশন:** ভেক্টর স্টোরকে রিট্রিভারে রূপান্তর করা হয় এবং `search_kwargs={"k": 2}` দিয়ে একবারে কয়টি ফলাফল চাই তা নির্ধারণ করা হয়।
4. **Retrieval Execution:** `retriever.invoke(query)` মেথড কল করার সাথে সাথে সবচেয়ে বেশি মিল থাকা `top_k` ডকুমেন্টগুলো রিটার্ন হয়।

---

## ৫. Architecture Diagram (রিট্রিভাল ফ্লো আর্কিটেকচার)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 400" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="v4Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="v4Glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <linearGradient id="v4QueryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#be123c"/>
    </linearGradient>
    <linearGradient id="v4RetrieverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="v4VectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <linearGradient id="v4DocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="v4ConsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <marker id="v4ArrowRose" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fb7185"/>
    </marker>
    <marker id="v4ArrowAmber" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fcd34d"/>
    </marker>
    <marker id="v4ArrowCyan" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#67e8f9"/>
    </marker>
    <marker id="v4ArrowPurple" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#c084fc"/>
    </marker>

    <style>
      .v4-pulse-rose { stroke-dasharray: 8, 8; animation: v4Anim 1.4s linear infinite; }
      .v4-pulse-amber { stroke-dasharray: 8, 8; animation: v4Anim 1.3s linear infinite; }
      .v4-pulse-cyan { stroke-dasharray: 8, 8; animation: v4Anim 1.3s linear infinite; }
      .v4-pulse-purple { stroke-dasharray: 8, 8; animation: v4Anim 1.2s linear infinite; }
      @keyframes v4Anim { from { stroke-dashoffset: 32; } to { stroke-dashoffset: 0; } }
    </style>
  </defs>

  <!-- Title & Subtitle -->
  <text x="470" y="40" font-family="'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#f8fafc" text-anchor="middle">LangChain Document Retrieval Architecture</text>
  <text x="470" y="64" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Unifying Vector Search, Query Execution &amp; Context Pipeline</text>

  <!-- Flow Connectors -->
  <!-- 1. Query to Retriever -->
  <path d="M 160 200 L 220 200" fill="none" stroke="#fb7185" stroke-width="2.5" class="v4-pulse-rose" marker-end="url(#v4ArrowRose)"/>
  <!-- 2. Retriever to Vector Store (top branch) -->
  <path d="M 390 170 L 440 140 L 485 140" fill="none" stroke="#fcd34d" stroke-width="2.5" class="v4-pulse-amber" marker-end="url(#v4ArrowAmber)"/>
  <!-- 3. Vector Store back to Doc List -->
  <path d="M 645 140 L 690 140 L 735 170" fill="none" stroke="#67e8f9" stroke-width="2.5" class="v4-pulse-cyan" marker-end="url(#v4ArrowCyan)"/>
  <!-- 4. Retriever directly to Doc List (Bottom return coordinate flow) -->
  <path d="M 390 230 L 485 260 L 645 260 L 735 230" fill="none" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
  <!-- 5. Doc List to LLM / Prompt -->
  <path d="M 740 280 L 740 330 L 600 330" fill="none" stroke="#c084fc" stroke-width="2.5" class="v4-pulse-purple" marker-end="url(#v4ArrowPurple)"/>

  <!-- Step 1: User Query -->
  <g transform="translate(30, 150)">
    <rect width="130" height="100" rx="14" fill="url(#v4QueryGrad)" filter="url(#v4Shadow)"/>
    <text x="65" y="32" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffe4e6" text-anchor="middle" letter-spacing="1">STEP 01</text>
    <text x="65" y="55" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">User Query</text>
    <rect x="12" y="68" width="106" height="22" rx="6" fill="#881337" opacity="0.6"/>
    <text x="65" y="83" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" fill="#fecdd3" text-anchor="middle">"অফিস টাইমিং কত?"</text>
  </g>

  <!-- Step 2: LangChain Retriever Engine -->
  <g transform="translate(225, 140)">
    <rect width="165" height="120" rx="14" fill="url(#v4RetrieverGrad)" filter="url(#v4Shadow)"/>
    <text x="82" y="28" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#fef3c7" text-anchor="middle" letter-spacing="1">ORCHESTRATOR</text>
    <text x="82" y="50" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">LangChain Retriever</text>
    <rect x="15" y="62" width="135" height="46" rx="8" fill="#78350f" opacity="0.55"/>
    <text x="82" y="80" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" fill="#fde68a" text-anchor="middle">`as_retriever()`</text>
    <text x="82" y="98" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" fill="#fef3c7" text-anchor="middle">k=2, similarity search</text>
  </g>

  <!-- Step 3: Vector Store -->
  <g transform="translate(490, 85)">
    <rect width="155" height="110" rx="14" fill="url(#v4VectorGrad)" filter="url(#v4Shadow)"/>
    <text x="77" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#cffafe" text-anchor="middle" letter-spacing="1">INDEXED STORE</text>
    <text x="77" y="48" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Vector Store</text>
    <rect x="15" y="58" width="125" height="42" rx="8" fill="#155e75" opacity="0.6"/>
    <text x="77" y="76" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" fill="#a5f3fc" text-anchor="middle">FAISS / Chroma DB</text>
    <text x="77" y="92" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e0f2fe" text-anchor="middle">Embedding Cosine Match</text>
  </g>

  <!-- Step 4: Retrieved Documents -->
  <g transform="translate(740, 140)">
    <rect width="165" height="120" rx="14" fill="url(#v4DocGrad)" filter="url(#v4Shadow)"/>
    <text x="82" y="28" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ede9fe" text-anchor="middle" letter-spacing="1">RESULT OBJECTS</text>
    <text x="82" y="50" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Top-K Documents</text>
    <rect x="12" y="62" width="141" height="46" rx="8" fill="#4c1d95" opacity="0.55"/>
    <text x="82" y="80" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" fill="#ddd6fe" text-anchor="middle">[Document(page_content=...)]</text>
    <text x="82" y="97" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#ede9fe" text-anchor="middle">metadata={'source': 'policy.md'}</text>
  </g>

  <!-- Step 5: Consumer / Prompt Assembly -->
  <g transform="translate(380, 305)">
    <rect width="215" height="60" rx="12" fill="url(#v4ConsGrad)" filter="url(#v4Shadow)"/>
    <text x="107" y="24" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#d1fae5" text-anchor="middle" letter-spacing="1">DOWNSTREAM LLM PIPELINE</text>
    <text x="107" y="44" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">Prompt Context + LLM Answer</text>
  </g>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন LangChain-এর স্ট্যান্ডার্ড আর্কিটেকচার মেনে একটি সম্পূর্ণ রিট্রিভার তৈরি করি। যেকোনো কম্পিউটারে যেন কোনো পেইড API কি (API Key) ছাড়াই সরাসরি কোডটি চালানো যায়, সেজন্য আমরা একটি লোকাল ইন-মেমোরি ভেক্টর রিট্রিভার বাস্তবায়ন করেছি যা হুবহু LangChain-এর `BaseRetriever` সিনট্যাক্স অনুসরণ করে।

```python
import math
from collections import Counter

# ধাপ ১: LangChain-এর কোর Document স্ট্রাকচার
class Document:
    def __init__(self, page_content, metadata=None):
        self.page_content = page_content
        self.metadata = metadata or {}

    def __repr__(self):
        return f"Document(page_content='{self.page_content[:40]}...', metadata={self.metadata})"

# ধাপ ২: LangChain-স্টাইল ইন-মেমোরি ভেক্টর রিট্রিভার ক্লাস
class SimpleVectorRetriever:
    def __init__(self, documents, k=2):
        self.documents = documents
        self.k = k  # কতটি শীর্ষ রেজাল্ট রিটার্ন করবে

    def _term_frequency(self, text):
        words = text.lower().replace(",", "").replace(".", "").split()
        return Counter(words)

    def _calculate_similarity(self, query_tf, doc_tf):
        intersection = set(query_tf.keys()) & set(doc_tf.keys())
        dot_product = sum([query_tf[x] * doc_tf[x] for x in intersection])
        norm1 = math.sqrt(sum([val ** 2 for val in query_tf.values()]))
        norm2 = math.sqrt(sum([val ** 2 for val in doc_tf.values()]))
        if not norm1 or not norm2:
            return 0.0
        return dot_product / (norm1 * norm2)

    # LangChain আধুনিক সিনট্যাক্স: invoke()
    def invoke(self, query):
        query_tf = self._term_frequency(query)
        scored_docs = []
        for doc in self.documents:
            doc_tf = self._term_frequency(doc.page_content)
            score = self._calculate_similarity(query_tf, doc_tf)
            scored_docs.append((score, doc))

        # স্কোরের ভিত্তিতে ক্রমানুসারে সাজানো
        scored_docs.sort(key=lambda x: x[0], reverse=True)
        # শীর্ষ k সংখ্যক ডকুমেন্ট রিটার্ন
        return [doc for score, doc in scored_docs[:self.k]]

# পরীক্ষা চালানোর অংশ
if __name__ == "__main__":
    # TechNova Solutions-এর ডকুমেন্টস তৈরি
    technova_docs = [
        Document(
            page_content="TechNova Solutions-এ সকল কর্মী বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন।",
            metadata={"source": "hr_policy.txt", "section": "Leave"}
        ),
        Document(
            page_content="আমাদের অফিসের নিয়মিত কাজের সময় সকাল ৯:৩০ টা থেকে সন্ধ্যা ৬:০০ টা পর্যন্ত। শুক্র ও শনিবার বন্ধ।",
            metadata={"source": "hr_policy.txt", "section": "Working Hours"}
        ),
        Document(
            page_content="বাসা থেকে নিরবচ্ছিন্ন ইন্টারনেটের জন্য প্রতি মাসে ১,৫০০ টাকা রিইমবার্সমেন্ট পাওয়া যাবে।",
            metadata={"source": "finance_policy.txt", "section": "Allowance"}
        ),
        Document(
            page_content="অসুস্থতাজনিত ছুটির জন্য টানা ২ দিনের বেশি অনুপস্থিতিতে ডাক্তারের প্রেসক্রিপশন জমা দিতে হবে।",
            metadata={"source": "hr_policy.txt", "section": "Sick Leave"}
        )
    ]

    # রিট্রিভার তৈরি (k=2 অর্থাৎ সবচেয়ে প্রাসঙ্গিক ২টি তথ্য চাই)
    retriever = SimpleVectorRetriever(documents=technova_docs, k=2)

    # টেস্ট ১: ছুটির নিয়ম অনুসন্ধান
    query = "আমি বছরে কতদিন ছুটি পাব?"
    print(f"🔎 অনুসন্ধান: '{query}'")
    results = retriever.invoke(query)

    print(f"\n📦 খুঁজে পাওয়া শীর্ষ {len(results)} টি ডকুমেন্ট:")
    for idx, doc in enumerate(results, start=1):
        print(f"\n[{idx}] উৎস ফাইল: {doc.metadata['source']} (সেকশন: {doc.metadata['section']})")
        print(f"    বিষয়বস্তু: {doc.page_content}")
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `Document(page_content=..., metadata=...)`: টেক্সটের মূল কনটেন্ট এবং তার সাথে ফাইলের নাম ও সেকশনের মেটাডেটা সুন্দরভাবে সংযুক্ত করে।
* `self.k`: এটি নির্ধারণ করে সার্চ ইঞ্জিন ব্যবহারকারীর প্রশ্নের বিপরীতে একবারে সর্বোচ্চ কয়টি সবচেয়ে প্রাসঙ্গিক অংশ রিটার্ন করবে।
* `invoke(query)`: এটি LangChain-এর আধুনিক স্ট্যান্ডার্ড মেথড, যা ইনপুট কুয়েরি প্রসেস করে প্রাসঙ্গিক ডকুমেন্ট অবজেক্টের তালিকা রিটার্ন করে।

---

## ৭. Output উদাহরণ

উপরের কোডটি রান করলে নিচের মতো আউটপুট দেখতে পাবেন:

```text
🔎 অনুসন্ধান: 'আমি বছরে কতদিন ছুটি পাব?'

📦 খুঁজে পাওয়া শীর্ষ 2 টি ডকুমেন্ট:

[1] উৎস ফাইল: hr_policy.txt (সেকশন: Leave)
    বিষয়বস্তু: TechNova Solutions-এ সকল কর্মী বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন।

[2] উৎস ফাইল: hr_policy.txt (সেকশন: Sick Leave)
    বিষয়বস্তু: অসুস্থতাজনিত ছুটির জন্য টানা ২ দিনের বেশি অনুপস্থিতিতে ডাক্তারের প্রেসক্রিপশন জমা দিতে হবে।
```

লক্ষ্য করুন, কীভাবে রিট্রিভার ছুটির প্রশ্নের বিপরীতে অফিস সময় বা ইন্টারনেট বিলের মতো অপ্রাসঙ্গিক তথ্য বাদ দিয়ে শুধুমাত্র ছুটির ২টি সেকশন খুঁজে এনেছে!

---

## ৮. VitePress Callouts

:::tip `k` প্যারামিটার কতটা রাখবেন?
বাস্তব প্রোডাকশন সিস্টেমে `k` এর মান সাধারণত ৩ থেকে ৫ এর মধ্যে রাখা হয়। খুব বেশি `k` দিলে (যেমন: k=15) LLM-এর প্রম্পট অপ্রয়োজনীয় ডেটায় ভরে যায় (Prompt Bloat), যার ফলে টোকেন খরচ বাড়ে এবং LLM বিভ্রান্ত হতে পারে।
:::

:::warning LangChain মেথডের আপডেট
LangChain-এর পুরোনো ভার্সনে ডকুমেন্ট রিট্রিভ করতে `retriever.get_relevant_documents(query)` ব্যবহার করা হতো। কিন্তু আধুনিক LangChain (LCEL)-এ সর্বত্র স্ট্যান্ডার্ড মেথড হিসেবে **`retriever.invoke(query)`** ব্যবহার করা হয়।
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **মেটাডেটা ফাঁকা রাখা:** `metadata={}` ফাঁকা রাখলে পরবর্তীতে কোন ডকুমেন্ট থেকে উত্তর তৈরি হয়েছে তার রেফারেন্স দেখানো সম্ভব হয় না।
2. **প্রয়োজনের অতিরিক্ত `k` বৃদ্ধি করা:** মনে করা হয় যত বেশি ডেটা পাঠানো হবে তত ভালো উত্তর আসবে। আসলে অতিরিক্ত তথ্য মডেলকে বিভ্রান্ত করে, যাকে বলা হয় *"Lost in the Middle"* সমস্যা।
3. **রিট্রিভারের রেজাল্ট ফিল্টার না করা:** সিমিলারিটি স্কোরের কোনো থ্রেশহোল্ড (Threshold) না রাখলে সম্পূর্ণ অপ্রাসঙ্গিক প্রশ্নেও রিট্রিভার কিছু না কিছু কম স্কোরের নথি তুলে আনে।

---

## ১০. Practice Exercise

**অনুশীলন:**
উপরের কোডে `query` পরিবর্তন করে লিখুন:
`"বাসা থেকে ইন্টারনেটের খরচ কীভাবে দাবি করব?"`
এবং কোডটি রান করে নিশ্চিত করুন যে `finance_policy.txt` এর ১,৫০০ টাকার ডকুমেন্টটি ১ নম্বরে আসছে কিনা।

---

## ১১. Summary (সারসংক্ষেপ)

* **Retriever** হলো ব্যবহারকারীর প্রশ্নের বিপরীতে সবচেয়ে প্রাসঙ্গিক ডকুমেন্ট খুঁজে আনার মূল ইন্টারফেস।
* LangChain-এর মূল ডেটা কনটেইনার হলো **`Document`** যার মধ্যে `page_content` ও `metadata` থাকে।
* আধুনিক LangChain-এ ডকুমেন্ট অনুসন্ধানের জন্য **`retriever.invoke()`** মেথড ব্যবহার করা হয়।
* `k` প্যারামিটার নিয়ন্ত্রণ করে একবারে কয়টি শীর্ষ ডকুমেন্ট ফেরত আসবে।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা শিখব ভেক্টর সার্চের সবচেয়ে জনপ্রিয় ও কার্যকরী গাণিতিক পরিমাপ—**Cosine Similarity** কীভাবে নিখুঁতভাবে হিসেব করতে হয় এবং এর জ্যামিতিক তাৎপর্য কী!
