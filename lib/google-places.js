// Live Google Business-Bewertungen (Website-Review 03.07.2026). Serverseitiger
// Aufruf der Places API "Place Details" — der Key bleibt dadurch auf dem
// Server und geht nie an den Browser. Ohne Konfiguration liefert die Funktion
// `null`, die aufrufenden Komponenten zeigen dann ihren Platzhaltertext (die
// Seite bleibt so auch ohne Google-Zugangsdaten voll funktionsfähig).
const FIELDS = "rating,user_ratings_total,reviews,url";
const REVALIDATE_SECONDS = 21600; // 6h — schont das API-Kontingent

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    console.warn("[google-places] GOOGLE_PLACES_API_KEY oder GOOGLE_PLACE_ID fehlt — zeige Platzhalter.");
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${FIELDS}&language=de&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.error("[google-places] HTTP-Fehler:", res.status);
      return null;
    }
    const data = await res.json();
    if (data.status !== "OK" || !data.result) {
      console.error("[google-places] API-Fehler:", data.status, data.error_message);
      return null;
    }

    const { rating, user_ratings_total, reviews = [], url: mapsUrl } = data.result;
    return {
      rating,
      total: user_ratings_total,
      mapsUrl,
      reviews: reviews
        .filter((r) => r.rating >= 4)
        .slice(0, 3)
        .map((r) => ({
          author: r.author_name,
          rating: r.rating,
          text: r.text,
          relativeTime: r.relative_time_description,
        })),
    };
  } catch (err) {
    console.error("[google-places] Netzwerkfehler:", err);
    return null;
  }
}
