import Reveal from "./Reveal";

// "Warum sich Kunden für Flixmonteure entscheiden" (Kundenmail Handwerk).
// Die 5 USPs aus der Seitenstruktur, angereichert mit den Punkten aus der
// 7er-Liste "Warum sich Kunden entscheiden" (zusammengeführt, keine Dopplung).
// Dunkles Band nach den drei Case Studies, Abschluss-Claim darunter.
const usps = [
  ["Spezialisierung statt Generalist", "Spezialisiert auf SHK, Elektro und TGA — kein allgemeiner Personaldienstleister."],
  ["Komplettlösung inkl. Unterkunft & Anreise", "Unterkunft, Anreise und Ausstattung organisieren wir vollständig."],
  ["Bundesweite Rekrutierung", "Bundesweite Verfügbarkeit qualifizierter Fachkräfte mit schnellen Reaktionszeiten."],
  ["Flexible Projektteams", "Flexible Skalierung bei Auftragsspitzen — projektbezogen zusammengestellt."],
  ["Persönliche Betreuung", "Fester Ansprechpartner und langfristige Partnerschaften statt kurzfristiger Lösungen."],
];

export default function FlixmonteureUsps() {
  return (
    <section className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Warum Flixmonteure</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Warum sich Kunden für Flixmonteure entscheiden
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {usps.map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <h3 className="text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 border-t border-white/15 pt-8">
          <p className="max-w-3xl text-xl font-semibold leading-relaxed text-white md:text-2xl">
            Wir liefern nicht nur Fachkräfte. Wir schaffen Planungssicherheit für
            Ihre Projekte.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
