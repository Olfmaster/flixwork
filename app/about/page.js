import Image from "next/image";
import BewerberHero from "@/components/BewerberHero";
import Auszeichnung from "@/components/Auszeichnung";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { leistungszahlen } from "@/lib/leistungszahlen";
import { kontakt } from "@/lib/kontakt";

export const metadata = {
  title: "Über uns — regional, schnell und zuverlässig",
  description:
    "Flixwork ist ein inhabergeführter Personaldienstleister für Logistik, Industrie und Handwerk. Kurze Wege, feste Ansprechpartner und Betriebe, die wir persönlich kennen.",
  alternates: { canonical: "/about" },
};

const werte = [
  [
    "Wir kennen die Hallen, nicht nur die Adressen",
    "Bevor wir jemanden vermitteln, waren wir vor Ort. Wir wissen, wie in welchem Betrieb gearbeitet wird, wie die Schichten laufen und wer zu wem passt.",
  ],
  [
    "Ein Ansprechpartner, keine Warteschleife",
    "Sie haben eine Person, die Ihren Fall kennt, und deren Nummer im Telefon. Das gilt für Mitarbeitende genauso wie für Kunden.",
  ],
  [
    "Ehrlich statt beschönigt",
    "Wenn ein Einsatz körperlich hart ist, sagen wir das vorher. Wer weiß, worauf er sich einlässt, bleibt länger, und genau das wollen beide Seiten.",
  ],
  [
    "Übernahme ist kein Verlust",
    "Wenn ein Kunde jemanden fest einstellen möchte, freuen wir uns. Aus übernommenen Mitarbeitenden werden später oft die Kunden, die uns wieder anrufen.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <main>
        <BewerberHero
          eyebrow="Über uns"
          titel="Regional, schnell und zuverlässig."
          text="Flixwork ist ein inhabergeführter Personaldienstleister für Logistik, Industrie und Handwerk. Wir arbeiten dort, wo wir die Betriebe persönlich kennen, und stehen für die Menschen ein, die wir vermitteln."
          bild="/bewerber/team.png"
          cta={{ label: "Offene Stellen", href: "/jobs" }}
          ctaSekundaer={{ label: "Personal anfragen", href: "/unternehmen" }}
        />

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
                  Zwei Seiten, dieselbe Haltung.
                </h2>
                <div className="mt-6 space-y-5 leading-relaxed text-navy/70">
                  <p>
                    Personaldienstleistung funktioniert nur, wenn beide Seiten
                    gut behandelt werden. Ein Betrieb, der schlechte Erfahrungen
                    macht, ruft nicht wieder an. Und wer sich als Mitarbeiter
                    verheizt fühlt, ist nach drei Wochen weg. Beides kostet alle
                    Beteiligten Geld und Nerven.
                  </p>
                  <p>
                    Deshalb arbeiten wir mit überschaubaren Zahlen statt mit
                    Masse. Wir besetzen dort, wo wir die Betriebe kennen, sagen
                    vorher, was einen erwartet, und bleiben während des Einsatzes
                    erreichbar. Das klingt selbstverständlich, ist es in unserer
                    Branche aber nicht.
                  </p>
                  <p>
                    Für Unternehmen heißt das: kurze Entscheidungswege bis in die
                    Geschäftsführung. Für Bewerber heißt es: eine Person, die Sie
                    beim Namen kennt und deren Nummer Sie im Handy haben.
                  </p>
                </div>
              </Reveal>

              <Reveal y={36} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/flixwork-logistik.jpg"
                  alt="Mitarbeitende in einer Logistikhalle"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-sand py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Wofür wir stehen</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
                Vier Punkte, an denen wir uns messen lassen.
              </h2>
            </Reveal>
            <Reveal className="mt-12 grid gap-5 md:grid-cols-2" stagger={0.1}>
              {werte.map(([titel, text]) => (
                <div key={titel} className="rounded-3xl border border-navy/10 bg-white p-7 md:p-8">
                  <h3 className="text-xl font-bold text-navy">{titel}</h3>
                  <p className="mt-3 leading-relaxed text-navy/65">{text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="bg-navy py-20 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">Leistungszahlen</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Woran Sie uns erkennen.</h2>
            </Reveal>
            <Reveal className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6" stagger={0.08}>
              {leistungszahlen.map((z) => (
                <div key={z.label}>
                  <Counter
                    to={z.to}
                    prefix={z.prefix}
                    suffix={z.suffix}
                    className="block text-3xl font-bold leading-none text-sky-soft md:text-4xl"
                  />
                  <p className="mt-2 text-sm leading-snug text-white/70">{z.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <Auszeichnung />

        <section className="bg-sand py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <Reveal className="grid gap-5 md:grid-cols-2">
              <a
                href="/jobs"
                className="group rounded-3xl bg-navy p-8 text-white transition-transform hover:-translate-y-0.5 md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-soft">Für Bewerber</p>
                <p className="mt-3 flex items-center gap-3 text-2xl font-bold">
                  Offene Stellen ansehen
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Lager, Produktion, Handwerk und Büro in Ihrer Region.
                </p>
              </a>
              <a
                href="/unternehmen"
                className="group rounded-3xl border border-navy/10 bg-white p-8 transition-transform hover:-translate-y-0.5 md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Für Unternehmen</p>
                <p className="mt-3 flex items-center gap-3 text-2xl font-bold text-navy">
                  Personal anfragen
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy/60">
                  Fach- und Hilfskräfte für Logistik, Industrie und Handwerk.
                </p>
              </a>
            </Reveal>

            <Reveal className="mt-10 text-center text-sm text-navy/60">
              <p>
                Lieber direkt sprechen?{" "}
                <a href={kontakt.telefonHref} className="font-semibold text-sky hover:underline">
                  {kontakt.telefon}
                </a>{" "}
                oder{" "}
                <a href={kontakt.mailHref} className="font-semibold text-sky hover:underline">
                  {kontakt.mail}
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
