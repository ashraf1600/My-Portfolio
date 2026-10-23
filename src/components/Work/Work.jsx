import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiArrowUpRight, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects, research } from "../../constants";

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------
const cats = (p) => (Array.isArray(p.category) ? p.category : [p.category]);
const shots = (p) => Array.from(new Set(p.screenshots?.length ? p.screenshots : [p.image]));
const hasLive = (p) => Boolean(p.webapp) && p.webapp !== p.github && !p.webapp.includes("github.com");
const host = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "localhost";
  }
};
const pad = (n) => String(n).padStart(2, "0");

const FILTERS = [
  { key: "All", test: () => true },
  { key: "AI & ML", test: (p) => cats(p).includes("Machine Learning") },
  { key: "Full Stack", test: (p) => cats(p).includes("Web Development") },
  { key: "Client Work", test: (p) => cats(p).includes("Client Project") },
];

const primaryCategory = (p) => {
  const c = cats(p);
  if (c.includes("Machine Learning")) return "Machine Learning";
  if (c.includes("Client Project")) return "Client Project";
  return c[0] || "Project";
};

// ----------------------------------------------------------------------
// Browser-frame mockup used in grid cards
// ----------------------------------------------------------------------
const BrowserFrame = ({ project, className = "" }) => (
  <div className={`bg-[#0b0c10] rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/40 ${className}`}>
    <div className="h-6 flex items-center gap-1.5 px-3 bg-[#1b1c22]">
      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
      <span className="ml-3 flex-1 max-w-[60%] h-3.5 rounded-sm bg-white/5 font-mono text-[9px] leading-[14px] text-white/40 px-2 truncate">
        {hasLive(project) ? host(project.webapp) : "github.com/ashraf1600"}
      </span>
    </div>
    <div className="aspect-[16/10] overflow-hidden bg-white">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// Laptop mockup used in the featured spotlight
// ----------------------------------------------------------------------
const LaptopMockup = ({ project }) => (
  <div className="[perspective:1600px] w-full">
    <div className="transition-transform duration-700 ease-out [transform:rotateX(10deg)_rotateY(-20deg)_rotateZ(3deg)] hover:[transform:rotateX(4deg)_rotateY(-8deg)_rotateZ(1deg)] [transform-style:preserve-3d]">
      <div className="mx-auto w-[88%] rounded-t-[14px] bg-[#0a0a0d] p-[2.2%] pb-[3%] ring-1 ring-white/10 shadow-[0_50px_80px_-30px_rgba(148,64,232,0.45)]">
        <div className="aspect-[16/10] overflow-hidden rounded-[3px] bg-white">
          <img src={project.image} alt={`${project.title} on a laptop`} className="w-full h-full object-cover object-top" />
        </div>
      </div>
      <div className="relative mx-auto w-full h-[14px] sm:h-[18px] rounded-b-[18px] bg-gradient-to-b from-[#c9ccd4] to-[#7d818c]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[16%] h-[45%] rounded-b-md bg-[#9a9ea8]" />
      </div>
      <div className="mx-auto mt-3 w-[80%] h-6 rounded-[50%] bg-black/60 blur-xl" />
    </div>
  </div>
);

// Hand-drawn curved arrow pointing at the mockup
const SketchArrow = ({ className = "" }) => (
  <svg viewBox="0 0 200 170" fill="none" className={className} aria-hidden="true">
    <path
      d="M14 162 C 8 118, 22 70, 70 44 C 104 26, 140 22, 172 26"
      stroke="#9440e8"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M22 160 C 20 120, 34 80, 78 56 C 110 40, 142 36, 168 38"
      stroke="#b07af0"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path d="M150 6 L 190 30 L 150 52" stroke="#9440e8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ----------------------------------------------------------------------
// Modal
// ----------------------------------------------------------------------
const ProjectModal = ({ project, onClose }) => {
  const images = shots(project);
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, next, prev]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md overflow-y-auto flex items-start lg:items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative w-full max-w-6xl bg-noir-card border border-noir-line flex flex-col lg:flex-row my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center bg-white text-black hover:bg-brand-cyan transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Gallery */}
        <div className="lg:w-[58%] bg-[#e7eaf0] relative flex flex-col">
          <div className="relative flex-1 flex items-center justify-center p-5 sm:p-10 min-h-[240px]">
            <img
              src={images[idx]}
              alt={`${project.title} screenshot ${idx + 1}`}
              className="max-h-[48vh] w-auto max-w-full object-contain shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button onClick={prev} aria-label="Previous screenshot" className="absolute left-3 w-10 h-10 flex items-center justify-center bg-black/80 text-white hover:bg-brand-violet">
                  <FiChevronLeft size={20} />
                </button>
                <button onClick={next} aria-label="Next screenshot" className="absolute right-3 w-10 h-10 flex items-center justify-center bg-black/80 text-white hover:bg-brand-violet">
                  <FiChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-black/90 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIdx(i)}
                  aria-label={`Screenshot ${i + 1}`}
                  className={`w-20 h-12 shrink-0 overflow-hidden border-2 ${i === idx ? "border-brand-cyan" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:w-[42%] p-6 sm:p-9 flex flex-col">
          <p className="font-mono text-xs text-brand-cyan mb-3">
            {"// "}
            {cats(project).join(" / ").toLowerCase()}
          </p>
          <h3 className="font-poppins font-bold text-white text-2xl sm:text-3xl leading-tight tracking-[-0.02em] pr-10">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-noir-soft">{project.description}</p>

          {project.highlights?.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-white/85">
                  <span className="font-mono text-brand-magenta shrink-0">&gt;</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="font-mono text-[11px] px-2 py-1 border border-noir-line text-noir-soft">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t hairline flex flex-wrap gap-3">
            {hasLive(project) && (
              <a
                href={project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand-violet hover:bg-[#a35cf0] text-white font-mono text-sm font-bold transition-colors"
              >
                Live Site <FiArrowUpRight />
              </a>
            )}
            {(project.github || project.webapp) && (
              <a
                href={project.github || project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/30 hover:border-brand-cyan hover:text-brand-cyan text-white font-mono text-sm transition-colors"
              >
                <FiGithub /> Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

// ----------------------------------------------------------------------
// Grid card
// ----------------------------------------------------------------------
const ProjectCard = ({ project, big, onOpen }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className={`group relative flex flex-col overflow-hidden ${big ? "lg:col-span-2 lg:row-span-2" : ""}`}
  >
    <button
      onClick={() => onOpen(project)}
      className="relative flex-1 min-h-[220px] flex items-center justify-center bg-gradient-to-br from-[#eef1f6] via-[#dfe4ec] to-[#c9d0dc] p-6 sm:p-9 overflow-hidden text-left"
      aria-label={`Open ${project.title}`}
    >
      <div className={`w-full ${big ? "max-w-[720px]" : "max-w-[420px]"} transition-transform duration-700 ease-out group-hover:-translate-y-2`}>
        <BrowserFrame project={project} />
      </div>
      {project.featured && (
        <span className="absolute top-4 left-4 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-black text-brand-cyan">
          featured
        </span>
      )}
    </button>

    <div className={`bg-[rgba(136,136,136,0.05)] rounded-b-[5px] px-5 sm:px-8 ${big ? "py-7" : "py-5"}`}>
      <button onClick={() => onOpen(project)} className="text-left w-full">
        <h3
          className={`font-grotesk font-bold text-white tracking-[-0.01em] leading-snug line-clamp-2 ${
            big ? "text-2xl sm:text-[1.75rem]" : "text-[1.15rem]"
          }`}
        >
          {project.title}
        </h3>
      </button>
      <p className="mt-1 font-poppins font-medium text-noir-soft text-sm">{primaryCategory(project)}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, big ? 6 : 3).map((t) => (
          <span key={t} className="font-mono text-[10.5px] px-2 py-0.5 bg-white/5 border border-noir-line text-white/70">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-5 font-mono text-xs">
        {hasLive(project) && (
          <a
            href={project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-cyan hover:text-white transition-colors"
          >
            live <FiArrowUpRight />
          </a>
        )}
        {(project.github || project.webapp) && (
          <a
            href={project.github || project.webapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-noir-soft hover:text-brand-cyan transition-colors"
          >
            <FiGithub /> code
          </a>
        )}
        <button onClick={() => onOpen(project)} className="ml-auto text-noir-muted hover:text-white transition-colors">
          details →
        </button>
      </div>
    </div>
  </motion.article>
);

// ----------------------------------------------------------------------
// Section
// ----------------------------------------------------------------------
const Work = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const spotlight = projects[0];

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.key, projects.filter(f.test).length])),
    []
  );

  const list = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter) || FILTERS[0];
    return projects.filter(f.test);
  }, [filter]);

  const liveCount = projects.filter(hasLive).length;
  const mlCount = counts["AI & ML"];

  return (
    <section id="work" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10">
      <div className="max-w-[1350px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-poppins font-semibold text-white tracking-[-0.03em] text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9]"
        >
          Work
        </motion.h2>

        {/* Intro + spotlight */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-10 items-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 font-mono font-medium text-white text-lg sm:text-[1.35rem] leading-[1.55]"
          >
            Shipped {projects.length} projects across computer vision, machine learning and production web, {liveCount} of them
            live. {mlCount} are AI/ML systems, from a Vision Transformer banknote authenticator to an RL traffic-signal agent.
            Alongside the code: {research.length} research papers in IEEE &amp; international venues.
          </motion.p>

          {spotlight && (
            <div className="lg:col-span-7 relative grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-end gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative order-2 sm:order-1 pb-2"
              >
                <SketchArrow className="hidden sm:block w-[150px] lg:w-[170px] -mb-2 ml-4" />
                <p className="font-poppins font-medium text-white text-xl sm:text-2xl">Featured Project</p>
                <p className="mt-2 font-mono font-bold text-white text-2xl sm:text-[2rem] leading-tight">
                  {spotlight.title.split(" — ")[0]}
                </p>
                <p className="mt-1 font-mono text-sm text-noir-soft">{spotlight.title.split(" — ")[1]}</p>
                <button
                  onClick={() => setOpen(spotlight)}
                  className="mt-5 inline-block px-7 py-3.5 bg-brand-violet hover:bg-[#a35cf0] text-white font-mono font-medium text-[15px] transition-colors"
                >
                  View Project
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="order-1 sm:order-2"
              >
                <button onClick={() => setOpen(spotlight)} className="block w-full" aria-label={`Open ${spotlight.title}`}>
                  <LaptopMockup project={spotlight} />
                </button>
              </motion.div>
            </div>
          )}
        </div>

        {/* Filter bar */}
        <div className="mt-20 sm:mt-24 flex flex-wrap items-baseline gap-x-2 gap-y-3 font-poppins font-medium text-[15px] sm:text-lg">
          <span className="text-white/75 mr-3">Filter by</span>
          {FILTERS.map((f, i) => (
            <React.Fragment key={f.key}>
              <button
                onClick={() => setFilter(f.key)}
                className={`transition-colors ${filter === f.key ? "text-brand-cyan" : "text-noir-soft hover:text-white"}`}
                aria-pressed={filter === f.key}
              >
                {f.key}
                <sup className="ml-0.5 font-mono text-[10px] sm:text-[11px] text-white">{pad(counts[f.key])}</sup>
              </button>
              {i < FILTERS.length - 1 && <span className="text-white/60 mx-2">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(250px,auto)] [grid-auto-flow:dense] gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectCard key={p.id} project={p} big={i % 5 === 0} onOpen={setOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open && <ProjectModal key={open.id} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
};

export default Work;
