import BereichHero from "@/components/BereichHero";
import BereichUsps from "@/components/BereichUsps";
import IndustrieProzess from "@/components/IndustrieProzess";
import Referenzen from "@/components/Referenzen";
import AnfrageFragebogen from "@/components/AnfrageFragebogen";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";

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
        <Referenzen />
        <AnfrageFragebogen defaultBranche="produktion" />
      </main>
      <Footer />
    </>
  );
}
