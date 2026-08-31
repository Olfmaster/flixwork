import Image from "next/image";
import logo from "@/public/flixwork-logo.png";
import Counter from "@/components/Counter";
import { kontakt } from "@/lib/kontakt";
import { getJobs } from "@/lib/zvoove";
import { standorteAus } from "@/lib/jobwelt";

// Portal-Weiche: die Startseite fragt nur eine einzige Sache, nämlich wer da
// gerade kommt. Bewerber und Unternehmen suchen komplett Unterschiedliches,
// und beide Zielgruppen auf einer Seite zu bedienen hat auf der alten Website
// dazu geführt, dass Unternehmen sich durch Jobangebote klicken mussten.
//
// Bewusst ohne Weiterleitung: die Startseite bleibt eine echte, indexierbare
// Seite und verteilt Linkkraft auf beide Bereiche.
//
// Die Zahl der offenen Stellen kommt live aus derselben Quelle wie die
// Jobbörse. Das macht die Seite lebendig, ohne dass jemand etwas pflegen muss.

// 15 Minuten, siehe REVALIDATE in lib/zvoove.js. Next.js verlangt hier einen
// literalen Wert, deshalb steht die Zahl ausnahmsweise doppelt im Projekt.
export const revalidate = 900;

export const metadata = {
  title: "Flixwork — regional, schnell & zuverlässig",
  description:
    "Sie suchen einen Job oder Personal? Flixwork ist Ihr regionaler Partner für Logistik, Industrie und Handwerk. Offene Stellen mit Startprämie und Personallösungen für Unternehmen.",
  alternates: { canonical: "/" },
};

export default async function Portal() {
  const jobs = await getJobs();
  const staedte = standorteAus(jobs);

  const tueren = [
    {
      href: "/jobs",
      eyebrow: "Ich suche einen Job",
      titel: "Für Bewerber",
      text: "Offene Stellen in Ihrer Region, Bezahlung nach Tarif plus Zuschläge und eine Bewerbung, die in zwei Minuten erledigt ist.",
      bild: "/bewerber/job-portal.png",
      bildPos: "object-[50%_30%]",
      alt: "Mitarbeiter mit Handscanner in einer hellen Lagerhalle",
      badge: jobs.length ? { to: jobs.length, text: "offene Stellen" } : null,
      links: [
        ["Alle Stellenangebote", "/jobs"],
        ["Initiativbewerbung", "/bewerben"],
        ["Prämie bis 300 €", "/mitarbeiter-werben-mitarbeiter"],
      ],
    },
    {
      href: "/unternehmen",
      eyebrow: "Ich suche Personal",
      titel: "Für Unternehmen",
      text: "Fach- und Hilfskräfte für Logistik, Industrie und Handwerk. Inhabergeführt, mit kurzen Wegen und festen Ansprechpartnern.",
      bild: "/flixwork-industrie.jpg",
      bildPos: "object-center",
      alt: "Industriearbeiter an einer Produktionsanlage",
      badge: { to: 24, suffix: " h", text: "Reaktionszeit" },
      links: [
        ["Logistik", "/unternehmen/logistik"],
        ["Industrie", "/unternehmen/industrie"],
        ["Handwerk & Monteure", "/unternehmen/handwerk"],
      ],
    },
  ];

  return (
    <main className="flx-hero-bg relative flex min-h-svh flex-col overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-sky/25 blur-3xl flx-float"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-[30rem] w-[30rem] rounded-full bg-sky-soft/15 blur-3xl flx-float-rev"
      />

      {/* Kopf: Logo, Frage, Kontakt. Bewusst knapp, damit darunter Platz für
          zwei wirklich große Türen bleibt. */}
      <header className="relative px-5 pt-7 text-center md:px-8 md:pt-10">
        <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-6">
          <Image
            src={logo}
            alt="Flixwork"
            priority
            className="h-9 w-auto [filter:brightness(0)_invert(1)] md:h-12"
          />
          <div className="hidden items-center gap-6 text-sm text-white/60 sm:flex">
            <a href={kontakt.telefonHref} className="font-semibold text-white/85 transition-colors hover:text-white">
              {kontakt.telefon}
            </a>
            <a href={kontakt.mailHref} className="font-semibold text-white/85 transition-colors hover:text-white">
              {kontakt.mail}
            </a>
          </div>
        </div>

        <h1 className="mx-auto mt-10 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-tight md:mt-12 md:text-6xl lg:text-7xl">
          Willkommen bei Flixwork.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl">
          Damit Sie direkt im richtigen Bereich landen: Wonach suchen Sie?
        </p>
      </header>

      {/* Die beiden Türen. Auf großen Bildschirmen wächst die Seite, über die
          der Mauszeiger fährt, die andere weicht zurück. Das macht die
          Entscheidung spürbar, ohne dass etwas blinkt oder springt. */}
      <div className="relative mt-9 flex flex-1 flex-col gap-4 px-4 pb-6 md:mt-12 md:px-6 md:pb-8 lg:flex-row lg:gap-5">
        {tueren.map((t) => (
          <div
            key={t.href}
            className="group relative flex min-h-[26rem] flex-1 overflow-hidden rounded-[2rem] border border-white/15 transition-[flex-grow] duration-700 ease-out lg:min-h-[30rem] lg:hover:grow-[1.35]"
          >
            <Image
              src={t.bild}
              alt={t.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`object-cover ${t.bildPos} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/25 transition-colors duration-700 group-hover:from-navy-deep group-hover:via-navy-deep/65" />

            <div className="relative flex w-full flex-col justify-end p-7 md:p-10">
              <a href={t.href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-soft">
                <span className="absolute inset-0" aria-hidden="true" />

                {t.badge ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-soft opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-soft" />
                    </span>
                    <Counter to={t.badge.to} suffix={t.badge.suffix} />
                    &nbsp;{t.badge.text}
                  </span>
                ) : null}

                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">{t.eyebrow}</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  {t.titel}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-2xl transition-all duration-300 group-hover:translate-x-1.5 group-hover:border-white/70 group-hover:bg-white/10 md:h-14 md:w-14 md:text-3xl"
                  >
                    →
                  </span>
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 md:text-lg">{t.text}</p>
              </a>

              {/* Direkteinstiege: wer schon weiß, wohin er will, spart sich den
                  Zwischenschritt über die Bereichsstartseite. Liegt über der
                  Flächenverlinkung, deshalb relative und z-10. */}
              <ul className="relative z-10 mt-7 flex flex-wrap gap-2">
                {t.links.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="inline-flex rounded-full border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 backdrop-blur transition-colors hover:border-white/60 hover:bg-white/15 hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Laufband der Einsatzorte: zeigt auf einen Blick, dass wir regional
          arbeiten, und hält den unteren Rand in Bewegung. */}
      {staedte.length > 0 && (
        <div className="relative border-t border-white/10 bg-navy-deep/50 py-4">
          <div className="flex w-max flex-nowrap gap-10 pl-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] flx-marquee flx-marquee-slow">
            {[...staedte, ...staedte].map((s, i) => (
              <span key={i} className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-white/70">
                {s.name} <span className="text-sky-soft/60">/</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
