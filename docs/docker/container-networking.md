---
title: Container Networking — Docker বাংলা গাইড
description: কন্টেইনার টু কন্টেইনার নেটওয়ার্কিংয়ের গভীর বাস্তব গাইড — veth পেয়ার, লিনাক্স ব্রিজ, নেটওয়ার্ক অ্যালিয়াসিং, host.docker.internal এবং লেগাসি --link এর আধুনিক বিকল্প।
head:
  - - meta
    - name: keywords
      content: docker container networking bangla, docker veth pair, host docker internal, docker network alias, container to container communication
---

# 🌐 Container Networking

## Container Networking কী? (What)

**Container Networking (কন্টেইনার নেটওয়ার্কিং)** হলো লিনাক্স কার্নেলের নেটওয়ার্ক নেমস্পেস এবং ভার্চুয়াল ইথারনেট ইন্টারফেসের সমন্বয়ে তৈরি এমন একটি ব্যবস্থা, যা একাধিক ডকার কন্টেইনারকে নিজেদের মধ্যে উচ্চগতির ডেটা আদান-প্রদান করতে দেয় এবং প্রয়োজন অনুযায়ী হোস্ট মেশিন বা বাইরের ইন্টারনেটের সাথে সংযুক্ত করে।

সহজ ভাষায়: ডকার কন্টেইনারগুলোর প্রতিটি নিজস্ব একটি সম্পূর্ণ ভার্চুয়াল লিনাক্স নেটওয়ার্ক স্ট্যাক (ভার্চুয়াল নেটওয়ার্ক কার্ড `eth0`, রাউটিং টেবিল ও আইপি) পায়। কন্টেইনার নেটওয়ার্কিং নির্ধারণ করে— কোন কন্টেইনার কার সাথে কথা বলতে পারবে, কার সাথে পারবে না, এবং হোস্টের ভেতরে চলা কোনো লোকাল সার্ভিসকে কন্টেইনার কীভাবে এক্সেস করবে।

---

## কেন Container Networking মেকানিজম গভীরভাবে জানা দরকার? (Why)

```
❌ নেটওয়ার্কের গভীর মেকানিজম না জানলে (Before):
   - কন্টেইনারের ভেতর থেকে হোস্টের লোকাল সার্ভিসে (যেমন হোস্টে চলা Postgres) কানেক্ট করতে না পারা
   - মাইক্রোসার্ভিসে রাউন্ড-রবিন ক্লায়েন্ট লোড ব্যালান্সিং কীভাবে কাজ করে তা বুঝতে না পারা
   - লিনাক্সে `veth` পেয়ার ও ব্রিজের ইন্টারনাল প্যাকেট ফ্লো না বুঝে নেটওয়ার্ক ড্রপ ডিবাগ করতে না পারা
   - পুরোনো লিগ্যাসি `--link` ব্যবহার করে কোড আনস্টেবল করে ফেলা

✅ নেটওয়ার্কের মেকানিজম আয়ত্ত থাকলে (After):
   - `host.docker.internal` ব্যবহার করে কন্টেইনার থেকে হোস্ট মেশিনের যেকোনো সার্ভিস অনায়াসে অ্যাক্সেস করা যায়
   - Network Aliases (`--network-alias`) দিয়ে কোনো এক্সটার্নাল লোড ব্যালান্সার ছাড়াই ডিএনএস রাউন্ড-রবিন করা যায়
   - লিনাক্স `veth` পেয়ার ও `iptables` ট্রাফিক ফ্লো ডিবাগ করে প্রোডাকশন নেটওয়ার্ক অপ্টিমাইজ করা যায়
   - এন্টারপ্রাইজ মাইক্রোসার্ভিসের জিরো-ট্রাস্ট সিকিউরিটি আর্কিটেকচার তৈরি করা যায়
```

---

## How it Works — Virtual Ethernet (`veth`) ও ব্রিজ আর্কিটেকচার 🔬

ডকার ইঞ্জিন যখন কোনো কন্টেইনারকে একটি ব্রিজ নেটওয়ার্কে যুক্ত করে, তখন লিনাক্স কার্নেলে একটি **Virtual Ethernet Pair (`veth` pair)** তৈরি হয়।

