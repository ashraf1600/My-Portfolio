import React from "react";
import { motion } from "framer-motion";
import { experiences } from "../../constants";
import { HiOfficeBuilding, HiCalendar, HiChip } from "react-icons/hi";
import { FiBriefcase } from "react-icons/fi";

const Experience = () => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block text-xs font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase mb-2">
          Career Milestone
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 font-outfit">
          Work Experience
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Applied engineering and machine learning workflows built for production environments.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Animated Laser Gradient Line */}
        <div className="absolute left-6 md:left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500/20 rounded-full" />

        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id} 
              className="relative flex gap-5 md:gap-8 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            >
              {/* Timeline dot with logo */}
              <div className="relative flex-shrink-0 z-10">
                <motion.div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-200 dark:border-white/20 shadow-md shadow-blue-500/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-blue-400 group-hover:scale-105 transition-all duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                >
                  {exp.img ? (
                    <img
                      src={exp.img}
                      alt={exp.company}
                      className="w-full h-full object-contain filter-none"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 font-bold text-lg ${exp.img ? "hidden" : "flex"}`}
                  >
                    {exp.company?.[0] || "P"}
                  </div>
                </motion.div>
              </div>

              {/* Card */}
              <div className="flex-1">
                <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 p-6 md:p-7 relative overflow-hidden">
                  {/* Top indicator glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-0.5 rounded-full mb-1.5">
                        {exp.badge || (exp.date?.includes("Present") ? "Current Position" : "Industry Experience")}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-outfit leading-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <HiOfficeBuilding size={16} className="text-amber-500 flex-shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5">
                      <HiCalendar size={14} className="text-blue-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {exp.desc && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {exp.desc}
                    </p>
                  )}

                  {/* Skills Pills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/5">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-lg px-2.5 py-1 hover:border-blue-400/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline end cap */}
        <div className="absolute left-[1.35rem] md:left-[1.85rem] bottom-0 w-3 h-3 rounded-full bg-cyan-400 border-2 border-white dark:border-[#080d1a] shadow-[0_0_8px_#22d3ee]" />
      </div>
    </section>
  );
};

export default Experience;
