# Linux /etc/skel/ বোঝা

## কী এবং কেন

`/etc/skel/` হলো একটা "skeleton" (কাঠামো) ডিরেক্টরি — নতুন user তৈরি হলে তার home directory এর template হিসেবে ব্যবহৃত হয়। যখন আপনি `sudo useradd -m ashraf` করেন, তখন Linux `/etc/skel/` থেকে সব ফাইল copy করে `/home/ashraf/` তে রাখে। এটা নিশ্চিত করে যে প্রতিটা নতুন user একই default configuration দিয়ে শুরু করে — সবার `.bashrc` থাকে, সবার `.profile` থাকে, এবং যদি আপনি custom setting যোগ করেন, সবাই পায়।

## মূল ফাইলগুলো

| File | কী করে |
|------|--------|
| `.bashrc` | bash shell configuration (aliases, functions) |
| `.profile` | login shell configuration (environment variables) |
| `.bash_logout` | logout time এ execute হয় |
| `welcome.txt` (custom) | আপনি নিজে যোগ করতে পারেন |
| অন্যান্য directories | আপনার প্রয়োজন অনুযায়ী তৈরি করুন |

## কীভাবে কাজ করে

```
1. sudo useradd -m ashraf  → নতুন user তৈরি করা
                 ↓
2. Linux /etc/skel/ এর সব ফাইল দেখা
                 ↓
3. সব ফাইল copy করা /home/ashraf/ এ
                 ↓
4. Ownership বদল করা ashraf:ashraf এ
                 ↓
5. Done! ashraf এর কাছে সব default config আছে
```

## ব্যবহারিক উদাহরণ

```bash
# ১. /etc/skel/ এর বর্তমান কন্টেন্ট দেখা
ls -la /etc/skel/
# Output:
# .bashrc
# .profile
# .bash_logout

# ২. সবার জন্য একটা welcome message যোগ করা
echo "Welcome to DevOps Lab!" | sudo tee /etc/skel/welcome.txt

# ३. /etc/skel/.bashrc এ custom alias যোগ করা
sudo bash -c 'cat >> /etc/skel/.bashrc << EOF

# Custom aliases
alias ll="ls -la"
alias diskspace="df -h /"
alias myinfo="echo User: \$(whoami), Hostname: \$(hostname)"
EOF'

# ४. এখন নতুন user তৈরি করলে সব পাবে
sudo useradd -m -s /bin/bash sara
ls -la /home/sara/
# welcome.txt, .bashrc (updated), .profile সব থাকবে

# ५. Sara কে test করা
sudo su - sara
myinfo
# Output: User: sara, Hostname: (your-hostname)
diskspace
# Output: disk usage

# ६. যদি user পরে তৈরি হয় (-m ছাড়া)
sudo useradd khan
# তখন manual copy করতে হয়:
sudo mkdir -p /home/khan
sudo cp -r /etc/skel/. /home/khan/
sudo chown -R khan:khan /home/khan/
ls -la /home/khan/
# এখন সব ফাইল আছে
```

## /etc/skel/ Customization Strategy

```
/etc/skel/ (Template)
├── .bashrc
│   ├── Aliases
│   └── Functions
├── .profile
│   └── PATH variables
├── .bash_logout
├── welcome.txt (আপনার)
├── .gitconfig (optional)
└── projects/ (optional dir)
        ↓ (Copy on useradd -m)
        ↓
/home/newuser/ (নতুন user এর dir)
├── .bashrc
├── .profile
├── .bash_logout
├── welcome.txt
├── .gitconfig
└── projects/
```

:::tip
**Best Practice:** 

Production environment এ `/etc/skel/` customize করার আগে backup রাখুন:
```bash
sudo cp -r /etc/skel /etc/skel.bak
```

তারপর test করুন একজন user দিয়ে আগে অন্যদের commit করার আগে।
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- `/etc/skel/` হলো template — নতুন user এর home directory তৈরির সময় copy হয়
- শুধুমাত্র `useradd -m` দিয়ে user তৈরি করলে files copy হয় (বিনা `-m` হলে না)
- প্রতিটা `.bashrc`, `.profile`, `.bash_logout` customize করে global setting দিতে পারেন
- Manual copy: `sudo cp -r /etc/skel/. /home/username/` + `sudo chown -R username:username /home/username/`
- বদলানো `/etc/skel/` পরবর্তী users থেকে কার্যকর হয়, পুরনো users এ effect নেই
