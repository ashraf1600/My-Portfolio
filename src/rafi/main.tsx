import "./styles/hero.css";
import "./styles/beyond-title.css";
import "./styles/engineering-universe.css";
import "./styles/selected-projects.css";
import "./styles/research-publications.css";
import "./styles/experience.css";
import "./styles/achievements.css";
import "./styles/client-projects.css";
import "./styles/contact-closing-chapter.css";
import "./styles/site-finish.css";
import "./styles/hero-experience-refinement.css";
// Must load last
import "./styles/hero-performance-v4.css";
import "./styles/polish.css";

import { createRoot } from "react-dom/client";
import Home from "./components/Home";

const html = document.documentElement;
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  html.classList.add("rafi-motion-ready");
}
const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
if (nav?.type === "reload") {
  try { history.scrollRestoration = "manual"; } catch (_) {}
  html.dataset.rafiReloadTop = "true";
  if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
  scrollTo(0, 0);
}

createRoot(document.getElementById("root")!).render(<Home />);

// The section scripts bind to the DOM at import time, so load them once React has committed the markup.
requestAnimationFrame(async () => {
  await import("./scripts/motion");
  await import("./scripts/site-finish");
  await import("./scripts/engineering-universe");
  await import("./scripts/selected-projects");
  await import("./scripts/research-publications");
  await import("./scripts/experience");
  await import("./scripts/achievements");
  await import("./scripts/client-projects");
  await import("./scripts/contact-closing-chapter");
});
