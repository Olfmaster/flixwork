"use client";
import { useState } from "react";
import CaseStudyBody from "./CaseStudyBody";

// Mehrere Case Studies an einer Position zum Durchschalten (Tabs). Gibt eine
// kompakte Übersicht und zeigt darunter den aktiven Fall. Beim Umschalten wird
// der Panel-Container neu gemountet (key), sodass die Reveal-Animationen im Body
// sauber neu einblenden.
export default function CaseStudyTabs({ items, id, eyebrow = "Case Studies", titel, text }) {
  const [aktiv, setAktiv] = useState(0);
  const cs = items[aktiv];

  return (
    <section id={id} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {(titel || text) && (
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">{eyebrow}</p>
            {titel && (
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
                {titel}
              </h2>
            )}
            {text && <p className="mt-4 leading-relaxed text-navy/60">{text}</p>}
          </div>
        )}

        {/* Tab-Leiste */}
        <div role="tablist" aria-label="Case Studies" className="mt-8 flex flex-wrap gap-2.5">
          {items.map((it, i) => (
            <button
              key={it.tab || i}
              type="button"
              role="tab"
              aria-selected={i === aktiv}
              onClick={() => setAktiv(i)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                i === aktiv
                  ? "border-sky bg-sky text-white shadow-sm shadow-sky/20"
                  : "border-navy/15 bg-white text-navy/70 hover:border-navy/40 hover:text-navy"
              }`}
            >
              {it.tab || it.titel}
            </button>
          ))}
        </div>

        {/* Aktiver Fall — key erzwingt Re-Mount → Reveal blendet neu ein */}
        <div key={aktiv} role="tabpanel" className="mt-10 border-t border-navy/10 pt-10">
          <div className="mb-8 max-w-3xl">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-navy md:text-3xl">
              {cs.titel}
            </h3>
            {(cs.kunde || cs.branche) && (
              <p className="mt-3 text-sm text-navy/60">
                <span className="font-semibold text-navy/75">{cs.kunde ? "Kunde:" : "Branche:"}</span>{" "}
                {cs.kunde || cs.branche}
              </p>
            )}
          </div>
          <CaseStudyBody cs={cs} showKopf={false} />
        </div>
      </div>
    </section>
  );
}
