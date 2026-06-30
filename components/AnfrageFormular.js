"use client";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendAnfrage } from "@/lib/anfrage-action";

// Schlankes, allgemeines Anfrageformular für die Startseite. Bewusst kurz
// (Name, Firma, Kontakt, kurze Nachricht) — der ausführliche, branchen-
// spezifische Fragebogen lebt auf den Unterseiten /logistik und /industrie.
const BEREICHE = ["Logistik", "Industrie", "Handwerk", "Noch unklar / Sonstiges"];

const initial = { status: "idle", message: "" };
const kf =
  "w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-sky px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-soft disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Wird gesendet …" : "Anfrage senden"}
    </button>
  );
}

export default function AnfrageFormular() {
  const [bereich, setBereich] = useState(BEREICHE[0]);
  const [nachricht, setNachricht] = useState("");
  const [state, formAction] = useActionState(sendAnfrage, initial);

  const details = useMemo(
    () => [`Bereich: ${bereich}`, "", "Nachricht:", nachricht || "—"].join("\n"),
    [bereich, nachricht]
  );

  return (
    <section id="anfrage" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Anfrage</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Personal anfragen
          </h2>
          <p className="mt-4 text-navy/60">
            Schildern Sie uns kurz Ihren Bedarf — wir melden uns persönlich und
            unverbindlich. Für ein detailliertes Angebot nutzen Sie den Fragebogen
            auf der jeweiligen Bereichsseite.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-navy/10 bg-mist p-6 md:p-9">
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="typ" value="fragebogen" />
            <input type="hidden" name="details" value={details} />

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy/70">Bereich</label>
              <div className="flex flex-wrap gap-2">
                {BEREICHE.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBereich(b)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      bereich === b
                        ? "border-sky bg-sky text-white"
                        : "border-navy/15 bg-white text-navy/80 hover:border-navy/40"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input name="kontaktFirma" required placeholder="Firma *" className={kf} />
              <input name="kontaktName" required placeholder="Ansprechpartner *" className={kf} />
              <input name="kontaktEmail" type="email" required placeholder="E-Mail *" className={kf} />
              <input name="kontaktTelefon" type="tel" placeholder="Telefon (optional)" className={kf} />
            </div>

            <textarea
              value={nachricht}
              onChange={(e) => setNachricht(e.target.value)}
              rows={4}
              placeholder="Ihre Nachricht — z. B. gesuchte Position, Einsatzort, Zeitraum und Anzahl"
              className="w-full resize-none rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none"
            />

            {state.status === "error" && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
            )}
            {state.status === "success" && (
              <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{state.message}</p>
            )}

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between">
              <p className="text-xs text-navy/45">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
                Bearbeitung der Anfrage zu.
              </p>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
