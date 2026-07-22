import Image from "next/image";
import Reveal from "./Reveal";

// Team-Sektion der Handwerk-Seite, übernommen von flixmonteure.com: Foto,
// Name, Funktion — darunter die direkten Kontaktwege. Unterstützt den
// wichtigsten USP der Seite ("persönlicher Ansprechpartner") mit Gesichtern.
const team = [
  { name: "Tomasz Kowalski", rolle: "Personaldisponent", bild: "/monteure/Tomasz_Kowalski-Personaldisponent.jpg" },
  { name: "Angela Nowak", rolle: "Kaufmännische Sachbearbeitung und Lohnbuchhaltung", bild: "/monteure/Angela_Nowak-Lohnbuchhaltung.jpg" },
  { name: "Andreas Wolf", rolle: "Geschäftsführer", bild: "/monteure/Andreas_Wolf-Geschaeftsfuehrer.jpg" },
];

const MAIL = "info@flixmonteure.com";
const TELEFON = "+49 551 790 988 53";

function Icon({ path }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FlixmonteureTeam() {
  return (
    <section id="team" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Ihr Ansprechpartner</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">Unser Team</h2>
          <p className="mt-4 leading-relaxed text-navy/65">
            Kontaktieren Sie uns gerne telefonisch, via E-Mail, WhatsApp oder
            hinterlassen Sie uns Ihre Kontaktdaten für einen Rückruf.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {team.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.bild}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-7 py-6">
                <p className="text-xl font-bold text-navy">{p.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.rolle}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Button-Stil identisch zum Abschluss-CTA: gefüllte Pille für die
              Hauptaktion, umrandete Pille daneben. */}
          <a
            href={`mailto:${MAIL}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-sky px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-transform hover:scale-[1.03] hover:bg-sky-soft sm:w-auto"
          >
            <Icon path="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
            {MAIL}
          </a>
          <a
            href={`tel:${TELEFON.replace(/[^\d+]/g, "")}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-navy/20 px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-white sm:w-auto"
          >
            <Icon path="M4 5a1 1 0 0 1 1-1h2.6a1 1 0 0 1 1 .76l.8 3.2a1 1 0 0 1-.55 1.13l-1.6.8a12 12 0 0 0 5.4 5.4l.8-1.6a1 1 0 0 1 1.13-.55l3.2.8a1 1 0 0 1 .76 1V17a2 2 0 0 1-2 2A15 15 0 0 1 4 6.5V5z" />
            {TELEFON}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
