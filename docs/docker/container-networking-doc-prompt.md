# Container Networking Documentation Master Prompt

আমি একটা VitePress-based technical documentation website বানাচ্ছি (Bangladeshi developer/DevOps community এর জন্য), এবং এখন **Container Networking (Linux Namespace, veth, Bridge দিয়ে একদম শুরু থেকে)** নিয়ে একটা সম্পূর্ণ, গভীর, hands-on ডকুমেন্টেশন লিখতে চাই। আমি তোমাকে শুধু একটা topic এর নাম দিব, আর তুমি সেই topic নিয়ে সম্পূর্ণ, গভীর documentation page লিখবে।

## এই ডকুমেন্টেশনের লক্ষ্য

Docker/Kubernetes এর container networking আসলে ভিতরে ভিতরে কীভাবে কাজ করে — এটা শেখানো standard Linux command-line tool (`ip netns`, `ip link`, `iptables`) দিয়ে, একদম শূন্য থেকে হাতে-কলমে বানিয়ে। লক্ষ্য: পাঠক যেন বুঝতে পারে Docker-এর `bridge`/`host`/`none` network mode গুলো ভিতরে ভিতরে কী করে, magic মনে না হয়ে।

## Writing Style ও Language

- সম্পূর্ণ বাংলায় লিখবে, কিন্তু সব technical term (namespace, veth, bridge, NAT, iptables), command, এবং code ইংরেজিতে রাখবে
- প্রতিটা নতুন term প্রথমবার ব্যবহারের সময় সংক্ষেপে বুঝিয়ে দিবে
- Tone friendly কিন্তু professional — senior Linux/container engineer জুনিয়রকে শেখাচ্ছে এমন অনুভূতি
- আমার দেওয়া topic নিয়ে তোমার নিজের জ্ঞান থেকে comprehensive, hands-on-lab-level গভীরতায় লিখবে

## প্রতিটা Topic-এর জন্য আবশ্যিক Structure

1. **What** — জিনিসটা কী, সংক্ষিপ্ত সংজ্ঞা
2. **Why** — কেন দরকার, container networking-এ এর ভূমিকা কী
3. **Analogy** — বাস্তব জীবনের উপমা (যেমন: network namespace = আলাদা একটা flat/apartment, bridge = সেই flat গুলোর মধ্যে সংযোগকারী করিডোর/সুইচ)
4. **Internal Working** — Linux kernel level-এ ভিতরে ভিতরে কী ঘটছে
5. **Diagram** — Mermaid flowchart/sequenceDiagram দিয়ে network topology, packet flow, বা namespace সংযোগ visualize করবে (এই documentation-এ diagram সবচেয়ে গুরুত্বপূর্ণ অংশ)
6. **সম্পূর্ণ, চালানোর উপযোগী Command-line Demo** — ধাপে ধাপে (`Step 1`, `Step 2`...) প্রতিটা command, এবং command-এর প্রতিটা flag/argument-এর বাংলা ব্যাখ্যা
7. **Expected Output** — command চালালে বাস্তবে যেমন output আসবে, সেটা দেখানো (`ip link list`, `ip route list`, `ping` output ইত্যাদি বাস্তবসম্মত format-এ)
8. **Common Failure/Debugging** — এই ধাপে সাধারণত কী কী ভুল হয়, এবং কীভাবে debug করতে হয় (`ip route list`, `ip neigh` দিয়ে যাচাই করা)
9. **Comparison Table** — যেখানে প্রাসঙ্গিক (যেমন veth vs bridge, Docker network mode-গুলোর তুলনা)
10. **Docker-এর সাথে সংযোগ** — এই Linux-level concept Docker-এর কোন network mode/feature-এর ভিতরে ব্যবহৃত হয়, তা স্পষ্ট করে বলবে
11. **VitePress Callout** — `:::tip`, `:::warning`, `:::danger` ব্যবহার করবে (বিশেষত root/sudo প্রয়োজন, বা sandbox-এ চালানোর সতর্কতার জন্য)
12. **Common Mistakes**
13. **Best Practices**
14. **Interview Questions** — ৩-৪টা প্রশ্ন-উত্তর
15. **Summary**
16. **পরবর্তী ধাপ** — পরের topic-এর দিকে ইঙ্গিত (অন্য file-এর সরাসরি link দিবে না)

## Workflow

- আমি একটা topic-এর নাম দিব
- তুমি প্রথমে একটা **file name** সাজেস্ট করবে (kebab-case, `.md` extension সহ)
- তারপর সম্পূর্ণ content লিখবে, উপরের structure মেনে
- সাথে `config.mts`/`config.mjs`-এর sidebar entry snippet দিবে (copy-paste করার উপযোগী)
- **একবারে একটা topic ই করবে** — আমি "next" না দেওয়া পর্যন্ত এগোবে না
- প্রতিটা topic শেষে জিজ্ঞেস করবে পরের topic-এর জন্য প্রস্তুত কিনা

## Content Consistency — একটাই ধারাবাহিক Lab Environment

পুরো documentation জুড়ে **একই namespace/device নামকরণ convention** ব্যবহার করবে ধারাবাহিকভাবে, যাতে পাঠক একটা লাগাতার lab experience পায়। যেমন `netns0`, `netns1`, `veth0`/`ceth0`, `br0`, IP range `172.18.0.0/16`। একেক topic-এ একেক রকম naming ব্যবহার করবে না।

## Suggested Topic Coverage (এই ক্রমে দিব)

1. Container Networking Fundamentals — Overview (Namespace, veth, Bridge, NAT — সবকিছুর high-level ভূমিকা)
2. Linux Network Namespace (netns) — একটা Isolated Network Environment তৈরি করা
3. Virtual Ethernet Devices (veth) দিয়ে দুইটা Namespace সংযুক্ত করা
4. একাধিক Container/Namespace থাকলে কী সমস্যা হয় (Route Clash) — এবং কেন Bridge দরকার
5. Linux Bridge দিয়ে একাধিক Namespace Interconnect করা
6. Root Namespace থেকে Container-এ যাওয়া — Bridge-কে IP দেওয়া
7. Egress Routing ও NAT (Masquerading) — Container থেকে Internet-এ যাওয়া
8. Port Publishing — বাইরের World থেকে Container-এ পৌঁছানো (DNAT)
9. Docker Network Driver/Mode ব্যাখ্যা — bridge, host, none (উপরের সবকিছুর সাথে সংযোগ)
10. Kubernetes CNI-এর ভূমিকা — Flannel/Calico কেন প্রয়োজন হয় (এই foundation থেকে পরবর্তী ধাপ হিসেবে)

## যা করবে না

- আগে থেকে বানানো অন্য কোনো file-এর path/link reference করবে না, যদি না আমি নিশ্চিত করি
- একসাথে একাধিক topic-এর content লিখবে না
- কোনো bash script/command block অসম্পূর্ণ বা partial দিবে না — প্রতিটা demo শুরু থেকে শেষ পর্যন্ত চালানোর উপযোগী হবে
- Content সংক্ষিপ্ত করবে না — একটা hands-on lab tutorial যতটা বিস্তারিত হওয়া উচিত, ততটাই বিস্তারিত হবে
