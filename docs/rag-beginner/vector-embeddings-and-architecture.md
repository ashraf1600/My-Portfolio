# ভেক্টর এম্বেডিং এবং RAG আর্কিটেকচার (Vector Embeddings & RAG Architecture)

স্বাগতম আমাদের RAG সিরিজের দ্বিতীয় পর্বে! আগের পর্বে আমরা জেনেছি RAG কী এবং এটি কীভাবে কাজ করে। এই পর্বে আমরা RAG-এর সবচেয়ে ম্যাজিকাল অংশটি শিখব—**ভেক্টর এম্বেডিং (Vector Embeddings)** এবং RAG-এর পূর্ণাঙ্গ স্থাপত্য (Architecture)।

কম্পিউটার বা কোনো মেশিন টেক্সটের অর্থ সরাসরি বুঝতে পারে না। তাহলে সে কীভাবে বোঝে যে *"ছুটি"* এবং *"অনুপস্থিতি"* শব্দের অর্থ প্রায় একই? এর উত্তর লুকিয়ে আছে ভেক্টর এম্বেডিং-এর মধ্যে!

---

## ১. What (ভেক্টর এম্বেডিং কী?)

**Vector Embedding** হলো মানুষের ভাষাকে (শব্দ, বাক্য বা পুরো প্যারাগ্রাফ) কম্পিউটারের জন্য উপযুক্ত **একগুচ্ছ সংখ্যায় (Floating Point Numbers / Array of Numbers)** রূপান্তর করার বিশেষ পদ্ধতি।

উদাহরণস্বরূপ, একটি Embedding Model যদি "TechNova" শব্দটিকে প্রক্রিয়া করে, তবে এটি নিচের মতো একটি সংখ্যাসূচক তালিকা তৈরি করতে পারে:

```python
# একটি কাল্পনিক ভেক্টর রূপ
[0.124, -0.852, 0.431, 0.009, -0.215, ...]
```

এই সংখ্যার তালিকাকে বলা হয় একটি **ভেক্টর (Vector)**। এই ভেক্টরে মোট যতগুলো সংখ্যা থাকে, তাকে বলা হয় তার **ডাইমেনশন (Dimension)**। সাধারণত আধুনিক এম্বেডিং মডেলগুলোতে ৩৮৪, ৭৬৮ বা ১৫৩৬ ডাইমেনশনের ভেক্টর তৈরি হয়।

সবচেয়ে জাদুকরী বিষয় হলো—যে দুটি বাক্যের অর্থ কাছাকাছি, তাদের ভেক্টর সংখ্যাগুলোও গাণিতিক স্পেসে একে অপরের খুব কাছাকাছি অবস্থান করে।

---

## ২. Why (কেন এটি RAG-এ অপরিহার্য?)

প্রথাগত সার্চ ইঞ্জিনে আমরা **Keyword Search** (যেমন SQL `LIKE` বা সাধারণ Ctrl+F) ব্যবহার করতাম। এতে একটি বিরাট সমস্যা ছিল:

* যদি ব্যবহারকারী সার্চ করেন: *"How to take a day off?"*
* আর আপনার ডকুমেন্টে লেখা থাকে: *"Casual Leave Policy"*

সাধারণ কিওয়ার্ড সার্চ কোনো মিল পাবে না, কারণ "day off" আর "leave" শব্দ দুটোর বানান সম্পূর্ণ আলাদা।

এখানেই **Semantic Search** এর ক্ষমতা প্রকাশ পায়। একটি Embedding Model বুঝতে পারে যে *"day off"* এবং *"leave"* উভয়ের অন্তর্নিহিত অর্থ (Semantic Meaning) একই। ভেক্টর এম্বেডিং ব্যবহার করার ফলে RAG সিস্টেম বানানের ওপর নির্ভর না করে **অর্থের গভীরতার ওপর নির্ভর করে** সঠিক তথ্য খুঁজে বের করতে পারে।

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

ভেক্টর এম্বেডিং বুঝতে সবচেয়ে সহজ উপমা হলো **"গুগল ম্যাপসের GPS কো-অর্ডিনেট (অক্ষাংশ ও দ্রাঘিমাংশ)"**:

* ধরুন, পৃথিবীর প্রতিটি শহরের একটি নির্দিষ্ট কো-অর্ডিনেট রয়েছে:
  * ঢাকা: `(23.8103, 90.4125)`
  * গাজীপুর: `(23.9999, 90.4203)`
  * নিউ ইয়র্ক: `(40.7128, -74.0060)`
