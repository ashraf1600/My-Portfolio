import { cx, css } from "../utils/jsx";

export default function BeyondTitle() {
  return (
    <>
      <section
        className="bt"
        id="beyond-title"
        aria-labelledby="bt-title"
        data-beyond-title
      >
        <div className="bt__atmosphere" aria-hidden="true"></div>
        <div className="bt__aura" aria-hidden="true"></div>
        <div className="bt__outline" aria-hidden="true">01</div>

        <div className="bt__wrap">
          {/* Chapter heading */}
          <div className="bt__chapter" data-bt-reveal>
            <span className="bt__chapter-index">
              <span
                className="bt__chapter-dot"
                aria-hidden="true"
              ></span>
              002
              <span className="bt__slash">/</span>
              BEYOND THE TITLE
            </span>

            <span
              className="bt__chapter-rule"
              aria-hidden="true"
            ></span>

            <span className="bt__chapter-edition">
              THE PERSON BEHIND THE WORK
              <span aria-hidden="true">✳</span>
              2026
            </span>
          </div>

          <div className="bt__columns">
            {/* Introduction */}
            <div
              className="bt__introduction"
              aria-labelledby="bt-title"
              data-bt-intro
            >
              <div className="bt__intro-top" data-bt-reveal>
                <span
                  className="bt__intro-mark"
                  aria-hidden="true"
                >✳</span>

                <span className="bt__overline">
                  WHO I AM
                  <span aria-hidden="true">/</span>
                  THE SHORT VERSION
                </span>
              </div>

              <div
                className="bt__intro-title-wrap"
                data-bt-reveal
              >
                <h2
                  className="bt__intro-title"
                  id="bt-title"
                >
                  BEYOND<br />
                  <span className="bt__title-second">
                    <em>the</em>
                    TITLE<span className="bt__punct">.</span>
                  </span>
                </h2>
              </div>

              <div className="bt__intro-copy" data-bt-reveal>
                <p className="bt__lead">
                  I'm <strong>Ashraful Islam</strong> —
                  a final-year Computer Science &amp; Engineering undergraduate at CUET and an
                  AI &amp; ML engineer focused on turning ambitious models into reliable production software.
                </p>

                <p>
                  At <strong>Poridhi.io</strong>, I contribute
                  as a Machine Learning &amp; DataOps Intern, engineering automated preprocessing pipelines and containerized FastAPI inference endpoints. Previously at
                  <strong> Synesis IT PLC</strong>, I researched and developed NoteCheck — an AI banknote authentication system powered by Vision Transformers. My work bridges empirical research with scalable cloud delivery.
                </p>
              </div>

              {/* Personal engineering philosophy */}
              <div
                className="bt__belief bt__glass"
                data-bt-reveal
              >
                <div
                  className="bt__glass-light"
                  aria-hidden="true"
                ></div>

                <div
                  className="bt__belief-asterisk"
                  aria-hidden="true"
                >“</div>

                <p>
                  Real AI engineering isn't just training models in notebooks —
                  it's taking them from <em>rigorous research</em> into resilient, low-latency production systems that solve real problems.
                </p>

                <span>THE MINDSET / RESEARCH TO PRODUCTION</span>
              </div>

              <div
                className="bt__intro-footer"
                data-bt-reveal
              >
                <div className="bt__intro-footer-signature">
                  <span aria-hidden="true">
                    A<span className="bt__punct">.</span>
                  </span>

                  <span>
                    ASHRAFUL ISLAM
                    <small>CHITTAGONG / DHAKA, BANGLADESH</small>
                  </span>
                </div>

                <a
                  className="bt__intro-link"
                  href="https://github.com/ashraf1600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EXPLORE THE WORK
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Closing rule */}
          <div
            className="bt__end-rule"
            aria-hidden="true"
          >
            <span></span>
            <span>END / 02 — ABOUT</span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
}
