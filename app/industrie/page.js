import BereichHero from "@/components/BereichHero";
import BereichUsps from "@/components/BereichUsps";
import IndustrieProzess from "@/components/IndustrieProzess";
import CaseStudy from "@/components/CaseStudy";
import Referenzen from "@/components/Referenzen";
import OnboardingProzess from "@/components/OnboardingProzess";
import AnfrageFragebogen from "@/components/AnfrageFragebogen";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";
import { caseStudies } from "@/lib/case-studies";

const b = bereiche.industrie;

export const metadata = {
  title: "Industrie-Personal",
  description:
    "Sorgfältig ausgewählte Fach- und Hilfskräfte für die Industrie: Produktionshelfer, Maschinenführer und Qualitätsprüfer — mit strukturierten Vorstellungsgesprächen und durchgängiger Qualitätssicherung von Flixwork.",
  alternates: { canonical: "/industrie" },
};

export default function IndustriePage() {
  return (
    <>
      <main>
        <BereichHero b={b} />
        <BereichUsps b={b} />
        <IndustrieProzess />
        <CaseStudy cs={caseStudies.produktion} id="case-study" />
        <Referenzen gruppe="industrie" />
        <OnboardingProzess />
        <AnfrageFragebogen defaultBranche="produktion" />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
