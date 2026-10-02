import React, { useState, useEffect, useRef } from "react";
import { FaTerminal, FaPlay, FaTrashAlt, FaCheckCircle, FaMicrochip } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const PRESET_COMMANDS = [
  { cmd: "benchmark", label: "⚡ Run Benchmark", desc: "Test inference throughput & latency" },
  { cmd: "notecheck", label: "💵 NoteCheck ViT", desc: "Synesis IT AI Banknote Authenticator" },
  { cmd: "neofetch", label: "📊 Neofetch", desc: "System specs & affiliations" },
  { cmd: "papers", label: "🔬 Publications", desc: "IEEE & International papers" },
  { cmd: "poridhi", label: "💼 Industry Roles", desc: "Poridhi.io & Synesis IT experience" },
  { cmd: "stack", label: "🛠️ Active Stack", desc: "Core toolchains & frameworks" },
];

export const HeroTerminal = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      content: "Ashraf AI Node v2.4 [CUDA 12.4 | PyTorch 2.5] initialized.",
    },
    {
      type: "output",
      content: "Type a command or click a quick action below to query the runtime.",
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const userEntry = { type: "user", content: `$ ${rawCmd}` };

    if (cmd === "clear" || cmd === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    setHistory((prev) => [...prev, userEntry]);
    setInputVal("");

    if (cmd === "benchmark" || cmd === "run benchmark" || cmd === "eval") {
      setIsRunning(true);
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: "system",
            content: "⚡ Initializing PyTorch CUDA tensor engine...",
          },
        ]);
      }, 200);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: "log",
            content: "• Allocating 4.2 GB VRAM on NVIDIA GPU node [torch.bfloat16]\n• Batch Size: 32 | Image Resolution: 512x512 | FP16 Inference\n• Model: BioClinical Vision-Transformer & ResNet-50 Ensemble",
          },
        ]);
      }, 600);

      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: "result",
            content: "✅ Benchmark Completed:\n  ├─ Forward Pass Latency: 18.4ms (p99: 22.1ms)\n  ├─ Throughput: 1,740 samples / sec\n  ├─ Validation F1-Score: 0.984\n  └─ Status: Optimal Production Performance 🚀",
          },
        ]);
        setIsRunning(false);
      }, 1100);
      return;
    }

    if (cmd === "neofetch" || cmd === "specs" || cmd === "whoami") {
      setHistory((prev) => [
        ...prev,
        {
          type: "neofetch",
          content: `       /\\_\\_        ashraf@cuet-ai-cluster
      ( o.o )       ----------------------
       > ^ <        OS: Ubuntu 22.04 LTS (x86_64)
      /|   |\\       Affiliation: CUET CSE Dept ('25)
     (_|   |_)      Roles: ML Intern @ Poridhi.io | Synesis IT PLC
                    Flagship AI: NoteCheck (DeiT ViT ~97.88% Acc)
                    Research: 7+ IEEE & International Papers
                    CP: Codeforces Specialist (1450 Peak)
                    Stack: PyTorch, DeiT, CUDA, FastAPI, Docker, React
                    Status: Available for AI/ML Roles 🟢`,
        },
      ]);
      return;
    }

    if (cmd === "notecheck" || cmd === "synesis" || cmd === "banknote") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: `💵 NoteCheck — Banknote Counterfeit Detector (Synesis IT PLC):
• Architecture: DeiT-Tiny Vision Transformer (ViT) fine-tuned on Bangladeshi currency (~97.88% accuracy)
• Preprocessing: Automated OpenCV 4-point homography perspective warping & CLAHE lighting equalization
• Serving: High-throughput asynchronous FastAPI REST microservice + React 18 dashboard
• GitHub: https://github.com/CUET-Synesis-IT/NoteCheck
• Live Demo: https://notecheck-frontend.onrender.com/`,
        },
      ]);
      return;
    }

    if (cmd === "papers" || cmd === "research") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: `📄 Accepted & Published Research Works:
1. Vision Transformer-Based Detection of Counterfeit Bangladeshi Banknotes Using DeiT [ICCPCT Accepted]
2. Multi-Modal Brain Tumor Detection via Modified ResNet-50 & Saliency Maps [IEEE Accepted]
3. Fast-SCNN Based Real-Time High-Resolution Retinal Vessel Segmentation [IEEE Accepted]
4. Explainable AI for Early Detection of Chronic Kidney Disease (XGBoost + SHAP)
5. Comparative Assessment of RAG architectures across Biomedical NLP datasets
(Total: 7+ manuscripts authored/co-authored at CUET AI Research Labs)`,
        },
      ]);
      return;
    }

    if (cmd === "poridhi" || cmd === "internship" || cmd === "experience" || cmd === "roles") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: `💼 Industry Roles & Experience:
1. Synesis IT PLC. (September 2026) — Industrial Attachment Trainee
   • Researched & engineered "NoteCheck", an AI-powered Bangladeshi banknote counterfeit detection platform.
   • Built OpenCV 4-point homography & CLAHE preprocessing + DeiT Vision Transformer serving real-time predictions.
2. Poridhi.io (August 2026 – Present) — ML & DataOps Engineering Intern
   • Designing automated data ingestion & validation pipelines for enterprise ML workflows.
   • Containerizing inference microservices with Docker & FastAPI for sub-50ms responses.`,
        },
      ]);
      return;
    }

    if (cmd === "stack" || cmd === "skills") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: `🛠️ Active Engineering Stack:
• AI / Deep Learning: PyTorch, TensorFlow, Hugging Face, LangChain, LangGraph, Scikit-Learn
• Backend & Cloud: FastAPI, Django REST Framework, Docker, PostgreSQL, Redis, AWS S3/CloudFront
• Systems & Languages: Python, C++, C, JavaScript, SQL, Bash
• Frontend: React 19, Tailwind CSS, Vite, TypeScript`,
        },
      ]);
      return;
    }

    if (cmd === "help") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "Available commands:\n• benchmark - Run simulated CUDA inference latency test\n• neofetch  - View hardware specs, affiliations & stats\n• papers    - List active IEEE & international publications\n• poridhi   - Show ML & DataOps internship summary\n• stack     - Print core AI & backend toolchain\n• clear     - Clear terminal history",
        },
      ]);
      return;
    }

    // Default unrecognized command
    setHistory((prev) => [
      ...prev,
      {
        type: "error",
        content: `bash: command not found: ${rawCmd}. Type "help" or click one of the quick buttons below.`,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className="w-full max-w-[340px] sm:max-w-[420px] bg-slate-950/95 backdrop-blur-2xl rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden text-left flex flex-col h-[390px] font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 hover:opacity-80 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 hover:opacity-80 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 hover:opacity-80 transition-opacity" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
          <FaTerminal size={11} className="text-cyan-400" />
          <span>ashraf@cuet-ai:~</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] text-emerald-400 font-bold">CUDA 12.4</span>
        </div>
      </div>

      {/* Terminal Screen / Output Body */}
      <div className="p-3.5 flex-1 overflow-y-auto space-y-2 select-text scrollbar-thin scrollbar-thumb-white/10">
        {history.map((item, idx) => {
          if (item.type === "system") {
            return (
              <div key={idx} className="text-cyan-400 font-semibold text-[11px] flex items-center gap-1">
                <HiSparkles size={13} className="shrink-0 text-cyan-300" />
                <span>{item.content}</span>
              </div>
            );
          }
          if (item.type === "user") {
            return (
              <div key={idx} className="text-emerald-400 font-bold">
                {item.content}
              </div>
            );
          }
          if (item.type === "result") {
            return (
              <div key={idx} className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 whitespace-pre-wrap leading-relaxed">
                {item.content}
              </div>
            );
          }
          if (item.type === "neofetch") {
            return (
              <div key={idx} className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-200 whitespace-pre-wrap font-mono text-[10.5px] leading-tight">
                {item.content}
              </div>
            );
          }
          if (item.type === "log") {
            return (
              <div key={idx} className="text-slate-300 whitespace-pre-wrap text-[11px] bg-slate-900/60 p-2 rounded border border-white/5">
                {item.content}
              </div>
            );
          }
          if (item.type === "error") {
            return (
              <div key={idx} className="text-rose-400">
                {item.content}
              </div>
            );
          }
          return (
            <div key={idx} className="text-slate-300 whitespace-pre-wrap leading-relaxed text-[11px]">
              {item.content}
            </div>
          );
        })}
        {isRunning && (
          <div className="flex items-center gap-2 text-cyan-400 animate-pulse text-[11px]">
            <FaMicrochip className="animate-spin text-cyan-400" />
            <span>Processing tensor stream on GPU...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Preset Command Quick Bar */}
      <div className="px-2.5 py-1.5 bg-slate-900/70 border-t border-white/5 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        {PRESET_COMMANDS.map((btn) => (
          <button
            key={btn.cmd}
            onClick={() => executeCommand(btn.cmd)}
            disabled={isRunning}
            className="px-2 py-1 rounded bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 hover:border-blue-400 text-[10px] font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 disabled:opacity-50"
            title={btn.desc}
          >
            {btn.label}
          </button>
        ))}
        <button
          onClick={() => executeCommand("clear")}
          className="p-1 rounded bg-slate-800/60 hover:bg-rose-600 text-slate-400 hover:text-white border border-white/10 text-[10px] transition-colors"
          title="Clear screen"
        >
          <FaTrashAlt size={10} />
        </button>
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleSubmit} className="px-3 py-2 bg-black/60 border-t border-white/10 flex items-center gap-2 shrink-0">
        <span className="text-emerald-400 font-bold select-none">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Try "benchmark", "neofetch", or "papers"...'
          disabled={isRunning}
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-[11.5px]"
        />
        <button
          type="submit"
          disabled={isRunning || !inputVal.trim()}
          className="text-cyan-400 hover:text-cyan-200 disabled:opacity-30 transition-colors p-1"
          aria-label="Send command"
        >
          <FaPlay size={10} />
        </button>
      </form>
    </div>
  );
};
export default HeroTerminal;
