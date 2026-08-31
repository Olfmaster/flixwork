import Reveal from "./Reveal";
import Counter from "./Counter";

// KPI-Streifen der Handwerk-Seite (Website-Review 17.07.2026): Reklamationsquote,
// geringe Fluktuation, 100 % Kalkulierbarkeit und Zahlungsziel bis 45 Tage.
// Ersetzt die früheren Allgemeinplätze durch die Werte, die im Vertriebsgespräch
// tatsächlich den Ausschlag geben.
// Zahlen zählen beim Scrollen hoch (31.08.2026), rein textliche Werte bleiben
// stehen.
const kpis = [
  [{ to: 3, prefix: "< ", suffix: " %" }, "Reklamationsquote", "Qualität, die auf der Baustelle ankommt."],
  [{ wert: "Geringe Fluktuation" }, "Stabile Teams", "Dieselben Monteure über die gesamte Projektlaufzeit."],
  [{ to: 100, suffix: " %" }, "Kalkulierbar", "Ein Stundensatz — Fahrzeug, Werkzeug und Unterkunft inklusive."],
  [{ to: 45, prefix: "Bis ", suffix: " Tage" }, "Zahlungsziel*", "Liquiditätsvorteil für Ihr Projekt."],
];

export default function FlixmonteureKennzeichen() {
  return (
    <section className="bg-mist py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {kpis.map(([wert, label, text]) => (
            <div key={label} className="rounded-3xl border border-navy/10 bg-white px-6 py-7">
              {typeof wert.to === "number" ? (
                <Counter
                  to={wert.to}
                  prefix={wert.prefix}
                  suffix={wert.suffix}
                  className="block text-2xl font-bold leading-tight text-sky"
                />
              ) : (
                <p className="text-2xl font-bold leading-tight text-sky">{wert.wert}</p>
              )}
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
