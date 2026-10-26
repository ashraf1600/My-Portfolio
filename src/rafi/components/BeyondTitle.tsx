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

            {/* Education timeline */}
            <div
              className="bt__education"
              aria-labelledby="bt-education-title"
            >
              <div
                className="bt__education-heading"
                data-bt-reveal
              >
                <div>
                  <p className="bt__overline">
                    <span className="bt__index">01 —</span>
                    A CHRONOLOGY
                  </p>

                  <h3
                    className="bt__timeline-title"
                    id="bt-education-title"
                  >
                    THE PATH
                    <em>so far.</em>
                  </h3>
                </div>

                <span className="bt__milestone-count">
                  03 / MILESTONES
                </span>
              </div>

              <div
                className="bt__timeline"
                data-bt-timeline
              >
                <div
                  className="bt__timeline-rail"
                  aria-hidden="true"
                >
                  <span className="bt__timeline-progress"></span>
                </div>

                <ol className="bt__events">
                  {/* UNIVERSITY */}
                  <li
                    className="bt__event bt__event--left"
                    data-bt-reveal
                  >
                    <span
                      className="bt__event-join"
                      aria-hidden="true"
                    ></span>

                    <span
                      className="bt__event-node"
                      aria-hidden="true"
                    >
                      <span></span>
                    </span>

                    <article
                      className="bt__glass bt__milestone"
                      aria-label="Chittagong University of Engineering and Technology, 2023 to present"
                    >
                      <div
                        className="bt__glass-light"
                        aria-hidden="true"
                      ></div>

                      <div className="bt__milestone-date">
                        <span>2023</span>
                        <span className="bt__date-dash">—</span>
                        <span>NOW</span>
                      </div>

                      <div className="bt__milestone-content">
                        <span className="bt__milestone-eyebrow">
                          UNIVERSITY / CURRENT
                        </span>

                        <h4>
                          Chittagong University of Engineering
                          &amp; Technology (CUET)<span className="bt__punct">.</span>
                        </h4>

                        <p className="bt__milestone-description">
                          B.Sc. in Computer Science &amp; Engineering
                          · Final-year undergraduate researcher with 7 publications
                        </p>
                      </div>

                      <span
                        className="bt__milestone-number"
                        aria-hidden="true"
                      >01</span>
                    </article>
                  </li>

                  {/* HIGHER SECONDARY */}
                  <li
                    className="bt__event bt__event--right"
                    data-bt-reveal
                  >
                    <span
                      className="bt__event-join"
                      aria-hidden="true"
                    ></span>

                    <span
                      className="bt__event-node"
                      aria-hidden="true"
                    >
                      <span></span>
                    </span>

                    <article
                      className="bt__glass bt__milestone"
                      aria-label="Dhaka City College, 2019 to 2021"
                    >
                      <div
                        className="bt__glass-light"
                        aria-hidden="true"
                      ></div>

                      <div className="bt__milestone-date">
                        <span>2019</span>
                        <span className="bt__date-dash">—</span>
                        <span>2021</span>
                      </div>

                      <div className="bt__milestone-content">
                        <span className="bt__milestone-eyebrow">
                          HIGHER SECONDARY
                        </span>

                        <h4>
                          Dhaka City College<span className="bt__punct">.</span>
                        </h4>

                        <p className="bt__milestone-description">
                          Higher Secondary Certificate (HSC) · Science · Perfect GPA 5.00
                        </p>
                      </div>

                      <span
                        className="bt__milestone-number"
                        aria-hidden="true"
                      >02</span>
                    </article>
                  </li>

                  {/* SECONDARY SCHOOL */}
                  <li
                    className="bt__event bt__event--left"
                    data-bt-reveal
                  >
                    <span
                      className="bt__event-join"
                      aria-hidden="true"
                    ></span>

                    <span
                      className="bt__event-node"
                      aria-hidden="true"
                    >
                      <span></span>
                    </span>

                    <article
                      className="bt__glass bt__milestone"
                      aria-label="Cox's Bazar Government High School, 2017 to 2019"
                    >
                      <div
                        className="bt__glass-light"
                        aria-hidden="true"
                      ></div>

                      <div className="bt__milestone-date">
                        <span>2017</span>
                        <span className="bt__date-dash">—</span>
                        <span>2019</span>
                      </div>

                      <div className="bt__milestone-content">
                        <span className="bt__milestone-eyebrow">
                          EARLY FOUNDATIONS
                        </span>

                        <h4>
                          Cox's Bazar Government
                          High School<span className="bt__punct">.</span>
                        </h4>

                        <p className="bt__milestone-description">
                          Secondary School Certificate (SSC) · Science · Strong academic foundation
                        </p>
                      </div>

                      <span
                        className="bt__milestone-number"
                        aria-hidden="true"
                      >03</span>
                    </article>
                  </li>
                </ol>

                <div
                  className="bt__rail-start"
                  aria-hidden="true"
                >
                  ORIGIN
                </div>
              </div>
            </div>
          </div>

          {/* Closing rule */}
          <div
            className="bt__end-rule"
            aria-hidden="true"
          >
            <span></span>
            <span>END / 01 — THE STORY SO FAR</span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
}
