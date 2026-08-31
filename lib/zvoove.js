// Anbindung der Stellen aus zvoove.
//
// ---------------------------------------------------------------------------
// STATUS 31.08.2026: Zugangsdaten liegen noch nicht vor.
// Solange ZVOOVE_API_BASE oder ZVOOVE_API_KEY fehlen, liefert dieses Modul die
// Platzhalter aus lib/jobs-demo.js. Sobald beide Werte in der Umgebung stehen,
// zieht die Seite automatisch die echten Stellen. An den Seiten und
// Komponenten muss dafür nichts geändert werden.
//
// Zum Scharfschalten sind genau drei Dinge nötig:
//   1. ZVOOVE_API_BASE und ZVOOVE_API_KEY in .env setzen
//   2. FELDER unten gegen die echten Feldnamen der API prüfen
//   3. bewerbungAnZvoove() ausfüllen, falls es einen Schreib-Endpunkt gibt
//
// Diese Datei ist die einzige Stelle im Projekt, die zvoove kennt. Alles
// andere arbeitet ausschließlich mit dem normalisierten Job-Objekt:
//
//   { id, slug, titel, kategorie, ort, plz, region, beschaeftigungsart,
//     arbeitszeit, lohnVon, lohnBis, praemie, startdatum, kurztext,
//     aufgaben[], profil[], benefits[], aktualisiertAm, bewerbungsUrl? }
// ---------------------------------------------------------------------------

import { demoJobs } from "./jobs-demo";

const BASE = process.env.ZVOOVE_API_BASE?.replace(/\/+$/, "");
const KEY = process.env.ZVOOVE_API_KEY;

// Wie lange eine abgerufene Stellenliste gecacht wird, bevor Next.js im
// Hintergrund neu lädt. 15 Minuten sind für eine Jobbörse reichlich schnell und
// halten die Zahl der API-Aufrufe niedrig.
export const REVALIDATE = 900;

export const zvooveAktiv = Boolean(BASE && KEY);

// Vermutete Feldnamen der zvoove-Stellen-API. Mehrere Kandidaten pro Feld, weil
// die genaue Benennung erst mit dem Zugang feststeht. Nach dem ersten echten
// Aufruf hier auf den tatsächlichen Namen eindampfen.
const FELDER = {
  id: ["id", "stelleId", "uuid", "guid"],
  titel: ["bezeichnung", "titel", "stellenbezeichnung", "title"],
  kategorie: ["berufsfeld", "kategorie", "branche", "fachbereich"],
  ort: ["ort", "einsatzort", "stadt", "city"],
  plz: ["plz", "postleitzahl", "zip"],
  region: ["bundesland", "region", "state"],
  beschaeftigungsart: ["beschaeftigungsart", "anstellungsart", "vertragsart"],
  arbeitszeit: ["arbeitszeit", "arbeitszeitmodell", "schicht"],
  lohnVon: ["lohnVon", "gehaltVon", "stundenlohnVon"],
  lohnBis: ["lohnBis", "gehaltBis", "stundenlohnBis"],
  startdatum: ["eintrittsdatum", "startdatum", "besetzungsdatum"],
  kurztext: ["kurzbeschreibung", "einleitung", "teaser"],
  aufgaben: ["aufgaben", "taetigkeiten", "aufgabenbereich"],
  profil: ["profil", "anforderungen", "qualifikation"],
  benefits: ["benefits", "wirBieten", "leistungen"],
  aktualisiertAm: ["geaendertAm", "aktualisiertAm", "modified", "datum"],
  bewerbungsUrl: ["bewerbungsUrl", "bewerbungsLink", "applicationUrl"],
};

