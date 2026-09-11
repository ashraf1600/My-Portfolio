# Linux ফাইল সিস্টেম নেভিগেশন মাস্টারিং

## কী এবং কেন

Linux ফাইল সিস্টেম একটি hierarchical tree structure যেখানে সবকিছু কোনো না কোনো ডিরেক্টরিতে থাকে। ফাইল সিস্টেম নেভিগেশন শিখলে আপনি efficiently ফাইল/ফোল্ডার খুঁজে বের করতে, তাদের সংগঠিত করতে এবং কাজ করতে পারবেন। এটা Linux-এ basic survival skill — যত তাড়াতাড়ি শিখবেন, বাকি সবকিছু অনেক সহজ হয়ে যাবে।

## মূল Commands

| Command | ব্যবহার | উদাহরণ |
|---------|-------|--------|
| `pwd` | বর্তমান ডিরেক্টরি path দেখা | `pwd` → `/home/user/projects` |
| `cd` | ডিরেক্টরি পরিবর্তন | `cd ~/documents` বা `cd ..` (পিছনে যাওয়া) |
| `ls` | ডিরেক্টরির ফাইল/ফোল্ডার তালিকা দেখা | `ls` বা `ls -la` (বিস্তারিত + hidden files) |
| `find` | নির্দিষ্ট ফাইল/ফোল্ডার খুঁজা | `find . -name "*.txt"` |
| `grep` | ফাইলের ভিতরে টেক্সট খুঁজা | `grep "error" log.txt` |
| `mkdir` | নতুন ডিরেক্টরি তৈরি | `mkdir projects` |
| `tree` | ডিরেক্টরি structure visual দেখা | `tree ~/projects` |

## Path কী?

Linux-এ দুটো type এর path আছে:

- **Absolute path**: সম্পূর্ণ path, root (`/`) থেকে শুরু → `/home/user/documents/report.txt`
- **Relative path**: বর্তমান location থেকে → `documents/report.txt` বা `./report.txt`
- **Special shortcuts**: 
  - `~` = home directory
  - `.` = current directory
  - `..` = parent directory

## ব্যবহারিক উদাহরণ

```bash
# ১. বর্তমান অবস্থান জানা
pwd
# Output: /home/ashraf

# ২. ডিরেক্টরি তৈরি এবং navigate করা
mkdir -p ~/code/projects/website
cd ~/code/projects/website
pwd
# Output: /home/ashraf/code/projects/website

# ৩. ফাইল/ফোল্ডার দেখা
ls -la
# Output: (detailed list with permissions and dates)

# ৪. একটা ফোল্ডারে যাওয়া (absolute path ব্যবহার)
cd ~/code/projects
ls
# Output: website

# ৫. ফাইল খুঁজা
find ~/code -name "*.html"
# Output: /home/ashraf/code/projects/website/index.html

# ৬. ফিরে যাওয়া
cd ..
pwd
# Output: /home/ashraf/code/projects
```

## Directory Structure বোঝা

```
/
├── home/              # সব user এর personal files
│   └── ashraf/
│       ├── Documents/
│       ├── Downloads/
│       └── code/
├── etc/               # System configuration
├── var/               # Variable data (logs, temp)
├── tmp/               # Temporary files
└── usr/               # User programs এবং libraries
```

:::tip
**Tab completion ব্যবহার করুন!** কোনো command বা path এর প্রথম কয়েক letter লিখে Tab চাপ দিলে Linux automatic complete করবে — typo আর confusion কমবে অনেক।
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- `pwd` দিয়ে আপনি এখানে আছেন জানুন, `cd` দিয়ে যেখানে চান যান
- `ls` দিয়ে আশেপাশের ফাইল দেখুন, `find` দিয়ে দূরে খুঁজুন
- Relative path (`.`, `..`, `~`) দিয়ে দ্রুত navigate করুন — absolute path লিখার চেয়ে সহজ
- Hidden files দেখতে `ls -a` বা `ls -la` ব্যবহার করুন (`.` দিয়ে শুরু হওয়া ফাইল)
