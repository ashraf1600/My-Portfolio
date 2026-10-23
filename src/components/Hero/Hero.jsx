import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
  SiPytorch,
  SiTensorflow,
  SiLangchain,
  SiFastapi,
  SiDocker,
  SiDjango,
  SiReact,
  SiPostgresql,
} from "react-icons/si";
import { profile } from "../../constants";

const STACK = [
  { icon: SiPytorch, name: "PyTorch" },
  { icon: SiTensorflow, name: "TensorFlow" },
  { icon: SiLangchain, name: "LangChain" },
  { icon: SiFastapi, name: "FastAPI" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiDjango, name: "Django" },
  { icon: SiReact, name: "React" },
  { icon: SiPostgresql, name: "PostgreSQL" },
];

// Face shading: the warm light sits above-right, so top/right faces catch it.
const WARM = "linear-gradient(140deg, rgba(255,140,70,0.85) 0%, rgba(160,70,35,0.55) 35%, #22191a 75%)";
const WARM_SOFT = "linear-gradient(200deg, rgba(255,120,60,0.45) 0%, #1f1a1d 55%, #15151b 100%)";
const COOL = "linear-gradient(160deg, #262836 0%, #17181f 60%, #101117 100%)";
const DARK = "#0e0f14";

const Cube = ({ size, style, rx, ry, rz = "0deg", dur = "12s", delay = "0s", lit = true }) => (
  <div
    className="cube cube-drift"
    style={{
      "--s": `${size}px`,
      "--rx": rx,
      "--ry": ry,
      "--rz": rz,
      "--dur": dur,
      animationDelay: delay,
      ...style,
    }}
  >
    <i className="f-front" style={{ background: COOL }} />
    <i className="f-back" style={{ background: DARK }} />
    <i className="f-right" style={{ background: lit ? WARM_SOFT : COOL }} />
    <i className="f-left" style={{ background: DARK }} />
    <i className="f-top" style={{ background: lit ? WARM : COOL }} />
    <i className="f-bottom" style={{ background: DARK }} />
  </div>
);

const Hero = () => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const sceneX = useTransform(sx, (v) => v * 28);
  const sceneY = useTransform(sy, (v) => v * 18);
  const orbX = useTransform(sx, (v) => v * -40);
  const orbY = useTransform(sy, (v) => v * -26);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-10"
    >
      {/* Ambient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_38%,#262833_0%,#1c1d25_45%,#1a191d_100%)]" />

      {/* bottom fade into the page canvas (matches the original overlay) */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none z-[1] bg-gradient-to-b from-transparent to-[#1a191d]" />

      {/* 3D scene */}
      <motion.div
        aria-hidden="true"
        className="scene-3d absolute left-1/2 top-[46%] w-0 h-0 pointer-events-none"
        style={{ x: sceneX, y: sceneY }}
      >
        <div className="relative scale-[0.62] sm:scale-[0.8] lg:scale-100">
          {/* warm floor bounce */}
          <div className="absolute -left-[260px] -top-[60px] w-[560px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,107,43,0.22)_0%,transparent_65%)] blur-2xl" />

          <Cube size={170} rx="-18deg" ry="30deg" dur="14s" style={{ left: -330, top: -260 }} lit />
          <Cube size={300} rx="-26deg" ry="42deg" dur="16s" delay="-4s" style={{ left: -150, top: -190 }} />
          <Cube size={130} rx="20deg" ry="-28deg" rz="18deg" dur="11s" delay="-2s" style={{ left: 120, top: 120 }} lit={false} />
          <Cube size={90} rx="-30deg" ry="60deg" dur="10s" delay="-6s" style={{ left: -300, top: 150 }} lit={false} />

          {/* point light */}
          <motion.div className="absolute" style={{ left: 120, top: -150, x: orbX, y: orbY }}>
            <div
              className="light-orb absolute left-0 top-0 w-[74px] h-[74px] rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #fff4e0 0%, #ffb27a 35%, #ff6b2b 65%, #df058d 100%)",
                boxShadow: "0 0 60px 18px rgba(255,107,43,0.55), 0 0 160px 60px rgba(255,107,43,0.18)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Copy */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-poppins font-semibold uppercase text-white leading-[0.95] tracking-[0.04em] text-[clamp(2.4rem,8.2vw,8.25rem)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
        >
          {profile.firstName}{" "}
          <span className="whitespace-nowrap">{profile.lastName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 sm:mt-8 font-mono font-medium uppercase text-white text-[13px] sm:text-lg lg:text-[22px] tracking-[0.14em] sm:tracking-[0.18em] max-w-4xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-sm"
        >
          <a href="#work" className="text-brand-cyan hover:text-white transition-colors">
            [ view work ]
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-noir-soft hover:text-brand-cyan transition-colors"
          >
            [ resume ↗ ]
          </a>
        </motion.div>

        {/* Core stack ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 sm:mt-20 w-full max-w-[860px]"
        >
          <p className="font-poppins font-semibold uppercase tracking-[0.18em] text-white/30 text-sm sm:text-lg mb-6">
            Core Tech Stack
          </p>
          <div className="relative flex items-center gap-3">
            <span className="hidden sm:block text-white/25 text-2xl font-light select-none" aria-hidden="true">‹</span>
            <div className="marquee-mask relative flex-1 overflow-hidden">
              <ul className="marquee-track flex w-max items-center gap-x-14">
                {[...STACK, ...STACK].map(({ icon: Icon, name }, i) => (
                  <li
                    key={name + i}
                    aria-hidden={i >= STACK.length}
                    className="flex items-center gap-2 text-white/35 hover:text-white/80 transition-colors"
                  >
                    <Icon size={24} aria-hidden="true" />
                    <span className="font-poppins font-semibold text-[15px] tracking-tight whitespace-nowrap">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="hidden sm:block text-white/25 text-2xl font-light select-none" aria-hidden="true">›</span>
          </div>
        </motion.div>

        {/* Mouse scroll indicator */}
        <a href="#expertise" aria-label="Scroll to expertise" className="mt-12 sm:mt-14 flex flex-col items-center gap-2">
          <span className="relative block w-[26px] h-[42px] rounded-full border-2 border-white/80">
            <span className="mouse-wheel absolute left-1/2 top-2 block w-[3px] h-[8px] rounded-full bg-brand-violet shadow-[0_0_8px_#9440e8]" />
          </span>
          <span className="glow-line block w-px h-8 bg-gradient-to-b from-brand-violet to-transparent shadow-[0_0_8px_#9440e8]" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
