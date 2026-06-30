import Reveal from "./Reveal";

// Kundenreferenzen laut "Benötigte Infos". Logos liegen in /public/kunden.
// Alle Logos werden einheitlich auf blauer Kachel als weiße Silhouette
// dargestellt — so wirken sie als geschlossene Logo-Wand und auch dunkle Logos
// (AKG, Jäkel) bleiben auf Blau sichtbar (Wunsch 30.06.2026).
const kunden = [
  {
    name: "ID Logistics",
    file: "id-logistics.png",
    url: "https://www.id-logistics.com/",
    bereich: "E-Commerce Logistik",
    text: "Internationale Kontraktlogistik und E-Commerce-Lösungen",
  },
  {
    name: "Radial Europe",
    file: "radial.png",
    url: "https://www.radial.com/eur",
    bereich: "E-Commerce Logistik",
    text: "E-Commerce Fulfillment",
  },
  {
    name: "W&L Jordan (JOKA)",
    file: "joka.png",
    url: "https://www.joka.de/",
    bereich: "Zentrallager Logistik",
    text: "Bodenbeläge und Innenausstattung",
  },
  {
    name: "Geis Gruppe",
    file: "geis.png",
    url: "https://geis-group.eu/",
    bereich: "Fulfillment Logistik",
    text: "Logistik und Supply Chain",
  },
  {
    name: "DHL Group",
    file: "dhl.png",
    url: "https://group.dhl.com/",
    bereich: "Fulfillment Logistik",
    text: "Internationale Logistik",
  },
  {
    name: "Rudolph Logistik Gruppe",
    file: "rudolph.png",
    url: "https://www.rudolph-log.com/",
    bereich: "Automotive Logistik",
    text: "Automotive- und Industrielogistik mit rund 5.200 Mitarbeitenden an 45 Standorten",
  },
  {
    name: "Vinylit Fassadensysteme",
    file: "vinylit.png",
    url: "https://www.vinylit.de/",
    bereich: "Kunststoffindustrie",
    text: "Individuelle Fassaden- und Dachsysteme, Made in Germany",
  },
  {
    name: "Wetekam Group",
    file: "wetekam.png",
    url: "https://wetekamgroup.com/",
    bereich: "Kunststoffindustrie",
    text: "Technische Monofile und Kunststofflösungen",
  },
  {
    name: "AKG Group",
    file: "akg.png",
    url: "https://www.akg-group.com/",
    bereich: "Metall- & Elektroindustrie",
    text: "Führende Wärmetauschertechnologie",
  },
  {
    name: "Jäkel",
    file: "jaekel.png",
    url: "https://www.jaekel.eu/",
    bereich: "Metall- & Elektroindustrie",
    text: "Maschinenmesserfabrik — Quality made in Germany since 1928",
  },
];

function LogoKachel({ k }) {
  // Im Laufband: das Laufband ist aria-hidden (dekorative Endlosschleife), daher
  // tabIndex -1 — die barrierefreien Links sind die Referenz-Karten unten.
  return (
    <li className="shrink-0">
      <a
        href={k.url}
        target="_blank"
        rel="noopener"
        tabIndex={-1}
        aria-label={k.name}
        className="flex h-24 w-48 items-center justify-center rounded-2xl border border-white/10 bg-navy px-7 transition-transform hover:scale-[1.04]"
      >
        <img
          src={`/kunden/${k.file}`}
          alt={k.name}
          loading="lazy"
          className="max-h-11 w-auto max-w-full object-contain opacity-80 transition duration-300 [filter:brightness(0)_invert(1)] hover:opacity-100"
        />
      </a>
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
            <a
              key={k.name}
              href={k.url}
              target="_blank"
              rel="noopener"
              className="group block rounded-2xl border border-navy/10 bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-lg hover:shadow-navy/5"
            >
              <span className="inline-flex rounded-full bg-cloud px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy/70">
                {k.bereich}
              </span>
              <h3 className="mt-3 flex items-center gap-1.5 text-lg font-bold text-navy">
                {k.name}
                <span aria-hidden="true" className="text-sky opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/65">{k.text}</p>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
