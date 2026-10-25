import { cx, css } from "../utils/jsx";
import { selectedProjects, projectGroups } from '../data/selectedProjects';
import { cloudinaryProjectCover, cloudinaryProjectCoverSrcSet } from '../utils/cloudinaryImages';

export default function SelectedProjects() {

  return (
<>
<section id="selected-work" className="sw" data-selected-work aria-labelledby="sw-title">
  <div className="sw__grain" aria-hidden="true"></div>
  <div className="sw__shell">
    <div className="sw__folio">
      <span><i></i> 04 / SELECTED PROJECTS</span>
      <span className="sw__folio-rule"></span>
      <span>THE WORK / 2026</span>
    </div>
    <header className="sw__intro">
      <div>
        <p className="sw__eyebrow">PROJECTS &nbsp; <span>✳</span> &nbsp; THE CURATED ARCHIVE</p>
        <h2 id="sw-title" className="sw__headline">THE WORK<br/><em>IN MOTION.</em></h2>
      </div>
      <div className="sw__intro-aside">
        <span className="sw__intro-num">{selectedProjects.length}<sup>PROJECTS</sup></span>
        <p>Systems, platforms, useful tools and playful ideas, built to solve different kinds of problems.</p>
        <span>SCROLL TO EXPLORE <b>↘</b></span>
      </div>
    </header>
    <p className="sw__visual-disclaimer" role="note"><span aria-hidden="true">✳</span> <strong>REAL PRODUCT VISUALS</strong> — Every project cover is a screenshot of the <strong>actual application I built.</strong></p>
    <div className="sw__filters" role="group" aria-label="Filter projects by category">
      <span className="sw__filters-label">FILTER THE ARCHIVE /</span>
      <div className="sw__filters-list">
        {projectGroups.map(group => (
          <button type="button" className={cx(['sw__filter',group.key==='all'&&'is-active'])} data-sw-filter={group.key} aria-pressed={group.key==='all'}>
            <span>{group.name}</span><small>{String(group.count).padStart(2,'0')}</small>
          </button>
        ))}
      </div>
    </div>
  </div>
  <div className="sw__cinema" data-sw-cinema>
    {/* Three seamless independent headline tracks. Alternate directions; never paused by card hover. */}
    <div className="sw__wall" aria-hidden="true">
      {['CREATIVE WORK — CURATED STORIES — ', 'ENGINEERED IDEAS — BUILT WITH PURPOSE — ', 'DESIGN IN MOTION — PROJECT ARCHIVE — '].map((words, i) => (
        <div className={cx(['sw__wall-row', `sw__wall-row--${i+1}`])}>
          <div className="sw__wall-track"><span>{words}</span><span>{words}</span></div>
        </div>
      ))}
    </div>
    <div className="sw__cinema-red" aria-hidden="true"></div>
    <div className="sw__fade sw__fade--top" aria-hidden="true"></div>
    <div className="sw__fade sw__fade--bottom" aria-hidden="true"></div>
    <div className="sw__reel" data-sw-reel>
      {selectedProjects.map((project,index)=>{
        const angle=[-7,5,-4,7,-6,3][index%6];
        const offset=[-24,28,-15,35,-27,19][index%6];
        return (
          <article
            className={cx(['sw__item',`sw__item--${project.tone}`])}
            data-sw-item
            data-sw-project={project.slug}
            data-sw-group={project.group}
            data-sw-index={index}
            style={css(`--sw-angle:${angle}deg;--sw-x:${offset}px;`)}
          >
            <a className="sw__card-link" data-sw-open href={project.repo} target="_blank" rel="noopener noreferrer" aria-haspopup="dialog" aria-label={`Explore ${project.title}, project details and technology stack`}>
              <div className="sw__plate">
                <div className="sw__plate-upper">
                  <div className="sw__plate-identity"><span className="sw__plate-kicker">ASHRAF / SELECTED WORK</span><strong>{project.title}</strong></div>
                  <span className="sw__plate-count">{String(index+1).padStart(2,'0')} — {String(selectedProjects.length).padStart(2,'0')}</span>
                </div>
                {/* Each plate shows a screenshot of that project. */}
                <div className="sw__mockup" aria-hidden="true">
                  <img
                    src={cloudinaryProjectCover(project.slug)}
                    srcSet={cloudinaryProjectCoverSrcSet(project.slug)}
                    sizes="(max-width: 700px) 94vw, (max-width: 1200px) 72vw, 775px"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="1400"
                    height="788"
                  />
                  <span className="sw__mockup-tag">PRODUCT SCREENSHOT</span>
                </div>
                <div className="sw__plate-bottom"><div><small>{project.kicker}</small><strong>{project.title}</strong></div><span>VIEW PROJECT <b>↗</b></span></div>
              </div>
            </a>
          </article>
        );
      })}
    </div>
    <div className="sw__cinema-foot" aria-hidden="true"><span>IN MOTION / 04</span><span>SELECT A PROJECT TO EXPLORE</span></div>
  </div>
  <div className="sw__shell">
    <div className="sw__controls">
      <div className="sw__controls-note"><i></i><span>AN EVER-EVOLVING ARCHIVE OF REAL PROJECTS.</span></div>
      <span className="sw__state" data-sw-state role="status" aria-live="polite">READY TO EXPLORE</span>
      <button className="sw__pause" type="button" data-sw-pause aria-pressed="false">Ⅱ &nbsp; PAUSE MOTION</button>
    </div>
    <footer className="sw__footer"><span>HAVE A PROJECT IN MIND?</span><a href="https://github.com/ashraf1600" target="_blank" rel="noopener noreferrer">EXPLORE ALL REPOSITORIES ↗</a></footer>
  </div>

  <dialog className="sw__dialog" data-sw-dialog aria-labelledby="sw-dialog-title" aria-describedby="sw-dialog-description">
    <div className="sw__modal" data-sw-modal>
      <div className="sw__modal-top">
        <div><span className="sw__modal-dot"></span> <span>ASHRAF / PROJECT DOSSIER</span></div>
        <button type="button" className="sw__close" data-sw-close aria-label="Close project details"><span aria-hidden="true">✕</span><span>CLOSE</span></button>
      </div>
      <div className="sw__modal-body">
        <div className="sw__modal-art sw__modal-art--wine" data-sw-modal-art>
          <img className="sw__modal-image" data-sw-modal-image src="/assets/project-covers/notecheck.webp" alt="Project screenshot" width="1400" height="788" decoding="async" />
          <span className="sw__modal-art-caption"><strong>ACTUAL PRODUCT</strong> — APPLICATION SCREENSHOT</span>
        </div>
        <div className="sw__modal-copy">
          <p className="sw__modal-eyebrow" data-sw-modal-eyebrow>PROJECT 01 / MANAGEMENT</p>
          <h3 id="sw-dialog-title" className="sw__modal-title" data-sw-modal-title>PROJECT TITLE</h3>
          <p className="sw__modal-subtitle" data-sw-modal-subtitle>PROJECT DISCIPLINE</p>
          <div className="sw__modal-rule"></div>
          <p id="sw-dialog-description" className="sw__modal-description" data-sw-modal-description></p>
          <div className="sw__modal-features"><h4>KEY CAPABILITIES <span>↘</span></h4><ul data-sw-modal-features></ul></div>
          <div className="sw__modal-stack-area"><h4>ENGINEERING STACK <span>↘</span></h4><div className="sw__modal-stack" data-sw-modal-stack></div></div>
          <p className="sw__modal-note" data-sw-modal-note hidden></p>
          <a className="sw__modal-repo" data-sw-modal-repo href="https://github.com/ashraf1600" target="_blank" rel="noopener noreferrer">EXPLORE SOURCE REPOSITORY <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="sw__modal-bottom"><span>PORTFOLIO ARCHIVE / MD. ASHRAFUL ISLAM</span><span data-sw-modal-pagination>01 / 12</span></div>
    </div>
  </dialog>
</section>
</>
  );
}
