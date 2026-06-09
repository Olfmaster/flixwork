"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Reusable scroll-reveal wrapper. Fades + lifts its content into view once.
//
// Robust against the classic "stuck invisible" trap: we drive the reveal from
// an explicit ScrollTrigger with `once`, set the hidden state ourselves, and
// refresh after creation so a trigger whose start is already passed (element
// in view on load, or React Strict Mode re-mount in dev) still fires.
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  y = 28,
  stagger,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger ? Array.from(el.children) : el;
    if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            stagger: stagger || 0,
          }),
      });
    }, el);

    // Recalculate once now: if the element is already past the start (in view
    // on first paint), refresh triggers the onEnter so it never stays hidden.
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
