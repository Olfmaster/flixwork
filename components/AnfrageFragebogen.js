"use client";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendAnfrage } from "@/lib/anfrage-action";

// Mehrstufiger, branchenspezifischer Fragebogen für Logistik & Produktion.
// Abgeleitet aus den Neukunden-Datenblättern (Logistik / Warehouse und
// Produktion / Industrie), kundenfreundlich gekürzt: interne KPI-, Abrechnungs-
// und Compliance-Details bleiben dem persönlichen Gespräch vorbehalten. Alle
// Antworten werden zu einer Zusammenfassung (`details`) gebündelt und über die
// bestehende Server-Action verschickt — keine Preise (laut Briefing zu viele
// Variablen).

const BRANCHEN = [
  { id: "logistik", label: "Logistik / Warehouse" },
  { id: "produktion", label: "Produktion / Industrie" },
];

// Schritte des Assistenten. Felder mit `branchen` erscheinen nur für die
// gewählte Branche. type: text | select | radio | checks | textarea.
const STEPS = [
  {
    id: "stammdaten",
    title: "Stammdaten",
    intro: "Wo und in welcher Branche sollen wir Sie unterstützen?",
    fields: [
      { id: "einsatzort", label: "Einsatzort (PLZ / Stadt)", type: "text", placeholder: "z. B. 34117 Kassel" },
      { id: "branche", label: "Branche", type: "text", placeholder: "z. B. E-Commerce, Automotive, Metall, Lebensmittel" },
    ],
  },
  {
    id: "taetigkeiten",
    title: "Einsatzbereiche & Tätigkeiten",
    intro: "Wofür brauchen Sie Personal? Mehrfachauswahl möglich.",
    fields: [
      {
        id: "taetigkeiten_log", label: "Tätigkeiten", type: "checks", branchen: ["logistik"],
        options: ["Wareneingang", "Kommissionierung", "Verpackung", "Warenausgang / Verladung", "Retourenbearbeitung", "Staplerfahren", "Leitstand / Koordination"],
      },
      {
        id: "taetigkeiten_prod", label: "Tätigkeiten", type: "checks", branchen: ["produktion"],
        options: ["Produktion / Fertigung", "Maschinenbedienung", "Montage", "Verpackung", "Qualitätskontrolle", "Nacharbeit", "CNC / Maschinenführung", "Schweißen", "Instandhaltung"],
      },
      {
        id: "besonderheiten_log", label: "Besonderheiten", type: "checks", branchen: ["logistik"],
        options: ["Gefahrgut", "Kühlbereich", "Hochregallager", "Outdoor", "Schwere körperliche Arbeit"],
      },
      {
        id: "besonderheiten_prod", label: "Besonderheiten", type: "checks", branchen: ["produktion"],
        options: ["Akkordarbeit", "Fließbandarbeit", "Reinraum", "Lebensmittelproduktion", "Lärm / Hitze", "Schwere körperliche Arbeit"],
      },
    ],
  },
  {
    id: "qualifikationen",
    title: "Qualifikationen & Geräte",
    intro: "Welche Qualifikationen sollten die Mitarbeitenden mitbringen?",
    fields: [
      {
        id: "quali_log", label: "Staplerscheine / Geräte", type: "checks", branchen: ["logistik"],
        options: ["Frontstapler", "Schubmaststapler", "Hochregalstapler", "Schnellläufer / Ameise", "Seitenstapler", "Klammerstapler", "Vierwegestapler"],
      },
      {
        id: "zusatz_log", label: "Zusatzanforderungen", type: "checks", branchen: ["logistik"],
        options: ["Erfahrung Hochregal (> 8 m)", "Höhentauglichkeit G41", "Scanner-Erfahrung", "Ladungssicherung"],
      },
      {
        id: "quali_prod", label: "Qualifikationen", type: "checks", branchen: ["produktion"],
        options: ["Produktionshelfer", "Maschinenbediener", "Schlosser", "Industriemechaniker", "Elektriker", "Mechatroniker", "Staplerschein", "Kranschein"],
      },
      {
        id: "zusatz_prod", label: "Zusatzanforderungen", type: "checks", branchen: ["produktion"],
        options: ["Technisches Verständnis", "Zeichnungen lesen", "Qualitätsprüfung", "Erfahrung Serienfertigung", "CNC-Erfahrung"],
      },
    ],
  },
  {
    id: "arbeitszeit",
    title: "Arbeitszeitmodell",
    intro: "In welchem Modell wird gearbeitet?",
    fields: [
      { id: "schicht", label: "Schichtmodell", type: "checks", options: ["1-Schicht", "2-Schicht", "3-Schicht", "Kontischicht"] },
      { id: "arbeitszeit_zusatz", label: "Weitere Anforderungen", type: "checks", options: ["Wochenendarbeit", "Feiertagsarbeit", "Überstunden gewünscht", "Flexibilität bei Auftragsspitzen"] },
    ],
  },
  {
    id: "bedarf",
    title: "Bedarf & Start",
    intro: "Wie viele Kräfte, ab wann und wie lange?",
    fields: [
      { id: "anzahl", label: "Anzahl benötigter Mitarbeiter", type: "select", options: ["1–5", "6–20", "21–50", "50+"] },
      { id: "start", label: "Gewünschter Start", type: "select", options: ["So schnell wie möglich", "Innerhalb 2 Wochen", "Innerhalb 1 Monat", "Flexibel"] },
      { id: "dauer", label: "Einsatzdauer", type: "select", options: ["Kurzfristig", "Mehrere Wochen", "Mehrere Monate", "Dauerhaft / Übernahme"] },
      { id: "uebernahme", label: "Spätere Übernahme geplant?", type: "select", options: ["Ja, geplant", "Eventuell", "Nein"] },
      { id: "peaks", label: "Saisonale Peaks / Auftragsspitzen (optional)", type: "text", placeholder: "z. B. Q4, Sommermonate" },
    ],
  },
  {
    id: "mitarbeiter",
    title: "Der perfekte Mitarbeiter",
    intro: "Worauf legen Sie bei den Mitarbeitenden besonderen Wert?",
    fields: [
      { id: "deutsch", label: "Erforderliche Deutschkenntnisse", type: "radio", options: ["Grundkenntnisse", "Kommunikation", "Fließend"] },
      { id: "musskriterien", label: "Muss-Kriterien", type: "checks", options: ["Zuverlässig / pünktlich", "Körperlich belastbar", "Schichtbereit", "Teamfähig", "Technisches Verständnis"] },
      { id: "nachricht", label: "Weitere Infos (optional)", type: "textarea", placeholder: "Was sollten wir noch wissen?" },
    ],
  },
  {
    id: "kontakt",
    title: "Ihre Kontaktdaten",
    intro: "Zum Schluss: An wen dürfen wir das Angebot richten?",
    contact: true,
    fields: [],
  },
];