- এই ভার্চুয়াল কেবলের **এক প্রান্ত (`eth0`)** থাকে কন্টেইনারের নিজস্ব নেটওয়ার্ক নেমস্পেসের ভেতরে।
- এবং **অন্য প্রান্ত (`vethXXXX`)** যুক্ত থাকে হোস্ট মেশিনের সফটওয়্যার ব্রিজ (`docker0` বা `br-XXXX`) এর সাথে।

```mermaid
graph TB
    subgraph "Host Operating System (Kernel)"
        Bridge["🌉 Docker Linux Bridge (br-nexgen-net)<br/>IP: 172.20.0.1"]
        IPTables["🔥 iptables NAT (Packet Routing)"]
        HostNIC["🖥️ Physical NIC: eth0 (Host IP: 192.168.1.50)"]

        Bridge <--> IPTables <--> HostNIC
    end

    subgraph "Container 1: nexgen-api"
        C1_NIC["eth0 (IP: 172.20.0.2)"]
    end

    subgraph "Container 2: nexgen-db"
        C2_NIC["eth0 (IP: 172.20.0.3)"]
    end

    C1_NIC ===|"veth1a2b (Virtual Cable)"| Bridge
    C2_NIC ===|"veth3c4d (Virtual Cable)"| Bridge

    style Bridge fill:#FFE4B5,stroke:#FFA500,stroke-width:2px
    style C1_NIC fill:#D4EDDA,stroke:#28A745
    style C2_NIC fill:#D4EDDA,stroke:#28A745
    style HostNIC fill:#E6F3FF,stroke:#0066CC
```

---

## ১. Network Aliasing — ডিএনএস রাউন্ড-রবিন লোড ব্যালান্সিং ⚡

ডকারের একটি অবিশ্বাস্য শক্তিশালী ফিচার হলো **Network Alias (`--network-alias`)**। 

যদি আপনি একই নেটওয়ার্কে একাধিক কন্টেইনারকে **একই অ্যালিয়াস নাম** দিয়ে চালু করেন, ডকারের বিল্ট-ইন Embedded DNS স্বয়ংক্রিয়ভাবে **Round-Robin DNS** এর মাধ্যমে রিকোয়েস্টগুলোকে কন্টেইনারগুলোর মধ্যে ভাগ করে দেয়!

```mermaid
sequenceDiagram
    autonumber
    participant Client as 📦 Caller Service
    participant DNS as 🧠 Embedded DNS (127.0.0.11)
    participant Worker1 as 📦 Worker 1 (172.20.0.2)
    participant Worker2 as 📦 Worker 2 (172.20.0.3)

    Client->>DNS: Lookup "ai-service" (1st Request)
    DNS-->>Client: Returns IP: 172.20.0.2
    Client->>Worker1: Request processed by Worker 1

    Client->>DNS: Lookup "ai-service" (2nd Request)
    DNS-->>Client: Returns IP: 172.20.0.3
    Client->>Worker2: Request processed by Worker 2 (Auto Load Balanced!)
```

### Hands-on: Network Alias টেস্ট করা

```bash
# ১. নেটওয়ার্ক তৈরি
docker network create nexgen-cluster-net

# ২. একই অ্যালিয়াস দিয়ে দুটি আলাদা FastAPI ওয়ার্কার কন্টেইনার রান করি
docker run -d --name worker-1 --network nexgen-cluster-net --network-alias ai-service python:3.12-slim python3 -m http.server 8000
docker run -d --name worker-2 --network nexgen-cluster-net --network-alias ai-service python:3.12-slim python3 -m http.server 8000
```

```bash
# ৩. ডিএনএস রাউন্ড-রবিন টেস্ট করি (একই নামে একাধিক আইপি আসবে!)
docker run --rm --network nexgen-cluster-net python:3.12-slim python3 -c "
import socket
print('Resolved IPs for ai-service:', socket.gethostbyname_ex('ai-service')[2])
"
```

**বাস্তব Output:**
```text
Resolved IPs for ai-service: ['172.20.0.3', '172.20.0.2']
```
*(দেখলেন? `ai-service` নামের পেছনে স্বয়ংক্রিয়ভাবে দুটি কন্টেইনারের আইপি লোড ব্যালান্স হয়ে গেছে!)*

---

## ২. কন্টেইনার থেকে হোস্ট মেশিনে কানেক্ট করা (`host.docker.internal`) 💻

