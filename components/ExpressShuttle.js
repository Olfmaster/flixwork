import Reveal from "./Reveal";

// Eigenständiges USP-Highlight aus dem Datenblatt: eigene Mobilitätslösung
// "Express Shuttle" für mit ÖPNV schwer erreichbare Logistikstandorte,
// Shuttle-Kapazität von 150 Mitarbeitern.
const punkte = [
  ["Eigene Mobilitätslösung", "Kein externer Dienstleister — wir steuern Beförderung und Einsatz aus einer Hand."],
  ["Für schwer erreichbare Standorte", "Logistikzentren abseits guter ÖPNV-Anbindung erreichen wir zuverlässig."],
  ["Planbar & pünktlich", "Feste Abholpunkte und Zeiten — Ihr Personal ist verlässlich vor Ort."],
];

export default function ExpressShuttle() {
  return (
    <section id="express-shuttle" className="flx-hero-bg text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <img
              src="/express-shuttle-logo.svg"
              alt="Express Shuttle — Beförderung zum Arbeitsplatz"
              className="h-12 w-auto md:h-14"
            />
            <h2 className="mt-7 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Wir bringen Ihr Personal auch dorthin, wo der ÖPNV aufhört.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/75">
              Viele Logistikstandorte liegen abseits guter Nahverkehrsanbindung —
              genau hier setzt unser <strong className="font-semibold text-white">Express Shuttle</strong> an:
              eine eigene Mobilitätslösung, die Mitarbeitende zuverlässig zum
              Einsatzort und zurück bringt.
            </p>
            <a
              href="#anfrage"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-sky-soft"
            >
              Personal mit Shuttle anfragen
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal y={36} className="space-y-5">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Shuttle-Kapazität</p>
              <p className="mt-2 text-6xl font-bold text-sky-soft">150</p>
              <p className="mt-1 text-sm text-white/70">Mitarbeiter pro Einsatz transportierbar</p>
            </div>
            <ul className="space-y-4">
              {punkte.map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-sky-soft" fill="currentColor" aria-hidden="true">
                    <path d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6zm3.9 6.2-4.6 4.6a1 1 0 0 1-1.4 0L5.8 10.4a1 1 0 1 1 1.4-1.4l1.4 1.4 3.9-3.9a1 1 0 1 1 1.4 1.4z" />
                  </svg>
                  <span>
                    <span className="font-semibold text-white">{t}</span>
                    <span className="block text-sm text-white/60">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
