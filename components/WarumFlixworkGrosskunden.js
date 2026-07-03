import Reveal from "./Reveal";

// Operativer "Warum Flixwork?"-Abschluss aus der Großkunden-Mail — bewusst
// getrennt von der marken-/werteorientierten Startseiten-Sektion WarumFlixwork.
// Schließt den Großkunden-/Case-Study-Kontext ab (dunkles Band nach der hellen
// Master-Vendor-Case-Study).
const punkte = [
  ["Operative Erfahrung", "Erfahrung aus Logistik-, Produktions- und Multi-Site-Projekten."],
  ["Persönliche Betreuung", "Kurze Wege und direkte Ansprechpartner."],
  ["Flexible Skalierung", "Schnelle Reaktion auf Wachstum und Peaks."],
  ["Transparenz", "Klare Kommunikation, nachvollziehbare Prozesse und messbare Ergebnisse."],
];

export default function WarumFlixworkGrosskunden() {
  return (
    <section className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Großkunden-Lösungen</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Warum Flixwork?
          </h2>
          <p className="mt-5 leading-relaxed text-white/75">
            Ob einzelner Standort, Peak-Saison oder standortübergreifendes
            Master-Vendor-Modell — worauf Großkunden bei uns zählen können.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {punkte.map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <h3 className="text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
