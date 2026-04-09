export type ContactEnv = {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

/**
 * Shared by Vercel Edge (`api/contact.ts`) and Vite dev middleware.
 */
export async function handleContactApi(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM_EMAIL;
  const to = env.CONTACT_TO_EMAIL;

  if (!apiKey) {
    return jsonResponse({ error: "Server misconfiguration: RESEND_API_KEY is missing" }, 500);
  }
  if (!from || !to) {
    return jsonResponse(
      { error: "Server misconfiguration: RESEND_FROM_EMAIL and CONTACT_TO_EMAIL are required" },
      500,
    );
  }

  let payload: { name?: string; email?: string; company?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const { name, email, company, message } = payload;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return jsonResponse({ error: "name, email, and message are required" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email" }, 400);
  }
  if (message.trim().length < 10) {
    return jsonResponse({ error: "message must be at least 10 characters" }, 400);
  }

  const companyLine = company?.trim() ? `<p><strong>Company:</strong> ${escapeHtml(company.trim())}</p>` : "";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email.trim(),
      subject: `Contact form: ${name.trim()}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        ${companyLine}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replaceAll("\n", "<br />")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", res.status, errText);
    return jsonResponse({ error: "Failed to send email" }, 502);
  }

  return jsonResponse({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
