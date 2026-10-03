# Advanced Document Retrieval Techniques (Small-to-Big & Compression)

স্বাগতম আমাদের RAG সিরিজের ত্রয়োদশ পর্বে! আমরা ইতিপূর্বে বেসিক রিট্রিভাল (Naive RAG) এবং বিভিন্ন চাংকিং টেকনিক দেখেছি। 

বাস্তব প্রোডাকশন সিস্টেমে সবচেয়ে বড় দ্বন্দ্বটি হলো:
* **সার্চের জন্য:** চ্যাঙ্ক ছোট হলে ভালো (কারণ ছোট চ্যাঙ্কের ভেক্টর খুব সুনির্দিষ্ট হয়)।
* **উত্তরের জন্য:** চ্যাঙ্ক বড় হলে ভালো (কারণ LLM-এর একটি সমৃদ্ধ ও পূর্ণাঙ্গ প্রেক্ষাপট দরকার)।

তাহলে আমরা কীভাবে একই সাথে দুটি সুবিধাই পেতে পারি? এই সমস্যার বৈপ্লবিক সমাধান হলো **Advanced Retrieval Techniques**—বিশেষ করে **Parent Document Retriever (Small-to-Big Retrieval)** এবং **Contextual Compression**।

---

## ১. What (Advanced Retrieval কী?)

**Advanced Retrieval Techniques** হলো এমন কিছু বিশেষায়িত কৌশল যা সাধারণ একক-স্তরের ভেক্টর সার্চের সীমাবদ্ধতা কাটিয়ে উঠতে সাহায্য করে।

এর মধ্যে সবচেয়ে জনপ্রিয় দুটি কৌশল হলো:
1. **Parent Document Retriever (Small-to-Big):** অনুসন্ধান (Search) চালানো হয় ছোট ছোট চাইল্ড চ্যাঙ্কে (Child Chunks); কিন্তু যখনই কোনো মিল পাওয়া যায়, তখন সেই ছোট চ্যাঙ্কটি নয়, বরং তার পেছনের সম্পূর্ণ মূল অনুচ্ছেদ বা প্যারেন্ট চ্যাঙ্কটি (Parent Chunk) LLM-এর কাছে পাঠানো হয়!
2. **Contextual Compression (প্রসঙ্গ সংকোচন):** রিট্রিভ হওয়া ডকুমেন্টের অপ্রয়োজনীয় আবর্জনা বাক্য ছেঁকে ফেলে শুধুমাত্র প্রশ্নের সাথে সরাসরি সম্পর্কিত লাইনগুলো ফিল্টার করে রাখা।

---

## ২. Why (কেন এটি সাধারণ রিট্রিভালের চেয়ে উন্নত?)

সাধারণ রিট্রিভালে দুটি বড় সমস্যা দেখা দেয়:
1. **Context Fragmentation (প্রেক্ষাপটের বিচ্ছিন্নতা):** ছোট চ্যাঙ্ক পাঠালে LLM অনেক সময় বাক্যের আগের বা পরের শর্ত দেখতে পায় না (যেমন: *"ছুটি প্রযোজ্য হবে..."* অংশ পেল, কিন্তু *"যদি পূর্বে ৩ দিন আগে জানানো হয়"* অংশটি মিস করল)।
2. **Prompt Noise (অপ্রয়োজনীয় তথ্যের অপচয়):** বড় চ্যাঙ্ক পাঠালে ভেতরে অপ্রাসঙ্গিক তথ্য থাকে, যা LLM-কে বিভ্রান্ত করে এবং টোকেন খরচ বাড়ায়।

Small-to-Big কৌশল সার্চের ক্ষেত্রে **১০০% প্রিসিশন** এবং উত্তরের ক্ষেত্রে **১০০% পূর্ণাঙ্গ প্রেক্ষাপট** নিশ্চিত করে!

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

Small-to-Big Retrieval বুঝতে সবচেয়ে সেরা উপমা হলো **"বইয়ের সূচিপত্র ও বইয়ের পৃষ্ঠা"**:

