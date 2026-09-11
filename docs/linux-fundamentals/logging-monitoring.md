# System Logging and Monitoring

## কী এবং কেন

Linux system-এ সবকিছু log file-এ লেখা থাকে: login, error, service status, failed commands, system events। এই logs ছাড়া troubleshooting nearly impossible। `syslog`, `journalctl`, `dmesg`, `tail -f`, `grep`—এই tools ব্যবহার করে আপনি production system-এ সমস্যা দ্রুত খুঁজে বের করতে পারবেন।

## মূল Command/Concept

| Command | উদ্দেশ্য | উদাহরণ |
|---------|--------|--------|
| `journalctl` | systemd logs দেখা | `journalctl -xe` |
| `dmesg` | kernel messages দেখা | `dmesg | tail -50` |
| `tail -f` | live log follow | `tail -f /var/log/syslog` |
| `grep` | log filter | `grep -i error /var/log/syslog` |
| `ls /var/log` | log directory overview | `ls /var/log` |
| `last` | recent logins | `last -n 10` |
| `who` | current logged-in users | `who` |
| `uptime` | system running time | `uptime` |
| `systemctl status` | service health | `systemctl status nginx` |

## Common log locations

```bash
ls /var/log
# Output includes:
# auth.log, syslog, kern.log, messages, boot.log, dmesg, journal
```

### Typical purpose
- `/var/log/syslog` → general system logs
- `/var/log/auth.log` → authentication and sudo events
- `/var/log/dmesg` → kernel boot and hardware logs
- `/var/log/nginx/error.log` → web server errors

## ছোট বাস্তব উদাহরণ

```bash
# ১. system log recent lines দেখা
sudo tail -n 50 /var/log/syslog

# ২. errors filter করা
sudo grep -i "error\|failed\|denied" /var/log/auth.log | tail -n 20

# ৩. live log follow
sudo tail -f /var/log/syslog

# ৪. kernel log দেখা
sudo dmesg | tail -n 30

# ৫. service status পরীক্ষা
systemctl status ssh

# ৬. recent logins
last -n 10

# ৭. journalctl দিয়ে current boot logs
journalctl -b -n 50
```

## systemd journal ব্যবহার

Systemd-based systems-এ `journalctl` সবচেয়ে important tool:

```bash
# recent logs
journalctl -n 50

# specific service logs
journalctl -u nginx -n 50

# follow live logs
journalctl -f -u nginx

# errors only
journalctl -p err -b
```

## monitoring workflow

```text
Problem happens
   ↓
Check service status (systemctl status)
   ↓
Check logs (journalctl / tail -f /var/log)
   ↓
Filter by error/failed/denied
   ↓
Check resource usage if needed (top, free, df)
   ↓
Fix root cause
```

:::warning
Production system-এ log files often big; do not delete logs without checking retention policy. Use `journalctl --vacuum-time=7d` or configured logrotate rules instead of manual deletion.
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- Logs দেখেই root cause প্রায়ই বের হয়
- `/var/log` এবং `journalctl` হলো main observation points
- `tail -f` দিয়ে live debugging করা হয়
- `grep -i error` দিয়ে relevant events filter করা যায়
- service health চেক করতে `systemctl status` ব্যবহার করুন
- monitoring = observe logs + resource usage + service state