অনেক সময় আপনার হোস্ট মেশিনে লোকালভাবে চলা কোনো সার্ভিস (যেমন আপনার ল্যাপটপের লোকাল PostgreSQL, Redis বা অন্য কোনো পোর্ট) কন্টেইনারের ভেতর থেকে অ্যাক্সেস করার দরকার হয়।

কন্টেইনারের ভেতর `localhost` দিলে সে নিজেকে খোঁজে। তাহলে হোস্টের সাথে কীভাবে যোগাযোগ করবেন?

### সমাধান: `host.docker.internal`

- **Windows & macOS (Docker Desktop):** বাই-ডিফল্ট ডকার স্পেশাল ডিএনএস নাম **`host.docker.internal`** প্রদান করে।
- **Linux:** লিনাক্সে কন্টেইনার রান করার সময় **`--add-host=host.docker.internal:host-gateway`** ফ্ল্যাগ দিতে হয়।

```mermaid
graph LR
    subgraph "Docker Container"
        App["📦 NexGen App<br/>Calls: host.docker.internal:5432"]
    end

    subgraph "Host Machine (Your Laptop)"
        HostDB["💾 Local PostgreSQL running directly on Host OS (Port 5432)"]
    end

    App ===|"Bridges to Host Gateway"| HostDB

    style App fill:#D4EDDA,stroke:#28A745
    style HostDB fill:#FFE4B5,stroke:#FFA500,stroke-width:2px
```

### ব্যবহারিক কমান্ড:

```bash
# লিনাক্স ও ডকার ডেস্কটপে হোস্ট সার্ভিসে কানেক্ট করে কন্টেইনার চালানো
docker run -it --rm \
  --add-host=host.docker.internal:host-gateway \
  python:3.12-slim \
  python3 -c "
import socket
print('Host Gateway IP:', socket.gethostbyname('host.docker.internal'))
"
```

**বাস্তব Output:**
```text
Host Gateway IP: 172.17.0.1
```
*(এখন আপনার পাইথন কোডে `DATABASE_URL = "postgresql://user:pass@host.docker.internal:5432/db"` লিখলেই হোস্টের ডাটাবেজে কানেক্ট হয়ে যাবে!)*

---

## ৩. লেগাসি `--link` বনাম মডার্ন ইউজার ব্রিজ 🚫

ডকারের শুরুর দিকে কন্টেইনারদের মধ্যে যোগাযোগ করাতে `--link` ফ্ল্যাগ ব্যবহার করা হতো:
```bash
# ❌ পুরোনো ও বিলুপ্ত পদ্ধতি (Deprecated):
docker run --name api --link db:database nexgen-api
```

### কেন `--link` সম্পূর্ণ বাতিল করা হয়েছে?
১. এটি কন্টেইনারের `/etc/hosts` ফাইলে স্ট্যাটিক হার্ডকোডেড আইপি লিখে দিত।
২. যদি ডাটাবেজ কন্টেইনার রিস্টার্ট হয়ে নতুন আইপি পেত, এপিআই কন্টেইনারের সংযোগ চিরতরে ভেঙে যেত।
৩. এটি শুধুমাত্র একটি নির্দিষ্ট দিকে ওয়ান-ওয়ে কানেকশন দিত।

**আধুনিক সমাধান:** ইউজার-ডিফাইন্ড ব্রিজ নেটওয়ার্ক (`docker network create`) — যেখানে ডকারের লাইভ Embedded DNS স্বয়ংক্রিয়ভাবে ডায়নামিক আইপি আপডেট হ্যান্ডল করে।

---

## Comparison Table — কন্টেইনার কানেকশন প্যাটার্নসমূহ

| কানেকশন দৃশ্যপট | কী ব্যবহার করবেন | উদাহরণ |
|---|---|---|
| **কন্টেইনার ➔ অন্য কন্টেইনার** | কাস্টম নেটওয়ার্কে **কন্টেইনার নেম** | `http://nexgen-db:5432` |
| **কন্টেইনার ➔ একাধিক লোড ব্যালান্সড কন্টেইনার** | **Network Alias** (`--network-alias`) | `http://ai-service:8000` |
| **কন্টেইনার ➔ হোস্ট মেশিনের লোকাল সার্ভিস** | **`host.docker.internal`** | `http://host.docker.internal:5432` |
| **বাইরের ক্লায়েন্ট ➔ কন্টেইনার** | **Port Mapping** (`-p 8000:8000`) | `http://localhost:8000` |

