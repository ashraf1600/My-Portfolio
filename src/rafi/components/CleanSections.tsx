import { useEffect, useRef, useState } from "react";
import flembeShop from "../../assets/work_logo/flembe/shop.webp";
import flembeProduct from "../../assets/work_logo/flembe/product_detail.webp";
import flembeContact from "../../assets/work_logo/flembe/contact.webp";
import clinisyncBooking from "../../assets/work_logo/clinisync_booking.webp";
import clinisyncTracker from "../../assets/work_logo/clinisync_tracker.webp";
import { selectedProjects, type ProjectGroup } from "../data/selectedProjects";
import { researchRecords } from "../data/research";
import { experienceOrganizations } from "../data/experience";
import { skillGroups } from "../data/skillAtlas";
import { achievements } from "../data/achievements";
import { contact } from "../data/contact";

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
        <h2 id={id} className="cs__title">{title} <em>{em}</em></h2>
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
        <Folio index="04" label="EXPERIENCE" right="WHERE I'VE WORKED" />
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

/* Flagship projects with several real screenshots each. */
const spotlight: { slug: string; images: string[] }[] = [
  { slug: "notecheck", images: ["/assets/achievements/notecheck-synesis.webp", "/assets/project-covers/notecheck.webp"] },
  {
    slug: "flembe-essence",
    images: ["/assets/project-covers/flembe-essence.webp", flembeShop, flembeProduct, flembeContact, "/assets/client-projects/flembe-essence-showcase.webp"],
  },
  { slug: "clinisync", images: ["/assets/project-covers/clinisync.webp", clinisyncBooking, clinisyncTracker] },
];
const SLIDE_MS = 3200;

