import Image from "next/image";
import Reveal from "./Reveal";
import { bereicheListe } from "@/lib/bereiche";

// Startseite: die drei Bereiche bewusst nur oberflächlich anteasern und auf die
// jeweilige Unterseite verlinken (Design-Review 24.06.2026). Heller Abschnitt,
// die Dominanz entsteht über die dunkelblauen Karten (Randstad-Stil: weißer
// Hintergrund, blaue Boxen).
export default function Schwerpunkte() {
  return (
    <section id="schwerpunkte" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Unsere Schwerpunkte</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Drei Bereiche. Ein Anspruch: das passende Personal.
          </h2>
          <p className="mt-4 max-w-xl text-navy/60">
            Wählen Sie Ihren Bereich — und sehen Sie auf der jeweiligen Seite,
            was Flixwork dort konkret für Sie leistet.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {bereicheListe.map((b) => (
            <a
              key={b.slug}
              href={`/${b.slug}`}
              className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl p-8 text-white shadow-xl shadow-navy/10 transition-all hover:-translate-y-1"
            >
              <Image
                src={b.bild}
                alt={`Einsatzbereich ${b.name}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/25" />

              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-sky">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    {b.icon}
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-bold text-white">{b.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{b.teaser}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-sky-soft">
                  Mehr erfahren
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
