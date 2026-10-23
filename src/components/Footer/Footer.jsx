import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { profile } from "../../constants";
import { Brand } from "../Navbar/Navbar";

const LINKS = [
  { id: "home", label: "home" },
  { id: "expertise", label: "expertise" },
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "research", label: "research" },
  { id: "certifications", label: "certifications" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];

const scrollTo = (id) => {
  if (id === "home") {
    window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative bg-noir-deep border-t hairline">
      <div className="max-w-[1350px] mx-auto px-5 sm:px-8 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10">
        <div>
          <Brand />
          <p className="mt-4 font-mono text-sm text-noir-muted max-w-sm">
            {profile.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
            <a href={profile.docs} className="text-brand-cyan hover:text-white transition-colors">
              NextGen-AI docs ↗
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-noir-soft hover:text-brand-cyan transition-colors">
              resume ↗
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2.5 font-mono text-sm">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-noir-soft hover:text-brand-cyan transition-colors">
              <span className="text-white/30">{"// "}</span>
              {l.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t hairline">
        <div className="max-w-[1350px] mx-auto px-5 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 justify-between font-mono text-xs text-noir-muted">
          <span>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            {profile.socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors">
                {s.name.toLowerCase()}
              </a>
            ))}
          </span>
        </div>
      </div>

      {/* Square back-to-top button */}
      <button
        onClick={() => scrollTo("home")}
        aria-label="Back to top"
        className={`fixed bottom-6 left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white text-brand-violet shadow-xl hover:bg-brand-cyan hover:text-black transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <FiArrowUp size={22} strokeWidth={2.5} />
      </button>
    </footer>
  );
};

export default Footer;
