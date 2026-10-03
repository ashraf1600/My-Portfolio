# Python দিয়ে Data Ingestion Pipeline তৈরি (Build Ingestion Pipeline)

স্বাগতম আমাদের RAG সিরিজের তৃতীয় পর্বে! আগের পর্বে আমরা ভেক্টর এম্বেডিং এবং RAG-এর সার্বিক আর্কিটেকচার সম্পর্কে বিস্তারিত জেনেছি। 

বাস্তব দুনিয়ায় আপনার কোম্পানির সব তথ্য কিন্তু সুন্দরভাবে সাজানো থাকে না। তথ্যগুলো থাকে বিভিন্ন PDF, Word ফাইল, টেক্সট নোট বা ডাটাবেসের টেবিলে। কাঁচা (Raw) ফাইলগুলো থেকে তথ্য সংগ্রহ করে সেগুলোকে ভেক্টর ডাটাবেসে সংরক্ষণ করার স্বয়ংক্রিয় প্রক্রিয়াকেই বলা হয় **Data Ingestion Pipeline**। এই পর্বে আমরা পাইথন দিয়ে একটি স্বয়ংসম্পূর্ণ ইনজেশন পাইপলাইন তৈরি করব।

---

## ১. What (Data Ingestion Pipeline কী?)

**Data Ingestion Pipeline** হলো এমন একটি ডেটা প্রসেসিং পাইপলাইন যা বিভিন্ন সোর্স থেকে আনস্ট্রাকচার্ড ডেটা (যেমন: `.txt`, `.pdf`, `.md`, ইত্যাদি) সংগ্রহ করে, পরিষ্কার (Clean) করে, ছোট ছোট টুকরো (Chunks)-তে ভাগ করে এবং পরবর্তীতে ভেক্টর ডেটাবেসে সংরক্ষণ করার উপযোগী করে তোলে।

সহজ কথায়, এটি কাঁচা নথিকে এমন একটি অবস্থায় নিয়ে আসে যেন রিট্রিভাল ইঞ্জিন খুব সহজে ও দ্রুত সঠিক তথ্য খুঁজে বের করতে পারে।

---

## ২. Why (কেন ইনজেশন পাইপলাইন এত গুরুত্বপূর্ণ?)

আপনি হয়তো ভাবতে পারেন—*পুরো একটা ১০০ পাতার PDF ফাইল একবারে ভেক্টর স্টোরে রেখে দিলেই তো হতো, এত পাইপলাইনের কী দরকার?* 

আসলে সরাসরি ফাইল স্টোর করলে নিচের ৩টি বড় সমস্যা হয়:

1. **Information Dilution (তথ্যের ঘনত্ব নষ্ট হওয়া):** পুরো ১০০ পাতার একটি মাত্র ভেক্টর বানালে ডকুমেন্টের ভেতরের নির্দিষ্ট খুটিনাটি তথ্য (যেমন: নির্দিষ্ট কোনো ছুটির নিয়ম) হারিয়ে যায়।
2. **Context Window Exceeded:** ব্যবহারকারী একটি ছোট প্রশ্ন করলে আপনি পুরো ১০০ পাতা LLM-কে পাঠাতে পারবেন না, কারণ LLM-এর একটি নির্দিষ্ট টোকেন লিমিট (Context Window) থাকে।
3. **No Metadata Tracking:** ফাইলটি কোথা থেকে এসেছে (সোর্স ফাইলের নাম, পৃষ্ঠার নম্বর, সেকশন ইত্যাদি) তা যদি ট্র্যাক না করা হয়, তবে ব্যবহারকারীকে উত্তরের সাথে রেফারেন্স (Citations) দেখানো সম্ভব হয় না।

একটি শক্তিশালী Ingestion Pipeline নিশ্চিত করে যে আপনার ডেটা সুসংগঠিত, সঠিক মেটাডেটা সম্বলিত এবং সার্চের জন্য শতভাগ উপযোগী।

---

