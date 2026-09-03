import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import JobKarte from "@/components/JobKarte";
import BewerberCTA from "@/components/BewerberCTA";
import DemoHinweis from "@/components/DemoHinweis";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { getJobs, getJob, slugify } from "@/lib/zvoove";
import { branche, formatLohn } from "@/lib/jobwelt";
import { kontakt } from "@/lib/kontakt";

// 15 Minuten, siehe REVALIDATE in lib/zvoove.js. Next.js verlangt hier einen
// literalen Wert, deshalb steht die Zahl ausnahmsweise doppelt im Projekt.
export const revalidate = 900;

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Stelle nicht gefunden" };

  return {
    title: `${job.titel} in ${job.ort}`,
    description:
      job.kurztext ||
      `${job.titel} in ${job.plz} ${job.ort}. ${formatLohn(job)}, Bezahlung nach Tarif, unbefristeter Vertrag. Jetzt bei Flixwork bewerben.`,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { type: "article", title: `${job.titel} in ${job.ort}` },
  };
}

// Google Jobs liest diese Auszeichnung aus. Auf der bisherigen Seite fehlt sie
// vollständig, dadurch tauchen die Stellen dort nicht in der Jobsuche auf.
function jobPostingSchema(job) {
  // Eine Stelle läuft, bis sie in zvoove abgeschaltet wird. Ein Ablaufdatum ab
  // Veröffentlichung würde die lange laufenden Dauerstellen bei Google als
  // abgelaufen markieren, deshalb zählt validThrough ab heute. Die Seite wird
  // alle 15 Minuten neu gebaut, das Datum bleibt also mitlaufend.
  const gepostet = job.aktualisiertAm || new Date().toISOString().slice(0, 10);
  const gueltigBis = new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10);
  const beschreibung = [
    job.kurztext ? `<p>${job.kurztext}</p>` : "",
    job.aufgaben?.length ? `<p><strong>Ihre Aufgaben</strong></p><ul>${job.aufgaben.map((a) => `<li>${a}</li>`).join("")}</ul>` : "",
    job.profil?.length ? `<p><strong>Ihr Profil</strong></p><ul>${job.profil.map((a) => `<li>${a}</li>`).join("")}</ul>` : "",
    job.benefits?.length ? `<p><strong>Wir bieten</strong></p><ul>${job.benefits.map((a) => `<li>${a}</li>`).join("")}</ul>` : "",
  ].join("");

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.titel,
    description: beschreibung,
    datePosted: gepostet,
    validThrough: gueltigBis,
    employmentType: job.beschaeftigungsart?.toLowerCase().includes("teilzeit") ? "PART_TIME" : "FULL_TIME",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: "Flixwork",
      sameAs: "https://www.flixwork.de",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.ort,
        postalCode: job.plz,
        addressRegion: job.region || undefined,
        addressCountry: "DE",
      },
    },
    industry: branche(job.kategorie)?.name,
  };

  if (job.lohnVon || job.lohnBis) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.lohnVon ?? job.lohnBis,
        maxValue: job.lohnBis ?? job.lohnVon,
        unitText: "HOUR",
      },
    };
  }

  return schema;
}

