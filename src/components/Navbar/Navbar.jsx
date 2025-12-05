import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out px-4 md:px-8 lg:px-12 ${isScrolled
          ? "bg-[#050414]/80 backdrop-blur-lg shadow-lg shadow-purple-500/10"
          : "bg-transparent"
        }`}
    >
      <div className="text-white py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-white">Ashraful</span>
          <span className="text-[#8245ec]">/Islam</span>
          <span className="text-white"></span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 text-gray-300 font-medium">
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
        <div className="hidden md:flex gap-6">
          <a
            href="https://github.com/ashraf1600"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125 hover:rotate-12"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125 hover:rotate-12"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="text-3xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-3xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414]/90 backdrop-filter backdrop-blur-xl z-50 rounded-2xl shadow-2xl shadow-purple-500/20 md:hidden animate-slideUp overflow-hidden border border-purple-500/20">
          <ul className="flex flex-col items-center space-y-4 py-6 text-gray-300">
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
            <div className="flex space-x-6 pt-4 border-t border-gray-700/50 w-3/4">
              <a
                href="https://github.com/ashraf1600"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-all duration-300 hover:scale-125"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
