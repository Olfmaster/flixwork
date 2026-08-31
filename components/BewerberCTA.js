import Reveal from "./Reveal";
import { kontakt } from "@/lib/kontakt";

// Abschluss der Bewerberseiten. Drei Wege nebeneinander, weil Bewerber sehr
// unterschiedlich Kontakt aufnehmen: Formular, WhatsApp oder einfach anrufen.
// Keiner der Wege ist versteckt, keiner verlangt einen Lebenslauf.
export default function BewerberCTA({
  titel = "Wir melden uns innerhalb von 24 Stunden.",
  text = "Sie brauchen weder Anschreiben noch fertigen Lebenslauf. Name, Telefonnummer und die Frage, was Sie suchen, reichen für den ersten Schritt.",
  jobSlug,
}) {
  const bewerbenHref = jobSlug ? `/bewerben?job=${jobSlug}` : "/bewerben";

  return (
    <section className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">{titel}</h2>
          <p className="mt-4 leading-relaxed text-white/70">{text}</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center" stagger={0.1}>
          <a
            href={bewerbenHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky/25 transition-transform hover:scale-[1.03] hover:bg-sky-soft"
          >
            Jetzt bewerben
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={kontakt.whatsappHref}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Per WhatsApp schreiben
          </a>
          <a
            href={kontakt.telefonHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {kontakt.telefon}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
