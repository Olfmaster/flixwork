import Image from "next/image";
import Navbar from "./Navbar";
import Counter from "./Counter";

// Hero der Bewerberseiten. Gleiche Bauweise wie der Unternehmens-Hero, damit
// beide Welten erkennbar zusammengehören, aber ruhiger: eine Aussage, ein
// Hauptweg, große Schaltflächen für die Bedienung mit dem Daumen.
export default function BewerberHero({
  eyebrow,
  titel,
  text,
  bild = "/bewerber/job-portal.png",
  bildPosition = "object-center",
  cta,
  ctaSekundaer,
  kennzahlen,
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image src={bild} alt="" fill priority sizes="100vw" className={`object-cover ${bildPosition}`} />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-navy/65" />
      <Navbar variant="bewerber" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">{titel}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{text}</p>

          {(cta || ctaSekundaer) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {cta ? (
                <a
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sky px-7 py-4 text-base font-semibold text-white shadow-lg shadow-sky/25 transition-transform hover:scale-[1.03] hover:bg-sky-soft"
                >
                  {cta.label}
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
              {ctaSekundaer ? (
                <a
                  href={ctaSekundaer.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {ctaSekundaer.label}
                </a>
              ) : null}
            </div>
          )}
        </div>

        {/* Kennzahlen zählen beim Erscheinen hoch. Einträge ohne `to` (etwa
            "Unbegrenzt") werden unverändert ausgegeben, damit auch Textwerte
            in derselben Reihe stehen können. */}
        {kennzahlen?.length ? (
          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            {kennzahlen.map((k) => (
              <div key={k.label}>
                <dt className="text-3xl font-bold leading-none text-sky-soft md:text-4xl">
                  {typeof k.to === "number" ? (
                    <Counter to={k.to} prefix={k.prefix} suffix={k.suffix} />
                  ) : (
                    k.wert
                  )}
                </dt>
                <dd className="mt-2 text-sm leading-snug text-white/70">{k.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
