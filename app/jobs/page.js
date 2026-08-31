import BewerberHero from "@/components/BewerberHero";
import JobsBrowser from "@/components/JobsBrowser";
import JobKarte from "@/components/JobKarte";
import FaqBlock from "@/components/FaqBlock";
import BewerberCTA from "@/components/BewerberCTA";
import DemoHinweis from "@/components/DemoHinweis";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { getJobs } from "@/lib/zvoove";
import { branchenAus, standorteAus } from "@/lib/jobwelt";

// 15 Minuten, siehe REVALIDATE in lib/zvoove.js. Next.js verlangt hier einen
// literalen Wert, deshalb steht die Zahl ausnahmsweise doppelt im Projekt.
export const revalidate = 900;

export const metadata = {
  title: "Jobbörse — offene Stellen in Ihrer Region",
  description:
    "Aktuelle Stellenangebote bei Flixwork: Lager, Produktion, Handwerk und kaufmännische Berufe in Nordhessen, Südniedersachsen und Sachsen. Faire Bezahlung nach Tarif, Startprämie und unbefristeter Vertrag.",
  alternates: { canonical: "/jobs" },
};

const vorteile = [
  ["Bezahlung nach Tarif plus Zuschläge", "Vergütung nach GVP-Tarifvertrag, dazu die Branchenzuschläge des Kundenbetriebs. Was Sie verdienen, steht vor dem ersten Tag fest."],
  ["Startprämie bis 300 €", "Für viele Stellen zahlen wir eine Startprämie, ausgezahlt nach den ersten Wochen im Einsatz."],
  ["Unbefristeter Arbeitsvertrag", "Sie sind bei uns fest angestellt, auch zwischen zwei Einsätzen."],
  ["Übernahme ist gewollt", "Unsere Kunden suchen Leute, die bleiben. Wer sich bewährt, wird häufig übernommen, und das ist ausdrücklich in Ordnung."],
  ["Ein Ansprechpartner, der Sie kennt", "Kein Callcenter und keine Nummer. Sie haben eine feste Person, die Ihren Einsatz und Ihre Wünsche kennt."],
  ["Regional statt Montage", "Der Großteil unserer Einsätze liegt in Ihrer Region. Abends sind Sie zu Hause."],
];

const ablauf = [
  ["01", "Melden", "Formular, WhatsApp oder Anruf. Name, Telefonnummer und wonach Sie suchen reichen völlig."],
  ["02", "Sprechen", "Wir melden uns innerhalb von 24 Stunden und klären in Ruhe, welche Stelle wirklich passt."],
  ["03", "Starten", "Vertrag, Arbeitskleidung, Einweisung. In den meisten Fällen beginnen Sie innerhalb einer Woche."],
];

const faq = [
  ["Kostet mich die Vermittlung etwas?", "Nein. Für Bewerber ist unsere Vermittlung vollständig kostenlos. Bezahlt werden wir vom Kundenbetrieb."],
  ["Brauche ich einen Lebenslauf?", "Für den ersten Kontakt nicht. Rufen Sie an oder schicken Sie uns Ihre Nummer, alles Weitere klären wir im Gespräch. Unterlagen können Sie später nachreichen."],
  ["Wie schnell kann ich anfangen?", "Wir melden uns innerhalb von 24 Stunden. Wenn alles passt, starten Sie in der Regel innerhalb einer Woche, bei dringenden Einsätzen auch schneller."],
  ["Werde ich nach Tarif bezahlt?", "Ja. Grundlage ist der GVP-Tarifvertrag, dazu kommen die Branchenzuschläge des Einsatzbetriebs sowie Urlaubs- und Weihnachtsgeld."],
  ["Kann mich der Kundenbetrieb übernehmen?", "Ja, und das ist ausdrücklich erwünscht. Viele unserer Einsätze sind von Anfang an mit dem Ziel der Übernahme geplant."],
  ["Bekomme ich einen unbefristeten Vertrag?", "In der Regel ja. Sie sind bei Flixwork angestellt, auch in der Zeit zwischen zwei Einsätzen."],
  ["Was ist, wenn keine Stelle passt?", "Dann nehmen wir Sie in unsere Vormerkung auf und melden uns, sobald etwas Passendes hereinkommt. Der Stellenmarkt ändert sich bei uns fast täglich."],
];

