import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import {
  FaLinkedin,
  FaFacebook,
  FaKaggle,
  FaGithub,
  FaDownload,
  FaEnvelope,
} from 'react-icons/fa';
import {
  SiCodeforces,
} from 'react-icons/si';
import profileImage from '../../assets/dp.png';
import heroBg from '../../assets/hero-bg.jpg';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
  { num: '01', label: 'ML Research' },
  { num: '02', label: 'Full-Stack Dev' },
  { num: '03', label: 'AI Engineering' },
  { num: '04', label: 'Django & React' },
];

const About = () => {
  // Subtle floating particles
  const particleCount = 20;
  const particles = React.useMemo(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    })), []
  );

  return (
    <section
      id="about"
      className="relative pt-10 pb-32 px-[5vw] md:px-[8vw] lg:px-[12vw] font-sans overflow-hidden"
    >
      {/* Full-bleed background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-30 dark:opacity-70"
      />

      {/* Dark mode overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1121]/20 via-[#0b1121]/40 to-[#0b1121] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0b1121] to-transparent pointer-events-none hidden dark:block" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b1121] to-transparent pointer-events-none hidden dark:block" />

      {/* Light mode overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa]/40 via-[#f8f9fa]/70 to-[#f8f9fa] pointer-events-none dark:hidden" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f8f9fa] to-transparent pointer-events-none dark:hidden" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f8f9fa] to-transparent pointer-events-none dark:hidden" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-blue-400/60 dark:bg-blue-400/40"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `heroFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-20 relative z-10 dark:[text-shadow:_0_2px_20px_rgba(0,0,0,0.8),_0_0_40px_rgba(0,0,0,0.5)]">
        {/* Left Side - Content */}
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Greeting badge */}
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-block bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-medium px-4 py-2 rounded-full">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name — serif academic style */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-5 leading-tight tracking-tight">
            <span className="text-gray-700 dark:text-gray-300">Hi, I'm</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Ashraful Islam<span className="text-blue-600 dark:text-blue-400">.</span>
            </span>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 min-h-[2.5rem]">
            <span className="text-gray-500 dark:text-gray-400">I'm a </span>
            <ReactTypingEffect
              text={[
                'CSE Student',
                'ML Researcher',
                'AI Engineer Aspirant',
                'Django Developer',
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-amber-500">{cursor}</span>
              )}
              className="inline-block text-amber-500 dark:text-amber-400"
            />
          </motion.div>

          {/* Focus Area Chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
            {focusAreas.map((area) => (
              <span
                key={area.num}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold">{area.num}</span>
                {area.label}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I'm a passionate <span className="text-blue-700 dark:text-blue-300 font-medium">Machine Learning</span> researcher and{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">Generative AI</span> enthusiast with a foundation in Software Engineering.
            Currently expanding my expertise in full-stack development using{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">Django, DRF</span> and{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">React</span>, combining web development
            skills with AI technologies to create intelligent applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
            >
              <FaEnvelope />
              Get In Touch
            </a>
            <a
              href="/Resume_1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <FaDownload />
              View Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex gap-3 justify-center lg:justify-start">
            <a
              href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/19gm9nUyqU/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://github.com/ashraf1600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.kaggle.com/ashraf1600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:scale-110"
              aria-label="Kaggle"
            >
              <FaKaggle size={18} />
            </a>
            <a
              href="https://codeforces.com/profile/ashraf1600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-400 rounded-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:scale-110"
              aria-label="Codeforces"
            >
              <SiCodeforces size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Profile Picture */}
        <motion.div 
          className="lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <div className="relative group flex justify-center items-center">
            {/* Subtle blue glow behind the subject */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/10 dark:bg-blue-500/20 rounded-full blur-[60px] lg:blur-[80px] opacity-70 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none z-0"></div>

            {/* Main image container */}
            <div 
              className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] lg:w-[400px] lg:h-[500px] z-10 flex items-center justify-center"
              style={{
                maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 70%)"
              }}
            >
              <img
                src={profileImage}
                alt="Ashraful Islam"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter grayscale-[80%] contrast-[1.1] brightness-[0.85] group-hover:grayscale-[40%] mix-blend-normal z-0"
              />
              
              {/* Overlay gradients to blend image seamlessly into the background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] dark:from-[#0b1121] via-transparent to-transparent opacity-90 z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_35%,#f8f9fa_85%)] dark:bg-[radial-gradient(circle_at_50%_40%,transparent_35%,#0b1121_85%)] opacity-80 z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-50"></div>
            </div>

            {/* Status badge - Floating, Minimalist */}
            <div className="absolute bottom-8 lg:bottom-16 left-0 lg:-left-6 z-20 bg-white/90 dark:bg-[#111b2e]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium transition-transform duration-500 group-hover:-translate-y-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Status</span>
                <span className="font-semibold leading-none">Available for work</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
