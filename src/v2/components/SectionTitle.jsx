import React from "react";
import { motion } from "framer-motion";

// "Title." heading with a monospace index tag on the right.
const SectionTitle = ({ title, tag, boxed = false, dark = false, dotClass = "text-nb-hot", children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <div className="flex items-end justify-between gap-4">
      <h2 className={`text-4xl font-bold tracking-tighter sm:text-6xl ${dark ? "text-nb-cream" : ""}`}>
        {title}
        <span className={`inline-block transition-transform duration-300 hover:rotate-12 ${dotClass}`}>.</span>
      </h2>
      {tag && (
        <span
          className={`hidden font-jb text-xs font-bold uppercase tracking-widest sm:block ${
            boxed
              ? "border-2 border-nb-ink bg-nb-card px-3 py-1 text-nb-muted shadow-brutal-sm"
              : dark
              ? "rounded-full border border-nb-cream/20 bg-nb-cream/10 px-3 py-1 text-nb-cream/60"
              : "text-nb-muted"
          }`}
        >
          {tag}
        </span>
      )}
    </div>
    {children}
  </motion.div>
);

export default SectionTitle;
