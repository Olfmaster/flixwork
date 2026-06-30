import BereichHero from "@/components/BereichHero";
import BereichUsps from "@/components/BereichUsps";
import ExpressShuttle from "@/components/ExpressShuttle";
import Referenzen from "@/components/Referenzen";
import AnfrageFragebogen from "@/components/AnfrageFragebogen";
import AbschlussCTA from "@/components/AbschlussCTA";
import Footer from "@/components/Footer";
import { bereiche } from "@/lib/bereiche";

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
        <ExpressShuttle />
        <Referenzen />
        <AnfrageFragebogen defaultBranche="logistik" />
        <AbschlussCTA />
      </main>
      <Footer />
    </>
  );
}
