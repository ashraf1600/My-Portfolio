import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SiPytorch, SiFastapi, SiDocker, SiMlflow, SiLangchain } from "react-icons/si";
import langgraphLogo from "../../assets/tech_logo/langgraph.svg";
import toon from "../../assets/ashraf-toon.png";
import { profile, research } from "../../constants";

// Tools from the MLOps / backend stack, floating around the portrait.
const TOOLS = [
  { Icon: SiPytorch, name: "PyTorch", color: "#EE4C2C", pos: "left-[-6%] top-[52%]", d: 0 },
  { Icon: SiFastapi, name: "FastAPI", color: "#009688", pos: "right-[-6%] top-[48%]", d: 0.8 },
  { Icon: SiDocker, name: "Docker", color: "#2496ED", pos: "left-[-4%] top-[66%]", d: 1.6 },
  { Icon: SiMlflow, name: "MLflow", color: "#0194E2", pos: "right-[0%] top-[72%]", d: 2.2 },
  { Icon: SiLangchain, name: "LangChain", color: undefined, pos: "left-[4%] top-[-4%]", d: 1.2 },
  { img: langgraphLogo, name: "LangGraph", pos: "right-[6%] top-[-3%]", d: 2.6 },
];

const float = (reduce, delay, dist = 10, dur = 6) =>
  reduce
    ? {}
    : {
        animate: { y: [0, -dist, 0] },
        transition: { duration: dur, ease: "easeInOut", repeat: Infinity, delay },
      };

// Large background screen: an MLOps pipeline running behind the portrait.
const PipelineScreen = () => (
  <svg viewBox="0 0 440 300" className="h-full w-full" role="img" aria-label="MLOps pipeline: data, train, registry, serve">
    <defs>
      <linearGradient id="ps-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#16151d" />
        <stop offset="1" stopColor="#201e2c" />
      </linearGradient>
      <marker id="ps-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 z" fill="#b8ff5a" />
      </marker>
    </defs>
    <rect x="0" y="0" width="440" height="300" rx="0" fill="url(#ps-bg)" />
    <circle cx="18" cy="16" r="5" fill="#f0447f" />
    <circle cx="34" cy="16" r="5" fill="#fcd34d" />
    <circle cx="50" cy="16" r="5" fill="#b8ff5a" />
    <text x="66" y="20" fill="#8a8798" fontFamily="JetBrains Mono, monospace" fontSize="11">mlops/pipeline.yaml</text>
    {[
      { x: 26, label: "data", c: "#8ec5ff" },
      { x: 128, label: "train", c: "#b8ff5a" },
      { x: 230, label: "registry", c: "#FF90E8" },
      { x: 332, label: "serve", c: "#ffd166" },
    ].map((n, i, arr) => (
      <g key={n.label}>
        <rect x={n.x} y="38" width="82" height="34" rx="8" fill={n.c} stroke="#111" strokeWidth="2.5" />
        <text x={n.x + 41} y="60" textAnchor="middle" fill="#111" fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="700">
          {n.label}
        </text>
        {i < arr.length - 1 && <path d={`M${n.x + 85} 55 h12`} stroke="#b8ff5a" strokeWidth="3" markerEnd="url(#ps-arrow)" />}
      </g>
    ))}
    {/* LLM layer, visible either side of the portrait's head */}
    <g fontFamily="JetBrains Mono, monospace">
      {/* left: RAG retrieval */}
      <text x="16" y="100" fill="#8a8798" fontSize="9">rag.retrieve()</text>
      <rect x="16" y="108" width="128" height="22" rx="11" fill="#ffffff14" stroke="#ffffff30" />
      <text x="26" y="123" fill="#e9e6f5" fontSize="9">q: how to deploy?</text>
      {/* vector db cylinder */}
      <g transform="translate(20 142)">
        <ellipse cx="22" cy="6" rx="22" ry="6" fill="#8ec5ff" stroke="#111" strokeWidth="2" />
        <path d="M0 6 v30 a22 6 0 0 0 44 0 v-30" fill="#8ec5ff" stroke="#111" strokeWidth="2" />
        <path d="M0 18 a22 6 0 0 0 44 0 M0 28 a22 6 0 0 0 44 0" fill="none" stroke="#111" strokeWidth="1.5" opacity="0.5" />
        <text x="22" y="52" textAnchor="middle" fill="#8ec5ff" fontSize="8">vector db</text>
      </g>
      <path d="M68 160 h10" stroke="#b8ff5a" strokeWidth="2.5" markerEnd="url(#ps-arrow)" />
      {["chunk 12 · .91", "chunk 07 · .88", "chunk 31 · .84"].map((c, i) => (
        <g key={c}>
          <rect x="84" y={142 + i * 17} width="66" height="13" rx="3" fill={i === 0 ? "#b8ff5a" : "#ffffff1c"} />
          <text x="88" y={151.5 + i * 17} fill={i === 0 ? "#111" : "#cfcbe0"} fontSize="7.5">{c}</text>
        </g>
      ))}

      {/* right: LangGraph agent loop */}
      <text x="292" y="100" fill="#8a8798" fontSize="9">langgraph.agent</text>
      <g stroke="#cfcbe0" strokeWidth="1.8" fill="none" opacity="0.8">
        <path d="M318 122 V140" markerEnd="url(#ps-arrow)" />
        <path d="M336 152 H372" markerEnd="url(#ps-arrow)" />
        <path d="M384 160 C376 182 344 182 334 166" markerEnd="url(#ps-arrow)" />
        <path d="M318 166 V184" markerEnd="url(#ps-arrow)" />
      </g>
      <circle cx="318" cy="116" r="6" fill="#ffffff" stroke="#111" strokeWidth="2" />
      <text x="330" y="119" fill="#cfcbe0" fontSize="8">start</text>
      <rect x="296" y="142" width="44" height="22" rx="11" fill="#FF90E8" stroke="#111" strokeWidth="2" />
      <text x="318" y="156.5" textAnchor="middle" fill="#111" fontSize="9" fontWeight="700">agent</text>
      <rect x="374" y="142" width="44" height="22" rx="11" fill="#ffd166" stroke="#111" strokeWidth="2" />
      <text x="396" y="156.5" textAnchor="middle" fill="#111" fontSize="9" fontWeight="700">tools</text>
      <rect x="292" y="188" width="54" height="20" rx="10" fill="#b8ff5a" stroke="#111" strokeWidth="2" />
      <text x="319" y="201.5" textAnchor="middle" fill="#111" fontSize="8.5" fontWeight="700">answer</text>
    </g>

  </svg>
);

