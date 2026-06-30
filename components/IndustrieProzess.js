import Reveal from "./Reveal";

// Industrie-spezifisches Highlight: unser Auswahl- und Qualitätsprozess.
// Eigenständiger Block (analog Express-Shuttle bei Logistik / Konfigurator bei
// Handwerk) — bleibt bewusst auf das Thema Industrie beschränkt.
const schritte = [
  ["01", "Bedarfsanalyse", "Wir verstehen Anforderungen, Schichtmodell und Qualifikationsprofil — gemeinsam mit Ihnen."],
  ["02", "Gezielte Vorauswahl", "Passgenaue Auswahl aus unserem Pool, abgestimmt auf Ihre Tätigkeiten und Geräte."],
  ["03", "Strukturierte Gespräche", "Vergleichbare Vorstellungsgespräche statt Bauchgefühl — Sie sehen nur passende Profile."],
  ["04", "Qualitätssicherung", "Laufende On-Site-Begleitung und Feedback während des gesamten Einsatzes."],
];

export default function IndustrieProzess() {
  return (
    <section className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Unser Vorgehen</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Qualität beginnt bei der Auswahl.
          </h2>
          <p className="mt-5 leading-relaxed text-white/75">
            In der Industrie zählt, wer wirklich ankommt. Deshalb wählen wir
            strukturiert aus und begleiten den Einsatz durchgängig.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {schritte.map(([n, t, d]) => (
            <div key={n} className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur">
              <p className="text-4xl font-bold text-sky-soft">{n}</p>
              <h3 className="mt-4 text-lg font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
