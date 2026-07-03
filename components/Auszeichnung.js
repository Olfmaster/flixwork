import Reveal from "./Reveal";

// GVP-Auszeichnung (Gesamtverband der Personaldienstleister) als Vertrauens-
// element auf der Startseite. Siegel bewusst in Originalfarben (kein Silhouetten-
// Filter wie bei den Kundenlogos). Verlinkt auf personaldienstleister.de.
export default function Auszeichnung() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-navy/10 bg-mist px-6 py-10 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-left">
          <a
            href="https://personaldienstleister.de/"
            target="_blank"
            rel="noopener"
            aria-label="Auszeichnung des Gesamtverbands der Personaldienstleister (GVP)"
            className="shrink-0 transition-transform hover:scale-[1.03]"
          >
            <img
              src="/gvp_gesamtverband_der_personaldienstleister.png"
              alt="Auszeichnung des Gesamtverbands der Personaldienstleister (GVP)"
              className="h-20 w-auto md:h-24"
            />
          </a>
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Auszeichnung</p>
            <p className="mt-2 leading-relaxed text-navy/70">
              Flixwork wurde vom{" "}
              <a
                href="https://personaldienstleister.de/"
                target="_blank"
                rel="noopener"
                className="font-semibold text-navy underline decoration-sky/40 underline-offset-2 hover:decoration-sky"
              >
                Gesamtverband der Personaldienstleister (GVP)
              </a>{" "}
              ausgezeichnet — ein Beleg für Qualität und Verlässlichkeit in der
              Personaldienstleistung.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