const HeroArt = () => {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[460px] lg:max-w-[540px]">
      {/* background: pipeline screen + colour blocks */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 20, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 2.5 }}
        transition={{ type: "spring", bounce: 0.3, duration: 1, delay: 0.15 }}
        className="absolute left-[2%] right-[2%] top-[4%] z-0 aspect-[440/300] overflow-hidden rounded-[20px] border-[3px] border-nb-ink shadow-brutal-lg"
      >
        <PipelineScreen />
      </motion.div>
      <div aria-hidden="true" className="absolute bottom-[4%] right-[-2%] z-0 h-[30%] w-[38%] rounded-[24px] border-[3px] border-nb-ink bg-nb-violet" />
      <div aria-hidden="true" className="absolute bottom-[6%] left-[-2%] z-0 h-[22%] w-[34%] rounded-[24px] border-[3px] border-nb-ink bg-nb-lime" />

      {/* portrait in front, floating slowly */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -12, 0] }}
        transition={
          reduce
            ? { duration: 0.6 }
            : { opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.3 } }
        }
        className="relative z-20 pt-[22%]"
      >
        <img
          src={toon}
          alt={`Cartoon portrait of ${profile.firstName} ${profile.lastName}`}
          className="relative mx-auto w-[72%] select-none drop-shadow-[8px_8px_0_rgba(0,0,0,0.25)]"
          draggable="false"
        />
      </motion.div>

      {/* floating tool badges */}
      {TOOLS.map(({ Icon, img, name, color, pos, d }, i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.7 + i * 0.1 }}
          className={`absolute z-40 hidden sm:block ${pos}`}
        >
          <motion.div
            {...float(reduce, d, 9, 5 + (i % 3))}
            className="flex items-center gap-1.5 rounded-xl border-[2.5px] border-nb-ink bg-nb-card px-2.5 py-1.5 text-xs font-bold shadow-brutal-sm"
          >
            {Icon ? (
              <Icon size={16} style={{ color }} aria-hidden="true" />
            ) : (
              <img src={img} alt="" className="h-4 w-4 rounded" />
            )}
            {name}
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, rotate: -5 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.9, delay: 1.3 }}
        className="absolute -bottom-3 left-[-4%] z-40 rounded-xl border-[2.5px] border-nb-ink bg-nb-lime px-3.5 py-2 shadow-brutal-sm"
      >
        <span className="block text-xl font-bold leading-none">{research.length}</span>
        <span className="text-xs font-bold">research papers</span>
      </motion.div>
    </div>
  );
};

export default HeroArt;
