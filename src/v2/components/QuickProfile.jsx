import React from "react";
import { motion } from "framer-motion";
import { research } from "../../constants";
import { quickProfile } from "../content";
import SectionTitle from "./SectionTitle";

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, scale: 0.9, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } } };

const QuickProfile = () => (
  <section id="impact" className="overflow-hidden border-y-[6px] border-nb-night bg-nb-night px-4 py-20 md:py-28">
    <div className="relative mx-auto max-w-6xl">
      <div className="mb-12">
        <SectionTitle title="Quick Profile" dark dotClass="text-nb-lime" />
      </div>

      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickProfile.map((q) => (
          <motion.div
            key={q.subtitle}
            variants={item}
            className={`group flex flex-col justify-center rounded-xl border-[3px] border-nb-cream p-6 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-2 ${
              q.variant === "lime" ? "bg-nb-lime text-nb-night" : "bg-nb-night text-nb-cream"
            }`}
            style={{ boxShadow: "6px 6px 0 0 #F6F5F0" }}
          >
            <p className="mb-3 origin-left text-[38px] font-bold leading-none tracking-tight transition-transform group-hover:scale-105">
              {q.dynamic === "papers" ? research.length : q.title}
            </p>
            <p className="mb-4 text-[15px] font-bold leading-tight transition-colors group-hover:text-nb-hot">{q.subtitle}</p>
            <p className="mt-auto font-jb text-[10px] font-bold uppercase tracking-widest opacity-70">{q.subtext}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.4 }}
        className="group mt-10 rounded-xl border-[3px] border-nb-cream bg-nb-night p-6 transition-colors hover:bg-[#0b0b0b] md:p-8"
      >
        <h3 className="mb-4 text-[18px] font-bold text-nb-cream transition-colors group-hover:text-nb-lime">How I build AI systems</h3>
        <p className="max-w-4xl text-[15px] leading-loose text-nb-cream/80">
          I treat machine learning as an engineering system, not just model training. It starts with the real problem and clean,
          validated data; models are judged on held-out metrics and explained with tools like SHAP before they ship. FastAPI or Django
          services, containerized with Docker, connect them to real users, and tracking plus CI/CD keep them honest after deployment.
        </p>
      </motion.div>
    </div>
  </section>
);

export default QuickProfile;
