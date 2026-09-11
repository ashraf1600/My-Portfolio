# Linux User এবং Group Management

## কী এবং কেন

Linux একটি multi-user operating system। একাধিক ব্যবহারকারী একই সিস্টেমে কাজ করতে পারে, কিন্তু প্রত্যেকের access control করতে হয়। **User এবং Group** এর মাধ্যমে আপনি বিভিন্ন মানুষকে বিভিন্ন permission দিতে পারেন। যেমন — একজন developer কে শুধু code directory access দেওয়া, আর একজন admin কে সব system ফাইল modify করার সুযোগ দেওয়া।

**Primary Group** = প্রতিটা user এর একটা main group থাকে (default একই নামে)
**Supplementary Group** = একজন user additional groups এ থাকতে পারে, extra permissions পেতে

## মূল Commands

| Command | উপযোগিতা | উদাহরণ |
|---------|----------|--------|
| `sudo useradd <name>` | নতুন user তৈরি | `sudo useradd ashraf` |
| `sudo groupadd <name>` | নতুন group তৈরি | `sudo groupadd developers` |
| `id <username>` | user এর UID/GID এবং groups দেখা | `id ashraf` |
| `groups <username>` | user এর সব groups দেখা | `groups ashraf` |
| `sudo usermod -g <group> <user>` | user এর primary group পরিবর্তন | `sudo usermod -g developers ashraf` |
| `sudo usermod -aG <group> <user>` | user কে supplementary group এ যোগ করা | `sudo usermod -aG developers ashraf` |
| `sudo usermod -L <user>` | user account lock করা (login disable) | `sudo usermod -L ashraf` |
| `sudo usermod -U <user>` | user account unlock করা | `sudo usermod -U ashraf` |
| `getent group <name>` | group এর members দেখা | `getent group developers` |
| `cat /etc/passwd` | সব users এর list | `cat /etc/passwd` |

## User এবং Group Hierarchy

একটা practical scenario:

```
Company: TechCorp
├── Developers (group)
│   ├── ashraf (UID: 1000)
│   ├── sara (UID: 1001)
│   └── khan (UID: 1002)
├── Admins (group)
│   ├── alice (UID: 1003)
│   └── bob (UID: 1004)
└── Testers (group)
    ├── ashraf (also here as supplementary)
    └── charlie (UID: 1005)
```

অনলক্ষ্য করুন: **ashraf** দুটো group এ আছে — `developers` (primary) এবং `testers` (supplementary)।

## ব্যবহারিক উদাহরণ

```bash
# ১. চারজন user তৈরি করা
sudo useradd ashraf
sudo useradd sara
sudo useradd khan
sudo useradd alice

# ২. একটা group তৈরি করা
sudo groupadd developers

# ৩. একজন user এর primary group বদলানো (ashraf)
sudo usermod -g developers ashraf
id ashraf
# Output: uid=1000(ashraf) gid=1002(developers) groups=1002(developers)

# ৪. অন্যদের supplementary group এ যোগ করা
sudo usermod -aG developers sara
sudo usermod -aG developers khan
id sara
# Output: uid=1001(sara) gid=1001(sara) groups=1001(sara),1002(developers)

# ৫. group এর সব members দেখা
getent group developers
# Output: developers:x:1002:sara,khan

# ৬. কাউকে temporary lock করা (vacation)
sudo usermod -L alice
passwd -S alice
# Output: alice L ... (L = Locked)

# ৭. Unlock করা (password সেট করে)
sudo passwd alice  # একটা password দিন
sudo usermod -U alice
passwd -S alice
# Output: alice P ... (P = usable Password)

# ৮. সব users দেখা
cat /etc/passwd
```

## গুরুত্বপূর্ণ ফাইলগুলো

| File | উদ্দেশ্য |
|------|--------|
| `/etc/passwd` | সব users এর তথ্য (UID, home dir, shell) |
| `/etc/group` | সব groups এবং members |
| `/etc/shadow` | users এর encrypted passwords (শুধু root দেখতে পারে) |

:::warning
**Primary vs Supplementary এর পার্থক্য:**
- **Primary group (-g)**: একজন user এর `exactly one` primary group থাকে। যখন user নতুন file create করে, সেটা এই group এর অধিকারে যায়।
- **Supplementary group (-aG)**: একজন user unlimited supplementary groups এ থাকতে পারে। এগুলো extra permissions দেয়।

একজন user এর primary group বদলালেও তার file ownership automatic বদলায় না — আপনাকে manually `chown` দিয়ে বদলাতে হবে।
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- **useradd** দিয়ে user তৈরি করুন, **groupadd** দিয়ে group তৈরি করুন
- **usermod -g** = primary group সেট করা (এক বার, সাবধানে)
- **usermod -aG** = supplementary group যোগ করা (বহুবার সম্ভব, পুরনো groups থাকে)
- **usermod -L/-U** = account lock/unlock করা (password ছাড়া unlock fail হয়)
- **id** এবং **groups** command দিয়ে verify করুন সবসময়
- `/etc/passwd` হল সব users এর master list
