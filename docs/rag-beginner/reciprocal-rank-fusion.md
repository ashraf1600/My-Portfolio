# Reciprocal Rank Fusion (RRF) পদ্ধতি (Reciprocal Rank Fusion Explained)

স্বাগতম আমাদের RAG সিরিজের পঞ্চদশ পর্বে! আগের পর্বে আমরা Multi-Query RAG দেখেছি, যেখানে একটি প্রশ্নের বদলে ৩-৪টি ভিন্ন সার্চ চালিয়ে অনেকগুলো ফলাফল পাওয়া যায়।

কিন্তু এখানে একটি নতুন চ্যালেঞ্জ তৈরি হয়:
* কুয়েরি ১-এর সার্চ রেজাল্টে একটি ডকুমেন্ট আসলো **১ নম্বরে**।
* কুয়েরি ২-এর সার্চে সেটি আসলো **৪ নম্বরে**।
* কুয়েরি ৩-এর সার্চে সেটি আসলো **২ নম্বরে**।

বিভিন্ন সার্চ তালিকার এই এলোমেলো ফলাফলগুলোকে আমরা কীভাবে বৈজ্ঞানিক উপায়ে একত্রিত করে একটি **একক, সর্বশ্রেষ্ঠ ও সবচেয়ে ন্যায্য র‍্যাংকিং** তৈরি করব? এই গাণিতিক ম্যাজিকের নামই হলো **Reciprocal Rank Fusion (RRF)**!

---

## ১. What (Reciprocal Rank Fusion কী?)

**Reciprocal Rank Fusion (RRF)** হলো একাধিক ভিন্ন ভিন্ন সার্চ অ্যালগরিদম বা কুয়েরি থেকে প্রাপ্ত র‍্যাঙ্কড তালিকাগুলোকে (Ranked Lists) একত্রিত করে একটি একক ও সমন্বিত মাস্টার র‍্যাংকিং তৈরি করার সবচেয়ে জনপ্রিয় অ্যালগরিদম।

এর মূল সৌন্দর্য হলো: এটি সার্চের জটিল স্কোর (যেমন: ০.৮৫২ বনাম ১২.৪) মেলানোর চেষ্টা করে না; বরং ডকুমেন্টটি প্রতিটি তালিকায় **কত নম্বরে (র‍্যাঙ্ক)** ছিল, কেবল সেই অবস্থানের ওপর ভিত্তি করে পয়েন্ট প্রদান করে।

---

## ২. Why (কেন সরাসরি স্কোর যোগ না করে RRF ব্যবহার করব?)

অনেকের মনে হতে পারে: *"বিভিন্ন সার্চের সিমিলারিটি স্কোরগুলোকে সাধারণ যোগ বা গড় করে দিলেই তো হতো!"* 

বাস্তবে এটি মারাত্মক ভুল, কারণ:
1. **ভিন্ন স্কেলের স্কোর (Different Score Scales):** ভেক্টর সার্চের স্কোর থাকে `-১ থেকে +১` বা `০ থেকে ১`-এর মধ্যে। কিন্তু কিওয়ার্ড সার্চের (যেমন BM25) স্কোর হতে পারে `৫, ১৫ বা ৫০`! এগুলো সরাসরি যোগ করলে তুলনা সম্পূর্ণ অন্যায্য হয়ে যায়।
2. **ক্যালিব্রেশনের ঝামেলা নেই:** RRF-এ কোনো জটিল স্কোর নরমালাইজেশন বা ওয়েট (Weight) টিউন করার প্রয়োজন হয় না।
3. **উচ্চ সহনশীলতা (Robustness):** গবেষণায় প্রমাণিত হয়েছে যে একাধিক সার্চ ফলাফলের সংমিশ্রণে জটিল গণিতের চেয়ে RRF সবচেয়ে নির্ভরযোগ্য ফলাফল দেয়।

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

RRF বুঝতে সবচেয়ে চমৎকার উপমা হলো **"একটি রান্নার প্রতিযোগিতা ও তিনজন বিচারক"**:

