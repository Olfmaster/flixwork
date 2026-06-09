import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Cold-load safeguard: on an uncached first load the triggers may be built
  // after `load` has fired, so positions can be stale and reveals never run.
  // Recalculate once the document and fonts have settled.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });
}

export { gsap, ScrollTrigger };
