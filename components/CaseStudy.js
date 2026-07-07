"use client";
import { useState } from "react";
import CaseStudyBody from "./CaseStudyBody";

// Eigenständige Case-Study-Sektion (Startseite, Logistik, Industrie). Der Inhalt
// steckt in CaseStudyBody, damit er auch in der Tab-Ansicht (CaseStudyTabs)
// wiederverwendet werden kann.
//
// Optionale `weitere`-Prop (Website-Review 03.07.2026): zusätzliche Case
// Studies, die erst nach Klick auf "Weitere Case Studies" eingeblendet werden.
// Ohne Einträge bleibt der Button ausgeblendet.
export default function CaseStudy({ cs, id, weitere = [] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id={id} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <CaseStudyBody cs={cs} />

        {weitere.length > 0 && (
          <>
            {expanded &&
              weitere.map((w, i) => (
                <div key={w.titel || i} className="mt-16 border-t border-navy/10 pt-16">
                  <CaseStudyBody cs={w} />
                </div>
              ))}

            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
              >
                {expanded ? "Weniger anzeigen" : "Weitere Case Studies"}
                <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
