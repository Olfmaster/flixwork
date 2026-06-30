import BereichHero from "@/components/BereichHero";
import BereichUsps from "@/components/BereichUsps";
import MonteurKonfigurator from "@/components/MonteurKonfigurator";
import Referenzen from "@/components/Referenzen";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";

const b = bereiche.handwerk;

export const metadata = {
  title: "Handwerk — Elektro- & Sanitär-Monteure",
  description:
    "Erfahrene europäische Monteure für Elektro, Sanitär, Heizung, Klima und Versorgungstechnik — mobil mit eigenem Auto und Werkzeug, bundesweit einsatzbereit. Stellen Sie sich Ihren Monteur im Flixwork-Konfigurator zusammen.",
  alternates: { canonical: "/handwerk" },
};

export default function HandwerkPage() {
  return (
    <>
      <main>
        <BereichHero b={b} />
        <BereichUsps b={b} />
        <MonteurKonfigurator />
        <Referenzen />
        <AbschlussCTA kontaktHref="#konfigurator" kontaktLabel="Monteur konfigurieren" />
      </main>
      <Footer />
    </>
  );
}
