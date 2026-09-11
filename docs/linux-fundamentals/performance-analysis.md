# Linux Performance Analysis

## কী এবং কেন

Linux system performance বুঝতে হলে আপনাকে CPU, memory, disk, এবং network usage দেখতে হবে। `top`, `htop`, `free`, `df`, `iostat`, `vmstat`, `ps`—এই tools দিয়ে আপনি বুঝতে পারবেন server কেমন কাজ করছে, কোথায় bottleneck আছে, আর কি কারণে system slow হচ্ছে।

Performance tuning শুরু হয় **measure** থেকে। আগে বুঝুন কোথায় resource বেশি ব্যবহার হচ্ছে, তারপর fix করুন।

## মূল Command/Concept

| Command | উদ্দেশ্য | উদাহরণ |
|---------|--------|--------|
| `top` | live process overview | `top` |
| `htop` | colorful interactive system monitor | `htop` |
| `ps` | running processes দেখা | `ps -aux --sort=-%cpu` |
| `free -h` | RAM usage দেখা | `free -h` |
| `df -h` | disk usage দেখা | `df -h` |
| `du -sh` | directory size দেখানো | `du -sh /var/log` |
| `vmstat 1` | virtual memory + CPU stats | `vmstat 1` |
| `iostat 1` | I/O statistics | `iostat 1` |
| `uptime` | load average দেখা | `uptime` |
| `sar` | historical performance data | `sar -u 1 5` |

## Linux performance metrics বুঝা

### 1. CPU
- `load average` = system কত busy
- high CPU usually means process loop, heavy computation, or runaway service

### 2. Memory
- `free` দেখলে actual RAM usage ও cache বুঝতে পারবেন
- cache memory ব্যবহার করে system performance বাড়াতে পারে

### 3. Disk
- `df -h` = filesystem full কিনা
- `iostat` = disk I/O bottleneck আছে কিনা

### 4. Processes
- `ps` + `top` দিয়ে identify high CPU or high memory processes

## ছোট বাস্তব উদাহরণ

```bash
# ১. Current system overview
uptime
# Output: 12:40:25 up 5 days,  3:15,  2 users,  load average: 1.20, 0.90, 0.75

# ২. RAM usage
free -h
# Output:
# total used free shared buff/cache available
# Mem: 15Gi 6Gi 2Gi 0.1Gi 7Gi 8Gi

# ৩. CPU-heavy processes
ps -aux --sort=-%cpu | head
# Output: python, node, java, mysql

# ৪. Disk usage
df -h
# Output: /dev/sda1  50G 32G 15G 69%

# ৫. Memory-heavy directories
du -sh /var/log /home /opt
# Output: sizes of interesting directories

# ৬. Live monitoring
vmstat 1
# Displays memory, CPU, IO stats every second
```

## Performance bottleneck identification

```text
CPU bottleneck      → high %CPU, rising load average
Memory bottleneck   → free memory very low, swap usage high
Disk bottleneck     → iowait high, slow I/O, df near full
Network bottleneck  → high rx/tx, high latency, slow SSH/API
```

:::tip
`top`/`htop` দেখেই অনেক performance issue দ্রুত detect হয়। কিন্তু শুধু one snapshot দেখে সিদ্ধান্ত করবেন না — multiple readings নিন, তারপর bottleneck নিশ্চিত করুন।
:::

## সংক্ষিপ্ত সারসংক্ষেপ

- `top`/`htop` = live process ও CPU usage দেখা
- `free -h` = RAM status, `df -h` = disk status
- `ps` = specific process identify করা
- `vmstat` ও `iostat` = system-wide performance trend দেখা
- high load average, high I/O wait, low available memory—সবই symptoms
- performance debugging শুরু হয় data collection থেকে, তারপর root cause
