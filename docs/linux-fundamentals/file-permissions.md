# Mastering Linux File Permissions

## কী এবং কেন

Linux-এ প্রতিটি file এবং directory তার নিজস্ব access policy রাখে: owner, group, এবং others। এই permission ঠিক রাখলে একই সার্ভারে একাধিক team কাজ করতে পারে, কিন্তু অপ্রয়োজনীয় access ছড়িয়ে পড়ে না।

`umask`, `chmod`, আর `setfacl`—এই তিনটি tool মূলত permission control করে। `umask` নতুন file/dir-এর default permission ঠিক করে, `chmod` existing file-এর permission বদলে, আর `setfacl` একটার বেশি user/group-কে আলাদা access দেয় যখন base model যথেষ্ট হয় না।

## মূল Command/Concept

| Command/Concept | কী করে | উদাহরণ |
|-----------------|---------|--------|
| `ls -l` | permission string দেখা | `ls -l app.sh` |
| `chmod` | file permission বদলানো | `chmod 755 app.sh` |
| `umask` | default permission নির্ধারণ | `umask 022` |
| `chown` | owner বদলানো | `sudo chown dev:dev app.sh` |
| `chgrp` | group বদলানো | `sudo chgrp dev app.sh` |
| `setfacl` | ACL-based fine-grained permission | `setfacl -m g:ops:rx app.sh` |
| `getfacl` | ACL verify করা | `getfacl app.sh` |

### Permission bits

```text
r = read
w = write
x = execute
```

Permission string সাধারণত এই format-এ থাকে:

```bash
-rwxr-xr--
```

আর্থাৎ:
- owner = `rwx`
- group = `r-x`
- others = `r--`

Octal format:

- `7` = `rwx`
- `6` = `rw-`
- `5` = `r-x`
- `4` = `r--`
- `0` = `---`

## ছোট, বাস্তব উদাহরণ

```bash
# ১. ফাইল তৈরি
cd ~
touch app.log
ls -l app.log
# Output: -rw-r--r-- 1 ashraf ashraf 0 Jun 11 12:00 app.log

# ২. stricter permission সেট
chmod 640 app.log
ls -l app.log
# Output: -rw-r----- 1 ashraf ashraf 0 Jun 11 12:00 app.log

# ৩. executable script বানানো
cat > deploy.sh <<'EOF'
#!/bin/bash
echo "Deploy started"
EOF
chmod 755 deploy.sh
./deploy.sh
# Output: Deploy started

# ৪. default umask দেখা
umask
# সাধারণ output: 0022

# ৫. stricter default permission সেট
umask 027
touch report.txt
ls -l report.txt
# Output: -rw-r-----
```

## umask কীভাবে কাজ করে?

`umask` নতুন file/dir create করার সময় default permission থেকে কিছু bits remove করে।

```text
Normal max for file: 666
Normal max for dir : 777

umask 022
=> file: 644 => rw-r--r--
=> dir : 755 => rwxr-xr-x
```

কেন এটা গুরুত্বপূর্ণ?
- new files automatically safe default পায়
- everyoneকে `777` বা `666` দিয়ে ছেড়ে দেয় না
- team project-এ consistency থাকে

## ACL (Advanced Permission)

`chmod`-এ শুধু one owner, one group, and others থাকে। কিন্তু অনেক project-এ একই directory-তে multiple group ভিন্ন access পায়। তখন `setfacl` লাগে।

```bash
# ACL support install
sudo apt update
sudo apt install -y acl

# user-specific access
sudo setfacl -m u:ashraf:rw /shared/project.txt

# group-specific access
sudo setfacl -m g:devs:r-x /shared/project.txt

# verify
getfacl /shared/project.txt
```

### ACL visual idea

```text
file.txt
├── owner: rw-
├── group: r--
├── others: ---
└── extra ACL entries:
    ├── user:ashraf:rw
    └── group:devs:r-x
```

:::warning
`chmod -R 777` বা `chmod 777` ব্যবহার করবেন না। একবার ভুল permission দিলে sensitive config, secrets, বা application data public হয়ে যেতে পারে। Production environment-এ always follow least privilege.
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- `ls -l` দিয়ে file permission string দেখা যায়
- `chmod` দিয়ে access level set করা হয়: `755`, `644`, `700` ইত্যাদি
- `umask` default security baseline ঠিক করে
- `chown`/`chgrp` দিয়ে owner/group নিয়ন্ত্রণ করা হয়
- `setfacl`/`getfacl` দিয়ে advanced permission control করা হয়
- Production-এ minimum necessary permission দিন; `777` কখনো不要
