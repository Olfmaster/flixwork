import Reveal from "./Reveal";

// Onboarding-/Ablaufprozess (Kundenmail 03.07.2026) — unternehmensweit, nicht
// bereichsspezifisch, daher auf der Startseite. Fünf Phasen als Timeline auf
// dunklem Band. Die Kurzbeschreibungen glossieren die vom Kunden gelieferten
// Phasentitel (bei Bedarf anpassbar).
const phasen = [
  ["01", "Tag 1", "Anfrage & Bedarfsanalyse", "Wir erfassen Anforderungen, Qualifikationsprofil und Rahmenbedingungen."],
  ["02", "Tag 2–3", "Recruiting & Kandidatenauswahl", "Wir sichten unseren Pool, sprechen Kandidaten an und wählen passende Profile aus."],
  ["03", "Tag 4–5", "Vorstellung & Vertragsprozess", "Sie lernen die Kandidaten kennen; wir klären den Vertrags- und Überlassungsprozess."],
  ["04", "Tag 5–10", "Onboarding & Einsatzstart", "Organisation, Einweisung und Start am Einsatzort — einsatzbereit vom ersten Tag."],
  ["05", "Ab Tag 10", "KPI-Reporting & laufende Betreuung", "Regelmäßiges KPI-Reporting und feste Ansprechpartner während des gesamten Einsatzes."],
];

export default function OnboardingProzess() {
  return (
    <section id="onboarding" className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Onboarding-Prozess</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            In rund zehn Tagen einsatzbereit
          </h2>
          <p className="mt-5 leading-relaxed text-white/75">
            Von der ersten Anfrage bis zum laufenden KPI-Reporting — ein klarer,
            planbarer Ablauf mit festen Ansprechpartnern.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.1}>
          {phasen.map(([n, tag, titel, desc]) => (
            <div key={n} className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-sky-soft">{n}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">{tag}</span>
              </div>
              <h3 className="mt-4 text-base font-bold leading-snug text-white">{titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