* ধরুন ৩ জন বিচারক সেরা রাঁধুনি বাছাই করছেন:
  * বিচারক ক নম্বর দেন ১০০-এর স্কেলে।
  * বিচারক খ নম্বর দেন ১০-এর স্কেলে।
  * বিচারক গ নম্বর দেন বর্ণমালায় (A+, B, C)।
* আপনি কি তাদের স্কোরগুলো সরাসরি যোগ করতে পারবেন? কখনই না!
* কিন্তু আপনি যদি দেখেন ৩ জনের তালিকাতেই প্রতিযোগী **"আরিফ"** ১ম বা ২য় স্থান পেয়েছেন, তবে আপনি নিশ্চিতভাবেই বুঝতে পারবেন যে আরিফই প্রতিযোগিতার আসল চ্যাম্পিয়ন!

RRF ঠিক এই বুদ্ধিমত্তা প্রয়োগ করে প্রতিটি তালিকার র‍্যাঙ্ক থেকে চূড়ান্ত চ্যাম্পিয়ন নির্ধারণ করে।

---

## ৪. How it works (গাণিতিক সূত্র ও ধাপসমূহ)

RRF-এর আন্তর্জাতিক মানসম্পন্ন গাণিতিক সূত্রটি হলো:

$$\text{RRF Score}(d) = \sum_{m \in M} \frac{1}{k + r_m(d)}$$

এখানে:
* $d$: নির্দিষ্ট কোনো একটি ডকুমেন্ট।
* $M$: সমস্ত সার্চ তালিকার সেট (যেমন ৩টি কুয়েরির ৩টি রেজাল্ট লিস্ট)।
* $r_m(d)$: $m$ নম্বর তালিকায় ডকুমেন্ট $d$-এর র‍্যাঙ্ক বা অবস্থান ($1, 2, 3 \dots$)। ডকুমেন্টটি কোনো তালিকায় না থাকলে তার স্কোর ০ ধরা হয়।
* $k$: একটি ধ্রুবক বা কনস্ট্যান্ট (ইন্ডাস্ট্রি স্ট্যান্ডার্ড মান হলো **$k = 60$**)। এটি যোগ করা হয় যেন ১ নম্বর র‍্যাঙ্কের ডকুমেন্ট অতিরিক্ত সুবিধা পেয়ে বাকিদের দমন না করে।

---