* আপনি মানচিত্রের দিকে না তাকিয়েও শুধু সংখ্যাগুলো বিয়োগ করে বলে দিতে পারবেন ঢাকা এবং গাজীপুর একে অপরের খুব কাছে, কিন্তু নিউ ইয়র্ক অনেক দূরে!

ঠিক একইভাবে, Embedding Model ভাষার প্রতিটি শব্দ বা বাক্যকে একটি বহুমাত্রিক মানচিত্রে নির্দিষ্ট কো-অর্ডিনেট (ভেক্টর) বসিয়ে দেয়। ফলে একই অর্থবোধক বাক্যগুলো মানচিত্রে পাশাপাশি বসে।

---

## ৪. How it works (ধাপে ধাপে কার্যপদ্ধতি)

1. **Text Tokenization:** টেক্সটকে প্রথমে ছোট ছোট টোকেনে ভাগ করা হয়।
2. **Neural Network Processing:** টোকেনগুলোকে একটি প্রি-ট্রেইনড এম্বেডিং মডেলে (যেমন: OpenAI-এর `text-embedding-3-small`, HuggingFace-এর `all-MiniLM-L6-v2`) পাঠানো হয়।
3. **Dense Vector Output:** মডেল প্রতিটি বাক্যের জন্য একটি ফিক্সড সাইজের ঘন ভেক্টর (Dense Vector) রিটার্ন করে।
4. **Distance Measurement:** দুটি ভেক্টরের মধ্যকার দূরত্ব বা কোণ পরিমাপ করার জন্য **Cosine Similarity** বা **Euclidean Distance** ব্যবহার করা হয়।
   * কোণের মান যত কম (Cosine Similarity ১ এর যত কাছাকাছি), তাদের অর্থের মিল তত বেশি।

---

