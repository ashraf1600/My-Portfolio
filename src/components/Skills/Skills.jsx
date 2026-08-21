import React from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";
import {
  SiLeetcode,
  SiCodeforces,
  SiHackerrank,
  SiGeeksforgeeks,
  SiCodechef,
} from "react-icons/si";
import {
  HiArrowUpRight,
  HiChartBar,
  HiCpuChip,
  HiCodeBracket,
  HiServerStack,
  HiPaintBrush,
  HiWrenchScrewdriver,
  HiTrophy,
} from "react-icons/hi2";
import { FiTarget } from "react-icons/fi";

const categoryMeta = {
  "Machine Learning & Data Analysis": {
    icon: HiChartBar,
    accent: "from-amber-500 to-orange-500",
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30",
    description: "Classical ML, data wrangling, and visualization.",
  },
  "Deep Learning & Generative AI": {
    icon: HiCpuChip,
    accent: "from-violet-500 to-fuchsia-500",
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/30",
    description: "Neural networks, transformers, and LLM frameworks.",
  },
  "Programming Languages": {
    icon: HiCodeBracket,
    accent: "from-sky-500 to-blue-500",
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/30",
    description: "Languages I use day-to-day for building software.",
  },
  "Backend & Databases": {
    icon: HiServerStack,
    accent: "from-emerald-500 to-teal-500",
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    description: "APIs, auth, and persistent storage layers.",
  },
  "Frontend Development": {
    icon: HiPaintBrush,
    accent: "from-rose-500 to-pink-500",
    tint: "bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30",
    description: "Modern, responsive, accessible user interfaces.",
  },
  "Developer Tools & Platform": {
    icon: HiWrenchScrewdriver,
    accent: "from-slate-500 to-gray-500",
    tint: "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/30",
    description: "Toolchain, deployment, and collaboration.",
  },
};

const problemSolvingPlatforms = [
  {
    name: "Codeforces",
    icon: SiCodeforces,
    color: "#4f46e5",
    bgClass:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/30",
    link: "https://codeforces.com/profile/ashraf1600",
    rank: "Specialist",
    rating: "1450",
    problems: "300+",
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    color: "#facc15",
    bgClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30",
    link: "https://leetcode.com/ashraf1600",
    rank: "Solver",
    rating: "—",
    problems: "250+",
  },
  {
    name: "HackerRank",
    icon: SiHackerrank,
    color: "#22c55e",
    bgClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    link: "https://www.hackerrank.com/ashraf1600",
    rank: "Gold Badge",
    rating: "—",
    problems: "120+",
  },
  {
    name: "GeeksforGeeks",
    icon: SiGeeksforgeeks,
    color: "#15803d",
    bgClass:
      "bg-green-500/10 text-green-600 dark:text-green-300 border-green-500/30",
    link: "https://auth.geeksforgeeks.org/user/ashraf1600",
    rank: "Contributor",
    rating: "—",
    problems: "100+",
  },
  {
    name: "CodeChef",
    icon: SiCodechef,
    color: "#a3714f",
    bgClass:
      "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/30",
    link: "https://www.codechef.com/users/ashraf1600",
    rank: "3★",
    rating: "—",
    problems: "90+",
  },
];

const totalSkills = SkillsInfo.reduce((sum, c) => sum + c.skills.length, 0);
const totalProblems = problemSolvingPlatforms.reduce(
  (sum, p) => sum + (parseInt(p.problems) || 0),
  0
);

const SkillCard = ({ category, meta }) => {
  const Icon = meta.icon;
  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1200}
      scale={1.02}
      transitionSpeed={900}
      glareEnable={false}
      className="h-full"
    >
      <div className="group relative h-full bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-500/50 overflow-hidden">
        {/* Top accent bar */}
        <div
          className={`h-1 w-full bg-gradient-to-r ${meta.accent}`}
          aria-hidden="true"
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-1">
            <div
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${meta.tint}`}
            >
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {category.title}
              </h4>
              <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2 py-0.5">
                {category.skills.length} tools
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-gray-400 mt-3 mb-5 leading-relaxed">
            {meta.description}
          </p>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-2">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                title={skill.name}
                className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-gray-700/60 bg-slate-50/80 dark:bg-gray-800/40 py-1.5 px-2 transition-all duration-200 hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:-translate-y-0.5 cursor-default"
              >
                {skill.logo ? (
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-5 h-5 shrink-0 object-contain"
                  />
                ) : (
                  <div className="w-5 h-5 shrink-0 rounded bg-indigo-500/20" />
                )}
                <span className="text-[12px] font-medium text-slate-700 dark:text-gray-300 truncate">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

const PlatformCard = ({ platform }) => {
  const Icon = platform.icon;
  return (
    <a
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white/90 dark:bg-gray-900/70 border border-slate-200 dark:border-gray-700/50 rounded-2xl p-5 hover:border-indigo-500/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden"
    >
      {/* Subtle hover accent */}
      <div
        className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
        style={{ backgroundColor: platform.color }}
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-4">
        <div
          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${platform.bgClass}`}
        >
          <Icon size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-slate-900 dark:text-white text-base font-bold truncate">
              {platform.name}
            </h4>
            <HiTrophy
              size={14}
              className="text-amber-500 shrink-0 opacity-70"
            />
          </div>
          <div className="flex items-center gap-2 text-[12px] text-slate-500 dark:text-gray-400">
            <span className="font-medium">{platform.rank}</span>
            {platform.rating !== "—" && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-600" />
                <span>{platform.rating}</span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-gray-600" />
            <span>{platform.problems} problems</span>
          </div>
        </div>

        <HiArrowUpRight
          size={18}
          className="shrink-0 text-slate-400 dark:text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        />
      </div>
    </a>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase mb-3">
          Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
          Skills & Tools
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-teal-500 mx-auto rounded-full mb-5"></div>
        <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          The full stack I work with — from data pipelines to production
          deployments — plus my competitive programming track record.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {totalSkills}+
            </span>{" "}
            Tools & Technologies
          </div>
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {SkillsInfo.length}
            </span>{" "}
            Categories
          </div>
          <div className="px-4 py-2 rounded-full bg-white dark:bg-gray-900/60 border border-slate-200 dark:border-gray-700/50 text-sm text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {totalProblems}+
            </span>{" "}
            Problems Solved
          </div>
        </div>
      </div>

      {/* TECHNICAL SKILLS */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-indigo-500 to-teal-500 rounded-full" />
          <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold">
            Technical Skills
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-gray-700/50 to-transparent ml-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {SkillsInfo.map((category) => (
          <SkillCard
            key={category.title}
            category={category}
            meta={
              categoryMeta[category.title] || {
                icon: FiTarget,
                accent: "from-indigo-500 to-teal-500",
                tint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/30",
                description: "",
              }
            }
          />
        ))}
      </div>

      {/* PROBLEM SOLVING */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
          <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold">
            Problem Solving
          </h3>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-gray-700/50 to-transparent ml-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {problemSolvingPlatforms.map((platform) => (
          <PlatformCard key={platform.name} platform={platform} />
        ))}
      </div>
    </section>
  );
};

export default Skills;