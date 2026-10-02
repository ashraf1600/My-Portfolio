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
    <motion.div
      variants={cardVariants}
      className="group h-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 flex flex-col shadow-sm hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
    >
      {/* Subtle card top glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Area */}
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm ${meta.bgClass} group-hover:scale-105 transition-transform`}>
          <Icon size={22} className={meta.colorClass} />
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-outfit leading-tight">
            {category.title}
          </h4>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            {category.skills.length} Technologies
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
        {meta.description}
      </p>

      {/* Tech badges matrix */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            title={skill.name}
            className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 py-1.5 px-3 transition-all duration-200 hover:scale-105 hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 shadow-sm"
          >
            {skill.logo && (
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-4 h-4 object-contain filter-none drop-shadow-sm"
              />
            )}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
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
  const isSpecialist = platform.rank === "Specialist";

  return (
    <motion.a
      variants={cardVariants}
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isSpecialist
          ? "border-cyan-500/30 hover:border-cyan-400 shadow-cyan-500/5"
          : "border-slate-200/80 dark:border-white/10 hover:border-blue-400/40"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${platform.bgClass} group-hover:scale-110 transition-transform`}
        >
          <Icon size={24} className={platform.bgClass.split(' ').find(c => c.startsWith('text-'))} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-slate-900 dark:text-white text-base font-bold font-outfit">
              {platform.name}
            </h4>
            {isSpecialist && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                1450 Max
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span className="font-semibold text-blue-600 dark:text-blue-400">{platform.rank}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="font-medium">{platform.problems} solved</span>
          </div>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all">
        <HiArrowUpRight size={16} />
      </div>
    </motion.a>
  );
};

const Skills = () => {
  const [filter, setFilter] = React.useState("All");

  const filterTabs = ["All", "AI & GenAI", "Data & ML", "Backend & Cloud", "Languages & Tools"];

  const filteredCategories = React.useMemo(() => {
    if (filter === "All") return SkillsInfo;
    if (filter === "AI & GenAI") {
      return SkillsInfo.filter(c => c.title.includes("Deep Learning") || c.title.includes("Generative"));
    }
    if (filter === "Data & ML") {
      return SkillsInfo.filter(c => c.title.includes("Machine Learning") || c.title.includes("Data"));
    }
    if (filter === "Backend & Cloud") {
      return SkillsInfo.filter(c => c.title.includes("Backend") || c.title.includes("Frontend"));
    }
    if (filter === "Languages & Tools") {
      return SkillsInfo.filter(c => c.title.includes("Languages") || c.title.includes("Tools"));
    }
    return SkillsInfo;
  }, [filter]);

  return (
    <section
      id="skills"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans relative"
    >
      {/* Section Title */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase mb-2">
          Technical Arsenal
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 font-outfit">
          Skills & Platforms
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mb-6"></div>
        
        {/* Modern Stats Banner */}
        <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-6 py-2.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 shadow-sm">
          <div><strong className="text-blue-600 dark:text-cyan-400 font-bold">{totalSkills}+</strong> Technologies</div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div><strong className="text-blue-600 dark:text-cyan-400 font-bold">{SkillsInfo.length}</strong> Disciplines</div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div><strong className="text-blue-600 dark:text-cyan-400 font-bold">{totalProblems}+</strong> Problems Solved</div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                filter === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TECHNICAL SKILLS BENTO */}
      <motion.div 
        layout
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-16"
      >
        {filteredCategories.map((category) => (
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

      {/* PROBLEM SOLVING SECTION */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-t border-slate-200/80 dark:border-white/10 pt-12">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Algorithmic Mastery</span>
          <h3 className="text-slate-900 dark:text-white text-2xl font-extrabold font-outfit mt-1">
            Competitive Programming
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Over 500+ problems solved across top competitive coding platforms.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {problemSolvingPlatforms.map((platform) => (
          <PlatformCard key={platform.name} platform={platform} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;