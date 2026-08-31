import { notFound } from "next/navigation";
import SeitenKopf from "@/components/SeitenKopf";
import JobKarte from "@/components/JobKarte";
import DemoHinweis from "@/components/DemoHinweis";
import BewerberCTA from "@/components/BewerberCTA";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { getJobs } from "@/lib/zvoove";
import { branche, branchen } from "@/lib/jobwelt";

// Branchenseiten für die Suche nach Berufsfeldern. Sie werden für alle
// definierten Bereiche erzeugt, auch wenn dort gerade keine Stelle offen ist:
// diese URLs sind auf der bisherigen Seite bereits indexiert und sollen
// erhalten bleiben.
// 15 Minuten, siehe REVALIDATE in lib/zvoove.js. Next.js verlangt hier einen
// literalen Wert, deshalb steht die Zahl ausnahmsweise doppelt im Projekt.
export const revalidate = 900;

export function generateStaticParams() {
  return branchen.map((b) => ({ branche: b.slug }));
}

export async function generateMetadata({ params }) {
  const { branche: slug } = await params;
  const b = branche(slug);
  if (!b) return { title: "Bereich nicht gefunden" };

  return {
    title: `${b.name} — offene Stellen`,
    description: b.text,
    alternates: { canonical: `/branchen/${b.slug}` },
  };
}

export default async function BrancheSeite({ params }) {
  const { branche: slug } = await params;
  const b = branche(slug);
  if (!b) notFound();

  const jobs = await getJobs();
  const treffer = jobs.filter((j) => j.kategorie === b.slug);
  const andere = branchen.filter((x) => x.slug !== b.slug);

  return (
    <>
      <main>
        <SeitenKopf
          eyebrow="Bereich"
          titel={b.name}
          text={b.text}
          kinder={
            <p className="mt-6 inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white/85">
              <Counter to={treffer.length} />
              &nbsp;{treffer.length === 1 ? "offene Stelle" : "offene Stellen"}
            </p>
          }
        />

        <DemoHinweis />

        <section className="bg-sand py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            {treffer.length > 0 ? (
              <Reveal className="grid gap-5 md:grid-cols-2" stagger={0.08}>
                {treffer.map((job) => (
                  <JobKarte key={job.id} job={job} />
                ))}
              </Reveal>
            ) : (
              <div className="rounded-3xl border border-dashed border-navy/15 bg-white px-6 py-14 text-center">
                <p className="text-lg font-bold text-navy">Hier ist gerade nichts ausgeschrieben.</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy/60">
                  In diesem Bereich besetzen wir viele Stellen, bevor sie
                  überhaupt online gehen. Schreiben Sie uns, dann melden wir uns,
                  sobald etwas frei wird.
                </p>
                <a
                  href="/bewerben"
                  className="mt-6 inline-flex rounded-full bg-sky px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-soft"
                >
                  Initiativ bewerben
                </a>
              </div>
            )}

            <div className="mt-14 border-t border-navy/10 pt-10">
              <h2 className="text-lg font-bold text-navy">Andere Bereiche</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {andere.map((x) => (
                  <a
                    key={x.slug}
                    href={`/branchen/${x.slug}`}
                    className="inline-flex rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
                  >
                    {x.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BewerberCTA />
      </main>
      <Footer />
    </>
  );
}
