import { notFound } from "next/navigation";
import SeitenKopf from "@/components/SeitenKopf";
import JobKarte from "@/components/JobKarte";
import DemoHinweis from "@/components/DemoHinweis";
import BewerberCTA from "@/components/BewerberCTA";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { getJobs, slugify } from "@/lib/zvoove";
import { standorteAus } from "@/lib/jobwelt";

// Städteseiten für die lokale Suche ("Jobs in Kassel"). Sie entstehen
// automatisch aus den Stellen: jede Stadt mit offenen Stellen bekommt ihre
// Seite, ohne dass jemand eine Liste pflegen muss.
// 15 Minuten, siehe REVALIDATE in lib/zvoove.js. Next.js verlangt hier einen
// literalen Wert, deshalb steht die Zahl ausnahmsweise doppelt im Projekt.
export const revalidate = 900;

export async function generateStaticParams() {
  const jobs = await getJobs();
  return standorteAus(jobs).map((s) => ({ stadt: s.slug }));
}

async function ladeStadt(stadtSlug) {
  const jobs = await getJobs();
  const standorte = standorteAus(jobs);
  const stadt = standorte.find((s) => s.slug === stadtSlug);
  if (!stadt) return null;
  return {
    stadt,
    standorte,
    treffer: jobs.filter((j) => slugify(j.ort) === stadtSlug),
  };
}

export async function generateMetadata({ params }) {
  const { stadt: slug } = await params;
  const daten = await ladeStadt(slug);
  if (!daten) return { title: "Standort nicht gefunden" };

  const { stadt, treffer } = daten;
  return {
    title: `Jobs in ${stadt.name} — ${treffer.length} offene Stellen`,
    description: `Aktuelle Stellenangebote in ${stadt.name}: ${treffer
      .slice(0, 3)
      .map((j) => j.titel)
      .join(", ")}. Bezahlung nach Tarif, Startprämie und unbefristeter Vertrag bei Flixwork.`,
    alternates: { canonical: `/jobs-in/${stadt.slug}` },
  };
}

export default async function StadtSeite({ params }) {
  const { stadt: slug } = await params;
  const daten = await ladeStadt(slug);
  if (!daten) notFound();

  const { stadt, standorte, treffer } = daten;
  const andere = standorte.filter((s) => s.slug !== stadt.slug);

  return (
    <>
      <main>
        <SeitenKopf
          eyebrow="Standort"
          titel={`Jobs in ${stadt.name}`}
          text={stadt.text}
          kinder={
            <p className="mt-6 inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/85">
              <Counter to={treffer.length} />
              &nbsp;{treffer.length === 1 ? "offene Stelle" : "offene Stellen"}
              {stadt.region ? ` · ${stadt.region}` : ""}
            </p>
          }
        />

        <DemoHinweis />

        <section className="bg-sand py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal className="grid gap-5 md:grid-cols-2" stagger={0.08}>
              {treffer.map((job) => (
                <JobKarte key={job.id} job={job} />
              ))}
            </Reveal>

            {andere.length > 0 && (
              <div className="mt-14 border-t border-navy/10 pt-10">
                <h2 className="text-lg font-bold text-navy">Auch in der Nähe</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {andere.map((s) => (
                    <a
                      key={s.slug}
                      href={`/jobs-in/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
                    >
                      {s.name}
                      <span className="text-navy/40">{s.anzahl}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <BewerberCTA
          titel={`Nichts Passendes in ${stadt.name}?`}
          text="Sagen Sie uns, was Sie suchen. Wir kennen die Betriebe in der Region persönlich und fragen gezielt für Sie nach."
        />
      </main>
      <Footer />
    </>
  );
}
