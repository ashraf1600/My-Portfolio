import React from "react";
import { education } from "../../constants";
import { HiCalendar, HiAcademicCap } from "react-icons/hi";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Section Title */}
      <div className="text-center mb-14 relative z-10">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase mb-3">
          Academic Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          Education
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-teal-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Academic qualifications and the learning journey that shaped my engineering and research foundation.
        </p>
      </div>

      {/* Education Cards — compact vertical list */}
      <div className="relative max-w-3xl mx-auto z-10">
        {/* Vertical accent line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-teal-500 to-indigo-500/20 rounded-full" />

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="relative flex gap-6 md:gap-8">
              {/* Logo bubble */}
              <div className="relative flex-shrink-0 z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-gray-900 border-2 border-indigo-500/40 shadow-md shadow-indigo-500/10 flex items-center justify-center overflow-hidden p-1">
                  <img
                    src={edu.img}
                    alt={edu.school}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Dot on line */}
                <div className="absolute -left-[1.4rem] md:-left-[1.9rem] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white dark:border-gray-950 shadow-sm" />
              </div>

              {/* Card */}
              <div className="flex-1 group">
                <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden">
                  {/* Thin accent bar */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-teal-500" />

                  <div className="p-5">
                    {/* Top row: degree + date */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <HiAcademicCap size={13} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
                          <span className="text-sm text-teal-700 dark:text-teal-400 font-semibold">
                            {edu.school}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <HiCalendar size={12} className="text-slate-400 dark:text-gray-500" />
                        <span className="text-xs text-slate-500 dark:text-gray-400 font-medium whitespace-nowrap bg-slate-100 dark:bg-gray-800/60 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-gray-700/50">
                          {edu.date}
                        </span>
                      </div>
                    </div>

                    {/* Grade badge (only when present) */}
                    {edu.grade && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5 mb-2">
                        ⭐ {edu.grade}
                      </span>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                      {edu.desc}
                    </p>
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

export default Education;
