import{_ as a,c as i,a1 as n,o as e}from"./chunks/framework.CnnR69hl.js";const r=JSON.parse('{"title":"Linux /etc/skel/ বোঝা","description":"","frontmatter":{},"headers":[],"relativePath":"linux-fundamentals/etc-skel.md","filePath":"linux-fundamentals/etc-skel.md"}'),l={name:"linux-fundamentals/etc-skel.md"};function t(p,s,h,k,c,d){return e(),i("div",null,[...s[0]||(s[0]=[n(`<h1 id="linux-etc-skel-বোঝা" tabindex="-1">Linux /etc/skel/ বোঝা <a class="header-anchor" href="#linux-etc-skel-বোঝা" aria-label="Permalink to &quot;Linux /etc/skel/ বোঝা&quot;">​</a></h1><h2 id="কী-এবং-কেন" tabindex="-1">কী এবং কেন <a class="header-anchor" href="#কী-এবং-কেন" aria-label="Permalink to &quot;কী এবং কেন&quot;">​</a></h2><p><code>/etc/skel/</code> হলো একটা &quot;skeleton&quot; (কাঠামো) ডিরেক্টরি — নতুন user তৈরি হলে তার home directory এর template হিসেবে ব্যবহৃত হয়। যখন আপনি <code>sudo useradd -m ashraf</code> করেন, তখন Linux <code>/etc/skel/</code> থেকে সব ফাইল copy করে <code>/home/ashraf/</code> তে রাখে। এটা নিশ্চিত করে যে প্রতিটা নতুন user একই default configuration দিয়ে শুরু করে — সবার <code>.bashrc</code> থাকে, সবার <code>.profile</code> থাকে, এবং যদি আপনি custom setting যোগ করেন, সবাই পায়।</p><h2 id="মূল-ফাইলগুলো" tabindex="-1">মূল ফাইলগুলো <a class="header-anchor" href="#মূল-ফাইলগুলো" aria-label="Permalink to &quot;মূল ফাইলগুলো&quot;">​</a></h2><table tabindex="0"><thead><tr><th>File</th><th>কী করে</th></tr></thead><tbody><tr><td><code>.bashrc</code></td><td>bash shell configuration (aliases, functions)</td></tr><tr><td><code>.profile</code></td><td>login shell configuration (environment variables)</td></tr><tr><td><code>.bash_logout</code></td><td>logout time এ execute হয়</td></tr><tr><td><code>welcome.txt</code> (custom)</td><td>আপনি নিজে যোগ করতে পারেন</td></tr><tr><td>অন্যান্য directories</td><td>আপনার প্রয়োজন অনুযায়ী তৈরি করুন</td></tr></tbody></table><h2 id="কীভাবে-কাজ-করে" tabindex="-1">কীভাবে কাজ করে <a class="header-anchor" href="#কীভাবে-কাজ-করে" aria-label="Permalink to &quot;কীভাবে কাজ করে&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. sudo useradd -m ashraf  → নতুন user তৈরি করা</span></span>
<span class="line"><span>                 ↓</span></span>
<span class="line"><span>2. Linux /etc/skel/ এর সব ফাইল দেখা</span></span>
<span class="line"><span>                 ↓</span></span>
<span class="line"><span>3. সব ফাইল copy করা /home/ashraf/ এ</span></span>
<span class="line"><span>                 ↓</span></span>
<span class="line"><span>4. Ownership বদল করা ashraf:ashraf এ</span></span>
<span class="line"><span>                 ↓</span></span>
<span class="line"><span>5. Done! ashraf এর কাছে সব default config আছে</span></span></code></pre></div><h2 id="ব্যবহারিক-উদাহরণ" tabindex="-1">ব্যবহারিক উদাহরণ <a class="header-anchor" href="#ব্যবহারিক-উদাহরণ" aria-label="Permalink to &quot;ব্যবহারিক উদাহরণ&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ১. /etc/skel/ এর বর্তমান কন্টেন্ট দেখা</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/skel/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Output:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># .bashrc</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># .profile</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># .bash_logout</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ২. সবার জন্য একটা welcome message যোগ করা</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Welcome to DevOps Lab!&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/skel/welcome.txt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ३. /etc/skel/.bashrc এ custom alias যোগ করা</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;cat &gt;&gt; /etc/skel/.bashrc &lt;&lt; EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"># Custom aliases</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">alias ll=&quot;ls -la&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">alias diskspace=&quot;df -h /&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">alias myinfo=&quot;echo User: \\$(whoami), Hostname: \\$(hostname)&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ४. এখন নতুন user তৈরি করলে সব পাবে</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> useradd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /bin/bash</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sara</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/sara/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># welcome.txt, .bashrc (updated), .profile সব থাকবে</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ५. Sara কে test করা</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> su</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sara</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">myinfo</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Output: User: sara, Hostname: (your-hostname)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">diskspace</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Output: disk usage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ६. যদি user পরে তৈরি হয় (-m ছাড়া)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> useradd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> khan</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># তখন manual copy করতে হয়:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/khan</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/skel/.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/khan/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chown</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> khan:khan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/khan/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /home/khan/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># এখন সব ফাইল আছে</span></span></code></pre></div><h2 id="etc-skel-customization-strategy" tabindex="-1">/etc/skel/ Customization Strategy <a class="header-anchor" href="#etc-skel-customization-strategy" aria-label="Permalink to &quot;/etc/skel/ Customization Strategy&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/etc/skel/ (Template)</span></span>
<span class="line"><span>├── .bashrc</span></span>
<span class="line"><span>│   ├── Aliases</span></span>
<span class="line"><span>│   └── Functions</span></span>
<span class="line"><span>├── .profile</span></span>
<span class="line"><span>│   └── PATH variables</span></span>
<span class="line"><span>├── .bash_logout</span></span>
<span class="line"><span>├── welcome.txt (আপনার)</span></span>
<span class="line"><span>├── .gitconfig (optional)</span></span>
<span class="line"><span>└── projects/ (optional dir)</span></span>
<span class="line"><span>        ↓ (Copy on useradd -m)</span></span>
<span class="line"><span>        ↓</span></span>
<span class="line"><span>/home/newuser/ (নতুন user এর dir)</span></span>
<span class="line"><span>├── .bashrc</span></span>
<span class="line"><span>├── .profile</span></span>
<span class="line"><span>├── .bash_logout</span></span>
<span class="line"><span>├── welcome.txt</span></span>
<span class="line"><span>├── .gitconfig</span></span>
<span class="line"><span>└── projects/</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>Best Practice:</strong></p><p>Production environment এ <code>/etc/skel/</code> customize করার আগে backup রাখুন:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/skel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/skel.bak</span></span></code></pre></div><p>তারপর test করুন একজন user দিয়ে আগে অন্যদের commit করার আগে।</p></div><h2 id="সংক্ষিপ্ত-সারসংক্ষেপ" tabindex="-1">সংক্ষিপ্ত সারসংক্ষেপ <a class="header-anchor" href="#সংক্ষিপ্ত-সারসংক্ষেপ" aria-label="Permalink to &quot;সংক্ষিপ্ত সারসংক্ষেপ&quot;">​</a></h2><ul><li><code>/etc/skel/</code> হলো template — নতুন user এর home directory তৈরির সময় copy হয়</li><li>শুধুমাত্র <code>useradd -m</code> দিয়ে user তৈরি করলে files copy হয় (বিনা <code>-m</code> হলে না)</li><li>প্রতিটা <code>.bashrc</code>, <code>.profile</code>, <code>.bash_logout</code> customize করে global setting দিতে পারেন</li><li>Manual copy: <code>sudo cp -r /etc/skel/. /home/username/</code> + <code>sudo chown -R username:username /home/username/</code></li><li>বদলানো <code>/etc/skel/</code> পরবর্তী users থেকে কার্যকর হয়, পুরনো users এ effect নেই</li></ul>`,14)])])}const F=a(l,[["render",t]]);export{r as __pageData,F as default};
