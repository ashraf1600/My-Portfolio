# Mastering Linux File Permissions

## কী এবং কেন

Linux-এ প্রতিটি file বা directory তার নিজস্ব permission set রাখে: owner, group, এবং others। এই permission গুলো ঠিক রাখলে আপনি team members কে ঠিকন মতো access দিতে পারেন, কিন্তু system security নষ্ট করেন না।

File permissions মূলত ৩ ধরনের:
- `r` = read
- `w` = write
- `x` = execute

এগুলোর combination owner/group/others এর জন্য আলাদা হতে পারে।

উদাহরণ:

```bash
-rwxr-xr--
```

এই string মানে:
- owner: `rwx`
- group: `r-x`
- others: `r--`

## মূল Command/Concept

| Command/Concept | ব্যবহার | উদাহরণ |
|-----------------|--------|--------|
| `ls -l` | file permissions দেখা | `ls -l /etc/passwd` |
| `chmod` | permission change করা | `chmod 755 script.sh` |
| `umask` | default permissions নির্ধারণ | `umask 022` |
| `chown` | owner change করা | `sudo chown ashraf:dev app.log` |
| `chgrp` | group change করা | `sudo chgrp dev app.log` |
| `setfacl` | advanced per-user/per-group permissions | `setfacl -m u:ashraf:rwx file.txt` |
| `getfacl` | ACL review করা | `getfacl file.txt` |

## Permission Bit বোঝা

Linux-এ permission octal format সাধারণত:

- `7` = `rwx`
- `6` = `rw-`
- `5` = `r-x`
- `4` = `r--`
- `3` = `-wx`
- `2` = `-w-`
- `1` = `--x`
- `0` = `---`

### Common examples

```bash
chmod 755 script.sh
# owner: rwx, group: r-x, others: r-x

chmod 644 config.txt
# owner: rw-, group: r--, others: r--

chmod 700 private_dir
# owner: rwx, group: ---, others: ---
```

## ছোট বাস্তব উদাহরণ

```bash
# ১. একটা ফাইল তৈরি করা
cd ~
touch app.log
ls -l app.log
# Output: -rw-r--r-- 1 ashraf ashraf 0 Jun 11 12:00 app.log

# ২. permission বদলানো
chmod 640 app.log
ls -l app.log
# Output: -rw-r----- 1 ashraf ashraf 0 Jun 11 12:00 app.log

# ৩. script executable করা
cat > deploy.sh <<'EOF'
#!/bin/bash
echo "Deploy started"
EOF
chmod 755 deploy.sh
./deploy.sh
# Output: Deploy started

# ৪. default umask পরীক্ষা
umask
# Typical output: 0022

# ৫. stricter default permissions
umask 027
touch report.txt
ls -l report.txt
# Output: -rw-r-----
```

## Permission Model Visualization

```text
User/Owner      Group            Others
   rwx             r-x              r--
    |               |                |
    +--- owner access to file/dir
    +--- group access
    +--- everyone else
```

## ACL (Advanced Permission)

`chmod` শুধু owner, group, এবং others manage করে। কিন্তু অনেক সময় একই file-এ একাধিক user/group আলাদা access চাইতে হয়। সেই সময় `setfacl` লাগে।

```bash
# install ACL support
sudo apt update
sudo apt install -y acl

# example: Ashraf কে read/write access দিন
sudo setfacl -m u:ashraf:rw /shared/project.txt

# group access দিন
sudo setfacl -m g:devs:r-x /shared/project.txt

# verification
getfacl /shared/project.txt
```

:::warning
`chmod`/`setfacl` ব্যবহার করার সময় access policy খুব scherp রাখুন। Sensitive files এ `777` বা `chmod -R 777` ব্যবহার করা ঠিক নয় — এটা system security খারাপ করে দেয়। Always follow the least privilege rule.
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- `ls -l` দেখলে file permission বুঝতে পারবেন
- `chmod` দিয়ে permission change করুন; octal format (`755`, `644`, `700`) খুবই common
- `umask` default কীভাবে file তৈরি হবে সেটি ঠিক করে
- `chown`/`chgrp` দিয়ে owner ও group ঠিক করুন
- `setfacl`/`getfacl` দিয়ে advanced access control apply ও verify করুন
- Security এর জন্য `777` এড়িয়ে চলুন; minimum required permission দিন