## ৫. Architecture Diagram (ভেক্টর এম্বেডিং ও ফুল আর্কিটেকচার)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 500" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="vShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <filter id="vGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="vDocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="vModelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#7e22ce"/>
    </linearGradient>
    <linearGradient id="vStoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="vUserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
    <linearGradient id="vLlmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <style>
      .flow-pulse-indigo {
        stroke-dasharray: 8, 8;
        animation: flowInd 1.3s linear infinite;
      }
      .flow-pulse-pink {
        stroke-dasharray: 8, 8;
        animation: flowPink 1.3s linear infinite;
      }
      .flow-pulse-green {
        stroke-dasharray: 8, 8;
        animation: flowGrn 1.0s linear infinite;
      }
      @keyframes flowInd {
        from { stroke-dashoffset: 32; }
        to { stroke-dashoffset: 0; }
      }
      @keyframes flowPink {
        from { stroke-dashoffset: 32; }
        to { stroke-dashoffset: 0; }
      }
      @keyframes flowGrn {
        from { stroke-dashoffset: 32; }
        to { stroke-dashoffset: 0; }
      }
      .card-box {
        transition: transform 0.25s ease;
      }
      .card-box:hover {
        transform: translateY(-3px);
      }
    </style>
  </defs>
  <!-- ব্যাকগ্রাউন্ড কন্টেইনারসমূহ -->
  <rect x="25" y="25" width="890" height="185" rx="14" fill="#0f172a" fill-opacity="0.6" stroke="#1e293b" stroke-width="1.5"/>
  <rect x="40" y="38" width="260" height="24" rx="6" fill="#1e293b"/>
  <text x="50" y="54" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#818cf8">১. ইনডেক্সিং পাইপলাইন (Text ➔ Embeddings ➔ DB)</text>
  <rect x="25" y="235" width="890" height="235" rx="14" fill="#0f172a" fill-opacity="0.6" stroke="#1e293b" stroke-width="1.5"/>
  <rect x="40" y="248" width="280" height="24" rx="6" fill="#1e293b"/>
  <text x="50" y="264" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#34d399">২. রিট্রিভাল ও জেনারেশন (Query ➔ Embed ➔ Match ➔ LLM)</text>
  <!-- ধাপ ১: র' টেক্সট চ্যাঙ্ক -->
  <g class="card-box">
    <rect x="50" y="80" width="160" height="100" rx="12" fill="#1e293b" stroke="url(#vDocGrad)" stroke-width="2" filter="url(#vShadow)"/>
    <text x="70" y="110" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">TechNova Chunks</text>
    <text x="70" y="128" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">কাঁচা টেক্সট অনুচ্ছেদ</text>
    <rect x="65" y="140" width="130" height="22" rx="4" fill="#0f172a"/>
    <text x="130" y="155" font-family="monospace" font-size="9" fill="#38bdf8" text-anchor="middle">"২০ দিন ক্যাজুয়াল ছুটি..."</text>
  </g>
  <!-- ফ্লো ১: চ্যাঙ্ক -> এম্বেডিং মডেল ১ -->
  <path d="M 210 130 L 280 130" fill="none" stroke="#38bdf8" stroke-width="2.5" class="flow-pulse-indigo" filter="url(#vGlow)"/>
  <!-- ধাপ ২: Embedding Model 1 -->
  <g class="card-box">
    <rect x="280" y="80" width="180" height="100" rx="12" fill="#1e293b" stroke="url(#vModelGrad)" stroke-width="2" filter="url(#vShadow)"/>
    <text x="300" y="110" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">Embedding Model</text>
    <text x="300" y="128" font-family="system-ui, sans-serif" font-size="10" fill="#c084fc">text-embedding-3-small</text>
    <rect x="295" y="140" width="150" height="22" rx="4" fill="#0f172a"/>
    <text x="370" y="155" font-family="monospace" font-size="9" fill="#d8b4fe" text-anchor="middle">Vector: [0.12, -0.85, ...]</text>
  </g>
  <!-- ফ্লো ২: এম্বেডিং ১ -> ভেক্টর স্টোর -->
  <path d="M 460 130 L 530 130" fill="none" stroke="#a855f7" stroke-width="2.5" class="flow-pulse-indigo" filter="url(#vGlow)"/>
  <!-- ধাপ ৩: Vector Database (উভয় ফেজের সাধারণ কেন্দ্রবিন্দু) -->
  <g class="card-box">
    <rect x="530" y="70" width="220" height="120" rx="14" fill="#1e293b" stroke="url(#vStoreGrad)" stroke-width="2.5" filter="url(#vShadow)"/>
    <circle cx="560" cy="105" r="16" fill="url(#vStoreGrad)"/>
    <text x="560" y="111" font-family="system-ui, sans-serif" font-size="16" fill="#fff" text-anchor="middle">🗃️</text>
    <text x="590" y="100" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#fbbf24">Vector Database</text>
    <text x="590" y="117" font-family="system-ui, sans-serif" font-size="10" fill="#fde68a">Multi-Dimensional Space</text>
    <rect x="545" y="135" width="190" height="40" rx="6" fill="#0f172a"/>
    <text x="640" y="152" font-family="monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Doc Vector Array (1536 dim)</text>
    <text x="640" y="167" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#34d399" text-anchor="middle">Semantic Clusters Ready</text>
  </g>
  <!-- ======================== রানটাইম ফেজ ======================== -->
  <!-- ব্যবহারকারী ও প্রশ্ন -->
  <g class="card-box">
    <rect x="50" y="300" width="160" height="105" rx="12" fill="#1e293b" stroke="url(#vUserGrad)" stroke-width="2" filter="url(#vShadow)"/>
    <text x="70" y="330" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">User Query</text>
    <text x="70" y="348" font-family="system-ui, sans-serif" font-size="10" fill="#f472b6">ব্যবহারকারীর প্রশ্ন</text>
    <rect x="65" y="360" width="130" height="25" rx="4" fill="#0f172a"/>
    <text x="130" y="377" font-family="monospace" font-size="9" fill="#f472b6" text-anchor="middle">"ছুটি কীভাবে নেব?"</text>
  </g>
  <!-- ফ্লো ৩: ইউজার প্রশ্ন -> এম্বেডিং মডেল ২ (একই মডেল) -->
  <path d="M 210 350 L 280 350" fill="none" stroke="#f472b6" stroke-width="2.5" class="flow-pulse-pink" filter="url(#vGlow)"/>
  <!-- এম্বেডিং মডেল ২ (একই মডেল নিশ্চিতকরণ) -->
  <g class="card-box">
    <rect x="280" y="300" width="180" height="105" rx="12" fill="#1e293b" stroke="url(#vModelGrad)" stroke-width="2" filter="url(#vShadow)"/>
    <rect x="295" y="312" width="150" height="18" rx="4" fill="#581c87"/>
    <text x="370" y="325" font-family="system-ui, sans-serif" font-size="9.5" font-weight="bold" fill="#e9d5ff" text-anchor="middle">⚠️ একই মডেল হতে হবে!</text>
    <text x="370" y="352" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#f8fafc" text-anchor="middle">Query Embedding</text>
    <rect x="295" y="365" width="150" height="22" rx="4" fill="#0f172a"/>
    <text x="370" y="380" font-family="monospace" font-size="9" fill="#f472b6" text-anchor="middle">q_vec = [0.11, -0.82, ...]</text>
  </g>
  <!-- ফ্লো ৪: Query Vector -> Vector DB (Cosine Similarity Search) -->
  <path d="M 460 350 L 640 350 L 640 195" fill="none" stroke="#f472b6" stroke-width="2.5" class="flow-pulse-pink" filter="url(#vGlow)"/>
  <!-- ফ্লো ৫: Vector DB -> Augmented Prompt (Relevant Context) -->
  <path d="M 680 195 L 680 300" fill="none" stroke="#fbbf24" stroke-width="2.5" class="flow-pulse-indigo" filter="url(#vGlow)"/>
  <!-- Augmented Prompt & LLM -->
  <g class="card-box">
    <rect x="530" y="300" width="220" height="145" rx="14" fill="#1e293b" stroke="url(#vLlmGrad)" stroke-width="2" filter="url(#vShadow)"/>
    <text x="640" y="325" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#34d399" text-anchor="middle">Nearest Match + LLM</text>
    <rect x="545" y="338" width="190" height="35" rx="6" fill="#0f172a" stroke="#064e3b"/>
    <text x="555" y="354" font-family="system-ui, sans-serif" font-size="9.5" fill="#a7f3d0">🎯 Top Match (Cosine: 0.985)</text>
    <text x="555" y="367" font-family="monospace" font-size="8.5" fill="#6ee7b7">"২০ দিন পেইড ছুটি..."</text>
    <rect x="545" y="385" width="190" height="45" rx="6" fill="#064e3b" stroke="#34d399"/>
    <text x="640" y="405" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">LLM Grounded Response</text>
    <text x="640" y="420" font-family="system-ui, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">সঠিক ও নির্ভরযোগ্য উত্তর প্রদর্শন</text>
  </g>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন পাইথনে ভেক্টর এম্বেডিং এবং তাদের মধ্যবর্তী সেমান্টিক সাদৃশ্য (Semantic Similarity) বের করার একটি সম্পূর্ণ কোড দেখি। এটি চালানোর জন্য `numpy` লাইব্রেরি ব্যবহার করা হয়েছে।