---

## Common Mistakes — নতুনদের সাধারণ ভুল

### ১. কন্টেইনার থেকে হোস্টে কানেক্ট করতে `localhost` ব্যবহার করা
❌ **ভুল:** কন্টেইনারে `DATABASE_URL="postgresql://localhost:5432"` দিয়ে ভাবা যে ল্যাপটপের ডাটাবেজে কানেক্ট হবে।
✅ **সঠিক:** হোস্টের জন্য সবসময় `host.docker.internal` ব্যবহার করুন।

### ২. লিনাক্সে `--add-host` ফ্ল্যাগ দিতে ভুলে যাওয়া
❌ **ভুল:** লিনাক্স সার্ভারে `host.docker.internal` দিয়ে নাম রেজলভ না হওয়া।
✅ **সঠিক:** লিনাক্সে `docker run` এর সাথে `--add-host=host.docker.internal:host-gateway` বা কম্পোজ ফাইলে `extra_hosts` যুক্ত করুন।

### ৩. নেটওয়ার্ক অ্যালিয়াসে একই নাম দিলে কনফ্লিক্ট হবে ভাবা
❌ **ভুল:** ভাবা যে দুটি কন্টেইনারকে একই অ্যালিয়াস নাম দিলে ডকার এরর দেবে।
✅ **সঠিক:** এটি ডকারের একটি দারুণ ফিচার! একই অ্যালিয়াস দিলে ডকার ডিএনএস স্বয়ংক্রিয়ভাবে রাউন্ড-রবিন ব্যালান্সিং করে।

---

## Best Practices

1. **সর্বদা ইউজার-ডিফাইন্ড ব্রিজ ব্যবহার করুন**: ডিফল্ট ব্রিজ এড়িয়ে চলুন।
2. **কম্পোজ ফাইলে `extra_hosts` ব্যবহার করুন**:
   ```yaml
   services:
     api:
       extra_hosts:
         - "host.docker.internal:host-gateway"
   ```
3. **কন্টেইনার নেটওয়ার্ক ইন্টারফেস অডিট করুন**: কোনো সমস্যা হলে `docker exec -it <container> ip addr` বা `cat /etc/resolv.conf` দিয়ে ডিএনএস চেক করুন।

---

## Interview Questions ও Answers

### ১. লিনাক্সে Docker Virtual Ethernet (`veth`) পেয়ার কীভাবে কাজ করে?

**উত্তর:** লিনাক্স কার্নেলের `veth` (Virtual Ethernet) হলো একটি দ্বিমুখী পাইপলাইনের মতো ভার্চুয়াল কেবল ইন্টারফেস। 
ডকার যখন একটি কন্টেইনারকে ভার্চুয়াল ব্রিজ নেটওয়ার্কে সংযুক্ত করে, তখন একটি `veth` পেয়ার তৈরি হয়। এই পেয়ারের একটি ইন্টারফেস কন্টেইনারের নিজস্ব নেটওয়ার্ক নেমস্পেসে ঢুকে `eth0` হিসেবে কাজ করে এবং অপর ইন্টারফেসটি (`vethXXXX`) হোস্ট মেশিনের লিনাক্স ভার্চুয়াল ব্রিজের (`docker0` বা কাস্টম ব্রিজ) সাথে যুক্ত হয়। 
যখন কন্টেইনার থেকে কোনো প্যাকেট বের হয়, তা `eth0` দিয়ে ভার্চুয়াল কেবল বেয়ে ব্রিজে পৌঁছায় এবং ব্রিজ হয়ে অন্য কন্টেইনারে বা হোস্টের ফিজিক্যাল নেটওয়ার্ক কার্ডে রাউট হয়।

---

### ২. `host.docker.internal` কী এবং এটি কোন সমস্যার সমাধান করে?

**উত্তর:** `host.docker.internal` হলো ডকারের একটি বিশেষ ডিএনএস নাম যা কন্টেইনারের ভেতরের অ্যাপ্লিকেশনকে হোস্ট মেশিনের লুপব্যাক বা লোকাল সার্ভিসগুলোর সাথে সরাসরি যোগাযোগ করতে দেয়।
সাধারণত কন্টেইনারের ভেতরে `localhost` মানে সে নিজে। ফলে হোস্ট মেশিনে চলা কোনো ডাটাবেজ বা লোকাল এপিআই কন্টেইনার থেকে অ্যাক্সেস করা যায় না। `host.docker.internal` ব্যবহার করলে ডকার স্বয়ংক্রিয়ভাবে হোস্ট মেশিনের ইন্টারনাল গেটওয়ে আইপি (যেমন `172.17.0.1`) রেজলভ করে দেয়, যা হোস্ট ও কন্টেইনারের মধ্যে নিরবচ্ছিন্ন যোগাযোগ নিশ্চিত করে।

