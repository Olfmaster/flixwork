import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schwerpunkte from "@/components/Schwerpunkte";
import WarumFlixwork from "@/components/WarumFlixwork";
import Referenzen from "@/components/Referenzen";
import Testimonials from "@/components/Testimonials";
import Bereiche from "@/components/Bereiche";
import ExpressShuttle from "@/components/ExpressShuttle";
import Erfolgsgeschichten from "@/components/Erfolgsgeschichten";
import MonteurKonfigurator from "@/components/MonteurKonfigurator";
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
        <Referenzen />
        <Testimonials />
        <Bereiche />
        <ExpressShuttle />
        <Erfolgsgeschichten />
        <MonteurKonfigurator />
        <AnfrageFragebogen />
      </main>
      <Footer />
    </>
  );
}
