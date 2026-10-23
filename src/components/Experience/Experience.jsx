import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiLink } from "react-icons/fi";
import { experiences } from "../../constants";

const ExperienceItem = ({ item, isOpen, onToggle, index }) => {
  const panelId = `exp-panel-${item.id}`;
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-[5px] overflow-hidden transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen ? "bg-[#3a1062]" : "bg-[#45136e] hover:bg-[#511883]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-5 sm:px-9 py-5 flex items-center gap-4 text-left"
      >
        <span className="flex-1 font-poppins font-semibold text-white text-[15px] sm:text-lg leading-snug">
          {item.role} <span className="text-white/90">@ {item.company}</span>
        </span>
        <span className="hidden sm:block font-poppins font-semibold text-white text-base sm:text-lg whitespace-nowrap">
          {item.date}
        </span>
        <span className="relative w-5 h-5 shrink-0 ml-2 sm:ml-8" aria-hidden="true">
          <span className="absolute left-0 top-1/2 w-5 h-[2px] -translate-y-1/2 bg-white/90" />
          <span
            className={`absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 bg-white/90 transition-transform duration-300 ${
              isOpen ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-9 pb-8 pt-2 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_200px] gap-8 items-center">
              <div>
                <ul className="flex flex-wrap gap-x-6 gap-y-1 font-poppins text-[15px] text-white/75">
                  {item.location && (
                    <li className="flex items-center gap-1.5">
                      <FiMapPin aria-hidden="true" /> {item.location}
                    </li>
                  )}
                  {item.website && (
                    <li>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
                      >
                        <FiLink aria-hidden="true" /> {item.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      </a>
                    </li>
                  )}
                  {item.badge && <li className="font-mono text-xs self-center text-brand-cyan">{"// "}{item.badge.toLowerCase()}</li>}
                  <li className="sm:hidden font-mono text-xs self-center">{item.date}</li>
                </ul>
                <p className="mt-4 font-poppins text-[15px] leading-[1.65] text-white">{item.desc}</p>
                {item.skills?.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <li key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-black/25 border border-purple-400/25 text-purple-100">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {item.img && (
                <div className="hidden md:flex items-center justify-center">
                  <span className="w-40 h-40 rounded-full bg-white p-6 flex items-center justify-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
                    <img src={item.img} alt={`${item.company} logo`} className="max-w-full max-h-full object-contain" />
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const Experience = () => {
  const [openId, setOpenId] = useState(experiences?.[0]?.id ?? null);
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-5 sm:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center font-poppins font-semibold text-white tracking-[-0.02em] text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.05]"
      >
        Professional
        <br />
        Experience
      </motion.h2>

      <ul className="mt-14 sm:mt-16 max-w-[920px] mx-auto space-y-3.5">
        {experiences.map((item, i) => (
          <ExperienceItem
            key={item.id}
            item={item}
            index={i}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
          />
        ))}
      </ul>
    </section>
  );
};

export default Experience;
