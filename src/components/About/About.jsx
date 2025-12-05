import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
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
import profileImage from '../../assets/enhanced-profile.png';

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 px-[5vw] md:px-[8vw] lg:px-[12vw] font-sans mt-16 md:mt-20 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-20 relative z-10">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Greeting badge - more subtle */}
          <div className="mb-5">
            <span className="inline-block bg-purple-500/5 border border-purple-500/20 text-purple-300 text-sm font-medium px-4 py-2 rounded-full">
              👋 Welcome to my portfolio
            </span>
          </div>

          {/* Name - cleaner gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            <span className="text-gray-300">Hi, I'm</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ashraful Islam
            </span>
          </h1>

          {/* Typing Effect - simplified */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 min-h-[2.5rem]">
            <span className="text-gray-400">I'm a </span>
            <ReactTypingEffect
              text={[
                'CSE Student',
                'Problem Solver',
                'AI Engineer Aspirant',
                'Django Developer',
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-purple-400">{cursor}</span>
              )}
              className="inline-block text-purple-400"
            />
          </div>

          {/* Description - more concise */}
          <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I'm a passionate <span className="text-purple-300 font-medium">Machine Learning</span> and{' '}
            <span className="text-purple-300 font-medium">AI</span> enthusiast with a foundation in Software Engineering.
            Currently expanding my expertise in full-stack development using{' '}
            <span className="text-purple-300 font-medium">Django</span> and{' '}
            <span className="text-purple-300 font-medium">React</span>, combining web development
            skills with AI technologies to create intelligent applications.
          </p>

          {/* CTA Buttons - more professional */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
            >
              <FaEnvelope />
              Get In Touch
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <FaDownload />
              View Resume
            </a>
          </div>

          {/* Social Links - cleaner design */}
          <div className="flex gap-3 justify-center lg:justify-start">
            <a
              href="https://www.linkedin.com/in/ashraful-islam-b9266b235/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800/60 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm text-gray-400 hover:text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-purple-500/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.facebook.com/ashrafullislamm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800/60 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm text-gray-400 hover:text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-purple-500/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://github.com/ashraf1600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800/60 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm text-gray-400 hover:text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-purple-500/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.kaggle.com/ashrafulislam1600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800/60 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm text-gray-400 hover:text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-purple-500/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              aria-label="Kaggle"
            >
              <FaKaggle size={20} />
            </a>
            <a
              href="https://codeforces.com/profile/ashraf1600"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-800/60 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm text-gray-400 hover:text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-purple-500/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
              aria-label="Codeforces"
            >
              <SiCodeforces size={20} />
            </a>
          </div>
        </div>

        {/* Right Side - Profile Picture - Professional & Subtle */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={2500}
            className="relative"
          >
            <div className="relative group">
              {/* Subtle glow - much less intense */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-700"></div>

              {/* Main image container - cleaner border */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                <img
                  src={profileImage}
                  alt="Ashraful Islam"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Status badge - more professional */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm border border-purple-500/40 text-gray-300 px-6 py-2.5 rounded-full shadow-xl shadow-purple-500/20 flex items-center gap-2 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                Available for work
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