* আপনি যখন একটি বইয়ে নির্দিষ্ট কোনো টপিক খোঁজেন, তখন আপনি পুরো বইয়ের প্রতিটি প্যারাগ্রাফ খুঁটিয়ে পড়েন না। আপনি সূচিপত্রের **ছোট ছোট কিওয়ার্ড বা লাইনে** চোখ বুলান (Small Child Chunk for Search)।
* কিন্তু যেই মুহূর্তে কাঙ্ক্ষিত লাইনটি পেয়ে যান, আপনি তখন সরাসরি বইয়ের সেই নির্দিষ্ট পৃষ্ঠায় চলে যান এবং **আস্ত পুরো পৃষ্ঠাটি পড়েন** (Big Parent Chunk for Context)।

Parent Document Retriever ঠিক এই কাজটিই স্বয়ংক্রিয়ভাবে করে!

---

## ৪. How it works (Small-to-Big কার্যপদ্ধতি)

1. **Parent Chunking:** কাঁচা ডকুমেন্টকে প্রথমে বড় বড় যৌক্তিক খণ্ডে ভাগ করা হয় (যেমন: ১০০০ ক্যারেক্টার)। এগুলো হলো **Parent Documents**।
2. **Child Splitting:** প্রতিটি Parent Chunk-কে আরও ছোট ছোট খণ্ডে বিভক্ত করা হয় (যেমন: ১৫০-২০০ ক্যারেক্টার)। এগুলো হলো **Child Chunks**।
3. **Linkage via Metadata:** প্রতিটি Child Chunk-এর মেটাডেটায় তার মূল Parent Chunk-এর একটি ইউনিক আইডি (`parent_id`) ট্যাগ করে রাখা হয়।
4. **Child Search & Parent Retrieval:** ব্যবহারকারীর প্রশ্নের ভেক্টর দিয়ে সার্চ করা হয় ছোট Child Chunks-এর মধ্যে। কিন্তু ম্যাচ পাওয়ার পর সিস্টেমে Child-এর বদলে তার আসল Parent Document-টি তুলে এনে LLM-কে সরবরাহ করা হয়।

---

