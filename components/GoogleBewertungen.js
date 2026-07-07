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

// Google Business-Bewertungen, live per Places API (Website-Review 03.07.2026,
// "Alle Unterseiten: Google-Bewertungsbereich einheitlich einbinden"). Ohne
// GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID bleibt ein neutraler Platzhalter
// stehen — die Seite funktioniert so auch vor Einrichtung der API.
export default async function GoogleBewertungen() {
  const data = await getGoogleReviews();

  if (!data) {
    return (
      <Reveal className="flex flex-col items-center gap-2 rounded-2xl border border-navy/10 bg-white px-6 py-6 text-center">
        <Sterne value={5} />
        <p className="text-sm font-semibold text-navy">Google-Bewertungen</p>
        <p className="max-w-md text-xs leading-relaxed text-navy/55">
          Live-Einbindung unserer Google Business-Bewertungen folgt in Kürze.
        </p>
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
