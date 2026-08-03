import { createFileRoute } from "@tanstack/react-router";
import BlogShell from "@/components/BlogShell";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = `Privacy Policy | ${siteConfig.siteName}`;
const description =
	"How Stellar Code collects, uses, and protects personal information when you use stellar-code.dev.";

export const Route = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: absoluteUrl("/privacy") },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:image", content: absoluteUrl(siteConfig.ogImage) },
		],
		links: [{ rel: "canonical", href: absoluteUrl("/privacy") }],
	}),
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<BlogShell>
			<article className="container mx-auto max-w-3xl px-6">
				<header className="mb-10">
					<p className="text-muted-foreground mb-2 text-sm">
						Last updated: August 2, 2026
					</p>
					<h1 className="font-space text-3xl font-bold text-stellar-white md:text-4xl">
						Privacy Policy
					</h1>
					<p className="text-muted-foreground mt-3 text-lg">
						This policy explains what personal information Stellar Code
						collects, why we collect it, and how you can contact us about your
						data.
					</p>
				</header>

				<div className="prose prose-invert prose-lg max-w-none prose-headings:font-space prose-a:text-primary prose-headings:text-stellar-white">
					<h2>1. Who is responsible</h2>
					<p>
						The website <a href="https://stellar-code.dev">stellar-code.dev</a>{" "}
						is operated under the brand <strong>Stellar Code</strong>. The data
						controller is <strong>Adir Kandel</strong>, based in Israel.
					</p>
					<p>
						Privacy contact:{" "}
						<a href="mailto:akandel@stellar-code.dev">
							akandel@stellar-code.dev
						</a>
					</p>

					<h2>2. What information we collect</h2>
					<h3>Information you provide</h3>
					<p>
						When you use our contact or IMPACT interest forms, we may collect:
					</p>
					<ul>
						<li>Name</li>
						<li>Email address</li>
						<li>Company name</li>
						<li>Role (IMPACT form)</li>
						<li>Message content (contact form)</li>
					</ul>

					<h3>Information collected automatically</h3>
					<p>
						Our hosting provider (Vercel) may process technical data such as IP
						address, browser type, and request metadata as part of delivering
						the website.
					</p>
					<p>
						If you accept analytics cookies, we use{" "}
						<strong>Vercel Analytics</strong> to collect aggregated usage
						information (for example, which pages are visited). Analytics is not
						loaded unless you accept it in the cookie banner.
					</p>
					<p>
						This site may load fonts from Google Fonts. That can involve a
						request from your browser to Google&apos;s servers, which may
						receive your IP address.
					</p>

					<h2>3. Why we use your information</h2>
					<ul>
						<li>
							<strong>Responding to inquiries</strong> — to reply to contact and
							IMPACT form submissions and discuss potential work.
						</li>
						<li>
							<strong>Client relationship management</strong> — to keep track of
							leads and conversations related to our services.
						</li>
						<li>
							<strong>Website improvement</strong> — with your consent, to
							understand how the site is used via analytics.
						</li>
						<li>
							<strong>Operating the website</strong> — hosting, security, and
							basic delivery of pages.
						</li>
					</ul>

					<h2>4. Legal bases</h2>
					<p>
						Depending on your location and the context, we rely on one or more
						of the following:
					</p>
					<ul>
						<li>
							<strong>Legitimate interests / responding to your request</strong>{" "}
							— when you contact us or express interest in our services.
						</li>
						<li>
							<strong>Consent</strong> — for optional analytics cookies.
						</li>
						<li>
							<strong>Legal obligations</strong> — if we must retain or disclose
							information to comply with applicable law.
						</li>
					</ul>
					<p>
						If you are in the EU/UK, you can withdraw analytics consent at any
						time by clearing site data for this domain or contacting us. We may
						also add a preference control later.
					</p>

					<h2>5. Cookies and similar technologies</h2>
					<ul>
						<li>
							<strong>Consent preference</strong> — stored in your browser
							(local storage) so we remember whether you accepted or declined
							analytics.
						</li>
						<li>
							<strong>Vercel Analytics</strong> — only if you accept analytics
							in the banner.
						</li>
					</ul>
					<p>
						You can decline analytics and continue using the site. Declining
						does not affect contact forms or core browsing.
					</p>

					<h2>6. Who we share information with</h2>
					<p>
						We do not sell your personal information. We use service providers
						that process data on our behalf or as part of tools we use to run
						the business:
					</p>
					<ul>
						<li>
							<strong>Vercel</strong> — website hosting and optional analytics
						</li>
						<li>
							<strong>Resend</strong> — sending form submission emails
						</li>
						<li>
							<strong>Google (Gmail)</strong> — receiving and storing inquiry
							emails in the inbox
						</li>
						<li>
							<strong>Airtable</strong> — CRM for managing leads and related
							business records
						</li>
						<li>
							<strong>Discord and WhatsApp</strong> — internal conversations
							about inquiries (may include details you submitted)
						</li>
						<li>
							<strong>Google Fonts</strong> — font delivery (see above)
						</li>
					</ul>
					<p>
						These providers may process data in countries other than Israel,
						including the United States. Where required, we rely on appropriate
						safeguards offered by those providers and applicable transfer
						mechanisms.
					</p>

					<h2>7. How long we keep information</h2>
					<ul>
						<li>
							<strong>Contact and IMPACT form emails</strong> — kept
							indefinitely in the inbox unless you ask us to delete them or we
							decide they are no longer needed.
						</li>
						<li>
							<strong>CRM records (Airtable)</strong> — kept while useful for
							business relationship management, or until deletion is requested
							where applicable.
						</li>
						<li>
							<strong>Analytics data</strong> — retained according to Vercel
							Analytics retention practices, and only collected after consent.
						</li>
						<li>
							<strong>Consent preference</strong> — stored in your browser until
							you clear it.
						</li>
					</ul>

					<h2>8. Your rights</h2>
					<p>
						Depending on applicable law (including Israeli privacy law and,
						where relevant, GDPR/UK GDPR), you may have rights to:
					</p>
					<ul>
						<li>Access the personal information we hold about you</li>
						<li>Request correction of inaccurate information</li>
						<li>Request deletion of your information</li>
						<li>Object to or restrict certain processing</li>
						<li>Withdraw consent for analytics</li>
						<li>
							Lodge a complaint with a relevant supervisory authority (for
							example, the Israeli Privacy Protection Authority, or your local
							EU/UK authority if applicable)
						</li>
					</ul>
					<p>
						To exercise these rights, email{" "}
						<a href="mailto:akandel@stellar-code.dev">
							akandel@stellar-code.dev
						</a>
						.
					</p>

					<h2>9. Children</h2>
					<p>
						This website is intended for business audiences and is not directed
						at children. We do not knowingly collect personal information from
						children.
					</p>

					<h2>10. Changes to this policy</h2>
					<p>
						We may update this Privacy Policy from time to time. The “Last
						updated” date at the top of this page will change when we do. Please
						review this page periodically.
					</p>

					<h2>11. Contact</h2>
					<p>
						Questions about this policy or your personal information:
						<br />
						Adir Kandel (Stellar Code)
						<br />
						<a href="mailto:akandel@stellar-code.dev">
							akandel@stellar-code.dev
						</a>
					</p>
				</div>
			</article>
		</BlogShell>
	);
}