## ৫. Architecture Diagram (রেসিপ্রোকাল র‍্যাঙ্ক ফিউশন আর্কিটেকচার)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 480" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="v15Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
    <filter id="v15Glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <linearGradient id="v15List1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="v15List2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
    <linearGradient id="v15List3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
    <linearGradient id="v15FormulaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="v15FinalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <marker id="v15ArrowAmber" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#fcd34d"/>
    </marker>
    <marker id="v15ArrowGreen" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
      <path d="M0,1 L8,4.5 L0,8 Z" fill="#34d399"/>
    </marker>

    <style>
      .v15-pulse-amber { stroke-dasharray: 6, 6; animation: v15Anim 1.4s linear infinite; }
      .v15-pulse-green { stroke-dasharray: 6, 6; animation: v15Anim 1.2s linear infinite; }
      @keyframes v15Anim { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
    </style>
  </defs>

  <!-- Title & Subtitle -->
  <text x="470" y="38" font-family="'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700" fill="#f8fafc" text-anchor="middle">Reciprocal Rank Fusion (RRF) Architecture</text>
  <text x="470" y="62" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Score-agnostic, rank-based reciprocal algorithm fusing diverse retrieval pipelines</text>

  <!-- Left: 3 Input Ranked Candidate Lists -->
  <!-- List 1: Dense Vector Search -->
  <g transform="translate(40, 85)">
    <rect width="240" height="105" rx="12" fill="#131d36" stroke="#0284c7" stroke-width="1.8" filter="url(#v15Shadow)"/>
    <rect x="10" y="10" width="220" height="24" rx="6" fill="url(#v15List1Grad)"/>
    <text x="120" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">List 1: Dense Vector Search</text>
    <text x="20" y="52" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">1. Doc A <tspan fill="#38bdf8" font-weight="700">(Rank 1)</tspan></text>
    <text x="20" y="70" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">2. Doc B <tspan fill="#38bdf8" font-weight="700">(Rank 2)</tspan></text>
    <text x="20" y="88" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">3. Doc C <tspan fill="#38bdf8" font-weight="700">(Rank 3)</tspan></text>
  </g>

  <!-- List 2: Sparse BM25 Keyword Search -->
  <g transform="translate(40, 205)">
    <rect width="240" height="105" rx="12" fill="#1a1838" stroke="#4f46e5" stroke-width="1.8" filter="url(#v15Shadow)"/>
    <rect x="10" y="10" width="220" height="24" rx="6" fill="url(#v15List2Grad)"/>
    <text x="120" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">List 2: Sparse BM25 Search</text>
    <text x="20" y="52" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">1. Doc B <tspan fill="#818cf8" font-weight="700">(Rank 1)</tspan></text>
    <text x="20" y="70" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">2. Doc A <tspan fill="#818cf8" font-weight="700">(Rank 2)</tspan></text>
    <text x="20" y="88" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">3. Doc D <tspan fill="#818cf8" font-weight="700">(Rank 3)</tspan></text>
  </g>

  <!-- List 3: Multi-Query Expansion -->
  <g transform="translate(40, 325)">
    <rect width="240" height="105" rx="12" fill="#281525" stroke="#be185d" stroke-width="1.8" filter="url(#v15Shadow)"/>
    <rect x="10" y="10" width="220" height="24" rx="6" fill="url(#v15List3Grad)"/>
    <text x="120" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">List 3: Expanded Query Search</text>
    <text x="20" y="52" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">1. Doc B <tspan fill="#f472b6" font-weight="700">(Rank 1)</tspan></text>
    <text x="20" y="70" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">2. Doc C <tspan fill="#f472b6" font-weight="700">(Rank 2)</tspan></text>
    <text x="20" y="88" font-family="'Segoe UI', Roboto, sans-serif" font-size="9.5" fill="#e2e8f0">3. Doc A <tspan fill="#f472b6" font-weight="700">(Rank 3)</tspan></text>
  </g>

  <!-- Center: RRF Calculation Engine -->
  <g transform="translate(340, 140)">
    <rect width="260" height="230" rx="16" fill="url(#v15FormulaGrad)" filter="url(#v15Shadow)"/>
    <text x="130" y="32" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#fef3c7" text-anchor="middle" letter-spacing="1">FUSION ENGINE (k = 60)</text>
    <text x="130" y="58" font-family="'Courier New', monospace" font-size="14.5" font-weight="700" fill="#ffffff" text-anchor="middle">Score(d) = Σ 1/(60 + r)</text>

    <!-- Detailed score breakdown -->
    <rect x="15" y="75" width="230" height="135" rx="8" fill="#78350f" opacity="0.6"/>
    <text x="25" y="96" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#fef08a">Doc B Calculation:</text>
    <text x="25" y="112" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#ffffff">1/62 + 1/61 + 1/61 = <tspan font-weight="700" fill="#a7f3d0">0.0490</tspan></text>

    <text x="25" y="134" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#fde68a">Doc A Calculation:</text>
    <text x="25" y="150" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#ffffff">1/61 + 1/62 + 1/63 = <tspan font-weight="700" fill="#fef08a">0.0484</tspan></text>

    <text x="25" y="172" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#fde68a">Doc C Calculation:</text>
    <text x="25" y="188" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#ffffff">1/63 + 0 + 1/62 = <tspan font-weight="700" fill="#cbd5e1">0.0320</tspan></text>
  </g>

  <!-- Right: Final Unified Ranking -->
  <g transform="translate(660, 110)">
    <rect width="240" height="280" rx="14" fill="#0f172a" stroke="#10b981" stroke-width="2" filter="url(#v15Shadow)"/>
    <rect x="12" y="12" width="216" height="30" rx="8" fill="url(#v15FinalGrad)"/>
    <text x="120" y="32" font-family="'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">🏆 Unified Master Ranking</text>

    <!-- 1st Rank -->
    <rect x="15" y="55" width="210" height="46" rx="8" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
    <text x="25" y="74" font-family="'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#ffffff">🥇 Rank 1: Doc B</text>
    <text x="25" y="90" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#a7f3d0">Score: 0.0490 (All-List Consensus)</text>

    <!-- 2nd Rank -->
    <rect x="15" y="110" width="210" height="44" rx="6" fill="#1e293b"/>
    <text x="25" y="129" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">🥈 Rank 2: Doc A</text>
    <text x="25" y="144" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#cbd5e1">Score: 0.0484 (Strong Runner Up)</text>

    <!-- 3rd Rank -->
    <rect x="15" y="162" width="210" height="44" rx="6" fill="#1e293b"/>
    <text x="25" y="181" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">🥉 Rank 3: Doc C</text>
    <text x="25" y="196" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#cbd5e1">Score: 0.0320 (Appeared in 2 Lists)</text>

    <!-- 4th Rank -->
    <rect x="15" y="214" width="210" height="44" rx="6" fill="#1e293b"/>
    <text x="25" y="233" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">4. Rank 4: Doc D</text>
    <text x="25" y="248" font-family="'Segoe UI', Roboto, sans-serif" font-size="9" fill="#94a3b8">Score: 0.0158 (Single list only)</text>
  </g>

  <!-- Connectors from 3 lists to Fusion Engine -->
  <path d="M 280 135 L 340 180" fill="none" stroke="#fcd34d" stroke-width="2" class="v15-pulse-amber" marker-end="url(#v15ArrowAmber)"/>
  <path d="M 280 255 L 340 255" fill="none" stroke="#fcd34d" stroke-width="2" class="v15-pulse-amber" marker-end="url(#v15ArrowAmber)"/>
  <path d="M 280 375 L 340 330" fill="none" stroke="#fcd34d" stroke-width="2" class="v15-pulse-amber" marker-end="url(#v15ArrowAmber)"/>

  <!-- Connector from Fusion Engine to Final List -->
  <path d="M 600 255 L 660 255" fill="none" stroke="#34d399" stroke-width="2.8" class="v15-pulse-green" marker-end="url(#v15ArrowGreen)"/>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন পাইথনে স্ক্র্যাচ থেকে একটি পূর্ণাঙ্গ Reciprocal Rank Fusion অ্যালগরিদম বাস্তবায়ন করি এবং TechNova Solutions-এর পলিসি নথিতে এর কার্যকারিতা দেখি।

```python
# TechNova Solutions-এর ডকুমেন্টস
documents = {
    "D1": "TechNova কর্মীগণ বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন।",
    "D2": "অসুস্থতাজনিত কারণে টানা ২ দিনের বেশি অনুপস্থিতিতে ডাক্তারের প্রেসক্রিপশন জমা দিতে হবে।",
    "D3": "অননুমোদিত অনুপস্থিতির ক্ষেত্রে সংশ্লিষ্ট দিনের বেতন কর্তন করা হবে।",
    "D4": "বাসা থেকে কাজের সুবিধার জন্য প্রতি মাসে ১,৫০০ টাকা ইন্টারনেট রিইমবার্সমেন্ট পাওয়া যাবে।"
}

# ৩টি ভিন্ন সার্চ অ্যালগরিদম বা কুয়েরি থেকে পাওয়া আলাদা আলাদা র‍্যাঙ্কড তালিকা
# (ডকুমেন্ট আইডিগুলো তাদের পাওয়ার ক্রমানুসারে সাজানো)
search_results_query1 = ["D1", "D2", "D3"]       # ছুটির সাধারণ কুয়েরি
search_results_query2 = ["D2", "D1", "D4"]       # অসুস্থতার কুয়েরি
search_results_query3 = ["D2", "D3", "D1"]       # ডাক্তারের প্রেসক্রিপশন কুয়েরি

# ধাপ ১: Reciprocal Rank Fusion ফাংশন
def compute_rrf(ranked_lists, k=60):
    rrf_scores = {}  # {doc_id: total_score}

    print(f"⚙️ RRF ক্যালকুলেশন শুরু (Smoothing Constant k = {k}):\n")

    for list_idx, doc_list in enumerate(ranked_lists, start=1):
        for rank, doc_id in enumerate(doc_list, start=1):
            # RRF স্কোর সূত্র: 1 / (k + rank)
            score_contribution = 1.0 / (k + rank)
            
            if doc_id not in rrf_scores:
                rrf_scores[doc_id] = 0.0
            rrf_scores[doc_id] += score_contribution

            print(f"লিস্ট {list_idx} -> [র‍্যাঙ্ক {rank}] {doc_id}: যোগ হলো {score_contribution:.5f}")

    # স্কোরের ভিত্তিতে সর্বোচ্চ থেকে সর্বনিম্ন ক্রমানুসারে সাজানো
    sorted_docs = sorted(rrf_scores.items(), key=lambda item: item[1], reverse=True)
    return sorted_docs

# পরীক্ষা চালানো যাক
if __name__ == "__main__":
    all_search_lists = [search_results_query1, search_results_query2, search_results_query3]

    final_ranked_results = compute_rrf(all_search_lists, k=60)

    print("\n" + "=" * 65)
    print("🏆 [চূড়ান্ত RRF সমন্বিত মাস্টার র‍্যাংকিং]:")
    print("=" * 65)

    for position, (doc_id, total_score) in enumerate(final_ranked_results, start=1):
        content = documents[doc_id]
        print(f"\n🥇 অবস্থান {position} | RRF Score: {total_score:.5f} | ID: {doc_id}")
        print(f"   নথি: {content}")
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `enumerate(doc_list, start=1)`: প্রতিটি লিস্টে ডকুমেন্টের অবস্থান ১-ইনডেক্সড র‍্যাঙ্ক হিসেবে চিহ্নিত করে।
* `1.0 / (k + rank)`: র‍্যাঙ্ক যত ভালো (যেমন ১ নম্বর), ভগ্নাংশটির মান তত বড় হবে।
* `rrf_scores[doc_id] += score_contribution`: সব তালিকার প্রাপ্ত পয়েন্টগুলো একত্র করে যোগ করা হয়।
* লক্ষ্য করুন `D2` ডকুমেন্টটি ৩টি তালিকার দুটিতে ১ নম্বর এবং একটিতে ২ নম্বর অবস্থানে থাকায় সামগ্রিকভাবে শীর্ষ চ্যাম্পিয়ন নির্বাচিত হয়েছে!

---

## ৭. Output উদাহরণ

কোডটি রান করলে নিচের মতো স্পষ্ট ও সুশৃঙ্খল আউটপুট পাবেন:

```text
⚙️ RRF ক্যালকুলেশন শুরু (Smoothing Constant k = 60):

লিস্ট 1 -> [র‍্যাঙ্ক 1] D1: যোগ হলো 0.01639
লিস্ট 1 -> [র‍্যাঙ্ক 2] D2: যোগ হলো 0.01613
লিস্ট 1 -> [র‍্যাঙ্ক 3] D3: যোগ হলো 0.01587
লিস্ট 2 -> [র‍্যাঙ্ক 1] D2: যোগ হলো 0.01639
লিস্ট 2 -> [র‍্যাঙ্ক 2] D1: যোগ হলো 0.01613
লিস্ট 2 -> [র‍্যাঙ্ক 3] D4: যোগ হলো 0.01587
লিস্ট 3 -> [র‍্যাঙ্ক 1] D2: যোগ হলো 0.01639
লিস্ট 3 -> [র‍্যাঙ্ক 2] D3: যোগ হলো 0.01613
লিস্ট 3 -> [র‍্যাঙ্ক 3] D1: যোগ হলো 0.01587

=================================================================
🏆 [চূড়ান্ত RRF সমন্বিত মাস্টার র‍্যাংকিং]:
=================================================================

🥇 অবস্থান 1 | RRF Score: 0.04891 | ID: D2
   নথি: অসুস্থতাজনিত কারণে টানা ২ দিনের বেশি অনুপস্থিতিতে ডাক্তারের প্রেসক্রিপশন জমা দিতে হবে।

🥇 অবস্থান 2 | RRF Score: 0.04839 | ID: D1
   নথি: TechNova কর্মীগণ বছরে মোট ২০ দিন ক্যাজুয়াল ছুটি (Casual Leave) পাবেন।

🥇 অবস্থান 3 | RRF Score: 0.03200 | ID: D3
   নথি: অননুমোদিত অনুপস্থিতির ক্ষেত্রে সংশ্লিষ্ট দিনের বেতন কর্তন করা হবে।

🥇 অবস্থান 4 | RRF Score: 0.01587 | ID: D4
   নথি: বাসা থেকে কাজের সুবিধার জন্য প্রতি মাসে ১,৫০০ টাকা ইন্টারনেট রিইমবার্সমেন্ট পাওয়া যাবে।
```

---

## ৮. VitePress Callouts

:::tip কনস্ট্যান্ট $k=60$ কেন রাখা হয়?
মূল RRF গবেষণাপত্রে (Cormack et al.) প্রমাণিত হয়েছে যে **$k = 60$** রাখলে কোনো তালিকার ১ নম্বর আইটেম অন্য তালিকার আইটেমগুলোর ওপর অসম আধিপত্য বিস্তার করতে পারে না। ফলে একাধিক তালিকার মধ্যে একটি সুষ্ঠু ভারসাম্য তৈরি হয়।
:::

:::warning স্কোর যোগ করার মারাত্মক ভুল
কখনোই ভেক্টর সিমিলারিটি স্কোর এবং BM25 স্কোর সাধারণ যোগফল করবেন না। সবসময় তাদের র‍্যাঙ্ক অবস্থানকে এই RRF সূত্রের মাধ্যমে ফিউজ করুন।
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **০-ইনডেক্সিং দিয়ে ভাগ করা:** র‍্যাঙ্ক ১ থেকে শুরু না করে ০ থেকে শুরু করলে $k=0$ থাকলে ইনফিনিটি এরর হতে পারে। সর্বদা `start=1` ব্যবহার করুন।
2. **অনুপস্থিত ডকুমেন্টে পেনাল্টি দেওয়া:** একটি ডকুমেন্ট সব লিস্টে নাও থাকতে পারে; যেটিতে নেই সেটির জন্য সাধারণ ০ যোগ করাই যথেষ্ট।
3. **ছোট $k$ ব্যবহার করা:** $k$ এর মান ১ বা ২ দিলে প্রথম র‍্যাঙ্কের ডকুমেন্টটি এত বেশি নম্বর পেয়ে যায় যে অন্য কোনো ডকুমেন্ট তাকে আর টপকাতে পারে না।

---

## ১০. Practice Exercise

**অনুশীলন:**
`all_search_lists`-এ আরেকটি নতুন সার্চ রেজাল্ট যোগ করুন:
`search_results_query4 = ["D4", "D1"]`
এবং দেখুন এবার `D1` এবং `D4`-এর অবস্থানে কী ধরনের পরিবর্তন ঘটে!

---

## ১১. Summary (সারসংক্ষেপ)

* **Reciprocal Rank Fusion (RRF)** একাধিক সার্চ ফলাফলকে সুন্দরভাবে একত্রিত করার বিশ্বমানের র‍্যাংকিং পদ্ধতি।
* এটি স্কোরের মানের ওপর নির্ভর না করে তালিকার **র‍্যাঙ্ক পজিশনের** ওপর ভিত্তি করে স্কোর প্রদান করে।
* এটি বিভিন্ন স্কেলের সার্চ সিস্টেমকে (যেমন ভেক্টর ও কিওয়ার্ড সার্চ) সফলভাবে মিশ্রিত করে।
* স্ট্যান্ডার্ড সূত্র: $\frac{1}{60 + \text{Rank}}$।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা এই RRF-কে কাজে লাগিয়ে RAG-এর সবচেয়ে শক্তিশালী সার্চ টেকনিক তৈরি করব—**Hybrid Search (Vector Search + Keyword Search-এর মেলবন্ধন)**!
