// Geteilte Bereichsdaten für Startseiten-Teaser (Schwerpunkte) und die
// vertiefenden Unterseiten (/logistik, /industrie, /handwerk). Bewusst klare
// Trennung der drei Bereiche — keine Vermischung von Inhalten (Design-Review
// 24.06.2026). Im Handwerk konsequent "Handwerk" statt "Bau/Baustelle".
import { leistungszahlen } from "./leistungszahlen";

export const bereiche = {
  logistik: {
    slug: "logistik",
    name: "Logistik",
    bild: "/flixwork-logistik.jpg",
    eyebrow: "Schwerpunkt Logistik",
    // kurzer Teaser für die Startseite
    teaser:
      "Lagerhaltung, Kommissionierung und Projektpersonal — flexibel skalierbar, wenn das Volumen es verlangt.",
    titel: "Ihr Wachstumsmotor in der Logistik.",
    text: "Saisonspitzen, Projektgeschäft, kurzfristige Ausfälle — wir stellen schnell und in jeder Größenordnung die richtigen Kräfte bereit und steuern den Einsatz mit erfahrenem Projektmanagement.",
    usps: [
      ["Operative Erfahrung statt Theorie", "Langjährige Erfahrung in Logistik, Produktion und Multi-Site-Strukturen."],
      ["Schnelle Besetzung & hohe Lieferqualität", "Flexible Personalbereitstellung auch bei kurzfristigen Bedarfen und Peaks."],
      ["Persönliche Betreuung", "Feste Ansprechpartner mit kurzen Entscheidungswegen."],
      ["OnSite & Master-Vendor-Kompetenz", "Von einzelnen Mitarbeitenden bis zur standortübergreifenden Gesamtsteuerung."],
      ["Transparenz & Verlässlichkeit", "Klare Kommunikation, nachvollziehbare Prozesse und messbare Ergebnisse."],
      ["Flexibel skalierbar", "Vom regionalen Mittelstand bis zum internationalen Großstandort."],
    ],
    panelTitel: "Kennzahlen",
    // KPIs statt "Typische Positionen"-Panel — direkt im Hero-Glaspanel
    // (Website-Review 03.07.2026 + Folgeanpassung: kreativ im Hero integriert,
    // keine separate Box).
    kennzahlenPanel: leistungszahlen,
    cta: { label: "Personal anfragen", href: "#anfrage" },
  },
  industrie: {
    slug: "industrie",
    name: "Industrie",
    bild: "/flixwork-industrie.jpg",
    eyebrow: "Schwerpunkt Industrie",
    teaser:
      "Sorgfältig ausgewählte Fach- und Hilfskräfte — mit strukturierten Vorstellungsgesprächen und Qualitätssicherung.",
    titel: "Die richtigen Fachkräfte — sorgfältig ausgewählt.",
    text: "In der Industrie zählt Qualität. Wir wählen Fach- und Hilfskräfte gezielt aus, führen strukturierte Vorstellungsgespräche und sichern die Qualität — damit bei Ihnen die passenden Menschen ankommen.",
    // Konkrete KPIs statt generischer Aussagen (Website-Review 03.07.2026) —
    // dieselben belegten Werte wie Leistungszahlen/Logistik-Band.
    usps: [
      ["24 h Reaktionszeit", "Schnelle Rückmeldung und Terminvereinbarung nach Ihrer Anfrage."],
      ["< 5 % Frühfluktuation", "Gezielte Vorauswahl sorgt für stabile, langfristige Besetzungen."],
      ["> 90 % Qualifikations-Match", "Strukturierte Vorstellungsgespräche statt Bauchgefühl."],
    ],
    // Hero-Panel zeigt die möglichen Industriezweige statt typischer Positionen
    // (Kundenwunsch 14.07.2026).
    panelTitel: "Mögliche Industriezweige",
    panel: ["Defense", "Automotive", "Kunststoffindustrie", "Chemieindustrie", "Metallindustrie"],
    // Schlagwort-Band im Hero: nur noch die KPIs — die Branchen stehen jetzt im
    // Panel darüber und würden sich sonst doppeln.
    band: [
      "24 h Reaktionszeit",
      "< 5 % Frühfluktuation",
      "> 90 % Qualifikations-Match",
    ],
    cta: { label: "Personal anfragen", href: "#anfrage" },
  },
  handwerk: {
    slug: "handwerk",
    name: "Handwerk",
    bild: "/flixwork-handwerk.jpg",
    eyebrow: "Flixmonteure · SHK, Elektro & TGA",
    teaser:
      "Qualifizierte Monteure für SHK, Elektro, Lüftung & TGA — bundesweit, einsatzbereit mit Werkzeug, Fahrzeug und Organisation.",
    titel: "Fachkräftemangel? Wir stellen qualifizierte SHK-, Elektro- und TGA-Monteure innerhalb weniger Tage bereit.",
    text: "Flixmonteure unterstützt Handwerksbetriebe und Industriekunden mit einsatzbereiten Fachkräften — inklusive Werkzeug, Anreise, Unterkunft und Organisation. Stellen Sie sich Ihren Monteur im Konfigurator selbst zusammen.",
    usps: [
      ["Europäische Fachkräfte", "Erfahrene Monteure für Elektro, SHK und Versorgungstechnik."],
      ["Mobil & ausgestattet", "Eigenes Auto und eigenes Werkzeug — sofort einsatzfähig."],
      ["Bundesweit", "Einsatz vor Ort, egal wo in Deutschland — auch mehrtägig."],
    ],
    panelTitel: "Fachgebiete",
    // "Versorgungstechnik" und "TGA" bewusst beide gelistet — finale
    // Begriffswahl steht nach Rücksprache mit Herrn Wolf noch aus (Website-Review 03.07.2026).
    panel: ["Sanitär, Heizung & Klima (SHK)", "Elektro", "Lüftung", "Versorgungstechnik", "Technische Gebäudeausrüstung (TGA)"],
    cta: { label: "Monteur konfigurieren", href: "#konfigurator" },
    // Header zeigt hier ausschließlich das Flixmonteure-Logo statt Flixwork
    // (Website-Review 03.07.2026) — finale Umsetzung hängt von Abstimmung mit
    // dem bestehenden Webdesigner ab.
    navbarLogo: { src: "/flix-lmonteure.png", alt: "Flixmonteure" },
  },
};

// Reihenfolge für Teaser/Navigation
export const bereicheListe = [bereiche.logistik, bereiche.industrie, bereiche.handwerk];
