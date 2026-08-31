import Image from "next/image";
import SeitenKopf from "@/components/SeitenKopf";
import BewerbungsFormular from "@/components/BewerbungsFormular";
import FaqBlock from "@/components/FaqBlock";
import Footer from "@/components/Footer";
import { getJob } from "@/lib/zvoove";

// 15 Minuten, siehe REVALIDATE in lib/zvoove.js. Next.js verlangt hier einen
// literalen Wert, deshalb steht die Zahl ausnahmsweise doppelt im Projekt.
export const revalidate = 900;

export const metadata = {
  title: "Jetzt bewerben — in zwei Minuten",
  description:
    "Bewerben Sie sich bei Flixwork ohne Anschreiben und ohne Lebenslauf. Name und Telefonnummer genügen, wir melden uns innerhalb von 24 Stunden.",
  alternates: { canonical: "/bewerben" },
};

const versprechen = [
  ["Kein Anschreiben nötig", "Unterlagen können Sie später nachreichen. Für den ersten Kontakt reicht Ihr Name."],
  ["Antwort in 24 Stunden", "Werktags melden wir uns am selben oder am nächsten Tag, telefonisch oder per WhatsApp."],
  ["Kostenlos für Sie", "Unsere Vermittlung ist für Bewerber vollständig kostenfrei."],
];

const faq = [
  ["Muss ich Zeugnisse mitschicken?", "Nein. Wenn wir Unterlagen brauchen, sagen wir Ihnen im Gespräch, welche. Vieles klärt sich vorher am Telefon."],
  ["Was passiert nach dem Absenden?", "Ihre Bewerbung landet direkt bei unserer Disposition. Wir rufen Sie an, besprechen, was Sie suchen, und schlagen passende Einsätze vor."],
  ["Kann ich mich auch bewerben, wenn keine Stelle passt?", "Ja, ausdrücklich. Viele Stellen besetzen wir, bevor sie online gehen. Eine Initiativbewerbung bringt Sie in genau diese Runde."],
  ["Wie werden meine Daten verwendet?", "Ausschließlich für Ihre Bewerbung und die Vermittlung. Wir geben nichts an Dritte weiter, ohne dass Sie das wissen."],
];

export default async function BewerbenPage({ searchParams }) {
  const { job: jobSlug } = await searchParams;
  const job = jobSlug ? await getJob(jobSlug) : null;

  return (
    <>
      <main>
        <SeitenKopf
          eyebrow="Bewerbung"
          titel={job ? "Nur noch ein paar Angaben." : "In zwei Minuten bewerben."}
          text={
            job
              ? "Sie haben Ihre Stelle gefunden. Wir brauchen jetzt nur noch einen Weg, Sie zu erreichen."
              : "Kein Anschreiben, kein Lebenslauf, keine Formulare über drei Seiten. Name und Telefonnummer reichen, alles Weitere besprechen wir persönlich."
          }
        />

        <section className="bg-sand py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div>
              <BewerbungsFormular job={job} />
            </div>

            <aside className="lg:pt-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/bewerber/bewerben.png"
                  alt="Bewerber schaut auf sein Smartphone"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              <ul className="mt-8 space-y-6">
                {versprechen.map(([titel, text]) => (
                  <li key={titel} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky text-white">
                      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-navy">{titel}</p>
                      <p className="mt-1 text-sm leading-relaxed text-navy/60">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <FaqBlock titel="Fragen zur Bewerbung" items={faq} />
      </main>
      <Footer />
    </>
  );
}
