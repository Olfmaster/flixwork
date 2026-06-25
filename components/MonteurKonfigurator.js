"use client";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendAnfrage } from "@/lib/anfrage-action";

// Preislogik mit den echten Flixwork-Sätzen (Stand Datenblatt 06/2026):
// Grundpreis 33,95 €/h, Spezialkenntnisse 40,50 €/h. Add-ons: Auswärts-Paket
// (Übernachtung + Verpflegung 7,00 € + Firmenfahrzeug 2,50 € = 9,50 €, nur
// zusammen buchbar), Werkzeug Basic 1,50 €, Top-10-Stadt +3,00 €.
// An-/Abfahrt-Pauschale 295 € einmalig, Mindestabnahme 2 Monteure. Staffelung
// bei längeren Einsätzen erfolgt individuell ("auf Anfrage").
const TARIFE = [
  { id: "standard", label: "Standard-Monteur", basis: 33.95 },
  { id: "spezial", label: "Mit Spezialkenntnissen", basis: 40.5 },
];
const FACHGEBIETE = [
  { id: "elektro", label: "Elektro" },
  { id: "shk", label: "Sanitär, Heizung & Klima" },
  { id: "versorgung", label: "Versorgungstechnik" },
];
const DAUER = [
  { id: "tag", label: "1 Tag" },
  { id: "mehrtaegig", label: "Mehrere Tage" },
  { id: "wochen", label: "Wochen" },
  { id: "monate", label: "Monate" },
];
const OPTIONEN = [
  { id: "auswaerts", label: "Übernachtung, Verpflegung & Firmenfahrzeug", auf: 9.5 },
  { id: "werkzeug", label: "Werkzeug (Basic)", auf: 1.5 },
  { id: "top10", label: "Einsatz in Top-10-Stadt", auf: 3 },
];
const ANFAHRT = 295; // An-/Abfahrt-Pauschale, einmalig
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
  const [dauer, setDauer] = useState("mehrtaegig");
  const [anzahl, setAnzahl] = useState(MIN_MONTEURE);
  const [opts, setOpts] = useState({ auswaerts: true, werkzeug: true, top10: false });
  const [state, formAction] = useActionState(sendAnfrage, initial);

  const toggle = (id) => setOpts((o) => ({ ...o, [id]: !o[id] }));

  const { rate, tagessatz, details } = useMemo(() => {
    const t = TARIFE.find((x) => x.id === tarif);
    const f = FACHGEBIETE.find((x) => x.id === fach);
    const d = DAUER.find((x) => x.id === dauer);
    const optAuf = OPTIONEN.filter((o) => opts[o.id]).reduce((s, o) => s + o.auf, 0);
    const r = t.basis + optAuf;
    const tag = r * 8 * anzahl;
    const gewaehlteOpts = OPTIONEN.filter((o) => opts[o.id]).map((o) => o.label);
    const det = [
      `Tarif: ${t.label} (${eur.format(t.basis)}/Std.)`,
      `Fachgebiet: ${f.label}`,
      `Einsatzdauer: ${d.label}`,
      `Anzahl Monteure: ${anzahl}`,
      `Zusatzoptionen: ${gewaehlteOpts.length ? gewaehlteOpts.join(", ") : "keine"}`,
      `Geschätzter Stundensatz: ${eur.format(r)} (unverbindlich, zzgl. MwSt.)`,
      `Geschätzter Tagessatz (8 Std. × ${anzahl}): ${eur.format(tag)}`,
      `An-/Abfahrt-Pauschale: ${eur.format(ANFAHRT)} (einmalig)`,
    ].join("\n");
    return { rate: r, tagessatz: tag, details: det };
  }, [tarif, fach, dauer, anzahl, opts]);

  return (
    <section id="konfigurator" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky">Handwerk · Konfigurator</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Bau dir deinen Monteur zusammen.
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
                  </Chip>
                ))}
              </div>
              <p className="mt-3 text-xs text-navy/45">Staffelpreise bei längeren Einsätzen auf Anfrage.</p>
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
                Übernachtung, Verpflegung &amp; Firmenfahrzeug sind nur als Paket buchbar.
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
            <p className="mt-1 text-sm text-white/70">
              + {eur.format(ANFAHRT)} An-/Abfahrt <span className="text-white/40">(einmalig)</span>
            </p>
            <p className="mt-2 text-xs text-white/40">
              *Unverbindliche Schätzung, zzgl. MwSt. Mindestabnahme {MIN_MONTEURE} Monteure. Das finale Angebot stellen wir individuell.
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
      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-sky focus:outline-none"
    />
  );
}
