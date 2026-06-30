import Reveal from "./Reveal";

const werte = [
  {
    titel: "Inhabergeführt. Wertebasiert. Persönlich.",
    text: "Hinter Flixwork steht keine anonyme Konzernstruktur, sondern eine inhabergeführte Gruppe mit einem breiten Portfolio an Personaldienstleistungen — von der ersten Anfrage bis zum laufenden On-Site-Management ein fester Ansprechpartner.",
  },
  {
    titel: "Dienstleistung von Mensch zu Mensch",
    text: "Personal ist Vertrauenssache. Wir nehmen uns Zeit für ein echtes Gespräch, verstehen Ihren Bedarf und besetzen passgenau — fachlich und menschlich.",
  },
  {
    titel: "Langjährige Mitarbeiter- und Kundenbindung",
    text: "Zufriedene Mitarbeitende und Arbeitsprozesse, die unsere Kunden ebenso schätzen wie unsere externen Kräfte — so entsteht Verlässlichkeit, auf die Sie bauen können.",
  },
];

export default function WarumFlixwork() {
  return (
    <section id="warum" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Warum Flixwork</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
              In einem Markt mit hunderten Anbietern machen wir den Unterschied
              spürbar.
            </h2>
            <p className="mt-5 leading-relaxed text-navy/65">
              Statt mit den größten Werbebudgets zu konkurrieren, überzeugen wir
              mit Struktur, Verlässlichkeit und echtem Mehrwert — und machen
              sofort greifbar, was Sie von uns erwarten können.
            </p>
            <a
              href="#anfrage"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky"
            >
              Personal anfragen
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal className="space-y-4" stagger={0.12}>
            {werte.map((w, i) => (
              <div
                key={w.titel}
                className="rounded-2xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cloud text-sm font-bold text-navy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{w.titel}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy/65">{w.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
