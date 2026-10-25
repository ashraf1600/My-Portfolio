import { cx, css } from "../utils/jsx";
import { achievements } from '../data/achievements';
import { cloudinarySrcset, cloudinaryResized } from '../utils/cloudinaryImages';

export default function AchievementsGallery() {

  return (
<>
<section id="achievements" className="aw" data-achievements aria-labelledby="aw-title">
  <div className="aw__texture" aria-hidden="true"></div>
  <div className="aw__halo" aria-hidden="true"></div>
  <div className="aw__shell">
    <div className="aw__folio">
      <span className="aw__folio-start"><i aria-hidden="true"></i> 07 / HONOURS &amp; DISTINCTIONS</span>
      <span className="aw__folio-line"></span>
      <span>THREE MOMENTS, DOCUMENTED.</span>
    </div>
    <header className="aw__intro">
      <div className="aw__intro-title">
        <p className="aw__eyebrow">BEYOND THE BUILD / THE RECOGNITION <span aria-hidden="true">✳</span></p>
        <h2 id="aw-title">THE PROOF<br /><em>IS IN THE WORK.</em></h2>
      </div>
      <div className="aw__intro-aside">
        <span className="aw__aside-index">03 <small>RECOGNITIONS</small></span>
        <p>Not a list of claims. A record of real milestones — the papers, the rankings, and the systems that prove it.</p>
        <span className="aw__aside-sign">THE RECORD / 2025—2026 <b>↗</b></span>
      </div>
    </header>

    <div className="aw__theater" data-aw-theater>
      <div className="aw__theater-edge" aria-hidden="true"><span>EXHIBIT / RECOGNITION</span><span>PROOF ARCHIVE — 001</span></div>
      <div className="aw__theater-grid">
        <div className="aw__exhibit" data-aw-exhibit>
          <div className="aw__exhibit-matte" aria-hidden="true"></div>
          <div className="aw__exhibit-watermark" aria-hidden="true">A<span>✳</span></div>
          <div className="aw__photo-stack">
            {achievements.map((entry, i) => (
              <figure className={cx(['aw__photo', i === 0 && 'is-active'])} data-aw-photo={i} hidden={i !== 0}>
                <img className="aw__photo-blur" src={entry.photo} alt="" loading="lazy" decoding="async" aria-hidden="true" />
                <img className="aw__photo-main" src={entry.photo} srcSet={cloudinarySrcset(entry.photo, [360, 640, 900, 1050])} sizes="(max-width: 680px) 92vw, (max-width: 1200px) 55vw, 700px" alt={entry.photoAlt} width={entry.photoWidth} height={entry.photoHeight} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
          <div className="aw__photo-vignette" aria-hidden="true"></div>
          <div className="aw__photo-header"><span><i></i> DOCUMENTED RECORD</span><span data-aw-evidence-counter>01 / 03</span></div>
          <div className="aw__photo-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          <button className="aw__photo-zoom" type="button" data-aw-zoom aria-label="Open full proof image">
            <span className="aw__zoom-icon" aria-hidden="true">↗</span><span>VIEW FULL PROOF</span>
          </button>
          <span className="aw__photo-caption" data-aw-photo-caption>{achievements[0].award}</span>
          <div className="aw__seal" aria-hidden="true"><span>A</span><i>✳</i></div>
        </div>

        <div className="aw__story-panel">
          <div className="aw__story-top"><span>THE RECOGNITION FILE</span><span data-aw-story-counter>01 — 03</span></div>
          <div className="aw__story-stack">
            {achievements.map((entry, i) => (
              <article className="aw__story" data-aw-story={i} hidden={i !== 0} aria-labelledby={`aw-award-${entry.id}`}>
                <div className="aw__story-overline"><span>{entry.level}</span><span>{entry.date}</span></div>
                <h3 id={`aw-award-${entry.id}`}><span>{entry.displayLines[0]}</span><span>{entry.displayLines[1]}</span></h3>
                <p className="aw__story-subtitle">{entry.subtitle}</p>
                <div className="aw__story-divider" aria-hidden="true"><span></span><i>✳</i></div>
                <p className="aw__story-lead">{entry.spotlight}</p>
                <p className="aw__story-description">{entry.detail}</p>
                <div className="aw__facts">
                  <div><small>PRESENTED BY</small><strong>{entry.issuer}</strong></div>
                  <div><small>WHEN</small><strong>{entry.date}</strong></div>
                </div>
                <div className="aw__story-actions">
                  <a className="aw__original" href={entry.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open the source record for ${entry.award} in a new tab`}>
                    VIEW SOURCE RECORD <span aria-hidden="true">↗</span>
                  </a>
                  <button className="aw__inspect" type="button" data-aw-inspect>
                    INSPECT PROOF <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <p className="aw__story-note">{entry.context}</p>
              </article>
            ))}
          </div>
          <div className="aw__story-tail" aria-hidden="true"><span>NOT CLAIMED. EARNED.</span><span>ASHRAF / ARCHIVE OF WORK</span></div>
        </div>
      </div>

      <div className="aw__rail-head"><span>THE DISTINCTION INDEX</span><span>SELECT A MOMENT <b>↗</b></span></div>
      <nav className="aw__award-nav" aria-label="Select an achievement">
        {achievements.map((entry, i) => (
          <button
            className={cx(['aw__award', i === 0 && 'is-active'])}
            type="button"
            data-aw-select={i}
            aria-pressed={i === 0 ? 'true' : 'false'}
            aria-label={`Show ${entry.award} achievement`}
          >
            <span className="aw__award-img"><img src={cloudinaryResized(entry.photo, 240)} alt="" loading="lazy" decoding="async" /></span>
            <span className="aw__award-info"><span className="aw__award-number">{entry.number} <i>/</i> 03</span><strong>{entry.award}</strong><small>{entry.issuer} · {entry.date}</small></span>
            <span className="aw__award-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </nav>
    </div>
    <footer className="aw__outro"><span>THE NEXT CHAPTER IS BUILT, NOT PROMISED.</span><span>ASHRAF / DISTINCTIONS <i aria-hidden="true">✳</i></span></footer>
  </div>

  <dialog className="aw__dialog" data-aw-dialog data-lenis-prevent aria-labelledby="aw-dialog-title">
    <div className="aw__dialog-content">
      <div className="aw__dialog-heading"><span><i></i> VERIFIED MOMENT / EVIDENCE FILE <span data-aw-dialog-no>01</span></span><button type="button" data-aw-close aria-label="Close proof viewer">✕ <span>CLOSE</span></button></div>
      <div className="aw__dialog-image-wrap"><img data-aw-dialog-image alt="" decoding="async" /></div>
      <div className="aw__dialog-bottom">
        <div><span>PROOF FILE</span><h3 id="aw-dialog-title" data-aw-dialog-title>{achievements[0].award}</h3><p data-aw-dialog-note>{achievements[0].issuer}</p></div>
        <a data-aw-dialog-link href="#" target="_blank" rel="noopener noreferrer">OPEN SOURCE RECORD <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </dialog>
  <span className="aw__sr" role="status" aria-live="polite" data-aw-announcement>Showing {achievements[0].award}</span>
</section>
</>
  );
}