function Spotlight() {
  const items = spotlight
    .map((s) => ({ ...s, project: selectedProjects.find((p) => p.slug === s.slug)! }))
    .filter((s) => s.project);
  const [pi, setPi] = useState(0);
  const [ii, setIi] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const t = window.setTimeout(() => {
      if (ii + 1 < items[pi].images.length) setIi(ii + 1);
      else { setPi((pi + 1) % items.length); setIi(0); }
    }, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [pi, ii, paused, items]);

  const go = (n: number) => { setPi((n + items.length) % items.length); setIi(0); };
  const cur = items[pi];
  const p = cur.project;

  return (
    <div
      className="cs-sp"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Flagship projects"
    >
      <div className="cs-sp__media">
        {items.map((it, k) => (
          <div key={it.slug} className={`cs-sp__set${k === pi ? " is-active" : ""}`} aria-hidden={k !== pi}>
            <div className="cs-sp__track" style={{ transform: `translateX(-${(k === pi ? ii : 0) * 100}%)` }}>
              {it.images.map((src) => (
                <div key={src} className="cs-sp__slide">
                  <img className="cs-sp__blur" src={src} alt="" loading="lazy" decoding="async" />
                  <img className="cs-sp__img" src={src} alt="" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="cs-sp__thumbs">
          {cur.images.map((src, k) => (
            <button key={src} type="button" className={k === ii ? "is-active" : ""} onClick={() => setIi(k)} aria-label={`Screenshot ${k + 1} of ${cur.images.length}`}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="cs-sp__body" aria-live="polite">
        <p className="cs-sp__count">
          <span>FLAGSHIP {String(pi + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
        </p>
        <p className="cs__project-kind">{groupLabel[p.group]}</p>
        <h3 className="cs-sp__title">{titleCase(p.title)}</h3>
        <p className="cs-sp__kicker">{p.kicker}</p>
        <p className="cs-sp__summary">{p.summary}</p>
        {p.highlights && (
          <ul className="cs-sp__points">
            {p.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
        <Chips items={p.stack.slice(0, 6)} />
        <div className="cs__project-links">
          {p.liveUrl && <a className="cs__btn cs__btn--solid" href={p.liveUrl} {...ext}>Live demo <span aria-hidden="true">↗</span></a>}
          <a className="cs__btn" href={p.repo} {...ext}>Source code <span aria-hidden="true">↗</span></a>
        </div>

        <div className="cs-sp__nav">
          <button type="button" onClick={() => go(pi - 1)} aria-label="Previous project">←</button>
          <div className="cs-sp__dots">
            {items.map((it, k) => (
              <button key={it.slug} type="button" className={k === pi ? "is-active" : ""} onClick={() => go(k)} aria-label={`Show ${titleCase(it.project.title)}`}>
                <i style={k === pi && !paused ? { animationDuration: `${SLIDE_MS * it.images.length}ms` } : undefined} key={`${k}-${pi}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(pi + 1)} aria-label="Next project">→</button>
        </div>
      </div>
    </div>
  );
}

export function CleanProjects() {
  const [filter, setFilter] = useState<ProjectGroup | "all">("all");
  const rest = selectedProjects.filter((p) => !spotlight.some((s) => s.slug === p.slug));
  const list = filter === "all" ? rest : rest.filter((p) => p.group === filter);

  return (
    <section className="cs cs--work" id="selected-work" aria-labelledby="cs-work-title">
      <div className="cs__wrap">
        <Folio index="05" label="PROJECTS" right={`${selectedProjects.length} PROJECTS`} />
        <Head
          id="cs-work-title"
          eyebrow="WHAT I'VE BUILT"
          title="THE WORK"
          em="up close."
          intro="Every image is a screenshot of the real application. Start with the three flagship builds, then browse the rest."
        />

        <Spotlight />

        <div className="cs-more__head">
          <h3>More projects</h3>
          <div className="cs__filters" role="group" aria-label="Filter projects">
            {filters.filter((f) => f.key === "all" || rest.some((p) => p.group === f.key)).map((f) => {
              const count = f.key === "all" ? rest.length : rest.filter((p) => p.group === f.key).length;
              return (
                <button key={f.key} type="button" className={filter === f.key ? "is-active" : ""} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                  {f.label} <small>{count}</small>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="cs__projects">
          {list.map((p, i) => (
            <li key={p.slug} className="cs__card cs__project">
              <a className="cs__project-cover" href={p.liveUrl || p.repo} {...ext} tabIndex={-1} aria-hidden="true">
                <img src={`/assets/project-covers/${p.slug}.webp`} alt="" loading="lazy" decoding="async" style={{ animationDelay: `${i * -2.3}s` }} />
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
        <Folio index="06" label="RESEARCH" right={`${researchRecords.length} PAPERS · ${accepted} ACCEPTED`} />
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

/* Floating style: the old "skills in motion" stream returns as slow, drifting
   rows of tool names behind glass cards that gently float. Everything stays
   readable; motion stops for people who prefer reduced motion. */
const allSkills = skillGroups.flatMap((g) => g.skills);
const rows = [
  allSkills.filter((_, i) => i % 3 === 0),
  allSkills.filter((_, i) => i % 3 === 1),
  allSkills.filter((_, i) => i % 3 === 2),
];
const coreStack = ["Python", "PyTorch", "LangGraph", "RAG", "FastAPI", "Docker", "PostgreSQL", "AWS", "React"];

export function CleanSkills() {
  return (
    <section className="cs cs--skills" id="skills" aria-labelledby="cs-skills-title">
      <div className="cs-sk__stream" aria-hidden="true">
        {rows.map((row, i) => (
          <div key={i} className={`cs-sk__row cs-sk__row--${i + 1}`}>
            <div className="cs-sk__track">
              {[0, 1].map((k) => (
                <span key={k}>{row.map((t) => <b key={t}>{t}<i>✳</i></b>)}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cs__wrap">
        <Folio index="03" label="SKILLS & TOOLS" right={`${allSkills.length} TOOLS · ${skillGroups.length} DISCIPLINES`} />
        <Head
          id="cs-skills-title"
          eyebrow="WHAT I WORK WITH"
          title="SKILLS"
          em="& tools."
          intro="The stack I use to take models from research notebooks to production: deep learning and computer vision, RAG and agents, and the backend and MLOps tooling around them."
        />

        <ul className="cs-sk__core" aria-label="Core stack">
          {coreStack.map((t, i) => (
            <li key={t} style={{ animationDelay: `${(i % 5) * -1.1}s` }}>{t}</li>
          ))}
        </ul>

        <div className="cs__skills">
          {skillGroups.map((g, i) => (
            <div key={g.id} className="cs__card cs__skill" style={{ animationDelay: `${i * -1.3}s` }}>
              <p className="cs__skill-index">{String(i + 1).padStart(2, "0")} / {g.short}</p>
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

/* ------------------------------- EDUCATION ------------------------------ */

const schools = [
  {
    period: "2023 — Now",
    level: "University · Current",
    school: "Chittagong University of Engineering & Technology (CUET)",
    detail: "B.Sc. in Computer Science & Engineering · Final-year undergraduate researcher with 7 publications",
  },
  {
    period: "2019 — 2021",
    level: "Higher Secondary",
    school: "Dhaka City College",
    detail: "Higher Secondary Certificate (HSC), Science · GPA 5.00",
  },
  {
    period: "2017 — 2019",
    level: "Secondary",
    school: "Cox's Bazar Government High School",
    detail: "Secondary School Certificate (SSC), Science",
  },
];

export function CleanEducation() {
  return (
    <section className="cs" id="education" aria-labelledby="cs-edu-title">
      <div className="cs__wrap">
        <Folio index="08" label="EDUCATION" right="THE PATH SO FAR" />
        <Head id="cs-edu-title" eyebrow="ACADEMIC BACKGROUND" title="EDUCATION" em="the path." />
        <ol className="cs__edu">
          {schools.map((e, i) => (
            <li key={e.school} className={`cs__card cs__edu-item${i === 0 ? " is-current" : ""}`}>
              <span className="cs__edu-period">{e.period}</span>
              <div>
                <p className="cs__edu-level">{e.level}</p>
                <h3>{e.school}</h3>
                <p className="cs__edu-detail">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------- AT A GLANCE ------------------------------ */

export function GlanceStrip() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };
  return (
    <section className="cs-gl" aria-label="At a glance">
      <div className="cs__wrap cs-gl__inner">
        <p className="cs-gl__status"><i aria-hidden="true"></i> Open to AI / ML Engineer &amp; MLOps roles</p>
        <dl className="cs-gl__facts">
          <div><dt>Now</dt><dd>ML &amp; DataOps Intern, Poridhi.io</dd></div>
          <div><dt>Study</dt><dd>B.Sc. CSE, CUET · final year</dd></div>
          <div><dt>Based in</dt><dd>Chittagong / Dhaka, Bangladesh</dd></div>
        </dl>
        <div className="cs-gl__actions">
          <button type="button" className="cs__btn" onClick={copy}>{copied ? "Email copied ✓" : contact.email}</button>
          <a className="cs__btn cs__btn--solid" href="/Ashraful_Islam_AI_Engineer_CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ HIGHLIGHTS ------------------------------ */

const clientWork = [
  { name: "Flembe Essence", note: "E-commerce store for a fashion & jewellery brand · React 19, Django REST", url: "https://flembe-essence-frontend.onrender.com/", image: "/assets/client-projects/flembe-essence-showcase.webp" },
  { name: "Cox's Bazar Student Forum", note: "Community platform for CUET students & alumni · Django", url: "https://cox-s-bazar-student-forum-cuet.onrender.com", image: "/assets/project-covers/coxs-bazar-forum.webp" },
];

export function CleanHighlights() {
  return (
    <section className="cs" id="achievements" aria-labelledby="cs-hl-title">
      <div className="cs__wrap">
        <Folio index="07" label="HONOURS & CLIENT WORK" right="HIGHLIGHTS" />
        <Head id="cs-hl-title" eyebrow="BEYOND THE BUILD" title="HIGHLIGHTS" em="& recognition." />
        <ul className="cs-hl">
          {achievements.map((a) => (
            <li key={a.id} className="cs__card cs-hl__item">
              <div className="cs-hl__img"><img src={a.photo} alt={a.photoAlt} loading="lazy" decoding="async" /></div>
              <div className="cs-hl__body">
                <p className="cs__project-kind">{a.level} · {a.date}</p>
                <h3>{a.award}</h3>
                <p>{a.spotlight}</p>
                {a.externalUrl && (
                  <a className="cs__link" href={a.externalUrl} {...(a.externalUrl.startsWith("http") ? ext : {})}>
                    {a.externalUrl.startsWith("#") ? "See research ↓" : "View ↗"}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <h3 className="cs-hl__sub">Client work · live in production</h3>
        <ul className="cs-cl">
          {clientWork.map((c) => (
            <li key={c.name} className="cs__card cs-cl__item">
              <img src={c.image} alt="" loading="lazy" decoding="async" />
              <div>
                <h4>{c.name}</h4>
                <p>{c.note}</p>
              </div>
              <a className="cs__btn cs__btn--solid" href={c.url} {...ext}>Visit site <span aria-hidden="true">↗</span></a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
