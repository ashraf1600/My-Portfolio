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
      className="py-24 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans relative"
    >
      {/* Section Title — Academic serif */}
      <div className="text-center mb-14 relative z-10">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3">
          Industry
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Experience
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-5"></div>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Professional roles and internships where I've applied research and engineering skills in real-world settings.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500/10 rounded-full" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              className="relative flex gap-6 md:gap-8 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            >
              {/* Timeline dot with logo */}
              <div className="relative flex-shrink-0 z-10">
                <motion.div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center overflow-hidden group-hover:border-blue-300 transition-colors duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                >
                  {exp.img ? (
                    <img
                      src={exp.img}
                      alt={exp.company}
                      className="w-full h-full object-contain p-1.5"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-blue-50 dark:bg-[#0b1121] flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg font-serif ${exp.img ? "hidden" : "flex"}`}
                  >
                    {exp.company?.[0] || "P"}
                  </div>
                </motion.div>
              </div>

              {/* Card */}
              <div className="flex-1 group">
                <div className="bg-white dark:bg-[#111b2e] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-6">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-serif leading-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <HiOfficeBuilding size={14} className="text-amber-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-lg border border-gray-100 dark:border-white/5">
                      <HiCalendar size={13} className="text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {exp.desc && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
                      {exp.desc}
                    </p>
                  )}

                  {/* Skills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100 dark:border-white/5">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded px-2 py-0.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
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
        <div className="absolute left-[1.35rem] md:left-[1.85rem] bottom-0 w-3 h-3 rounded-full bg-blue-500/30 border-2 border-white dark:border-[#0b1121]" />
      </div>
    </section>
  );
};

export default Experience;
