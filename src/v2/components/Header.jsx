import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "../../constants";

export const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#certificates", label: "Certificates", mobileOnly: true },
  { href: "#contact", label: "Contact" },
];

// Light by default; remembers the visitor's choice.
export const useTheme = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("v2-theme", dark ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
};

const ThemeToggle = ({ dark, onToggle, className = "" }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    title={dark ? "Light mode" : "Dark mode"}
    className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 border-nb-ink bg-nb-card transition-all hover:-translate-y-0.5 hover:bg-nb-lime hover:text-nb-night ${className}`}
  >
    {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
  </button>
);

const DocsLink = ({ className = "" }) => (
  <a
    href={profile.docs}
    className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-nb-ink bg-nb-sky px-3 py-1 text-[14px] font-bold text-nb-night transition-all hover:-translate-y-0.5 hover:shadow-brutal-sm ${className}`}
  >
    <FiBookOpen size={14} /> NextGen AI <FiArrowUpRight size={13} />
  </a>
);

const social = (name) => profile.socials.find((s) => s.name === name)?.url;

export const Logo = () => (
  <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-nb-ink bg-nb-lime shadow-brutal-sm transition-transform group-hover:-translate-y-0.5">
    <span className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] border-nb-ink">
      <span className="text-[10px] font-bold uppercase tracking-tighter">AI</span>
      <span className="absolute -right-[2px] -top-[2px] h-1.5 w-1.5 rounded-full border border-nb-ink bg-nb-hot" />
    </span>
  </span>
);

const IconLink = ({ href, label, children, hover }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 border-nb-ink bg-nb-card transition-all hover:-translate-y-0.5 ${hover}`}
  >
    {children}
  </a>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dark, toggleTheme] = useTheme();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Highlight the section currently in view, and firm up the bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-xl border-2 border-nb-ink px-4 py-2.5 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-nb-paper/90 shadow-brutal" : "bg-nb-paper/60 shadow-brutal-sm"}`}>
        <a href="#top" className="group flex items-center gap-3">
          <Logo />
          <span className="hidden text-sm font-bold tracking-tight sm:block">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-3" aria-label="Main">
          {LINKS.filter((l) => !l.mobileOnly).map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`rounded-md px-2 py-1 text-[14px] font-bold transition-all hover:-translate-y-0.5 hover:bg-nb-lime hover:text-nb-night ${
                active === l.href ? "bg-nb-lime text-nb-night shadow-[2px_2px_0_0_rgb(var(--nb-shadow))]" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
          <DocsLink className="ml-2" />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle dark={dark} onToggle={toggleTheme} />
          <IconLink href={social("GitHub")} label="GitHub" hover="hover:bg-nb-ink hover:text-nb-paper">
            <FaGithub size={16} />
          </IconLink>
          <IconLink href={social("LinkedIn")} label="LinkedIn" hover="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]">
            <FaLinkedinIn size={15} />
          </IconLink>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex h-9 items-center rounded-lg border-2 border-nb-ink bg-nb-hot px-5 text-[14px] font-bold text-white shadow-brutal-sm transition-transform hover:-translate-y-0.5"
          >
            Resume
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle dark={dark} onToggle={toggleTheme} />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-nb-ink bg-nb-card lg:hidden"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[320px] flex-col border-l-[3px] border-nb-ink bg-nb-paper bg-dots shadow-[-8px_0_0_0_rgb(var(--nb-shadow))] lg:hidden"
            >
              <div className="flex items-center justify-between border-b-[3px] border-nb-ink bg-nb-card p-5">
                <span className="text-2xl font-bold tracking-tight">Navigation</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="press-effect flex h-10 w-10 items-center justify-center rounded-lg border-[3px] border-nb-ink bg-nb-pink shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]"
                >
                  <FiX size={22} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="block rounded-xl border-[3px] border-nb-ink bg-nb-card px-5 py-4 text-lg font-bold uppercase tracking-widest transition-all hover:-translate-y-1 hover:bg-nb-lime hover:shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a
                  href={profile.docs}
                  className="flex items-center justify-between rounded-xl border-[3px] border-nb-ink bg-nb-sky px-5 py-4 text-lg font-bold uppercase tracking-widest text-nb-night"
                >
                  NextGen AI docs <FiArrowUpRight />
                </a>
              </div>
              <div className="flex items-center gap-3 border-t-[3px] border-nb-ink bg-nb-card p-6">
                <a href={social("GitHub")} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-nb-ink shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]">
                  <FaGithub size={20} />
                </a>
                <a href={social("LinkedIn")} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-nb-ink shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]">
                  <FaLinkedinIn size={19} />
                </a>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-1 items-center justify-center rounded-xl border-[3px] border-nb-ink bg-nb-lime text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]">
                  Resume
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
