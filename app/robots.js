// Robots-Datei passend zur Sitemap. Der Bewerbungspfad mit Stellenparameter
// wird ausgeschlossen, damit nicht jede Stelle eine zweite, fast identische
// Formularseite im Index erzeugt.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/bewerben?"] }],
    sitemap: "https://www.flixwork.de/sitemap.xml",
  };
}
