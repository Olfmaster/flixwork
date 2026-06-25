import Reveal from "./Reveal";

// Praxis-/Erfolgsgeschichten aus "teste.docx" — bewusst in Flixwork-Innensicht
// (OnSite-Manager / Geschäftsführer), daher als eigener Block neben den
// Kundenstimmen. Texte leicht gekürzt (laut Dokument erwünscht).
const stories = [
  {
    firma: "Radial",
    meta: "E-Commerce Logistik · Kassel & Staufenberg",
    metric: { value: "5+ Jahre", label: "Master-Partner im OnSite Management" },
    text: "Als Master-Partner steuern wir seit über fünf Jahren das OnSite Management an zwei Standorten — vom Helfer über Teamleiter bis zu hochqualifizierten Staplerfahrern und Office-Kräften.",
    quote: "Ich gehe durch die Hallen und sehe alte und neue bekannte Gesichter, die ich in den letzten 5 Jahren vermitteln durfte.",
    autor: "Enrico Kroll · OnSite Manager",
  },
  {
    firma: "W&L Jordan (JOKA)",
    meta: "Zentrallager Logistik · Kassel",
    metric: { value: "15+ Jahre", label: "Partnerschaft & begleitete Übernahmen" },
    text: "Seit über 15 Jahren begleiten wir das Zentrallager in Kassel — vom Helfer bis zum hochkomplexen Staplerfahrer. Wir haben das Wachstum aktiv mitgestaltet und Jahr für Jahr Übernahmen in die Stammbelegschaft ermöglicht.",
    quote: "Ich sehe regelmäßig ehemalige Mitarbeiter, die sich hochgearbeitet haben und heute Teamleiter sind.",
    autor: "André Fissler · Geschäftsführer",
  },
  {
    firma: "Geis Industrie-Service",
    meta: "Fulfillment Logistik · Göttingen / Rosdorf",
    metric: { value: "8 Wochen", label: "von 0 auf 100 Mitarbeitende" },
    text: "Zur Peak-Saison im Zentrallager haben wir gemeinsam mit dem Kunden in nur acht Wochen von 0 auf 100 Mitarbeitende skaliert — ganz ohne Zauberei, mit den richtigen Prozessen.",
    quote: "In nur 8 Wochen von 0 auf 100 — diese Erfolgsstory schreiben wir gemeinsam mit dem Kunden.",
    autor: "André Fissler · Geschäftsführer",
  },
];

export default function Erfolgsgeschichten() {
  return (
    <section id="erfolgsgeschichten" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Erfolgsgeschichten</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Aus der Praxis: Partnerschaften, die wachsen
          </h2>
          <p className="mt-4 text-navy/60">
            Echte Einsätze aus der Logistik — über Jahre gewachsen und gemeinsam
            mit unseren Kunden zum Erfolg gebracht.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {stories.map((s) => (
            <article
              key={s.firma}
              className="flex flex-col rounded-2xl border border-navy/10 bg-mist p-7 transition-shadow hover:shadow-lg hover:shadow-navy/5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">{s.meta}</p>
              <h3 className="mt-2 text-xl font-bold text-navy">{s.firma}</h3>

              <div className="mt-5">
                <p className="text-3xl font-bold text-navy">{s.metric.value}</p>
                <p className="mt-0.5 text-xs text-navy/55">{s.metric.label}</p>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/65">{s.text}</p>

              <blockquote className="mt-5 border-l-2 border-sky/40 pl-4 text-sm italic leading-relaxed text-navy/75">
                „{s.quote}“
              </blockquote>
              <figcaption className="mt-3 pl-4 text-xs font-semibold text-navy/60">{s.autor}</figcaption>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
