import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { research } from "../../constants";
import SectionTitle from "./SectionTitle";

const statusClass = (s = "") => {
  if (/accepted/i.test(s)) return "bg-nb-lime";
  if (/copyright|published/i.test(s)) return "bg-nb-ink text-nb-paper";
  if (/submitted/i.test(s)) return "bg-nb-pink";
  return "bg-nb-card";
};
const realLink = (l) => l && l !== "#" && !l.includes("example.com");

const Research = () => (
  <section id="research" className="border-t-2 border-nb-ink bg-nb-card px-4 py-20 md:py-28">
    <div className="mx-auto max-w-6xl">
      <SectionTitle title="Research" tag={`${research.length} papers`}>
        <p className="mt-3 max-w-xl text-lg text-nb-muted">
          Explainable ML, computer vision and retrieval-augmented generation.
        </p>
      </SectionTitle>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {research.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 2) * 0.08, type: "spring", bounce: 0.3, duration: 0.8 }}
            className="flex flex-col rounded-xl border-2 border-nb-ink bg-nb-paper p-6 shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`rounded-full border-2 border-nb-ink px-3 py-0.5 font-jb text-[11px] font-bold uppercase shadow-[2px_2px_0_0_rgb(var(--nb-shadow))] ${statusClass(p.status)}`}>
                {p.status}
              </span>
              <span className="font-jb text-xs font-bold text-nb-muted">{p.year}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug">{p.title}</h3>
            <p className="mt-2 font-jb text-[11px] font-semibold uppercase tracking-wide text-nb-ink/70">{p.conference}</p>
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-nb-muted">{p.abstract}</p>
            <p className="mt-3 text-xs text-nb-muted">{p.authors}</p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
              <ul className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => (
                  <li key={t} className="rounded border-2 border-nb-ink bg-nb-card px-2 py-0.5 font-jb text-[10.5px] font-semibold">
                    {t}
                  </li>
                ))}
              </ul>
              {realLink(p.link) && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-bold hover:text-nb-hot">
                  Paper <FiArrowUpRight />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Research;
