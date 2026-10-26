import { cx, css } from "../utils/jsx";
import { researchRecords, unmatchedManuscripts } from '../data/research';
import { cloudinarySrcset } from '../utils/cloudinaryImages';

export default function ResearchPublicationsShowcase() {
const N = researchRecords.length;
const first = researchRecords[0];
  return (
<>
<section className="rgl" id="research" data-research-liquid aria-labelledby="rgl-title">
  <div className="rgl__aura" aria-hidden="true"></div>
  <div className="rgl__grain" aria-hidden="true"></div>

  <div className="rgl__wrap">
    <div className="rgl__folio">
      <span><i className="rgl__live-dot" aria-hidden="true"></i> 05 / THE RESEARCH ARCHIVE</span>
      <span className="rgl__folio-rule"></span>
      <span>ASHRAFUL ISLAM <b aria-hidden="true">✳</b> MMXXVI</span>
    </div>

    <div className="rgl__head">
      <div>
        <p className="rgl__eyebrow">SCHOLARLY WORK / ALWAYS QUESTIONING <span aria-hidden="true">↗</span></p>
        <h2 id="rgl-title">BEYOND<br /><em>THE CODE.</em></h2>
      </div>
      <div className="rgl__head-aside">
        <span>THE ART OF INVESTIGATION / 2026</span>
        <p>Ideas made testable. Questions turned into research. An evolving archive of conference papers, proposals and investigations.</p>
        <div className="rgl__stats" aria-label="Research overview">
          <span><b>07</b><small>PUBLICATIONS</small></span>
          <span><b>IEEE</b><small>CONFERENCES</small></span>
          <span className="rgl__stats-sign" aria-hidden="true">✳</span>
        </div>
      </div>
    </div>

    <div className="rgl__theatre" data-rgl-theatre tabIndex="-1">
      <div className="rgl__ambient rgl__ambient--a" aria-hidden="true"></div>
      <div className="rgl__ambient rgl__ambient--b" aria-hidden="true"></div>
      <div className="rgl__orbit-ring rgl__orbit-ring--one" aria-hidden="true"></div>
      <div className="rgl__orbit-ring rgl__orbit-ring--two" aria-hidden="true"></div>
      <div className="rgl__theatre-watermark" aria-hidden="true">A <span>/</span> 05</div>
      <div className="rgl__theatre-top">
        <span><i className="rgl__live-dot" aria-hidden="true"></i> RESEARCH FREQUENCY / ON AIR</span>
        <span>ENDLESS ORBIT <b aria-hidden="true">↗</b></span>
      </div>

      <div className="rgl__orbit-window" data-rgl-orbit aria-label="Interactive continuously moving research carousel; hover over a paper to pause movement">
        <div className="rgl__orbit" data-rgl-track>
          {researchRecords.map((paper, index) => (
            <article className="rgl__orbit-item" data-rgl-card={index} style={css(`--rgl-accent:${paper.accent}`)}>
              <div className="rgl__card-flip">
                <div className="rgl__face rgl__face--front" data-rgl-front>
                  <div className="rgl__art">
                    <img src={paper.cover} srcSet={cloudinarySrcset(paper.cover, [320, 480, 740])} sizes="(max-width: 680px) 72vw, 270px" alt="" width="740" height="700" draggable="false" loading="lazy" decoding="async" />
                    <span className="rgl__art-shine" aria-hidden="true"></span>
                    <span className="rgl__art-meta">RESEARCH / {paper.index}</span>
                    <span className="rgl__art-year">{paper.year}</span>
                    <span className="rgl__art-monogram" aria-hidden="true">A<span>✳</span></span>
                  </div>
                  <div className="rgl__front-caption">
                    <span>{paper.domain}</span>
                    <strong>{paper.shortTitle}</strong>
                    <p className="rgl__front-full-title">{paper.title}</p>
                    <small>{paper.status}</small>
                  </div>
                  <button className="rgl__pick" type="button" data-rgl-pick={index} aria-label={`Open research paper ${paper.title}, flip card to details`}>
                    <span className="rgl__pick-icon" aria-hidden="true">↗</span>
                  </button>
                </div>

                <div className="rgl__face rgl__face--back" data-rgl-back aria-hidden="true" inert>
                  <div className="rgl__back-top">
                    <span>THE RESEARCH DOSSIER <i aria-hidden="true">✳</i></span>
                    <button type="button" className="rgl__close" data-rgl-close={index} aria-label={`Close ${paper.shortTitle} details`}>×</button>
                  </div>
                  <div className="rgl__back-scroll" data-lenis-prevent>
                    <div className="rgl__back-status" data-rgl-status-kind={paper.statusKind}>{paper.status}</div>
                    <span className="rgl__back-index">{paper.index} / {String(N).padStart(2,'0')} &nbsp; · &nbsp; {paper.domain}</span>
                    <h3>{paper.title}</h3>
                    <p className="rgl__back-venue">{paper.venue}</p>
                    <div className="rgl__back-divider"></div>
                    <div className="rgl__back-label">THE RESEARCH</div>
                    <p className="rgl__abstract">{paper.abstract}</p>
                    {paper.authors && <p className="rgl__authors"><span>RESEARCH AUTHORS</span>{paper.authors}</p>}
                    <div className="rgl__back-tags">{paper.tags.map(tag => <span>{tag}</span>)}</div>
                    <p className="rgl__disclaimer">{paper.statusDetail}</p>
                    {paper.links.length ? (
                      <div className="rgl__back-links">
                        {paper.links.map(link => <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.note}>{link.label} <span aria-hidden="true">↗</span></a>)}
                      </div>
                    ) : (
                      <div className="rgl__link-unavailable" aria-label="No verified public paper link">PUBLIC PAPER LINK NOT VERIFIED <span aria-hidden="true">↗</span></div>
                    )}
                  </div>
                  <div className="rgl__back-bottom">ASHRAF / A STUDY IN POSSIBILITY <span>{paper.year}</span></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rgl__orbit-hint" aria-hidden="true"><span>←</span> HOVER A PAPER TO PAUSE · CLICK TO FLIP <span>→</span></div>
      <div className="rgl__theatre-floor" aria-hidden="true"></div>
    </div>

    <div className="rgl__player" data-rgl-player aria-label="Research carousel controls">
      <div className="rgl__player-identity">
        <div className="rgl__player-cover"><img src={first.cover} alt="" loading="lazy" data-rgl-player-art width="740" height="700" /></div>
        <div className="rgl__player-copy">
          <span data-rgl-player-overline>NOW EXPLORING / {first.domain}</span>
          <strong data-rgl-player-title>{first.shortTitle}</strong>
          <small data-rgl-player-venue>{first.status}</small>
        </div>
      </div>
      <div className="rgl__transport">
        <button type="button" className="rgl__transport-arrow" data-rgl-prev aria-label="Previous paper">↶</button>
        <button type="button" className="rgl__transport-pause" data-rgl-toggle aria-label="Pause automatic carousel" aria-pressed="false"><span data-rgl-toggle-glyph>Ⅱ</span></button>
        <button type="button" className="rgl__transport-arrow" data-rgl-next aria-label="Next paper">↷</button>
      </div>
      <div className="rgl__player-right">
        <span className="rgl__player-count" data-rgl-player-count>01 <i>/</i> 07</span>
        <button type="button" className="rgl__explore" data-rgl-explore>EXPLORE RESEARCH <span aria-hidden="true">↗</span></button>
      </div>
      <div className="rgl__player-progress" aria-hidden="true"><i data-rgl-progress></i></div>
    </div>

    <div className="rgl__lower-row">
      <div className="rgl__lower-note">
        <span><i></i> THE RESEARCH CONTINUES</span>
        <p>Multiple accepted IEEE conference contributions. A wider practice of inquiry — from transformers and RAG to cybersecurity and computer vision.</p>
      </div>
      <details className="rgl__sources">
        <summary>SCHOLARLY REPOSITORIES &amp; PROFILES <span aria-hidden="true">+</span></summary>
        <div className="rgl__sources-body">
          <p>Explore full publications, citations, and co-authors across scholarly indexing networks:</p>
          <a href="https://scholar.google.com/citations?user=ashraf1600" target="_blank" rel="noopener noreferrer">GOOGLE SCHOLAR PROFILE <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/ashraf1600" target="_blank" rel="noopener noreferrer">GITHUB RESEARCH REPOSITORIES <span aria-hidden="true">↗</span></a>
          <small>Peer-reviewed conference proceedings and preprints indexed across IEEE Xplore.</small>
        </div>
      </details>
    </div>
    <div className="rgl__outro"><span>ASHRAF — SELECTED RESEARCH / 2026</span><span>THE NEXT CHAPTER IS BUILT ON QUESTIONS <i aria-hidden="true">✳</i></span></div>
  </div>
  <span className="rgl__sr-only" data-rgl-live role="status" aria-live="polite"></span>
</section>
</>
  );
}
