import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiCopy, FiCheck, FiSend, FiExternalLink } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaKaggle } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { profile } from "../../constants";
import { contactTopics } from "../content";

const SOCIAL_STYLE = {
  GitHub: { cls: "bg-nb-card", Icon: FaGithub },
  LinkedIn: { cls: "bg-[#0077b5] text-white", Icon: FaLinkedinIn },
  Kaggle: { cls: "bg-[#20BEFF]", Icon: FaKaggle },
  Codeforces: { cls: "bg-nb-ink text-nb-paper", Icon: SiCodeforces },
};

const inputCls =
  "rounded-xl border-[2.5px] border-nb-ink bg-nb-card px-4 py-3 text-[15px] font-medium outline-none transition-shadow placeholder:text-[#888] focus:shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]";

const Contact = () => {
  const formRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState(contactTopics[0]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | unconfigured

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus("unconfigured");
      return;
    }
    setStatus("sending");
    emailjs
      .send(serviceId, templateId, { name: form.name, email: form.email, title: `Portfolio inquiry: ${topic}`, message: form.message }, publicKey)
      .then(() => {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch(() => setStatus("error"));
  };

  const socials = profile.socials.filter((s) => SOCIAL_STYLE[s.name]);

  return (
    <section id="contact" className="bg-nb-paper bg-[radial-gradient(#d1d1d1_2px,transparent_2px)] [background-size:24px_24px] px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-12">
        {/* CTA block */}
        <div className="relative flex flex-col justify-between rounded-[24px] border-[3px] border-nb-ink bg-nb-lime p-8 shadow-[8px_8px_0_0_rgb(var(--nb-shadow))] md:p-12 lg:col-span-5">
          <div>
            <h2 className="text-[3rem] font-bold leading-[0.95] tracking-tight md:text-[3.75rem]">
              Let&apos;s build
              <br />
              something
              <br />
              impactful<span className="text-nb-hot">.</span>
            </h2>
            <p className="mt-6 max-w-[300px] text-[16px] font-medium leading-relaxed text-nb-ink/90">
              Open to AI/ML roles, research collaborations and real-world problem solving.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            {profile.email && (
              <div className="flex items-center justify-between gap-2 rounded-xl border-[3px] border-nb-ink bg-nb-card p-2 shadow-[4px_4px_0_0_rgb(var(--nb-shadow))]">
                <span className="truncate pl-3 font-jb text-[13px] font-bold">{profile.email}</span>
                <button type="button" onClick={copyEmail} className="press-effect inline-flex shrink-0 items-center gap-2 rounded-[8px] bg-nb-ink px-5 py-2.5 text-xs font-bold text-nb-paper">
                  {copied ? <FiCheck className="text-nb-lime" /> : <FiCopy />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
            <div className="mt-2 grid grid-cols-2 gap-3">
              {socials.map((s) => {
                const { cls, Icon } = SOCIAL_STYLE[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between rounded-xl border-[3px] border-nb-ink px-4 py-3 text-sm font-bold shadow-[4px_4px_0_0_rgb(var(--nb-shadow))] transition-all hover:-translate-y-1 ${cls}`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={18} /> {s.name}
                    </span>
                    <FiExternalLink className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col rounded-[24px] border-[3px] border-nb-ink bg-nb-card p-8 shadow-[8px_8px_0_0_rgb(var(--nb-shadow))] md:p-12 lg:col-span-7">
          <div className="mb-8">
            <h3 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Send a message</h3>
            <p className="font-jb text-sm font-bold text-[#888]">Tell me what you&apos;re working on. I&apos;ll reply by email.</p>
          </div>

          <div className="mb-6">
            <p className="mb-3 font-jb text-[11px] font-bold uppercase tracking-widest">I&apos;m reaching out about</p>
            <div className="flex flex-wrap gap-2">
              {contactTopics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  aria-pressed={topic === t}
                  className={`rounded-full border-[2.5px] border-nb-ink px-4 py-1.5 text-[13px] font-bold transition-all ${
                    topic === t ? "bg-nb-ink text-nb-paper shadow-[2.5px_2.5px_0_0_#FF90E8]" : "bg-nb-card hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgb(var(--nb-shadow))]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-jb text-[11px] font-bold uppercase tracking-widest">Your name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Jane Doe" autoComplete="name" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-jb text-[11px] font-bold uppercase tracking-widest">Email</span>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="jane@company.com" autoComplete="email" />
            </label>
          </div>

          <label className="relative mb-8 flex flex-col gap-2">
            <span className="font-jb text-[11px] font-bold uppercase tracking-widest">Message</span>
            <textarea
              required
              rows={6}
              maxLength={500}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputCls} resize-none pb-8 leading-relaxed`}
              placeholder="What's the project or role, and how can I help?"
            />
            <span className="absolute bottom-3 right-4 font-jb text-[10px] font-bold text-[#888]">{form.message.length} / 500</span>
          </label>

          <div className="mt-auto flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-[240px] font-jb text-[11px] font-bold leading-relaxed text-[#888]" aria-live="polite">
              {status === "unconfigured"
                ? "The message service isn't set up yet. Please reach out on LinkedIn."
                : status === "error"
                ? "Couldn't send. Please try again."
                : "Sends a direct email straight to my inbox."}
            </p>
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`press-effect inline-flex items-center gap-2 rounded-xl border-[3px] border-nb-ink px-6 py-3 font-bold shadow-[4px_4px_0_0_rgb(var(--nb-shadow))] ${
                status === "sent" ? "bg-nb-lime" : status === "sending" ? "bg-[#eee] text-[#888]" : "bg-nb-pink"
              }`}
            >
              {status === "sending" ? "Sending..." : status === "sent" ? (<>Sent <FiCheck /></>) : (<>Send message <FiSend /></>)}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
