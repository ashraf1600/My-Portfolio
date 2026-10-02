import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { research, researchMetrics, scholarlyProfiles } from "../../constants";
import { FaExternalLinkAlt, FaFilePdf, FaTimes, FaQuoteRight, FaCopy, FaCheck } from "react-icons/fa";
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
      className="group bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 p-6 flex flex-col relative overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
          <Icon size={22} />
        </div>
        {metric.trend && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full px-2.5 py-0.5">
            <HiSparkles size={11} className="text-amber-500" />
            {metric.trend}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl md:text-4xl font-black font-outfit text-slate-900 dark:text-white">
          <Counter value={metric.value} suffix={metric.suffix || ""} />
        </span>
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
        {metric.label}
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
        {metric.description}
      </p>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Published":
    case "Accepted":
    case "Copyright Confirmed":
      return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30";
    case "Under Review":
    case "Submitted":
      return "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30";
    case "In Progress":
      return "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/30";
    default:
      return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/30";
  }
};

// Extract short venue tag (e.g., "IEEE ICDSBS" from full conference name)
const getVenueTag = (conference) => {
  if (/IEEE/i.test(conference)) {
    const match = conference.match(/\(([^)]+)\)/);
    return match ? `IEEE ${match[1]}` : "IEEE";
  }
  if (/ICCPCT/i.test(conference)) return "ICCPCT";
  if (/iCONEECT/i.test(conference)) return "iCONEECT";
  if (/not submitted/i.test(conference)) return "In Prep";
  return conference.length > 20 ? conference.slice(0, 18) + "…" : conference;
};

// Highlight the user's name in author list
const highlightAuthors = (authors) => {
  const regex = /(Ashraful Islam|Ashraf-ul-Islam|Ashraf-Ul-Islam)/i;
  const parts = authors.split(regex);
  if (parts.length === 1) return <span>{authors}</span>;
  return (
    <span>
      {parts.map((part, i) => (
        i % 2 === 1 ? (
          <span key={i} className="text-blue-600 dark:text-blue-400 font-bold">{part}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      ))}
    </span>
  );
};

const PaperModal = ({ paper, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const bibtex = `@article{islam${paper.year}_${paper.id},
  title={${paper.title}},
  author={${paper.authors}},
  journal={${paper.conference}},
  year={${paper.year}}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="bg-white dark:bg-[#111b2e] rounded-2xl max-w-3xl w-full border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden relative my-8 animate-[scaleIn_0.25s_cubic-bezier(0.22,1,0.36,1)]"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                paper.status
              )}`}
            >
              {paper.status}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
            {paper.title}
          </h3>

          <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
            {highlightAuthors(paper.authors)}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 font-semibold">
            {paper.conference} • {paper.year}
          </p>

          <div className="mb-6 bg-gray-50 dark:bg-white/3 p-5 rounded-xl border border-gray-200 dark:border-white/8">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Abstract Overview
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {paper.abstract}
            </p>
          </div>

          {/* Citation BibTeX Block */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <FaQuoteRight size={12} className="text-blue-500" /> BibTeX Citation
              </span>
              <button
                onClick={copyBibtex}
                className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                {copied ? <FaCheck size={12} className="text-emerald-500" /> : <FaCopy size={12} />}
                <span>{copied ? "Copied!" : "Copy BibTeX"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#0b1121] text-blue-300 text-xs font-mono overflow-x-auto border border-white/8">
              {bibtex}
            </pre>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {paper.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-blue-500/20"
            >
              <FaExternalLinkAlt size={14} />
              <span>Publisher Paper Link</span>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>,
    document.body
  );
};

const Research = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState(null);

  const filteredResearch =
    selectedCategory === "All"
      ? research
      : research.filter((paper) => paper.category === selectedCategory);

  // Group papers by year
  const papersByYear = filteredResearch.reduce((acc, paper) => {
    const year = paper.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(paper);
    return acc;
  }, {});

  const sortedYears = Object.keys(papersByYear).sort((a, b) => b - a);

  return (
    <section
      id="research"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase mb-2">
          Academic Track Record
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 font-outfit">
          Research & Publications
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Peer-reviewed research across IEEE venues in Explainable AI, Vision Transformers, IoT security, and Retrieval-Augmented Generation.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-14">
        {researchMetrics.map((metric, i) => (
          <MetricCard key={metric.label} metric={metric} index={i} />
        ))}
      </div>

      {/* Publications Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
          <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold font-outfit">
            Peer-Reviewed Papers
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent ml-2" />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                : "bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Research Papers — Grouped by Year */}
      <div className="space-y-10 mb-14">
        {sortedYears.map((year) => (
          <div key={year}>
            {/* Year header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-extrabold font-outfit text-blue-600 dark:text-cyan-400">
                {year}
              </span>
              <div className="flex-1 h-px bg-blue-200/60 dark:bg-blue-500/20" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
                {papersByYear[year].length} paper{papersByYear[year].length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Papers */}
            <div className="space-y-4">
              {papersByYear[year].map((paper) => (
                <div
                  key={paper.id}
                  className="group flex flex-col md:flex-row bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Left venue tag */}
                  <div className="md:w-44 shrink-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-white/5 flex flex-col justify-center p-6 bg-slate-50/50 dark:bg-white/[0.02]">
                    <span className="inline-block text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
                      {getVenueTag(paper.conference)}
                    </span>
                    <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {paper.year}
                    </div>
                  </div>

                  {/* Paper content */}
                  <div className="flex-1 p-6 md:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <h3 className="font-outfit text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {paper.title}
                      </h3>
                      <span
                        className={`inline-block shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(
                          paper.status
                        )}`}
                      >
                        {paper.status}
                      </span>
                    </div>

                    {/* Authors with highlighted name */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
                      {highlightAuthors(paper.authors)}
                    </p>

                    {/* Conference */}
                    <p className="text-xs text-blue-600 dark:text-cyan-400/90 font-medium mb-3">
                      {paper.conference}
                    </p>

                    {/* Abstract preview */}
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {paper.abstract}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {paper.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-lg px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                      {paper.tags.length > 4 && (
                        <span className="text-[11px] text-slate-400 self-center">
                          +{paper.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setSelectedPaper(paper)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors group/btn"
                      >
                        <span>Details & Citation</span>
                        <HiArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResearch.length === 0 && (
        <div className="text-center py-12 mb-14">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No research papers found in this category.
          </p>
        </div>
      )}

      {/* Paper Modal */}
      {selectedPaper && (
        <PaperModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
      )}

      {/* Scholarly Profiles */}
      <div className="bg-white dark:bg-[#111b2e] border border-gray-200 dark:border-white/8 rounded-2xl shadow-sm p-6 md:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
              Scholarly Profiles
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/30"
                >
                  <Icon size={18} />
                  <span>{profile.name}</span>
                  <HiArrowUpRight
                    size={14}
                    className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
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
