import React from "react";
import { profile } from "../../constants";

const Footer = () => (
  <footer className="border-t-2 border-nb-night bg-nb-night text-nb-cream">
    <div className="px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-nb-cream bg-nb-lime font-jb text-sm font-bold text-nb-night">AI</span>
          <span className="text-sm font-bold">
            {profile.firstName} {profile.lastName}
          </span>
        </div>
        <p className="text-center font-jb text-xs text-nb-cream/60">
          AI &amp; ML Engineer — CUET, Bangladesh · Design adapted from{" "}
          <a href="https://github.com/Ayush-Ranjane/ayush_ranjane_portfolio" target="_blank" rel="noopener noreferrer" className="underline hover:text-nb-lime">
            Ayush Ranjane&apos;s portfolio
          </a>{" "}
          (MIT)
        </p>
        <a href="#top" className="rounded-md border-2 border-nb-cream px-3 py-1.5 text-xs font-bold transition-colors hover:bg-nb-lime hover:text-nb-night">
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
