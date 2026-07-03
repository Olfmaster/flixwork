import Reveal from "./Reveal";

// Inhalt einer einzelnen Case Study (ohne Section-/Container-Rahmen), damit er
// sowohl eigenständig (CaseStudy) als auch in der Tab-Ansicht (CaseStudyTabs)
// verwendet werden kann. Ein Schema deckt alle Fälle ab — flache oder gruppierte
// Listen bei Lösung/Ergebnissen, Fließtext- oder Stichpunkt-Fälle.

// Kreis-Häkchen (identisch zu ExpressShuttle) für Ergebnis-/Lösungslisten.
function Check({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zm3.9 6.2-4.6 4.6a1 1 0 0 1-1.4 0L5.8 10.4a1 1 0 1 1 1.4-1.4l1.4 1.4 3.9-3.9a1 1 0 1 1 1.4 1.4z" />
    </svg>
  );
}

// Spalten-Klasse abhängig von der Gruppenzahl (max. 3 nebeneinander).
function colsClass(n) {
  if (n >= 3) return "md:grid-cols-2 lg:grid-cols-3";
  if (n === 2) return "md:grid-cols-2";
  return "";
}

export default function CaseStudyBody({ cs, showKopf = true }) {
  return (
    <>
      {/* Kopf */}
      {showKopf && (
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">{cs.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            {cs.titel}
          </h2>
          {(cs.branche || cs.kunde) && (
            <p className="mt-4 text-sm text-navy/60">
              <span className="font-semibold text-navy/75">{cs.kunde ? "Kunde:" : "Branche:"}</span>{" "}
              {cs.kunde || cs.branche}
            </p>
          )}
        </Reveal>
      )}

      {cs.loesung?.length > 0 ? (
        <>
          {/* Ausgangssituation (+ Herausforderungen, falls als Stichpunkte vorhanden) */}
          <Reveal
            className={`${showKopf ? "mt-12" : ""} grid gap-6 ${cs.herausforderungen?.length ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}
            stagger={0.1}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Ausgangssituation</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-navy/70">{cs.ausgangssituation}</p>
            </div>
            {cs.herausforderungen?.length > 0 && (
              <div className="rounded-2xl border border-navy/10 bg-mist p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Herausforderungen</p>
                <ul className="mt-4 space-y-2.5">
                  {cs.herausforderungen.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-navy/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          {/* Unsere Lösung — dunkles Band (mit Stichpunkten) */}
          <Reveal className="mt-6 rounded-3xl flx-hero-bg p-8 text-white md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-soft">Unsere Lösung</p>
            {cs.loesungIntro && (
              <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{cs.loesungIntro}</p>
            )}
            <div className={`mt-7 grid gap-8 ${colsClass(cs.loesung.length)}`}>
              {cs.loesung.map((g, i) => (
                <div key={g.titel || i}>
                  {g.titel && <h3 className="text-lg font-bold text-white">{g.titel}</h3>}
                  <ul className={`space-y-3 ${g.titel ? "mt-4" : ""}`}>
                    {g.punkte.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky-soft" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {cs.loesungFazit && (
              <p className="mt-7 max-w-2xl border-t border-white/15 pt-6 leading-relaxed text-white/80">
                {cs.loesungFazit}
              </p>
            )}
          </Reveal>
        </>
      ) : (
        /* Prosa-Fall (keine Lösungs-Stichpunkte): Ausgangssituation & Lösung
           nebeneinander als gleich hohe helle/dunkle Karten. */
        <Reveal className={`${showKopf ? "mt-12" : ""} grid items-stretch gap-6 lg:grid-cols-2`} stagger={0.1}>
          <div className="rounded-3xl border border-navy/10 bg-mist p-7 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Ausgangssituation</p>
            <p className="mt-3 leading-relaxed text-navy/70">{cs.ausgangssituation}</p>
            {cs.herausforderungen?.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {cs.herausforderungen.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-navy/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-3xl flx-hero-bg p-7 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-soft">Unsere Lösung</p>
            {cs.loesungIntro && (
              <p className="mt-3 leading-relaxed text-white/80">{cs.loesungIntro}</p>
            )}
            {cs.loesungFazit && (
              <p className="mt-5 border-t border-white/15 pt-5 leading-relaxed text-white/80">
                {cs.loesungFazit}
              </p>
            )}
          </div>
        </Reveal>
      )}

      {/* Ergebnisse */}
      <Reveal className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Ergebnisse</p>
        {cs.ergebnisse.length === 1 && !cs.ergebnisse[0].titel ? (
          // Einzelne, ungetitelte Ergebnisliste → Raster kleiner Karten.
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cs.ergebnisse[0].punkte.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-mist p-5 text-sm font-medium text-navy/75 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
                {p}
              </div>
            ))}
          </div>
        ) : (
          <div className={`mt-5 grid gap-6 ${colsClass(cs.ergebnisse.length)}`}>
            {cs.ergebnisse.map((g, i) => (
              <div
                key={g.titel || i}
                className="rounded-2xl border border-navy/10 bg-mist p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5"
              >
                {g.titel && <h3 className="text-lg font-bold text-navy">{g.titel}</h3>}
                <ul className={`space-y-3 ${g.titel ? "mt-4" : ""}`}>
                  {g.punkte.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-navy/70">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Ergebnisse auf einen Blick (optionaler Kurzüberblick) */}
        {cs.ergebnisseKurz && (
          <div className="mt-6 grid gap-x-6 gap-y-3 rounded-2xl border border-navy/10 bg-mist p-6 sm:grid-cols-2 md:px-8">
            {cs.ergebnisseKurz.map((p) => (
              <div key={p} className="flex gap-3 text-sm font-medium text-navy/75">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
                {p}
              </div>
            ))}
          </div>
        )}
      </Reveal>

      {/* Kundenmehrwert */}
      {cs.kundenmehrwert && (
        <Reveal className="mt-6 rounded-2xl border-l-4 border-sky bg-cloud p-7 md:px-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Kundenmehrwert</p>
          <p className="mt-3 text-lg font-medium leading-relaxed text-navy md:text-xl">
            {cs.kundenmehrwert}
          </p>
        </Reveal>
      )}

      {/* Kundenstimme (optional) */}
      {cs.kundenstimme && (
        <Reveal className="mt-6 rounded-3xl flx-hero-bg p-8 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-soft">Kundenstimme</p>
          <blockquote className="mt-4 text-lg font-medium leading-relaxed text-white/90 md:text-xl">
            „{cs.kundenstimme.zitat}“
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-white/60">
            {cs.kundenstimme.autor}
          </figcaption>
        </Reveal>
      )}
    </>
  );
}
