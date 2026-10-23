import React, { useState } from "react";
import { motion } from "framer-motion";
import { experiences, education } from "../../constants";

const ACCENTS = [
  "bg-nb-lime text-nb-ink",
  "bg-nb-pink text-nb-ink",
  "bg-nb-hot text-white",
  "bg-nb-ink text-nb-paper",
];

// Work experience first, then education, as one milestone line.
const items = [
  ...experiences.map((e) => ({
    title: e.role,
    institution: e.company,
    period: e.date,
    description: e.desc,
    kind: e.badge || "Experience",
    logo: e.img,
  })),
  ...education.map((e) => ({
    title: e.degree,
    institution: e.school,
    period: e.date,
    description: e.grade ? `${e.grade}. ${e.desc}` : e.desc,
    kind: e.type || "Education",
    logo: e.img,
  })),
];

const Description = ({ text }) => {
  const [open, setOpen] = useState(false);
  const long = text.length > 260;
  return (
    <div className="mt-4">
      <p className={`text-sm font-medium leading-relaxed text-nb-muted md:text-[15px] ${long && !open ? "line-clamp-4" : ""}`}>{text}</p>
      {long && (
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 text-sm font-bold underline decoration-2 underline-offset-4 hover:text-nb-violet">
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const Timeline = () => (
  <section id="experience" className="overflow-hidden bg-nb-paper px-4 py-20 md:py-32">
    <div className="mx-auto max-w-6xl">
      <div className="mb-20 flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Experience &amp; Education<span className="text-nb-hot">.</span>
        </h2>
        <span className="border-2 border-nb-ink bg-nb-card px-3 py-1 font-jb text-sm font-semibold uppercase tracking-wider text-nb-muted shadow-brutal-sm">
          Milestones timeline
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-[32px] top-0 w-1.5 -translate-x-1/2 rounded bg-nb-ink md:left-1/2" />

        {items.map((it, index) => {
          const left = index % 2 === 0;
          const accent = ACCENTS[index % ACCENTS.length];
          return (
            <motion.div
              key={it.title + index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`relative mb-10 flex w-full items-center justify-between md:mb-0 ${index > 0 ? "md:-mt-24" : ""} ${left ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className={`absolute left-[32px] z-10 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-nb-ink shadow-brutal-sm md:left-1/2 ${accent.split(" ")[0]}`} />

              <div className={`w-full pl-[72px] md:w-[45%] md:pl-0 ${left ? "md:pr-12" : "md:pl-12"}`}>
                <article className="rounded-xl border-2 border-nb-ink bg-nb-card p-6 shadow-brutal transition-transform hover:-translate-y-2 hover:shadow-brutal-lg md:p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-jb text-[10px] font-bold uppercase tracking-widest text-nb-muted">{it.kind}</p>
                    <span className={`inline-block rounded-md border-2 border-nb-ink px-3 py-1.5 font-jb text-xs font-bold shadow-brutal-sm ${accent}`}>
                      {it.period}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    {it.logo && (
                      <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-nb-ink bg-white p-1">
                        <img src={it.logo} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                      </span>
                    )}
                    <div>
                      <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">{it.title}</h3>
                      <p className="mt-2 font-jb text-xs font-bold uppercase tracking-wide text-nb-ink/70 sm:text-sm">{it.institution}</p>
                    </div>
                  </div>
                  <Description text={it.description} />
                </article>
              </div>
              <div className="hidden w-[45%] md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Timeline;
