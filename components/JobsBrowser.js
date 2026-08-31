"use client";
import { useMemo, useState } from "react";
import JobKarte from "./JobKarte";

// Filter über den bereits geladenen Stellen. Die Liste ist klein genug, dass
// jeder Tastendruck ohne Serveranfrage auskommt. Das ist auf dem Handy spürbar
// schneller als eine serverseitige Suche und spart uns jede Zusatzinfrastruktur.
export default function JobsBrowser({ jobs, branchen, standorte }) {
  const [q, setQ] = useState("");
  const [kategorie, setKategorie] = useState("alle");
  const [ort, setOrt] = useState("alle");

  const treffer = useMemo(() => {
    const suche = q.trim().toLowerCase();
    return jobs.filter((j) => {
      if (kategorie !== "alle" && j.kategorie !== kategorie) return false;
      if (ort !== "alle" && j.ort !== ort) return false;
      if (!suche) return true;
      return `${j.titel} ${j.ort} ${j.plz} ${j.kurztext}`.toLowerCase().includes(suche);
    });
  }, [jobs, q, kategorie, ort]);

  const zurueckgesetzt = q === "" && kategorie === "alle" && ort === "alle";

  return (
    <div>
      <div className="rounded-3xl border border-navy/10 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/35"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Beruf, Ort oder Stichwort"
              aria-label="Stellen durchsuchen"
              className="w-full rounded-full border border-navy/15 bg-white py-3.5 pl-12 pr-4 text-base text-navy placeholder-navy/40 focus:border-sky focus:outline-none"
            />
          </div>

          <select
            value={ort}
            onChange={(e) => setOrt(e.target.value)}
            aria-label="Einsatzort wählen"
            className="rounded-full border border-navy/15 bg-white px-5 py-3.5 text-base text-navy focus:border-sky focus:outline-none sm:w-56"
          >
            <option value="alle">Alle Orte</option>
            {standorte.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name} ({s.anzahl})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={kategorie === "alle"} onClick={() => setKategorie("alle")}>
            Alle Bereiche
          </Chip>
          {branchen.map((b) => (
            <Chip key={b.slug} active={kategorie === b.slug} onClick={() => setKategorie(b.slug)}>
              {b.name} <span className="opacity-60">{b.anzahl}</span>
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-navy/55">
          <strong className="font-bold text-navy">{treffer.length}</strong>{" "}
          {treffer.length === 1 ? "passende Stelle" : "passende Stellen"}
        </p>
        {!zurueckgesetzt && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setKategorie("alle");
              setOrt("alle");
            }}
            className="text-sm font-semibold text-sky hover:underline"
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {treffer.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {treffer.map((job) => (
            <JobKarte key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-navy/15 bg-white px-6 py-14 text-center">
          <p className="text-lg font-bold text-navy">Dazu haben wir gerade nichts offen.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-navy/60">
            Das ändert sich fast täglich. Schicken Sie uns eine Initiativbewerbung,
            dann melden wir uns, sobald etwas Passendes hereinkommt.
          </p>
          <a
            href="/bewerben"
            className="mt-6 inline-flex rounded-full bg-sky px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-soft"
          >
            Initiativ bewerben
          </a>
        </div>
      )}
    </div>
  );
}

function Chip({ active, children, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active ? "border-navy bg-navy text-white" : "border-navy/15 bg-white text-navy/75 hover:border-navy/40"
      }`}
    >
      {children}
    </button>
  );
}
