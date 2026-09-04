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
    <div className="bg-[#f8f9fa] dark:bg-[#0b1121] min-h-screen transition-colors duration-300">
      <div className="relative pt-20">
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


