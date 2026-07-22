import Image from "next/image";
import Reveal from "./Reveal";

// "All Inclusive" als animierte Checkliste (Website-Review 17.07.2026):
// Fahrzeug, Werkzeug, Unterkunft, PSA werden nacheinander abgehakt. Kernaussage:
// keine Zusatzinvestitionen für den Kunden — es gibt nur den Stundensatz.
const punkte = [
  ["Fahrzeug", "Firmenwagen inklusive — Mercedes-Benz und Volkswagen, angemeldet, versichert, betankt."],
  ["Werkzeug", "Markenwerkzeug von Hilti und Würth, vollständig und einsatzbereit."],
  ["Unterkunft", "An- und Abreise, Übernachtung und Verpflegungspauschale organisieren wir."],
  ["PSA & Arbeitskleidung", "Persönliche Schutzausrüstung und Arbeitskleidung von Engelbert Strauss."],
];

function Haken() {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky text-white">
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export default function AllInclusive() {
  return (
    <section id="all-inclusive" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">All Inclusive</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
                Alles dabei. Sie zahlen nur den Stundensatz.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-navy/65">
                Unsere Monteure kommen komplett ausgestattet auf Ihre Baustelle —
                keine Zusatzinvestitionen, keine versteckten Posten, keine
                Organisation auf Ihrer Seite.
              </p>
            </Reveal>

            <Reveal as="ul" className="mt-10 space-y-5" stagger={0.18}>
              {punkte.map(([titel, text]) => (
                <li key={titel} className="flex items-start gap-4">
                  <Haken />
                  <div>
                    <p className="text-lg font-bold text-navy">{titel}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/60">{text}</p>
                  </div>
                </li>
              ))}
            </Reveal>

            <Reveal className="mt-10 rounded-2xl border border-navy/10 bg-mist px-6 py-5">
              <p className="text-sm font-semibold leading-relaxed text-navy">
                Ergebnis: 100 % kalkulierbar. Ein Stundensatz — kein Aufwand für
                Fahrzeug, Werkzeug, Unterkunft oder Ausrüstung.
              </p>
            </Reveal>
          </div>

          <Reveal y={36} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/monteure/flixmonteure-fahrzeug01.jpg"
              alt="Einsatzfahrzeug der Flixmonteure"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
