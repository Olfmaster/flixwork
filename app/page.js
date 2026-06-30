import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schwerpunkte from "@/components/Schwerpunkte";
import WarumFlixwork from "@/components/WarumFlixwork";
import Kennzahlen from "@/components/Kennzahlen";
import Referenzen from "@/components/Referenzen";
import Testimonials from "@/components/Testimonials";
import Erfolgsgeschichten from "@/components/Erfolgsgeschichten";
import AnfrageFormular from "@/components/AnfrageFormular";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";

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
        <Testimonials />
        <Erfolgsgeschichten />
        <AnfrageFormular />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
