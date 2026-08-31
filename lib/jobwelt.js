// Taxonomie und Helfer der Bewerberwelt.
//
// Die Branchen sind fest definiert, weil sie eigene Texte und eigene
// Landingpages haben. Die Standorte entstehen dagegen aus den Stellen selbst:
// jede Stadt mit offenen Stellen bekommt automatisch ihre Seite, optional mit
// einem eigenen Einleitungstext aus STANDORT_TEXTE.

import { slugify } from "./zvoove";

export const branchen = [
  {
    slug: "logistik-hilfskraefte",
    name: "Logistik Hilfskräfte",
    kurz: "Lager, Kommissionierung, Versand",
    text: "Der schnellste Weg in einen festen Job: Lager, Kommissionierung und Versand starten ohne Vorkenntnisse. Eingearbeitet werden Sie beim Kunden, bezahlt wird nach Tarif plus Branchenzuschlägen.",
  },
  {
    slug: "logistik-fachkraefte",
    name: "Logistik Fachkräfte",
    kurz: "Stapler, Lagerlogistik, Disposition",
    text: "Mit Staplerschein oder abgeschlossener Ausbildung sind Sie in der Logistik gesucht. Wir bringen Sie zu Kunden, die Fachkräfte halten wollen, und verlängern Ihre Scheine auf unsere Kosten.",
  },
  {
    slug: "industrie-hilfskraefte",
    name: "Industrie Hilfskräfte",
    kurz: "Produktion, Montage, Qualitätskontrolle",
    text: "Produktion und Montage bieten geregelte Schichten, planbare Zulagen und eine echte Perspektive auf Übernahme. Auch als Quereinstieg gut machbar.",
  },
  {
    slug: "industrie-fachkraefte",
    name: "Industrie Fachkräfte",
    kurz: "Instandhaltung, Maschinenführung, Technik",
    text: "Für Facharbeiter aus Technik und Instandhaltung haben wir die Einsätze, bei denen Können zählt. Übertarifliche Bezahlung und Kunden, die Sie übernehmen wollen.",
  },
  {
    slug: "handwerksberufe",
    name: "Handwerksberufe",
    kurz: "Elektro, SHK, Versorgungstechnik",
    text: "Elektro, Sanitär, Heizung, Klima: Handwerk wird bei uns fair bezahlt, mit Fahrzeug und Werkzeug ausgestattet und regional eingesetzt, wenn Sie das möchten.",
  },
  {
    slug: "kaufmaennische-berufe",
    name: "Kaufmännische Berufe",
    kurz: "Sachbearbeitung, Einkauf, Disposition",
    text: "Vom Auftragsmanagement bis zur Disposition: kaufmännische Einsätze in Büros, die nach kurzer Zeit selbst übernehmen wollen.",
  },
  {
    slug: "sonstige-branchen",
    name: "Sonstige Branchen",
    kurz: "Fahrdienst, Service, Sonderaufgaben",
    text: "Nicht jeder Job passt in eine Schublade. Hier finden Sie alles, was sonst noch offen ist, vom Berufskraftfahrer bis zum Servicepersonal.",
  },
];

export function branche(slug) {
  return branchen.find((b) => b.slug === slug) ?? null;
}

// Optionale Einleitungen je Stadt. Fehlt ein Eintrag, wird ein neutraler Satz
// erzeugt, damit auch ein neuer Einsatzort sofort eine ordentliche Seite hat.
const STANDORT_TEXTE = {
  kassel: "Kassel ist unser Heimatmarkt. Hier kennen wir die Betriebe persönlich und wissen, wie in welcher Halle wirklich gearbeitet wird.",
  baunatal: "Rund um Baunatal prägt die Automobilzulieferung den Arbeitsmarkt. Wir besetzen dort Schichten in Logistik und Produktion.",
  melsungen: "In Melsungen und Umgebung suchen vor allem Medizintechnik und Logistik verlässliche Leute für den Schichtbetrieb.",
  goettingen: "Göttingen bietet Produktion, Labor und Logistik in einem Umfeld, das Fachkräfte gerne dauerhaft übernimmt.",
  leipzig: "Der Großraum Leipzig wächst weiter, vor allem in der Distribution. Entsprechend viele Stellen sind hier dauerhaft offen.",
  halle: "In Halle und dem Saalekreis besetzen wir Technik, Handwerk und Logistik, oft mit direkter Übernahmeperspektive.",
};

export function formatLohn(job) {
  const eur = (n) => n.toLocaleString("de-DE", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  if (job.lohnVon && job.lohnBis) return `${eur(job.lohnVon)} bis ${eur(job.lohnBis)} €/Std.`;
  if (job.lohnBis) return `bis ${eur(job.lohnBis)} €/Std.`;
  if (job.lohnVon) return `ab ${eur(job.lohnVon)} €/Std.`;
  return "auf Anfrage";
}

// Alle Städte mit offenen Stellen, alphabetisch, mit Anzahl und Text.
export function standorteAus(jobs) {
  const map = new Map();
  for (const j of jobs) {
    if (!j.ort) continue;
    const slug = slugify(j.ort);
    const vorhanden = map.get(slug);
    if (vorhanden) vorhanden.anzahl += 1;
    else map.set(slug, { slug, name: j.ort, region: j.region, anzahl: 1 });
  }
  return [...map.values()]
    .map((s) => ({
      ...s,
      text:
        STANDORT_TEXTE[s.slug] ??
        `In ${s.name} und im Umkreis besetzen wir regelmäßig Stellen in Logistik, Industrie und Handwerk.`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
}

// Anzahl offener Stellen je Branche, für die Filterleiste und die Übersicht.
export function branchenAus(jobs) {
  return branchen
    .map((b) => ({ ...b, anzahl: jobs.filter((j) => j.kategorie === b.slug).length }))
    .filter((b) => b.anzahl > 0);
}
