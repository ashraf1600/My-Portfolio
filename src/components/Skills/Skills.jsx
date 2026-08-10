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
import { HiArrowUpRight } from "react-icons/hi2";

const problemSolvingPlatforms = [
  {
    name: "Codeforces",
    icon: <SiCodeforces size={22} />,
    color: "#8245ec",
    link: "https://codeforces.com/profile/ashraf1600",
    stats: "Specialist (1450) · 300+ problems",
  },
  {
    name: "LeetCode",
    icon: <SiLeetcode size={22} />,
    color: "#facc15",
    link: "https://leetcode.com/ashraf1600",
    stats: "250+ problems",
  },
  {
    name: "HackerRank",
    icon: <SiHackerrank size={22} />,
    color: "#22c55e",
    link: "https://www.hackerrank.com/ashraf1600",
    stats: "Gold badge · 120+ problems",
  },
  {
    name: "GeeksforGeeks",
    icon: <SiGeeksforgeeks size={22} />,
    color: "#15803d",
    link: "https://auth.geeksforgeeks.org/user/ashraf1600",
    stats: "100+ problems",
  },
  {
    name: "CodeChef",
    icon: <SiCodechef size={22} />,
    color: "#a3714f",
    link: "https://www.codechef.com/users/ashraf1600",
    stats: "3★ · 90+ problems",
  },
];

const Skills = () => (
  <section
    id="skills"
    className="py-24 px-[10vw] md:px-[7vw] lg:px-[15vw] font-sans"
  >
    {/* Section Title */}
    <div className="text-center mb-14">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
        Skills
      </h2>
      <div className="w-16 h-[3px] bg-[#8245ec] mx-auto mt-3 rounded-full"></div>
      <p className="text-slate-600 dark:text-gray-400 mt-4 text-base sm:text-lg max-w-xl mx-auto">
        Tools and technologies I build with, alongside my competitive
        programming track record.
      </p>
    </div>

    {/* TECHNICAL SKILLS */}
    <div className="flex items-baseline justify-between mb-6">
      <h3 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-semibold">
        Technical Skills
      </h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
      {SkillsInfo.map((category) => (
        <Tilt
          key={category.title}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1200}
          scale={1.02}
          transitionSpeed={800}
          glareEnable={false}
        >
          <div className="h-full bg-white/80 dark:bg-gray-900/70 backdrop-blur-md px-6 py-6 rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-500/40">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-gray-200">
                {category.title}
              </h4>
              <span className="text-[11px] font-medium text-purple-700 dark:text-purple-300/90 bg-purple-500/10 border border-purple-500/30 dark:border-purple-500/20 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                {category.skills.length} tools
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-gray-700/60 bg-slate-50 dark:bg-gray-800/40 py-2 px-2.5 transition-all duration-200 hover:border-purple-500/60 hover:bg-purple-500/10"
                >
                  {skill.logo ? (
                    <img
                      src={skill.logo}
                      alt=""
                      className="w-5 h-5 shrink-0 object-contain"
                    />
                  ) : (
                    <div className="w-5 h-5 shrink-0 rounded-md bg-purple-500/20" />
                  )}
                  <span className="text-[13px] sm:text-sm text-slate-700 dark:text-gray-300 truncate">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Tilt>
      ))}
    </div>

    {/* PROBLEM SOLVING SKILLS */}
    <div className="flex items-baseline justify-between mb-6">
      <h3 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-semibold">
        Problem Solving
      </h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {problemSolvingPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white/80 dark:bg-gray-900/70 border border-slate-200 dark:border-gray-700/50 rounded-2xl p-5 flex items-center gap-4 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
        >
          <div
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${platform.color}1A`,
              color: platform.color,
            }}
          >
            {platform.icon}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-slate-900 dark:text-white text-base font-semibold truncate">
              {platform.name}
            </h4>
            <p className="text-slate-600 dark:text-gray-400 text-sm truncate">{platform.stats}</p>
          </div>

          <HiArrowUpRight
            size={18}
            className="shrink-0 text-slate-400 dark:text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          />
        </a>
      ))}
    </div>
  </section>
);

export default Skills;