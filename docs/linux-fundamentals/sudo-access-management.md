# Linux Sudo Access Management

## কী এবং কেন

**Sudo** মানে "Super User Do" — একটা command যা দিয়ে normal user তার নিজের password ব্যবহার করে temporary-ভাবে root privileges পায়। production environment এ কখনো root password multiple people কে দেওয়া হয় না — তার বদলে **sudo access control** ব্যবহার করা হয়। এটা আপনাকে একজন developer কে শুধু specific services restart করতে দেয় (যেমন nginx), কিন্তু সিস্টেম फাইল delete করতে দেয় না। এটাই **principle of least privilege**।

## মূল Concepts

| ধারণা | মানে | উদাহরণ |
|------|------|--------|
| **sudo** | একটা command যা root privilege দেয় | `sudo systemctl restart nginx` |
| **/etc/sudoers** | মূল sudo configuration file | সব sudo rules এখানে থাকে |
| **/etc/sudoers.d/** | per-user/per-group rule files | `/etc/sudoers.d/serviceop` |
| **Cmnd_Alias** | একটা command group এর নাম | `SERVICE = /bin/systemctl restart ...` |
| **User alias** | একটা user group এর নাম | `%superadmin ALL=(ALL) ALL` |
| **visudo** | safe sudoers file editing tool | `sudo visudo` (syntax check করে) |

## Sudoers Syntax বুঝা

### Basic Rule Format:
```
user_or_group  hosts=(run_as_user)  commands
```

### উদাহরণ:

```
# সম্পূর্ণ admin access (superadmin group)
%superadmin ALL=(ALL) ALL

# কিছু specific commands (serviceop user)
serviceop ALL=/bin/systemctl restart sshd, /bin/systemctl reload sshd

# কোনো password ছাড়াই
serviceop ALL=NOPASSWD:/bin/systemctl restart sshd
```

## ব্যবহারিক উদাহরণ

```bash
# ১. superadmin group এবং users তৈরি করা
sudo groupadd superadmin
sudo useradd -m -G superadmin rootuser
sudo useradd -m serviceop
sudo passwd rootuser
sudo passwd serviceop

# ২. /etc/sudoers edit করা (visudo দিয়ে safe)
sudo visudo
# এই line যোগ করুন:
# %superadmin ALL=(ALL) ALL
# Save করুন (Ctrl+X, then Y, then Enter)

# ৩. Specific commands এর জন্য alias তৈরি করা
sudo visudo -f /etc/sudoers.d/serviceop
# এই lines যোগ করুন:
# Cmnd_Alias SERVICE = /bin/systemctl restart sshd, /bin/systemctl reload sshd
# serviceop ALL=SERVICE
# Save করুন

# ৪. Testing: rootuser কোনো কমান্ড run করতে পারে
sudo su - rootuser
sudo cat /etc/shadow       # Success
sudo usermod -d /home/test someuser  # Success
exit

# ৫. Testing: serviceop শুধু specific commands run করতে পারে
sudo su - serviceop
sudo systemctl restart sshd  # Success
sudo systemctl status sshd   # FAIL! (নেই allowed list এ)
sudo usermod -d /home/test someuser  # FAIL! (নেই allowed list এ)
```

## Access Control Levels

```
┌─────────────────────────────────────────────────────┐
│                   System (Root)                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Superadmin Group (Full Access)                    │
│  ├─ rootuser: ALL=(ALL) ALL                        │
│  │  → সব command, সব system files                  │
│  │                                                  │
│  └─ otheradmin: ALL=(ALL) ALL                      │
│                                                     │
│  Service Operators (Limited Access)                │
│  ├─ serviceop: SERVICE=[restart, reload]           │
│  │  → শুধু sshd restart/reload করতে পারে          │
│  │  → status দেখতে পারে না                         │
│  │  → user create/delete করতে পারে না             │
│  │                                                  │
│  └─ dbadmin: DB_COMMANDS=[mysql restart]           │
│     → শুধু MySQL restart করতে পারে                 │
│                                                     │
│  Normal Users (No Sudo Access)                     │
│  └─ developer: No sudo                             │
│     → শুধু নিজের files modify করতে পারে          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## /etc/sudoers Edit করার সঠিক উপায়

```bash
# ❌ ভুল: সরাসরি edit করা (syntax error হতে পারে)
sudo nano /etc/sudoers

# ✅ সঠিক: visudo ব্যবহার করা (syntax check করে)
sudo visudo

# ✅ নির্দিষ্ট file edit করা
sudo visudo -f /etc/sudoers.d/serviceop
```

:::warning
**সবচেয়ে বড় সতর্কতা:**

যদি `/etc/sudoers` file corrupt হয় (syntax error), তাহলে **কেউ sudo run করতে পারবে না**, এমনকি root ও না! তাই:
- **সবসময় `visudo` use করুন**, `nano` বা `vim` নয়
- **পরিবর্তন করার আগে backup রাখুন**: `sudo cp /etc/sudoers /etc/sudoers.bak`
- একবারে একটা rule যোগ করুন, তারপর test করুন
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- **Sudo** = temporary root privilege, নিজের password দিয়ে
- **`/etc/sudoers`** = মূল rules file, **`visudo`** দিয়ে edit করুন
- **`%groupname`** = একটা group, **`username`** = একজন user
- **`Cmnd_Alias`** = commands এর shortcut name
- **`ALL=(ALL) ALL`** = unrestricted, **`COMMANDS`** = specific commands only
- **Principle of least privilege** = প্রতিটা user শুধু তার প্রয়োজনীয় commands run করতে পারে
