"use client";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendAnfrage } from "@/lib/anfrage-action";

// Qualifizierender Fragenkatalog für Logistik & Industrie (keine Preise — laut
// Briefing zu viele Variablen). Die Antworten werden zu einer Anfrage gebündelt.
const FRAGEN = [
  { id: "bereich", label: "Bereich", type: "radio", options: ["Logistik", "Industrie"] },
  { id: "anzahl", label: "Anzahl benötigter Mitarbeiter", type: "select", options: ["1–5", "6–20", "21–50", "50+"] },
  { id: "position", label: "Gesuchte Position / Qualifikation", type: "text", placeholder: "z. B. Kommissionierer, Maschinenführer" },
  { id: "ort", label: "Einsatzort (PLZ / Stadt)", type: "text", placeholder: "z. B. 34117 Kassel" },
  { id: "start", label: "Gewünschter Start", type: "select", options: ["So schnell wie möglich", "Innerhalb 2 Wochen", "Innerhalb 1 Monat", "Flexibel"] },
  { id: "dauer", label: "Einsatzdauer", type: "select", options: ["Kurzfristig", "Mehrere Wochen", "Mehrere Monate", "Dauerhaft / Übernahme"] },
  { id: "modell", label: "Arbeitszeitmodell", type: "select", options: ["Vollzeit", "Teilzeit", "Schichtbetrieb", "Wochenende"] },
  { id: "schicht", label: "Schichtbereitschaft nötig?", type: "select", options: ["Ja", "Nein", "Egal"] },
  { id: "uebernahme", label: "Spätere Übernahme geplant?", type: "select", options: ["Ja, geplant", "Eventuell", "Nein"] },
  { id: "qualifikationen", label: "Besondere Anforderungen", type: "text", placeholder: "z. B. Staplerschein, Kranschein, EDV" },
  { id: "sprache", label: "Erforderliche Sprachkenntnisse", type: "text", placeholder: "z. B. Deutsch B1, Englisch" },
  { id: "nachricht", label: "Weitere Infos (optional)", type: "textarea", placeholder: "Was sollten wir noch wissen?" },
];

const defaults = FRAGEN.reduce((acc, f) => {
  acc[f.id] = f.type === "radio" || f.type === "select" ? f.options[0] : "";
  return acc;
}, {});

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
  const [answers, setAnswers] = useState(defaults);
  const [state, formAction] = useActionState(sendAnfrage, initial);

  const set = (id, val) => setAnswers((a) => ({ ...a, [id]: val }));
  const details = useMemo(
    () => FRAGEN.map((f) => `${f.label}: ${answers[f.id] || "—"}`).join("\n"),
    [answers]
  );

  return (
    <section id="anfrage" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Logistik & Industrie</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Personalanfrage in unter 2 Minuten.
          </h2>
          <p className="mt-4 text-navy/60">
            Ein paar gezielte Fragen — dann erstellen wir Ihnen ein passgenaues,
            unverbindliches Angebot. Kein langes Formular, keine Warteschleife.
          </p>
        </div>

        <form action={formAction} className="mt-12 rounded-3xl border border-navy/10 bg-mist p-6 md:p-9">
          <input type="hidden" name="typ" value="fragebogen" />
          <input type="hidden" name="details" value={details} />

          <div className="grid gap-6 sm:grid-cols-2">
            {FRAGEN.map((f) => (
              <div key={f.id} className={f.type === "textarea" || f.type === "radio" ? "sm:col-span-2" : ""}>
                <label className="mb-2 block text-sm font-semibold text-navy/70">{f.label}</label>

                {f.type === "radio" && (
                  <div className="flex gap-2">
                    {f.options.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => set(f.id, o)}
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                          answers[f.id] === o
                            ? "border-sky bg-sky text-white"
                            : "border-navy/15 bg-white text-navy/80 hover:border-navy/40"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
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
                    className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none"
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

          <div className="mt-8 border-t border-navy/10 pt-7">
            <p className="mb-4 text-sm font-semibold text-navy/70">Ihre Kontaktdaten</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="kontaktFirma" required placeholder="Firma *" className={kf} />
              <input name="kontaktName" required placeholder="Ansprechpartner *" className={kf} />
              <input name="kontaktEmail" type="email" required placeholder="E-Mail *" className={kf} />
              <input name="kontaktTelefon" type="tel" placeholder="Telefon (optional)" className={kf} />
            </div>
          </div>

          {state.status === "error" && (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
          )}
          {state.status === "success" && (
            <p role="status" className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{state.message}</p>
          )}

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-navy/45">Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung der Anfrage zu.</p>
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}
