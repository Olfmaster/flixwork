import Reveal from "./Reveal";

// Häufige Fragen mit FAQPage-Auszeichnung für Google. Bewusst ohne JavaScript
// gebaut: <details> klappt von sich aus auf, funktioniert mit Tastatur und
// Screenreader und kostet keine einzige Zeile Client-Code.
export default function FaqBlock({ titel = "Häufige Fragen", text, items, bg = "bg-white" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([frage, antwort]) => ({
      "@type": "Question",
      name: frage,
      acceptedAnswer: { "@type": "Answer", text: antwort },
    })),
  };

  return (
    <section id="faq" className={`${bg} py-20 md:py-28`}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">{titel}</h2>
          {text ? <p className="mt-4 leading-relaxed text-navy/65">{text}</p> : null}
        </Reveal>

        <Reveal className="mt-10 divide-y divide-navy/10 border-y border-navy/10" stagger={0.06}>
          {items.map(([frage, antwort]) => (
            <details key={frage} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-navy marker:hidden">
                {frage}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl font-light leading-none text-sky transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pr-8 leading-relaxed text-navy/65">{antwort}</p>
            </details>
          ))}
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
