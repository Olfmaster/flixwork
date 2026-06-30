// Einheitlicher Seitenabschluss: hält Besucher im Loop. Immer ein Weg zurück
// zur Bereichsauswahl (3 Schwerpunkte auf der Startseite) plus ein klarer
// Kontakt-CTA. Helle Section, dominanter dunkelblauer Kasten (Boxen-Stil).
export default function AbschlussCTA({ kontaktHref = "#anfrage", kontaktLabel = "Kontakt aufnehmen" }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flx-hero-bg overflow-hidden rounded-3xl px-6 py-14 text-center text-white shadow-xl shadow-navy/10 md:px-12 md:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Wie können wir Sie unterstützen?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">
            Wählen Sie Ihren Bereich oder sprechen Sie uns direkt an — wir melden
            uns persönlich und unverbindlich bei Ihnen.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={kontaktHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-transform hover:scale-[1.03] hover:bg-sky-soft sm:w-auto"
            >
              {kontaktLabel}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="/#schwerpunkte"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Zur Bereichsauswahl
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
