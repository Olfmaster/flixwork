import Reveal from "./Reveal";

// Kennzahlen direkt unter dem Hero (Website-Review 03.07.2026): 15 Jahre
// Erfahrung, Verfügbarkeit in 4 Tagen, Komplettausstattung Auto/Werkzeug/
// Unterkunft. Kompakter Trust-Streifen.
const fakten = [
  ["15+", "Jahre Erfahrung"],
  ["4 Tage", "Verfügbar ab Anfrage"],
  ["Auto · Werkzeug · Unterkunft", "Komplett ausgestattet"],
];

export default function FlixmonteureKennzeichen() {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal
          className="grid gap-y-8 rounded-3xl border border-navy/10 bg-mist px-6 py-8 sm:grid-cols-3 sm:divide-x sm:divide-navy/10"
          stagger={0.1}
        >
          {fakten.map(([wert, label]) => (
            <div key={label} className="px-4 text-center">
              <p className="text-2xl font-bold leading-none text-sky md:text-3xl">{wert}</p>
              <p className="mt-2 text-sm font-semibold text-navy">{label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
