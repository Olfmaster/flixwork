import { getJobs } from "@/lib/zvoove";
import { branchen, standorteAus } from "@/lib/jobwelt";

// Sitemap aus denselben Daten wie die Seiten selbst. Neue Stellen erscheinen
// dadurch automatisch, ohne dass jemand eine Liste pflegt.
const BASIS = "https://www.flixwork.de";

export default async function sitemap() {
  const jobs = await getJobs();
  const heute = new Date();

  const statisch = [
    ["", 1.0, "weekly"],
    ["/jobs", 0.9, "daily"],
    ["/bewerben", 0.8, "monthly"],
    ["/mitarbeiter-werben-mitarbeiter", 0.6, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/unternehmen", 0.9, "weekly"],
    ["/unternehmen/logistik", 0.8, "monthly"],
    ["/unternehmen/industrie", 0.8, "monthly"],
    ["/unternehmen/handwerk", 0.8, "monthly"],
    ["/impressum", 0.3, "yearly"],
  ].map(([pfad, priority, changeFrequency]) => ({
    url: `${BASIS}${pfad}`,
    lastModified: heute,
    changeFrequency,
    priority,
  }));

  const stellen = jobs.map((j) => ({
    url: `${BASIS}/jobs/${j.slug}`,
    lastModified: j.aktualisiertAm ? new Date(j.aktualisiertAm) : heute,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const staedte = standorteAus(jobs).map((s) => ({
    url: `${BASIS}/jobs-in/${s.slug}`,
    lastModified: heute,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const bereiche = branchen.map((b) => ({
    url: `${BASIS}/branchen/${b.slug}`,
    lastModified: heute,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...statisch, ...stellen, ...staedte, ...bereiche];
}
