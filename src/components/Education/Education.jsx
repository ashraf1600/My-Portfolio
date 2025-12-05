import React from "react";
import { education } from "../../constants";

// Group education data by type
const groupByType = (data) => {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type].push(item);
  });
  return grouped;
};

const Education = () => {
  const groupedEducation = groupByType(education);

  return (
    <section
      id="education"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans bg-gradient-to-b from-gray-900 via-[#0a0118] to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Section Title */}
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            EDUCATION
          </span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mx-auto rounded-full shadow-lg shadow-purple-500/50 mb-4"></div>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Academic journey and qualifications
        </p>
      </div>

      {/* Education Timeline */}
      {Object.entries(groupedEducation).map(([type, entries]) => (
        <div key={type} className="mb-20">
          {/* Type Badge */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-bold text-white">{type}</h3>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center line - visible on desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-600 transform -translate-x-1/2 hidden lg:block shadow-lg shadow-purple-500/30"></div>

            {/* Education Cards */}
            {entries.map((edu, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={edu.id} className="relative mb-12 lg:mb-20">
                  {/* Timeline dot - centered */}
                  <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-20 hidden lg:block">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-1.5 shadow-2xl shadow-purple-500/50">
                        <div className="w-full h-full rounded-full bg-[#0a0118] p-2 flex items-center justify-center overflow-hidden">
                          <img
                            src={edu.img}
                            alt={edu.school}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-purple-400/30 animate-ping"></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`lg:w-1/2 ${isLeft ? 'lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                    <div className="group relative">
                      {/* Floating gradient border */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>

                      {/* Main card */}
                      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/30">
                        {/* Card header with school logo */}
                        <div className="relative bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 border-b border-purple-500/20">
                          <div className="flex items-start gap-4">
                            {/* School logo circle */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1 flex-shrink-0 border border-purple-500/30">
                              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                <img
                                  src={edu.img}
                                  alt={edu.school}
                                  className="w-12 h-12 object-contain"
                                />
                              </div>
                            </div>

                            {/* Degree info */}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition">
                                {edu.degree}
                              </h3>
                              <p className="text-purple-400 font-semibold text-sm mb-1">
                                {edu.school}
                              </p>
                              <div className="flex items-center gap-2 text-gray-400 text-xs">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span>{edu.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-6">
                          {/* Grade badge */}
                          {edu.grade && (
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-4">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-yellow-400 font-bold text-sm">Grade: {edu.grade}</span>
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {edu.desc}
                          </p>
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-[100px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Education;
