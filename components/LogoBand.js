import { kunden, marken } from "@/lib/referenzen";

// Schmales Logo-Laufband direkt unter dem Hero — optisch dasselbe Band wie das
// Branchen-Laufband der Startseite, nur mit Logos statt Schlagworten
// (Kundenwunsch 22.07.2026). Steht auf der Handwerk-Seite ganz oben, damit
// bekannte Namen sofort Vertrauen schaffen (Website-Review 17.07.2026);
// bewusst kleiner als die Logo-Wand der Startseite.
//
// Reihenfolge: erst die Ausstattungs-Marken (Mercedes, VW, Hilti, Würth,
// Engelbert Strauss), dann die Kundenreferenzen des Bereichs.
export default function LogoBand({ gruppe, label = "Ausstattung & Referenzen" }) {
  const basis = [
    ...marken.map((m) => ({ name: m.name, src: `/monteure/${m.file}` })),
    ...kunden
      .filter((k) => (gruppe ? k.gruppe === gruppe : true) && k.file)
      .map((k) => ({ name: k.name, src: `/kunden/${k.file}` })),
  ];

  // Die Animation schiebt die Liste um -50 %, also um genau eine Kopie. Damit
  // dabei nie eine Lücke sichtbar wird, muss eine Kopie breiter sein als der
  // Viewport — bei nur einer Handvoll Logos ist sie das nicht. Deshalb die
  // Basisliste so oft wiederholen, dass sie auch auf breiten Screens trägt.
  const liste = [];
  while (liste.length < 24) liste.push(...basis);

  return (
    <section className="border-t border-white/10 bg-navy-deep py-5" aria-label={label}>
      <div
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        aria-hidden="true"
      >
        <ul className="flx-marquee flx-marquee-slow flex w-max flex-nowrap items-center gap-14">
          {[...liste, ...liste].map((l, i) => (
            <li key={i} className="shrink-0">
              <img
                src={l.src}
                alt=""
                loading="lazy"
                className="h-8 w-auto max-w-[9rem] object-contain opacity-70 [filter:brightness(0)_invert(1)] md:h-9"
              />
            </li>
          ))}
        </ul>
      </div>
      {/* Screenreader-Äquivalent zum dekorativen Laufband */}
      <p className="sr-only">{basis.map((l) => l.name).join(", ")}</p>
    </section>
  );
}
