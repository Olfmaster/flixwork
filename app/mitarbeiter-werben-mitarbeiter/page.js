import BewerberHero from "@/components/BewerberHero";
import FaqBlock from "@/components/FaqBlock";
import BewerberCTA from "@/components/BewerberCTA";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { kontakt } from "@/lib/kontakt";

export const metadata = {
  title: "Mitarbeiter werben Mitarbeiter — Prämie bis 300 €",
  description:
    "Empfehlen Sie Flixwork weiter und sichern Sie sich eine Prämie von bis zu 300 Euro. Sie melden uns den Kontakt, wir übernehmen den Rest.",
  alternates: { canonical: "/mitarbeiter-werben-mitarbeiter" },
};

const schritte = [
  ["01", "Namen nennen", "Sie sagen uns, wen wir ansprechen dürfen. Ein Anruf, eine WhatsApp oder eine kurze Mail genügt."],
  ["02", "Wir melden uns", "Wir übernehmen das Gespräch, klären die Wünsche und suchen den passenden Einsatz."],
  ["03", "Prämie kassieren", "Kommt es zur Einstellung, erhalten Sie Ihre Prämie von bis zu 300 Euro."],
];

// TODO (31.08.2026): Die genauen Auszahlungsbedingungen (Wartefrist, Staffelung
// nach Qualifikation) bitte von Flixwork bestätigen lassen. Bis dahin steht hier
// bewusst nur, was gesichert ist.
const faq = [
  ["Wie hoch ist die Prämie genau?", "Die Prämie beträgt bis zu 300 Euro und richtet sich nach der Stelle, die besetzt wird. Die genaue Höhe nennen wir Ihnen, sobald Sie uns den Kontakt melden."],
  ["Wen darf ich empfehlen?", "Jeden, der Arbeit sucht und noch nicht bei uns beschäftigt ist. Freunde, Nachbarn, ehemalige Kollegen, alle sind willkommen."],
  ["Wann wird ausgezahlt?", "Nach der Einstellung und einer kurzen Anlaufzeit im Einsatz. Die genaue Frist steht in der Prämienzusage, die Sie von uns bekommen."],
  ["Wie viele Personen darf ich empfehlen?", "So viele Sie möchten. Für jede erfolgreiche Empfehlung gibt es eine eigene Prämie."],
  ["Muss ich selbst bei Flixwork arbeiten?", "Nein. Auch wenn Sie uns nur kennen und jemanden empfehlen möchten, sprechen Sie uns an."],
];

export default function PraemiePage() {
  return (
    <>
      <main>
        <BewerberHero
          eyebrow="Mitarbeiter werben Mitarbeiter"
          titel="Sie kennen jemanden, der Arbeit sucht?"
          text="Empfehlen Sie uns weiter und sichern Sie sich bis zu 300 Euro Prämie. Sie nennen uns den Kontakt, alles Weitere übernehmen wir."
          bild="/bewerber/praemie.png"
          cta={{ label: "Empfehlung melden", href: kontakt.whatsappHref }}
          ctaSekundaer={{ label: `Anrufen: ${kontakt.telefon}`, href: kontakt.telefonHref }}
          kennzahlen={[
            { to: 300, suffix: " €", label: "maximale Prämie je Empfehlung" },
            { wert: "Unbegrenzt", label: "viele Empfehlungen möglich" },
            { to: 24, suffix: " h", label: "bis wir uns bei Ihrem Kontakt melden" },
          ]}
        />

        <section className="bg-sand py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">So einfach ist es</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
                Drei Schritte bis zur Prämie.
              </h2>
              <p className="mt-4 leading-relaxed text-navy/65">
                Sie müssen niemanden überreden und nichts ausfüllen. Ein Name und
                eine Nummer genügen uns.
              </p>
            </Reveal>

            <Reveal className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.12}>
              {schritte.map(([nr, titel, text]) => (
                <div key={nr} className="rounded-3xl border border-navy/10 bg-white p-7">
                  <span className="text-sm font-bold tracking-[0.2em] text-sky">{nr}</span>
                  <h3 className="mt-4 text-xl font-bold text-navy">{titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-10 rounded-3xl bg-navy px-7 py-9 text-center text-white md:px-10">
              <p className="text-2xl font-bold md:text-3xl">Empfehlung jetzt melden</p>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
                Am schnellsten geht es per WhatsApp. Schreiben Sie uns einfach den
                Namen und die Nummer, dann übernehmen wir.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={kontakt.whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center rounded-full bg-sky px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-sky-soft"
                >
                  Per WhatsApp melden
                </a>
                <a
                  href={kontakt.mailHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {kontakt.mail}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <FaqBlock titel="Fragen zur Prämie" items={faq} />

        <BewerberCTA
          titel="Selbst auf der Suche?"
          text="Dann schauen Sie sich unsere offenen Stellen an. Auch für Sie gilt: ein Anruf reicht für den Anfang."
        />
      </main>
      <Footer />
    </>
  );
}
