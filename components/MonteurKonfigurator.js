"use client";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendAnfrage } from "@/lib/anfrage-action";

// Preislogik mit den echten Flixwork-Sätzen (aktualisierte Kalkulation von
// Andre, 07/2026): Grundpreis 37,00 €/h, Spezialkenntnisse 41,00 €/h.
// Mindestlaufzeit 1 Monat, Laufzeitrabatt ab 6 Monaten -1 %, ab 12 Monaten -3 %.
// Add-ons: Montage-Paket (An-/Abreise, Unterkunft, Verpflegungspauschale &
// Firmenwagen, nur zusammen buchbar) 10,00 €, Werkzeug Basic 2,00 €,
// Übernachtungszuschlag in Top-Städten (München, Hamburg, Frankfurt, Köln,
// Düsseldorf) +2,00 €. Mindestabnahme 2 Monteure.
const TARIFE = [
  { id: "standard", label: "Standard-Monteur", basis: 37 },
  { id: "spezial", label: "Mit Spezialkenntnissen", basis: 41 },
];
const FACHGEBIETE = [
  { id: "elektro", label: "Elektro" },
  { id: "shk", label: "Sanitär, Heizung & Klima" },
  { id: "versorgung", label: "Versorgungstechnik" },
];
const DAUER = [
  { id: "1monat", label: "1 Monat", rabatt: 0 },
  { id: "6monate", label: "6 Monate", rabatt: 0.01 },
  { id: "12monate", label: "12 Monate", rabatt: 0.03 },
];
const OPTIONEN = [
  { id: "montagepaket", label: "Montage-Paket", auf: 10 },
  { id: "werkzeug", label: "Werkzeug (Basic)", auf: 2 },
  { id: "topstaedte", label: "Übernachtungszuschlag Top-Städte", auf: 2 },
];
const MIN_MONTEURE = 2;

const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const initial = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-sky px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-soft disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Unverbindliches Angebot anfordern"}
    </button>
  );
}

