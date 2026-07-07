import Reveal from "./Reveal";
import Counter from "./Counter";

// Kennzahlen-Band mit hochzählenden Zahlen. Bewusst nur belegte Werte aus den
// vorhandenen Inhalten (Erfolgsgeschichten / Datenblatt) — keine erfundenen
// KPIs. Heller Abschnitt, die blaue Akzentfarbe liegt auf den Zahlen.
const zahlen = [
  { to: 3, suffix: "", label: "Geschäftsbereiche", sub: "Logistik · Industrie · Handwerk" },
  { to: 15, suffix: "+", label: "Jahre Partnerschaft", sub: "längste laufende Kundenbeziehung" },
  { to: 100, suffix: "", label: "Onboarding-Mitarbeiter", sub: "in nur 8 Wochen ongeboardet" },
];

export default function Kennzahlen() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal
          className="grid gap-y-10 rounded-3xl border border-navy/10 bg-mist px-6 py-10 sm:grid-cols-3 sm:divide-x sm:divide-navy/10 md:px-4"
          stagger={0.12}
        >
          {zahlen.map((z) => (
            <div key={z.label} className="px-4 text-center">
              <Counter
                to={z.to}
                suffix={z.suffix}
                className="block text-5xl font-bold leading-none text-sky md:text-6xl"
              />
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-navy">{z.label}</p>
              <p className="mt-1 text-xs leading-snug text-navy/55">{z.sub}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