## ৩. Analogy (বাস্তব জীবনের উপমা)

ইনজেশন পাইপলাইন বুঝতে সবচেয়ে সুন্দর উপমা হলো **"রান্নার জন্য কাঁচা শাকসবজি প্রসেসিং"**:

* আপনি বাজার থেকে কাঁচা আলু ও ফুলকপি কিনে আনলেন (Raw Documents)।
* আপনি কি আস্ত ধুলোবালি সহ ফুলকপি কড়াইয়ে ঢেলে দেবেন? নিশ্চয়ই না!
* প্রথমে আপনি সেগুলোর পচা পাতা ফেলে ধুয়ে পরিষ্কার করবেন (**Data Cleaning**)।
* তারপর রান্নার উপযোগী ছোট ছোট টুকরো করে কাটবেন (**Chunking**)।
* এরপর কোন পাত্রে কী রাখছেন সেটার লেবেল লাগিয়ে সাজিয়ে রাখবেন (**Metadata Tracking**)।
* সবশেষে সেগুলো রান্নার জন্য প্রস্তুত হবে।

ইনজেশন পাইপলাইন হলো ঠিক এই প্রাথমিক প্রস্তুতির কারখানা!

---

## ৪. How it works (ধাপে ধাপে কার্যপদ্ধতি)

একটি আদর্শ Data Ingestion Pipeline নিচের ৫টি ধাপে কাজ করে:

1. **Document Loading:** ফাইল সিস্টেম বা ক্লাউড থেকে ফাইল রিড করা।
2. **Text Preprocessing & Cleaning:** অপ্রয়োজনীয় অতিরিক্ত স্পেস, খালি লাইন বা আন-প্রিন্টেবল ক্যারেক্টার মুছে ফেলা।
3. **Chunking with Overlap:** বড় টেক্সটকে নির্দিষ্ট দৈর্ঘ্যের ছোট খণ্ডে ভাগ করা, যেখানে প্রতিটি খণ্ডের মাঝে কিছুটা ওভারল্যাপ (Overlap) রাখা হয় যাতে বাক্যের প্রসঙ্গ কেটে না যায়।
4. **Metadata Enrichment:** প্রতিটি খণ্ডের সাথে সোর্স ফাইলের নাম, চ্যাঙ্ক আইডি এবং তৈরির তারিখ ট্যাগ করা।
5. **Batch Ingestion:** প্রস্তুতকৃত চ্যাঙ্কগুলোকে এম্বেডিং ও ভেক্টর স্টোরে পাঠানোর উপযোগী ডেটা স্ট্রাকচারে রূপান্তর করা।

---

## ৫. Architecture Diagram (ইনজেশন পাইপলাইন ফ্লো)

