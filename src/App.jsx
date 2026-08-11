import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BlurBlob from './components/BlurBlob';
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

const App = () => {
  useScrollReveal();

  return (
    <div className="bg-white dark:bg-[#050414] min-h-screen transition-colors duration-300">

      <BlurBlob position={{ top: '35%', left: '20%' }} size={{ width: '30%', height: '40%' }} />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:14px_24px] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative pt-20">
        <Navbar />
        <About />
        <div className="reveal-section"><Skills /></div>
        {/* <Experience /> */}
        <div className="reveal-section"><Work /></div>
        <div className="reveal-section"><Research /></div>
        <div className="reveal-section"><Certifications /></div>
        <div className="reveal-section"><Education /></div>
        <div className="reveal-section"><Contact /></div>
        <Footer />
      </div>

    </div>
  );
};

export default App;
