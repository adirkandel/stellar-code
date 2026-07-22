import { createFileRoute } from "@tanstack/react-router";

import { handleImpactInterestApi } from "@/server/impact-interest-handler";

function impactInterestEnv() {
	return {
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
		CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
	};
}

export const Route = createFileRoute("/api/impact-interest")({
	server: {
		handlers: {
			OPTIONS: ({ request }) =>
				handleImpactInterestApi(request, impactInterestEnv()),
			POST: ({ request }) =>
				handleImpactInterestApi(request, impactInterestEnv()),
		},
	},
});
