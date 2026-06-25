import Image from "next/image";
import logo from "@/public/flixwork-logo.png";

const MAIN_SITE = "https://www.flixwork.de";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src={logo} alt="Flixwork" className="h-12 w-auto [filter:brightness(0)_invert(1)]" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Inhabergeführter B2B-Personaldienstleister für Logistik, Industrie
              und Handwerk — bundesweit, professionell & zuverlässig.
            </p>
          </div>

          <FooterCol title="Bereiche">
            <FooterLink href="#logistik">Logistik</FooterLink>
            <FooterLink href="#industrie">Industrie</FooterLink>
            <FooterLink href="#handwerk">Handwerk</FooterLink>
            <FooterLink href="#konfigurator">Monteur-Konfigurator</FooterLink>
          </FooterCol>

          <FooterCol title="Unternehmen">
            <FooterLink href="#warum">Warum Flixwork</FooterLink>
            <FooterLink href="#anfrage">Personal anfragen</FooterLink>
            <FooterLink href={`${MAIN_SITE}/jobboerse`} external>Jobbörse</FooterLink>
            <FooterLink href={`${MAIN_SITE}/about`} external>Über uns</FooterLink>
          </FooterCol>

          <FooterCol title="Kontakt">
            <FooterLink href="mailto:info@flixwork.de">info@flixwork.de</FooterLink>
            <FooterLink href="tel:+490000000000">Telefon: auf Anfrage</FooterLink>
            <FooterLink href={`${MAIN_SITE}/impressum`} external>Impressum</FooterLink>
            <FooterLink href={`${MAIN_SITE}/datenschutz`} external>Datenschutz</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Flixwork. Alle Rechte vorbehalten.</p>
          <p>B2B-Personaldienstleistung · Logistik · Industrie · Handwerk</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-white">{title}</p>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, external, children }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        className="text-white/55 transition-colors hover:text-white"
      >
        {children}
      </a>
    </li>
  );
}
