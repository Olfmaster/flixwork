"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/flixwork-logo.png";

// Hauptnavigation für beide Welten. `variant` entscheidet, ob die Leiste zur
// Unternehmensseite oder zur Bewerberseite gehört. Beide verlinken jeweils die
// andere Welt, damit niemand über die Startseite zurück muss.
const NAV = {
  unternehmen: {
    home: "/unternehmen",
    links: [
      { label: "Logistik", href: "/unternehmen/logistik" },
      { label: "Industrie", href: "/unternehmen/industrie" },
      { label: "Handwerk", href: "/unternehmen/handwerk" },
      { label: "Über uns", href: "/about" },
      { label: "Für Bewerber", href: "/jobs" },
    ],
    cta: { label: "Personal anfragen", href: "/unternehmen#anfrage" },
  },
  bewerber: {
    home: "/jobs",
    links: [
      { label: "Jobbörse", href: "/jobs" },
      { label: "Prämie sichern", href: "/mitarbeiter-werben-mitarbeiter" },
      { label: "Über uns", href: "/about" },
      { label: "Für Unternehmen", href: "/unternehmen" },
    ],
    cta: { label: "Jetzt bewerben", href: "/bewerben" },
  },
};

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 21v-7h2.3l.4-2.7h-2.7V9.5c0-.8.2-1.3 1.4-1.3H16V5.8c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v1.9H8.2V14h2.4v7h2.9z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.94 7.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88zM5.2 20h3.5V9.2H5.2V20zm5.6 0h3.4v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20H21v-6.1c0-3-.6-5.2-4.1-5.2-1.7 0-2.8.9-3.2 1.8h-.1V9.2h-3.3V20z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/49",
    path: "M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5zm0 1.6a6.9 6.9 0 0 1 5.8 10.6l-.2.3.6 2.2-2.3-.6-.3.2A6.9 6.9 0 1 1 12 5.1zm3.9 8.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.9-.4-1.7-1.2-2.2-2-.2-.3.1-.3.4-.9.1-.1 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.5.3-.6.6-.7 1.4-.4 2.3.6 1.7 1.9 3 3.6 3.7 1.1.5 1.6.5 2.2.4.4-.1 1.2-.5 1.3-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z",
  },
];

// `logoOverride` (Website-Review 03.07.2026): zeigt auf der Handwerk-Seite
// ausschließlich das Flixmonteure-Logo statt des Flixwork-Logos — finale
// Platzierung im Header hängt von der Abstimmung mit dem bestehenden
// Webdesigner von Flixwork ab.
export default function Navbar({ logoOverride, variant = "unternehmen" }) {
  const { home, links, cta } = NAV[variant] ?? NAV.unternehmen;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  // Beim Scrollen wird die Leiste dunkelblau statt weiß. Über den hellen
  // Abschnitten der Seite ging eine weiße Leiste optisch unter, erkennbar war
  // nur noch der Schatten. Dunkelblau bleibt auf hellem wie auf dunklem
  // Untergrund sichtbar, und die Schrift kann in beiden Zuständen weiß bleiben.
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-navy/95 backdrop-blur shadow-[0_4px_24px_-12px_rgba(19,31,61,0.55)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a href={home} className="flex items-center" aria-label="Flixwork Startseite">
          {logoOverride ? (
            <img
              src={logoOverride.src}
              alt={logoOverride.alt}
              className="h-10 w-auto md:h-12 [filter:brightness(0)_invert(1)]"
            />
          ) : (
            <Image
              src={logo}
              alt="Flixwork"
              priority
              className="h-10 w-auto md:h-12 [filter:brightness(0)_invert(1)]"
            />
          )}
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}

          <div className="flex items-center gap-3 pl-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="text-white/70 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <a
            href={cta.href}
            className="rounded-full bg-sky px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-sky-soft"
          >
            {cta.label}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü"
          aria-expanded={open}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-all ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-navy px-5 pb-6 pt-2">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-base font-medium text-white/90"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-sky px-5 py-3 text-center text-sm font-semibold text-white"
          >
            {cta.label}
          </a>
          <div className="mt-5 flex items-center justify-center gap-6">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="text-white/70">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
