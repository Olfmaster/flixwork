import KennzahlenKarte from "./KennzahlenKarte";
import { leistungszahlen } from "@/lib/leistungszahlen";

// Kennzahlen-Band als eigene Sektion (Startseite). Heller Abschnitt, die
// blaue Akzentfarbe liegt auf den Zahlen. Karte selbst in KennzahlenKarte,
// damit sie auch über den Logistik-Hero-Rand ragend eingebaut werden kann.
export default function Leistungszahlen() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <KennzahlenKarte zahlen={leistungszahlen} />
      </div>
    </section>
  );
}
