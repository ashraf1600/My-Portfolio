import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Indexes","description":"","frontmatter":{"title":"Indexes"},"headers":[],"relativePath":"langchain/indexes.md","filePath":"langchain/indexes.md"}');
const _sfc_main = { name: "langchain/indexes.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="indexes-—-langchain-এর-৪র্থ-core-component" tabindex="-1">Indexes — LangChain এর ৪র্থ Core Component <a class="header-anchor" href="#indexes-—-langchain-এর-৪র্থ-core-component" aria-label="Permalink to &quot;Indexes — LangChain এর ৪র্থ Core Component&quot;">​</a></h1><p>LLM শুধু তার training data জানে — তোমার নিজের document, PDF, বা company-র internal data সম্পর্কে কিছুই জানে না। <strong>Indexes</strong> component এই সমস্যার সমাধান করে — এটা LLM কে তোমার নিজের ডেটার সাথে সংযুক্ত করে, যাতে model সেই ডেটার উপর ভিত্তি করে উত্তর দিতে পারে। এটাই RAG (Retrieval-Augmented Generation) এর মূল ভিত্তি।</p><h2 id="indexes-এর-৪টা-sub-component" tabindex="-1">Indexes এর ৪টা Sub-Component <a class="header-anchor" href="#indexes-এর-৪টা-sub-component" aria-label="Permalink to &quot;Indexes এর ৪টা Sub-Component&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    ┌───────────┐</span></span>
<span class="line"><span>                    │  Indexes  │</span></span>
<span class="line"><span>                    └─────┬─────┘</span></span>
<span class="line"><span>          ┌───────────────┼───────────────┬───────────────┐</span></span>
<span class="line"><span>          ▼               ▼               ▼               ▼</span></span>
<span class="line"><span>  ┌───────────────┐ ┌─────────────┐ ┌──────────────┐ ┌────────────┐</span></span>
<span class="line"><span>  │Document Loaders│ │Text Splitters│ │ VectorStores │ │ Retrievers │</span></span>
<span class="line"><span>  └───────────────┘ └─────────────┘ └──────────────┘ └────────────┘</span></span></code></pre></div><p>এই চারটা component একসাথে মিলে একটা সম্পূর্ণ pipeline তৈরি করে — raw document থেকে শুরু করে, শেষে relevant তথ্য খুঁজে বের করা পর্যন্ত।</p><hr><h2 id="প্রতিটা-component-এক-নজরে" tabindex="-1">প্রতিটা Component এক নজরে <a class="header-anchor" href="#প্রতিটা-component-এক-নজরে" aria-label="Permalink to &quot;প্রতিটা Component এক নজরে&quot;">​</a></h2><h3 id="১-document-loaders" tabindex="-1">১. Document Loaders <a class="header-anchor" href="#১-document-loaders" aria-label="Permalink to &quot;১. Document Loaders&quot;">​</a></h3><p>তোমার raw data (PDF, website, Word file, database, CSV — যেকোনো source) থেকে content নিয়ে এসে LangChain এর ব্যবহারযোগ্য <code>Document</code> object এ রূপান্তর করে। এটাই pipeline এর প্রথম ধাপ — data কোথা থেকে আসছে সেটা নির্ধারণ করে।</p><h3 id="২-text-splitters" tabindex="-1">২. Text Splitters <a class="header-anchor" href="#২-text-splitters" aria-label="Permalink to &quot;২. Text Splitters&quot;">​</a></h3><p>Document Loader থেকে পাওয়া content সাধারণত অনেক বড় হয় — একটা পুরো PDF বা ওয়েবপেজ। এত বড় টেক্সট সরাসরি LLM এ পাঠানো যায় না (context window সীমিত), এবং সরাসরি পাঠালে relevant অংশ খুঁজে বের করাও কঠিন হয়ে যায়। Text Splitter এই বড় content কে ছোট ছোট, অর্থপূর্ণ chunk এ ভাগ করে দেয়।</p><h3 id="৩-vectorstores" tabindex="-1">৩. VectorStores <a class="header-anchor" href="#৩-vectorstores" aria-label="Permalink to &quot;৩. VectorStores&quot;">​</a></h3><p>প্রতিটা chunk কে embedding (সংখ্যার array/vector) এ রূপান্তর করে সংরক্ষণ করা হয় VectorStore এ। এই সংরক্ষণ পদ্ধতি এমনভাবে করা হয় যাতে পরে <strong>অর্থগত মিল (semantic similarity)</strong> অনুযায়ী দ্রুত খোঁজা যায় — শুধু keyword match না, বরং একই অর্থ বহনকারী ভিন্ন শব্দের টেক্সটও খুঁজে বের করা যায়।</p><h3 id="৪-retrievers" tabindex="-1">৪. Retrievers <a class="header-anchor" href="#৪-retrievers" aria-label="Permalink to &quot;৪. Retrievers&quot;">​</a></h3><p>User এর প্রশ্ন এলে, Retriever সেই প্রশ্নের সাথে সবচেয়ে relevant chunk গুলো VectorStore থেকে খুঁজে বের করে নিয়ে আসে — যেটা পরে prompt এর সাথে জুড়ে LLM কে পাঠানো হয়।</p><hr><h2 id="পুরো-pipeline-একসাথে-—-কীভাবে-কাজ-করে" tabindex="-1">পুরো Pipeline একসাথে — কীভাবে কাজ করে <a class="header-anchor" href="#পুরো-pipeline-একসাথে-—-কীভাবে-কাজ-করে" aria-label="Permalink to &quot;পুরো Pipeline একসাথে — কীভাবে কাজ করে&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[PDF/Website/Database]</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  Document Loader          ← raw content নিয়ে আসে</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  Text Splitter            ← ছোট ছোট chunk এ ভাগ করে</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  Embedding Model           ← প্রতিটা chunk কে vector এ রূপান্তর করে</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  VectorStore                ← vector গুলো সংরক্ষণ করে রাখে</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         │  (User এর প্রশ্ন আসার পর)</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  Retriever                  ← প্রশ্নের সাথে relevant chunk খুঁজে বের করে</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>  Prompt + LLM               ← relevant chunk + প্রশ্ন একসাথে পাঠিয়ে উত্তর তৈরি</span></span></code></pre></div><p>প্রথম চারটা ধাপ (Loader → Splitter → Embedding → VectorStore) সাধারণত <strong>একবার</strong> করে করা হয় (ডেটা তৈরির সময়), আর Retriever ধাপটা <strong>প্রতিটা user প্রশ্নের জন্য</strong> নতুন করে চলে।</p><hr><h2 id="কেন-এই-চারটা-আলাদা-component-হিসেবে-ভাগ-করা-হয়েছে" tabindex="-1">কেন এই চারটা আলাদা component হিসেবে ভাগ করা হয়েছে <a class="header-anchor" href="#কেন-এই-চারটা-আলাদা-component-হিসেবে-ভাগ-করা-হয়েছে" aria-label="Permalink to &quot;কেন এই চারটা আলাদা component হিসেবে ভাগ করা হয়েছে&quot;">​</a></h2><table tabindex="0"><thead><tr><th>কারণ</th><th>ব্যাখ্যা</th></tr></thead><tbody><tr><td><strong>Modularity</strong></td><td>প্রতিটা ধাপ আলাদা হওয়ায় শুধু একটা অংশ (যেমন VectorStore) বদলানো যায়, বাকি pipeline অক্ষত থাকে</td></tr><tr><td><strong>বিভিন্ন Source সাপোর্ট</strong></td><td>Document Loader আলাদা হওয়ায় PDF, website, database — যেকোনো source থেকে একই পরবর্তী pipeline ব্যবহার করা যায়</td></tr><tr><td><strong>Provider পরিবর্তন সহজ</strong></td><td>Chroma থেকে Pinecone এ যেতে চাইলে শুধু VectorStore অংশ বদলালেই হয়</td></tr><tr><td><strong>টেস্ট করা সহজ</strong></td><td>প্রতিটা ধাপ আলাদাভাবে টেস্ট/ডিবাগ করা যায় — সমস্যা কোথায় হচ্ছে সহজে বোঝা যায়</td></tr></tbody></table><hr><h2 id="সংক্ষেপে" tabindex="-1">সংক্ষেপে <a class="header-anchor" href="#সংক্ষেপে" aria-label="Permalink to &quot;সংক্ষেপে&quot;">​</a></h2><ul><li><strong>Indexes</strong> LLM কে তোমার নিজের ডেটার সাথে সংযুক্ত করে — এটাই RAG এর ভিত্তি</li><li>চারটা sub-component: <strong>Document Loaders</strong> (data আনা), <strong>Text Splitters</strong> (ভাগ করা), <strong>VectorStores</strong> (সংরক্ষণ ও semantic search), <strong>Retrievers</strong> (relevant অংশ খুঁজে বের করা)</li><li>প্রথম তিনটা ধাপ সাধারণত একবার সেটআপ করা হয়, Retriever প্রতিটা query তে নতুন করে চলে</li><li>প্রতিটা component আলাদা রাখার ফলে flexibility এবং maintainability অনেক বেড়ে যায়</li></ul><h2 id="পরবর্তী-ধাপ" tabindex="-1">পরবর্তী ধাপ <a class="header-anchor" href="#পরবর্তী-ধাপ" aria-label="Permalink to &quot;পরবর্তী ধাপ&quot;">​</a></h2><p>এরপরের পেজগুলোতে আমরা প্রতিটা sub-component আলাদাভাবে বিস্তারিত কোড উদাহরণ সহ দেখব — শুরু হবে <strong>Document Loaders</strong> দিয়ে।</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("langchain/indexes.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const indexes = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  indexes as default
};
