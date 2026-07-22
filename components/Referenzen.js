import Reveal from "./Reveal";
import GoogleBewertungen from "./GoogleBewertungen";
import { kunden } from "@/lib/referenzen";

// Kundenreferenzen. Logos liegen in /public/kunden und werden einheitlich auf
// blauer Kachel als weiße Silhouette dargestellt (Wunsch 30.06.2026). Fehlt ein
// Logo, wird der Firmenname als weiße Wortmarke gezeigt. Die Daten liegen in
// lib/referenzen.js, weil sie auch das Logo-Band unter dem Hero speist.
// Überschrift/Intro je Bereich. Handwerk vermeidet bewusst "bauen".
const kopf = {
  all: {
    titel: "Unternehmen, die auf Flixwork bauen",
    text: "Von internationaler E-Commerce-Logistik über die Industrie bis zum Handwerk — wir besetzen Einsätze bei namhaften Auftraggebern.",
  },
  logistik: {
    titel: "Unternehmen, die auf Flixwork bauen",
    text: "Von internationaler E-Commerce-Logistik bis zum Zentrallager — wir besetzen Einsätze bei namhaften Auftraggebern in der Logistik.",
  },
  industrie: {
    titel: "Unternehmen, die auf Flixwork bauen",
    text: "Von der Kunststoff- bis zur Metall- und Elektroindustrie — wir besetzen Einsätze bei namhaften Produktionsunternehmen.",
  },
  handwerk: {
    titel: "Betriebe, die auf Flixmonteure zählen",
    text: "Von SHK über Wärme- und Kältetechnik bis zur technischen Gebäudeausrüstung — wir unterstützen Fachbetriebe im Handwerk.",
  },
};

function LogoKachel({ k, clickable }) {
  // Im Laufband: dekorative Endlosschleife (aria-hidden), daher tabIndex -1 —
  // die barrierefreien Links sind die Referenz-Karten unten.
  const inner = k.file ? (
    <img
      src={`/kunden/${k.file}`}
      alt={k.name}
      loading="lazy"
      className="max-h-11 w-auto max-w-full object-contain opacity-80 transition duration-300 [filter:brightness(0)_invert(1)] hover:opacity-100"
    />
  ) : (
    <span className="text-center text-sm font-bold uppercase tracking-wide text-white/80">{k.name}</span>
  );
  const cls =
    "flex h-24 w-48 items-center justify-center rounded-2xl border border-white/10 bg-navy px-7 transition-transform hover:scale-[1.04]";
  return (
    <li className="shrink-0">
      {clickable && k.url ? (
        <a href={k.url} target="_blank" rel="noopener" tabIndex={-1} aria-label={k.name} className={cls}>
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}

// `clickable` (Website-Review 03.07.2026): Logistik & Industrie verlinken die
// Referenz-Logos bewusst nicht mehr nach außen (Google-Bewertungen übernehmen
// dort die Vertrauensfunktion). `googleBewertungen` blendet genau diese direkt
// unter dem Logo-Band ein — einheitlich auf allen Unterseiten.
export default function Referenzen({ gruppe, clickable = true, googleBewertungen = false }) {
  const liste = gruppe ? kunden.filter((k) => k.gruppe === gruppe) : kunden;
  const k = kopf[gruppe] || kopf.all;

  return (
    <section id="referenzen" className="border-y border-navy/10 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Referenzen</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-navy md:text-4xl">
            {k.titel}
          </h2>
          <p className="mt-5 leading-relaxed text-navy/65">{k.text}</p>
        </Reveal>
      </div>

      {/* Logo-Laufband (Endlosschleife) */}
      <div
        className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        aria-hidden="true"
      >
        <ul className="flx-marquee flex w-max flex-nowrap items-center gap-5 pl-5 hover:[animation-play-state:paused]">
          {[...liste, ...liste].map((kunde, i) => (
            <LogoKachel k={kunde} clickable={clickable} key={i} />
          ))}
        </ul>
      </div>

      {googleBewertungen && (
        <div className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
          <GoogleBewertungen />
        </div>
      )}
    </section>
  );
}
