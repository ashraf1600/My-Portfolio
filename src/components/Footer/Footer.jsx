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
    <footer className="relative border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#0b1121]">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="px-[8vw] md:px-[6vw] lg:px-[12vw] py-12">
        {/* Top row: logo + nav */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Brand — Serif italic */}
          <div
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            onClick={scrollToTop}
          >
            <span className="font-serif text-xl font-bold italic text-gray-900 dark:text-white">
              Ashraful Islam
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-500 dark:text-gray-500 text-center max-w-md">
            Building intelligent applications at the intersection of AI and software engineering.
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="relative text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Docs link */}
          <a
            href={DOCS_URL}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
              bg-blue-50 dark:bg-blue-500/10
              border border-blue-200 dark:border-blue-500/30
              text-blue-700 dark:text-blue-300
              hover:bg-blue-600 hover:text-white hover:border-transparent
              hover:shadow-lg hover:shadow-blue-500/20
              transition-all duration-300"
          >
            <FiBookOpen size={15} />
            <span>NextGen AI Docs</span>
            <FiArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-white/5 mb-8" />

        {/* Bottom row: social icons + copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/8 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-500 text-center sm:text-right">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Ashraful Islam
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </button>
    </footer>
  );
};

export default Footer;