---

### ৩. ডকারে Network Alias দিয়ে কীভাবে ক্লায়েন্ট-সাইড রাউন্ড রবিন লোড ব্যালান্সিং বাস্তবায়িত হয়?

**উত্তর:** যখন একাধিক কন্টেইনারকে একই নেটওয়ার্কে `--network-alias <name>` (যেমন `--network-alias worker`) দিয়ে চালু করা হয়, ডকারের Embedded DNS (`127.0.0.11`) ঐ নির্দিষ্ট অ্যালিয়াস নামের বিপরীতে সমস্ত রানিং কন্টেইনারের প্রাইভেট আইপিগুলোর একটি তালিকা সংরক্ষণ করে।
অন্য কোনো কন্টেইনার যখন ঐ অ্যালিয়াস নামে ডিএনএস লুকআপ পাঠায়, ডকার ডিএনএস প্রতিবার তালিকার আইপিগুলোর ক্রম পরিবর্তন (Rotate) করে রিটার্ন করে। ফলে ক্লায়েন্ট ট্রাফিক স্বয়ংক্রিয়ভাবে সমান্তরালে সমস্ত ওয়ার্কার কন্টেইনারের মধ্যে সুষমভাবে বণ্টিত হয়।

---

### ৪. কেন Docker-এর লিগ্যাসি `--link` ফিচারটি ডেপ্রিকেটেড করা হয়েছে?

**উত্তর:** `--link` ফিচারটি কন্টেইনার তৈরির সময় স্ট্যাটিকভাবে `/etc/hosts` ফাইলে অন্য কন্টেইনারের তৎকালীন আইপি অ্যাড্রেস হার্ডকোড করে দিত।
এর বড় সমস্যা ছিল: ডিপেনডেন্ট কন্টেইনারটি রিস্টার্ট বা আইপি পরিবর্তন করলে পূর্বের কন্টেইনারে তা ডায়নামিকালি আপডেট হতো না, এটি দ্বিমুখী যোগাযোগ সমর্থন করতো না এবং এতে কোনো রিয়েল-টাইম সার্ভিস ডিসকভারি ছিল না। আধুনিক ইউজার-ডিফাইন্ড ব্রিজ নেটওয়ার্কের লাইভ Embedded DNS এই সমস্ত সমস্যা সম্পূর্ণ দূর করায় `--link` ডেপ্রিকেটেড করা হয়েছে।

---

## Summary

| কনসেপ্ট | ব্যবহার | বিবরণ |
|---|---|---|
| **`veth` Pair** | লিনাক্স আর্কিটেকচার | কন্টেইনার ও হোস্ট ব্রিজের ভার্চুয়াল সংযোগ কেবল |
| **Network Alias** | `--network-alias <name>` | রাউন্ড-রবিন ডিএনএস লোড ব্যালান্সিং |
| **Host Connection** | `host.docker.internal` | কন্টেইনার থেকে হোস্ট মেশিনের সার্ভিসে এক্সেস |
| **Legacy Link** | `--link` (Deprecated) | আধুনিক ব্রিজে অপ্রয়োজনীয় |
| **DNS Server** | `127.0.0.11` | ডকারের ইন্টারনাল লাইভ ডিএনএস ইঞ্জিন |

---

## পরবর্তী ধাপ

আমরা সফলভাবে ডকার নেটওয়ার্কিংয়ের সমস্ত আর্কিটেকচারাল মেকানিজম সম্পন্ন করেছি। ইতিমধ্যে আমরা ডকার কম্পোজের মূল কনসেপ্ট ও কমান্ডসমূহ শিখে ফেলেছি। পরবর্তী টপিকগুলোতে আমরা ডকার কম্পোজের সার্ভিসেস, নেটওয়ার্কস ও ভলিউমসের আরও গভীর ফিচারসমূহ এবং **Container Logs & Resource Management** শিখব!
