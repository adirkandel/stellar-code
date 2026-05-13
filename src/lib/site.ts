export const siteConfig = {
	siteName: "Stellar Code",
	title: "Stellar Code | Elite Software Development Teams for SaaS Startups",
	description:
		"Build and expand your product with top-tier engineers. Stellar Code provides dedicated developers, full-stack development, and cloud infrastructure solutions for ambitious SaaS startups.",
	url: "https://stellar-code.dev",
	ogImage: "/og-image.jpg",
	twitterHandle: "@stellarcode",
} as const;

export function absoluteUrl(path: string) {
	const base = siteConfig.url.replace(/\/$/, "");
	const p = path.startsWith("/") ? path : `/${path}`;
	return `${base}${p}`;
}
