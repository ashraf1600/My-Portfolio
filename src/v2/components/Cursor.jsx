import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Custom cursor: a small ink dot that tracks the pointer exactly, plus a ring
// that trails behind on a spring. Over links and buttons the ring grows into a
// diamond; over text fields it hides so the normal text cursor shows; on
// click it squeezes. On hover the ring inverts the colours beneath it, so
// button text stays readable in both light and dark mode. Only runs on mouse/trackpad devices, and not for people
// who ask for reduced motion.

const INTERACTIVE = "a, button, [role='button'], select, label, summary, [data-cursor='hover']";
const TEXT_INPUT = "input, textarea, [contenteditable='true']";

const canUseCursor = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("default"); // default | hover | text
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!canUseCursor()) return undefined;
    setEnabled(true);
    document.documentElement.classList.add("nb-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target instanceof Element ? e.target : null;
      if (t?.closest(TEXT_INPUT)) setMode("text");
      else if (t?.closest(INTERACTIVE)) setMode("hover");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("nb-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  const hover = mode === "hover";
  const hidden = !visible || mode === "text";
  const ringSize = hover ? 56 : 34;

  return (
    // No wrapper element: a positioned wrapper would isolate the ring and stop
    // mix-blend-difference from reaching the page underneath.
    <AnimatePresence>
        {!hidden && (
          <>
            {/* trailing ring */}
            <motion.div
              key="ring"
              style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                width: ringSize,
                height: ringSize,
                scale: down ? 0.8 : 1,
                borderRadius: hover ? 14 : 999,
                rotate: hover ? 45 : 0,
              }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              aria-hidden="true"
              className={`pointer-events-none fixed left-0 top-0 z-[9999] border-[2.5px] ${
                hover ? "border-white bg-white mix-blend-difference" : "border-nb-ink bg-transparent"
              }`}
            />
            {/* exact-position dot */}
            <motion.div
              key="dot"
              style={{ x, y, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: hover ? 0 : 1, scale: down ? 1.6 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-nb-hot"
            />
          </>
        )}
    </AnimatePresence>
  );
};

export default Cursor;
