/**
 * Contact form handler — Cloudflare Pages Function at /api/contact.
 *
 * Env vars (set in Cloudflare Pages → Settings → Environment variables):
 *   RESEND_API_KEY  — Resend API key (https://resend.com)
 *   CONTACT_TO      — destination email (e.g. zeshaq@gmail.com)
 *   CONTACT_FROM    — verified sender (e.g. "CompTech Lab <hello@comptech-lab.com>")
 *
 * If RESEND_API_KEY is unset, the function returns 200 and logs the submission
 * so the form is usable in preview environments without leaking secrets.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface ContactBody {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  company_url?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  if (body.company_url) {
    return json({ ok: true }, 200);
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = (body.company ?? "").trim();
  const service = (body.service ?? "").trim();

  if (!name || !email || !message) {
    return json({ error: "Name, email, and message are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please provide a valid email address." }, 400);
  }
  if (message.length > 5000 || name.length > 200 || company.length > 200) {
    return json({ error: "Message is too long." }, 400);
  }

  const subject = `[comptech-lab] ${service || "inquiry"} — ${name}`;
  const text = [
    `From: ${name} <${email}>`,
    company && `Company: ${company}`,
    service && `Service: ${service}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.log("[contact] submission (no Resend key configured):", {
      subject,
      text,
    });
    return json({ ok: true, mode: "logged" }, 200);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] resend failed:", res.status, err);
    return json({ error: "Could not send. Please email hello@comptech-lab.com." }, 502);
  }

  return json({ ok: true, mode: "sent" }, 200);
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
