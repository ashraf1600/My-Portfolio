import React, { useState, useEffect } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaKaggle } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { FiBookOpen, FiArrowUp, FiArrowUpRight } from "react-icons/fi";

const DOCS_URL = "/NextGen-AI/";

const navItems = [
  { name: "Home",           id: "about" },
  { name: "Skills",         id: "skills" },
  { name: "Experience",     id: "experience" },
  { name: "Projects",       id: "work" },
  { name: "Research",       id: "research" },
  { name: "Certifications", id: "certifications" },
  { name: "Education",      id: "education" },
  { name: "Contact",        id: "contact" },
];

const socialLinks = [
  {
    icon: <FaGithub size={18} />,
    href: "https://github.com/ashraf1600",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={18} />,
    href: "https://www.linkedin.com/in/ashraful-islam-a31268226/",
    label: "LinkedIn",
  },
  {
    icon: <FaFacebook size={18} />,
    href: "https://www.facebook.com/share/19gm9nUyqU/",
    label: "Facebook",
  },
  {
    icon: <FaKaggle size={18} />,
    href: "https://www.kaggle.com/ashraf1600",
    label: "Kaggle",
  },
  {
    icon: <SiCodeforces size={18} />,
    href: "https://codeforces.com/profile/ashraf1600",
    label: "Codeforces",
  },
];

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (sectionId) => {
    if (sectionId === "about") {
      scrollToTop();
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-[#060a14]">
      {/* Top glowing laser line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

      <div className="px-[5vw] md:px-[8vw] lg:px-[10vw] py-14">
        {/* Top row: logo + nav */}
        <div className="flex flex-col items-center gap-6 mb-10">
          {/* Brand */}
          <div
            className="cursor-pointer flex items-center gap-2 group"
            onClick={scrollToTop}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] group-hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#0b1121] flex items-center justify-center">
                <span className="text-xs font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">AI</span>
              </div>
            </div>
            <span className="font-outfit text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ashraful Islam<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
            Architecting intelligent applications, autonomous agentic systems, and high-performance ML pipelines.
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="relative text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </nav>

          {/* Docs link */}
          <a
            href={DOCS_URL}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold
              bg-blue-50 dark:bg-white/5
              border border-blue-200/80 dark:border-white/10
              text-blue-600 dark:text-cyan-400
              hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white
              transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-500/25"
          >
            <FiBookOpen size={14} />
            <span>NextGen AI Documentation & Study Hub</span>
            <FiArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-200/80 dark:border-white/5 mb-8" />

        {/* Bottom row: social icons + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/8 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-800 dark:text-slate-300 font-semibold">
              Ashraful Islam
            </span>
            . Built with React 18, Vite & Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <FiArrowUp size={20} className="hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