export default async function JobDetail({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const jobs = await getJobs();
  const aehnlich = jobs.filter((j) => j.kategorie === job.kategorie && j.slug !== job.slug).slice(0, 2);
  const b = branche(job.kategorie);
  // Betreff vorbelegen, damit die Disposition sofort sieht, um welche Stelle es
  // geht, ohne dass der Bewerber das selbst tippen muss.
  const mailHref = `${kontakt.mailHref}?subject=${encodeURIComponent(`Bewerbung: ${job.titel} in ${job.ort}`)}`;

  return (
    <>
      <main>
        <section className="flx-hero-bg relative text-white">
          <Navbar variant="bewerber" />
          <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-16 md:pt-40">
            <nav aria-label="Brotkrumen" className="text-sm text-white/50">
              <a href="/jobs" className="hover:text-white">Jobbörse</a>
              {b ? (
                <>
                  <span className="px-2">/</span>
                  <a href={`/branchen/${b.slug}`} className="hover:text-white">{b.name}</a>
                </>
              ) : null}
              <span className="px-2">/</span>
              <a href={`/jobs-in/${slugify(job.ort)}`} className="hover:text-white">
                {job.ort}
              </a>
            </nav>

            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl">
              {job.titel}
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {job.praemie ? (
                <span className="rounded-full bg-signal px-4 py-2 text-sm font-bold text-white">
                  {job.praemie} € Startprämie
                </span>
              ) : null}
              <Pille>{job.plz} {job.ort}</Pille>
              <Pille>{job.beschaeftigungsart}</Pille>
              {job.arbeitszeit ? <Pille>{job.arbeitszeit}</Pille> : null}
              <Pille>Start {job.startdatum}</Pille>
            </div>
          </div>
        </section>

        <DemoHinweis />

        <section className="bg-sand py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            <div className="order-2 lg:order-1">
              {job.kurztext ? (
                <Reveal>
                  <p className="text-lg leading-relaxed text-navy/75">{job.kurztext}</p>
                </Reveal>
              ) : null}

              <Liste titel="Ihre Aufgaben" items={job.aufgaben} />
              <Liste titel="Das bringen Sie mit" items={job.profil} />
              <Liste titel="Das bekommen Sie von uns" items={job.benefits} />

              <Reveal className="mt-10 rounded-3xl border border-navy/10 bg-white p-7">
                <h2 className="text-xl font-bold text-navy">Passt nicht ganz?</h2>
                <p className="mt-2 leading-relaxed text-navy/65">
                  Melden Sie sich trotzdem. Wir haben laufend Stellen, die es noch
                  nicht auf die Website geschafft haben, und suchen dann gezielt
                  für Sie.
                </p>
                <a href="/bewerben" className="mt-5 inline-flex text-sm font-semibold text-sky hover:underline">
                  Initiativbewerbung senden →
                </a>
              </Reveal>
            </div>

            {/* Bewerbungskarte: bleibt beim Scrollen stehen, damit der Weg zur
                Bewerbung nie außer Sicht gerät. */}
            <aside className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-3xl bg-navy p-7 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Verdienst</p>
                  <p className="mt-2 text-3xl font-bold">{formatLohn(job)}</p>
                  <p className="mt-1 text-sm text-white/60">Nach GVP-Tarif plus Branchenzuschläge</p>

                  <dl className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
                    <Zeile label="Einsatzort">{job.plz} {job.ort}</Zeile>
                    <Zeile label="Beschäftigung">{job.beschaeftigungsart}</Zeile>
                    {job.arbeitszeit ? <Zeile label="Arbeitszeit">{job.arbeitszeit}</Zeile> : null}
                    <Zeile label="Beginn">{job.startdatum}</Zeile>
                    {job.praemie ? <Zeile label="Startprämie">{job.praemie} €</Zeile> : null}
                  </dl>

                  {/* Der Hauptweg führt in das Bewerberportal von zvoove, wo die
                      Bewerbung samt Unterlagen direkt im System landet. Fehlt der
                      Link bei einer Stelle, bleibt das kurze Formular der Website
                      als Rückfallebene. */}
                  <a
                    href={job.bewerbungsUrl ?? `/bewerben?job=${job.slug}`}
                    {...(job.bewerbungsUrl ? { target: "_blank", rel: "noopener" } : {})}
                    className="mt-7 block rounded-full bg-sky px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-sky-soft"
                  >
                    Auf diese Stelle bewerben
                  </a>
                  <a
                    href={kontakt.whatsappHref}
                    target="_blank"
                    rel="noopener"
                    className="mt-3 block rounded-full border border-white/25 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Per WhatsApp fragen
                  </a>
                  <div className="mt-4 space-y-1 text-center text-xs text-white/45">
                    <p>
                      Oder anrufen:{" "}
                      <a href={kontakt.telefonHref} className="font-semibold text-white/70 hover:underline">
                        {kontakt.telefon}
                      </a>
                    </p>
                    <p>
                      E-Mail schreiben:{" "}
                      <a href={mailHref} className="font-semibold text-white/70 hover:underline">
                        {kontakt.mail}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {aehnlich.length > 0 && (
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <Reveal className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-navy md:text-3xl">Ähnliche Stellen</h2>
                <a href="/jobs" className="text-sm font-semibold text-sky hover:underline">Alle Stellen →</a>
              </Reveal>
              <Reveal className="mt-8 grid gap-5 md:grid-cols-2" stagger={0.1}>
                {aehnlich.map((j) => (
                  <JobKarte key={j.id} job={j} />
                ))}
              </Reveal>
            </div>
          </section>
        )}

        <BewerberCTA
          titel="Diese Stelle interessiert Sie?"
          text="Ein Anruf oder drei Felder im Formular genügen. Wir melden uns innerhalb von 24 Stunden."
          jobSlug={job.slug}
        />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema(job)) }}
      />
    </>
  );
}

function Pille({ children }) {
  return (
    <span className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/85">
      {children}
    </span>
  );
}

function Zeile({ label, children }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-right font-medium text-white">{children}</dd>
    </div>
  );
}

function Liste({ titel, items }) {
  if (!items?.length) return null;
  return (
    <Reveal className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight text-navy">{titel}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3 text-navy/70">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            <span className="leading-relaxed">{i}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
