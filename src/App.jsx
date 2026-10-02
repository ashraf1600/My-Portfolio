import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
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
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-100 ease-out"
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
    <div className="bg-[#f8fafc] dark:bg-[#080d1a] min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300 relative selection:bg-blue-500/20 selection:text-blue-500">
      <ScrollProgress />
      
      {/* Ambient background glows for high-tech aesthetic */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-[120px] animate-pulseGlow" />
        <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 dark:bg-indigo-600/15 blur-[140px] animate-pulseGlow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 dark:bg-cyan-600/10 blur-[130px] animate-pulseGlow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-20">
        <Navbar />
        <About />
        <div className="reveal-section"><Skills /></div>
        <div className="reveal-section"><Experience /></div>
        <div className="reveal-section"><Work /></div>
        <div className="reveal-section"><Research /></div>
        <div className="reveal-section"><Certifications /></div>
        <div className="reveal-section"><Education /></div>
        <div className="reveal-section"><Contact /></div>
        <FloatingChat />
        <Footer />
      </div>
    </div>
  );
};

export default App;


