import BereichHero from "@/components/BereichHero";
import LogoBand from "@/components/LogoBand";
import AllInclusive from "@/components/AllInclusive";
import FlixmonteureKennzeichen from "@/components/FlixmonteureKennzeichen";
import CaseStudyTabs from "@/components/CaseStudyTabs";
import FlixmonteureUsps from "@/components/FlixmonteureUsps";
import FlixmonteureTeam from "@/components/FlixmonteureTeam";
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
        {/* Reihenfolge laut Website-Review 17.07.2026: Logos-Band → All-inclusive-
            Checkliste → KPIs → Referenzprojekte → Warum Fix Monteure →
            Konfigurator → Team/Kontakt.
            Die große Referenzen-Logowand entfällt hier bewusst (22.07.2026) —
            das schmale Logo-Band unter dem Hero übernimmt diese Rolle.
            Google-Bewertungen sind ebenfalls ausgeblendet: für Fix Monteure
            liegen noch zu wenige vor; in 1–2 Monaten erneut prüfen, sobald die
            Google Place ID vorliegt. */}
        <BereichHero b={b} />
        <LogoBand gruppe="handwerk" />
        <AllInclusive />
        <FlixmonteureKennzeichen />
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
        <FlixmonteureTeam />
        <AbschlussCTA
          telefon="+49 551 790 988 53"
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
