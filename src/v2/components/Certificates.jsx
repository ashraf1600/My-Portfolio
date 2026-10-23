import React, { useState } from "react";
import { certifications } from "../../constants";

const PILL = ["bg-nb-lime", "bg-nb-pink"];

const Certificates = () => {
  const [expanded, setExpanded] = useState(false);
  const main = certifications.slice(0, 2);
  const rest = certifications.slice(2);
  const issuers = Array.from(new Set(certifications.map((c) => c.organization || c.issuer))).join(" · ");

  return (
    <section id="certificates" className="w-full border-y-[6px] border-nb-ink bg-nb-lime py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12">
          <h2 className="mb-4 text-5xl font-bold tracking-tighter md:text-6xl">
            Certifications<span className="text-nb-pink [-webkit-text-stroke:1.5px_rgb(var(--nb-shadow))]">.</span>
          </h2>
          <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <span className="font-jb text-[10px] font-bold uppercase tracking-widest text-nb-ink/80 md:text-xs">{issuers}</span>
            <span className="font-jb text-[10px] font-bold uppercase tracking-widest text-nb-ink/80 md:text-xs">{certifications.length} credentials</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {main.map((c, i) => (
            <div key={c.id} className="flex flex-col justify-between rounded-xl border-[3px] border-nb-ink bg-nb-card p-6 shadow-[6px_6px_0_rgb(var(--nb-shadow))] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_rgb(var(--nb-shadow))] md:p-8">
              <div>
                <span className={`mb-5 inline-block rounded-full border-2 border-nb-ink px-3 py-1 text-[11px] font-bold shadow-[2px_2px_0_rgb(var(--nb-shadow))] ${PILL[i % 2]}`}>
                  {c.organization || c.issuer} • {c.date}
                </span>
                <h3 className="mb-4 text-xl font-bold leading-tight md:text-[22px]">{c.title}</h3>
                <p className="text-[13px] font-medium leading-relaxed text-nb-muted md:text-[14px]">{c.description}</p>
              </div>
              {c.credentialUrl && (
                <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#888] transition-colors hover:text-nb-ink">
                  View certificate ↗
                </a>
              )}
            </div>
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <div className="mt-8">
              <button
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-2 rounded-sm bg-nb-ink px-5 py-3 text-[13px] font-bold text-nb-paper transition-transform hover:-translate-y-0.5"
              >
                {expanded ? "Hide certificates ⌃" : `View all ${certifications.length} certificates ⌄`}
              </button>
            </div>
            {expanded && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {rest.map((c) => (
                  <a
                    key={c.id}
                    href={c.credentialUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-2 border-nb-ink bg-nb-card p-4 shadow-[2px_2px_0_rgb(var(--nb-shadow))] transition-transform hover:-translate-y-0.5"
                  >
                    <p className="line-clamp-2 text-xs font-bold">{c.title}</p>
                    <span className="mt-2 block text-[10px] font-bold text-[#888]">
                      {(c.organization || c.issuer).toUpperCase()} · VIEW ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Certificates;
