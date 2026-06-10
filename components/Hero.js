"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const MAIN_SITE = "https://www.flixwork.de";
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
          .from("[data-h]", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 })
          .from("[data-cta-row]", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
          .from("[data-stat]", { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");

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
      {/* dekorative Formen */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span data-blob className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />
        <span data-blob className="absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-sky-soft/20 blur-3xl" />
        <span data-blob className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <p
          data-h
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-soft" />
          Inhabergeführt · bundesweit · B2B-Personaldienstleister
        </p>

        <h1 data-h className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Wir finden qualifiziertes Personal für{" "}
          <span className="text-sky-soft">Ihr Unternehmen</span>
        </h1>

        <p data-h className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Überlassung von Fach-, Führungs- und Hilfskräften in{" "}
          <strong className="font-semibold text-white">Logistik, Industrie und Handwerk</strong>{" "}
          — professionell, zuverlässig und persönlich betreut. Vom einzelnen
          Monteur bis zum kompletten Projektteam.
        </p>

        {/* Besucher-Weiche */}
        <div data-cta-row className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <a
            href="#schwerpunkte"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-sky px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-transform hover:scale-[1.03] hover:bg-sky-soft sm:w-auto"
          >
            Ich suche Personal
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={`${MAIN_SITE}/jobboerse`}
            target="_blank"
            rel="noopener"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Ich suche einen Job
            <span aria-hidden="true" className="text-white/60">↗ Jobbörse</span>
          </a>
        </div>

        {/* Vertrauens-Kennzahlen */}
        <div className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-8 sm:gap-6">
          {[
            { n: "3", l: "Schwerpunkte: Logistik, Industrie, Handwerk" },
            { n: "bundesweit", l: "Einsatzorte in ganz Deutschland" },
            { n: "persönlich", l: "Fester Ansprechpartner statt Hotline" },
          ].map((s) => (
            <div data-stat key={s.l}>
              <p className="text-base font-bold text-white sm:text-xl md:text-2xl">{s.n}</p>
              <p className="mt-1 text-xs leading-snug text-white/60">{s.l}</p>
            </div>
          ))}
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
