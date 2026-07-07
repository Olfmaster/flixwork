import BereichHero from "@/components/BereichHero";
import KennzahlenKarte from "@/components/KennzahlenKarte";
import BereichUsps from "@/components/BereichUsps";
import LeistungenLogistik from "@/components/LeistungenLogistik";
import ExpressShuttle from "@/components/ExpressShuttle";
import CaseStudyTabs from "@/components/CaseStudyTabs";
import Referenzen from "@/components/Referenzen";
import OnboardingProzess from "@/components/OnboardingProzess";
import AnfrageFragebogen from "@/components/AnfrageFragebogen";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";
import { caseStudies } from "@/lib/case-studies";
import { leistungszahlen } from "@/lib/leistungszahlen";

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
        <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-5 md:-mt-20 md:px-8">
          <KennzahlenKarte zahlen={leistungszahlen} className="shadow-2xl shadow-navy/15" />
        </div>
        <BereichUsps b={b} />
        <LeistungenLogistik />
        <ExpressShuttle />
        <CaseStudyTabs
          id="case-study"
          titel="Case Studies aus Logistik, Industrie und Großkunden-Projekten"
          text="Konkrete Beispiele, wie wir Personalherausforderungen lösen — wählen Sie einen Fall aus."
          items={[caseStudies.peakLogistik, caseStudies.produktion, caseStudies.masterVendor]}
        />
        <Referenzen gruppe="logistik" clickable={false} googleBewertungen />
        <OnboardingProzess variant="logistik" />
        <AnfrageFragebogen defaultBranche="logistik" />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
