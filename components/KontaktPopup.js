"use client";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendAnfrage } from "@/lib/anfrage-action";

// Allgemeines Kontaktformular als Pop-out neben dem Konfigurator
// (Website-Review 17.07.2026). Zweiter Anfrageweg für Interessenten, die keine
// Preisschätzung konfigurieren wollen. Beide Buttons melden ein
// Conversion-Event an Google Analytics, damit sich auswerten lässt, welcher
// Weg besser konvertiert.
const initial = { status: "idle", message: "" };
const kf =
  "w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none";

export function track(event) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, { event_category: "handwerk_anfrage" });
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-sky px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-soft disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Anfrage senden"}
    </button>
  );
}

export default function KontaktPopup({ children, className = "" }) {
  const [open, setOpen] = useState(false);
  const [nachricht, setNachricht] = useState("");
  const [state, formAction] = useActionState(sendAnfrage, initial);

  // Escape schließt, Body scrollt nicht mit
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const oeffnen = () => {
    track("kontakt_popup_geoeffnet");
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={oeffnen} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-deep/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Kontaktformular"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-navy">Kontakt aufnehmen</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
                  Lieber ohne Konfigurator? Schildern Sie uns kurz Ihren Bedarf —
                  wir melden uns persönlich und unverbindlich.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Schließen"
                className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-navy/40 transition-colors hover:bg-mist hover:text-navy"
              >
                ×
              </button>
            </div>

            <form action={formAction} className="mt-6 space-y-4">
              <input type="hidden" name="typ" value="fragebogen" />
              <input
                type="hidden"
                name="details"
                value={["Bereich: Handwerk (Kontakt-Pop-out)", "", "Nachricht:", nachricht || "—"].join("\n")}
              />
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
                placeholder="Ihre Nachricht — z. B. Gewerk, Einsatzort, Zeitraum und Anzahl der Monteure"
                className="w-full resize-none rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:border-sky focus:outline-none"
              />

              {state.status === "error" && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
              )}
              {state.status === "success" && (
                <p role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{state.message}</p>
              )}

              <SubmitButton />
              <p className="text-center text-xs text-navy/45">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
                Bearbeitung der Anfrage zu.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
