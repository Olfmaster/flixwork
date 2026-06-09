import Reveal from "./Reveal";

const bereiche = [
  {
    key: "logistik",
    titel: "Logistik",
    text: "Lagerhaltung, Kommissionierung und Projektpersonal — flexibel skalierbar, wenn das Volumen es verlangt.",
    usps: ["Maximale Flexibilität", "Schnelle Bereitstellung", "Erfahrenes Projektmanagement"],
    href: "#logistik",
    icon: (
      <path d="M3 7h11v7H3V7zm11 3h4l3 3v1h-7v-4zM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    ),
  },
  {
    key: "industrie",
    titel: "Industrie",
    text: "Sorgfältig ausgewählte Fach- und Hilfskräfte — mit strukturierten Vorstellungsgesprächen und Qualitätssicherung.",
    usps: ["Geprüfte Fachkräfteauswahl", "Strukturierte Vorstellungsgespräche", "Verlässliche Qualität"],
    href: "#industrie",
    icon: (
      <path d="M3 20V9l5 3V9l5 3V6l5 3v11H3zm3-3h2v-2H6v2zm5 0h2v-2h-2v2zm5 0h2v-2h-2v2z" />
    ),
  },
  {
    key: "handwerk",
    titel: "Handwerk",
    text: "Europäische Monteure für Elektro & Sanitär — mobil, mit eigenem Auto und Werkzeug, bundesweit einsatzbereit.",
    usps: ["Europäische Fachkräfte", "Eigenes Auto & Werkzeug", "Monteur-Konfigurator"],
    href: "#handwerk",
    icon: (
      <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4l-5 5a1.8 1.8 0 0 1-2.5-2.5l5-5a4 4 0 0 1 5.4-5.4l-2.3 2.3 1.5 1.5 2.3-2.3z" />
    ),
  },
];

export default function Schwerpunkte() {
  return (
    <section id="schwerpunkte" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Unsere Schwerpunkte</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Drei Bereiche. Ein Anspruch: das passende Personal.
          </h2>
          <p className="mt-4 text-navy/60">
            Wählen Sie Ihren Bereich — und sehen Sie sofort, was Flixwork dort
            konkret für Sie leistet.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {bereiche.map((b) => (
            <a
              key={b.key}
              href={b.href}
              className="group relative flex flex-col rounded-2xl border border-navy/10 bg-mist p-7 transition-all hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl hover:shadow-navy/5"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white transition-colors group-hover:bg-sky">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  {b.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy">{b.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">{b.text}</p>
              <ul className="mt-5 space-y-2">
                {b.usps.map((u) => (
                  <li key={u} className="flex items-center gap-2 text-sm font-medium text-navy/80">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-sky" fill="currentColor" aria-hidden="true">
                      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0z" />
                    </svg>
                    {u}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-sky">
                Mehr erfahren
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
