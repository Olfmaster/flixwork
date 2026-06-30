import Reveal from "./Reveal";

// USP-Detailblock einer Bereichs-Unterseite. Helle Section unter dem Hero —
// sorgt für die im Design-Review gewünschte Abwechslung dunkelblau/weiß.
export default function BereichUsps({ b }) {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Ihre Vorteile</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Warum {b.name} mit Flixwork
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {b.usps.map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-navy/10 bg-mist p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                <svg viewBox="0 0 20 20" className="h-5 w-5 text-sky-soft" fill="currentColor" aria-hidden="true">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
