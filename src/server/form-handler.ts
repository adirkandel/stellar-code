export type ResendMailEnv = {
	RESEND_API_KEY?: string;
	RESEND_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
};

export const corsHeaders: Record<string, string> = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export function jsonResponse(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json",
			...corsHeaders,
		},
	});
}

export function escapeHtml(s: string) {
	return s
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

export function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function requireResendMailEnv(env: ResendMailEnv) {
	const apiKey = env.RESEND_API_KEY;
	const from = env.RESEND_FROM_EMAIL;
	const to = env.CONTACT_TO_EMAIL;

	if (!apiKey) {
		return {
			ok: false as const,
			response: jsonResponse(
				{ error: "Server misconfiguration: RESEND_API_KEY is missing" },
				500,
			),
		};
	}
	if (!from || !to) {
		return {
			ok: false as const,
			response: jsonResponse(
				{
					error:
						"Server misconfiguration: RESEND_FROM_EMAIL and CONTACT_TO_EMAIL are required",
				},
				500,
			),
		};
	}

	return { ok: true as const, apiKey, from, to };
}

export async function sendResendEmail(options: {
	apiKey: string;
	from: string;
	to: string;
	replyTo: string;
	subject: string;
	html: string;
}) {
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${options.apiKey}`,
			"Content-Type": "application/json",
			"User-Agent": "stellar-code/1.0",
		},
		body: JSON.stringify({
			from: options.from,
			to: [options.to],
			reply_to: options.replyTo,
			subject: options.subject,
			html: options.html,
		}),
	});

	if (!res.ok) {
		const errText = await res.text();
		console.error("Resend email error:", res.status, errText);
		return { ok: false as const, status: res.status };
	}

	return { ok: true as const };
}

export type BuiltMailMessage =
	| { ok: true; replyTo: string; subject: string; html: string }
	| { ok: false; response: Response };

/**
 * Shared POST/OPTIONS pipeline for contact + IMPACT (and similar) mail forms.
 */
export async function handleResendMailApi(
	request: Request,
	env: ResendMailEnv,
	buildMessage: (body: unknown) => BuiltMailMessage,
): Promise<Response> {
	if (request.method === "OPTIONS") {
		return new Response(null, { status: 204, headers: corsHeaders });
	}

	if (request.method !== "POST") {
		return jsonResponse({ error: "Method not allowed" }, 405);
	}

	const mailEnv = requireResendMailEnv(env);
	if (!mailEnv.ok) return mailEnv.response;

	const parsed = await parseJsonBody<unknown>(request);
	if (!parsed.ok) return parsed.response;

	const message = buildMessage(parsed.data);
	if (!message.ok) return message.response;

	const sent = await sendResendEmail({
		apiKey: mailEnv.apiKey,
		from: mailEnv.from,
		to: mailEnv.to,
		replyTo: message.replyTo,
		subject: message.subject,
		html: message.html,
	});

	if (!sent.ok) {
		return jsonResponse({ error: "Failed to send email" }, 502);
	}

	return jsonResponse({ ok: true });
}

export async function parseJsonBody<T>(
	request: Request,
): Promise<{ ok: true; data: T } | { ok: false; response: Response }> {
	try {
		const data = (await request.json()) as T;
		return { ok: true, data };
	} catch {
		return { ok: false, response: jsonResponse({ error: "Invalid JSON body" }, 400) };
	}
}
