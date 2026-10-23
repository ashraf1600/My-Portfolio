import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaKaggle } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import HeroArt from "./HeroArt";
import { profile } from "../../constants";
import { hero } from "../content";

// Types each role, pauses, deletes, moves to the next.
const useTyper = (words, { type = 70, erase = 35, hold = 1800 } = {}) => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), hold);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? erase : type
      );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, type, erase, hold]);

  return text;
};

const SOCIAL_ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, Kaggle: FaKaggle, Codeforces: SiCodeforces };

// One orchestrated entrance: copy rises in sequence, then the photo card drops in with its stickers.
const rise = (d) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", bounce: 0.3, duration: 1.1, delay: d },
});


const Hero = () => {
  const reduce = useReducedMotion();
  const typed = useTyper(hero.roles);
  const socials = profile.socials.filter((s) => SOCIAL_ICONS[s.name]);

  return (
    <section id="top" className="relative overflow-hidden bg-nb-paper">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pt-28">
        {/* Copy */}
        <div className="relative z-20">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border-2 border-nb-ink bg-nb-card px-3.5 py-1.5 text-sm font-bold shadow-brutal-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-nb-ink bg-emerald-400" />
            </span>
            Open to AI/ML roles &amp; research
          </motion.p>

          <motion.h1 {...rise(0.12)} className="mt-6 text-[3.4rem] font-bold leading-[0.95] tracking-[-0.035em] sm:text-[4.6rem] lg:text-[5.4rem]">
            {profile.firstName}
            <br />
            {profile.lastName}
            <span className="ml-2 inline-block h-4 w-4 rounded-full border-2 border-nb-ink bg-nb-lime align-baseline sm:h-5 sm:w-5" />
          </motion.h1>

          <motion.div {...rise(0.24)} className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex h-12 min-w-[15.5rem] items-center rounded-lg border-2 border-nb-ink bg-nb-lime px-4 font-jb text-lg font-bold uppercase tracking-wider shadow-brutal-sm sm:h-14 sm:min-w-[19rem] sm:text-2xl">
              {reduce ? hero.roles[0] : typed}
              <span className="nb-caret ml-0.5 font-normal">|</span>
            </span>
          </motion.div>

          <motion.p {...rise(0.36)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-nb-ink/75 sm:text-xl">
            {hero.intro}
          </motion.p>

          <motion.div {...rise(0.48)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="press-effect inline-flex items-center gap-2 rounded-xl border-[2.5px] border-nb-ink bg-nb-ink px-6 py-3.5 font-bold text-nb-paper shadow-[5px_5px_0_0_#7c4dff]"
            >
              See my work <FiArrowDown />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="press-effect inline-flex items-center gap-2 rounded-xl border-[2.5px] border-nb-ink bg-nb-card px-6 py-3.5 font-bold shadow-[5px_5px_0_0_rgb(var(--nb-shadow))]"
            >
              <FiDownload /> Download CV
            </a>
          </motion.div>

          <motion.ul {...rise(0.6)} className="mt-9 flex items-center gap-3" aria-label="Profiles">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.name];
              return (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-nb-ink bg-nb-card transition-all hover:-translate-y-1 hover:bg-nb-pink hover:shadow-brutal-sm"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <HeroArt />
      </div>
    </section>
  );
};

export default Hero;
