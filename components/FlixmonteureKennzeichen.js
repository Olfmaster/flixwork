import Reveal from "./Reveal";

// 4 Kennzahlen/Fakten direkt unter dem Hero (Kundenmail Handwerk). Kompakter
// Trust-Streifen — überwiegend qualitativ, daher als Badge-Reihe (kein Counter).
const fakten = [
  ["10+", "Jahre Erfahrung"],
  ["DE", "Bundesweite Einsätze"],
  ["SHK · Elektro · TGA", "Spezialisiert"],
  ["Tage", "Schnelle Verfügbarkeit"],
];

export default function FlixmonteureKennzeichen() {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal
          className="grid gap-y-8 rounded-3xl border border-navy/10 bg-mist px-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-navy/10"
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
