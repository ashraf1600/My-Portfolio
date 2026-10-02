import React, { useState } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import {
  FaLinkedin,
  FaFacebook,
  FaKaggle,
  FaGithub,
  FaDownload,
  FaEnvelope,
  FaArrowRight,
  FaPaperPlane,
  FaTerminal,
} from 'react-icons/fa';
import HeroTerminal from './HeroTerminal';
import {
  SiCodeforces,
  SiPytorch,
  SiFastapi,
  SiDocker,
  SiPostgresql,
} from 'react-icons/si';
import { HiSparkles, HiAcademicCap, HiCodeBracket, HiBriefcase } from 'react-icons/hi2';
import profileImage from '../../assets/dp.png';
import heroBg from '../../assets/hero-bg.jpg';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const focusAreas = [
  { num: '01', label: 'GenAI & LLMs', color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-600 dark:text-blue-300' },
  { num: '02', label: 'ML & DataOps', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600 dark:text-amber-300' },
  { num: '03', label: 'Agentic AI', color: 'from-purple-500/20 to-fuchsia-500/20 border-purple-500/30 text-purple-600 dark:text-purple-300' },
  { num: '04', label: 'Full-Stack & Cloud', color: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-600 dark:text-cyan-300' },
];

const quickStats = [
  { label: 'Research Papers', value: '7+', sub: 'IEEE & International', icon: HiAcademicCap, color: 'text-purple-500' },
  { label: 'Production Projects', value: '12+', sub: 'Client & Academic', icon: HiCodeBracket, color: 'text-blue-500' },
  { label: 'Codeforces Rating', value: '1450', sub: 'Specialist Rank', icon: SiCodeforces, color: 'text-amber-500' },
  { label: 'Current Role', value: 'ML Intern', sub: 'Poridhi.io DataOps', icon: HiBriefcase, color: 'text-emerald-500' },
];

const About = () => {
  const [heroMode, setHeroMode] = useState('portrait');

  return (
    <section
      id="about"
      className="relative pt-12 pb-24 px-[5vw] md:px-[8vw] lg:px-[10vw] font-sans overflow-hidden"
    >
      {/* Background glow & subtle overlay */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-20 dark:opacity-40"
      />

      {/* Dark/light gradient masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/80 via-[#f8fafc]/95 to-[#f8fafc] dark:from-[#080d1a]/80 dark:via-[#080d1a]/95 dark:to-[#080d1a] pointer-events-none" />

      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-16 relative z-10">
        {/* Left Side - Content */}
        <motion.div 
          className="lg:w-7/12 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Availability Status Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for AI / ML Roles & Collaborations</span>
            </div>
          </motion.div>

          {/* Name Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight font-outfit">
            <span className="text-slate-800 dark:text-slate-200">Hi, I'm </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 drop-shadow-sm">
              Ashraful Islam
            </span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 min-h-[2.5rem] flex items-center justify-center lg:justify-start gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-normal">I build</span>
            <ReactTypingEffect
              text={[
                'Autonomous AI Agents 🤖',
                'Production ML & DataOps Pipelines ⚡',
                'Explainable AI Research (IEEE) 📄',
                'Scalable Full-Stack Systems 🚀',
              ]}
              speed={70}
              eraseSpeed={35}
              typingDelay={400}
              eraseDelay={2200}
              cursorRenderer={(cursor) => (
                <span className="text-blue-500 font-normal">{cursor}</span>
              )}
              className="inline-block text-blue-600 dark:text-cyan-400"
            />
          </motion.div>

          {/* Focus Area Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
            {focusAreas.map((area) => (
              <span
                key={area.num}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gradient-to-r ${area.color} border backdrop-blur-md shadow-sm transition-transform hover:-translate-y-0.5`}
              >
                <span className="opacity-75 font-mono text-[10px]">{area.num}</span>
                <span>{area.label}</span>
              </span>
            ))}
          </motion.div>

          {/* Bio Description */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            CSE undergrad at <strong className="text-slate-900 dark:text-white font-semibold">CUET</strong> and{' '}
            <strong className="text-blue-600 dark:text-blue-400 font-semibold">ML & DataOps Intern</strong> at Poridhi.io.
            I bridge the gap between academic AI research and high-performance engineering—from published works in RAG and Vision Transformers to containerized microservices and client-facing web applications.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-8">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 group text-sm"
            >
              <span>Explore Projects</span>
              <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-sm shadow-sm"
            >
              <FaEnvelope size={14} className="text-blue-500" />
              <span>Get in Touch</span>
            </a>
            <a
              href="/Ashraf_CV_1.1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-300/60 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold px-5 py-3.5 rounded-full transition-all duration-300 text-sm hover:scale-105"
            >
              <FaDownload size={13} className="text-slate-500" />
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Social Icons Bar */}
          <motion.div variants={itemVariants} className="flex gap-2.5 justify-center lg:justify-start items-center">
            <span className="text-xs text-slate-400 dark:text-slate-500 mr-1 font-medium">Connect:</span>
            {[
              { icon: FaGithub, href: "https://github.com/ashraf1600", label: "GitHub", hover: "hover:bg-[#24292e] hover:text-white" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/ashraful-islam-a31268226/", label: "LinkedIn", hover: "hover:bg-[#0077b5] hover:text-white" },
              { icon: SiCodeforces, href: "https://codeforces.com/profile/ashraf1600", label: "Codeforces", hover: "hover:bg-[#1f8ac6] hover:text-white" },
              { icon: FaKaggle, href: "https://www.kaggle.com/ashraf1600", label: "Kaggle", hover: "hover:bg-[#20beff] hover:text-white" },
              { icon: FaFacebook, href: "https://www.facebook.com/share/19gm9nUyqU/", label: "Facebook", hover: "hover:bg-[#1877f2] hover:text-white" },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.label}
                className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md ${soc.hover}`}
              >
                <soc.icon size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Futuristic Interactive Showcase (Portrait / Live AI Console) */}
        <motion.div 
          className="lg:w-5/12 flex flex-col items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
        >
          {/* View Mode Toggle Pill */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 mb-4 shadow-md">
            <button
              onClick={() => setHeroMode('portrait')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                heroMode === 'portrait'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>👤 Portrait</span>
            </button>
            <button
              onClick={() => setHeroMode('terminal')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 relative ${
                heroMode === 'terminal'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FaTerminal size={11} className={heroMode === 'terminal' ? 'text-cyan-200' : 'text-cyan-500'} />
              <span>Live AI Node</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </button>
          </div>

          {heroMode === 'terminal' ? (
            <HeroTerminal />
          ) : (
            <div className="relative group">
              {/* Ambient Radial Neon Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-cyan-400/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-105" />

              {/* Cyber Ring Container */}
              <div className="relative p-[3px] rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 shadow-2xl shadow-blue-500/20">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 w-[270px] h-[330px] sm:w-[320px] sm:h-[390px]">
                  <img
                    src={profileImage}
                    alt="Ashraful Islam"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle gradient vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Overlay Info Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold leading-tight">Ashraful Islam</p>
                      <p className="text-[10px] text-cyan-300 font-mono">CUET CSE • Poridhi ML</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Orbiting Tech Satellite Pills */}
              <div className="absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 animate-floatSlow">
                <SiPytorch size={15} className="text-orange-500" />
                <span>PyTorch / DL</span>
              </div>

              <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 animate-floatSlow" style={{ animationDelay: '1.5s' }}>
                <SiFastapi size={15} className="text-teal-400" />
                <span>FastAPI & MLOps</span>
              </div>

              <div className="absolute -bottom-3 -right-4 z-20 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 animate-floatSlow" style={{ animationDelay: '2.5s' }}>
                <SiDocker size={15} className="text-blue-400" />
                <span>Docker & CI/CD</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Metrics Bar directly under Hero */}
      <motion.div 
        className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {quickStats.map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex items-center gap-3.5 group"
          >
            <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-outfit text-slate-900 dark:text-white leading-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
