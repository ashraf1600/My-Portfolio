import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";

import { projects } from "../../constants";
import {
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiStar,
  HiCode,
  HiExternalLink,
  HiCheckCircle,
  HiEye,
  HiSearch,
  HiSparkles,
  HiArrowRight,
} from "react-icons/hi";
import {
  FiSearch,
  FiX,
  FiGrid,
  FiList,
  FiLayers,
  FiGithub,
  FiArrowUpRight,
  FiCheck,
  FiBookmark,
} from "react-icons/fi";

const CATEGORIES = [
  "All",
  "Web Development",
  "Machine Learning",
  "Academic Project",
];

// Helper: safe deduplicated screenshots
const getProjectScreenshots = (p) =>
  Array.from(new Set(p.screenshots?.length ? p.screenshots : [p.image]));

// ----------------------------------------------------------------------
// Sub-Component: 2-Column Responsive Modal
// ----------------------------------------------------------------------
const ProjectModal = ({ project, onClose }) => {
  const screenshots = getProjectScreenshots(project);
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImg = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const prevImg = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") nextImg();
      else if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, nextImg, prevImg]);

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] overflow-y-auto bg-gray-950/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 md:p-8 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-blue-500/20 w-full max-w-5xl max-h-[90vh] flex flex-col lg:flex-row overflow-hidden relative border border-gray-200 dark:border-blue-500/20 animate-[scaleIn_0.25s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 text-gray-700 dark:text-gray-200 hover:text-gray-950 dark:hover:text-white bg-white/90 dark:bg-white/5/90 hover:bg-white dark:hover:bg-gray-700 rounded-full p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90"
          aria-label="Close modal"
        >
          <HiX size={20} />
        </button>

        {/* Left Side: Screenshot Gallery */}
        <div className="lg:w-[55%] bg-gray-950 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/5 shrink-0">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            {project.featured && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                <HiStar size={11} />
                Featured
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
              {Array.isArray(project.category) ? project.category.join(" Â· ") : project.category}
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-6 min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
            {screenshots.length > 1 && (
              <button
                onClick={prevImg}
                className="absolute left-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-blue-600 text-white border border-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-md shadow-lg"
                aria-label="Previous"
              >
                <HiChevronLeft size={22} />
              </button>
            )}

            <img
              src={screenshots[currentIdx]}
              alt={`${project.title} screenshot ${currentIdx + 1}`}
              className="max-h-[36vh] sm:max-h-[44vh] lg:max-h-[52vh] w-auto max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
            />

            {screenshots.length > 1 && (
              <button
                onClick={nextImg}
                className="absolute right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-blue-600 text-white border border-white/20 transition-all duration-200 hover:scale-110 backdrop-blur-md shadow-lg"
                aria-label="Next"
              >
                <HiChevronRight size={22} />
              </button>
            )}

            {screenshots.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 text-white text-[11px] font-medium backdrop-blur-md border border-white/10">
                {currentIdx + 1} / {screenshots.length}
              </div>
            )}
          </div>

          {screenshots.length > 1 && (
            <div className="flex justify-center gap-2 p-3 bg-black/60 border-t border-white/10 overflow-x-auto">
              {screenshots.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-16 h-11 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                    idx === currentIdx
                      ? "border-blue-500 scale-105 shadow-md shadow-blue-500/40"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-blue-400/50"
                  }`}
                  aria-label={`Go to screenshot ${idx + 1}`}
                >
                  <img src={src} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Architectural Details */}
        <div className="lg:w-[45%] flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[90vh] p-6 sm:p-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 pr-8 leading-tight tracking-tight">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-6 bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-800/60 dark:to-gray-800/40 border border-indigo-100 dark:border-blue-500/20 rounded-2xl p-5">
                <h4 className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
                  <HiSparkles className="text-blue-500" size={14} /> Key Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300"
                    >
                      <HiCheckCircle
                        size={16}
                        className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-[0.15em] mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 text-[11px] font-semibold text-gray-700 dark:text-gray-300 rounded-md px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-5 border-t border-gray-200 dark:border-white/5 flex gap-2.5 mt-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-900 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all hover:scale-[1.02]"
              >
                <HiCode size={16} /> Source Code
              </a>
            )}
            {project.webapp && (
              <a
                href={project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02]"
              >
                <HiExternalLink size={16} /> Live Preview
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ----------------------------------------------------------------------
// Sub-Component: Compact, Minimal Flagship Spotlight Card
// ----------------------------------------------------------------------
const CompactSpotlightCard = ({ project, isEven, onOpenModal }) => {
  const hasLiveDemo = project.webapp && project.webapp !== project.github;

  return (
    <div className="group relative bg-white dark:bg-[#111b2e] backdrop-blur-md rounded-3xl border border-gray-200/80 dark:border-white/5 hover:border-blue-500/40 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden reveal-section">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-400/0 group-hover:from-blue-500/5 group-hover:to-blue-400/5 transition-all duration-500 pointer-events-none" />

      <div className={`flex flex-col lg:flex-row relative ${isEven ? "" : "lg:flex-row-reverse"}`}>
        {/* Compact Visual Preview */}
        <div className="lg:w-[44%] bg-gray-950 flex flex-col relative border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/5 shrink-0 overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-900/95 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-gray-400 tracking-wide">
              {Array.isArray(project.category) ? project.category[0] : project.category}
            </span>
            <div className="w-9" />
          </div>

          <div
            onClick={() => onOpenModal(project)}
            className="relative flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 cursor-pointer overflow-hidden group/img min-h-[220px] sm:min-h-[260px]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[230px] w-auto max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10 transition-all duration-700 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gray-950/70 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 text-xs font-semibold shadow-2xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                <HiEye size={14} className="text-blue-600" />
                View Details
              </span>
            </div>
          </div>
        </div>

        {/* Minimal Details Column */}
        <div className="lg:w-[56%] p-6 sm:p-8 flex flex-col justify-between relative">
          <div>
            {/* Header badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <HiStar size={11} /> Flagship
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">â€¢</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {Array.isArray(project.category) ? project.category.join(" Â· ") : project.category}
              </span>
            </div>

            {/* Title */}
            <h3
              onClick={() => onOpenModal(project)}
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              {project.title}
            </h3>

            {/* Concise Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 line-clamp-3">
              {project.description}
            </p>

            {/* Compact Highlight Badges */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-5 space-y-2">
                {project.highlights.slice(0, 2).map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1 w-4 h-4 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <FiCheck className="text-blue-600 dark:text-blue-400" size={9} />
                    </span>
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[10px] text-gray-400 self-center font-medium">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenModal(project)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1.5 group/btn"
            >
              <span>Architecture & Specs</span>
              <HiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-900 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                  title="Source Code"
                >
                  <FiGithub size={15} />
                </a>
              )}
              {hasLiveDemo && (
                <a
                  href={project.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Live Demo</span>
                  <FiArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Sub-Component: 3D Tilt Grid Card
// ----------------------------------------------------------------------
const GridCard = ({ project, onOpenModal }) => {
  const hasLiveDemo = project.webapp && project.webapp !== project.github;

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1500}
      scale={1.02}
      transitionSpeed={1500}
      glareEnable={false}
      className="h-full"
    >
      <div
        onClick={() => onOpenModal(project)}
        className="group relative h-full bg-white dark:bg-[#111b2e] backdrop-blur-md rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden cursor-pointer border border-gray-200/80 dark:border-white/5 hover:border-blue-500/50 transition-all duration-500 flex flex-col"
      >
        <div className="px-3.5 py-2 bg-gray-50 dark:bg-[#0b1121]/80 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
            {Array.isArray(project.category) ? project.category[0] : project.category}
          </span>
          <div className="w-8" />
        </div>

        <div className="relative overflow-hidden aspect-[16/10] bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
          {project.featured && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
              <HiStar size={10} /> Featured
            </div>
          )}

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gray-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4 backdrop-blur-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-gray-900 font-semibold text-xs shadow-xl hover:bg-gray-100 transition-transform hover:scale-105"
            >
              <HiEye size={14} className="text-blue-600" />
              <span>View Details</span>
            </button>
            <div className="flex gap-2 w-full max-w-[220px]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium border border-white/20 transition-transform hover:scale-105"
                >
                  <HiCode size={12} /> <span>Code</span>
                </a>
              )}
              {hasLiveDemo && (
                <a
                  href={project.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[11px] font-medium shadow-lg transition-transform hover:scale-105"
                >
                  <HiExternalLink size={12} /> <span>Live</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-white/5/80">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block text-[10px] font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded px-1.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

// ----------------------------------------------------------------------
// Sub-Component: High-End Academic Engineering Ledger Table
// ----------------------------------------------------------------------
const ProfessionalLedgerTable = ({ projectList, onOpenModal }) => (
  <div className="bg-white dark:bg-[#111b2e] backdrop-blur-md rounded-2xl border border-gray-200/80 dark:border-white/5 overflow-hidden shadow-md">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/80 dark:bg-[#0b1121]/80 border-b border-gray-200 dark:border-white/5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em]">
            <th className="py-3.5 px-5">System / Software</th>
            <th className="py-3.5 px-4">Domain</th>
            <th className="py-3.5 px-4">Tech Stack</th>
            <th className="py-3.5 px-4 text-right">Repository & Live</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 text-sm">
          {projectList.map((project) => {
            const hasLiveDemo = project.webapp && project.webapp !== project.github;
            return (
              <tr
                key={project.id}
                onClick={() => onOpenModal(project)}
                className="hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all cursor-pointer group"
              >
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    {project.featured && <HiStar size={13} className="text-amber-500 shrink-0" />}
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-md mt-1">
                    {project.description}
                  </p>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-xs">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium">
                    {Array.isArray(project.category) ? project.category[0] : project.category}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-600 dark:text-gray-300 transition-colors"
                        title="GitHub"
                      >
                        <FiGithub size={14} />
                      </a>
                    )}
                    {hasLiveDemo && (
                      <a
                        href={project.webapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
                        title="Live Link"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>Live</span>
                        <FiArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// ----------------------------------------------------------------------
// Main Work Section Component
// ----------------------------------------------------------------------
const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("spotlight");

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      if (cat === "All") return;
      counts[cat] = projects.filter((p) =>
        Array.isArray(p.category) ? p.category.includes(cat) : p.category === cat
      ).length;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (Array.isArray(project.category)
          ? project.category.includes(selectedCategory)
          : project.category === selectedCategory);

      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        project.title?.toLowerCase().includes(q) ||
        project.description?.toLowerCase().includes(q) ||
        project.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const featuredProjects = useMemo(() => filteredProjects.filter((p) => p.featured), [filteredProjects]);
  const archiveProjects = useMemo(() => filteredProjects.filter((p) => !p.featured), [filteredProjects]);

  const stats = useMemo(
    () => ({
      total: projects.length,
      featured: projects.filter((p) => p.featured).length,
      live: projects.filter((p) => p.webapp && p.webapp !== p.github).length,
    }),
    []
  );

  return (
    <section id="work" className="py-24 px-[5vw] md:px-[6vw] lg:px-[10vw] font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section Header */}
      <div className="text-center mb-14 relative z-10 reveal-section">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          <FiBookmark size={12} />
          Portfolio
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Software &{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            System Architectures
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto rounded-full mb-5"></div>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Production full-stack platforms, concurrent data systems, and machine learning research tools â€” engineered with rigor.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="px-5 py-2 rounded-full bg-white/90 dark:bg-[#111b2e]/90 border border-gray-200 dark:border-white/8 text-sm text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur-md">
            <span className="font-bold text-blue-600 dark:text-blue-400">{stats.total}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Systems</span>
          </div>
          <div className="px-5 py-2 rounded-full bg-white/90 dark:bg-[#111b2e]/90 border border-gray-200 dark:border-white/8 text-sm text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur-md">
            <span className="font-bold text-blue-500 dark:text-amber-400">{stats.featured}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Flagships</span>
          </div>
          <div className="px-5 py-2 rounded-full bg-white/90 dark:bg-[#111b2e]/90 border border-gray-200 dark:border-white/8 text-sm text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur-md">
            <span className="font-bold text-blue-600 dark:text-blue-400">{stats.live}</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Deployments</span>
          </div>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 reveal-section">
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          {CATEGORIES.map((category) => {
            const count = categoryCounts[category] || 0;
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/80 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/8 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? "bg-white/25 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <FiSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or title..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-white/90 dark:bg-[#111b2e]/90 border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white text-xs placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiX size={12} />
              </button>
            )}
          </div>

          <div className="flex items-center bg-gray-200/70 dark:bg-white/5/70 p-1 rounded-xl border border-gray-300/40 dark:border-white/8/40">
            {[
              { key: "spotlight", icon: FiLayers, label: "Spotlight" },
              { key: "grid", icon: FiGrid, label: "Grid" },
              { key: "table", icon: FiList, label: "Ledger" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setViewMode(key)}
                title={`${label} View`}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  viewMode === key
                    ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon size={13} />
                <span className="hidden md:inline text-[11px]">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Views */}
      <div className="max-w-5xl mx-auto relative z-10">
        {viewMode === "spotlight" && (
          <div className="space-y-7">
            {featuredProjects.map((project, idx) => (
              <CompactSpotlightCard
                key={project.id}
                project={project}
                isEven={idx % 2 === 0}
                onOpenModal={handleOpenModal}
              />
            ))}
            {archiveProjects.length > 0 && (
              <div className="mt-14 pt-10 border-t border-gray-200 dark:border-white/5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Additional Software & Systems
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Index of tools, academic repositories, and experimental projects.
                    </p>
                  </div>
                </div>
                <ProfessionalLedgerTable projectList={archiveProjects} onOpenModal={handleOpenModal} />
              </div>
            )}
          </div>
        )}

        {viewMode === "grid" && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <GridCard key={project.id} project={project} onOpenModal={handleOpenModal} />
            ))}
          </div>
        )}

        {viewMode === "table" && (
          <ProfessionalLedgerTable projectList={filteredProjects} onOpenModal={handleOpenModal} />
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-gray-50 dark:bg-[#111b2e]/40 rounded-2xl border border-gray-200 dark:border-white/5 max-w-sm mx-auto my-8">
            <HiSearch size={32} className="mx-auto text-gray-400 mb-3 opacity-60" />
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm mb-2">
              No matching projects found
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Reset Filters <HiArrowRight size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default Work;
