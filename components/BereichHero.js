import Navbar from "./Navbar";
import Reveal from "./Reveal";

// Seiten-Hero für eine Bereichs-Unterseite (Logistik/Industrie/Handwerk).
// Navy-Fläche, damit die transparente Navbar darauf funktioniert. Zeigt nur
// das eine Thema — keine Vermischung mit anderen Bereichen.
export default function BereichHero({ b }) {
  return (
    <section className="flx-hero-bg relative overflow-hidden text-white">
      <Navbar />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="flx-float absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />
        <span className="flx-float-rev absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-sky-soft/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">{b.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">{b.titel}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{b.text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={b.cta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-transform hover:scale-[1.03] hover:bg-sky-soft"
              >
                {b.cta.label}
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="/#schwerpunkte"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Zurück zur Übersicht
              </a>
            </div>
          </Reveal>

          <Reveal y={36} className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{b.panelTitel}</p>
            <ul className="mt-5 space-y-3">
              {b.panel.map((p) => (
                <li key={p} className="flex items-center gap-3 border-b border-white/10 pb-3 text-lg font-medium last:border-0 last:pb-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-soft" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
