import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schwerpunkte from "@/components/Schwerpunkte";
import WarumFlixwork from "@/components/WarumFlixwork";
import Kennzahlen from "@/components/Kennzahlen";
import Referenzen from "@/components/Referenzen";
import Auszeichnung from "@/components/Auszeichnung";
import Testimonials from "@/components/Testimonials";
import Erfolgsgeschichten from "@/components/Erfolgsgeschichten";
import CaseStudy from "@/components/CaseStudy";
import WarumFlixworkGrosskunden from "@/components/WarumFlixworkGrosskunden";
import Leistungszahlen from "@/components/Leistungszahlen";
import AnfrageFormular from "@/components/AnfrageFormular";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/case-studies";

export const metadata = {
  title: "Für Unternehmen — qualifiziertes Personal für Ihren Betrieb",
  description:
    "Überlassung von Fach-, Führungs- und Hilfskräften in Logistik, Industrie und Handwerk. Inhabergeführt, persönlich und bundesweit, mit Monteur-Konfigurator und schneller Personalanfrage.",
  alternates: { canonical: "/unternehmen" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Schwerpunkte />
        <Kennzahlen />
        <Referenzen googleBewertungen />
        <Testimonials />
        <Auszeichnung />
        <Erfolgsgeschichten />
        <CaseStudy cs={caseStudies.masterVendor} id="master-vendor" />
        {/* Vergleich Flixwork vs. Konzerne erst nach Referenzen und
            Erfolgsgeschichten (Website-Review 17.07.2026) — der Beleg kommt vor
            der Argumentation. */}
        <WarumFlixwork />
        <WarumFlixworkGrosskunden />
        <Leistungszahlen />
        <AnfrageFormular />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
