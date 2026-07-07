import Image from "next/image";
import Navbar from "./Navbar";
import Reveal from "./Reveal";
import Counter from "./Counter";

// Seiten-Hero für eine Bereichs-Unterseite (Logistik/Industrie/Handwerk).
// Navy-Fläche, damit die transparente Navbar darauf funktioniert. Zeigt nur
// das eine Thema — keine Vermischung mit anderen Bereichen.
export default function BereichHero({ b }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image
        src={b.bild}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/88 to-navy/70" />
      <Navbar logoOverride={b.navbarLogo} />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className={b.panel || b.kennzahlenPanel ? "grid items-center gap-12 lg:grid-cols-2 lg:gap-16" : ""}>
          <Reveal className={b.panel || b.kennzahlenPanel ? undefined : "max-w-3xl"}>
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

          {b.panel && (
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
          )}

          {/* KPIs direkt im Hero-Glaspanel statt separater Box (Folgeanpassung
              nach Kundenfeedback: keine zusätzliche Box, kreativ in den Hero
              integriert). */}
          {b.kennzahlenPanel && (
            <Reveal y={36} className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{b.panelTitel}</p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
                {b.kennzahlenPanel.map((z) => (
                  <div key={z.label}>
                    <Counter
                      to={z.to}
                      prefix={z.prefix}
                      suffix={z.suffix}
                      className="block text-3xl font-bold leading-none text-sky-soft md:text-4xl"
                    />
                    <p className="mt-1.5 text-xs font-medium leading-snug text-white/70">{z.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Schlagwort-Laufband — KPIs (Logistik) oder Branchen-Spezialisierungen
          (Industrie) direkt im Hero (Website-Review 03.07.2026) */}
      {b.band && (
        <div className="relative border-t border-white/10 bg-navy-deep/40 py-4">
          <div className="flex w-max flex-nowrap gap-10 pl-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] flx-marquee">
            {[...b.band, ...b.band].map((eintrag, i) => (
              <span key={i} className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-white/80">
                {eintrag} <span className="text-sky-soft/60">/</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
