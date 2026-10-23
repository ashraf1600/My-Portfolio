import React from "react";
import { SkillsInfo } from "../../constants";
import SectionTitle from "./SectionTitle";

const ACCENTS = [
  "bg-nb-lime",
  "bg-nb-hot text-white",
  "bg-nb-ink text-nb-paper",
  "bg-nb-pink",
  "bg-nb-card",
  "bg-nb-lime",
];

const Skills = () => (
  <section id="skills" className="bg-dots border-y-2 border-nb-ink px-4 py-20 md:py-28">
    <div className="mx-auto max-w-6xl">
      <SectionTitle title="Skills & Tools" tag={`${SkillsInfo.reduce((n, g) => n + g.skills.length, 0)} tools`} />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SkillsInfo.map((group, i) => (
          <div
            key={group.title}
            className={`glass rounded-xl border-2 border-nb-ink p-6 shadow-brutal transition-transform hover:-translate-y-1 ${
              i % 3 === 1 ? "lg:translate-y-6 lg:hover:translate-y-5" : ""
            }`}
          >
            <span className={`inline-block rounded-md border-2 border-nb-ink px-3 py-1 text-sm font-bold ${ACCENTS[i % ACCENTS.length]}`}>
              {group.title}
            </span>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <li key={s.name} className="flex items-center gap-1.5 rounded-md border-2 border-nb-ink bg-nb-card px-2.5 py-1 font-jb text-xs font-semibold">
                  <img src={s.logo} alt="" className="h-4 w-4 rounded-sm bg-white object-contain p-px" loading="lazy" />
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
