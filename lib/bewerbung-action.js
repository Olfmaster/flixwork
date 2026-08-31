"use server";

// Server-Action für Bewerbungen. Bewusst mit sehr wenigen Pflichtfeldern:
// Name und ein Rückweg reichen. Jedes zusätzliche Pflichtfeld kostet auf dem
// Handy spürbar Bewerbungen.
//
// Sobald zvoove einen Schreib-Endpunkt für Bewerber bereitstellt, wird
// bewerbungAnZvoove() in lib/zvoove.js gefüllt. Der Mailversand bleibt als
// zweiter Weg bestehen, damit keine Bewerbung verlorengeht, wenn die
// Schnittstelle einmal klemmt.

import { bewerbungAnZvoove } from "./zvoove";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendBewerbung(_prevState, formData) {
  const get = (k) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const name = get("name");
  const telefon = get("telefon");
  const email = get("email");
  const ort = get("ort");
  const bereich = get("bereich");
  const nachricht = get("nachricht");
  const jobSlug = get("jobSlug");
  const jobTitel = get("jobTitel");

  if (!name) {
    return { status: "error", message: "Bitte geben Sie Ihren Namen an." };
  }
  if (!telefon && !email) {
    return { status: "error", message: "Bitte Telefonnummer oder E-Mail angeben, damit wir uns melden können." };
  }
  if (email && !EMAIL_RE.test(email)) {
    return { status: "error", message: "Diese E-Mail-Adresse sieht nicht gültig aus." };
  }
  if (nachricht.length > 4000) {
    return { status: "error", message: "Ihre Nachricht ist zu lang." };
  }

  // Erster Versuch: direkt in zvoove. Liefert derzeit immer "nicht konfiguriert"
  // zurück, blockiert den Mailversand also nicht.
  const zvoove = await bewerbungAnZvoove({ name, telefon, email, ort, jobSlug, nachricht });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BEWERBUNG_EMAIL ?? "info@flixwork.de";
  const from = process.env.CONTACT_FROM ?? "Flixwork Website <onboarding@resend.dev>";
  const subject = jobTitel ? `Bewerbung: ${jobTitel} (${name})` : `Initiativbewerbung von ${name}`;

  const text = [
    jobTitel ? `Stelle: ${jobTitel}` : "Stelle: Initiativbewerbung",
    jobSlug ? `Link: /jobs/${jobSlug}` : "",
    "",
    `Name: ${name}`,
    `Telefon: ${telefon || "keine Angabe"}`,
    `E-Mail: ${email || "keine Angabe"}`,
    `Wohnort: ${ort || "keine Angabe"}`,
    `Gesuchter Bereich: ${bereich || "keine Angabe"}`,
    "",
    "Nachricht:",
    nachricht || "(keine)",
    "",
    `zvoove-Übernahme: ${zvoove.ok ? "erfolgt" : `nein (${zvoove.grund})`}`,
  ]
    .filter((z) => z !== "")
    .join("\n");

  if (!apiKey) {
    console.warn("[bewerbung] RESEND_API_KEY fehlt, Bewerbung wurde nur geloggt.");
    console.log({ to, from, subject, text });
    return {
      status: "success",
      message: "Vielen Dank! Ihre Bewerbung ist eingegangen. Wir melden uns innerhalb von 24 Stunden.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from,
        to: [to],
        ...(email ? { reply_to: email } : {}),
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[bewerbung] Resend-Fehler:", res.status, await res.text());
      return { status: "error", message: "Das Senden hat nicht geklappt. Rufen Sie uns gerne direkt an." };
    }
  } catch (err) {
    console.error("[bewerbung] Netzwerkfehler:", err);
    return { status: "error", message: "Das Senden hat nicht geklappt. Rufen Sie uns gerne direkt an." };
  }

  return {
    status: "success",
    message: "Vielen Dank! Ihre Bewerbung ist eingegangen. Wir melden uns innerhalb von 24 Stunden.",
  };
}
