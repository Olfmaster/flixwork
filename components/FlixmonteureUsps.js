import Reveal from "./Reveal";

// "Warum Fix Monteure" (Website-Review 17.07.2026). Reihenfolge ist die im
// Termin festgelegte Priorität: persönlicher Ansprechpartner (1), 100 %
// Kalkulierbarkeit (2), bundesweite Verfügbarkeit (3), Flexibilität durch
// Fahrzeug-/Werkzeug-Ausstattung (4). Danach die beiden Punkte von
// flixmonteure.com, die inhaltlich nicht doppeln.
const usps = [
  ["Persönlicher Ansprechpartner", "Ein fester Ansprechpartner, der Ihr Projekt kennt — direkt erreichbar, ohne Callcenter und ohne Hierarchieebenen."],
  ["100 % kalkulierbar", "Ein Stundensatz, alles inklusive. Fahrzeug, Werkzeug, Unterkunft und PSA sind bereits enthalten — keine Nachträge."],
  ["Bundesweit verfügbar", "Unsere Monteure sind mobil und deutschlandweit im Einsatz — regional wie überregional, auch mehrtägig."],
  ["Flexibel durch Ausstattung", "Weil Fahrzeug und Werkzeug mitkommen, ist der Monteur am ersten Tag produktiv — auch bei kurzfristigen Umdispositionen."],
  ["Spezialisiert statt Generalist", "Schwerpunkt Haus-, Gebäude- und Versorgungstechnik: SHK, Elektro, Lüftung und TGA — kein allgemeiner Personaldienstleister."],
  ["Skalierbare Projektteams", "Vom einzelnen Monteur bis zum kompletten Team — projektbezogen zusammengestellt und bei Auftragsspitzen erweiterbar."],
];

export default function FlixmonteureUsps() {
  return (
    <section id="warum-fix-monteure" className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Warum Fix Monteure</p>
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
