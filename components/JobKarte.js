import { formatLohn } from "@/lib/jobwelt";

// Eine Stelle in der Liste. Bewusst großflächig und mit wenig Text: Bewerber
// entscheiden auf dem Handy in Sekunden, ob eine Stelle passt. Ort, Lohn und
// Prämie stehen deshalb vor allem anderen.
function Pin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Uhr() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function JobKarte({ job }) {
  return (
    <article className="group relative flex flex-col rounded-3xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_18px_40px_-24px_rgba(28,45,90,0.45)] md:p-7">
      <div className="flex flex-wrap items-center gap-2">
        {job.praemie ? (
          <span className="rounded-full bg-signal-soft px-3 py-1 text-xs font-bold text-signal">
            {job.praemie} € Startprämie
          </span>
        ) : null}
        <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy/60">
          {job.beschaeftigungsart}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold leading-snug text-navy md:text-2xl">
        <a href={`/jobs/${job.slug}`} className="focus:outline-none focus-visible:underline">
          {/* Flächendeckender Link: die ganze Karte ist klickbar, ohne dass wir
              verschachtelte Links brauchen. */}
          <span className="absolute inset-0" aria-hidden="true" />
          {job.titel}
        </a>
      </h3>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy/60">
        <span className="inline-flex items-center gap-1.5">
          <Pin />
          {job.plz} {job.ort}
        </span>
        {job.arbeitszeit ? (
          <span className="inline-flex items-center gap-1.5">
            <Uhr />
            {job.arbeitszeit}
          </span>
        ) : null}
      </div>

      {job.kurztext ? (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-navy/60">{job.kurztext}</p>
      ) : null}

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-navy/5 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/40">Verdienst</p>
          <p className="mt-1 text-lg font-bold text-sky">{formatLohn(job)}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-transform duration-300 group-hover:translate-x-1">
          Details
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
