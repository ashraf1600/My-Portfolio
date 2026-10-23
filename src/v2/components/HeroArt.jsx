import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import toon from "../../assets/ashraf-toon.png";
import { profile } from "../../constants";

// Minimal hero art: the comic portrait floats over a faint line drawing of the
// stack (MLOps pipeline, RAG retrieval, agent loop). Everything is drawn in the
// theme ink at low opacity and faded at the edges, so it blends into the
// off-white page in light mode and the charcoal page in dark mode.

const STAGES = ["data", "train", "registry", "serve"];
const TAGS = [
  { label: "RAG", pos: "left-[0%] top-[30%]", d: 0 },
  { label: "LangGraph", pos: "right-[-2%] top-[34%]", d: 1.4 },
  { label: "MLOps", pos: "left-[4%] bottom-[16%]", d: 2.2 },
  { label: "FastAPI", pos: "right-[2%] bottom-[24%]", d: 0.8 },
];

const LineArt = () => (
  <svg
    viewBox="0 0 440 440"
    className="h-full w-full text-nb-ink"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    {/* pipeline across the top */}
    <g strokeWidth="1.2" opacity="0.28" fontFamily="JetBrains Mono, monospace">
      {STAGES.map((s, i) => {
        const x = 58 + i * 84;
        return (
          <g key={s}>
            <rect x={x} y="78" width="72" height="24" rx="12" />
            <text x={x + 36} y="94" textAnchor="middle" fontSize="10" fill="currentColor" stroke="none">
              {s}
            </text>
            {i < STAGES.length - 1 && <path d={`M${x + 74} 90 h8`} strokeDasharray="2 3" />}
          </g>
        );
      })}
    </g>

    {/* RAG: vector store + retrieved chunks, left */}
    <g strokeWidth="1.2" opacity="0.22">
      <ellipse cx="62" cy="168" rx="26" ry="7" />
      <path d="M36 168 v34 a26 7 0 0 0 52 0 v-34" />
      <path d="M36 185 a26 7 0 0 0 52 0" opacity="0.6" />
      <path d="M92 185 h8" strokeDasharray="2 3" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="104" y={166 + i * 14} width={34 - i * 8} height="8" rx="4" />
      ))}
    </g>

    {/* agent loop, right */}
    <g strokeWidth="1.2" opacity="0.22">
      <circle cx="350" cy="160" r="5" />
      <path d="M350 167 v14" strokeDasharray="2 3" />
      <rect x="326" y="184" width="48" height="22" rx="11" />
      <rect x="326" y="238" width="48" height="22" rx="11" />
      <path d="M378 195 c26 4 26 50 0 54" strokeDasharray="2 3" />
      <path d="M322 249 c-26 -4 -26 -50 0 -54" strokeDasharray="2 3" />
    </g>
    <g opacity="0.3" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="currentColor" stroke="none">
      <text x="62" y="226" textAnchor="middle">vectors</text>
      <text x="350" y="199" textAnchor="middle">agent</text>
      <text x="350" y="253" textAnchor="middle">tools</text>
    </g>

    {/* orbit ring behind the portrait */}
    <circle cx="220" cy="250" r="150" strokeWidth="1" opacity="0.14" strokeDasharray="1 6" strokeLinecap="round" />
  </svg>
);

const HeroArt = () => {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px] lg:max-w-[520px]">
      {/* faint line drawing, faded out toward the edges */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute inset-0 [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
      >
        <LineArt />
      </motion.div>

      {/* soft glow, theme-tinted */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[56%] h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nb-lime/40 blur-3xl dark:bg-nb-violet/25"
      />

      {/* portrait, floating slowly; bottom edge fades into the page */}
      <motion.img
        src={toon}
        alt={`Cartoon portrait of ${profile.firstName} ${profile.lastName}`}
        draggable="false"
        initial={{ opacity: 0, y: 24 }}
        animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
        transition={
          reduce
            ? { duration: 0.6 }
            : { opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.3 } }
        }
        className="absolute bottom-0 left-1/2 w-[70%] select-none [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
        style={{ x: "-50%" }}
      />

      {/* a few quiet tags */}
      {TAGS.map(({ label, pos, d }, i) => (
        <motion.span
          key={label}
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.8 + i * 0.12 },
            y: { duration: 6 + (i % 2), ease: "easeInOut", repeat: Infinity, delay: d },
          }}
          className={`absolute z-10 hidden rounded-full border border-nb-ink/15 bg-nb-paper/70 px-3 py-1 font-jb text-[11px] font-semibold text-nb-muted backdrop-blur-sm sm:block ${pos}`}
        >
          {label}
        </motion.span>
      ))}
    </div>
  );
};

export default HeroArt;
