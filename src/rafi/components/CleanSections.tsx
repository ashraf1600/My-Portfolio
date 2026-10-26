import { useState } from "react";
import { selectedProjects, type ProjectGroup } from "../data/selectedProjects";
import { researchRecords } from "../data/research";
import { experienceOrganizations } from "../data/experience";
import { skillGroups } from "../data/skillAtlas";

/* Recruiter-friendly sections: everything visible at a glance, no carousels. */

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Folio({ index, label, right }: { index: string; label: string; right: string }) {
  return (
    <div className="cs__folio">
      <span><i aria-hidden="true"></i> {index} / {label}</span>
      <span className="cs__folio-rule" aria-hidden="true"></span>
      <span>{right}</span>
    </div>
  );
}

function Head({ id, eyebrow, title, em, intro }: { id: string; eyebrow: string; title: string; em: string; intro?: string }) {
  return (
    <header className="cs__head">
      <div>
        <p className="cs__eyebrow">{eyebrow}</p>
        <h2 id={id} className="cs__title">{title}<br /><em>{em}</em></h2>
      </div>
      {intro && <p className="cs__intro">{intro}</p>}
    </header>
  );
}

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="cs__chips">
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s/(-])([a-z])/g, (_, a, b) => a + b.toUpperCase())
    .replace(/\bAi\b/g, "AI").replace(/\bMl\b/g, "ML").replace(/\bRl\b/g, "RL").replace(/\bCuet\b/g, "CUET")
    .replace("Notecheck", "NoteCheck").replace("Clinisync", "CliniSync").replace("Resqnet", "ResQNet").replace("Exportmart", "ExportMart");

/* ------------------------------ EXPERIENCE ------------------------------ */

export function CleanExperience() {
  return (
    <section className="cs" id="experience" aria-labelledby="cs-exp-title">
      <div className="cs__wrap">
        <Folio index="03" label="EXPERIENCE" right="WHERE I'VE WORKED" />
        <Head id="cs-exp-title" eyebrow="INDUSTRY & RESEARCH" title="EXPERIENCE" em="so far." />
        <ol className="cs__jobs">
          {experienceOrganizations.map((org) => (
            <li key={org.id} className="cs__job">
              <div className="cs__job-meta">
                <span className="cs__job-dates">{org.dates}</span>
                <span>{org.arrangement}</span>
                <span>{org.location}</span>
              </div>
              <article className="cs__card cs__job-card">
                <p className="cs__job-org">{org.name}</p>
                <h3 className="cs__job-role">{org.role}</h3>
                <p className="cs__job-intro">{org.introduction}</p>
                <ul className="cs__job-points">
                  {org.projects.map((p) => (
                    <li key={p.name}>
                      <strong>{p.name}</strong>
                      <span>{p.note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- PROJECTS ------------------------------- */

const filters: { key: ProjectGroup | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "web", label: "Web platforms" },
  { key: "systems", label: "Backend systems" },
  { key: "client", label: "Client work" },
];
const groupLabel: Record<string, string> = {
  ai: "AI / ML", web: "Web platform", systems: "Backend system", client: "Client · live", experimental: "Experiment",
};

export function CleanProjects() {
  const [filter, setFilter] = useState<ProjectGroup | "all">("all");
  const list = filter === "all" ? selectedProjects : selectedProjects.filter((p) => p.group === filter);

  return (
    <section className="cs" id="selected-work" aria-labelledby="cs-work-title">
      <div className="cs__wrap">
        <Folio index="04" label="SELECTED PROJECTS" right={`${selectedProjects.length} PROJECTS`} />
        <Head
          id="cs-work-title"
          eyebrow="WHAT I'VE BUILT"
          title="THE WORK"
          em="up close."
          intro="Every cover is a screenshot of the real application. Each card links to the live app or the source code."
        />

        <div className="cs__filters" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const count = f.key === "all" ? selectedProjects.length : selectedProjects.filter((p) => p.group === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                className={filter === f.key ? "is-active" : ""}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <small>{count}</small>
              </button>
            );
          })}
        </div>

        <ul className="cs__projects">
          {list.map((p) => (
            <li key={p.slug} className="cs__card cs__project">
              <a className="cs__project-cover" href={p.liveUrl || p.repo} {...ext} tabIndex={-1} aria-hidden="true">
                <img src={`/assets/project-covers/${p.slug}.webp`} alt="" loading="lazy" decoding="async" />
              </a>
              <div className="cs__project-body">
                <p className="cs__project-kind">{groupLabel[p.group]}</p>
                <h3 className="cs__project-title">{titleCase(p.title)}</h3>
                <p className="cs__project-kicker">{p.kicker}</p>
                <p className="cs__project-summary">{p.summary}</p>
                <Chips items={p.stack.slice(0, 5)} />
                <div className="cs__project-links">
                  {p.liveUrl && <a className="cs__btn cs__btn--solid" href={p.liveUrl} {...ext}>Live demo <span aria-hidden="true">↗</span></a>}
                  <a className="cs__btn" href={p.repo} {...ext}>Source code <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- RESEARCH ------------------------------- */

const statusText: Record<string, string> = {
  accepted: "Accepted", submitted: "Under review", proposal: "Proposal", ongoing: "In progress",
};
const ME = /(Ashraful Islam|Ashraf-[Uu]l-Islam)/;

function Authors({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="cs__paper-authors">
      {text.split(" · ").map((name, i, arr) => (
        <span key={name}>
          {ME.test(name) ? <strong>Ashraful Islam</strong> : name}
          {i < arr.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

export function CleanResearch() {
  const accepted = researchRecords.filter((r) => r.statusKind === "accepted").length;
  return (
    <section className="cs" id="research" aria-labelledby="cs-research-title">
      <div className="cs__wrap">
        <Folio index="05" label="RESEARCH" right={`${researchRecords.length} PAPERS · ${accepted} ACCEPTED`} />
        <Head
          id="cs-research-title"
          eyebrow="PUBLICATIONS"
          title="RESEARCH"
          em="papers."
          intro={`${researchRecords.length} papers on Vision Transformers, retrieval-augmented generation, explainable ML and IoT security — ${accepted} accepted at IEEE and international conferences in 2026.`}
        />
        <ol className="cs__papers">
          {researchRecords.map((r) => (
            <li key={r.id} className="cs__paper">
              <span className="cs__paper-num">{r.index}</span>
              <div>
                <div className="cs__paper-meta">
                  <span className={`cs__status cs__status--${r.statusKind}`}>{statusText[r.statusKind]}</span>
                  <span className="cs__paper-venue">{r.venue}</span>
                </div>
                <h3 className="cs__paper-title">{r.title}</h3>
                <Authors text={r.authors} />
                <div className="cs__paper-foot">
                  <Chips items={r.tags.slice(0, 4)} />
                  {r.links.filter((l) => !l.url.includes("scholar.google")).map((l) => (
                    <a key={l.url} className="cs__link" href={l.url} {...ext}>{titleCase(l.label)} ↗</a>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- SKILLS -------------------------------- */

export function CleanSkills() {
  return (
    <section className="cs" id="skills" aria-labelledby="cs-skills-title">
      <div className="cs__wrap">
        <Folio index="06" label="SKILLS" right="TOOLS I WORK WITH" />
        <Head id="cs-skills-title" eyebrow="ENGINEERING & EXPERTISE" title="SKILLS" em="& tools." />
        <div className="cs__skills">
          {skillGroups.map((g) => (
            <div key={g.id} className="cs__card cs__skill">
              <h3>{g.title}</h3>
              <p>{g.subtitle}</p>
              <Chips items={g.skills} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
