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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Schwerpunkte />
        <WarumFlixwork />
        <Kennzahlen />
        <Referenzen />
        <Auszeichnung />
        <Testimonials />
        <Erfolgsgeschichten />
        <CaseStudy cs={caseStudies.masterVendor} id="master-vendor" />
        <WarumFlixworkGrosskunden />
        <Leistungszahlen />
        <AnfrageFormular />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
