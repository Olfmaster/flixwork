// Case Studies aus der Kundenmail "Großkunden Lösungen Logistik / E-Commerce /
// OnSite". Bewusst datengetrieben (analog lib/bereiche.js) und einem einheit-
// lichen Schema folgend, damit eine einzige <CaseStudy>-Komponente alle drei
// Fälle rendern kann.
//
// Zuordnung nach Bereich (Design-Review: keine Vermischung):
//   peakLogistik  → /logistik
//   produktion    → /industrie
//   masterVendor  → Startseite (standortübergreifende Großkunden-Lösung)
//
// Schema pro Case Study:
//   eyebrow            kurze Einordnung ("Case Study · Logistik")
//   titel              Überschrift
//   branche            optional (nur wenn angegeben)
//   ausgangssituation  Fließtext
//   herausforderungen  string[]  (Aufzählung)
//   loesungIntro       optional Einleitungssatz zur Lösung
//   loesung            Gruppen [{ titel?, punkte: string[] }]
//   ergebnisse         Gruppen [{ titel?, punkte: string[] }] (als Häkchen)
//   kundenmehrwert     Fließtext (Abschluss-Callout)

export const caseStudies = {
  peakLogistik: {
    eyebrow: "Case Study · Logistik",
    titel: "Peak-Management für einen führenden Logistikstandort",
    ausgangssituation:
      "Ein internationaler Logistikdienstleister musste saisonale Auftragsspitzen mit kurzfristig erhöhtem Personalbedarf bewältigen.",
    herausforderungen: [
      "Schwankende Bedarfe",
      "Kurzfristige Peaks",
      "Hohe Fluktuation",
      "Schichtbetrieb",
      "Hohe Anforderungen an Lieferqualität und Besetzungsquote",
    ],
    loesungIntro:
      "Flixwork entwickelte ein flexibles Personal- und Recruitingkonzept mit:",
    loesung: [
      {
        punkte: [
          "Zentraler Disposition",
          "Eigenem Recruiting-Team",
          "Mehrsprachiger Betreuung",
          "Vorqualifizierten Personalpools",
          "Regelmäßiger OnSite-Betreuung",
        ],
      },
    ],
    ergebnisse: [
      {
        titel: "Höhere Besetzungssicherheit",
        punkte: [
          "Schnelle Reaktionszeiten",
          "Aufbau zusätzlicher Kapazitäten in Peak-Phasen",
          "Reduzierung von Vakanzen",
        ],
      },
      {
        titel: "Verbesserte Stabilität",
        punkte: [
          "Geringere Fluktuation",
          "Höhere Mitarbeiterbindung",
          "Strukturierte Einsatzplanung",
        ],
      },
      {
        titel: "Mehr Transparenz",
        punkte: [
          "Regelmäßige Abstimmungen",
          "KPI-basierte Steuerung",
          "Klare Eskalationswege",
        ],
      },
    ],
    kundenmehrwert:
      "Durch die Kombination aus Recruiting, operativer Betreuung und flexibler Personalsteuerung konnte die Lieferfähigkeit auch in Hochlastphasen sichergestellt werden.",
  },

  produktion: {
    eyebrow: "Case Study · Industrie",
    titel: "Personallösung für die industrielle Produktion",
    branche: "Kunststoff-, Metall- und Elektroindustrie",
    ausgangssituation:
      "Ein Produktionsunternehmen suchte einen Personaldienstleister zur langfristigen Unterstützung im Mehrschichtbetrieb.",
    herausforderungen: [
      "Zuverlässige Mitarbeiter",
      "Hohe Qualitätsstandards",
      "Produktionssicherheit",
      "Geringe Einarbeitungszeiten",
      "Schnelle Ersatzgestellung",
    ],
    loesung: [
      {
        titel: "Strukturierte Personalauswahl",
        punkte: [
          "Vorauswahl nach Qualifikation",
          "Sicherheitsunterweisungen",
          "Schichttauglichkeitsprüfung",
        ],
      },
      {
        titel: "Operative Betreuung",
        punkte: [
          "Persönliche Ansprechpartner",
          "Laufende Mitarbeitergespräche",
          "Regelmäßige Qualitätskontrollen",
        ],
      },
      {
        titel: "Flexible Personalsteuerung",
        punkte: [
          "Schnelle Nachbesetzungen",
          "Anpassung an Produktionsschwankungen",
          "Unterstützung bei Sonderprojekten",
        ],
      },
    ],
    // Abschnitt "Ergebnisse" bewusst entfernt (Website-Review 03.07.2026) — zu
    // generisch, Kunden haben eigene Gründe für die Zusammenarbeit.
    kundenmehrwert:
      "Nicht nur Personalbereitstellung, sondern aktive Unterstützung bei der Sicherung von Produktionsprozessen.",
  },

  // Handwerk / Flixmonteure — 3 Case Studies (Mail 03.07.2026). Bau-Begriffe
  // rechtssicher umformuliert (Wohnungsbau/Neubau → Wohnprojekt/Projekt,
  // Rohrleitungsbau → Rohrleitungsmontage, Baustellenorganisation →
  // Projektorganisation, Bauablauf/Bauabschnitte → Projektablauf/-abschnitte).
  wohnprojektShk: {
    eyebrow: "Case Study · Handwerk",
    tab: "Wohnprojekt SHK",
    titel: "SHK-Fachkräfte für ein Wohnprojekt mit 120 Einheiten",
    kunde: "Mittelständischer SHK-Fachbetrieb",
    ausgangssituation:
      "Für ein Projekt mit 120 Wohneinheiten wurden kurzfristig zusätzliche Anlagenmechaniker SHK benötigt. Der Arbeitsmarkt gab keine kurzfristige Lösung her und der Projektstart stand unmittelbar bevor.",
    loesungIntro:
      "Flixmonteure stellte innerhalb weniger Tage ein Team aus qualifizierten SHK-Monteuren bereit. Neben der Personalgestellung wurden Unterkunft, Anreise, Arbeitskleidung und Einsatzkoordination übernommen.",
    ergebnisse: [
      {
        punkte: [
          "Projektstart ohne Verzögerung",
          "100 % Besetzung der angefragten Stellen",
          "Einhaltung aller Meilensteine",
          "Keine Vertragsstrafen",
          "Zusätzliche Aufträge konnten parallel angenommen werden",
        ],
      },
    ],
    kundenmehrwert:
      "Mehr Umsatz, höhere Planungssicherheit und keine Belastung der eigenen Recruiting-Ressourcen.",
  },

  industrieRohrleitung: {
    eyebrow: "Case Study · Handwerk",
    tab: "Industrie · Rohrleitung",
    titel: "Anlagen- und Rohrleitungsmontage in der Industrie",
    kunde: "Industrieunternehmen aus der Lebensmittel- und Produktionsbranche",
    ausgangssituation:
      "Im Rahmen einer Produktionserweiterung mussten neue Versorgungsleitungen, Rohrsysteme und technische Anlagen innerhalb eines engen Zeitfensters installiert werden. Eigene Kapazitäten waren bereits vollständig ausgelastet.",
    loesungIntro:
      "Flixmonteure unterstützte mit erfahrenen Monteuren für Rohrleitungsmontage, Anlagenmontage und technische Installation. Die Fachkräfte wurden projektbezogen eingesetzt und in die bestehende Projektorganisation integriert.",
    ergebnisse: [
      {
        punkte: [
          "Fristgerechte Inbetriebnahme der Anlage",
          "Keine Produktionsverzögerungen",
          "Flexible Anpassung der Teamgröße während des Projekts",
          "Entlastung der Stammbelegschaft",
        ],
      },
    ],
    kundenmehrwert:
      "Der Kunde konnte das Projekt ohne zusätzlichen Personalaufbau realisieren und seine Investitionsplanung einhalten.",
  },

  tgaSanierung: {
    eyebrow: "Case Study · Handwerk",
    tab: "TGA-Sanierung",
    titel: "TGA-Sanierung — Krankenhaus und öffentliche Gebäude",
    kunde: "Generalunternehmer für technische Gebäudeausrüstung",
    ausgangssituation:
      "Für die Modernisierung eines Krankenhauskomplexes mussten mehrere Gewerke parallel koordiniert werden. Durch den Fachkräftemangel drohten Verzögerungen im Projektablauf.",
    loesungIntro:
      "Flixmonteure stellte qualifizierte SHK- und Elektromonteure für die technische Gebäudeausrüstung bereit. Durch die bundesweite Rekrutierung konnten die benötigten Kapazitäten kurzfristig bereitgestellt werden.",
    ergebnisse: [
      {
        punkte: [
          "Unterstützung mehrerer Projektabschnitte gleichzeitig",
          "Keine Verzögerungen im Terminplan",
          "Hohe Ausführungsqualität",
          "Reduzierter Koordinationsaufwand für den Auftraggeber",
        ],
      },
    ],
    kundenmehrwert:
      "Der Generalunternehmer erhielt die notwendige Flexibilität, um Projektfristen einzuhalten und die Kundenzufriedenheit sicherzustellen.",
  },

  masterVendor: {
    eyebrow: "Case Study · Großkunden-Lösung",
    titel: "Master-Vendor-Lösung für mehrere Standorte",
    ausgangssituation:
      "Ein Unternehmen mit mehreren Logistik- und Produktionsstandorten wollte die Zusammenarbeit mit Personaldienstleistern vereinheitlichen.",
    herausforderungen: [
      "Unterschiedliche Lieferanten",
      "Uneinheitliche Prozesse",
      "Fehlende Transparenz",
      "Hoher Koordinationsaufwand",
    ],
    loesungIntro:
      "Flixwork übernahm im Master-Vendor-Modell die zentrale Steuerung.",
    loesung: [
      {
        titel: "Zentrale Steuerung",
        punkte: [
          "Ein Ansprechpartner",
          "Einheitliche KPI-Struktur",
          "Steuerung von Co-Lieferanten",
          "Zentrale Berichterstattung",
          "Eskalationsmanagement",
        ],
      },
      {
        titel: "Standortübergreifende Steuerung",
        punkte: [
          "Gemeinsame Recruitingstrategie",
          "Flexible Personalverschiebung",
          "Transparente Kennzahlen",
          "Einheitliche Qualitätsstandards",
        ],
      },
    ],
    ergebnisse: [
      {
        punkte: [
          "Weniger administrativer Aufwand",
          "Höhere Transparenz",
          "Verbesserte Lieferqualität",
          "Schnellere Entscheidungswege",
          "Höhere Versorgungssicherheit",
        ],
      },
    ],
    kundenmehrwert:
      "Durch die zentrale Steuerung konnten Prozesse standardisiert, Risiken reduziert und Personalressourcen effizienter eingesetzt werden.",
  },
};
