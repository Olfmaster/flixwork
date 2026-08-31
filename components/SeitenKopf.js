import Navbar from "./Navbar";

// Schlanker Seitenkopf ohne Bild für die Unterseiten der Bewerberwelt
// (Standorte, Branchen, Formulare). Bildlose Köpfe laden schneller und sind auf
// diesen Seiten auch inhaltlich richtig: hier zählt die Liste darunter.
export default function SeitenKopf({ eyebrow, titel, text, kinder }) {
  return (
    <section className="flx-hero-bg relative text-white">
      <Navbar variant="bewerber" />
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-soft">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl">{titel}</h1>
          {text ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{text}</p> : null}
          {kinder}
        </div>
      </div>
    </section>
  );
}
