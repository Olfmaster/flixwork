"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const branchen = [
  "Logistik",
  "Industrie",
  "Handwerk",
  "Elektro",
  "Sanitär",
  "Lagerlogistik",
  "Kommissionierung",
  "Montage",
  "Projektpersonal",
];

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-h]", { y: 34, opacity: 0, duration: 0.9, stagger: 0.14 })
          .from("[data-cta-row]", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4");

        // sanft schwebende Formen
        gsap.to("[data-blob]", {
          y: (i) => (i % 2 ? 26 : -22),
          x: (i) => (i % 2 ? -18 : 16),
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.6,
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="flx-hero-bg relative overflow-hidden text-white">
      {/* dezente Lichtakzente — bewusst zurückhaltend für eine ruhige, flächige Hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span data-blob className="absolute right-[-8rem] top-0 h-96 w-96 rounded-full bg-sky-soft/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <p
          data-h
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-soft" />
          Inhabergeführt · bundesweit · B2B-Personaldienstleister
        </p>

        <h1 data-h className="max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          Qualifiziertes Personal für{" "}
          <span className="text-sky-soft">Ihr Unternehmen</span>
        </h1>

        <p data-h className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
          Überlassung von Fach-, Führungs- und Hilfskräften in{" "}
          <strong className="font-semibold text-white">Logistik, Industrie und Handwerk</strong>{" "}
          — professionell, zuverlässig und persönlich betreut. Vom einzelnen
          Monteur bis zum kompletten Projektteam.
        </p>

        <div data-cta-row className="mt-10">
          <a
            href="#schwerpunkte"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-9 py-4 text-base font-semibold text-white shadow-lg shadow-sky/30 transition-transform hover:scale-[1.03] hover:bg-sky-soft"
          >
            Jetzt Personal anfragen
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Branchen-Laufband */}
      <div className="relative border-t border-white/10 bg-navy-deep/40 py-4">
        <div className="flex w-max flex-nowrap gap-10 pl-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] flx-marquee">
          {[...branchen, ...branchen].map((b, i) => (
            <span key={i} className="whitespace-nowrap text-sm font-medium uppercase tracking-wider text-white/40">
              {b} <span className="text-sky-soft/60">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
