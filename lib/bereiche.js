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
      ["Maximale Flexibilität", "Von einzelnen Kräften bis zu 100+ Mitarbeitenden — skalierbar nach Bedarf."],
      ["Schnelligkeit", "Kurzfristige Bereitstellung, auch bei plötzlichem Mehrbedarf."],
      ["Projektmanagement", "Strukturierte Steuerung und On-Site-Begleitung Ihres Einsatzes."],
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
    eyebrow: "Schwerpunkt Handwerk · Elektro & Sanitär",
    teaser:
      "Europäische Monteure für Elektro & Sanitär — mobil, mit eigenem Auto und Werkzeug, bundesweit einsatzbereit.",
    titel: "Monteure, die morgen bei Ihnen vor Ort starten.",
    text: "Gegen den Fachkräftemangel: erfahrene europäische Monteure, die bundesweit operieren können — mit eigenem Auto und eigenem Werkzeug. Stellen Sie sich Ihren Monteur im Konfigurator selbst zusammen.",
    usps: [
      ["Europäische Fachkräfte", "Erfahrene Monteure für Elektro, SHK und Versorgungstechnik."],
      ["Mobil & ausgestattet", "Eigenes Auto und eigenes Werkzeug — sofort einsatzfähig."],
      ["Bundesweit", "Einsatz vor Ort, egal wo in Deutschland — auch mehrtägig."],
    ],
    panelTitel: "Fachgebiete",
    panel: ["Elektro", "Sanitär, Heizung & Klima", "Versorgungstechnik", "Mehrtägige Einsätze"],
    cta: { label: "Monteur konfigurieren", href: "#konfigurator" },
  },
};

// Reihenfolge für Teaser/Navigation
export const bereicheListe = [bereiche.logistik, bereiche.industrie, bereiche.handwerk];
