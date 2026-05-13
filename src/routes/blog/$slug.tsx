import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogShell from "@/components/BlogShell";
import { getPostEntryBySlug } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		const entry = getPostEntryBySlug(params.slug);
		if (!entry) {
			throw notFound();
		}
		const { title, description, date, slug, image } = entry;
		return { meta: { title, description, date, slug, image } };
	},
	head: ({ loaderData }) => {
		const { meta } = loaderData;
		const url = absoluteUrl(`/blog/${meta.slug}`);
		const ogImage = meta.image
			? absoluteUrl(meta.image)
			: absoluteUrl(siteConfig.ogImage);
		const jsonLd = {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: meta.title,
			description: meta.description,
			datePublished: meta.date,
			url,
			image: ogImage,
			publisher: {
				"@type": "Organization",
				name: siteConfig.siteName,
				url: siteConfig.url,
			},
		};
		return {
			meta: [
				{ title: `${meta.title} | ${siteConfig.siteName} Blog` },
				{ name: "description", content: meta.description },
				{ property: "og:type", content: "article" },
				{ property: "og:url", content: url },
				{ property: "og:title", content: meta.title },
				{ property: "og:description", content: meta.description },
				{ property: "og:image", content: ogImage },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: meta.title },
				{ name: "twitter:description", content: meta.description },
				{ name: "twitter:image", content: ogImage },
			],
			links: [{ rel: "canonical", href: url }],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(jsonLd),
				},
			],
		};
	},
	component: BlogPostPage,
});

function BlogPostPage() {
	const { meta } = Route.useLoaderData();
	const entry = getPostEntryBySlug(meta.slug);
	if (!entry) {
		throw notFound();
	}
	const Body = entry.Component;

	return (
		<BlogShell>
			<article className="container mx-auto max-w-3xl px-6">
				<header className="mb-10">
					<p className="text-muted-foreground mb-2 text-sm">{meta.date}</p>
					<h1 className="font-space text-3xl font-bold text-stellar-white md:text-4xl">
						{meta.title}
					</h1>
					<p className="text-muted-foreground mt-3 text-lg">
						{meta.description}
					</p>
				</header>
				{meta.image ? (
					<div className="not-prose mb-10 overflow-hidden rounded-xl border border-nebula-blue/30 shadow-lg shadow-primary/10">
						<div className="relative aspect-[21/9] w-full bg-nebula-blue/30">
							<img
								src={meta.image}
								alt={meta.title}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				) : null}
				<div className="prose prose-invert prose-lg max-w-none prose-headings:font-space prose-a:text-primary prose-headings:text-stellar-white">
					<Body />
				</div>
			</article>
		</BlogShell>
	);
}
