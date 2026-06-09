"use server";

// Gemeinsame Server-Action für beide Tools: Monteur-Konfigurator (Handwerk)
// und Fragebogen (Logistik/Industrie). Der Client liefert eine fertig
// formatierte Zusammenfassung in `details`; hier kommen nur Kontaktprüfung,
// Routing der Zieladresse und der Versand dazu.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendAnfrage(_prevState, formData) {
  const get = (k) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const typ = get("typ") === "konfigurator" ? "konfigurator" : "fragebogen";
  const firma = get("kontaktFirma");
  const name = get("kontaktName");
  const email = get("kontaktEmail");
  const telefon = get("kontaktTelefon");
  const details = get("details");

  if (!firma || !name || !email) {
    return { status: "error", message: "Bitte Firma, Name und E-Mail ausfüllen." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Bitte eine gültige E-Mail-Adresse angeben." };
  }
  if (details.length > 8000) {
    return { status: "error", message: "Die Anfrage ist zu lang." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to =
    typ === "konfigurator"
      ? process.env.KONFIGURATOR_EMAIL ?? "wolf@flixwork.de"
      : process.env.ANFRAGE_EMAIL ?? "info@flixwork.de";
  const from = process.env.CONTACT_FROM ?? "Flixwork Website <onboarding@resend.dev>";

  const subject =
    typ === "konfigurator"
      ? `Monteur-Anfrage von ${firma}`
      : `Personalanfrage von ${firma}`;

  const text = [
    `Typ: ${typ === "konfigurator" ? "Monteur-Konfigurator (Handwerk)" : "Fragebogen (Logistik/Industrie)"}`,
    `Firma: ${firma}`,
    `Ansprechpartner: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${telefon || "—"}`,
    "",
    "— Details —",
    details || "(keine)",
  ].join("\n");

  // Ohne API-Key: Anfrage nur loggen, Seite bleibt funktionsfähig.
  if (!apiKey) {
    console.warn("[anfrage] RESEND_API_KEY fehlt — Anfrage nur geloggt.");
    console.log({ to, from, subject, text });
    return {
      status: "success",
      message: "Vielen Dank! Ihre Anfrage ist eingegangen — wir melden uns zeitnah.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
    });
    if (!res.ok) {
      console.error("[anfrage] Resend-Fehler:", res.status, await res.text());
      return { status: "error", message: "Senden fehlgeschlagen. Bitte später erneut versuchen." };
    }
  } catch (err) {
    console.error("[anfrage] Netzwerkfehler:", err);
    return { status: "error", message: "Senden fehlgeschlagen. Bitte später erneut versuchen." };
  }

  return {
    status: "success",
    message: "Vielen Dank! Ihre Anfrage ist angekommen — wir melden uns zeitnah.",
  };
}
