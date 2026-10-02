import React from "react";
import { education } from "../../constants";
import { HiCalendar, HiAcademicCap } from "react-icons/hi";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans relative overflow-hidden"
    >
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block text-xs font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase mb-2">
          Academic Foundation
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 font-outfit">
          Education
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Academic qualifications and foundational learning across Computer Science, Engineering, and Mathematics.
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative max-w-3xl mx-auto z-10">
        {/* Vertical timeline line */}
        <div className="absolute left-6 md:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500/20 rounded-full" />

        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="relative flex gap-5 md:gap-8 group">
              {/* Timeline node */}
              <div className="relative flex-shrink-0 z-10 flex items-start">
                <div className="mt-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg shadow-blue-500/10 flex items-center justify-center overflow-hidden p-2 group-hover:border-blue-400 group-hover:scale-105 transition-all duration-300">
                    <img
                      src={edu.img}
                      alt={edu.school}
                      className="w-full h-full object-contain filter-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 pb-2">
                <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 p-6 md:p-7 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />

                  {/* Header row: degree + date */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex-1">
                      {/* Degree type badge */}
                      {edu.type && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full px-2.5 py-0.5 mb-2">
                          {edu.type}
                        </span>
                      )}

                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight font-outfit mb-1.5">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <HiAcademicCap size={16} className="text-amber-500 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">
                          {edu.school}
                        </span>
                      </div>
                    </div>

                    {/* Date pill */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5 h-fit mt-1 sm:mt-0">
                      <HiCalendar size={13} className="text-blue-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                        {edu.date}
                      </span>
                    </div>
                  </div>

                  {/* Grade badge */}
                  {edu.grade && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1 mb-4">
                      <span className="text-amber-500">⭐</span> {edu.grade}
                    </span>
                  )}

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline end cap */}
        <div className="absolute left-[1.35rem] md:left-[1.85rem] bottom-0 w-3 h-3 rounded-full bg-cyan-400 border-2 border-white dark:border-[#080d1a] shadow-[0_0_8px_#22d3ee]" />
      </div>
    </section>
  );
};

export default Education;
