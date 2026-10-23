import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowUpRight, FiCheck, FiChevronLeft, FiChevronRight, FiBriefcase, FiZap } from "react-icons/fi";
import { projects } from "../../constants";
import { projectMetrics } from "../content";
import SectionTitle from "./SectionTitle";

const cats = (p) => (Array.isArray(p.category) ? p.category : [p.category]);
const isClient = (p) => cats(p).includes("Client Project");
const hasLive = (p) => Boolean(p.webapp) && p.webapp !== p.github && !p.webapp.includes("github.com");
const sourceUrl = (p) => p.github || (p.webapp?.includes("github.com") ? p.webapp : "");
const shots = (p) => Array.from(new Set(p.screenshots?.length ? p.screenshots : [p.image]));
const host = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};
const kind = (p) => {
  if (isClient(p)) return "Client project";
  if (cats(p).includes("Machine Learning")) return "AI / ML";
  return "Full stack";
};

/* ------------------------------------------------------------------ */
/* Auto-advancing screenshot slider (pauses on hover / focus)          */
/* ------------------------------------------------------------------ */
const useSlides = (count, interval = 3800) => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (count < 2 || paused || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % count), interval);
    return () => clearInterval(t);
  }, [count, paused, reduce, interval]);
  return {
    i,
    go: (n) => setI(((n % count) + count) % count),
    hoverProps: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
    },
  };
};

