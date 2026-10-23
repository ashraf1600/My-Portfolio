import React, { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { profile } from "../../constants";

const MENU = [
  { id: "home", num: "01", label: "home" },
  { id: "expertise", num: "02", label: "expertise" },
  { id: "work", num: "03", label: "work" },
  { id: "experience", num: "04", label: "experience" },
  { id: "contact", num: "05", label: "contact" },
];

export const Brand = ({ className = "" }) => (
  <span className={`font-mono text-[1.6rem] leading-none tracking-tight text-brand-cyan ${className}`}>
    {profile.brand}
    <span className="text-white">.</span>
    <span className="caret-blink text-brand-violet">_</span>
  </span>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const observers = MENU.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const go = useCallback((id) => {
    setActive(id);
    setIsOpen(false);
    if (id === "home") {
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setIsOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(26,26,26,0.8)] backdrop-saturate-[1.8] backdrop-blur-[20px]"
            : "bg-transparent"
        }`}
      >
        <div className={`max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 ${scrolled ? "h-[60px]" : "h-[88px]"} flex items-center justify-between transition-[height] duration-300`}>
          <button onClick={() => go("home")} aria-label="Back to top" className="shrink-0">
            <Brand />
          </button>

          <ul className="hidden md:flex items-end gap-6 lg:gap-11">
            {MENU.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="group flex flex-col items-end font-mono leading-none"
                  >
                    <span className="text-[10px] font-medium text-brand-cyan/80 mb-1.5">{item.num}</span>
                    <span
                      className={`font-medium transition-all duration-300 ${
                        scrolled ? "text-[14px] lg:text-[15px]" : "text-[15px] lg:text-[17px]"
                      } ${
                        scrolled || isActive ? "text-brand-cyan" : "text-white group-hover:text-brand-cyan"
                      } ${scrolled && !isActive ? "opacity-80 group-hover:opacity-100" : ""}`}
                    >
                      {"//"} {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={profile.docs}
              className="hidden lg:inline-flex items-center gap-1 font-mono text-xs text-noir-muted hover:text-brand-cyan transition-colors"
            >
              docs <FiArrowUpRight size={12} />
            </a>
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden p-2 -mr-2 text-white hover:text-brand-cyan transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-noir-deep/95 backdrop-blur-xl transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="h-full flex flex-col justify-center px-8 gap-7">
          {MENU.map((item, i) => (
            <li
              key={item.id}
              className="transition-all duration-500"
              style={{
                transitionDelay: isOpen ? `${80 + i * 50}ms` : "0ms",
                transform: isOpen ? "none" : "translateY(16px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <button onClick={() => go(item.id)} className="flex items-baseline gap-4 font-mono">
                <span className="text-xs text-brand-cyan/80">{item.num}</span>
                <span
                  className={`text-3xl font-medium ${active === item.id ? "text-brand-cyan" : "text-white"}`}
                >
                  {"// "}{item.label}
                </span>
              </button>
            </li>
          ))}
          <li className="pt-6 border-t hairline flex gap-6 font-mono text-sm">
            <a href={profile.docs} className="text-noir-soft hover:text-brand-cyan">docs ↗</a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-noir-soft hover:text-brand-cyan">
              resume ↗
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
