import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About, { Marquee } from "./components/About";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Certificates from "./components/Certificates";
import QuickProfile from "./components/QuickProfile";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

// Fades each section up as it scrolls into view (spring, once).
const Reveal = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const App = () => (
  <>
    <Cursor />
    <Header />
    <main>
      <Hero />
      <Marquee />
      <Reveal><About /></Reveal>
      <Reveal><Timeline /></Reveal>
      <Reveal><Skills /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Research /></Reveal>
      <Reveal><Certificates /></Reveal>
      <Reveal><QuickProfile /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
    <Footer />
  </>
);

export default App;
