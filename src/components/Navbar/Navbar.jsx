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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out px-4 md:px-8 lg:px-12 ${isScrolled
        ? "bg-white/80 dark:bg-[#050414]/80 backdrop-blur-lg shadow-lg shadow-purple-500/10"
        : "bg-transparent"
        }`}
    >
      <div className="text-slate-900 dark:text-white py-5 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={() => {
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-slate-900 dark:text-white">Ashraful</span>
          <span className="text-[#8245ec]">/Islam</span>
          <span className="text-slate-900 dark:text-white"></span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-slate-700 dark:text-gray-300 font-medium items-center">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="relative group"
            >
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={`transition-all duration-300 text-sm hover:text-[#8245ec] ${activeSection === item.id ? "text-[#8245ec]" : ""
                  }`}
              >
                {item.label}
              </button>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full ${activeSection === item.id ? "w-full" : ""
                }`}></span>
            </li>
          ))}
        </ul>

        {/* Right side: Docs CTA + Social Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <ThemeToggle />

          {/* Docs CTA — distinct pill button */}
          <a
            href={DOCS_URL}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-purple-600/10 to-pink-600/10
              dark:from-purple-500/15 dark:to-pink-500/15
              border border-purple-500/40 dark:border-purple-500/30
              text-purple-700 dark:text-purple-300
              hover:from-purple-600 hover:to-pink-600
              hover:text-white hover:border-transparent
              hover:shadow-lg hover:shadow-purple-500/30
              transition-all duration-300 hover:scale-105"
          >
            <FiBookOpen size={16} className="transition-transform duration-300 group-hover:rotate-12" />
            <span>Docs</span>
            <FiArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="w-px h-5 bg-slate-300 dark:bg-gray-700" />

          <a
            href="https://github.com/ashraf1600"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-2xl text-slate-900 dark:text-white p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-4 right-4 bg-white/95 dark:bg-[#0a0620]/95 backdrop-filter backdrop-blur-xl z-50 rounded-2xl shadow-2xl shadow-purple-500/20 md:hidden overflow-hidden border border-purple-500/20 transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center py-6 text-slate-700 dark:text-gray-300">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className="w-full text-center"
              style={{ animationDelay: isOpen ? `${index * 40}ms` : "0ms" }}
            >
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={`block w-full py-3 px-6 text-sm font-medium transition-all duration-300 hover:text-[#8245ec] hover:bg-purple-500/5 ${activeSection === item.id ? "text-[#8245ec] font-semibold bg-purple-500/5" : ""
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* Docs CTA — prominent in mobile menu */}
          <li className="w-full px-6 pt-3">
            <a
              href={DOCS_URL}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-purple-600/10 to-pink-600/10
                dark:from-purple-500/15 dark:to-pink-500/15
                border border-purple-500/30
                text-purple-700 dark:text-purple-300
                hover:from-purple-600 hover:to-pink-600
                hover:text-white hover:border-transparent
                transition-all duration-300"
            >
              <FiBookOpen size={16} />
              <span>NextGen AI Docs</span>
              <FiArrowUpRight size={13} className="opacity-60" />
            </a>
          </li>

          {/* Social Icons */}
          <li className="w-full flex justify-center pt-4 mt-3 border-t border-slate-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/ashraf1600"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </li>
        </ul>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;