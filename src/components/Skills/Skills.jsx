import React from "react";
import { motion } from "framer-motion";
import { HiOutlineCpuChip, HiOutlineSparkles, HiOutlineServerStack } from "react-icons/hi2";
import { expertise, SkillsInfo } from "../../constants";

const ICONS = {
  brain: HiOutlineCpuChip,
  sparkles: HiOutlineSparkles,
  stack: HiOutlineServerStack,
};

const ACCENT_CLASS = {
  magenta: "chonky-magenta",
  blue: "chonky-blue",
  orange: "chonky-orange",
  violet: "chonky-violet",
};

// Faint, syntax-coloured HTML watermark behind the cards.
const Watermark = () => (
  <pre
    aria-hidden="true"
    className="code-watermark absolute left-1/2 -translate-x-[30%] top-0 select-none pointer-events-none opacity-[0.16] font-mono text-[12px] sm:text-sm leading-[1.75] whitespace-pre"
  >
    <span className="t">&lt;html</span> <span className="a">lang</span>=<span className="v">{'"en"'}</span><span className="t">&gt;</span>{"\n"}
    {"  "}<span className="t">&lt;head&gt;</span>{"\n"}
    {"    "}<span className="t">&lt;meta</span> <span className="a">name</span>=<span className="v">{'"viewport"'}</span> <span className="a">content</span>=<span className="v">{'"width=device-width, initial-scale=1.0"'}</span><span className="t">&gt;</span>{"\n"}
    {"    "}<span className="t">&lt;title&gt;</span>What do I build<span className="t">&lt;/title&gt;</span>{"\n"}
    {"  "}<span className="t">&lt;/head&gt;</span>{"\n"}
    {"  "}<span className="t">&lt;body&gt;</span>{"\n"}
    {"    "}<span className="t">&lt;h1&gt;</span>Intelligent systems, from notebook to production<span className="t">&lt;/h1&gt;</span>{"\n"}
    {"    "}<span className="t">&lt;p&gt;</span>{"\n"}
    {"      "}RAG pipelines, Vision Transformers, FastAPI services{"\n"}
    {"      "}and the Docker images that ship them.{"\n"}
    {"    "}<span className="t">&lt;/p&gt;</span>{"\n"}
    {"    "}<span className="t">&lt;span&gt;</span>{"\n"}
    {"      "}{'print("Hello, World!")'}{"\n"}
    {"    "}<span className="t">&lt;/span&gt;</span>{"\n"}
    {"  "}<span className="t">&lt;/body&gt;</span>{"\n"}
    <span className="t">&lt;/html&gt;</span>
  </pre>
);

const ExpertiseCard = ({ item, index }) => {
  const Icon = ICONS[item.icon] || HiOutlineCpuChip;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group p-8 sm:p-10 lg:p-11"
    >
      <header className="flex items-start gap-5">
        <Icon className="shrink-0 text-white mt-1" size={46} aria-hidden="true" />
        <h3 className="font-poppins font-bold text-white text-[1.65rem] sm:text-[1.85rem] leading-[1.15] tracking-[-0.02em]">
          <span className={`chonky has-group-anim ${ACCENT_CLASS[item.accent] || "chonky-magenta"}`}>
            {item.title}
          </span>
          <br />
          {item.subtitle}
        </h3>
      </header>

      <div className="mt-8 font-mono text-noir-muted text-sm">&lt;h3&gt;</div>
      <p className="ml-5 pl-5 border-l border-noir-line my-3 font-mono text-[15px] sm:text-base leading-[1.75] text-white/90">
        {item.description}
      </p>
      <div className="font-mono text-noir-muted text-sm">&lt;/h3&gt;</div>
    </motion.article>
  );
};

const Skills = () => {
  return (
    <section id="expertise" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center font-poppins font-semibold text-white tracking-[-0.02em] text-[clamp(2.75rem,7vw,5.5rem)] leading-none mb-16 sm:mb-20"
      >
        My Expertise
      </motion.h2>

      <div className="relative max-w-[1350px] mx-auto">
        <div className="relative">
        <div className="absolute inset-x-0 top-[72%] h-[460px] overflow-hidden">
          <Watermark />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 border-2 border-white/70 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-white/70 bg-noir-canvas/70 backdrop-blur-[2px]">
          {expertise.map((item, i) => (
            <ExpertiseCard key={item.key} item={item} index={i} />
          ))}
        </div>
        </div>

        {/* Toolbox: every skill from SkillsInfo, grouped */}
        <div className="relative z-10 mt-[420px] sm:mt-[400px] lg:mt-[360px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {SkillsInfo.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-xs text-brand-cyan mb-3">
                {"// "}
                {group.title.toLowerCase()}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 border border-noir-line bg-noir-card hover:border-brand-cyan/60 transition-colors"
                  >
                    <span className="w-5 h-5 flex items-center justify-center bg-white/90 rounded-sm p-[2px]">
                      <img src={s.logo} alt="" className="max-w-full max-h-full object-contain" loading="lazy" />
                    </span>
                    <span className="font-mono text-xs text-white/85">{s.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