const visible = (field, bereich) => !field.branchen || field.branchen.includes(bereich);

function buildDefaults() {
  const acc = {};
  for (const step of STEPS) {
    for (const f of step.fields) {
      if (f.type === "checks") acc[f.id] = [];
      else if (f.type === "radio" || f.type === "select") acc[f.id] = f.options[0];
      else acc[f.id] = "";
    }
  }
  return acc;
}
const defaults = buildDefaults();

const initial = { status: "idle", message: "" };
const kf =
  "w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-sky px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-soft disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Personalanfrage senden"}
    </button>
  );
}

export default function AnfrageFragebogen() {
  const [bereich, setBereich] = useState("logistik");
  const [answers, setAnswers] = useState(defaults);
  const [step, setStep] = useState(0);
  const [state, formAction] = useActionState(sendAnfrage, initial);

  const set = (id, val) => setAnswers((a) => ({ ...a, [id]: val }));
  const toggleCheck = (id, opt) =>
    setAnswers((a) => {
      const cur = a[id] || [];
      return { ...a, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });

  const branchLabel = BRANCHEN.find((b) => b.id === bereich).label;
  const total = STEPS.length;
  const isLast = step === total - 1;

  // Zusammenfassung für die Anfrage-Mail — nach Abschnitten gegliedert.
  const details = useMemo(() => {
    const lines = [`Bereich: ${branchLabel}`, ""];
    for (const s of STEPS) {
      const fields = s.fields.filter((f) => visible(f, bereich));
      if (!fields.length) continue;
      lines.push(`[${s.title}]`);
      for (const f of fields) {
        const val = answers[f.id];
        const str = Array.isArray(val) ? (val.length ? val.join(", ") : "—") : val || "—";
        lines.push(`${f.label}: ${str}`);
      }
      lines.push("");
    }
    return lines.join("\n").trim();
  }, [answers, bereich, branchLabel]);

  const current = STEPS[step];
  const currentFields = current.fields.filter((f) => visible(f, bereich));

  return (
    <section id="anfrage" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Logistik & Industrie</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Ihr Personalbedarf — Schritt für Schritt.
          </h2>
          <p className="mt-4 text-navy/60">
            Beantworten Sie ein paar gezielte Fragen aus unserem Neukunden-Datenblatt.
            Daraus erstellen wir Ihnen ein passgenaues, unverbindliches Angebot.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-navy/10 bg-mist p-6 md:p-9">
          {/* Branchen-Umschalter */}
          <div className="mx-auto mb-7 flex max-w-sm gap-2 rounded-full bg-white p-1.5">
            {BRANCHEN.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBereich(b.id)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  bereich === b.id ? "bg-sky text-white" : "text-navy/70 hover:text-navy"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Fortschritt */}
          <div className="mb-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-navy/50">
              <span>Schritt {step + 1} von {total}</span>
              <span>{current.title}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div
                className="h-full rounded-full bg-sky transition-all duration-300"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          <form action={formAction}>
            <input type="hidden" name="typ" value="fragebogen" />
            <input type="hidden" name="details" value={details} />

            <div className="min-h-[18rem]">
              <p className="text-sm text-navy/60">{current.intro}</p>

              {current.contact ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input name="kontaktFirma" required placeholder="Firma *" className={kf} />
                  <input name="kontaktName" required placeholder="Ansprechpartner *" className={kf} />
                  <input name="kontaktEmail" type="email" required placeholder="E-Mail *" className={kf} />
                  <input name="kontaktTelefon" type="tel" placeholder="Telefon (optional)" className={kf} />
                </div>
              ) : (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {currentFields.map((f) => (
                    <div key={f.id} className={f.type === "checks" || f.type === "textarea" || f.type === "radio" ? "sm:col-span-2" : ""}>
                      <label className="mb-2 block text-sm font-semibold text-navy/70">{f.label}</label>

                      {f.type === "radio" && (
                        <div className="flex flex-wrap gap-2">
                          {f.options.map((o) => (
                            <Chip key={o} active={answers[f.id] === o} onClick={() => set(f.id, o)}>
                              {o}
                            </Chip>
                          ))}
                        </div>
                      )}

                      {f.type === "checks" && (
                        <div className="flex flex-wrap gap-2">
                          {f.options.map((o) => {
                            const on = (answers[f.id] || []).includes(o);
                            return (
                              <Chip key={o} active={on} onClick={() => toggleCheck(f.id, o)}>
                                {on ? "✓ " : ""}
                                {o}
                              </Chip>
                            );
                          })}
                        </div>
                      )}

                      {f.type === "select" && (
                        <select
                          value={answers[f.id]}
                          onChange={(e) => set(f.id, e.target.value)}
                          className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-sky focus:outline-none"
                        >
                          {f.options.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      )}

                      {f.type === "text" && (
                        <input
                          value={answers[f.id]}
                          onChange={(e) => set(f.id, e.target.value)}
                          placeholder={f.placeholder}
                          className={kf}
                        />
                      )}

                      {f.type === "textarea" && (
                        <textarea
                          value={answers[f.id]}
                          onChange={(e) => set(f.id, e.target.value)}
                          placeholder={f.placeholder}
                          rows={3}
                          className="w-full resize-none rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {state.status === "error" && (
              <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
            )}
            {state.status === "success" && (
              <p role="status" className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{state.message}</p>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-navy/10 pt-7">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="rounded-full px-5 py-3 text-sm font-semibold text-navy/70 transition-colors hover:text-navy disabled:opacity-0"
              >
                ← Zurück
              </button>

              {isLast ? (
                <SubmitButton />
              ) : (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
                  className="rounded-full bg-sky px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-soft"
                >
                  Weiter →
                </button>
              )}
            </div>

            {isLast && (
              <p className="mt-4 text-center text-xs text-navy/45">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der Anfrage zu.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Chip({ active, children, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-sky bg-sky text-white"
          : "border-navy/15 bg-white text-navy/80 hover:border-navy/40"
      }`}
    >
      {children}
    </button>
  );
}
