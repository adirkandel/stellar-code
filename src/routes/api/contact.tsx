import { createFileRoute } from "@tanstack/react-router";

import { handleContactApi } from "@/server/contact-handler";

function contactEnv() {
	return {
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
		CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
	};
}

export const Route = createFileRoute("/api/contact")({
	server: {
		handlers: {
			OPTIONS: ({ request }) => handleContactApi(request, contactEnv()),
			POST: ({ request }) => handleContactApi(request, contactEnv()),
		},
	},
});