const Slides = ({ images, alt, i }) => {
  // Preload every screenshot so a slide never appears blank.
  useEffect(() => {
    images.slice(1).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
  return (
  <div className="relative aspect-[16/10] overflow-hidden bg-white">
    <AnimatePresence initial={false} mode="popLayout">
      <motion.img
        key={images[i]}
        src={images[i]}
        alt={`${alt} screenshot ${i + 1} of ${images.length}`}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </AnimatePresence>
  </div>
  );
};

const Dots = ({ count, i, go }) =>
  count > 1 ? (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Screenshots">
      {Array.from({ length: count }).map((_, n) => (
        <button
          key={n}
          role="tab"
          aria-selected={n === i}
          aria-label={`Show screenshot ${n + 1}`}
          onClick={() => go(n)}
          className={`h-2.5 rounded-full border-2 border-nb-night transition-all ${n === i ? "w-7 bg-nb-night" : "w-2.5 bg-white"}`}
        />
      ))}
    </div>
  ) : null;

const Browser = ({ project, slides }) => {
  const images = shots(project);
  const url = hasLive(project) ? host(project.webapp) : "github.com/ashraf1600";
  return (
    <div className="overflow-hidden rounded-xl border-[2.5px] border-nb-night bg-white shadow-[6px_6px_0_0_#111]">
      <div className="flex h-7 items-center gap-1.5 border-b-[2.5px] border-nb-night bg-nb-cream px-3">
        <span className="h-2.5 w-2.5 rounded-full border border-nb-night bg-nb-hot" />
        <span className="h-2.5 w-2.5 rounded-full border border-nb-night bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full border border-nb-night bg-nb-lime" />
        <span className="ml-2 truncate font-jb text-[10px] font-semibold text-neutral-500">{url}</span>
      </div>
      <Slides images={images} alt={project.title} i={slides.i} />
    </div>
  );
};

const PANELS = ["bg-nb-violet", "bg-nb-pink", "bg-nb-sky", "bg-nb-lime"];

/* ------------------------------------------------------------------ */
/* Large case-study card                                               */
/* ------------------------------------------------------------------ */
const CaseStudy = ({ project, index }) => {
  const images = shots(project);
  const slides = useSlides(images.length);
  const metrics = projectMetrics[project.id];
  const flip = index % 2 === 1;
  const highlights = (project.highlights || []).slice(0, 3);
  const src = sourceUrl(project);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.9 }}
      className="group grid overflow-hidden rounded-[22px] border-[3px] border-nb-ink bg-nb-card shadow-brutal-lg lg:grid-cols-2"
    >
      <div
        {...slides.hoverProps}
        className={`relative flex min-h-[300px] flex-col items-center justify-center gap-5 overflow-hidden border-b-[3px] border-nb-ink p-7 sm:p-10 lg:border-b-0 ${PANELS[index % PANELS.length]} ${
          flip ? "lg:order-2 lg:border-l-[3px]" : "lg:border-r-[3px]"
        }`}
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative w-full max-w-[540px] transition-transform duration-500 group-hover:-translate-y-1">
          <Browser project={project} slides={slides} />
        </div>
        {images.length > 1 && (
          <div className="relative flex items-center gap-3">
            <button onClick={() => slides.go(slides.i - 1)} aria-label="Previous screenshot" className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-nb-night bg-white text-nb-night hover:bg-nb-cream">
              <FiChevronLeft />
            </button>
            <Dots count={images.length} i={slides.i} go={slides.go} />
            <button onClick={() => slides.go(slides.i + 1)} aria-label="Next screenshot" className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-nb-night bg-white text-nb-night hover:bg-nb-cream">
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border-2 border-nb-ink px-3 py-0.5 text-xs font-bold ${isClient(project) ? "bg-nb-pink" : "bg-nb-lime"}`}>{kind(project)}</span>
          {hasLive(project) && (
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-nb-ink bg-nb-card px-3 py-0.5 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-nb-ink" /> Live
            </span>
          )}
        </div>

        <h3 className="mt-4 text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-[2.1rem]">{project.title}</h3>
        <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-nb-muted">{project.description}</p>

        {metrics && (
          <dl className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border-2 border-nb-ink">
            {metrics.map((m, i) => (
              <div key={m.label} className={`px-3 py-3 ${i > 0 ? "border-l-2 border-nb-ink" : ""} ${i === 0 ? "bg-nb-lime" : "bg-nb-card"}`}>
                <dt className="text-[11px] font-bold opacity-60">{m.label}</dt>
                <dd className="text-lg font-bold leading-tight sm:text-xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {highlights.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[14.5px] leading-snug">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-nb-ink bg-nb-lime text-nb-night">
                  <FiCheck size={12} strokeWidth={3.5} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 7).map((t) => (
            <li key={t} className="rounded-md border-2 border-nb-ink/80 bg-nb-paper px-2 py-0.5 font-jb text-[11px] font-semibold">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          {hasLive(project) && (
            <a href={project.webapp} target="_blank" rel="noopener noreferrer" className="press-effect inline-flex items-center gap-2 rounded-xl border-[2.5px] border-nb-ink bg-nb-ink px-5 py-3 text-sm font-bold text-nb-paper shadow-brutal-sm">
              <FiExternalLink /> Live demo
            </a>
          )}
          {src && (
            <a href={src} target="_blank" rel="noopener noreferrer" className="press-effect inline-flex items-center gap-2 rounded-xl border-[2.5px] border-nb-ink bg-nb-card px-5 py-3 text-sm font-bold shadow-brutal-sm">
              <FiGithub /> Source code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ------------------------------------------------------------------ */
/* Compact card                                                        */
/* ------------------------------------------------------------------ */
const MiniCard = ({ project, i }) => {
  const images = shots(project);
  const slides = useSlides(images.length, 3200);
  const src = sourceUrl(project);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col overflow-hidden rounded-2xl border-[2.5px] border-nb-ink bg-nb-card shadow-brutal transition-shadow hover:shadow-brutal-lg"
    >
      <div {...slides.hoverProps} className={`relative border-b-[2.5px] border-nb-ink p-5 ${PANELS[(i + 3) % PANELS.length]}`}>
        <div className="overflow-hidden rounded-lg border-2 border-nb-night bg-white shadow-[4px_4px_0_0_#111] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
          <Slides images={images} alt={project.title} i={slides.i} />
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <Dots count={images.length} i={slides.i} go={slides.go} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold text-nb-muted">{kind(project)}</span>
        <h3 className="mt-1 text-lg font-bold leading-snug">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-nb-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <li key={t} className="rounded-md border-2 border-nb-ink/80 bg-nb-paper px-2 py-0.5 font-jb text-[10.5px] font-semibold">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-5 pt-5 text-sm font-bold">
          {hasLive(project) && (
            <a href={project.webapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-2 underline-offset-4 hover:text-nb-violet">
              Live site <FiArrowUpRight />
            </a>
          )}
          {src && (
            <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-2 underline-offset-4 hover:text-nb-violet">
              <FiGithub /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const GroupHeading = ({ icon: Icon, title, text, count, accent }) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div className="flex items-start gap-4">
      <span className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[2.5px] border-nb-ink shadow-brutal-sm ${accent}`}>
        <Icon size={22} />
      </span>
      <div>
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
          <span className="text-nb-hot">.</span>
        </h3>
        <p className="mt-1 max-w-xl text-nb-muted">{text}</p>
      </div>
    </div>
    <span className="rounded-full border-2 border-nb-ink bg-nb-card px-3 py-1 text-sm font-bold">{count} projects</span>
  </div>
);

const FILTERS = [
  { key: "All", test: () => true },
  { key: "AI / ML", test: (p) => cats(p).includes("Machine Learning") },
  { key: "Full stack", test: (p) => cats(p).includes("Web Development") },
];

const IDEA_FEATURED = 2;

const Projects = () => {
  const client = projects.filter(isClient);
  const ideas = projects.filter((p) => !isClient(p));
  const featuredIdeas = ideas.slice(0, IDEA_FEATURED);
  const restIdeas = ideas.slice(IDEA_FEATURED);

  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f.key, restIdeas.filter(f.test).length])), [restIdeas]);
  const list = restIdeas.filter((FILTERS.find((f) => f.key === filter) || FILTERS[0]).test);
  const visible = showAll ? list : list.slice(0, 6);

  return (
    <section id="projects" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Projects" tag={`${projects.length} shipped`}>
          <p className="mt-3 max-w-xl text-lg text-nb-muted">
            Work I&apos;ve delivered for clients, and ideas of my own I turned into working software.
          </p>
        </SectionTitle>

        {client.length > 0 && (
          <div className="mt-14">
            <GroupHeading
              icon={FiBriefcase}
              accent="bg-nb-pink"
              title="Client work"
              text="Built for real clients and communities, and running in production."
              count={client.length}
            />
            <div className="mt-10 flex flex-col gap-12 md:gap-16">
              {client.map((p, i) => (
                <CaseStudy key={p.id} project={p} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-24">
          <GroupHeading
            icon={FiZap}
            accent="bg-nb-lime"
            title="Ideas I built"
            text="Problems I wanted to solve, from research prototypes to full-stack products."
            count={ideas.length}
          />
          <div className="mt-10 flex flex-col gap-12 md:gap-16">
            {featuredIdeas.map((p, i) => (
              <CaseStudy key={p.id} project={p} index={i} />
            ))}
          </div>

          {restIdeas.length > 0 && (
            <>
              <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
                <h4 className="text-xl font-bold">More from the workbench</h4>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
                  {FILTERS.filter((f) => counts[f.key] > 0).map((f) => (
                    <button
                      key={f.key}
                      onClick={() => {
                        setFilter(f.key);
                        setShowAll(false);
                      }}
                      aria-pressed={filter === f.key}
                      className={`rounded-full border-[2.5px] border-nb-ink px-4 py-1.5 text-sm font-bold transition-all ${
                        filter === f.key ? "bg-nb-ink text-nb-paper shadow-[3px_3px_0_0_#7c4dff]" : "bg-nb-card hover:-translate-y-0.5 hover:shadow-brutal-sm"
                      }`}
                    >
                      {f.key} <span className={filter === f.key ? "text-nb-lime" : "text-nb-muted"}>{counts[f.key]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.div layout className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((p, i) => (
                    <MiniCard key={p.id} project={p} i={i} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {list.length > 6 && (
                <button
                  onClick={() => setShowAll((s) => !s)}
                  className="press-effect mt-10 inline-flex items-center gap-2 rounded-xl border-[2.5px] border-nb-ink bg-nb-card px-5 py-3 text-sm font-bold shadow-brutal-sm"
                >
                  {showAll ? "Show fewer" : `Show all ${list.length}`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
