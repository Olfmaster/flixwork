import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schwerpunkte from "@/components/Schwerpunkte";
import WarumFlixwork from "@/components/WarumFlixwork";
import Bereiche from "@/components/Bereiche";
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
        <Bereiche />
        <MonteurKonfigurator />
        <AnfrageFragebogen />
      </main>
      <Footer />
    </>
  );
}
