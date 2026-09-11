# Linux User Modification

## কী এবং কেন

একটা user account তৈরি করার পরে আপনাকে প্রায়ই সেটা modify করতে হয় — shell বদলাতে, home directory পরিবর্তন করতে, username rename করতে, password expire করতে, বা account lock করতে। **User modification** হলো existing account এর attributes change করার skill। একজন developer এর default shell থাকে `/bin/sh` কিন্তু আপনি তাকে বদলিয়ে `/bin/bash` দিতে পারেন, বা একজন নতুন hire কে temporary account দিতে পারেন expiration date সহ যাতে পরে automatic disable হয়।

## মূল Modification Commands

| Command | Option | কাজ | উদাহরণ |
|---------|--------|------|--------|
| `usermod` | `-s` | Shell বদলানো | `sudo usermod -s /bin/bash ashraf` |
| `usermod` | `-d` | Home dir বদলানো | `sudo usermod -d /home/newdir ashraf` |
| `usermod` | `-m` | Home dir move করা (সাথে files) | `sudo usermod -d /home/newdir -m ashraf` |
| `usermod` | `-l` | Username বদলানো | `sudo usermod -l newname ashraf` |
| `usermod` | `-u` | UID বদলানো | `sudo usermod -u 2000 ashraf` |
| `usermod` | `-c` | Comment/full name | `sudo usermod -c "Ashraf Khan" ashraf` |
| `usermod` | `-e` | Account expiration date | `sudo usermod -e 2025-12-31 ashraf` |
| `usermod` | `-g` | Primary group বদলানো | `sudo usermod -g developers ashraf` |
| `usermod` | `-aG` | Supplementary group যোগ করা | `sudo usermod -aG sudo ashraf` |
| `usermod` | `-L` | Account lock করা | `sudo usermod -L ashraf` |
| `usermod` | `-U` | Account unlock করা | `sudo usermod -U ashraf` |
| `passwd` | (none) | Password set/change | `sudo passwd ashraf` |
| `chage` | `-l` | Password aging info দেখা | `sudo chage -l ashraf` |
| `chage` | `-d 0` | Password force change (next login) | `sudo chage -d 0 ashraf` |
| `chage` | `-M` | Max days before expiry | `sudo chage -M 90 ashraf` |

## ব্যবহারিক উদাহরণ

```bash
# ১. একটা basic user তৈরি করা
sudo useradd -m testuser

# ২. Shell বদলানো
sudo usermod -s /bin/bash testuser
grep testuser /etc/passwd
# Output: testuser:x:1001:1001::/home/testuser:/bin/bash

# ३. Username rename করা
sudo usermod -l ashraf testuser
grep ashraf /etc/passwd

# ४. Home directory বদলানো (content move সহ)
sudo usermod -d /home/developers/ashraf -m ashraf
ls -la /home/developers/ashraf

# ५. Comment/full name যোগ করা
sudo usermod -c "Ashraf Khan, DevOps Team" ashraf
grep ashraf /etc/passwd
# Output: ashraf:x:1001:1001:Ashraf Khan, DevOps Team:/home/developers/ashraf:/bin/bash

# ६. Account expiration set করা (6 months after)
sudo usermod -e 2026-03-31 ashraf
sudo chage -l ashraf
# Shows account expiry date

# ७. Password aging (force change in 90 days)
sudo chage -M 90 ashraf
sudo chage -l ashraf
# Output:
# Last password change: Jan 01, 2025
# Password expires: Apr 01, 2025
# Days before password change warning: 7 days

# ८. একটা নতুন group এ add করা
sudo usermod -aG developers ashraf
groups ashraf
# Output: ashraf : ashraf developers

# ९. Temporary account lock করা
sudo usermod -L ashraf
sudo passwd -S ashraf
# Output: ashraf L ... (L = Locked)

# १०. Unlock করা
sudo usermod -U ashraf
sudo passwd -S ashraf
# Output: ashraf P ... (P = usable Password)

# ११. সব একসাথে করা (advanced)
sudo useradd -m -d /home/dev/sara \
  -s /bin/bash \
  -g developers \
  -G sudo \
  -c "Sara Developer" \
  -e 2026-06-30 sara
id sara
sudo chage -l sara
```

## /etc/passwd এ কী পরিবর্তন দেখা যায়

```
Before modification:
testuser:x:1001:1001::/home/testuser:/bin/sh

After all modifications:
ashraf:x:1001:1001:Ashraf Khan, DevOps Team:/home/developers/ashraf:/bin/bash
       └─┬─┘  └────┬────┘ └──────────────────┬──────────────────┘ └───────────┬──────────┘ └──────────────┬──────────────┘
         │          │                        │                                  │                         │
        UID       Primary GID            Comment/GECOS                    Home Directory           Default Shell
```

## Password Aging Strategy

```
Day 0 (Password set)
├─ Day 1-83: Can change anytime (no warning)
├─ Day 84-90: Warning period (change advised)
└─ Day 91: Account expires, must change before login

Example with chage -M 90:
sudo chage -M 90 ashraf     # Max 90 days
sudo chage -W 7 ashraf      # Warning 7 days before
sudo chage -I 30 ashraf     # Inactive after 30 days of expiry
sudo chage -l ashraf        # See all settings
```

:::warning
**সতর্কতা: Home Directory পরিবর্তন**

যখন home directory বদলাবেন:
- **সবসময় `-m` flag ব্যবহার করুন**: `sudo usermod -d /new/path -m username`
- **বিনা `-m`**: নতুন path set হবে কিন্তু পুরনো files stay থাকবে
- **পুরনো directory delete করবেন না** automated — manually verify করে delete করুন

ভুল কমান্ড = files হারানোর ঝুঁকি! তাই সবসময় backup রাখুন critical users এর জন্য।
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- **usermod** = existing user modify করার main command
- **Shell**: `-s /bin/bash`, **Home dir**: `-d /path -m`, **Username**: `-l newname`
- **Groups**: `-g` (primary), `-aG` (supplementary append)
- **Expiration**: `-e YYYY-MM-DD` user expire করার জন্য
- **Password**: `passwd` দিয়ে set করুন, `chage -M 90` দিয়ে aging set করুন
- **Lock/Unlock**: `-L` lock, `-U` unlock
- **একসাথে**: `useradd` এ সব options একবারে দিতে পারেন (faster than step-by-step modification)