function wert(raw, kandidaten) {
  for (const k of kandidaten) {
    const v = raw?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Aus Text oder Array immer eine Liste machen. zvoove liefert die Textblöcke je
// nach Pflege als HTML-Liste, als Fließtext mit Zeilenumbrüchen oder als Array.
function liste(v) {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  if (typeof v !== "string") return [];
  return v
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n|•|;/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function zahl(v) {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return undefined;
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

// Rohe zvoove-Stelle in unser Job-Objekt übersetzen.
export function mapStelle(raw) {
  const titel = String(wert(raw, FELDER.titel) ?? "").trim();
  const ort = String(wert(raw, FELDER.ort) ?? "").trim();
  const plz = String(wert(raw, FELDER.plz) ?? "").trim();
  if (!titel) return null;

  return {
    id: String(wert(raw, FELDER.id) ?? slugify(`${titel}-${plz}`)),
    // Das URL-Schema entspricht dem der bisherigen Seite, damit vorhandene
    // Google-Platzierungen erhalten bleiben.
    slug: slugify(`${titel} ${plz} ${ort}`),
    titel,
    kategorie: slugify(wert(raw, FELDER.kategorie) ?? "sonstige-branchen"),
    ort,
    plz,
    region: String(wert(raw, FELDER.region) ?? "").trim(),
    beschaeftigungsart: String(wert(raw, FELDER.beschaeftigungsart) ?? "Vollzeit"),
    arbeitszeit: String(wert(raw, FELDER.arbeitszeit) ?? ""),
    lohnVon: zahl(wert(raw, FELDER.lohnVon)),
    lohnBis: zahl(wert(raw, FELDER.lohnBis)),
    praemie: undefined, // wird in zvoove nicht als eigenes Feld geführt, siehe README-Hinweis unten
    startdatum: String(wert(raw, FELDER.startdatum) ?? "ab sofort"),
    kurztext: String(wert(raw, FELDER.kurztext) ?? ""),
    aufgaben: liste(wert(raw, FELDER.aufgaben)),
    profil: liste(wert(raw, FELDER.profil)),
    benefits: liste(wert(raw, FELDER.benefits)),
    aktualisiertAm: String(wert(raw, FELDER.aktualisiertAm) ?? "").slice(0, 10),
    bewerbungsUrl: wert(raw, FELDER.bewerbungsUrl),
  };
}

// Alle offenen Stellen. Bei einem API-Fehler bewusst eine leere Liste statt der
// Demodaten: lieber ehrlich "gerade nicht erreichbar" zeigen als erfundene
// Stellen. Next.js liefert in diesem Fall ohnehin weiter die zuletzt
// erfolgreich gebaute Seite aus, bis die nächste Aktualisierung klappt.
export async function getJobs() {
  if (!zvooveAktiv) return demoJobs;

  try {
    const res = await fetch(`${BASE}/api/public/v1/Stelle/GetStellenFiltered`, {
      headers: { Accept: "application/json", "X-API-KEY": KEY },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const rohe = Array.isArray(data) ? data : (data.stellen ?? data.items ?? data.result ?? []);
    return rohe.map(mapStelle).filter(Boolean);
  } catch (err) {
    console.error("[zvoove] Stellen konnten nicht geladen werden:", err.message);
    return [];
  }
}

// Einzelne Stelle. Der Datensatz ist klein genug, dass wir aus der Liste
// auflösen können. Falls die Listenantwort später nur Kurzdaten enthält, wird
// hier zusätzlich GetStelleById aufgerufen und in das Objekt gemischt.
export async function getJob(slug) {
  const jobs = await getJobs();
  return jobs.find((j) => j.slug === slug) ?? null;
}

// Bewerbung zurück in zvoove schreiben.
// Offen bis zvoove bestätigt, ob es einen Schreib-Endpunkt für Bewerber gibt.
// Bis dahin verschickt lib/bewerbung-action.js die Bewerbung per Mail, dieser
// Aufruf meldet lediglich, dass er nichts getan hat.
export async function bewerbungAnZvoove() {
  return { ok: false, grund: "nicht konfiguriert" };
}