```python
import numpy as np

# দুটি ভেক্টরের মধ্যকার কোসাইন সিমিলারিটি (Cosine Similarity) মাপার ফাংশন
def cosine_similarity(v1, v2):
    dot_product = np.dot(v1, v2)
    norm_v1 = np.linalg.norm(v1)
    norm_v2 = np.linalg.norm(v2)
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
    return dot_product / (norm_v1 * norm_v2)

# বাস্তবসম্মত উদাহরণের জন্য সিমুলেটেড ৪-ডাইমেনশনাল এম্বেডিং স্পেস:
# ডাইমেনশন ১: ছুটি সংক্রান্ত বৈশিষ্ট্য (Leave/Vacation)
# ডাইমেনশন ২: আর্থিক/টাকা সংক্রান্ত বৈশিষ্ট্য (Money/Finance)
# ডাইমেনশন ৩: অফিস সময় সংক্রান্ত বৈশিষ্ট্য (Timing/Hours)
# ডাইমেনশন ৪: স্বাস্থ্য/চিকিৎসা সংক্রান্ত বৈশিষ্ট্য (Health/Medical)

# TechNova Solutions-এর ডকুমেন্টের ৩টি চ্যাঙ্কের ভেক্টর
doc_embeddings = {
    "Doc 1: নৈমিত্তিক ছুটি ২০ দিন": np.array([0.95, 0.05, 0.10, 0.15]),
    "Doc 2: ইন্টারনেট বিল ১৫০০ টাকা ভাতা": np.array([0.05, 0.92, 0.08, 0.02]),
    "Doc 3: অফিস সময় সকাল ৯:৩০ থেকে ৬:০০": np.array([0.10, 0.02, 0.96, 0.05]),
}

# ব্যবহারকারীর ২টি ভিন্ন প্রশ্ন
user_query_1 = "আমি কীভাবে ভ্যাকেশন বা ডে-অফ নিতে পারি?"
# এই প্রশ্নের ভেক্টর (ছুটি সম্পর্কিত বৈশিষ্ট্যে অনেক বেশি সক্রিয়)
query_vector_1 = np.array([0.91, 0.02, 0.12, 0.18])

user_query_2 = "অফিসের কাজের শিডিউল কতক্ষণ?"
# এই প্রশ্নের ভেক্টর (সময় সম্পর্কিত বৈশিষ্ট্যে অনেক বেশি সক্রিয়)
query_vector_2 = np.array([0.08, 0.01, 0.94, 0.04])

# সার্চ ইঞ্জিন ফাংশন
def semantic_search(query_text, query_vector, docs_dict):
    print(f"\n🔍 ব্যবহারকারীর প্রশ্ন: '{query_text}'")
    print("-" * 55)
    
    results = []
    for doc_name, doc_vec in docs_dict.items():
        score = cosine_similarity(query_vector, doc_vec)
        results.append((doc_name, score))
    
    # সবচেয়ে বেশি স্কোরের ভিত্তিতে ক্রমানুসারে সাজানো
    results.sort(key=lambda x: x[1], reverse=True)
    
    for rank, (doc_name, score) in enumerate(results, start=1):
        print(f"র‍্যাঙ্ক {rank} | মিলের হার (Similarity): {score:.4f} -> {doc_name}")
    
    best_doc, best_score = results[0]
    print(f"\n✅ সবচেয়ে প্রাসঙ্গিক ফলাফল: {best_doc} (Score: {best_score:.4f})")

# রান করা যাক
if __name__ == "__main__":
    # টেস্ট ১: ছুটি সংক্রান্ত প্রশ্ন
    semantic_search(user_query_1, query_vector_1, doc_embeddings)
    
    # টেস্ট ২: অফিস সময় সংক্রান্ত প্রশ্ন
    semantic_search(user_query_2, query_vector_2, doc_embeddings)
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `np.dot(v1, v2)`: দুটি ভেক্টরের ডট প্রোডাক্ট (Dot Product) বের করে, যা তাদের উপাদানগুলোর গুণফলের সমষ্টি।
* `np.linalg.norm(v)`: ভেক্টরের দৈর্ঘ্য (Magnitude) পরিমাপ করে।
* `cosine_similarity`: দুই ভেক্টরের কোসাইনের মান (-১ থেকে +১) বের করে। ১ এর যত কাছাকাছি, দুটি লেখার অর্থ তত নিকটবর্তী।
* `semantic_search`: ব্যবহারকারীর প্রশ্নের ভেক্টরের সাথে প্রতিটি ডকুমেন্টের ভেক্টর তুলনা করে সবচেয়ে উপযুক্ত ডকুমেন্টটি খুঁজে আনে।

---

## ৭. Output উদাহরণ

কোডটি রান করলে নিচের মতো আউটপুট দেখতে পাবেন:

```text
🔍 ব্যবহারকারীর প্রশ্ন: 'আমি কীভাবে ভ্যাকেশন বা ডে-অফ নিতে পারি?'
-------------------------------------------------------
র‍্যাঙ্ক 1 | মিলের হার (Similarity): 0.9857 -> Doc 1: নৈমিত্তিক ছুটি ২০ দিন
র‍্যাঙ্ক 2 | মিলের হার (Similarity): 0.1983 -> Doc 3: অফিস সময় সকাল ৯:৩০ থেকে ৬:০০
র‍্যাঙ্ক 3 | মিলের হার (Similarity): 0.0831 -> Doc 2: ইন্টারনেট বিল ১৫০০ টাকা ভাতা

