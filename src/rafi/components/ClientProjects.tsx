import { cx, css } from "../utils/jsx";
import { featuredClient as client } from '../data/clientProjects';
import { cloudinarySrcset } from '../utils/cloudinaryImages';

export default function ClientProjects() {

  return (
<>
<section id="client-projects" className="cp" data-client-projects aria-labelledby="cp-heading">
  <div className="cp__atmosphere" aria-hidden="true">
    <span className="cp__aura cp__aura--a"></span>
    <span className="cp__aura cp__aura--b"></span>
    <span className="cp__vertical-lines"></span>
    <span className="cp__noise"></span>
  </div>

  <div className="cp__container">
    <div className="cp__topline" data-cp-reveal>
      <span><i className="cp__on-air" aria-hidden="true"></i> 08 / CLIENT PROJECTS</span>
      <span className="cp__topline-rule" aria-hidden="true"></span>
      <span>REAL BRANDS / REAL WORLD <b aria-hidden="true">✳</b></span>
    </div>

    <header className="cp__intro">
      <div data-cp-reveal>
        <p className="cp__eyebrow">OUTSIDE THE PERSONAL LAB / INTO THE WORLD</p>
        <h2 id="cp-heading" className="cp__heading">BUILT FOR<br /><em>OTHER WORLDS.</em></h2>
      </div>
      <p data-cp-reveal>Some of the most interesting work begins with somebody else's ambition. <strong>Independent ideas, shaped into a digital presence.</strong></p>
    </header>
  </div>

  <div className="cp__ticker" aria-hidden="true" data-cp-ticker>
    <div className="cp__ticker-track">
      {Array.from({length:2}).map(() => (
        <div className="cp__ticker-set">
          <span>NOT JUST ANOTHER WEBSITE</span><i>✳</i>
          <span>INDEPENDENT BY DESIGN</span><i>✳</i>
          <span>MADE TO BE SEEN</span><i>✳</i>
          <span>CLIENT FILE 001</span><i>✳</i>
        </div>
      ))}
    </div>
  </div>

  <div className="cp__container cp__container--theater">
    <div className="cp__theater" data-cp-theater>
      <span className="cp__side-caption cp__side-caption--left" aria-hidden="true">ARCHIVE NO. 001 &nbsp; / &nbsp; VISUAL CASEFILE</span>
      <span className="cp__side-caption cp__side-caption--right" aria-hidden="true">EXTERNAL COMMISSIONS &nbsp; / &nbsp; EST. 2026</span>

      <div className="cp__story" data-cp-story>
        <div className="cp__story-head" data-cp-reveal>
          <span className="cp__story-index">CLIENT <b>001</b> / FEATURED</span>
          <span className="cp__story-live"><i aria-hidden="true"></i> LIVE WEBSITE</span>
        </div>
        <span className="cp__story-overline" data-cp-reveal>CLIENT WORK / INDEPENDENT IDENTITY</span>
        <h3 className="cp__client-name" data-cp-reveal><span>SICKO</span><br /><em>SOUL.</em></h3>
        <div className="cp__story-rule" aria-hidden="true"><i></i></div>
        <p className="cp__story-lede" data-cp-reveal>{client.tagline}</p>
        <p className="cp__story-description" data-cp-reveal>{client.description}</p>
        <div className="cp__story-meta" data-cp-reveal>
          {client.editorialNotes.map(note => (
            <div><span>{note.label}</span><strong>{note.value}</strong></div>
          ))}
        </div>
        <div className="cp__actions" data-cp-reveal>
          <a className="cp__visit" href={client.url} target="_blank" rel="noopener noreferrer" aria-label="Visit Sicko Soul live website in a new tab">
            <span>VISIT LIVE WEBSITE</span><b aria-hidden="true">↗</b>
          </a>
          <button className="cp__inspect" type="button" data-cp-open aria-haspopup="dialog">
            <span>INSPECT THE WORK</span><b aria-hidden="true">⊕</b>
          </button>
        </div>
        <div className="cp__story-foot" data-cp-reveal>
          <span>WWW.{client.domain.toUpperCase()}</span>
          <span>VIEW THE EVIDENCE / 01</span>
        </div>
      </div>

      <div className="cp__visual-zone" data-cp-visual>
        <div className="cp__halo" aria-hidden="true"></div>
        <div className="cp__orbit cp__orbit--one" aria-hidden="true"></div>
        <div className="cp__orbit cp__orbit--two" aria-hidden="true"></div>
        <div className="cp__visual-frame" data-cp-frame>
          <div className="cp__frame-header">
            <div className="cp__frame-lights" aria-hidden="true"><i></i><i></i><i></i></div>
            <span>{client.domain}</span>
            <span className="cp__frame-status">01 / SHOWCASE</span>
          </div>
          <div className="cp__frame-image">
            <img src={client.image} srcSet={cloudinarySrcset(client.image, [480, 768, 960, 1440, 1919])} sizes="(max-width: 700px) 95vw, (max-width: 1200px) 85vw, 1000px" alt="Sicko Soul website showing the streetwear brand, photographic editorial hero, and dark graphic typography" width="1919" height="969" loading="lazy" decoding="async" />
            <div className="cp__frame-glare" aria-hidden="true"></div>
          </div>
          <button type="button" className="cp__image-expand" data-cp-open aria-label="Expand Sicko Soul project screenshot">
            <span>OPEN THE VISUAL FILE</span><b aria-hidden="true">↗</b>
          </button>
        </div>
        <span className="cp__visual-stamp" aria-hidden="true"><strong>IN THE<br />WILD.</strong><small>LIVE / 001</small></span>
        <span className="cp__visual-corner cp__visual-corner--a" aria-hidden="true"></span>
        <span className="cp__visual-corner cp__visual-corner--b" aria-hidden="true"></span>
        <p className="cp__visual-under" aria-hidden="true">THE WEB, WITH TEETH. &nbsp; / &nbsp; AN IDENTITY THAT DOESN'T ASK PERMISSION.</p>
      </div>
    </div>

    <div className="cp__bridge" data-cp-reveal>
      <span><i aria-hidden="true">✳</i> THE NEXT COMMISSION</span>
      <span>IS NEVER A COPY OF THE LAST</span>
    </div>

    <div className="cp__future" data-cp-future>
      <div className="cp__future-intro" data-cp-reveal>
        <span className="cp__future-index">02—∞ / THE OPEN FILES</span>
        <h3>THE NEXT<br /><em>CHAPTER ISN'T</em><br />WRITTEN YET.</h3>
        <p>More client stories are on the way. No invented brands, no filler showcases—only real work when it's ready to be seen.</p>
      </div>
      <div className="cp__future-vault" aria-label="More client projects will be added soon" data-cp-reveal>
        <div className="cp__vault-card cp__vault-card--front" aria-hidden="true">
          <span>CASEFILE 002</span>
          <div className="cp__vault-glyph">?</div>
          <strong>COMING<br />INTO FOCUS.</strong>
          <small>CLIENT IDENTITY / TO BE REVEALED</small>
        </div>
        <div className="cp__vault-card cp__vault-card--back" aria-hidden="true">
          <span>CASEFILE 003</span>
          <div className="cp__vault-glyph">+</div>
          <strong>THE STORY<br />CONTINUES.</strong>
          <small>THE ARCHIVE IS GROWING</small>
        </div>
        <div className="cp__vault-sweep" aria-hidden="true"></div>
      </div>
    </div>

    <div className="cp__closing" data-cp-reveal>
      <span>ASHRAF / BUILT WITH INTENTION</span>
      <span>ONE CLIENT LIVE. MORE TO COME. <i aria-hidden="true">↗</i></span>
    </div>
  </div>

  <dialog className="cp__dialog" data-cp-dialog aria-labelledby="cp-dialog-title" data-lenis-prevent>
    <div className="cp__dialog-wrap">
      <div className="cp__dialog-top">
        <div><span className="cp__dialog-eyebrow">CLIENT FILE 001 / IN FOCUS</span><h3 id="cp-dialog-title">SICKO SOUL <em>/ DIGITAL STOREFRONT</em></h3></div>
        <button type="button" data-cp-close className="cp__dialog-close" aria-label="Close Sicko Soul project viewer">CLOSE <span aria-hidden="true">✕</span></button>
      </div>
      <img className="cp__dialog-image" src={client.original} width="1919" height="969" alt="Full original screenshot of the Sicko Soul streetwear website design" loading="lazy" />
      <div className="cp__dialog-bottom"><span>ORIGINAL USER-SUPPLIED WEBSITE SCREENSHOT / 1919 × 969</span><a href={client.url} target="_blank" rel="noopener noreferrer">OPEN {client.domain.toUpperCase()} <span aria-hidden="true">↗</span></a></div>
    </div>
  </dialog>
</section>
</>
  );
}
