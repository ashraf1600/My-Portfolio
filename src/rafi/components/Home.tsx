import { cx, css } from "../utils/jsx";
import BeyondTitle from "./BeyondTitle";
import { CleanEducation, CleanExperience, CleanProjects, CleanResearch, CleanSkills } from "./CleanSections";
import AchievementsGallery from "./AchievementsGallery";
import ClientProjects from "./ClientProjects";
import ContactClosingChapter from "./ContactClosingChapter";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#introduction">
        Skip to content
      </a>

      <div className="portfolio-shell" id="page-top">
        <div
          className="portfolio-shell__atmosphere"
          aria-hidden="true"
        ></div>
        <div
          className="portfolio-shell__texture"
          aria-hidden="true"
        ></div>

        {/* HEADER */}
        <header className="site-header" id="site-header">
          <div className="site-header__topline" aria-hidden="true"></div>

          <div className="site-header__inner">
            <a
              className="site-logo"
              href="#page-top"
              aria-label="Ashraful Islam, top of page"
            >
              <img
                className="site-logo__image"
                src="/assets/brand/ashraf-monogram.webp"
                width="57"
                height="54"
                alt=""
                decoding="async"
              />

              <span className="site-logo__caption">
                ASHRAFUL<br />
                ISLAM
              </span>
            </a>

            <p className="site-header__folio">
              AI &amp; ML PORTFOLIO
              <span className="micro-star" aria-hidden="true">✦</span>
              EST. 2026
            </p>

            <nav className="site-nav" aria-label="Primary navigation">
              <a href="#beyond-title">
                PROFILE <span aria-hidden="true">↗</span>
              </a>
              <a href="#skills">
                SKILLS <span aria-hidden="true">↗</span>
              </a>
              <a href="#experience">
                EXPERIENCE <span aria-hidden="true">↗</span>
              </a>
              <a href="#selected-work">
                PROJECTS <span aria-hidden="true">↗</span>
              </a>
              <a href="#research">
                RESEARCH <span aria-hidden="true">↗</span>
              </a>
              <a title="NextGen AI: engineering notes on RAG, agents, MLOps, Docker and AWS" href="/NextGen-AI/">
                NEXTGEN AI DOCS <span aria-hidden="true">↗</span>
              </a>
              <a className="site-nav__contact" href="#contact">
                LET'S CONNECT <span aria-hidden="true">↗</span>
              </a>
            </nav>

            <details className="mobile-menu" id="mobile-menu">
              <summary>
                <span className="mobile-menu__label">MENU</span>
                <span className="mobile-menu__glyph" aria-hidden="true">
                  <i></i>
                  <i></i>
                </span>
              </summary>

              <nav
                className="mobile-menu__panel"
                aria-label="Mobile navigation"
              >
                <a href="#beyond-title">
                  PROFILE <span aria-hidden="true">↗</span>
                </a>

                <a href="#skills">
                  SKILLS <span aria-hidden="true">↗</span>
                </a>

                <a href="#experience">
                  EXPERIENCE <span aria-hidden="true">↗</span>
                </a>

                <a href="#selected-work">
                  PROJECTS <span aria-hidden="true">↗</span>
                </a>

                <a href="#research">
                  RESEARCH <span aria-hidden="true">↗</span>
                </a>

                <a href="#education">
                  EDUCATION <span aria-hidden="true">↗</span>
                </a>

                <a href="/NextGen-AI/">
                  NEXTGEN AI DOCS <span aria-hidden="true">↗</span>
                </a>

                <a href="#contact">
                  LET'S CONNECT <span aria-hidden="true">↗</span>
                </a>
              </nav>
            </details>
          </div>
        </header>

        <main id="introduction">
          {/* HERO */}
          <section
            className="hero"
            aria-labelledby="hero-name"
            data-hero
          >
            <div className="hero__stage" data-depth-root>
              <div className="hero__grid-lines" aria-hidden="true">
                <span></span>
                <span></span>
              </div>

              {/* Burgundy background orb */}
              <div
                className="hero__orb-depth"
                aria-hidden="true"
                data-depth="orb"
              >
                <div className="hero__orb-reveal">
                  <div className="hero__orb">
                    <div className="hero__orb-sheen"></div>
                  </div>
                </div>
              </div>

              {/* Oversized editorial background headline */}
              <div
                className="hero__masthead-depth"
                aria-hidden="true"
                data-depth="type"
              >
                <div className="hero__masthead-mask">
                  <p className="hero__masthead" data-enter="headline">
                    <span className="hero__masthead-pre">
                      AI ENGINEERING
                    </span>
                    <span className="hero__masthead-core">
                      &amp; MLOPS
                    </span>
                  </p>
                </div>
              </div>

              {/* Foreground portrait */}
              <div
                className="hero__portrait-depth"
                data-depth="portrait"
              >
                <div
                  className="hero__portrait-reveal"
                  data-enter="portrait"
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/assets/ashraf-hero-cutout.webp"
                    />

                    <img
                      className="hero__portrait"
                      src="/assets/ashraf-hero-cutout.webp"
                      width="1122"
                      height="1402"
                      alt="Ashraful Islam, AI Engineer"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                  <span className="hero__portrait-grade" aria-hidden="true"></span>
                  <span className="hero__portrait-rim" aria-hidden="true"></span>
                </div>
              </div>

              {/* Left editorial note */}
              <div
                className="hero__side hero__side--left"
                data-enter="left"
              >
                <div className="hero__side-line"></div>

                <span className="eyebrow">
                  FROM RESEARCH<br />
                  TO PRODUCTION
                </span>

                <p className="hero__side-manifesto">
                  MODELS<br />
                  <em>MADE</em><br />
                  REAL<span className="accent-dot">.</span>
                </p>

                <span
                  className="hero__side-mark"
                  aria-hidden="true"
                ></span>
              </div>

              {/* Right career note: readable above masthead */}
              <div
                className="hero__side hero__side--right"
                data-enter="right"
              >
                <div className="hero__side-line"></div>

                <span className="eyebrow">
                  CURRENT POSITIONS<br />
                  &amp; PRACTICE
                </span>

                <ol
                  className="hero__role-list"
                  aria-label="Professional positions"
                >
                  <li>
                    <span className="hero__role-index">01</span>

                    <span className="hero__role-copy">
                      <strong>
                        ML &amp; DATAOPS<br />
                        INTERN
                      </strong>
                      <small>PORIDHI.IO</small>
                    </span>
                  </li>

                  <li>
                    <span className="hero__role-index">02</span>

                    <span className="hero__role-copy">
                      <strong>
                        AI RESEARCHER<br />
                        &amp; FULL STACK
                      </strong>
                      <small>CUET · 7 PAPERS</small>
                    </span>
                  </li>
                </ol>
              </div>

              {/* Foreground nameplate */}
              <div
                className="hero__nameplate"
                data-enter="name"
              >
                <p className="hero__given-name">
                  ASHRAFUL
                </p>

                <h1 className="hero__surname" id="hero-name">
                  ISLAM
                </h1>

                <div
                  className="hero__name-rule"
                  aria-hidden="true"
                >
                  <span></span>
                </div>

                <p className="hero__profession">
                  AI ENGINEER
                  <span aria-hidden="true">/</span>
                  MLOPS &amp; FULL STACK
                </p>
              </div>

              {/* Lower stage notes */}
              <div
                className="hero__lower-left"
                data-enter="foot-left"
              >
                <span className="hero__small-line" aria-hidden="true"></span>

                <p>
                  ENGINEERING WITH<br />
                  INTENTION<span className="accent-dot">.</span>
                </p>

                <span className="hero__lower-sub">
                  CHITTAGONG / DHAKA
                  <span aria-hidden="true">↗</span>
                </span>
              </div>

              <div
                className="hero__lower-right"
                data-enter="foot-right"
              >
                <span className="hero__small-line" aria-hidden="true"></span>

                <p>
                  TRANSFORMERS &amp;<br />
                  AGENTIC AI<span className="accent-dot">.</span>
                </p>

                <span className="hero__lower-sub">
                  RESEARCH &amp; PRODUCTION
                </span>
              </div>
            </div>

            {/* Hero actions */}
            <div
              className="hero__bottom-strip"
              data-enter="bottom"
            >
              <span className="hero__bottom-folio">
                <i aria-hidden="true"></i>
                001
                <span className="hero__bottom-slash">/</span>
                INTRODUCTION
              </span>

              <div className="hero__action-group">
                <a
                  className="hero__cta"
                  href="#selected-work"
                >
                  <span>EXPLORE SELECTED WORK</span>
                  <span
                    className="hero__cta-arrow"
                    aria-hidden="true"
                  >↗</span>
                </a>

                <a
                  className="hero__cv-link"
                  href="/Ashraful_Islam_AI_Engineer_CV.pdf"
                  download="Ashraful_Islam_AI_Engineer_CV.pdf"
                  aria-label="Download Ashraful Islam CV as PDF"
                >
                  <span>DOWNLOAD CV</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>

              <a
                className="hero__bottom-scroll"
                href="#beyond-title"
                aria-label="Scroll to About"
              >
                <span
                  className="hero__scroll-motif"
                  aria-hidden="true"
                >↓</span>
                THE STORY CONTINUES
              </a>
            </div>
          </section>

          {/* Remaining portfolio sections */}
          <BeyondTitle />
          <CleanSkills />
          <CleanExperience />
          <CleanProjects />
          <CleanResearch />
          <AchievementsGallery />
          <ClientProjects />
          <CleanEducation />
          <ContactClosingChapter />
        </main>
      </div>
    </>
  );
}
