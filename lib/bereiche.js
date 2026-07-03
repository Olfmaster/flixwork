// Geteilte Bereichsdaten für Startseiten-Teaser (Schwerpunkte) und die
// vertiefenden Unterseiten (/logistik, /industrie, /handwerk). Bewusst klare
// Trennung der drei Bereiche — keine Vermischung von Inhalten (Design-Review
// 24.06.2026). Im Handwerk konsequent "Handwerk" statt "Bau/Baustelle".

export const bereiche = {
  logistik: {
    slug: "logistik",
    name: "Logistik",
    bild: "/flixwork-logistik.jpg",
    eyebrow: "Schwerpunkt Logistik",
    // kurzer Teaser für die Startseite
    teaser:
      "Lagerhaltung, Kommissionierung und Projektpersonal — flexibel skalierbar, wenn das Volumen es verlangt.",
    titel: "Wenn das Volumen steigt, liefern wir Personal.",
    text: "Saisonspitzen, Projektgeschäft, kurzfristige Ausfälle — wir stellen schnell und in jeder Größenordnung die richtigen Kräfte bereit und steuern den Einsatz mit erfahrenem Projektmanagement.",
    usps: [
      ["Operative Erfahrung statt Theorie", "Langjährige Erfahrung in Logistik, Produktion und Multi-Site-Strukturen."],
      ["Schnelle Besetzung & hohe Lieferqualität", "Flexible Personalbereitstellung auch bei kurzfristigen Bedarfen und Peaks."],
      ["Persönliche Betreuung", "Feste Ansprechpartner mit kurzen Entscheidungswegen."],
      ["OnSite & Master-Vendor-Kompetenz", "Von einzelnen Mitarbeitenden bis zur standortübergreifenden Gesamtsteuerung."],
      ["Transparenz & Verlässlichkeit", "Klare Kommunikation, nachvollziehbare Prozesse und messbare Ergebnisse."],
      ["Flexibel skalierbar", "Vom regionalen Mittelstand bis zum internationalen Großstandort."],
    ],
    panelTitel: "Typische Positionen",
    panel: ["Lagerhelfer (m/w/d)", "Kommissionierer (m/w/d)", "Staplerfahrer (m/w/d)", "Versand & Verpackung", "Projektleitung Logistik"],
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
    usps: [
      ["Geprüfte Fachkräfteauswahl", "Gezielte Vorauswahl passend zu Ihren Anforderungen."],
      ["Strukturierte Gespräche", "Klare, vergleichbare Vorstellungsgespräche statt Bauchgefühl."],
      ["Qualitätssicherung", "Laufende Begleitung und Feedback während des Einsatzes."],
    ],
    panelTitel: "Typische Positionen",
    panel: ["Produktionshelfer (m/w/d)", "Maschinen- & Anlagenführer", "Fachkräfte Metall / Elektro", "Qualitätsprüfer (m/w/d)", "Schichtleitung"],
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
    text: "Flixmonteure unterstützt Handwerksbetriebe, Generalunternehmer und Industriekunden mit einsatzbereiten Fachkräften — inklusive Werkzeug, Anreise, Unterkunft und Organisation. Stellen Sie sich Ihren Monteur im Konfigurator selbst zusammen.",
    usps: [
      ["Europäische Fachkräfte", "Erfahrene Monteure für Elektro, SHK und Versorgungstechnik."],
      ["Mobil & ausgestattet", "Eigenes Auto und eigenes Werkzeug — sofort einsatzfähig."],
      ["Bundesweit", "Einsatz vor Ort, egal wo in Deutschland — auch mehrtägig."],
    ],
    panelTitel: "Fachgebiete",
    panel: ["Sanitär, Heizung & Klima (SHK)", "Elektro", "Lüftung", "Technische Gebäudeausrüstung (TGA)"],
    cta: { label: "Monteur konfigurieren", href: "#konfigurator" },
  },
};

// Reihenfolge für Teaser/Navigation
export const bereicheListe = [bereiche.logistik, bereiche.industrie, bereiche.handwerk];
