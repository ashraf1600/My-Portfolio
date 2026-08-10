import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMenu, FiX, FiBookOpen } from "react-icons/fi";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const DOCS_URL = "https://ashraf1600.github.io/NextGen-AI/";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out px-4 md:px-8 lg:px-12 ${isScrolled
        ? "bg-white/80 dark:bg-[#050414]/80 backdrop-blur-lg shadow-lg shadow-purple-500/10"
        : "bg-transparent"
        }`}
    >
      <div className="text-slate-900 dark:text-white py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-slate-900 dark:text-white">Ashraful</span>
          <span className="text-[#8245ec]">/Islam</span>
          <span className="text-slate-900 dark:text-white"></span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 text-slate-700 dark:text-gray-300 font-medium items-center">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="relative group"
            >
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className={`transition-all duration-300 hover:text-[#8245ec] hover:scale-110 ${activeSection === item.id ? "text-[#8245ec]" : ""
                  }`}
              >
                {item.label}
              </button>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full ${activeSection === item.id ? "w-full" : ""
                }`}></span>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex gap-6 items-center">
          <ThemeToggle />
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Documentation"
            className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125 hover:rotate-12"
          >
            <FiBookOpen size={24} />
          </a>
          <a
            href="https://github.com/ashraf1600"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125 hover:rotate-12"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125 hover:rotate-12"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-slate-900 dark:text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-white/95 dark:bg-[#050414]/90 backdrop-filter backdrop-blur-xl z-50 rounded-2xl shadow-2xl shadow-purple-500/20 md:hidden animate-slideUp overflow-hidden border border-purple-500/20">
          <ul className="flex flex-col items-center space-y-4 py-6 text-slate-700 dark:text-gray-300">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="w-full text-center"
              >
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`cursor-pointer hover:text-[#8245ec] transition-all duration-300 hover:scale-110 ${activeSection === item.id ? "text-[#8245ec] font-semibold" : ""
                    }`}
                >
                  {item.label}
                </button>
              </li>
            ))}

            <li className="w-full flex justify-center pt-4 border-t border-gray-700/50 dark:border-gray-700/50">
              <div className="flex items-center gap-6">
                <ThemeToggle />
                <a
                  href={DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Documentation"
                  className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125"
                >
                  <FiBookOpen size={24} />
                </a>
                <a
                  href="https://github.com/ashraf1600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 dark:text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;