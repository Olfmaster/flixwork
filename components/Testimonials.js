import Reveal from "./Reveal";

// Echte Kundenstimmen aus "teste.docx" (leicht gekürzt — laut Dokument
// ausdrücklich erwünscht). Bewusst nur die Zitate aus Kundensicht; die
// Radial-/Jordan-/Geis-Storys sind aus Flixwork-Innensicht (OnSite-Manager /
// GF) formuliert und eignen sich eher als Erfolgsgeschichten.
const stimmen = [
  {
    quote:
      "Wenn wir Personal suchen, ist unsere erste Adresse Matthias Dierkes von Flixwork. Er betreut uns seit vielen Jahren — zuverlässig, vor Ort und schnell.",
    firma: "FingerHaus",
    kontext: "Hausbau · Musterhaus Frankenberg",
  },
  {
    quote:
      "Herr Fissler hat uns von Anfang an unabhängig und ehrlich beraten und auch kritische Punkte klar angesprochen. Seit dem Start der Zusammenarbeit haben wir spürbar zuverlässigeres und längerfristiges Personal.",
    firma: "Vinylit Fassadensysteme",
    kontext: "Kunststoffindustrie",
  },
  {
    quote:
      "Die Qualität des Personals ist unser höchstes Gut — da sind wir wählerisch. Das Flixwork-Team um Herrn Dierkes und Geschäftsführer Herrn Fissler bietet uns immer wieder passendes Personal an. Kostenfreie Staplerschulungen runden den Service ab.",
    firma: "Jäkel Maschinenmesserfabrik",
    kontext: "Metall- & Elektroindustrie · Produktion",
  },
];

export default function Testimonials() {
  return (
    <section id="kundenstimmen" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Kundenstimmen</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Was unsere Kunden über uns sagen
          </h2>
          <p className="mt-4 text-navy/60">
            Langjährige Partnerschaften statt schneller Vermittlung — das hören
            wir am liebsten direkt von den Unternehmen, die wir betreuen.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {stimmen.map((s) => (
            <figure
              key={s.firma}
              className="flex flex-col rounded-2xl border border-navy/10 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-navy/5"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-sky/30" fill="currentColor" aria-hidden="true">
                <path d="M9.5 7C6.5 7 5 9.2 5 12v5h5v-5H7.5c0-1.7.8-2.5 2.5-2.5V7zm9 0c-3 0-4.5 2.2-4.5 5v5h5v-5H16c0-1.7.8-2.5 2.5-2.5V7z" />
              </svg>
              <blockquote className="mt-4 flex-1 leading-relaxed text-navy/80">
                {s.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-navy/10 pt-4">
                <p className="font-bold text-navy">{s.firma}</p>
                <p className="mt-0.5 text-sm text-navy/55">{s.kontext}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
