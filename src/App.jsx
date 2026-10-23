import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Cursor from "./components/Cursor/Cursor";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import FloatingChat from "./components/Contact/FloatingChat";
import Footer from "./components/Footer/Footer";
import Research from "./components/Research/Research";
import Certifications from "./components/Certifications/Certifications";

// Global scroll-reveal: observes all .reveal-section elements and adds .revealed
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all sections with the reveal class
    document.querySelectorAll(".reveal-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#66d9ed] via-[#9440e8] to-[#DF058D] shadow-[0_0_10px_rgba(148,64,232,0.6)] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const App = () => {
  useScrollReveal();
  useSmoothScroll();

  // Redirect /portfolio, /home, #portfolio, or unknown paths back to Home & ensure initial load stays at top
  useEffect(() => {
    const handleUrlRedirect = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // If user accesses /portfolio, /home, #portfolio, #home, or non-docs subpaths
      if (
        path.includes("/portfolio") ||
        path.includes("/home") ||
        hash === "#portfolio" ||
        hash === "#home" ||
        (path !== "/" && !path.startsWith("/nextgen-ai"))
      ) {
        window.history.replaceState(null, "", "/");
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (!hash) {
        // Ensure default root / always opens at top (Home)
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    handleUrlRedirect();
    window.addEventListener("popstate", handleUrlRedirect);
    return () => window.removeEventListener("popstate", handleUrlRedirect);
  }, []);

  return (
    <div className="bg-noir-canvas min-h-screen text-gray-200 relative selection:bg-brand-magenta/60 selection:text-white">
      <ScrollProgress />
      <Cursor />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="reveal-section"><Skills /></div>
        <div className="reveal-section"><Work /></div>
        <div className="reveal-section"><Experience /></div>
        <div className="reveal-section"><Research /></div>
        <div className="reveal-section"><Certifications /></div>
        <div className="reveal-section"><Education /></div>
        <Contact />
      </main>
      <FloatingChat />
      <Footer />
    </div>
  );
};

export default App;