export default function MonteurKonfigurator() {
  const [tarif, setTarif] = useState("standard");
  const [fach, setFach] = useState("elektro");
  const [dauer, setDauer] = useState("1monat");
  const [anzahl, setAnzahl] = useState(MIN_MONTEURE);
  const [opts, setOpts] = useState({ montagepaket: true, werkzeug: true, topstaedte: false });
  const [state, formAction] = useActionState(sendAnfrage, initial);

  const toggle = (id) => setOpts((o) => ({ ...o, [id]: !o[id] }));

  const { rate, tagessatz, details } = useMemo(() => {
    const t = TARIFE.find((x) => x.id === tarif);
    const f = FACHGEBIETE.find((x) => x.id === fach);
    const d = DAUER.find((x) => x.id === dauer);
    const optAuf = OPTIONEN.filter((o) => opts[o.id]).reduce((s, o) => s + o.auf, 0);
    const r = (t.basis + optAuf) * (1 - d.rabatt);
    const tag = r * 8 * anzahl;
    const gewaehlteOpts = OPTIONEN.filter((o) => opts[o.id]).map((o) => o.label);
    const det = [
      `Tarif: ${t.label} (${eur.format(t.basis)}/Std.)`,
      `Fachgebiet: ${f.label}`,
      `Einsatzdauer: ${d.label}${d.rabatt ? ` (${(d.rabatt * 100).toFixed(0)} % Laufzeitrabatt)` : ""}`,
      `Anzahl Monteure: ${anzahl}`,
      `Zusatzoptionen: ${gewaehlteOpts.length ? gewaehlteOpts.join(", ") : "keine"}`,
      `Geschätzter Stundensatz: ${eur.format(r)} (unverbindlich, zzgl. MwSt.)`,
      `Geschätzter Tagessatz (8 Std. × ${anzahl}): ${eur.format(tag)}`,
    ].join("\n");
    return { rate: r, tagessatz: tag, details: det };
  }, [tarif, fach, dauer, anzahl, opts]);

  return (
    <section id="konfigurator" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Handwerk · Konfigurator</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Stellen Sie sich Ihren Monteur zusammen.
          </h2>
          <p className="mt-4 text-navy/60">
            In zwei Minuten zur Schätzung: Tarif und Fachgebiet wählen, Optionen
            setzen — und direkt eine unverbindliche Angebotsanfrage senden.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Konfiguration */}
          <div className="rounded-3xl border border-navy/10 bg-white p-6 md:p-8">
            <Block label="1 · Tarif">
              <div className="flex flex-wrap gap-2">
                {TARIFE.map((t) => (
                  <Chip key={t.id} active={tarif === t.id} onClick={() => setTarif(t.id)}>
                    {t.label} · {eur.format(t.basis)}
                  </Chip>
                ))}
              </div>
            </Block>

            <Block label="2 · Fachgebiet">
              <div className="flex flex-wrap gap-2">
                {FACHGEBIETE.map((f) => (
                  <Chip key={f.id} active={fach === f.id} onClick={() => setFach(f.id)}>
                    {f.label}
                  </Chip>
                ))}
              </div>
            </Block>

            <Block label="3 · Einsatzdauer">
              <div className="flex flex-wrap gap-2">
                {DAUER.map((d) => (
                  <Chip key={d.id} active={dauer === d.id} onClick={() => setDauer(d.id)}>
                    {d.label}
                    {d.rabatt > 0 ? ` · -${(d.rabatt * 100).toFixed(0)} %` : ""}
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-xs text-navy/45">Mindestlaufzeit 1 Monat.</p>
            </Block>

            <Block label="4 · Anzahl Monteure">
              <div className="inline-flex items-center gap-4 rounded-full border border-navy/15 px-2 py-1.5">
                <Stepper aria-label="weniger" onClick={() => setAnzahl((n) => Math.max(MIN_MONTEURE, n - 1))}>−</Stepper>
                <span className="w-8 text-center text-lg font-bold text-navy">{anzahl}</span>
                <Stepper aria-label="mehr" onClick={() => setAnzahl((n) => Math.min(50, n + 1))}>+</Stepper>
              </div>
              <p className="mt-3 text-xs text-navy/45">Mindestabnahme: {MIN_MONTEURE} Monteure.</p>
            </Block>

            <Block label="5 · Zusatzoptionen">
              <div className="flex flex-wrap gap-2">
                {OPTIONEN.map((o) => (
                  <Chip key={o.id} active={opts[o.id]} onClick={() => toggle(o.id)}>
                    {opts[o.id] ? "✓ " : ""}
                    {o.label} · +{eur.format(o.auf)}
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-xs text-navy/45">
                Montage-Paket = An-/Abreise, Unterkunft, Verpflegungspauschale &amp; Firmenwagen (nur zusammen buchbar).
                Übernachtungszuschlag gilt für München, Hamburg, Frankfurt, Köln und Düsseldorf.
              </p>
            </Block>
          </div>

          {/* Zusammenfassung + Kontakt */}
          <div className="rounded-3xl bg-navy p-6 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Ihre Schätzung</p>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold">{eur.format(rate)}</span>
              <span className="pb-1 text-sm text-white/60">/ Stunde*</span>
            </div>
            <p className="mt-2 text-sm text-white/70">
              ≈ {eur.format(tagessatz)} pro Tag <span className="text-white/40">(8 Std. × {anzahl})</span>
            </p>
            <p className="mt-2 text-xs text-white/40">
              *Unverbindliche Schätzung, zzgl. MwSt. Mindestlaufzeit 1 Monat, Mindestabnahme {MIN_MONTEURE} Monteure. Das finale Angebot stellen wir individuell.
            </p>

            <form action={formAction} className="mt-6 space-y-3">
              <input type="hidden" name="typ" value="konfigurator" />
              <input type="hidden" name="details" value={details} />
              <Field name="kontaktFirma" placeholder="Firma *" required />
              <Field name="kontaktName" placeholder="Ihr Name *" required />
              <Field name="kontaktEmail" type="email" placeholder="E-Mail *" required />
              <Field name="kontaktTelefon" type="tel" placeholder="Telefon (optional)" />

              {state.status === "error" && (
                <p role="alert" className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200">{state.message}</p>
              )}
              {state.status === "success" && (
                <p role="status" className="rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">{state.message}</p>
              )}

              <SubmitButton />
              <p className="text-center text-xs text-white/40">Anfrage geht an Herrn Wolf · keine Verpflichtung</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ label, children }) {
  return (
    <div className="border-b border-navy/5 py-5 first:pt-0 last:border-0 last:pb-0">
      <p className="mb-3 text-sm font-semibold text-navy/50">{label}</p>
      {children}
    </div>
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

function Stepper({ children, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mist text-xl font-bold text-navy transition-colors hover:bg-cloud"
    >
      {children}
    </button>
  );
}

function Field({ ...rest }) {
  return (
    <input
      {...rest}
      className="w-full rounded-lg border border-transparent bg-white px-4 py-3 text-sm text-navy placeholder-navy/40 focus:border-sky focus:outline-none"
    />
  );
}
