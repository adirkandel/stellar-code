export const siteConfig = {
	siteName: "Stellar Code",
	title: "Stellar Code | Elite Software Development Teams for SaaS Startups",
	description:
		"Build and expand your product with top-tier engineers. Stellar Code provides dedicated developers, full-stack development, and cloud infrastructure solutions for ambitious SaaS startups.",
	url: "https://stellar-code.dev",
	ogImage: "/og-image.jpg",
	twitterHandle: "@stellarcode",
} as const;

/** Build an absolute https URL for meta tags. Passes through full URLs unchanged. */
export function absoluteUrl(pathOrUrl: string) {
	if (pathOrUrl.startsWith("https://") || pathOrUrl.startsWith("http://")) {
		return pathOrUrl;
	}
	const base = siteConfig.url.replace(/\/$/, "");
	const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
	return `${base}${p}`;
}