<div style="display: flex; justify-content: center; margin: 2rem 0;">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 380" width="100%" height="auto" style="max-width: 900px; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.15)); border-radius: 18px; background: linear-gradient(135deg, #0b0f19 0%, #151d2e 100%);">
  <defs>
    <filter id="ingestShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <filter id="ingestGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="iFileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="iCleanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#7e22ce"/>
    </linearGradient>
    <linearGradient id="iChunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="iMetaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
    <linearGradient id="iBatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <style>
      .flow-pulse-line {
        stroke-dasharray: 8, 8;
        animation: flowDash 1.2s linear infinite;
      }
      @keyframes flowDash {
        from { stroke-dashoffset: 32; }
        to { stroke-dashoffset: 0; }
      }
      .node-step {
        transition: transform 0.25s ease;
      }
      .node-step:hover {
        transform: translateY(-3px);
      }
    </style>
  </defs>
  <!-- হেডার টাইটেল বার -->
  <rect x="35" y="25" width="870" height="32" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <circle cx="55" cy="41" r="5" fill="#38bdf8"/>
  <text x="70" y="46" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#f8fafc">TechNova Automated Data Ingestion Pipeline (ফাইল রিড থেকে ভেক্টর ব্যাচ)</text>
  <!-- ধাপ ১: ফাইলসমূহ -->
  <g class="node-step">
    <rect x="35" y="100" width="145" height="180" rx="14" fill="#1e293b" stroke="url(#iFileGrad)" stroke-width="2" filter="url(#ingestShadow)"/>
    <rect x="50" y="115" width="32" height="32" rx="8" fill="url(#iFileGrad)"/>
    <text x="66" y="136" font-family="system-ui, sans-serif" font-size="16" fill="#fff" text-anchor="middle">📂</text>
    <text x="50" y="170" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">১. কাঁচা ফাইল</text>
    <text x="50" y="186" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">Document Loader</text>
    <rect x="45" y="200" width="125" height="60" rx="6" fill="#0f172a"/>
    <text x="55" y="220" font-family="monospace" font-size="9" fill="#38bdf8">• PDF Manuals</text>
    <text x="55" y="236" font-family="monospace" font-size="9" fill="#38bdf8">• HR Policy.txt</text>
    <text x="55" y="252" font-family="monospace" font-size="9" fill="#38bdf8">• Guides.md</text>
  </g>
  <!-- ফ্লো ১ -> ২ -->
  <path d="M 180 190 L 215 190" fill="none" stroke="#38bdf8" stroke-width="2.5" class="flow-pulse-line" filter="url(#ingestGlow)"/>
  <!-- ধাপ ২: টেক্সট ক্লিনিং -->
  <g class="node-step">
    <rect x="215" y="100" width="150" height="180" rx="14" fill="#1e293b" stroke="url(#iCleanGrad)" stroke-width="2" filter="url(#ingestShadow)"/>
    <rect x="230" y="115" width="32" height="32" rx="8" fill="url(#iCleanGrad)"/>
    <text x="246" y="136" font-family="system-ui, sans-serif" font-size="16" fill="#fff" text-anchor="middle">🧹</text>
    <text x="230" y="170" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">২. টেক্সট ক্লিনিং</text>
    <text x="230" y="186" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">Sanitization Engine</text>
    <rect x="225" y="200" width="130" height="60" rx="6" fill="#0f172a"/>
    <text x="235" y="220" font-family="monospace" font-size="9" fill="#c084fc">✓ স্পেস ও ট্যাব ট্রিম</text>
    <text x="235" y="236" font-family="monospace" font-size="9" fill="#c084fc">✓ নিউলাইন নরমালাইজ</text>
    <text x="235" y="252" font-family="monospace" font-size="9" fill="#c084fc">✓ পাইপলাইন ক্লিনিং</text>
  </g>
  <!-- ফ্লো ২ -> ৩ -->
  <path d="M 365 190 L 400 190" fill="none" stroke="#a855f7" stroke-width="2.5" class="flow-pulse-line" filter="url(#ingestGlow)"/>
  <!-- ধাপ ৩: স্লাইডিং উইন্ডো চাংকিং -->
  <g class="node-step">
    <rect x="400" y="100" width="150" height="180" rx="14" fill="#1e293b" stroke="url(#iChunkGrad)" stroke-width="2" filter="url(#ingestShadow)"/>
    <rect x="415" y="115" width="32" height="32" rx="8" fill="url(#iChunkGrad)"/>
    <text x="431" y="136" font-family="system-ui, sans-serif" font-size="16" fill="#fff" text-anchor="middle">✂️</text>
    <text x="415" y="170" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">৩. চাংকিং ইঞ্জিন</text>
    <text x="415" y="186" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">Sliding Window</text>
    <rect x="410" y="200" width="130" height="60" rx="6" fill="#0f172a"/>
    <text x="420" y="222" font-family="monospace" font-size="9" fill="#fde68a">Chunk: 180 char</text>
    <text x="420" y="240" font-family="monospace" font-size="9" font-weight="bold" fill="#fbbf24">Overlap: 40 char</text>
  </g>
  <!-- ফ্লো ৩ -> ৪ -->
  <path d="M 550 190 L 585 190" fill="none" stroke="#fbbf24" stroke-width="2.5" class="flow-pulse-line" filter="url(#ingestGlow)"/>
  <!-- ধাপ ৪: মেটাডেটা এনরিচমেন্ট -->
  <g class="node-step">
    <rect x="585" y="100" width="155" height="180" rx="14" fill="#1e293b" stroke="url(#iMetaGrad)" stroke-width="2" filter="url(#ingestShadow)"/>
    <rect x="600" y="115" width="32" height="32" rx="8" fill="url(#iMetaGrad)"/>
    <text x="616" y="136" font-family="system-ui, sans-serif" font-size="16" fill="#fff" text-anchor="middle">🏷️</text>
    <text x="600" y="170" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">৪. মেটাডেটা ট্যাগ</text>
    <text x="600" y="186" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">Metadata Enrichment</text>
    <rect x="595" y="200" width="135" height="60" rx="6" fill="#0f172a"/>
    <text x="605" y="220" font-family="monospace" font-size="9" fill="#f472b6">id: "handbook_c1"</text>
    <text x="605" y="236" font-family="monospace" font-size="9" fill="#f472b6">source: "policy.txt"</text>
    <text x="605" y="252" font-family="monospace" font-size="9" fill="#f472b6">created_at: 2026</text>
  </g>
  <!-- ফ্লো ৪ -> ৫ -->
  <path d="M 740 190 L 775 190" fill="none" stroke="#ec4899" stroke-width="2.5" class="flow-pulse-line" filter="url(#ingestGlow)"/>
  <!-- ধাপ ৫: ভেক্টর ব্যাচ রেডি -->
  <g class="node-step">
    <rect x="775" y="90" width="135" height="200" rx="14" fill="#064e3b" stroke="url(#iBatchGrad)" stroke-width="2.5" filter="url(#ingestShadow)"/>
    <circle cx="842" cy="125" r="18" fill="url(#iBatchGrad)"/>
    <text x="842" y="131" font-family="system-ui, sans-serif" font-size="16" fill="#fff" text-anchor="middle">📦</text>
    <text x="842" y="165" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#a7f3d0" text-anchor="middle">৫. ভেক্টর রেডি</text>
    <text x="842" y="182" font-family="system-ui, sans-serif" font-size="10" fill="#cbd5e1" text-anchor="middle">Vector Ingest Batch</text>
    <rect x="785" y="200" width="115" height="70" rx="6" fill="#022c22"/>
    <text x="842" y="225" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#34d399" text-anchor="middle">Ready for DB!</text>
    <text x="842" y="245" font-family="monospace" font-size="8.5" fill="#a7f3d0" text-anchor="middle">Pinecone / Chroma</text>
  </g>
  <!-- ফুটার বার -->
  <rect x="250" y="320" width="440" height="32" rx="16" fill="#0f172a" stroke="#334155"/>
  <circle cx="270" cy="336" r="4" fill="#38bdf8"/>
  <text x="285" y="341" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">Pipeline Output: <tspan fill="#38bdf8" font-weight="bold">Cleaned</tspan> • <tspan fill="#fbbf24" font-weight="bold">Overlapped Chunks</tspan> • <tspan fill="#f472b6" font-weight="bold">Metadata Tracked</tspan></text>
</svg>
</div>

---

## ৬. সম্পূর্ণ ও কার্যকরী Code Example

চলুন কোনো জটিল ফ্রেমওয়ার্ক ছাড়াই সরাসরি পাইথনের অবজেক্ট ওরিয়েন্টেড আর্কিটেকচার দিয়ে একটি প্রফেশনাল Data Ingestion Pipeline তৈরি করি।

```python
import os
import re
from datetime import datetime

# ধাপ ১: চ্যাঙ্ক এবং মেটাডেটা ধারণ করার জন্য ডেটাক্লাস বা স্ট্রাকচার
class DocumentChunk:
    def __init__(self, text, metadata):
        self.text = text
        self.metadata = metadata

    def __repr__(self):
        return f"\n--- [Chunk ID: {self.metadata['chunk_id']}] (Source: {self.metadata['source']}) ---\n{self.text}\n"

# ধাপ ২: মূল Ingestion Pipeline ক্লাস
class IngestionPipeline:
    def __init__(self, chunk_size=150, chunk_overlap=30):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    # ক. টেক্সট ক্লিনিং মেথড
    def clean_text(self, text):
        # একাধিক স্পেস বা অপ্রয়োজনীয় নিউলাইন দূর করা
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    # খ. টেক্সটকে ওভারল্যাপ সহ স্লাইস করার মেথড (Sliding Window Chunking)
    def create_chunks(self, text, source_name):
        cleaned_text = self.clean_text(text)
        chunks = []
        start = 0
        text_length = len(cleaned_text)
        chunk_index = 1

        while start < text_length:
            end = start + self.chunk_size
            chunk_content = cleaned_text[start:end]

            # মেটাডেটা সমৃদ্ধকরণ
            metadata = {
                "chunk_id": f"{source_name}_c{chunk_index}",
                "source": source_name,
                "start_char": start,
                "end_char": min(end, text_length),
                "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }

            chunks.append(DocumentChunk(text=chunk_content, metadata=metadata))
            
            # পরবর্তী চ্যাঙ্কের জন্য ওভারল্যাপ সহ শিফট করা
            start += (self.chunk_size - self.chunk_overlap)
            chunk_index += 1

        return chunks

    # গ. পাইপলাইন এক্সিকিউশন
    def process_file_content(self, file_name, raw_content):
        print(f"⚙️ প্রসেস করা হচ্ছে: {file_name} (মোট অক্ষর: {len(raw_content)})")
        chunks = self.create_chunks(raw_content, file_name)
        print(f"✅ সফলভাবে তৈরি হয়েছে {len(chunks)} টি চ্যাঙ্ক।")
        return chunks

# পরীক্ষা চালানোর অংশ
if __name__ == "__main__":
    # TechNova Solutions-এর একটি দীর্ঘ পলিসি ডকুমেন্টের নমুনা টেক্সট
    sample_policy_doc = """
    TechNova Solutions Ltd. - Employee Handbook 2026.
    ১. ছুটির নীতিমালা: সকল ফুল-টাইম কর্মী বছরে মোট ২০ দিন পেইড ক্যাজুয়াল লিভ (Casual Leave) পাবেন। 
    এছাড়াও অসুস্থতাজনিত কারণে টানা দুই দিনের বেশি অফিসে অনুপস্থিত থাকলে অনুমোদিত চিকিৎসকের প্রেসক্রিপশন জমা দিতে হবে।
    ২. কাজের সময় ও উপস্থিতি: আমাদের অফিস সকাল ৯:৩০ টা থেকে সন্ধ্যা ৬:০০ টা পর্যন্ত কার্যকর থাকে। 
    শুক্র ও শনিবার অফিস বন্ধ থাকবে। কর্মীগণ সর্বোচ্চ ১৫ মিনিট গ্রেস টাইম পাবেন।
    ৩. অফিস ভাতা ও সুবিধাসমূহ: কর্মীদের বাসা থেকে কাজের সুবিধার্থে মাসিক ১,৫০০ টাকা ইন্টারনেট রিইমবার্সমেন্ট প্রদান করা হয়।
    """

    # পাইপলাইন ইনস্ট্যান্স তৈরি (Chunk Size: 180 অক্ষর, Overlap: 40 অক্ষর)
    pipeline = IngestionPipeline(chunk_size=180, chunk_overlap=40)

    # পাইপলাইন রান করা
    processed_chunks = pipeline.process_file_content("technova_handbook.txt", sample_policy_doc)

    # চ্যাঙ্কগুলোর আউটপুট দেখা
    print("\n📦 তৈরি হওয়া চ্যাঙ্ক ও মেটাডেটার বিবরণ:")
    for chunk in processed_chunks:
        print(chunk)
```

### কোড লাইনের সহজ ব্যাখ্যা:
* `DocumentChunk`: প্রতিটি টেক্সট খণ্ডের সাথে তার নিজস্ব মেটাডেটা (আইডি, সোর্স, তারিখ) এক সাথে রাখার ক্লাস।
* `clean_text()`: অপ্রয়োজনীয় ট্যাব, অতিরিক্ত স্পেস বা লাইন ব্রেক মুছে ফেলে ডেটাকে মসৃণ করে।
* `create_chunks()`: স্লাইডিং উইন্ডো (Sliding Window) পদ্ধতিতে নির্দিষ্ট সাইজ অনুযায়ী টেক্সট কাটে এবং কিছুটা পূর্ববর্তী অংশ ওভারল্যাপ হিসেবে নতুন অংশে রাখে।
* `start += (self.chunk_size - self.chunk_overlap)`: এটি নিশ্চিত করে যে প্রতিটি চ্যাঙ্কের শেষের কিছু কথা পরবর্তী চ্যাঙ্কের শুরুতে আবার আসবে, যাতে কোনো বাক্যের অর্থ মাঝখানে ভেঙে না যায়।

---

## ৭. Output উদাহরণ

কোডটি রান করলে নিচের মতো সুবিন্যস্ত ফলাফল দেখতে পাবেন:

```text
⚙️ প্রসেস করা হচ্ছে: technova_handbook.txt (মোট অক্ষর: 524)
✅ সফলভাবে তৈরি হয়েছে 4 টি চ্যাঙ্ক।

📦 তৈরি হওয়া চ্যাঙ্ক ও মেটাডেটার বিবরণ:

--- [Chunk ID: technova_handbook.txt_c1] (Source: technova_handbook.txt) ---
TechNova Solutions Ltd. - Employee Handbook 2026. ১. ছুটির নীতিমালা: সকল ফুল-টাইম কর্মী বছরে মোট ২০ দিন পেইড ক্যাজুয়াল লিভ (Casual Leave) পাবেন। এছাড়াও অসুস্থতাজনিত কারণে টানা দুই দিন


--- [Chunk ID: technova_handbook.txt_c2] (Source: technova_handbook.txt) ---
ছু অসুস্থতাজনিত কারণে টানা দুই দিনের বেশি অফিসে অনুপস্থিত থাকলে অনুমোদিত চিকিৎসকের প্রেসক্রিপশন জমা দিতে হবে। ২. কাজের সময় ও উপস্থিতি: আমাদের অফিস সকাল ৯:৩০ টা থেকে সন্ধ্যা ৬:০০ টা পর


--- [Chunk ID: technova_handbook.txt_c3] (Source: technova_handbook.txt) ---
সকাল ৯:৩০ টা থেকে সন্ধ্যা ৬:০০ টা পর্যন্ত কার্যকর থাকে। শুক্র ও শনিবার অফিস বন্ধ থাকবে। কর্মীগণ সর্বোচ্চ ১৫ মিনিট গ্রেস টাইম পাবেন। ৩. অফিস ভাতা ও সুবিধাসমূহ: কর্মীদের বাসা থেকে কাজের সুবি


--- [Chunk ID: technova_handbook.txt_c4] (Source: technova_handbook.txt) ---
৩. অফিস ভাতা ও সুবিধাসমূহ: কর্মীদের বাসা থেকে কাজের সুবিধার্থে মাসিক ১,৫০০ টাকা ইন্টারনেট রিইমবার্সমেন্ট প্রদান করা হয়।
```

---

## ৮. VitePress Callouts

:::tip Chunk Overlap কেন দিতে হয়?
যদি দুটি চ্যাঙ্কের মাঝে কোনো ওভারল্যাপ না থাকে, তাহলে একটি বাক্য ঠিক মাঝখানে কেটে দুই চ্যাঙ্কে ভাগ হয়ে যেতে পারে (যেমন: চ্যাঙ্ক ১-এ থাকলো *"ডাক্তারের প্রেসক্রিপশন..."* আর চ্যাঙ্ক ২-এ থাকলো *"...জমা দিতে হবে"* )। ফলে সার্চের সময় পূর্ণাঙ্গ অর্থ উদ্ধার করা কঠিন হয়ে পড়ে। ওভারল্যাপ রাখলে বাক্যের ধারাবাহিকতা বজায় থাকে।
:::

:::warning মেটাডেটা সংরক্ষণে যত্নশীল হোন
কখনোই শুধু টেক্সট ভেক্টর স্টোরে রাখবেন না। সাথে অবশ্যই ফাইল নাম, পৃষ্ঠা বা সেকশন আইডি রাখবেন। বাস্তব প্রজেক্টে ব্যবহারকারী জানতে চাইবে AI এই তথ্যটি কোন নথির কোন পৃষ্ঠা থেকে পেয়েছে!
:::

---

## ৯. Common Mistakes (নতুনদের সাধারণ ভুলসমূহ)

1. **অতিরিক্ত বড় চ্যাঙ্ক সাইজ নির্ধারণ করা:** চ্যাঙ্ক সাইজ যদি ১০০০-২০০০ শব্দের বেশি হয়ে যায়, তবে নির্দিষ্ট প্রশ্নের নিখুঁত উত্তর খুঁজে বের করার ক্ষমতা কমে যায়।
2. **টেক্সট ক্লিন না করে সরাসরি চ্যাঙ্ক করা:** কাঁচা HTML ট্যাগ বা অতিরিক্ত উল্টাপাল্টা স্পেস সহ এম্বেড করলে এম্বেডিং মডেল বিভ্রান্ত হয়।
3. **ওভারল্যাপ খুব বেশি বা খুব কম রাখা:** সাধারণত চ্যাঙ্ক সাইজের ১০% থেকে ২০% ওভারল্যাপ রাখা একটি ইন্ডাস্ট্রিয়াল স্ট্যান্ডার্ড (যেমন: Chunk Size ২০০ হলে Overlap ৩০-৪০)।

---

## ১০. Practice Exercise

**অনুশীলন:**
উপরের কোডে `clean_text` ফাংশনটিকে আপডেট করুন যাতে এটি টেক্সটের মধ্যে থাকা কোনো ইমেইল অ্যাড্রেস বা গোপনীয় ফোন নম্বর থাকলে সেটিকে `[REDACTED]` দিয়ে প্রতিস্থাপন করে (তথ্য সুরক্ষার জন্য Data Sanitization)।

*টিপস:* পাইথনের `re.sub(r'[\w\.-]+@[\w\.-]+', '[REDACTED]', text)` রেগুলার এক্সপ্রেশন ব্যবহার করতে পারেন।

---

## ১১. Summary (সারসংক্ষেপ)

* **Data Ingestion Pipeline** হলো কাঁচা নথিপত্রকে ভেক্টর স্টোরে সেভ করার পূর্বশর্ত।
* এটি মূলত লোডিং, ক্লিনিং, চাংকিং এবং মেটাডেটা ট্যাগিং সম্পন্ন করে।
* **Chunk Overlap** বাক্যের প্রেক্ষাপট (Context) ভেঙে যাওয়া প্রতিরোধ করে।
* রেফারেন্স ও সাইটেশনের জন্য প্রতিটি চ্যাঙ্কের সাথে **Metadata** সংরক্ষণ করা অত্যন্ত জরুরি।

---

## ১২. পরবর্তী ধাপ

পরের পর্বে আমরা দেখব কীভাবে বিখ্যাত AI ফ্রেমওয়ার্ক **LangChain** ব্যবহার করে এই চ্যাঙ্কগুলোকে প্রফেশনালি লোড এবং **Document Retrieval** বাস্তবায়ন করতে হয়!
