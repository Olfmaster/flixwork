"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Zählt eine Zahl beim Scrollen ins Bild von 0 hoch. `to` ist der Zielwert,
// `prefix`/`suffix` rahmen sie (z. B. suffix="+" oder " Wochen"). Respektiert
// prefers-reduced-motion und zeigt ohne JS direkt den Endwert (SSR-fest).
export default function Counter({ to, prefix = "", suffix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      el.textContent = `${prefix}0${suffix}`;
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            v: to,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
            },
          }),
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
