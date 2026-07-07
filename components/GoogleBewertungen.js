import Reveal from "./Reveal";
import { getGoogleReviews } from "@/lib/google-places";

function Sterne({ value, size = "h-5 w-5" }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={size} fill="currentColor">
          <path
            d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6L10 1.5z"
            opacity={i < Math.round(value) ? 1 : 0.25}
          />
        </svg>
      ))}
    </div>
  );
}

// Deutlich als Muster gekennzeichnete Beispieldaten für den Zustand vor
// Einrichtung der Places API — zeigen das spätere Layout (5 Bewertungen),
// ohne echten Kunden erfundene Aussagen in den Mund zu legen.
const BEISPIEL_BEWERTUNGEN = [
  "Hier erscheint automatisch der Text einer echten Google-Bewertung.",
  "Schnelle, unkomplizierte Zusammenarbeit — so wie es echte Kunden formulieren werden.",
  "Platzhaltertext im Layout einer Google-Bewertung, sobald die API verbunden ist.",
  "Beispielhafte Länge und Darstellung einer künftigen Kundenbewertung.",
  "Wird ersetzt, sobald GOOGLE_PLACES_API_KEY und GOOGLE_PLACE_ID hinterlegt sind.",
].map((text, i) => ({ author: `Beispielkunde ${i + 1}`, text }));

// Google Business-Bewertungen, live per Places API (Website-Review 03.07.2026,
// "Alle Unterseiten: Google-Bewertungsbereich einheitlich einbinden"). Ohne
// GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID zeigt die Sektion eine klar als
// Vorschau markierte Beispielansicht mit 5 Muster-Bewertungen — die Seite
// funktioniert so auch vor Einrichtung der API, ohne echte Bewertungen vorzutäuschen.
export default async function GoogleBewertungen() {
  const data = await getGoogleReviews();

  if (!data) {
    return (
      <Reveal className="rounded-2xl border border-dashed border-navy/20 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sterne value={5} />
            <p className="text-sm font-semibold text-navy">Google-Bewertungen</p>
          </div>
          <span className="rounded-full bg-cloud px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy/60">
            Beispielansicht
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-navy/55">
          Vorschau des künftigen Layouts — die echten Google-Bewertungen erscheinen automatisch, sobald die API eingerichtet ist.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {BEISPIEL_BEWERTUNGEN.map((r) => (
            <div key={r.author} className="rounded-xl border border-dashed border-navy/15 bg-mist p-5">
              <Sterne value={5} size="h-3.5 w-3.5" />
              <p className="mt-2.5 text-sm leading-relaxed text-navy/60 italic">{r.text}</p>
              <p className="mt-3 text-xs font-semibold text-navy/45">{r.author}</p>
            </div>
          ))}
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="rounded-2xl border border-navy/10 bg-white p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sterne value={data.rating} />
          <p className="text-sm font-semibold text-navy">
            {data.rating?.toFixed(1)} · {data.total} Google-Bewertungen
          </p>
        </div>
        {data.mapsUrl && (
          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noopener"
            className="text-sm font-semibold text-sky transition-colors hover:text-navy"
          >
            Alle Bewertungen ansehen →
          </a>
        )}
      </div>

      {data.reviews.length > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {data.reviews.map((r, i) => (
            <div key={i} className="rounded-xl border border-navy/10 bg-mist p-5">
              <Sterne value={r.rating} size="h-3.5 w-3.5" />
              <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-navy/75">{r.text}</p>
              <p className="mt-3 text-xs font-semibold text-navy/55">
                {r.author} · {r.relativeTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </Reveal>
  );
}
