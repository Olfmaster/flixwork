import Reveal from "./Reveal";

// KPI-Streifen der Handwerk-Seite (Website-Review 17.07.2026): Reklamationsquote,
// geringe Fluktuation, 100 % Kalkulierbarkeit und Zahlungsziel bis 45 Tage.
// Ersetzt die früheren Allgemeinplätze durch die Werte, die im Vertriebsgespräch
// tatsächlich den Ausschlag geben.
const kpis = [
  ["< 3 %", "Reklamationsquote", "Qualität, die auf der Baustelle ankommt."],
  ["Geringe Fluktuation", "Stabile Teams", "Dieselben Monteure über die gesamte Projektlaufzeit."],
  ["100 %", "Kalkulierbar", "Ein Stundensatz — Fahrzeug, Werkzeug und Unterkunft inklusive."],
  ["Bis 45 Tage", "Zahlungsziel*", "Liquiditätsvorteil für Ihr Projekt."],
];

export default function FlixmonteureKennzeichen() {
  return (
    <section className="bg-mist py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {kpis.map(([wert, label, text]) => (
            <div key={label} className="rounded-3xl border border-navy/10 bg-white px-6 py-7">
              <p className="text-2xl font-bold leading-tight text-sky">{wert}</p>
              <p className="mt-2 text-sm font-bold text-navy">{label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/55">{text}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-5 text-xs text-navy/45">
          *Zahlungsziel bis 45 Tage nach Bonitätsprüfung, individuell vereinbart.
        </p>
      </div>
    </section>
  );
}
