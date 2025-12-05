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

const extraTechnicalSkills = [
  {
    title: "Data Science / ML / AI",
    skills: [
      { name: "Pandas", logo: "/assets/logos/pandas.png" },
      { name: "NumPy", logo: "/assets/logos/numpy.png" },
      { name: "Scikit-Learn", logo: "/assets/logos/sklearn.png" },
      { name: "Matplotlib", logo: "/assets/logos/matplotlib.png" },
      { name: "TensorFlow", logo: "/assets/logos/tensorflow.png" },
      { name: "PyTorch", logo: "/assets/logos/pytorch.png" },
    ],
  },
];

const problemSolvingPlatforms = [
  {
    name: "Codeforces",
    icon: <SiCodeforces size={24} className="text-[#8245ec]" />,
    link: "https://codeforces.com/profile/your_username",
    stats: "Specialist (1450) | 300+ problems",
  },
  {
    name: "LeetCode",
    icon: <SiLeetcode size={24} className="text-yellow-400" />,
    link: "https://leetcode.com/your_username",
    stats: "250+ problems",
  },
  {
    name: "HackerRank",
    icon: <SiHackerrank size={24} className="text-green-500" />,
    link: "https://www.hackerrank.com/your_username",
    stats: "Gold badge | 120+ problems",
  },
  {
    name: "GeeksforGeeks",
    icon: <SiGeeksforgeeks size={24} className="text-green-700" />,
    link: "https://auth.geeksforgeeks.org/user/your_username",
    stats: "100+ problems",
  },
  {
    name: "CodeChef",
    icon: <SiCodechef size={24} className="text-[#6e4c1e]" />,
    link: "https://www.codechef.com/users/your_username",
    stats: "3★ | 90+ problems",
  },
];

const Skills = () => (
  <section
    id="skills"
    className="py-24 px-[10vw] md:px-[7vw] lg:px-[15vw] font-sans bg-skills-gradient clip-path-custom"
  >
    {/* Section Title */}
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">SKILLS</h2>
      <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
      <p className="text-gray-400 mt-4 text-lg font-semibold">
        A collection of my technical skills and problem-solving expertise
      </p>
    </div>

    {/* TECHNICAL SKILLS */}
    <div className="text-white mb-6 text-xl sm:text-2xl font-semibold">
      Technical Skills
    </div>
    <div className="flex flex-wrap gap-6 justify-between mb-16">
      {[...SkillsInfo, ...extraTechnicalSkills].map((category) => (
        <div
          key={category.title}
          className="bg-gray-900/80 backdrop-blur-md px-6 py-8 w-full sm:w-[48%] rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4 text-center">
            {category.title}
          </h3>
          <Tilt
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-start space-x-3 border-2 border-gray-700/70 rounded-xl py-2.5 px-3 transition-all duration-300 hover:border-purple-500/70 hover:bg-purple-500/10 hover:scale-105"
                >
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <span className="text-sm sm:text-base text-gray-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </Tilt>
        </div>
      ))}
    </div>

    {/* PROBLEM SOLVING SKILLS */}
    <div className="text-white mb-6 text-xl sm:text-2xl font-semibold">
      Problem Solving Skills
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {problemSolvingPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 flex items-center space-x-4 hover:scale-105 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
        >
          {platform.icon}
          <div>
            <h4 className="text-white text-lg font-semibold">{platform.name}</h4>
            <p className="text-gray-400 text-sm">{platform.stats}</p>
          </div>
        </a>
      ))}
    </div>
  </section>
);

export default Skills;
