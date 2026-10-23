import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCode, FiTrendingUp } from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineCpuChip } from "react-icons/hi2";
import { experiences, research } from "../../constants";
import { about, marqueeWords } from "../content";
import SectionTitle from "./SectionTitle";

const FACT_ICONS = { pin: FiMapPin, code: FiCode, cap: HiOutlineAcademicCap };

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } };

export const Marquee = () => {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="overflow-hidden border-y-2 border-nb-night bg-nb-night py-3" aria-hidden="true">
      <div className="animate-nb-marquee flex w-max items-center">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-jb text-sm font-bold uppercase tracking-widest text-nb-cream">
            {w}
            <span className="text-nb-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Hl = ({ children, tone = "lime" }) => (
  <span className={`rounded-sm px-1 py-0.5 font-bold ${tone === "lime" ? "bg-nb-lime/40" : "bg-nb-pink/40"}`}>{children}</span>
);

const About = () => {
  const current = experiences[0];
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-nb-lime/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-nb-hot/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle title="About" />

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="mt-8 flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <motion.div variants={item} className="flex flex-col justify-between rounded-xl border-2 border-nb-ink bg-nb-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8 lg:col-span-7">
              <div>
                <p className="text-[17px] leading-relaxed">
                  I&apos;m a CSE undergraduate at <Hl>CUET</Hl> building <Hl tone="pink">machine learning systems</Hl> that leave the notebook. My work spans{" "}
                  <Hl>Vision Transformers</Hl>, <Hl tone="pink">retrieval-augmented generation</Hl>, <Hl>explainable ML</Hl> and the production
                  APIs that serve them, with {research.length} research papers in IEEE &amp; international venues along the way.
                </p>
                {current && (
                  <p className="mt-6 text-[15px] font-medium text-nb-muted">
                    Currently: {current.role} @ {current.company}.
                  </p>
                )}
              </div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {about.facts.map((f) => {
                  const Icon = FACT_ICONS[f.icon] || FiCode;
                  return (
                    <motion.li
                      key={f.label}
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="inline-flex cursor-default items-center gap-2 rounded-md border-2 border-nb-ink bg-nb-card px-3 py-1.5 text-sm font-bold shadow-brutal-sm"
                    >
                      <Icon size={16} aria-hidden="true" /> {f.label}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div variants={item} className="group rounded-xl border-2 border-nb-ink bg-nb-lime p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8 lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-nb-ink bg-nb-card transition-transform duration-300 group-hover:rotate-12">
                  <HiOutlineCpuChip size={20} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold">What I build</h3>
              </div>
              <ul className="mt-6 space-y-4 text-[15px] font-bold">
                {about.build.map((b) => (
                  <li key={b} className="group/item flex gap-2 transition-transform hover:translate-x-1">
                    <span className="font-bold group-hover/item:text-nb-hot">→</span> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div variants={item} className="group relative overflow-hidden rounded-xl border-2 border-nb-ink bg-[#1A1A1A] p-6 text-white shadow-brutal md:p-8">
            <div className="relative z-10 mb-8 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2 border-nb-ink bg-nb-hot transition-transform duration-700 ease-in-out group-hover:rotate-180">
                <FiTrendingUp size={22} className="text-white" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-bold">How I work</h3>
                <p className="font-jb text-sm text-[#888]">Engineering workflow</p>
              </div>
            </div>
            <div className="relative z-10 flex flex-col gap-4 md:flex-row">
              <div className="absolute left-0 top-[9px] z-0 hidden h-px w-full border-t border-dashed border-[#555] md:block" />
              {about.workflow.map((w, idx) => (
                <motion.div
                  key={w.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group/step relative z-10 flex flex-1 cursor-default flex-col gap-2"
                >
                  <span className="w-fit bg-[#1A1A1A] pr-3 font-jb text-[10px] font-bold text-[#888] transition-colors group-hover/step:text-nb-lime">{w.step}</span>
                  <div className="h-full rounded-md border border-[#444] bg-[#2A2A2A] p-3 transition-all duration-300 group-hover/step:-translate-y-1 group-hover/step:border-nb-lime">
                    <h4 className="text-[14px] font-bold text-nb-lime">{w.title}</h4>
                    <p className="mt-1 font-jb text-[12px] text-[#999]">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="relative overflow-hidden rounded-xl border-2 border-nb-ink bg-nb-card p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 md:p-8">
            <h3 className="mb-4 font-jb text-xs font-bold uppercase tracking-widest text-nb-muted">Currently focused on</h3>
            <div className="flex flex-wrap gap-3">
              {about.focus.map((a) => (
                <span key={a} className="cursor-default rounded-md border-2 border-nb-ink bg-nb-card px-3 py-1.5 font-jb text-xs font-bold transition-colors hover:bg-nb-lime">
                  {a}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
