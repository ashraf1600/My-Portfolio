import { useEffect, useRef } from "react";

// Dot + trailing ring cursor, in the style of the reference site.
// Only active on devices with a fine pointer and when motion is allowed.
const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const link = e.target.closest?.("a, button, [role='button']");
      dot.current?.classList.toggle("is-link", Boolean(link));
      ring.current?.classList.toggle("is-link", Boolean(link));
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const hide = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const show = () => {
      if (dot.current) dot.current.style.opacity = "";
      if (ring.current) ring.current.style.opacity = "";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:block" style={{ transform: "translate3d(-100px,-100px,0)" }} aria-hidden="true" />
      <div ref={dot} className="cursor-dot hidden md:block" style={{ transform: "translate3d(-100px,-100px,0)" }} aria-hidden="true" />
    </>
  );
};

export default Cursor;
