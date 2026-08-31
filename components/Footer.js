import Image from "next/image";
import logo from "@/public/flixwork-logo.png";

// Gemeinsamer Footer für beide Welten. Er verlinkt bewusst Bewerber- und
// Unternehmensbereich zusammen: das hilft der internen Verlinkung und Besucher
// finden von jeder Seite aus in den jeweils anderen Bereich.
//
// TODO (31.08.2026): Datenschutz und Meldestelle zeigen noch auf die bestehende
// Seite. Sobald die Texte übernommen sind, hier auf eigene Routen umstellen.
// Das Impressum liegt bereits unter /impressum.
const MAIN_SITE = "https://www.flixwork.de";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src={logo} alt="Flixwork" className="h-12 w-auto [filter:brightness(0)_invert(1)]" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Regional, schnell und zuverlässig. Personaldienstleistung für
              Logistik, Industrie und Handwerk, mit festen Ansprechpartnern für
              Mitarbeitende und Kunden.
            </p>
          </div>

          <FooterCol title="Für Bewerber">
            <FooterLink href="/jobs">Alle Stellenangebote</FooterLink>
            <FooterLink href="/bewerben">Initiativbewerbung</FooterLink>
            <FooterLink href="/mitarbeiter-werben-mitarbeiter">Prämie sichern</FooterLink>
            <FooterLink href="/jobs#standorte">Jobs in Ihrer Nähe</FooterLink>
          </FooterCol>

          <FooterCol title="Für Unternehmen">
            <FooterLink href="/unternehmen/logistik">Logistik</FooterLink>
            <FooterLink href="/unternehmen/industrie">Industrie</FooterLink>
            <FooterLink href="/unternehmen/handwerk">Handwerk</FooterLink>
            <FooterLink href="/unternehmen/handwerk#konfigurator">Monteur-Konfigurator</FooterLink>
            <FooterLink href="/unternehmen#anfrage">Personal anfragen</FooterLink>
          </FooterCol>

          <FooterCol title="Kontakt">
            <FooterLink href="/about">Über uns</FooterLink>
            <FooterLink href="mailto:info@flixwork.de">info@flixwork.de</FooterLink>
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href={`${MAIN_SITE}/datenschutz`} external>Datenschutz</FooterLink>
            <FooterLink href={`${MAIN_SITE}/meldestelle-hinschg`} external>Meldestelle HinSchG</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Flixwork. Alle Rechte vorbehalten.</p>
          <p>Personaldienstleistung · Logistik · Industrie · Handwerk</p>
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
