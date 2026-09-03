"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendBewerbung } from "@/lib/bewerbung-action";
import { branchen } from "@/lib/jobwelt";
import { kontakt } from "@/lib/kontakt";

// Bewerbungsformular. Pflicht sind nur der Name und ein Rückweg. Alles andere
// ist freiwillig und wird im Gespräch geklärt.
const initial = { status: "idle", message: "" };

function Senden() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-sky px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-sky-soft disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Bewerbung abschicken"}
    </button>
  );
}

export default function BewerbungsFormular({ job }) {
  const [state, formAction] = useActionState(sendBewerbung, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-navy/10 bg-white p-8 text-center md:p-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold text-navy">Angekommen.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-navy/65">{state.message}</p>
        <a href="/jobs" className="mt-6 inline-flex text-sm font-semibold text-sky hover:underline">
          Weitere Stellen ansehen →
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-3xl border border-navy/10 bg-white p-6 md:p-8">
      {job ? (
        <div className="mb-6 rounded-2xl bg-mist px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/45">Ihre Bewerbung auf</p>
          <p className="mt-1 font-bold text-navy">{job.titel}</p>
          <p className="text-sm text-navy/55">
            {job.plz} {job.ort}
          </p>
          <input type="hidden" name="jobSlug" value={job.slug} />
          <input type="hidden" name="jobTitel" value={job.titel} />
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Feld name="name" label="Ihr Name" required autoComplete="name" />
        <Feld name="telefon" label="Telefon" type="tel" autoComplete="tel" />
        <Feld name="email" label="E-Mail (optional)" type="email" autoComplete="email" />
        <Feld name="ort" label="Wohnort oder PLZ (optional)" autoComplete="postal-code" />
      </div>

      {!job ? (
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-navy/70">Wonach suchen Sie?</span>
          <select
            name="bereich"
            defaultValue=""
            className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-base text-navy focus:border-sky focus:outline-none"
          >
            <option value="">Noch offen, beraten Sie mich gern</option>
            {branchen.map((b) => (
              <option key={b.slug} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-navy/70">Nachricht (optional)</span>
        <textarea
          name="nachricht"
          rows={4}
          maxLength={4000}
          placeholder="Was haben Sie bisher gemacht, ab wann können Sie starten, gibt es etwas zu beachten?"
          className="w-full resize-none rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-base text-navy placeholder-navy/35 focus:border-sky focus:outline-none"
        />
      </label>

      <p className="mt-4 text-xs leading-relaxed text-navy/50">
        Wir verwenden Ihre Angaben ausschließlich, um Sie zu Ihrer Bewerbung zu
        kontaktieren. Sie können der Speicherung jederzeit formlos widersprechen.
      </p>

      {state.status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="mt-6">
        <Senden />
      </div>

      <p className="mt-4 text-center text-sm text-navy/55">
        Lieber direkt sprechen?{" "}
        <a href={kontakt.telefonHref} className="font-semibold text-sky hover:underline">
          {kontakt.telefon}
        </a>{" "}
        oder{" "}
        <a href={kontakt.whatsappHref} target="_blank" rel="noopener" className="font-semibold text-sky hover:underline">
          WhatsApp
        </a>
      </p>

      {/* Zweiter Weg für alle, die ihre Unterlagen schon beisammen haben. Er
          führt in das Bewerberportal von zvoove, wo die Bewerbung samt Anhängen
          direkt im System landet. */}
      {job?.bewerbungsUrl ? (
        <p className="mt-3 border-t border-navy/5 pt-4 text-center text-sm text-navy/55">
          Unterlagen schon bereit?{" "}
          <a
            href={job.bewerbungsUrl}
            target="_blank"
            rel="noopener"
            className="font-semibold text-sky hover:underline"
          >
            Mit vollständigen Unterlagen bewerben
          </a>
        </p>
      ) : null}
    </form>
  );
}

function Feld({ label, name, required, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy/70">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        required={required}
        {...rest}
        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-base text-navy placeholder-navy/35 focus:border-sky focus:outline-none"
      />
    </label>
  );
}
