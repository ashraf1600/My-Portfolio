import { cx, css } from "../utils/jsx";
import { contact } from '../data/contact';

export default function ContactClosingChapter() {
const mailHref = `mailto:${contact.email}`;
const projectHref = `${mailHref}?subject=${encodeURIComponent(contact.projectSubject)}`;
const year = new Date().getFullYear();
  return (
<>
<section className="rc" id="contact" data-contact-section data-contact-motion="off" aria-labelledby="rc-heading">
  <div className="rc__atmosphere" aria-hidden="true">
    <div className="rc__glow rc__glow--one"></div>
    <div className="rc__glow rc__glow--two"></div>
    <div className="rc__contours"><i></i><i></i><i></i><i></i></div>
    <div className="rc__signal-rings"><i></i><i></i><i></i><i></i><span></span></div>
    <div className="rc__ghost-type">CONNECT</div>
  </div>
  <div className="rc__contact-top">
    <span className="rc__chapter"><i></i> 09 / THE FINAL WORD</span>
    <span className="rc__top-line" aria-hidden="true"></span>
    <span className="rc__availability"><span className="rc__availability-dot"></span> OPEN TO NEW CONVERSATIONS</span>
  </div>

  <div className="rc__container">
    <div className="rc__manifesto">
      <div className="rc__serial"><span>THE NEXT BIG THING STARTS SMALL</span><span>✳ / 001</span></div>
      <div className="rc__heading-wrap">
        <span className="rc__heading-overline">GOT A PROJECT IN MIND?</span>
        <h2 id="rc-heading" className="rc__heading">
          <span className="rc__heading-line">LET’S</span>
          <span className="rc__heading-line rc__heading-line--serif"><em>make it</em></span>
          <span className="rc__heading-line rc__heading-line--last">REAL<span className="rc__heading-period">.</span></span>
        </h2>
      </div>
      <div className="rc__manifesto-bottom">
        <p>From a striking website to a complex software system, I love turning ambitious ideas into work that <em>actually ships.</em> Tell me what you’re building.</p>
        <a className="rc__main-cta" href={projectHref} aria-label={`Start a project inquiry by email to ${contact.email}`}>
          <span className="rc__main-cta-copy"><small>YOUR NEXT PROJECT</small><b>LET’S TALK</b></span>
          <span className="rc__main-cta-icon" aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="rc__manifesto-foot">
        <span>DESIGN <i>×</i> ENGINEERING <i>×</i> IMPACT</span>
        <span className="rc__manifesto-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      </div>
    </div>

    <div className="rc__directory" data-contact-directory>
      <div className="rc__directory-head">
        <span>ALL LINES ARE OPEN</span>
        <span className="rc__directory-count">04 CHANNELS ↗</span>
      </div>
      <div className="rc__directory-title">
        <span className="rc__directory-kicker">THE DIRECT DIRECTORY</span>
        <h3>FIND ME <em>anywhere.</em></h3>
        <p>Business enquiries, collaboration, or just a conversation. Pick your preferred way to reach out.</p>
      </div>
      <div className="rc__email-card" data-contact-channel="EMAIL">
        <span className="rc__email-info">
          <span className="rc__channel-meta"><i className="rc__channel-idx">01</i> / PRIMARY CHANNEL <span>RECOMMENDED FOR PROJECTS</span></span>
          <a className="rc__email-link" href={mailHref} aria-label={`Email ${contact.email}`}>
            <strong>{contact.email}</strong><span aria-hidden="true">↗</span>
          </a>
        </span>
        <button className="rc__copy" type="button" data-contact-copy data-copy-value={contact.email} aria-label="Copy email address">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>
          <span data-contact-copy-label>COPY</span>
        </button>
      </div>
      <div className="rc__channel-list" aria-label="Social profiles">
        {contact.socials.map((social) => (
          <a href={social.url} className="rc__social" data-contact-channel={social.platform} target="_blank" rel="noopener noreferrer" aria-label={`Open ${social.platform} profile in a new tab`}>
            <span className="rc__social-index">{social.number}</span>
            <span className="rc__social-content">
              <strong>{social.platform}</strong>
              <small>{social.handle}</small>
            </span>
            <span className="rc__social-note">{social.caption}</span>
            <span className="rc__social-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <div className="rc__directory-foot">
        <div className="rc__current-channel"><span className="rc__channel-pulse"></span> <span data-contact-channel-label>YOUR MOVE / I’M LISTENING</span></div>
        <span className="rc__signal-glyph" aria-hidden="true">✳</span>
      </div>
    </div>
  </div>

  <div className="rc__ticker" aria-hidden="true">
    <div className="rc__ticker-track">
      {Array.from({length:4}, (_,i) => <span>IDEAS INTO INTERFACES <b>✳</b> SYSTEMS INTO REALITY <b>✳</b> THE NEXT CHAPTER STARTS HERE <b>✳</b></span>)}
    </div>
  </div>

  <footer className="rc__footer">
    <div className="rc__footer-brand">
      <a href="#page-top" aria-label="Back to top, Ashraful Islam" className="rc__monogram"><img src="/assets/brand/ashraf-monogram.webp" alt="" width="60" height="60" decoding="async" /></a>
      <div><strong>{contact.displayName}</strong><small>ENGINEERING WITH INTENTION</small></div>
    </div>
    <div className="rc__footer-center">© {year} · MADE WITH PURPOSE · {contact.location}</div>
    <a href="#page-top" className="rc__to-top">BACK TO THE BEGINNING <span aria-hidden="true">↑</span></a>
  </footer>
  <span className="rc__sr-only" data-contact-status role="status" aria-live="polite"></span>
</section>
</>
  );
}
