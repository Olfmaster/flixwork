/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dauerhafte Weiterleitungen, damit weder bereits verschickte Links noch
  // vorhandene Google-Platzierungen ins Leere laufen.
  //
  // 1. Die Bereichsseiten sind am 31.08.2026 unter /unternehmen gewandert.
  // 2. /jobboerse ist der Pfad der bisherigen Seite, neu heißt er /jobs.
  async redirects() {
    return [
      { source: "/logistik", destination: "/unternehmen/logistik", permanent: true },
      { source: "/industrie", destination: "/unternehmen/industrie", permanent: true },
      { source: "/handwerk", destination: "/unternehmen/handwerk", permanent: true },
      { source: "/jobboerse", destination: "/jobs", permanent: true },
      { source: "/jobboerse/:pfad*", destination: "/jobs", permanent: true },
    ];
  },
};

export default nextConfig;
