# Linux User Account Management

## কী এবং কেন

একটা user account শুধু একটা সংখ্যা (UID) নয়, এর সাথে আরো অনেক কিছু আছে — home directory, shell, password, group membership। যখন আপনি একজন নতুন developer কে system access দেন, তখন শুধু `useradd` করাই যথেষ্ট নয়, তাকে password set করতে হয়, home directory চেক করতে হয়, appropriate groups এ যোগ করতে হয়। এটা সব একসাথে করার process হলো **User Account Management**।

## মূল Commands

| Command | উদ্দেশ্য | উদাহরণ |
|---------|--------|--------|
| `sudo useradd <name>` | নতুন user তৈরি (home dir ছাড়া) | `sudo useradd ashraf` |
| `sudo useradd -m <name>` | নতুন user তৈরি + home directory | `sudo useradd -m ashraf` |
| `sudo passwd <user>` | user এর password set করা | `sudo passwd ashraf` |
| `sudo usermod -d <path> <user>` | home directory বদলানো | `sudo usermod -d /home/dev ashraf` |
| `sudo usermod -s <shell> <user>` | default shell বদলানো | `sudo usermod -s /bin/bash ashraf` |
| `sudo usermod -aG <group> <user>` | user কে group এ যোগ করা | `sudo usermod -aG sudo ashraf` |
| `sudo passwd -l <user>` | account lock করা (password disable) | `sudo passwd -l ashraf` |
| `sudo passwd -u <user>` | account unlock করা | `sudo passwd -u ashraf` |
| `sudo userdel -r <user>` | user এবং home dir delete করা | `sudo userdel -r ashraf` |
| `grep <user> /etc/passwd` | user এর সব info দেখা | `grep ashraf /etc/passwd` |

## /etc/passwd Format বুঝা

যখন user create হয়, তার info `/etc/passwd` এ save হয়:

```
ashraf:x:1000:1000:Ashraf Khan:/home/ashraf:/bin/bash
```

এই parts এর মানে:
- `ashraf` = username
- `x` = password (actual password `/etc/shadow` এ encrypted)
- `1000` = UID (User ID)
- `1000` = GID (primary group ID)
- `Ashraf Khan` = full name (optional)
- `/home/ashraf` = home directory
- `/bin/bash` = default shell

## ব্যবহারিক উদাহরণ

```bash
# ১. নতুন user তৈরি করা (home dir সহ)
sudo useradd -m ashraf
sudo useradd -m sara

# ২. তাদের password set করা
sudo passwd ashraf
# Password: (নিজের password দিন, দুবার)
sudo passwd sara

# ৩. user info verify করা
grep ashraf /etc/passwd
# Output: ashraf:x:1000:1000::/home/ashraf:/bin/sh

# ৪. shell বদলানো (bash এ)
sudo usermod -s /bin/bash ashraf
grep ashraf /etc/passwd
# Output এর শেষে এখন /bin/bash থাকবে

# ৫. user কে admin group এ যোগ করা (sudo access)
sudo usermod -aG sudo ashraf
groups ashraf
# Output: ashraf : ashraf sudo

# ৬. account lock করা (vacation)
sudo passwd -l sara
# এখন sara login করতে পারবে না

# ৭. পরে unlock করা
sudo passwd -u sara

# ৮. user delete করা
sudo userdel -r ashraf
# -r = home directory ও delete করা
```

## Home Directory এবং Shell — কেন গুরুত্বপূর্ণ?

| বিষয় | কেন | উদাহরণ |
|------|-----|--------|
| **Home Directory** | User এর নিজস্ব ফোল্ডার — যেখানে তার files, config থাকে | `/home/ashraf` — এখানে `.bashrc`, `.ssh` সব থাকে |
| **Default Shell** | User terminal এ কোন shell use করবে | `/bin/bash` = rich features, `/bin/sh` = minimal, faster |

যদি home directory না থাকে, user login করতে পারবে কিন্তু error পাবে এবং ফাইল save করতে পারবে না।

:::warning
**সতর্কতা: sudo group এর ক্ষমতা**

`sudo` group এর user মানে system এর প্রায় সবকিছু করতে পারে। তাই:
- শুধুমাত্র বিশ্বস্ত লোকদেরই যোগ করুন
- ভালো password ensure করুন
- নিয়মিত audit করুন — `getent group sudo` দিয়ে সদস্য দেখুন

একটা হ্যাক হলে পুরো system compromise হতে পারে।
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- User create করার সময় **`-m` flag দিয়ে home directory** create করুন
- **Password always set করুন** — account তৈরি হওয়ার পর
- Shell (`/bin/bash`) এবং home directory (`/home/username`) verify করুন
- **`sudo` group দিয়ে admin access** দিন, root password শেয়ার করবেন না
- Temporary disable করতে `passwd -l`, delete করতে `userdel -r` ব্যবহার করুন
