import React from "react";
import { motion } from "framer-motion";
import { SkillsInfo } from "../../constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, type: "spring", bounce: 0.3 } 
  },
};
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
    colorClass: "text-orange-500",
    bgClass: "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20",
    description: "Classical ML, data wrangling, and visualization.",
  },
  "Deep Learning & Generative AI": {
    icon: HiCpuChip,
    colorClass: "text-fuchsia-500",
    bgClass: "bg-fuchsia-50 dark:bg-fuchsia-500/10 border-fuchsia-100 dark:border-fuchsia-500/20",
    description: "Neural networks, transformers, and LLM frameworks.",
  },
  "Programming Languages": {
    icon: HiCodeBracket,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
    description: "Languages I use day-to-day for building software.",
  },
  "Backend & Databases": {
    icon: HiServerStack,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
    description: "APIs, auth, and persistent storage layers.",
  },
  "Frontend Development": {
    icon: HiPaintBrush,
    colorClass: "text-indigo-500",
    bgClass: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20",
    description: "Modern, responsive, accessible user interfaces.",
  },
  "Developer Tools & Platform": {
    icon: HiWrenchScrewdriver,
    colorClass: "text-gray-500 dark:text-gray-400",
    bgClass: "bg-gray-100 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20",
    description: "Toolchain, deployment, and collaboration.",
  },
};

const problemSolvingPlatforms = [
  {
    name: "Codeforces",
    icon: SiCodeforces,
    bgClass: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    link: "https://codeforces.com/profile/ashraf1600",
    rank: "Specialist",
    rating: "1450",
    problems: "300+",
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    bgClass: "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400",
    link: "https://leetcode.com/ashraf1600",
    rank: "Solver",
    rating: "—",
    problems: "250+",
  },
  {
    name: "HackerRank",
    icon: SiHackerrank,
    bgClass: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    link: "https://www.hackerrank.com/ashraf1600",
    rank: "Gold Badge",
    rating: "—",
    problems: "120+",
  },
  {
    name: "GeeksforGeeks",
    icon: SiGeeksforgeeks,
    bgClass: "bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400",
    link: "https://auth.geeksforgeeks.org/user/ashraf1600",
    rank: "Contributor",
    rating: "—",
    problems: "100+",
  },
  {
    name: "CodeChef",
    icon: SiCodechef,
    bgClass: "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400",
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
    <motion.div variants={cardVariants} className="group h-full bg-white dark:bg-[#111b2e] rounded-xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col">
      {/* Header Area */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border ${meta.bgClass}`}>
          <Icon size={20} className={meta.colorClass} />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white font-serif leading-tight">
            {category.title}
          </h4>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
        {meta.description}
      </p>

      {/* Minimalist Skills grid */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            title={skill.name}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 py-1 px-3 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            {skill.logo && (
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-3.5 h-3.5 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            )}
            <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PlatformCard = ({ platform }) => {
  const Icon = platform.icon;
  return (
    <motion.a
      variants={cardVariants}
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between bg-white dark:bg-[#111b2e] border border-gray-200 dark:border-white/5 rounded-xl p-5 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div
          className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${platform.bgClass}`}
        >
          <Icon size={24} className={platform.bgClass.split(' ').find(c => c.startsWith('text-'))} />
        </div>

        <div>
          <h4 className="text-gray-900 dark:text-white text-base font-bold font-serif mb-0.5">
            {platform.name}
          </h4>
          <div className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-gray-400">
            <span className="font-semibold">{platform.rank}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="font-medium">{platform.problems} problems</span>
          </div>
        </div>
      </div>

      <HiArrowUpRight
        size={18}
        className="text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300"
      />
    </motion.a>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 px-[8vw] md:px-[6vw] lg:px-[12vw] font-sans relative"
    >
      {/* Section Title — Serif academic */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3">
          Technical Arsenal
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Skills & Platforms
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        
        {/* Simple Stats Row */}
        <div className="flex justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div><span className="font-bold text-gray-900 dark:text-white">{totalSkills}+</span> Tools</div>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div><span className="font-bold text-gray-900 dark:text-white">{SkillsInfo.length}</span> Domains</div>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div><span className="font-bold text-gray-900 dark:text-white">{totalProblems}+</span> Problems</div>
        </div>
      </div>

      {/* TECHNICAL SKILLS */}
      <div className="mb-6">
        <h3 className="text-gray-900 dark:text-white text-xl md:text-2xl font-bold font-serif mb-2">
          Core Competencies
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">The frameworks and languages I use to build systems.</p>
      </div>

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20"
      >
        {SkillsInfo.map((category) => (
          <SkillCard
            key={category.title}
            category={category}
            meta={
              categoryMeta[category.title] || {
                icon: FiTarget,
                colorClass: "text-blue-500",
                bgClass: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
                description: "Key skills and technologies.",
              }
            }
          />
        ))}
      </motion.div>

      {/* PROBLEM SOLVING */}
      <div className="mb-6">
        <h3 className="text-gray-900 dark:text-white text-xl md:text-2xl font-bold font-serif mb-2">
          Competitive Programming
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">My track record in algorithmic problem solving.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {problemSolvingPlatforms.map((platform) => (
          <PlatformCard key={platform.name} platform={platform} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;