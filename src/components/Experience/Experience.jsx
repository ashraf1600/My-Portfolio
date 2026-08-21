import React from "react";
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
      {/* Ambient glow */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-14 relative z-10">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase mb-3">
          Industry
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          Experience
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-teal-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Professional roles and internships where I've applied research and engineering skills in real-world settings.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-teal-500 to-indigo-500/20 rounded-full" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative flex gap-6 md:gap-8">
              {/* Timeline dot with logo */}
              <div className="relative flex-shrink-0 z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-gray-900 border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/20 flex items-center justify-center overflow-hidden">
                  {exp.img ? (
                    <img
                      src={exp.img}
                      alt={exp.company}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-gradient-to-br from-indigo-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl ${exp.img ? "hidden" : "flex"}`}
                  >
                    {exp.company?.[0] || "P"}
                  </div>
                </div>
                {/* Connecting dot */}
                <div className="absolute -left-[1.4rem] md:-left-[1.9rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white dark:border-gray-950 shadow-md" />
              </div>

              {/* Card */}
              <div className="flex-1 group">
                <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-teal-500" />

                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <HiOfficeBuilding size={14} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                          <span className="text-teal-700 dark:text-teal-400 font-semibold text-sm">
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <HiCalendar size={13} className="text-slate-400 dark:text-gray-500" />
                        <span className="text-xs text-slate-500 dark:text-gray-400 font-medium bg-slate-100 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-slate-200 dark:border-gray-700/50">
                          {exp.date}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {exp.desc && (
                      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                        {exp.desc}
                      </p>
                    )}

                    {/* Skills */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <HiChip size={13} className="text-indigo-500" />
                          <span className="text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">
                            Skills
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-md px-2.5 py-0.5"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline end cap */}
        <div className="absolute left-[1.35rem] md:left-[1.85rem] bottom-0 w-3 h-3 rounded-full bg-gradient-to-b from-teal-500 to-teal-500/20 border-2 border-white dark:border-gray-950" />
      </div>
    </section>
  );
};

export default Experience;
