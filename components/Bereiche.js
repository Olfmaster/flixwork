import Reveal from "./Reveal";

const bereiche = [
  {
    id: "logistik",
    eyebrow: "Schwerpunkt Logistik",
    titel: "Wenn das Volumen steigt, liefern wir Personal.",
    text: "Saisonspitzen, Projektgeschäft, kurzfristige Ausfälle — wir stellen schnell und in jeder Größenordnung die richtigen Kräfte bereit und steuern den Einsatz mit erfahrenem Projektmanagement.",
    usps: [
      ["Maximale Flexibilität", "Von einzelnen Kräften bis zu 100+ Mitarbeitenden — skalierbar nach Bedarf."],
      ["Schnelligkeit", "Kurzfristige Bereitstellung, auch bei plötzlichem Mehrbedarf."],
      ["Projektmanagement", "Strukturierte Steuerung und On-Site-Begleitung Ihres Einsatzes."],
    ],
    panelTitel: "Typische Positionen",
    panel: ["Lagerhelfer (m/w/d)", "Kommissionierer (m/w/d)", "Staplerfahrer (m/w/d)", "Versand & Verpackung", "Projektleitung Logistik"],
    cta: { label: "Personal anfragen", href: "#anfrage" },
  },
  {
    id: "industrie",
    eyebrow: "Schwerpunkt Industrie",
    titel: "Die richtigen Fachkräfte — sorgfältig ausgewählt.",
    text: "In der Industrie zählt Qualität. Wir wählen Fach- und Hilfskräfte gezielt aus, führen strukturierte Vorstellungsgespräche und sichern die Qualität — damit bei Ihnen die passenden Menschen ankommen.",
    usps: [
      ["Geprüfte Fachkräfteauswahl", "Gezielte Vorauswahl passend zu Ihren Anforderungen."],
      ["Strukturierte Gespräche", "Klare, vergleichbare Vorstellungsgespräche statt Bauchgefühl."],
      ["Qualitätssicherung", "Laufende Begleitung und Feedback während des Einsatzes."],
    ],
    panelTitel: "Typische Positionen",
    panel: ["Produktionshelfer (m/w/d)", "Maschinen- & Anlagenführer", "Fachkräfte Metall / Elektro", "Qualitätsprüfer (m/w/d)", "Schichtleitung"],
    cta: { label: "Personal anfragen", href: "#anfrage" },
  },
  {
    id: "handwerk",
    eyebrow: "Schwerpunkt Handwerk · Elektro & Sanitär",
    titel: "Monteure, die morgen bei Ihnen vor Ort starten.",
    text: "Gegen den Fachkräftemangel: erfahrene europäische Monteure, die bundesweit operieren können — mit eigenem Auto und eigenem Werkzeug. Stellen Sie sich Ihren Monteur im Konfigurator selbst zusammen.",
    usps: [
      ["Europäische Fachkräfte", "Erfahrene Monteure für Elektro, Sanitär und Montage."],
      ["Mobil & ausgestattet", "Eigenes Auto und eigenes Werkzeug — sofort einsatzfähig."],
      ["Bundesweit", "Einsatz vor Ort, egal wo in Deutschland — auch mehrtägig."],
    ],
    panelTitel: "Fachgebiete",
    panel: ["Elektro", "Sanitär & Heizung", "Trockenbau", "Allgemeine Montage", "Mehrtägige Einsätze"],
    cta: { label: "Monteur konfigurieren", href: "#konfigurator" },
  },
];

export default function Bereiche() {
  return (
    <div className="bg-white">
      {bereiche.map((b, idx) => {
        const flip = idx % 2 === 1;
        return (
          <section key={b.id} id={b.id} className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">{b.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">{b.titel}</h2>
                  <p className="mt-4 leading-relaxed text-navy/65">{b.text}</p>
                  <ul className="mt-7 space-y-4">
                    {b.usps.map(([t, d]) => (
                      <li key={t} className="flex gap-3">
                        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-sky" fill="currentColor" aria-hidden="true">
                          <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zm3.9 6.2-4.6 4.6a1 1 0 0 1-1.4 0L5.8 10.4a1 1 0 1 1 1.4-1.4l1.4 1.4 3.9-3.9a1 1 0 1 1 1.4 1.4z" />
                        </svg>
                        <span>
                          <span className="font-semibold text-navy">{t}</span>
                          <span className="block text-sm text-navy/60">{d}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={b.cta.href}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-sky-soft"
                  >
                    {b.cta.label}
                    <span aria-hidden="true">→</span>
                  </a>
                </Reveal>

                <Reveal y={36}>
                  <div className="flx-hero-bg relative overflow-hidden rounded-3xl p-8 text-white shadow-xl shadow-navy/10 md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{b.panelTitel}</p>
                    <ul className="mt-5 space-y-3">
                      {b.panel.map((p) => (
                        <li key={p} className="flex items-center gap-3 border-b border-white/10 pb-3 text-lg font-medium last:border-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-soft" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
