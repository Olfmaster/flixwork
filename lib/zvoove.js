// Anbindung der Stellen aus zvoove (flixwork-Mandant).
//
// ---------------------------------------------------------------------------
// STATUS 03.09.2026: Angebunden und gegen die echte API geprüft.
//
// Die Jobbörse zieht ihre Stellen aus zwei öffentlichen Endpunkten der
// zvoove-Instanz:
//
//   GET  /api/public/v1/Stelle/GetStellenFiltered
//        Liste aller veröffentlichten Stellen, aber nur Stammdaten
//        (Titel, Ort, Vertragsart). Keine Texte.
//   POST /api/public/v1/Stelle/GetStellenByIds   Body: ["uuid", "uuid", …]
//        Volldatensätze inklusive Aufgaben, Anforderungen und Perspektiven.
//
// Beide Leseendpunkte antworten auch ohne Schlüssel. ZVOOVE_API_KEY wird
// trotzdem mitgeschickt, sobald er gesetzt ist. Umgeschaltet wird über
// ZVOOVE_API_BASE: fehlt die Basis-URL, zeigt die Seite die Platzhalter aus
// lib/jobs-demo.js und blendet den Vorschau-Hinweis ein.
//
// Bewerbungen zurückschreiben: POST /api/public/v1/Bewerbung/Create existiert
// und erwartet multipart/form-data, antwortet mit dem vorliegenden Schlüssel
// aber mit 401. Der Schlüssel ist also nicht für Schreibzugriffe freigegeben.
// Solange das so ist, verschickt lib/bewerbung-action.js die Bewerbung per
// Mail. Offene Frage an zvoove steht unten bei bewerbungAnZvoove().
//
// Eigenheiten der Daten, die diese Datei ausgleicht:
//   * Die Gehaltsfelder der API sind bei allen Stellen leer. Stundenlohn und
//     Startprämie stehen im Titel ("… bis 25 EUR/Std.", "… 200€ Startprämie")
//     und im Perspektiven-Block. Beides wird herausgelöst und der Titel
//     bereinigt, damit Lohn und Prämie nicht doppelt auf der Karte stehen.
//   * Die Texte kommen als HTML mit benannten Entities und vielen <span>.
//   * Einsatzorte sind uneinheitlich gepflegt ("Kassel" und "Kassel, Hessen").
//     Ohne Normalisierung entstünden zwei Städteseiten für dieselbe Stadt.
//
// Diese Datei ist die einzige Stelle im Projekt, die zvoove kennt. Alles
// andere arbeitet ausschließlich mit dem normalisierten Job-Objekt:
//
//   { id, slug, titel, kategorie, ort, plz, region, beschaeftigungsart,
//     arbeitszeit, lohnVon, lohnBis, praemie, startdatum, kurztext,
//     aufgaben[], profil[], benefits[], aktualisiertAm, bewerbungsUrl? }
// ---------------------------------------------------------------------------

import { unstable_cache } from "next/cache";
import { demoJobs } from "./jobs-demo";

const BASE = process.env.ZVOOVE_API_BASE?.replace(/\/+$/, "");
const KEY = process.env.ZVOOVE_API_KEY;

// Wie lange die abgerufenen Stellen gecacht werden, bevor im Hintergrund neu
// geladen wird. 15 Minuten sind für eine Jobbörse reichlich schnell und halten
// die Zahl der API-Aufrufe niedrig.
export const REVALIDATE = 900;

export const zvooveAktiv = Boolean(BASE);

// Wie viele Stellen pro Detailabruf angefragt werden. 181 Stellen in einem
// Rutsch funktionieren, aber der Bestand wächst; in Blöcken bleibt die Antwort
// klein genug, dass ein einzelner Abruf nicht ins Timeout läuft.
const BLOCK = 100;

// --- Textaufbereitung ------------------------------------------------------

const ENTITIES = {
  auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü", szlig: "ß",
  euro: "€", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ",
  bdquo: "„", ldquo: "“", rdquo: "”", lsquo: "‚", rsquo: "’", sbquo: "‚",
  ndash: "–", mdash: "—", hellip: "…", middot: "·", bull: "•", deg: "°", shy: "",
};

