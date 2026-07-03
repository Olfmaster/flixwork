import Reveal from "./Reveal";

// "Leistungen Logistik" aus der Kundenmail: unsere drei Betreuungs-/Steuerungs-
// modelle für Logistikkunden. Dunkles Band (analog IndustrieProzess/Express-
// Shuttle) — bleibt bewusst auf Logistik beschränkt. Die konkreten Referenz-
// fälle dazu liefert die Case Study weiter unten auf der Seite.
const modelle = [
  {
    titel: "OnSite Management",
    intro: "Für größere Standorte bieten wir:",
    punkte: [
      "Feste Ansprechpartner vor Ort",
      "Schichtbegleitung",
      "Recruitingsteuerung",
      "Mitarbeiterbetreuung",
      "KPI-Reporting",
      "Eskalationsmanagement",
    ],
  },
  {
    titel: "Peak Management",
    intro: "Besonders bei saisonalen Schwankungen unterstützen wir durch:",
    punkte: [
      "Flexible Personalpools",
      "Kurzfristige Personalaufstockung",
      "Recruiting-Offensiven",
      "Schicht- und Wochenendmodelle",
      "Standortübergreifende Personalsteuerung",
    ],
  },
  {
    titel: "Master-Vendor-Lösungen",
    intro: "Für Unternehmen mit mehreren Standorten oder höherem Personalbedarf bieten wir:",
    punkte: [
      "Einen zentralen Ansprechpartner",
      "Steuerung von Co-Lieferanten",
      "Einheitliche KPI-Strukturen",
      "Transparente Berichterstattung",
      "Zentrale Governance",
      "Standortübergreifende Personalplanung",
    ],
  },
];

export default function LeistungenLogistik() {
  return (
    <section id="leistungen" className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Leistungen Logistik</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Flexible Personallösungen für moderne Logistikprozesse
          </h2>
          <p className="mt-5 leading-relaxed text-white/75">
            Logistikunternehmen stehen heute vor der Herausforderung, hohe
            Lieferqualität, kurze Reaktionszeiten und schwankende Personalbedarfe
            gleichzeitig sicherzustellen.
          </p>
          <p className="mt-4 leading-relaxed text-white/75">
            Flixwork unterstützt entlang der gesamten logistischen Wertschöpfungs­kette
            — von einzelnen Schichten bis hin zu komplexen Multi-Site- und
            OnSite-Lösungen.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {modelle.map((m) => (
            <div key={m.titel} className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <h3 className="text-xl font-bold text-white">{m.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{m.intro}</p>
              <ul className="mt-5 space-y-3">
                {m.punkte.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-sky-soft" fill="currentColor" aria-hidden="true">
                      <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zm3.9 6.2-4.6 4.6a1 1 0 0 1-1.4 0L5.8 10.4a1 1 0 1 1 1.4-1.4l1.4 1.4 3.9-3.9a1 1 0 1 1 1.4 1.4z" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
