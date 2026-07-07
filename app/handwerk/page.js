import BereichHero from "@/components/BereichHero";
import FlixmonteureKennzeichen from "@/components/FlixmonteureKennzeichen";
import CaseStudyTabs from "@/components/CaseStudyTabs";
import FlixmonteureUsps from "@/components/FlixmonteureUsps";
import Referenzen from "@/components/Referenzen";
import MonteurKonfigurator from "@/components/MonteurKonfigurator";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";
import { caseStudies } from "@/lib/case-studies";

const b = bereiche.handwerk;

export const metadata = {
  title: "Handwerk — Monteure für SHK, Elektro & TGA",
  description:
    "Flixmonteure: qualifizierte Monteure für SHK, Elektro, Lüftung und technische Gebäudeausrüstung — bundesweit, einsatzbereit mit Werkzeug, Fahrzeug und Organisation. Stellen Sie sich Ihren Monteur im Flixwork-Konfigurator zusammen.",
  alternates: { canonical: "/handwerk" },
};

export default function HandwerkPage() {
  return (
    <>
      <main>
        {/* Reihenfolge Fachgebiete (im Hero) → KPIs → Referenzen → Case Studies →
            Warum Fix Monteure → Konfigurator (Website-Review 03.07.2026) */}
        <BereichHero b={b} />
        <FlixmonteureKennzeichen />
        <Referenzen gruppe="handwerk" googleBewertungen />
        <CaseStudyTabs
          id="case-study"
          titel="Referenzprojekte aus dem Handwerk"
          text="Echte Einsätze aus SHK, Industrie und TGA — wählen Sie einen Fall aus."
          items={[
            caseStudies.wohnprojektShk,
            caseStudies.industrieRohrleitung,
            caseStudies.tgaSanierung,
          ]}
        />
        <FlixmonteureUsps />
        <MonteurKonfigurator />
        <AbschlussCTA
          kontaktHref="#konfigurator"
          kontaktLabel="Fachkräfte anfragen"
          titel="Kurzfristig Fachkräfte für Ihr Projekt?"
          text="Sie benötigen kurzfristig Fachkräfte für Ihr Projekt? Sprechen Sie mit unseren Experten — wir melden uns persönlich und unverbindlich."
        />
      </main>
      <Footer />
    </>
  );
}
