import Reveal from "./Reveal";
import Counter from "./Counter";

// Harte Leistungs-KPIs aus der Kundenmail ("Kurzversion für die Homepage").
// Vom Kunden freigegebene, belegte Werte — daher hier zulässig (vgl. Kennzahlen,
// das bewusst nur belegte Werte zeigt). Wiederverwendet auf Startseite und
// Logistik-Unterseite. Helles Band als Kontrast zwischen den dunklen Sektionen.
const zahlen = [
  { to: 95, suffix: " %", label: "Besetzungsquote" },
  { to: 24, suffix: " h", label: "Reaktionszeit" },
  { to: 48, suffix: " h", label: "Ersatzgestellung" },
  { to: 5, prefix: "< ", suffix: " %", label: "Frühfluktuation" },
  { to: 90, prefix: "> ", suffix: " %", label: "Qualifikations-Match" },
  { to: 100, suffix: " %", label: "Arbeitssicherheitsunterweisung" },
];

export default function Leistungszahlen() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="rounded-3xl border border-navy/10 bg-mist px-6 py-10 md:px-10 md:py-12" stagger={0.1}>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {zahlen.map((z) => (
              <div key={z.label} className="text-center">
                <Counter
                  to={z.to}
                  prefix={z.prefix}
                  suffix={z.suffix}
                  className="block text-4xl font-bold leading-none text-sky md:text-5xl"
                />
                <p className="mt-2.5 text-sm font-semibold leading-snug text-navy">{z.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-lg font-bold tracking-tight text-navy">
            Messbar. Transparent. Verlässlich.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
