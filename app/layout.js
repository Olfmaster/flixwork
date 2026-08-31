import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// TODO: SITE_URL auf die finale Domain setzen, sobald die neue Seite die alte
// ablöst (voraussichtlich https://www.flixwork.de).
const SITE_URL = "https://www.flixwork.de";
const TITLE = "Flixwork — regional, schnell & zuverlässig";
const DESCRIPTION =
  "Flixwork verbindet Menschen und Betriebe in Logistik, Industrie und Handwerk. Offene Stellen mit Bezahlung nach Tarif für Bewerber, verlässliche Personallösungen für Unternehmen.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Flixwork",
  },
  description: DESCRIPTION,
  applicationName: "Flixwork",
  keywords: [
    "Personaldienstleister",
    "Zeitarbeit",
    "Jobs Kassel",
    "Stellenangebote Logistik",
    "Arbeitnehmerüberlassung",
    "Logistik Personal",
    "Industrie Fachkräfte",
    "Handwerk Monteure",
    "Elektro Sanitär Monteure",
    "Personalvermittlung B2B",
    "Flixwork",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Flixwork",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#1c2d5a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
