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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out px-4 md:px-8 lg:px-12 ${isScrolled
        ? "bg-white/90 dark:bg-[#0b1121]/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/50 dark:border-white/5"
        : "bg-transparent"
        }`}
    >
      <div className="text-gray-900 dark:text-white py-4 flex justify-between items-center">
        {/* Logo — Academic serif brand */}
        <div
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => {
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-serif text-xl font-bold italic text-gray-900 dark:text-white">
            Ashraful Islam
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-1 text-gray-600 dark:text-gray-400 font-medium items-center">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${activeSection === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: Docs CTA + Social Icons */}
        <div className="hidden md:flex gap-3 items-center">
          <ThemeToggle />

          {/* Docs CTA */}
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
            <FiBookOpen size={15} className="transition-transform duration-300 group-hover:rotate-12" />
            <span>Docs</span>
            <FiArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-all duration-300" />
          </a>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700" />

          <a
            href="https://github.com/ashraf1600"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={19} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-900 dark:text-white p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-4 right-4 bg-white/95 dark:bg-[#0e1729]/95 backdrop-filter backdrop-blur-xl z-50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 md:hidden overflow-hidden border border-gray-200 dark:border-white/10 transition-all duration-300 origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center py-6 text-gray-700 dark:text-gray-300">
          {menuItems.map((item, index) => (
            <li
              key={item.id}
              className="w-full text-center"
              style={{ animationDelay: isOpen ? `${index * 40}ms` : "0ms" }}
            >
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={`block w-full py-3 px-6 text-sm font-medium transition-all duration-300 ${activeSection === item.id
                  ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-500/10"
                  : "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/5"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* Docs CTA */}
          <li className="w-full px-6 pt-3">
            <a
              href={DOCS_URL}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold
                bg-blue-50 dark:bg-blue-500/10
                border border-blue-200 dark:border-blue-500/30
                text-blue-700 dark:text-blue-300
                hover:bg-blue-600 hover:text-white hover:border-transparent
                transition-all duration-300"
            >
              <FiBookOpen size={16} />
              <span>NextGen AI Docs</span>
              <FiArrowUpRight size={13} className="opacity-60" />
            </a>
          </li>

          {/* Social Icons */}
          <li className="w-full flex justify-center pt-4 mt-3 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/ashraf1600"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
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