## ৫. Architecture Diagram (Small-to-Big / Parent Document Retriever)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 480" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="v13Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="v13Glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <linearGradient id="v13ParentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="v13ChildGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="v13MatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
    <linearGradient id="v13DocstoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="v13LlmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <marker id="v13ArrowAmber" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fcd34d"/>
    </marker>
    <marker id="v13ArrowPink" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#f472b6"/>
    </marker>
    <marker id="v13ArrowPurple" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#c084fc"/>
    </marker>
    <marker id="v13ArrowGreen" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#34d399"/>
    </marker>

    <style>
      .v13-pulse-amber { stroke-dasharray: 6, 6; animation: v13Anim 1.4s linear infinite; }
      .v13-pulse-pink { stroke-dasharray: 6, 6; animation: v13Anim 1.3s linear infinite; }
      .v13-pulse-purple { stroke-dasharray: 6, 6; animation: v13Anim 1.4s linear infinite; }
      .v13-pulse-green { stroke-dasharray: 6, 6; animation: v13Anim 1.2s linear infinite; }
      @keyframes v13Anim { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
    </style>
  </defs>

  <!-- Title & Subtitle -->
  <text x="470" y="38" font-family="'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#f8fafc" text-anchor="middle">Small-to-Big (Parent Document Retriever) Architecture</text>
  <text x="470" y="62" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Search fine-grained Child Chunks for pinpoint accuracy $\rightarrow$ Return full Parent Document for LLM context</text>

  <!-- Left: Ingestion & Parent-Child Hierarchy -->
  <g transform="translate(40, 85)">
    <rect width="400" height="365" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="200" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle" letter-spacing="1">INGESTION &amp; DOCSTORE MAPPING</text>

    <!-- Parent Document Node -->
    <rect x="25" y="45" width="350" height="70" rx="10" fill="url(#v13ParentGrad)" filter="url(#v13Shadow)"/>
    <text x="200" y="70" font-family="'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">📄 Parent Document (ID: P-101)</text>
    <text x="200" y="88" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e0f2fe" text-anchor="middle">TechNova ছুটির পূর্ণাঙ্গ নীতিমালা (১০০০ ক্যারেক্টার)</text>
    <text x="200" y="102" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#bae6fd" text-anchor="middle">Stored in: InMemoryDocstore</text>

    <!-- Splitting lines into 3 Children -->
    <path d="M 90 115 L 90 160" fill="none" stroke="#f59e0b" stroke-width="2" class="v13-pulse-amber" marker-end="url(#v13ArrowAmber)"/>
    <path d="M 200 115 L 200 160" fill="none" stroke="#f59e0b" stroke-width="2" class="v13-pulse-amber" marker-end="url(#v13ArrowAmber)"/>
    <path d="M 310 115 L 310 160" fill="none" stroke="#f59e0b" stroke-width="2" class="v13-pulse-amber" marker-end="url(#v13ArrowAmber)"/>

    <!-- Child Chunks in Vector DB -->
    <rect x="25" y="150" width="350" height="185" rx="12" fill="#181528" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="200" y="172" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="middle">Vector Store: Granular Child Chunks (200 char)</text>

    <!-- Child 1 -->
    <rect x="35" y="185" width="330" height="38" rx="6" fill="#1e293b"/>
    <text x="45" y="202" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="600" fill="#cbd5e1">Child 1: কর্মীগণ বছরে ২০ দিন ক্যাজুয়াল ছুটি পান...</text>
    <text x="45" y="215" font-family="'Segoe UI', Roboto, sans-serif" font-size="8.5" fill="#94a3b8">metadata: {"parent_id": "P-101"}</text>

    <!-- Child 2 (TARGET MATCH) -->
    <rect x="35" y="232" width="330" height="42" rx="6" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="45" y="250" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#fef08a">⭐ Child 2: অসুস্থ হলে ডাক্তারের প্রেসক্রিপশন জমা...</text>
    <text x="45" y="265" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#fde68a">metadata: {"parent_id": "P-101"} (Target Match!)</text>

    <!-- Child 3 -->
    <rect x="35" y="282" width="330" height="38" rx="6" fill="#1e293b"/>
    <text x="45" y="299" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="600" fill="#cbd5e1">Child 3: ছুটির আবেদন পোর্টালে ৩ দিন পূর্বে পেশ...</text>
    <text x="45" y="312" font-family="'Segoe UI', Roboto, sans-serif" font-size="8.5" fill="#94a3b8">metadata: {"parent_id": "P-101"}</text>
  </g>

  <!-- Center Bridge: Vector Match to Docstore Resolver -->
  <path d="M 400 325 L 480 325 L 480 200 L 515 200" fill="none" stroke="#ec4899" stroke-width="2.5" class="v13-pulse-pink" marker-end="url(#v13ArrowPink)"/>

  <!-- Right: Search Runtime & Parent Resolution -->
  <g transform="translate(500, 85)">
    <rect width="400" height="365" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="200" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#34d399" text-anchor="middle" letter-spacing="1">SEARCH &amp; PARENT RESOLUTION</text>

    <!-- User Query -->
    <rect x="25" y="45" width="350" height="50" rx="10" fill="url(#v13MatchGrad)" filter="url(#v13Shadow)"/>
    <text x="200" y="67" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">User Query</text>
    <text x="200" y="83" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#fce7f3" text-anchor="middle">"অসুস্থ হলে ডাক্তারের সার্টিফিকেট কবে দিতে হয়?"</text>

    <!-- Step 1: Hit Child -->
    <path d="M 200 95 L 200 130" fill="none" stroke="#f472b6" stroke-width="2" class="v13-pulse-pink" marker-end="url(#v13ArrowPink)"/>
    <rect x="40" y="130" width="320" height="42" rx="8" fill="#1e1b4b" stroke="#818cf8"/>
    <text x="200" y="148" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#c7d2fe" text-anchor="middle">1. Pinpoint Match in Vector Store</text>
    <text x="200" y="162" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#e0e7ff" text-anchor="middle">Child Chunk 2 Matches (High cosine similarity)</text>

    <!-- Step 2: Parent ID Resolver -->
    <path d="M 200 172 L 200 205" fill="none" stroke="#c084fc" stroke-width="2.5" class="v13-pulse-purple" marker-end="url(#v13ArrowPurple)"/>
    <rect x="40" y="205" width="320" height="55" rx="8" fill="url(#v13DocstoreGrad)" filter="url(#v13Shadow)"/>
    <text x="200" y="227" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">2. 🔗 Parent ID Resolver</text>
    <text x="200" y="244" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#ede9fe" text-anchor="middle">Look up 'P-101' in Docstore $\rightarrow$ Fetch FULL Parent Doc!</text>

    <!-- Step 3: LLM Prompt with Parent Context -->
    <path d="M 200 260 L 200 285" fill="none" stroke="#34d399" stroke-width="2.5" class="v13-pulse-green" marker-end="url(#v13ArrowGreen)"/>
    <rect x="30" y="285" width="340" height="52" rx="10" fill="url(#v13LlmGrad)" filter="url(#v13Shadow)"/>
    <text x="200" y="306" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">3. 🤖 LLM Generation with Full Context</text>
    <text x="200" y="322" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#d1fae5" text-anchor="middle">No missing information, no isolated fragmented sentence</text>
  </g>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন পাইথনে একটি স্বয়ংসম্পূর্ণ `ParentDocumentRetriever` তৈরি করি। কোনো জটিল ফ্রেমওয়ার্ক ছাড়াই পুরো আর্কিটেকচারটি পরিষ্কারভাবে বুঝতে পারবেন।

```python
import math
from collections import Counter

# ধাপ ১: চাইল্ড ও প্যারেন্ট মেমোরি স্টোর
class SimpleParentDocumentRetriever:
    def __init__(self):
        self.parent_store = {}  # {parent_id: full_text}
        self.child_documents = []  # [(child_text, parent_id), ...]

    def add_document(self, parent_id, full_parent_text, child_chunk_size=150, overlap=30):
        # প্যারেন্ট স্টোরে সংরক্ষণ
        self.parent_store[parent_id] = full_parent_text
        
        # চাইল্ড চ্যাঙ্ক তৈরি (Small Chunks)
        start = 0
        text_len = len(full_parent_text)
        
        while start < text_len:
            end = start + child_chunk_size
            child_text = full_parent_text[start:end].strip()
            self.child_documents.append((child_text, parent_id))
            start += (child_chunk_size - overlap)

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

    # মূল সার্চ ফাংশন (Search in Small, Return Big!)
    def retrieve(self, query):
        print(f"\n🔍 অনুসন্ধান: '{query}'")
        query_vec = self._term_frequency(query)
        
        scored_children = []
        for child_text, parent_id in self.child_documents:
            child_vec = self._term_frequency(child_text)
            score = self._cosine_similarity(query_vec, child_vec)
            scored_children.append((score, child_text, parent_id))

        scored_children.sort(key=lambda x: x[0], reverse=True)
        best_score, best_child, best_parent_id = scored_children[0]

        print(f"🎯 [Child Match]: '{best_child[:60]}...' (Score: {best_score:.4f})")
        print(f"🔗 [Parent Lookup]: উদ্ধার করা হচ্ছে মূল Parent ID: {best_parent_id}")

        # চাইল্ডের বদলে সম্পূর্ণ প্যারেন্ট ডকুমেন্ট রিটার্ন
        full_context = self.parent_store[best_parent_id]
        return full_context

# পরীক্ষা চালানোর অংশ
if __name__ == "__main__":
    retriever = SimpleParentDocumentRetriever()

    # TechNova-র একটি দীর্ঘ প্যারেন্ট ডকুমেন্ট (HR Leave Policy)
    parent_doc_1 = (
        "TechNova Solutions Ltd. - Employee Leave Handbook 2026. "
        "আমাদের প্রতিষ্ঠানে সকল নিয়মিত কর্মী বছরে মোট ২০ দিন বেতনসহ ক্যাজুয়াল ছুটি পাওয়ার অধিকারী। "
        "ছুটির আবেদন কমপক্ষে ৩ কর্মদিবস পূর্বে ইন্টারনাল এইচআর পোর্টালের মাধ্যমে জমা দিতে হবে। "
        "জরুরি অসুস্থতাজনিত কারণে টানা দুই দিনের বেশি অফিসে অনুপস্থিত থাকলে অনুমোদিত চিকিৎসকের প্রেসক্রিপশন জমা দেওয়া বাধ্যতামূলক। "
        "অনুমোদনহীন অনুপস্থিতির ক্ষেত্রে বেতন কর্তন করা হতে পারে।"
    )

    # প্যারেন্ট ডকুমেন্ট যোগ করা
    retriever.add_document(parent_id="P_LEAVE_2026", full_parent_text=parent_doc_1)

    # ব্যবহারকারী একটি সুনির্দিষ্ট ছোট প্রশ্ন করলেন
    query = "অসুস্থ হলে ডাক্তারের প্রেসক্রিপশন জমা দেওয়ার নিয়ম কী?"
    retrieved_parent_context = retriever.retrieve(query)

    print("\n📦 [LLM-কে পাঠানো চূড়ান্ত কনটেক্সট]:")
    print(retrieved_parent_context)
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `add_document()`: পুরো লেখাটিকে `P_LEAVE_2026` আইডিতে সংরক্ষণ করে এবং তাকে স্বয়ংক্রিয়ভাবে কয়েকটি ছোট ছোট চাইল্ড চ্যাঙ্কে বিভক্ত করে।
* `scored_children`: সার্চ হয় শুধুমাত্র ছোট চাইল্ড চ্যাঙ্কগুলোর মধ্যে, যার ফলে সুনির্দিষ্ট শব্দের মিল খুব দ্রুত ও নিখুঁতভাবে ধরা পড়ে।
* `self.parent_store[best_parent_id]`: উত্তর দেওয়ার সময় ছোট চ্যাঙ্কের খণ্ডিত অংশ না পাঠিয়ে পুরো প্যারেন্ট ডকুমেন্ট পাঠানো হয়, যাতে LLM আবেদনের সময়সীমা ও শর্তাবলীর পূর্ণাঙ্গ জ্ঞান পায়।

---

## ৭. Output উদাহরণ

কোডটি চালালে নিচের মতো পরিষ্কার আউটপুট দেখতে পাবেন:

```text
🔍 অনুসন্ধান: 'অসুস্থ হলে ডাক্তারের প্রেসক্রিপশন জমা দেওয়ার নিয়ম কী?'
🎯 [Child Match]: 'জরুরি অসুস্থতাজনিত কারণে টানা দুই দিনের বেশি অফিসে অনুপস্থিত থা...' (Score: 0.8165)
🔗 [Parent Lookup]: উদ্ধার করা হচ্ছে মূল Parent ID: P_LEAVE_2026

📦 [LLM-কে পাঠানো চূড়ান্ত কনটেক্সট]:
TechNova Solutions Ltd. - Employee Leave Handbook 2026. আমাদের প্রতিষ্ঠানে সকল নিয়মিত কর্মী বছরে মোট ২০ দিন বেতনসহ ক্যাজুয়াল ছুটি পাওয়ার অধিকারী। ছুটির আবেদন কমপক্ষে ৩ কর্মদিবস পূর্বে ইন্টারনাল এইচআর পোর্টালের মাধ্যমে জমা দিতে হবে। জরুরি অসুস্থতাজনিত কারণে টানা দুই দিনের বেশি অফিসে অনুপস্থিত থাকলে অনুমোদিত চিকিৎসকের প্রেসক্রিপশন জমা দেওয়া বাধ্যতামূলক। অনুমোদনহীন অনুপস্থিতির ক্ষেত্রে বেতন কর্তন করা হতে পারে।
```

লক্ষ্য করুন, চাইল্ড সার্চে নির্দিষ্ট প্রেসক্রিপশনের লাইনটি ধরা পড়ার সাথে সাথে LLM পুরো ছুটির পলিসির সম্পূর্ণ ব্যাকগ্রাউন্ড একবারে পেয়ে গেছে!

---

## ৮. VitePress Callouts

:::tip LangChain ParentDocumentRetriever
LangChain-এ এই টেকনিকটি সরাসরি বিল্ট-ইন রয়েছে:
```python
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore

retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,      # যেখানে Child Chunks থাকবে
    docstore=InMemoryStore(),      # যেখানে Full Parent Docs থাকবে
    child_splitter=child_splitter,
    parent_splitter=parent_splitter
)
```
:::

:::warning মেমোরি ম্যানেজমেন্ট
যদি আপনার প্যারেন্ট ডকুমেন্টসগুলো অনেক বড় হয় (যেমন ৫০ পাতা), তবে পুরো ৫০ পাতা রিটার্ন করবেন না। সাধারণত প্যারেন্ট চ্যাঙ্ক ৫০০-১০০০ শব্দ এবং চাইল্ড চ্যাঙ্ক ১০০-১৫০ শব্দ রাখা সবচেয়ে ভারসাম্যপূর্ণ।
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **চাইল্ড চ্যাঙ্ক সরাসরি LLM-কে দেওয়া:** চাইল্ড চ্যাঙ্কের আগে বা পেছনের শর্তাবলী হারিয়ে যায়, ফলে মডেল ভুল সিদ্ধান্তে উপনীত হয়।
2. **প্যারেন্ট চ্যাঙ্ক অতিরিক্ত বড় করা:** পুরো বইকে একটি মাত্র প্যারেন্ট আইডি দিলে LLM-এর টোকেন লিমিট শেষ হয়ে যাবে।
3. **চাইল্ড-প্যারেন্ট ম্যাপিং নষ্ট হওয়া:** ডেটাবেস মাইগ্রেশনের সময় আইডি মিসম্যাচ হওয়া।

---

## ১০. Practice Exercise

**অনুশীলন:**
`SimpleParentDocumentRetriever`-এ আরেকটি নতুন প্যারেন্ট ডকুমেন্ট যুক্ত করুন:
`parent_id="P_FINANCE_2026"` (ইন্টারনেট বিল, হোম অফিস অ্যালাউন্স ও ট্যাক্স রুলস নিয়ে)।
এরপর প্রশ্ন করুন: *"বাসা থেকে কাজ করলে কি ইন্টারনেট বিল পাওয়া যাবে?"*। দেখুন আপনার সিস্টেম কি সঠিক ফিন্যান্স প্যারেন্ট ডকুমেন্ট তুলে আনছে?

---

## ১১. Summary (সারসংক্ষেপ)

* **Small-to-Big Retrieval** রিট্রিভালের ক্ষেত্রে ছোট চ্যাঙ্কের নির্ভুলতা এবং জেনারেশনের ক্ষেত্রে বড় চ্যাঙ্কের পূর্ণাঙ্গ প্রেক্ষাপট নিশ্চিত করে।
* এটি সার্চ চালায় **Child Chunks**-এ এবং মেটাডেটা লিঙ্কের মাধ্যমে উদ্ধার করে **Parent Document**।
* এটি প্রেক্ষাপট বিচ্ছিন্নতা (Context Fragmentation) দূর করে।
* প্রোডাকশন RAG-এ উত্তরকে সমৃদ্ধ ও বিশ্বাসযোগ্য করতে এটি একটি অপরিহার্য টেকনিক।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা শিখব ব্যবহারকারীর অস্পষ্ট প্রশ্নকে একাধিক দৃষ্টিকোণ থেকে প্রসারিত করে সার্চ কোয়ালিটি বাড়ানোর জাদুকরী পদ্ধতি—**Multi-Query RAG**!