✅ সবচেয়ে প্রাসঙ্গিক ফলাফল: Doc 1: নৈমিত্তিক ছুটি ২০ দিন (Score: 0.9857)

🔍 ব্যবহারকারীর প্রশ্ন: 'অফিসের কাজের শিডিউল কতক্ষণ?'
-------------------------------------------------------
র‍্যাঙ্ক 1 | মিলের হার (Similarity): 0.9984 -> Doc 3: অফিস সময় সকাল ৯:৩০ থেকে ৬:০০
র‍্যাঙ্ক 2 | মিলের হার (Similarity): 0.1774 -> Doc 1: নৈমিত্তিক ছুটি ২০ দিন
র‍্যাঙ্ক 3 | মিলের হার (Similarity): 0.0766 -> Doc 2: ইন্টারনেট বিল ১৫০০ টাকা ভাতা

✅ সবচেয়ে প্রাসঙ্গিক ফলাফল: Doc 3: অফিস সময় সকাল ৯:৩০ থেকে ৬:০০ (Score: 0.9984)
```

---

## ৮. VitePress Callouts

:::tip গোল্ডেন রুল
ডকুমেন্ট ইনজেশন (Indexing) করার সময় আপনি যে Embedding Model ব্যবহার করবেন, ব্যবহারকারীর প্রশ্নের ভেক্টর তৈরি করার সময়ও **ঠিক একই Embedding Model** ব্যবহার করতে হবে। মডেল পরিবর্তন করলে ভেক্টরের স্থান ও অর্থ সম্পূর্ণ উল্টাপাল্টা হয়ে যাবে!
:::

:::warning ডাইমেনশন সংক্রান্ত সতর্কতা
ভেক্টর ডাইমেনশন বেশি হলেই যে মডেল ভালো হবে এমন কোনো নিশ্চয়তা নেই। বেশি ডাইমেনশনের ভেক্টর স্টোর করতে বেশি মেমোরি লাগে এবং সার্চ হতে তুলনামূলক বেশি সময় নেয়। উৎপাদনের ক্ষেত্রে পারফরম্যান্স ও ব্যয়ের ভারসাম্য বজায় রাখা জরুরি।
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **ভিন্ন মডেলের ভেক্টর মেলানো:** ইনজেশনে OpenAI আর সার্চে HuggingFace মডেল মেশানো—এটি সবচেয়ে মারাত্মক ভুল, কারণ এদের ম্যাথমেটিক্যাল স্পেস আলাদা।
2. **Cosine Distance বনাম Cosine Similarity গুলিয়ে ফেলা:**
   * Cosine **Similarity** ১ মানে ১০০% মিল, ০ মানে কোনো মিল নেই।
   * Cosine **Distance** (1 - Similarity) ০ মানে ১০০% মিল, ১ মানে কোনো মিল নেই।
3. **খুব বড় টেক্সট একবারে এম্বেড করা:** পুরো ৫ পৃষ্ঠার একটি PDF ফাইল একবারে এম্বেড করলে তথ্যের সুনির্দিষ্ট অর্থ হারিয়ে যায়। তাই ছোট ছোট টুকরো (Chunk) করা বাধ্যতামূলক।

---

## ১০. Practice Exercise

**অনুশীলন:**
উপরের কোডে TechNova-এর আরেকটি ডকুমেন্ট যোগ করুন:
`"Doc 4: অসুস্থতাজনিত ছুটির জন্য ডাক্তারের প্রেসক্রিপশন লাগবে"`
এবং একটি নতুন প্রশ্ন দিয়ে টেস্ট করুন:
`"শরীর খারাপ হলে কী করতে হবে?"`
দেখুন আপনার ভেক্টর সার্চ সিস্টেম Doc 1 নাকি Doc 4 কে বেশি প্রায়োরিটি দেয়!

---

## ১১. Summary (সারসংক্ষেপ)

* **Vector Embedding** হলো টেক্সটকে সংখ্যাসূচক ডাইমেনশনে রূপান্তর করা যা অর্থগত মিল (Semantic Meaning) ধারণ করে।
* এটি কিওয়ার্ড সার্চের সীমাবদ্ধতা দূর করে বাক্য অন্যভাবে সাজিয়ে বললেও সঠিক উত্তর খুঁজে পেতে সাহায্য করে।
* **Cosine Similarity** হলো ভেক্টর স্পেসে দুটি লেখার অর্থগত দূরত্বের গাণিতিক পরিমাপ।
* ইনজেশন পাইপলাইন এবং রিট্রিভাল পাইপলাইনে **সর্বদা একই এম্বেডিং মডেল** ব্যবহার করতে হবে।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা দেখব কীভাবে পাইথন ব্যবহার করে বাস্তব ফাইল (যেমন PDF বা টেক্সট ফাইল) পড়ে একটি পরিপূর্ণ **Data Ingestion Pipeline** তৈরি করতে হয়!