function entities(roh) {
  return roh
    .replace(/&([a-zA-Z]+);/g, (treffer, name) => ENTITIES[name] ?? treffer)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

// Inline-Auszeichnung wird ersatzlos entfernt, Blockelemente werden zum
// Zeilenumbruch. Andersherum zerfiele ein in <span> zerlegtes Wort zu "K assel".
function ohneTags(html) {
  return entities(
    String(html ?? "")
      .replace(/<\/?(span|strong|b|em|i|u|a|font|sup|sub)\b[^>]*>/gi, "")
      .replace(/<\/(li|p|div|h[1-6]|tr)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  );
}

function text(html) {
  return ohneTags(html).replace(/\s+/g, " ").trim();
}

function liste(html) {
  return ohneTags(html)
    .split("\n")
    .map((zeile) => zeile.replace(/\s+/g, " ").replace(/^[-•*\s]+/, "").trim())
    .filter((zeile) => zeile.length > 1);
}

export function slugify(wert) {
  return String(wert)
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- Lohn, Prämie, Titel ---------------------------------------------------

const LOHN_STUNDE = /(ab|bis)?\s*(\d{1,3}(?:[.,]\d{1,2})?)\s*(?:EUR|€)\s*(?:\/|\s+pro\s+)\s*(?:Std\.?|Stunde|h)\b\.?/i;
const LOHN_KURZ = /(ab|bis)\s*(\d{1,3}(?:[.,]\d{1,2})?)\s*(?:EUR|€)(?!\s*(?:\/|\s+pro\s+)?\s*(?:Std|Stunde|h))/i;
const PRAEMIE_A = /(\d{2,4})\s*(?:€|EUR)\s*(?:Start)?pr[äa]mie/i;
const PRAEMIE_B = /(?:Start)?pr[äa]mie\s*(?:von\s*)?(\d{2,4})\s*(?:€|EUR)/i;

function zahl(v) {
  if (typeof v === "number") return v;
  if (!v) return undefined;
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

// Erst im Titel suchen, dann im Perspektiven-Block ("Stundenlohn bis 17,00 EUR",
// "200€ Startprämie nach 8 Wochen Beschäftigung").
function lohnUndPraemie(titel, perspektiven) {
  let lohnVon, lohnBis, praemie;

  const stunde = titel.match(LOHN_STUNDE) ?? titel.match(LOHN_KURZ);
  if (stunde) {
    const wert = zahl(stunde[2]);
    if (String(stunde[1]).toLowerCase() === "bis") lohnBis = wert;
    else lohnVon = wert;
  }

  const imTitel = titel.match(PRAEMIE_A) ?? titel.match(PRAEMIE_B);
  if (imTitel) praemie = zahl(imTitel[1]);

  if (!lohnVon && !lohnBis) {
    const m = perspektiven.match(/Stundenlohn\s*(ab|bis)?\s*(\d{1,3}(?:[.,]\d{1,2})?)\s*(?:EUR|€)/i);
    if (m) {
      const wert = zahl(m[2]);
      if (String(m[1]).toLowerCase() === "bis") lohnBis = wert;
      else lohnVon = wert;
    }
  }

  if (!praemie) {
    const m = perspektiven.match(PRAEMIE_A) ?? perspektiven.match(PRAEMIE_B);
    if (m) praemie = zahl(m[1]);
  }

  return { lohnVon, lohnBis, praemie };
}

// Lohn- und Prämienangaben aus dem Titel nehmen, damit die Überschrift den
// Beruf zeigt und die Zahlen dort stehen, wo das Layout sie erwartet.
function titelBereinigt(roh) {
  return roh
    .replace(new RegExp(LOHN_STUNDE.source, "gi"), "")
    .replace(new RegExp(LOHN_KURZ.source, "gi"), "")
    .replace(new RegExp(PRAEMIE_A.source, "gi"), "")
    .replace(new RegExp(PRAEMIE_B.source, "gi"), "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([),.])/g, "$1")
    .replace(/[\s,\-–—|]+$/, "")
    .trim();
}

// --- Zuordnungen -----------------------------------------------------------

// Die Abteilung in zvoove ist mehrwertig ("Fachkraft Logistik, Helfer Industrie,
// Helfer Logistik"). Die Branchen der Website sind es nicht, deshalb gewinnt die
// erste passende Regel. Fachkraft schlägt Helfer, Logistik schlägt Industrie.
const BRANCHEN_REGELN = [
  [/kaufm/i, "kaufmaennische-berufe"],
  [/fachkr(a|ä)ft?e?\s+logistik/i, "logistik-fachkraefte"],
  [/fachkr(a|ä)ft?e?\s+industrie/i, "industrie-fachkraefte"],
  [/handwerk/i, "handwerksberufe"],
  [/helfer\s+logistik/i, "logistik-hilfskraefte"],
  [/helfer\s+industrie/i, "industrie-hilfskraefte"],
];

function kategorieAus(abteilung) {
  for (const [muster, slug] of BRANCHEN_REGELN) if (muster.test(abteilung)) return slug;
  return "sonstige-branchen";
}

// zvoove liefert das Bundesland meist nur als Kürzel in EinsatzortRegion.
const BUNDESLAENDER = {
  BW: "Baden-Württemberg", BY: "Bayern", BE: "Berlin", BB: "Brandenburg",
  HB: "Bremen", HH: "Hamburg", HE: "Hessen", MV: "Mecklenburg-Vorpommern",
  NDS: "Niedersachsen", NI: "Niedersachsen", NRW: "Nordrhein-Westfalen",
  NW: "Nordrhein-Westfalen", RP: "Rheinland-Pfalz", SL: "Saarland",
  SN: "Sachsen", SA: "Sachsen-Anhalt", ST: "Sachsen-Anhalt",
  SH: "Schleswig-Holstein", TH: "Thüringen",
};

// "Kassel, Hessen" und "Warburg, Westfalen" sind dieselbe Stadt wie "Kassel"
// und "Warburg". Ohne den Schnitt am Komma entstünden doppelte Städteseiten.
function ortAus(roh) {
  return String(roh ?? "").split(",")[0].replace(/\s+/g, " ").trim();
}

function beschaeftigung(arten) {
  const a = String(arten ?? "");
  if (/vollzeit/i.test(a)) return "Vollzeit";
  if (/teilzeit/i.test(a)) return "Teilzeit";
  if (/minijob/i.test(a)) return "Minijob";
  return "Vollzeit";
}

function arbeitszeitAus(arten, stunden, bis) {
  const teile = [];
  if (/schicht/i.test(String(arten ?? ""))) teile.push("Schichtbetrieb");
  if (stunden) teile.push(bis && bis !== stunden ? `${stunden} bis ${bis} Stunden` : `${stunden} Stunden`);
  return teile.join(", ");
}

function datum(v) {
  const s = String(v ?? "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
}

// Ein Startdatum in der Vergangenheit ist kein Termin mehr, sondern "ab sofort".
function startdatumAus(raw) {
  const ab = datum(raw.DatumAb);
  if (raw.BeginnAbSofort || !ab || ab <= new Date().toISOString().slice(0, 10)) return "ab sofort";
  return ab.split("-").reverse().join(".");
}

// Über jeder Anzeige steht derselbe Aufhänger ("Komm jetzt in unser Team und
// werde ein Flixworker!"). Für die Kurzbeschreibung auf der Karte zählt der Satz
// danach, weil erst der sagt, worum es geht.
function kurztextAus(stellenziel) {
  const voll = text(stellenziel);
  let t = voll.replace(/^.*?(Flixworker|flixwork)[^.!?]*[.!?]\s*/i, "");
  if (t.length < 40) t = voll;
  if (t.length <= 240) return t;

  const schnitt = t.slice(0, 240);
  const satzende = Math.max(schnitt.lastIndexOf(". "), schnitt.lastIndexOf("! "), schnitt.lastIndexOf("? "));
  return satzende > 80 ? schnitt.slice(0, satzende + 1) : schnitt.replace(/\s+\S*$/, "") + " …";
}

// --- Abbildung -------------------------------------------------------------

export function mapStelle(raw) {
  const rohTitel = String(raw.BezeichnungAusschreibung || raw.Bezeichnung || "").replace(/\s+/g, " ").trim();
  if (!rohTitel) return null;

  const perspektiven = text(raw.Perspektiven);
  const { lohnVon, lohnBis, praemie } = lohnUndPraemie(rohTitel, perspektiven);
  const titel = titelBereinigt(rohTitel) || rohTitel;
  const ort = ortAus(raw.EinsatzortOrt);
  const plz = String(raw.EinsatzortPlz ?? "").trim();
  const arten = raw.Vertragsart ?? raw.VertragsartenString ?? raw.Vertragsarten;

  return {
    id: String(raw.StelleUuid ?? raw.ObjectUuid ?? raw.StellenID ?? ""),
    // LinkSlug ist der Pfad, unter dem die Stelle auch in zvoove selbst läuft.
    // Ihn zu übernehmen hält bestehende Links und Google-Treffer gültig.
    slug: raw.LinkSlug || slugify(`${titel} ${plz} ${ort}`),
    titel,
    kategorie: kategorieAus(String(raw.Abteilung ?? "")),
    ort,
    plz,
    region: raw.EinsatzortBundesland || BUNDESLAENDER[String(raw.EinsatzortRegion ?? "").toUpperCase()] || "",
    beschaeftigungsart: beschaeftigung(arten),
    arbeitszeit: arbeitszeitAus(arten, raw.Arbeitsstunden, raw.ArbeitsstundenBis),
    lohnVon,
    lohnBis,
    praemie,
    startdatum: startdatumAus(raw),
    kurztext: kurztextAus(raw.Stellenziel),
    aufgaben: liste(raw.Aufgaben),
    profil: [...liste(raw.FachlicheAnforderungen), ...liste(raw.PersoenlicheAnforderungen)],
    benefits: [...liste(raw.Perspektiven), ...liste(raw.Arbeitgeberleistung)],
    aktualisiertAm: datum(raw.VeroeffentlichtAb) || datum(raw.DatumAb),
    bewerbungsUrl: raw.StelleBewerbungUrl || undefined,
  };
}

// Zwei gleich benannte Stellen am selben Ort teilen sich in zvoove denselben
// LinkSlug. Auf der Website wäre eine davon nicht erreichbar, deshalb bekommen
// alle Betroffenen ein Kürzel ihrer UUID angehängt. Sortiert wird nach ID, damit
// dieselbe Stelle bei jedem Abruf dieselbe Adresse behält.
function slugsEindeutig(jobs) {
  const anzahl = new Map();
  for (const job of jobs) anzahl.set(job.slug, (anzahl.get(job.slug) ?? 0) + 1);

  return [...jobs]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((job) => (anzahl.get(job.slug) > 1 ? { ...job, slug: `${job.slug}-${job.id.slice(0, 6)}` } : job));
}

// --- Abruf -----------------------------------------------------------------

const kopfzeilen = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  ...(KEY ? { "X-API-KEY": KEY } : {}),
});

async function hole(pfad, body) {
  const res = await fetch(`${BASE}${pfad}`, {
    method: body ? "POST" : "GET",
    headers: kopfzeilen(),
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store", // gecacht wird eine Ebene höher, siehe ladeStellen
  });
  if (!res.ok) throw new Error(`${pfad}: HTTP ${res.status}`);
  return res.json();
}

// Ein Abruf für die Liste, danach die Volldatensätze in Blöcken. Ein Fehler wird
// bewusst durchgereicht: unstable_cache speichert nur erfolgreiche Läufe, ein
// Aussetzer der API friert also keine leere Jobbörse für 15 Minuten ein.
async function ladeStellenRoh() {
  const uebersicht = await hole("/api/public/v1/Stelle/GetStellenFiltered");
  const uuids = (uebersicht?.Items ?? []).map((s) => s.StelleUuid).filter(Boolean);

  const roh = [];
  for (let i = 0; i < uuids.length; i += BLOCK) {
    roh.push(...(await hole("/api/public/v1/Stelle/GetStellenByIds", uuids.slice(i, i + BLOCK))));
  }

  return slugsEindeutig(roh.map(mapStelle).filter(Boolean));
}

const ladeStellen = unstable_cache(ladeStellenRoh, ["zvoove-stellen"], {
  revalidate: REVALIDATE,
  tags: ["zvoove"],
});

// Alle offenen Stellen. Bei einem API-Fehler bewusst eine leere Liste statt der
// Demodaten: lieber ehrlich "gerade nichts da" zeigen als erfundene Stellen.
// Next.js liefert in diesem Fall ohnehin weiter die zuletzt erfolgreich gebaute
// Seite aus, bis die nächste Aktualisierung klappt.
export async function getJobs() {
  if (!zvooveAktiv) return demoJobs;

  try {
    return await ladeStellen();
  } catch (err) {
    console.error("[zvoove] Stellen konnten nicht geladen werden:", err.message);
    return [];
  }
}

export async function getJob(slug) {
  const jobs = await getJobs();
  return jobs.find((j) => j.slug === slug) ?? null;
}

// Bewerbung zurück in zvoove schreiben.
//
// OFFEN: POST /api/public/v1/Bewerbung/Create ist vorhanden und erwartet
// multipart/form-data, weist unseren Schlüssel aber mit 401 ab. Zu klären ist,
// ob der Schlüssel für Schreibzugriffe freigeschaltet werden kann und welche
// Felder erwartet werden. Bis dahin geht die Bewerbung per Mail heraus
// (lib/bewerbung-action.js), dieser Aufruf meldet nur, dass er nichts getan hat.
//
// Ohne Schreibzugriff bleibt bewerbungsUrl der einzige Weg, auf dem eine
// Bewerbung ohne Abtippen in zvoove landet: das gehostete Bewerberportal je
// Stelle. Es steht auf der Stellenseite und im Formular als zweiter Weg für
// alle, die ihre Unterlagen schon beisammen haben.
export async function bewerbungAnZvoove() {
  return { ok: false, grund: "nicht konfiguriert" };
}
