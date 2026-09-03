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

const focusAreas = [
  { num: '01', label: 'ML Research' },
  { num: '02', label: 'Full-Stack Dev' },
  { num: '03', label: 'AI Engineering' },
  { num: '04', label: 'Django & React' },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative pt-10 pb-20 px-[5vw] md:px-[8vw] lg:px-[12vw] font-sans overflow-hidden"
    >
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-20 relative z-10">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Greeting badge */}
          <div className="mb-5">
            <span className="inline-block bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-medium px-4 py-2 rounded-full">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Name — serif academic style */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            <span className="text-gray-700 dark:text-gray-300">Hi, I'm</span>
            <br />
            <span className="font-serif italic text-blue-600 dark:text-blue-400">
              Ashraful Islam
            </span>
          </h1>

          {/* Typing Effect */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 min-h-[2.5rem]">
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
          </div>

          {/* Focus Area Chips */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
            {focusAreas.map((area) => (
              <span
                key={area.num}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold">{area.num}</span>
                {area.label}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I'm a passionate <span className="text-blue-700 dark:text-blue-300 font-medium">Machine Learning</span> researcher and{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">Generative AI</span> enthusiast with a foundation in Software Engineering.
            Currently expanding my expertise in full-stack development using{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">Django, DRF</span> and{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">React</span>, combining web development
            skills with AI technologies to create intelligent applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
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
          </div>

          {/* Social Links */}
          <div className="flex gap-3 justify-center lg:justify-start">
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
          </div>
        </div>

        {/* Right Side - Profile Picture */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative group">
            {/* Soft background glow to blend */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-2xl opacity-50 transition-opacity duration-700 group-hover:opacity-70"></div>

            {/* Main image container */}
            <div 
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[26rem] z-10 flex items-center justify-center bg-[#0b1121]"
              style={{
                maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 100%)"
              }}
            >
              <img
                src={profileImage}
                alt="Ashraful Islam"
                className="w-full h-full object-cover transition-all duration-700 mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105"
              />
            </div>

            {/* Status badge - Floating, Minimalist */}
            <div className="absolute -left-6 bottom-12 z-20 bg-white dark:bg-[#111b2e] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium transition-transform duration-500 group-hover:-translate-y-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Status</span>
                <span className="font-serif leading-none">Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
