import React, { useEffect, useRef, useState } from "react";
import { research, researchMetrics, scholarlyProfiles } from "../../constants";
import { FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";
import {
  HiAcademicCap,
  HiDocumentText,
  HiBookOpen,
  HiSparkles,
  HiArrowUpRight,
} from "react-icons/hi2";
import { SiGooglescholar, SiOrcid, SiIeee } from "react-icons/si";

const categories = ["All", "Machine Learning", "Deep Learning", "Image Processing", "Healthcare AI"];

const useCountUp = (target, duration = 1400) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const animate = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [value, ref];
};

const Counter = ({ value, suffix = "" }) => {
  const [n, ref] = useCountUp(value);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
};

const MetricCard = ({ metric, index }) => {
  const Icon = metric.icon;
  return (
    <div
      className="group relative bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`h-1 w-full bg-gradient-to-r ${metric.accent}`}
        aria-hidden="true"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border ${metric.tint}`}
          >
            <Icon size={22} />
          </div>
          {metric.trend && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
              <HiSparkles size={12} />
              {metric.trend}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            <Counter value={metric.value} suffix={metric.suffix || ""} />
          </span>
        </div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          {metric.label}
        </h4>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 leading-relaxed">
          {metric.description}
        </p>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Published":
      return "bg-green-500/20 text-green-400 border-green-500";
    case "Under Review":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
    case "In Progress":
      return "bg-blue-500/20 text-blue-400 border-blue-500";
    default:
      return "bg-slate-200 dark:bg-gray-500/20 text-slate-700 dark:text-gray-400 border-slate-300 dark:border-gray-500";
  }
};

const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredResearch =
    selectedCategory === "All"
      ? research
      : research.filter((paper) => paper.category === selectedCategory);

  return (
    <section
      id="research"
      className="py-24 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-purple-600 dark:text-purple-400 uppercase mb-3">
          By the Numbers
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          Research & Impact
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          My research contributions in Machine Learning, AI, and Computer
          Science — and a snapshot of the academic footprint they form.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-14">
        {researchMetrics.map((metric, i) => (
          <MetricCard key={metric.label} metric={metric} index={i} />
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold">
            Publications
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-gray-700/50 to-transparent ml-2" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === category
              ? "bg-purple-600 text-white"
              : "bg-slate-200 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-purple-700 hover:text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Research Papers Grid */}
      <div className="grid gap-8 grid-cols-1 mb-14">
        {filteredResearch.map((paper) => (
          <div
            key={paper.id}
            className="border border-slate-200 dark:border-white bg-white/90 dark:bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-purple-500/50 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {paper.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm mb-2">{paper.authors}</p>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                  {paper.conference} • {paper.year}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    paper.status
                  )}`}
                >
                  {paper.status}
                </span>
              </div>
            </div>

            <p className="text-slate-700 dark:text-gray-300 mb-4 leading-relaxed">{paper.abstract}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {paper.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-500/10 dark:bg-[#251f38] text-xs font-semibold text-purple-700 dark:text-purple-500 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                <FaExternalLinkAlt size={14} />
                View Paper
              </a>
              <button className="inline-flex items-center gap-2 bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition">
                <FaFilePdf size={14} />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResearch.length === 0 && (
        <div className="text-center py-12 mb-14">
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            No research papers found in this category.
          </p>
        </div>
      )}

      {/* Scholarly Profiles */}
      <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md border border-slate-200 dark:border-gray-700/50 rounded-2xl shadow-md p-6 md:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Scholarly Profiles
            </h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
              Follow my work and stay up to date with new publications.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {scholarlyProfiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${profile.bgClass}`}
                >
                  <Icon size={18} />
                  <span>{profile.name}</span>
                  <HiArrowUpRight
                    size={14}
                    className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
