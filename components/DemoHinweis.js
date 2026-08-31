import { zvooveAktiv } from "@/lib/zvoove";

// Sichtbarer Hinweis, solange die Stellen aus lib/jobs-demo.js kommen. Sobald
// ZVOOVE_API_BASE und ZVOOVE_API_KEY gesetzt sind, verschwindet dieser Streifen
// von selbst. Er steht bewusst gut sichtbar auf der Seite, damit im Abstimmungs-
// termin niemand die Platzhalter für echte Stellen hält.
export default function DemoHinweis() {
  if (zvooveAktiv) return null;

  return (
    <div className="border-b border-signal/20 bg-signal-soft">
      <p className="mx-auto max-w-7xl px-5 py-3 text-center text-sm text-signal md:px-8">
        <strong className="font-bold">Vorschau:</strong> Die gezeigten Stellen sind
        Platzhalter. Sobald die zvoove-Zugangsdaten hinterlegt sind, erscheinen
        hier automatisch die echten Stellenangebote.
      </p>
    </div>
  );
}
