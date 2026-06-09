import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://unternehmen.flixwork.de";
const TITLE = "Flixwork — Qualifiziertes Personal für Ihr Unternehmen";
const DESCRIPTION =
  "Überlassung von Fach-, Führungs- und Hilfskräften in Logistik, Industrie und Handwerk. Inhabergeführt, persönlich, bundesweit — mit Monteur-Konfigurator und schneller Personalanfrage.";

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
