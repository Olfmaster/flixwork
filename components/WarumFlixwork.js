import Reveal from "./Reveal";

// Kernbotschaft: inhabergeführt = schnelle Entscheidungen. Der direkte Vergleich
// mit dem Konzernanbieter macht den Vorteil messbar statt behauptet.
const vergleich = [
  ["Vertragsunterzeichnung", "Innerhalb von 24 Stunden", "Bis zu 4 Wochen"],
  ["Rahmenverträge", "5 Werktage", "Bis zu 6 Wochen"],
  ["Entscheidungen", "Innerhalb von 48 Stunden", "Durchschnittlich 8 Werktage"],
  ["Ansprechpartner", "Direkte Entscheider", "Mehrere Hierarchieebenen"],
  ["Sonderlösungen", "Schnell umsetzbar", "Oft langwierige Freigaben"],
  ["Reaktionsgeschwindigkeit", "Sofort", "Häufig verzögert"],
  ["Flexibilität", "Hoch", "Begrenzt durch Konzernvorgaben"],
];

const vorteile = [
  "Schnelle Bereitstellung von Personal",
  "Kurze Entscheidungswege",
  "Direkter Zugang zur Geschäftsführung",
  "Flexible Lösungen statt Standardprozesse",
  "Persönliche Betreuung",
  "Bundesweite Recruiting-Struktur",
  "Hohe Reaktionsgeschwindigkeit bei Personalengpässen",
  "Verlässliche Umsetzung auch bei kurzfristigen Anforderungen",
];

function Haken({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-5 w-5 shrink-0 ${className}`}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.7a1 1 0 0 0-1.4-1.4L9 10.18 7.7 8.88a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function WarumFlixwork() {
  return (
    <section id="warum" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Warum Flixwork</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Inhabergeführt statt Konzern — deshalb entscheiden wir in Stunden,
            nicht in Wochen.
          </h2>
          <p className="mt-5 leading-relaxed text-navy/65">
            Viele Personaldienstleister gehören internationalen Konzernen an.
            Entscheidungen werden über Niederlassungen, Regionalleiter und
            Zentralen abgestimmt. Wertvolle Zeit geht verloren.
          </p>
          <p className="mt-4 leading-relaxed text-navy/65">
            Die Flixwork Gruppe ist inhabergeführt. Deshalb können wir schnell,
            flexibel und kundenorientiert handeln — ohne lange Freigabeschleifen
            und ohne Konzernbürokratie.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="text-lg font-bold text-navy">Der direkte Vergleich</h3>
          <div className="mt-5 overflow-hidden rounded-3xl border border-navy/10 bg-white">
            <div className="hidden border-b border-navy/10 bg-cloud/60 px-6 py-4 md:grid md:grid-cols-[1.1fr_1fr_1fr] md:gap-6">
              <span aria-hidden="true" />
              <span className="text-sm font-bold text-navy">Flixwork Gruppe</span>
              <span className="text-sm font-semibold text-navy/45">Typischer Konzernanbieter</span>
            </div>

            {vergleich.map(([kriterium, flix, konzern]) => (
              <div
                key={kriterium}
                className="border-t border-navy/10 px-6 py-5 first:border-t-0 md:grid md:grid-cols-[1.1fr_1fr_1fr] md:items-center md:gap-6 md:border-t-0 md:border-b md:border-navy/5 md:py-4 md:last:border-b-0"
              >
                <p className="font-bold text-navy">{kriterium}</p>
                <p className="mt-3 flex items-start gap-2 md:mt-0">
                  <Haken className="text-sky" />
                  <span className="text-sm font-semibold text-navy">
                    {flix}
                    <span className="ml-1 font-medium text-navy/40 md:hidden">· Flixwork</span>
                  </span>
                </p>
                <p className="mt-2 flex items-start gap-2 md:mt-0">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-0.5 w-3 shrink-0 rounded-full bg-navy/25 md:mt-2.5"
                  />
                  <span className="text-sm text-navy/50">
                    {konzern}
                    <span className="ml-1 md:hidden">· Konzernanbieter</span>
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-navy md:text-3xl">
              Geschwindigkeit schafft Wettbewerbsvorteile
            </h3>
            <p className="mt-4 leading-relaxed text-navy/65">
              Wenn Produktionslinien laufen, Aufträge abgearbeitet werden müssen
              oder saisonale Peaks bevorstehen, zählen keine Konzernstrukturen —
              sondern Ergebnisse. Deshalb vertrauen Kunden aus Logistik,
              Industrie und Handwerk auf die Flixwork Gruppe.
            </p>
            <p className="mt-4 leading-relaxed text-navy/65">
              Als inhabergeführte Unternehmensgruppe kombinieren wir die
              Flexibilität eines mittelständischen Unternehmens mit den
              Strukturen eines professionellen Personaldienstleisters:
              <span className="font-semibold text-navy">
                {" "}Mittelstandsgeschwindigkeit, bundesweite Leistungsfähigkeit.
              </span>
            </p>
            <a
              href="#anfrage"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky"
            >
              Personal anfragen
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal className="rounded-3xl border border-navy/10 bg-white p-7 md:p-9">
            <h3 className="text-lg font-bold text-navy">Ihre Vorteile</h3>
            <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {vorteile.map((v) => (
                <li key={v} className="flex items-start gap-2.5">
                  <Haken className="mt-0.5 text-sky" />
                  <span className="text-sm leading-relaxed text-navy/70">{v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