export default async function JobsPage() {
  const jobs = await getJobs();
  const branchen = branchenAus(jobs);
  const standorte = standorteAus(jobs);
  const neueste = [...jobs]
    .sort((a, b) => String(b.aktualisiertAm).localeCompare(String(a.aktualisiertAm)))
    .slice(0, 2);

  return (
    <>
      <main>
        <BewerberHero
          eyebrow="Jobbörse"
          titel={
            jobs.length ? (
              <>
                <Counter to={jobs.length} /> offene Stellen. Eine davon ist Ihre.
              </>
            ) : (
              "Offene Stellen in Ihrer Region."
            )
          }
          text="Lager, Produktion, Handwerk und Büro in Nordhessen, Südniedersachsen und Sachsen. Bezahlung nach Tarif, Startprämie und ein Ansprechpartner, der Sie beim Namen kennt."
          cta={{ label: "Stellen ansehen", href: "#stellen" }}
          ctaSekundaer={{ label: "Ohne passende Stelle bewerben", href: "/bewerben" }}
          kennzahlen={[
            { to: 24, suffix: " h", label: "Rückmeldung auf Ihre Bewerbung" },
            { to: 300, prefix: "bis ", suffix: " €", label: "Startprämie je nach Stelle" },
            { to: standorte.length, label: "Einsatzorte mit offenen Stellen" },
          ]}
        />

        <DemoHinweis />

        <section id="stellen" className="bg-sand py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            {jobs.length === 0 ? (
              <div className="rounded-3xl border border-navy/10 bg-white px-6 py-16 text-center">
                <h2 className="text-2xl font-bold text-navy">Unsere Stellenliste ist gerade nicht erreichbar.</h2>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-navy/60">
                  Das liegt an uns, nicht an Ihnen. Rufen Sie uns einfach an, wir
                  sagen Ihnen direkt, was offen ist.
                </p>
              </div>
            ) : (
              <JobsBrowser jobs={jobs} branchen={branchen} standorte={standorte} />
            )}
          </div>
        </section>

        {/* Warum Flixwork als Arbeitgeber */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Was Sie bekommen</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
                Zeitarbeit hat einen Ruf. Wir arbeiten täglich dagegen an.
              </h2>
              <p className="mt-5 leading-relaxed text-navy/65">
                Ordentlich bezahlt, ehrlich informiert und persönlich betreut.
                Das ist kein Versprechen für die Website, sondern der Grund,
                warum viele unserer Leute Kollegen mitbringen.
              </p>
            </Reveal>

            <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
              {vorteile.map(([titel, text]) => (
                <div key={titel} className="rounded-3xl border border-navy/10 bg-mist p-7">
                  <h3 className="text-lg font-bold text-navy">{titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Ablauf */}
        <section className="bg-sand py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">In drei Schritten</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
                So läuft Ihre Bewerbung.
              </h2>
            </Reveal>
            <Reveal className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.12}>
              {ablauf.map(([nr, titel, text]) => (
                <div key={nr} className="rounded-3xl border border-navy/10 bg-white p-7">
                  <span className="text-sm font-bold tracking-[0.2em] text-sky">{nr}</span>
                  <h3 className="mt-4 text-xl font-bold text-navy">{titel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Neueste Stellen als Anreißer, damit die Seite auch ohne Filter
            Bewegung zeigt */}
        {neueste.length > 0 && (
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <Reveal className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-navy md:text-3xl">Zuletzt hinzugekommen</h2>
                <a href="#stellen" className="text-sm font-semibold text-sky hover:underline">
                  Alle Stellen ansehen →
                </a>
              </Reveal>
              <Reveal className="mt-8 grid gap-5 md:grid-cols-2" stagger={0.1}>
                {neueste.map((job) => (
                  <JobKarte key={job.id} job={job} />
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* Standorte und Branchen: eigene Landingpages, gleichzeitig interne
            Verlinkung für die Suchmaschine */}
        {standorte.length > 0 && (
          <section id="standorte" className="bg-sand py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <Reveal className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Standorte</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">Jobs in Ihrer Nähe</h2>
                <p className="mt-4 leading-relaxed text-navy/65">
                  Wir besetzen dort, wo wir die Betriebe persönlich kennen. Wählen
                  Sie Ihre Stadt und sehen Sie, was gerade offen ist.
                </p>
              </Reveal>
              <Reveal className="mt-10 flex flex-wrap gap-3" stagger={0.04}>
                {standorte.map((s) => (
                  <a
                    key={s.slug}
                    href={`/jobs-in/${s.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
                  >
                    {s.name}
                    <span className="text-navy/40">{s.anzahl}</span>
                  </a>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {branchen.length > 0 && (
          <section id="branchen" className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <Reveal className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Bereiche</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
                  Wo möchten Sie arbeiten?
                </h2>
              </Reveal>
              <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
                {branchen.map((b) => (
                  <a
                    key={b.slug}
                    href={`/branchen/${b.slug}`}
                    className="group rounded-3xl border border-navy/10 bg-mist p-7 transition-colors hover:border-navy/25"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/40">
                      {b.anzahl} {b.anzahl === 1 ? "Stelle" : "Stellen"}
                    </p>
                    <h3 className="mt-2 flex items-center gap-2 text-lg font-bold text-navy">
                      {b.name}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </h3>
                    <p className="mt-1.5 text-sm text-navy/55">{b.kurz}</p>
                  </a>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        <FaqBlock
          bg="bg-sand"
          text="Die Fragen, die uns am Telefon am häufigsten gestellt werden."
          items={faq}
        />

        <BewerberCTA />
      </main>
      <Footer />
    </>
  );
}
