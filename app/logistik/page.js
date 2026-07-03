import BereichHero from "@/components/BereichHero";
import BereichUsps from "@/components/BereichUsps";
import LeistungenLogistik from "@/components/LeistungenLogistik";
import Leistungszahlen from "@/components/Leistungszahlen";
import ExpressShuttle from "@/components/ExpressShuttle";
import CaseStudy from "@/components/CaseStudy";
import Referenzen from "@/components/Referenzen";
import OnboardingProzess from "@/components/OnboardingProzess";
import AnfrageFragebogen from "@/components/AnfrageFragebogen";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";
import { caseStudies } from "@/lib/case-studies";

const b = bereiche.logistik;

export const metadata = {
  title: "Logistik-Personal",
  description:
    "Flexibles Logistik-Personal von Flixwork: Lagerhelfer, Kommissionierer und Staplerfahrer — schnell skalierbar bei Saisonspitzen und Projektgeschäft. Inkl. Express-Shuttle für schwer erreichbare Standorte.",
  alternates: { canonical: "/logistik" },
};

export default function LogistikPage() {
  return (
    <>
      <main>
        <BereichHero b={b} />
        <BereichUsps b={b} />
        <LeistungenLogistik />
        <Leistungszahlen />
        <ExpressShuttle />
        <CaseStudy cs={caseStudies.peakLogistik} id="case-study" />
        <Referenzen gruppe="logistik" />
        <OnboardingProzess />
        <AnfrageFragebogen defaultBranche="logistik" />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
