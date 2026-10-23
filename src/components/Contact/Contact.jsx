import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCpuChip } from "react-icons/hi2";
import { profile, testimonials, experiences, research } from "../../constants";

const BLOCK_COLORS = ["bg-[#bc60fb]", "bg-[#0067dc]", "bg-[#923fe6]"];

const firstSentence = (text = "") => {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
};

// Facts pulled from your own data, used until real testimonials are added.
const buildHighlights = () => {
  const [current, attachment] = experiences;
  const accepted = research.filter((r) => /accepted|copyright/i.test(r.status)).length;
  const latest = research.find((r) => /accepted/i.test(r.status));
  return [
    current && {
      label: "currently",
      body: firstSentence(current.desc),
      name: current.role,
      role: `${current.company} · ${current.date}`,
      img: current.img,
      Icon: HiOutlineBriefcase,
    },
    {
      label: "research",
      body: latest
        ? `${research.length} papers, ${accepted} accepted or published. Latest: “${latest.title.split(":")[0]}” at ${latest.conference}.`
        : `${research.length} papers across IEEE & international venues.`,
      name: `${research.length} Publications`,
      role: "Machine Learning · NLP · Computer Vision",
      Icon: HiOutlineAcademicCap,
    },
    attachment && {
      label: "industry",
      body: firstSentence(attachment.desc),
      name: attachment.role.replace(/\s*\(.*\)/, ""),
      role: `${attachment.company} · ${attachment.date}`,
      img: attachment.img,
      Icon: HiOutlineCpuChip,
    },
  ].filter(Boolean);
};

const Avatar = ({ img, Icon, alt }) => (
  <span className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] shrink-0 rounded-full border-[3px] border-white bg-white overflow-hidden flex items-center justify-center shadow-xl">
    {img ? (
      <img src={img} alt={alt} className="w-full h-full object-contain p-2" />
    ) : (
      <Icon size={36} className="text-black" aria-hidden="true" />
    )}
  </span>
);

const QuoteMark = () => (
  <svg viewBox="0 0 64 48" className="w-14 h-11 fill-white/90" aria-hidden="true">
    <path d="M0 48V28C0 12 8 2 24 0l3 6C18 9 14 15 14 22h12v26H0zm36 0V28c0-16 8-26 24-28l3 6c-9 3-13 9-13 16h12v26H36z" />
  </svg>
);

const Block = ({ item, color, tall, isTestimonial }) => (
  <motion.figure
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className={`${color} relative p-8 sm:p-10 flex flex-col ${tall ? "md:row-span-2" : ""}`}
  >
    <div className="flex items-start justify-between gap-4">
      {isTestimonial ? (
        <QuoteMark />
      ) : (
        <span className="font-mono text-sm font-bold text-white/90">
          {"// "}
          {item.label}
        </span>
      )}
      <Avatar img={item.img || item.avatar} Icon={item.Icon || HiOutlineBriefcase} alt={item.name} />
    </div>
    <blockquote className="mt-6 font-poppins text-white text-base sm:text-[1.15rem] leading-[1.6]">{item.body || item.quote}</blockquote>
    <figcaption className="mt-6">
      <p className="font-poppins font-semibold text-white text-lg">- {item.name}</p>
      <p className="font-poppins font-medium text-white/90 text-sm sm:text-base">{item.role}</p>
    </figcaption>
  </motion.figure>
);

const Field = ({ label, as, ...props }) => (
  <label className="block">
    <span className="font-mono text-xs text-noir-muted">{label}</span>
    {as === "textarea" ? (
      <textarea
        {...props}
        className="mt-1.5 w-full bg-transparent border-b border-white/25 focus:border-brand-cyan outline-none py-2 font-mono text-sm text-white placeholder:text-white/25 resize-none transition-colors"
      />
    ) : (
      <input
        {...props}
        className="mt-1.5 w-full bg-transparent border-b border-white/25 focus:border-brand-cyan outline-none py-2 font-mono text-sm text-white placeholder:text-white/25 transition-colors"
      />
    )}
  </label>
);

const Contact = () => {
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const hasTestimonials = testimonials.length > 0;
  const blocks = (hasTestimonials ? testimonials : buildHighlights()).slice(0, 3);

  const onSubmit = (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("The message service isn't configured yet. Please reach out via LinkedIn.");
      return;
    }
    setSending(true);
    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        toast.success("Message sent. I'll get back to you soon!");
        form.current.reset();
      })
      .catch(() => toast.error("Couldn't send the message. Please try again."))
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="relative">
      <ToastContainer position="top-right" theme="dark" autoClose={3500} />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Left: availability + links + form */}
        <div className="bg-[#0b0b0e] px-6 sm:px-12 lg:px-16 xl:px-24 py-20 sm:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-grotesk font-bold text-white text-[2rem] sm:text-[2.6rem] leading-[1.2] tracking-[-0.01em] max-w-xl"
          >
            {profile.availability}
          </motion.h2>

          <p className="mt-8 font-mono text-white text-base sm:text-lg leading-[1.6] max-w-md">
            Have an exciting project or research idea you need help with?
            <br />
            Send me a message or reach me on any of the links below!
          </p>

          <div className="mt-14">
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="chonky chonky-violet has-hover-anim font-mono text-xl sm:text-[1.65rem] break-all whitespace-normal"
              >
                {profile.email}
              </a>
            ) : (
              <a href="#message" className="chonky chonky-violet has-hover-anim font-mono text-xl sm:text-[1.65rem]">
                send me a message ↓
              </a>
            )}
          </div>

          <ul className="mt-8 space-y-3">
            {profile.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-lg sm:text-xl text-white hover:text-brand-cyan transition-colors"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>

          <form id="message" ref={form} onSubmit={onSubmit} className="mt-16 max-w-md space-y-6 scroll-mt-28">
            <p className="font-mono text-sm text-brand-cyan">{"// or drop a message here"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="name" name="name" required placeholder="Your name" autoComplete="name" />
              <Field label="email" name="email" type="email" required placeholder="you@domain.com" autoComplete="email" />
            </div>
            <Field label="subject" name="title" placeholder="Project, role or research idea" />
            <Field label="message" name="message" as="textarea" rows={4} required placeholder="Tell me a little about it…" />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-violet hover:bg-[#a35cf0] disabled:opacity-60 text-white font-mono font-bold transition-colors"
            >
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right: colour blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr">
          {blocks.map((item, i) => (
            <Block
              key={item.name + i}
              item={item}
              color={BLOCK_COLORS[i % BLOCK_COLORS.length]}
              tall={i === 0}
              isTestimonial={hasTestimonials}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
