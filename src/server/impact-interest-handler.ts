import { IMPACT_ROLES, type ImpactRole } from "@/lib/impact-service";
import {
	escapeHtml,
	handleResendMailApi,
	isValidEmail,
	jsonResponse,
	type ResendMailEnv,
} from "@/server/form-handler";

export type ImpactInterestEnv = ResendMailEnv;

function isImpactRole(value: string): value is ImpactRole {
	return (IMPACT_ROLES as readonly string[]).includes(value);
}

export async function handleImpactInterestApi(
	request: Request,
	env: ImpactInterestEnv,
): Promise<Response> {
	return handleResendMailApi(request, env, (body) => {
		const data = body as {
			name?: string;
			email?: string;
			company?: string;
			role?: string;
		};

		const name = data.name?.trim() ?? "";
		const email = data.email?.trim() ?? "";
		const company = data.company?.trim() ?? "";
		const role = data.role?.trim() ?? "";

		if (!name || !email || !role) {
			return {
				ok: false,
				response: jsonResponse(
					{ error: "name, email, and role are required" },
					400,
				),
			};
		}
		if (!isValidEmail(email)) {
			return { ok: false, response: jsonResponse({ error: "Invalid email" }, 400) };
		}
		if (!isImpactRole(role)) {
			return { ok: false, response: jsonResponse({ error: "Invalid role" }, 400) };
		}

		const companyLine = company
			? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>`
			: "";
		const submittedAt = new Date().toISOString();

		return {
			ok: true,
			replyTo: email,
			subject: `IMPACT interest: ${name} (${role})`,
			html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Role:</strong> ${escapeHtml(role)}</p>
        ${companyLine}
        <p><strong>Source:</strong> /services/agentic-sdlc-impact-method</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      `,
		};
	});
}
