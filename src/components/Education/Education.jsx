import React from "react";
import { education } from "../../constants";
import { HiCalendar, HiAcademicCap } from "react-icons/hi";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans relative overflow-hidden"
    >
      {/* Section Title — Academic serif style */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3">
          Academic Journey
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Education
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Academic qualifications and the learning journey that shaped my engineering and research foundation.
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative max-w-3xl mx-auto z-10">
        {/* Vertical timeline line */}
        <div className="absolute left-6 md:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500/10 rounded-full" />

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={edu.id} className="relative flex gap-6 md:gap-8 group">
              {/* Timeline node */}
              <div className="relative flex-shrink-0 z-10 flex items-start">
                <div className="mt-1">
                  {/* Clean node */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center overflow-hidden p-1.5 group-hover:border-blue-300 transition-colors duration-300">
                    <img
                      src={edu.img}
                      alt={edu.school}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 pb-2">
                <div className="bg-white dark:bg-[#111b2e] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6">
                  {/* Header row: degree + date */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex-1">
                      {/* Degree type badge */}
                      {edu.type && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/5 rounded-md px-2 py-1 mb-2">
                          {edu.type}
                        </span>
                      )}

                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight font-serif mb-1.5">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <HiAcademicCap size={15} className="text-amber-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {edu.school}
                        </span>
                      </div>
                    </div>

                    {/* Date pill */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-lg border border-gray-100 dark:border-white/5 h-fit mt-1 sm:mt-0">
                      <HiCalendar size={12} className="text-gray-400 dark:text-gray-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                        {edu.date}
                      </span>
                    </div>
                  </div>

                  {/* Grade badge */}
                  {edu.grade && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-md px-2.5 py-1 mb-4">
                      <span className="text-amber-500">⭐</span> {edu.grade}
                    </span>
                  )}

                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline end cap */}
        <div className="absolute left-[1.35rem] md:left-[1.85rem] bottom-0 w-3 h-3 rounded-full bg-blue-500/30 border-2 border-white dark:border-[#0b1121]" />
      </div>
    </section>
  );
};

export default Education;
