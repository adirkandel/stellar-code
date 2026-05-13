import { createFileRoute, Link } from "@tanstack/react-router";
import BlogShell from "@/components/BlogShell";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getAllPostListItems } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/blog/")({
	loader: () => ({ posts: getAllPostListItems() }),
	head: () => ({
		meta: [
			{
				title: `Blog | ${siteConfig.siteName}`,
			},
			{
				name: "description",
				content:
					"Articles from Stellar Code on engineering, SaaS delivery, and building high-performing product teams.",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: absoluteUrl("/blog") },
			{ property: "og:title", content: `Blog | ${siteConfig.siteName}` },
			{
				property: "og:description",
				content:
					"Articles from Stellar Code on engineering, SaaS delivery, and building high-performing product teams.",
			},
			{ property: "og:image", content: absoluteUrl(siteConfig.ogImage) },
		],
		links: [{ rel: "canonical", href: absoluteUrl("/blog") }],
	}),
	component: BlogIndexPage,
});

function BlogIndexPage() {
	const { posts } = Route.useLoaderData();

	return (
		<BlogShell>
			<div className="container mx-auto max-w-3xl px-6">
				<h1 className="font-space mb-2 text-3xl font-bold text-stellar-white md:text-4xl">
					Blog
				</h1>
				<p className="text-muted-foreground mb-10 max-w-xl text-lg">
					Notes on shipping software, scaling teams, and the craft of building
					SaaS products.
				</p>
				<ul className="flex flex-col gap-6">
					{posts.map((post) => (
						<li key={post.slug}>
							<Link
								to="/blog/$slug"
								params={{ slug: post.slug }}
								className="block transition-stellar hover:-translate-y-0.5"
							>
								<Card className="border-nebula-blue/30 bg-deep-space/50 hover:border-primary/40">
									<CardHeader>
										<p className="text-muted-foreground mb-1 text-sm">
											{post.date}
										</p>
										<CardTitle className="text-stellar-white">
											{post.title}
										</CardTitle>
										<CardDescription className="text-base">
											{post.description}
										</CardDescription>
									</CardHeader>
								</Card>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</BlogShell>
	);
}
