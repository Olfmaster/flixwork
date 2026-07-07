import Reveal from "./Reveal";
import Counter from "./Counter";

// Freistehende Kennzahlen-Karte (helles Band mit hochzählenden Zahlen),
// wiederverwendet als eigene Sektion (Leistungszahlen) und als über den
// Hero-Rand ragende Karte (Logistik-Hero, Website-Review-Folgeanpassung).
export default function KennzahlenKarte({ zahlen, className = "" }) {
  return (
    <Reveal
      className={`rounded-3xl border border-navy/10 bg-mist px-6 py-10 md:px-10 md:py-12 ${className}`}
      stagger={0.1}
    >
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
  );
}
