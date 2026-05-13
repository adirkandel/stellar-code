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
			<div className="container mx-auto max-w-6xl px-6">
				<h1 className="font-space mb-2 text-3xl font-bold text-stellar-white md:text-4xl">
					Blog
				</h1>
				<p className="text-muted-foreground mb-10 max-w-xl text-lg">
					Notes on shipping software, scaling teams, and the craft of building
					SaaS products.
				</p>
				<ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{posts.map((post) => (
						<li key={post.slug}>
							<Link
								to="/blog/$slug"
								params={{ slug: post.slug }}
								className="block h-full transition-stellar hover:-translate-y-0.5"
							>
								<Card className="flex h-full flex-col overflow-hidden border-nebula-blue/30 bg-deep-space/50 p-0 hover:border-primary/40">
									<div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-nebula-blue/30">
										{post.image ? (
											<img
												src={post.image}
												alt={post.title}
												className="h-full w-full object-cover"
											/>
										) : (
											<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-nebula-blue/40">
												<span className="text-muted-foreground text-sm font-medium">
													{post.title}
												</span>
											</div>
										)}
									</div>
									<CardHeader className="flex flex-1 flex-col">
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
