// Referenz- und Markendaten, geteilt von der ausführlichen Referenzen-Sektion
// und dem schmalen Logo-Band unter dem Hero.
//
// Jede Referenz ist einem Bereich zugeordnet (gruppe). Über die optionale
// `gruppe`-Prop filtern die Unterseiten auf ihren Bereich (Design-Review: keine
// Vermischung); ohne Prop (Startseite) erscheinen alle als gemeinsame Logo-Wand.
export const kunden = [
  { name: "ID Logistics", file: "id-logistics.png", url: "https://www.id-logistics.com/", gruppe: "logistik", bereich: "E-Commerce Logistik", text: "Internationale Kontraktlogistik und E-Commerce-Lösungen" },
  { name: "Radial Europe", file: "radial.png", url: "https://www.radial.com/eur", gruppe: "logistik", bereich: "E-Commerce Logistik", text: "E-Commerce Fulfillment" },
  { name: "W&L Jordan (JOKA)", file: "joka.png", url: "https://www.joka.de/", gruppe: "logistik", bereich: "Zentrallager Logistik", text: "Bodenbeläge und Innenausstattung" },
  { name: "Geis Gruppe", file: "geis.png", url: "https://geis-group.eu/", gruppe: "logistik", bereich: "Fulfillment Logistik", text: "Logistik und Supply Chain" },
  { name: "DHL Group", file: "dhl.png", url: "https://group.dhl.com/", gruppe: "logistik", bereich: "Fulfillment Logistik", text: "Internationale Logistik" },
  { name: "Rudolph Logistik Gruppe", file: "rudolph.png", url: "https://www.rudolph-log.com/", gruppe: "logistik", bereich: "Automotive Logistik", text: "Automotive- und Industrielogistik mit rund 5.200 Mitarbeitenden an 45 Standorten" },
  { name: "Vinylit Fassadensysteme", file: "vinylit.png", url: "https://www.vinylit.de/", gruppe: "industrie", bereich: "Kunststoffindustrie", text: "Individuelle Fassaden- und Dachsysteme, Made in Germany" },
  { name: "Wetekam Group", file: "wetekam.png", url: "https://wetekamgroup.com/", gruppe: "industrie", bereich: "Kunststoffindustrie", text: "Technische Monofile und Kunststofflösungen" },
  { name: "AKG Group", file: "akg.png", url: "https://www.akg-group.com/", gruppe: "industrie", bereich: "Metall- & Elektroindustrie", text: "Führende Wärmetauschertechnologie" },
  { name: "Jäkel", file: "jaekel.png", url: "https://www.jaekel.eu/", gruppe: "industrie", bereich: "Metall- & Elektroindustrie", text: "Maschinenmesserfabrik — Quality made in Germany since 1928" },
  // Handwerk / Flixmonteure
  { name: "Kohl Wasser Wärme", file: "kohl.png", url: "https://www.kohl-online.de/", gruppe: "handwerk", bereich: "SHK & Wärmetechnik", text: "Wasser- und Wärmetechnik" },
  { name: "Dräger", file: "draeger.png", url: "https://www.draeger.com/de_de/Home", gruppe: "handwerk", bereich: "Medizin- & Sicherheitstechnik", text: "Technik für das Leben — Medizin- und Sicherheitstechnik" },
  { name: "Germania Wärmesysteme", file: null, url: "https://waermesystem.com/waermepumpen-technik/", gruppe: "handwerk", bereich: "Wärmepumpen-Technik", text: "Wärmepumpen und moderne Wärmesysteme" },
  { name: "Schulz Sanitärtechnik", file: "schulz.png", url: "https://www.schulz-sanitaertechnik.de/", gruppe: "handwerk", bereich: "Sanitärtechnik", text: "Sanitär-, Heizungs- und Klimatechnik" },
  // Schwier Kältetechnik entfernt (Website-Review 17.07.2026): Kunde hat die
  // Freigabe zur Logo-Nutzung ausdrücklich verweigert. Nicht wieder aufnehmen.
];

// Marken, mit denen Flixmonteure die Einsätze ausstattet: Werkzeug, Fahrzeuge
// und Arbeitskleidung (Quelle: flixmonteure.com). Stehen im Logo-Band der
// Handwerk-Seite bewusst ganz vorne (Kundenwunsch 22.07.2026) — sie sind das
// stärkste Vertrauenssignal für die Komplettausstattung.
export const marken = [
  { name: "Mercedes-Benz", file: "mercedes.png", kategorie: "Fahrzeuge" },
  { name: "Volkswagen", file: "vw.png", kategorie: "Fahrzeuge" },
  { name: "Hilti", file: "hilti.png", kategorie: "Markenwerkzeug" },
  { name: "Würth", file: "wuerth.png", kategorie: "Markenwerkzeug" },
  { name: "Engelbert Strauss", file: "engelberg-strauss.png", kategorie: "Arbeitskleidung & PSA" },
];
