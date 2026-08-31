import SeitenKopf from "@/components/SeitenKopf";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

// Impressum, wortgetreu von flixwork.de/impressum übernommen (Stand
// 31.08.2026). Inhaltlich bewusst nichts ergänzt, gekürzt oder umformuliert:
// Pflichtangaben ändert nur, wer sie auch verantwortet.
//
// Die E-Mail-Adressen stehen hier im Klartext statt wie auf der alten Seite als
// HTML-Entities. Die Verschleierung hält heute kaum noch einen Scraper auf,
// kostet aber Barrierefreiheit und macht die Adressen auf dem Handy
// unantastbar. Falls das anders gewünscht ist, sagen Sie Bescheid.
export const metadata = {
  title: "Impressum",
  description:
    "Impressum und Anbieterangaben der Gesellschaften der flixwork Personaldienst-Gruppe.",
  alternates: { canonical: "/impressum" },
};

const gesellschaften = [
  {
    name: "flixwork Personaldienst-Gruppe GmbH",
    strasse: "Wilhelmsstr. 10",
    ort: "34117 Kassel",
    geschaeftsfuehrung: "André Fissler",
    telefon: "+49 561 998 576 19",
    telefax: "+49 561 998 576 66",
    mail: "verwaltung@flixwork.de",
    registernummer: "HRB 18710",
    registergericht: "Amtsgericht Kassel",
    ustId: "DE 346381265",
  },
  {
    name: "flixwork Personaldienst GmbH",
    strasse: "Wilhelmsstr. 19",
    ort: "34117 Kassel",
    geschaeftsfuehrung: "André Fissler",
    telefon: "+49 561 998 576 0",
    telefax: "+49 561 998 576 66",
    mail: "info@flixwork.de",
    registernummer: "HRB 14531",
    registergericht: "Amtsgericht Kassel",
    ustId: "DE 254664793",
  },
  {
    name: "flixwork Personaldienst Service GmbH",
    strasse: "Kasseler Landstr. 20",
    ort: "37081 Göttingen",
    geschaeftsfuehrung: "Andreas Wolf",
    telefon: "+49 551 790 988 46",
    mail: "goettingen@flixwork.de",
    registernummer: "HRB 206669",
    registergericht: "Amtsgericht Göttingen",
    steuernummer: "20 200 51804",
  },
  {
    name: "flixwork Personaldienst Direkt GmbH",
    strasse: "Kasseler Landstr. 20",
    ort: "37081 Göttingen",
    geschaeftsfuehrung: "Andreas Wolf",
    telefon: "+49 551 79098853",
    mail: "halle@flixwork.de",
    registernummer: "HRB 31025",
    registergericht: "Amtsgericht Stendal",
    steuernummer: "110 106 02701",
  },
  {
    name: "ExpressShuttle Personenbeförderung GmbH",
    strasse: "Wilhelmsstraße 10",
    ort: "34117 Kassel",
    geschaeftsfuehrung: "André Fissler",
    telefon: "+49 173 599034",
    mail: "info@flixwork.de",
    registernummer: "HRB 20264",
    registergericht: "Amtsgericht Kassel",
    steuernummer: "019 233 20039",
  },
  {
    name: "flixmonteure GmbH",
    strasse: "Kasseler Landstr. 20",
    ort: "37081 Göttingen",
    geschaeftsfuehrung: "Andreas Wolf",
    telefon: "+49 561 998576 80",
    telefax: "+49 561 998 576 66",
    mail: "info@flixmonteure.de",
    registernummer: "HRB 205230",
    registergericht: "Amtsgericht Göttingen",
    steuernummer: "20 200 50751",
  },
];

export default function ImpressumPage() {
  return (
    <>
      <main>
        <SeitenKopf
          eyebrow="Rechtliches"
          titel="Impressum"
          text="Anbieterangaben der Gesellschaften der flixwork Personaldienst-Gruppe."
        />

        <section className="bg-sand py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="grid gap-5 md:grid-cols-2" stagger={0.08}>
              {gesellschaften.map((g) => (
                <article key={g.name} className="rounded-3xl border border-navy/10 bg-white p-7 md:p-8">
                  <h2 className="text-xl font-bold leading-snug text-navy">{g.name}</h2>

                  <address className="mt-4 not-italic leading-relaxed text-navy/70">
                    {g.strasse}
                    <br />
                    {g.ort}
                  </address>

                  <dl className="mt-6 space-y-3 border-t border-navy/10 pt-5 text-sm">
                    <Zeile label="Geschäftsführung">{g.geschaeftsfuehrung}</Zeile>
                    <Zeile label="Telefon">
                      <a href={`tel:${g.telefon.replace(/[^\d+]/g, "")}`} className="hover:text-sky">
                        {g.telefon}
                      </a>
                    </Zeile>
                    {g.telefax ? <Zeile label="Telefax">{g.telefax}</Zeile> : null}
                    <Zeile label="E-Mail">
                      <a href={`mailto:${g.mail}`} className="hover:text-sky">
                        {g.mail}
                      </a>
                    </Zeile>
                    <Zeile label="Registernummer">{g.registernummer}</Zeile>
                    <Zeile label="Registergericht">{g.registergericht}</Zeile>
                    {g.ustId ? <Zeile label="USt-IdNr.">{g.ustId}</Zeile> : null}
                    {g.steuernummer ? <Zeile label="Steuernummer">{g.steuernummer}</Zeile> : null}
                  </dl>
                </article>
              ))}
            </Reveal>

            <Reveal className="mt-12 flex flex-wrap gap-3">
              {/* Datenschutz liegt noch auf der bestehenden Seite. Sobald der
                  Text übernommen ist, hier auf /datenschutz umstellen. */}
              <a
                href="https://www.flixwork.de/datenschutz"
                target="_blank"
                rel="noopener"
                className="inline-flex rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
              >
                Datenschutz
              </a>
              <a
                href="/"
                className="inline-flex rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
              >
                Zur Startseite
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Zeile({ label, children }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
      <dt className="text-navy/50">{label}</dt>
      <dd className="text-right font-medium text-navy">{children}</dd>
    </div>
  );
}
