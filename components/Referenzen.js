import Reveal from "./Reveal";

// Kundenreferenzen laut "Benötigte Infos". Logos liegen in /public/kunden.
// `dark`: weiße Logos (ID Logistics, Radial) brauchen eine dunkle Kachel.
const kunden = [
  {
    name: "ID Logistics",
    file: "id-logistics.png",
    dark: true,
    bereich: "E-Commerce Logistik",
    text: "Internationale Kontraktlogistik und E-Commerce-Lösungen",
  },
  {
    name: "Radial Europe",
    file: "radial.png",
    dark: true,
    bereich: "E-Commerce Logistik",
    text: "E-Commerce Fulfillment",
  },
  {
    name: "W&L Jordan (JOKA)",
    file: "joka.png",
    bereich: "Zentrallager Logistik",
    text: "Bodenbeläge und Innenausstattung",
  },
  {
    name: "Geis Gruppe",
    file: "geis.png",
    bereich: "Fulfillment Logistik",
    text: "Logistik und Supply Chain",
  },
  {
    name: "DHL Group",
    file: "dhl.png",
    bereich: "Fulfillment Logistik",
    text: "Internationale Logistik",
  },
  {
    name: "Rudolph Logistik Gruppe",
    file: "rudolph.png",
    bereich: "Automotive Logistik",
    text: "Automotive- und Industrielogistik mit rund 5.200 Mitarbeitenden an 45 Standorten",
  },
  {
    name: "Vinylit Fassadensysteme",
    file: "vinylit.png",
    bereich: "Kunststoffindustrie",
    text: "Individuelle Fassaden- und Dachsysteme, Made in Germany",
  },
  {
    name: "Wetekam Group",
    file: "wetekam.png",
    bereich: "Kunststoffindustrie",
    text: "Technische Monofile und Kunststofflösungen",
  },
  {
    name: "AKG Group",
    file: "akg.png",
    bereich: "Metall- & Elektroindustrie",
    text: "Führende Wärmetauschertechnologie",
  },
  {
    name: "Jäkel",
    file: "jaekel.png",
    bereich: "Metall- & Elektroindustrie",
    text: "Maschinenmesserfabrik — Quality made in Germany since 1928",
  },
];

function LogoKachel({ k }) {
  return (
    <li
      className={`flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border px-7 ${
        k.dark ? "border-white/10 bg-navy" : "border-navy/10 bg-white"
      }`}
    >
      <img
        src={`/kunden/${k.file}`}
        alt={k.name}
        loading="lazy"
        className="max-h-11 w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  );
}

export default function Referenzen() {
  return (
    <section id="referenzen" className="border-y border-navy/10 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Referenzen</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            Unternehmen, die auf Flixwork bauen
          </h2>
          <p className="mt-5 leading-relaxed text-navy/65">
            Von internationaler E-Commerce-Logistik bis zur mittelständischen
            Industrie — wir besetzen Einsätze bei namhaften Auftraggebern in
            Logistik und Produktion.
          </p>
        </Reveal>
      </div>

      {/* Logo-Laufband (Endlosschleife) */}
      <div
        className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        aria-hidden="true"
      >
        <ul className="flx-marquee flex w-max flex-nowrap items-center gap-5 pl-5 hover:[animation-play-state:paused]">
          {[...kunden, ...kunden].map((k, i) => (
            <LogoKachel k={k} key={i} />
          ))}
        </ul>
      </div>

      {/* Referenz-Karten mit Kontext */}
      <div className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {kunden.map((k) => (
            <div
              key={k.name}
              className="rounded-2xl border border-navy/10 bg-mist p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5"
            >
              <span className="inline-flex rounded-full bg-cloud px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy/70">
                {k.bereich}
              </span>
              <h3 className="mt-3 text-lg font-bold text-navy">{k.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/65">{k.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
