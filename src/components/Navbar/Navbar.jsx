import React, { useState, useEffect, useCallback } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMenu, FiX, FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const DOCS_URL = "/NextGen-AI/";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { id: "about", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: auto-highlight active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = menuItems.map((item) => item.id);
    const observers = [];

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Smooth scroll function
  const handleMenuItemClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    if (sectionId === "about") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 pb-2 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          isScrolled
            ? "bg-white/85 dark:bg-[#0a1122]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-black/40"
            : "bg-white/50 dark:bg-[#0a1122]/50 backdrop-blur-md border border-slate-200/40 dark:border-white/5 shadow-sm"
        }`}
      >
        {/* Brand Logo */}
        <div
          className="cursor-pointer flex items-center gap-2 group"
          onClick={() => {
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white dark:bg-[#0b1121] flex items-center justify-center">
              <span className="text-xs font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">AI</span>
            </div>
          </div>
          <span className="font-outfit font-extrabold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Ashraful<span className="text-blue-500">.</span>
          </span>
        </div>

        {/* Desktop Menu Pills */}
        <ul className="hidden lg:flex items-center gap-1 bg-slate-100/60 dark:bg-white/5 px-2 py-1 rounded-full border border-slate-200/60 dark:border-white/5">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white dark:text-white bg-blue-600 dark:bg-blue-600 shadow-md shadow-blue-500/30"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Action Icons & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Docs button */}
          <a
            href={DOCS_URL}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FiBookOpen size={13} />
            <span>Docs</span>
            <FiArrowUpRight size={11} className="opacity-70" />
          </a>

          <ThemeToggle />

          {/* Socials */}
          <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-white/10">
            <a
              href="https://github.com/ashraf1600"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden max-w-6xl mx-auto mt-2 p-4 bg-white/95 dark:bg-[#0e172a]/95 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl animate-fadeIn">
          <ul className="grid grid-cols-2 gap-1.5 pb-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <a
              href={DOCS_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20"
            >
              <FiBookOpen size={14} />
              <span>NextGen AI Docs</span>
              <FiArrowUpRight size={12} />
            </a>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <a href="https://github.com/ashraf1600" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/ashraful-islam-a31268226/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;