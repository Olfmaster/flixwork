import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schwerpunkte from "@/components/Schwerpunkte";
import WarumFlixwork from "@/components/WarumFlixwork";
import Kennzahlen from "@/components/Kennzahlen";
import Referenzen from "@/components/Referenzen";
import Testimonials from "@/components/Testimonials";
import Erfolgsgeschichten from "@/components/Erfolgsgeschichten";
import AnfrageFragebogen from "@/components/AnfrageFragebogen";
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
        <AnfrageFragebogen />
      </main>
      <Footer />
    </>
  );
}
