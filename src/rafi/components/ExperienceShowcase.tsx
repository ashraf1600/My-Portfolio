import { cx, css } from "../utils/jsx";
import { experienceOrganizations } from '../data/experience';
import { cloudinarySrcset, cloudinaryResized } from '../utils/cloudinaryImages';

export default function ExperienceShowcase() {
const [first] = experienceOrganizations;
  return (
<>
<section className="xp" id="experience" data-experience aria-labelledby="xp-title">
  <div className="xp__intro">
    <div className="xp__intro-folio">
      <span><span className="xp__signal" aria-hidden="true"></span> 06 / THE JOURNEY</span>
      <span className="xp__intro-rule" aria-hidden="true"></span>
      <span>ENGINEERING · COLLABORATION · LEADERSHIP</span>
    </div>
    <div className="xp__intro-grid">
      <div>
        <p className="xp__intro-kicker">THE PLACES I BUILD WITH <span aria-hidden="true">✳</span></p>
        <h2 id="xp-title">WORK IN<br/><em>PROGRESS.</em></h2>
      </div>
      <p>From production engineering to ambitious startups and university leadership. Three chapters, one enduring obsession: <em>building things that matter.</em></p>
    </div>
  </div>

  <div className="xp__stage xp__stage--datapulse" data-xp-stage style={css(`--xp-accent:${first.accent}`)}>
    <div className="xp__backdrops" aria-hidden="true">
      {experienceOrganizations.map((org, index) => (
        <img
          className={cx(['xp__backdrop', index === 0 && 'is-active'])}
          data-xp-background={index}
          src={org.background} srcSet={cloudinarySrcset(org.background, [640, 960, 1280, 1599])} sizes="100vw"
          alt=""
          width="1599"
          height="900"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
    <div className="xp__scrim" aria-hidden="true"></div>
    <div className="xp__grain" aria-hidden="true"></div>
    <div className="xp__expander" data-xp-expander aria-hidden="true">
      <img data-xp-expand-image alt="" width="1599" height="900" />
      <span className="xp__expander-scrim"></span>
    </div>

    <div className="xp__stage-folio" aria-hidden="true">
      <span>ASHRAF / PROFESSIONAL CHAPTERS</span>
      <span>SELECT TO EXPLORE <b>↗</b></span>
    </div>

    <div className="xp__narrative" data-xp-narrative>
      {experienceOrganizations.map((org, index) => (
        <article className="xp__story" data-xp-story={index} hidden={index !== 0} aria-labelledby={`xp-org-${org.id}`}>
          <div className="xp__story-topline">
            <span className="xp__story-kicker">{org.eyebrow}</span>
            <span className="xp__story-location">{org.arrangement}</span>
          </div>
          <h3 id={`xp-org-${org.id}`} className="xp__story-name">{org.name === 'AUST Robotics Club' ? <>AUST<br/>ROBOTICS CLUB</> : org.name}</h3>
          <div className="xp__position-row">
            <p className="xp__position">{org.role}</p>
            <span className="xp__position-date">{org.dates}</span>
          </div>
          <p className="xp__description">{org.introduction}</p>
          <div className="xp__work-head"><span>SELECTED CONTRIBUTIONS</span><span aria-hidden="true">↘</span></div>
          <ol className="xp__project-list">
            {org.projects.map((project, i) => (
              <li className="xp__project">
                <span className="xp__project-number">{String(i + 1).padStart(2, '0')}</span>
                <div className="xp__project-main">
                  <strong>{project.name}</strong>
                  <span>{project.note}</span>
                </div>
                {project.label && <span className="xp__project-badge">{project.label}</span>}
              </li>
            ))}
          </ol>
          {org.progression && (
            <div className="xp__career">
              <div className="xp__career-heading">LEADERSHIP TIMELINE <span>2025 → PRESENT</span></div>
              <ol className="xp__career-steps">
                {org.progression.map((step, i) => (
                  <li className={cx(['xp__career-step', i === org.progression!.length - 1 && 'is-current'])}>
                    <span className="xp__career-pin" aria-hidden="true"></span>
                    <strong>{step.position}</strong><small>{step.period}</small>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <span className="xp__story-footnote">{org.location} <span aria-hidden="true">✳</span> BUILDING WITH INTENTION</span>
        </article>
      ))}
    </div>

    <nav className="xp__dock" aria-label="Choose a company">
      {experienceOrganizations.map((org, index) => (
        <button
          className={cx(['xp__company-card', index === 0 && 'is-active'])}
          data-xp-select={index}
          type="button"
          aria-pressed={index === 0 ? 'true' : 'false'}
          aria-label={`Show ${org.name} experience`}
          style={css(`--xp-card-accent:${org.accent}`)}
        >
          <img src={cloudinaryResized(org.background, 480)} srcSet={cloudinarySrcset(org.background, [240, 480, 720])} sizes="(max-width: 700px) 42vw, 260px" alt="" loading="lazy" decoding="async" width="1599" height="900" />
          <span className="xp__card-shade" aria-hidden="true"></span>
          <span className="xp__card-number">0{index + 1} / 03</span>
          <span className="xp__card-title">{org.short}</span>
          <span className="xp__card-role">{org.role}</span>
          <span className="xp__card-arrow" aria-hidden="true">↗</span>
        </button>
      ))}
    </nav>

    <div className="xp__stage-bottom">
      <div className="xp__switcher" role="group" aria-label="Experience navigation">
        <button type="button" data-xp-prev aria-label="Previous company">← <span>PREVIOUS</span></button>
        <span className="xp__counter" data-xp-counter>01 <span>/ 03</span></span>
        <button type="button" data-xp-next aria-label="Next company"><span>NEXT</span> →</button>
      </div>
      <div className="xp__swatches" aria-hidden="true"><i className="is-active"></i><i></i><i></i></div>
      <span className="xp__stage-end">THE EXPERIENCE CONTINUES <b aria-hidden="true">↗</b></span>
    </div>
  </div>
  <div className="xp__outro"><span>THREE ENVIRONMENTS. ONE COMMITMENT TO THE CRAFT.</span><span>CONTINUALLY EVOLVING / 2026 <i aria-hidden="true">✳</i></span></div>
  <span className="xp__sr-only" data-xp-status role="status" aria-live="polite">Showing DataPulse Global experience</span>
</section>
</>
  );
}
