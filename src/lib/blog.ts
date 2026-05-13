import type { ComponentType } from "react";

export type PostMeta = {
	title: string;
	description: string;
	date: string;
	slug: string;
	draft?: boolean;
	image?: string;
};

export type PostListItem = Pick<
	PostMeta,
	"title" | "description" | "date" | "slug" | "image"
>;

type PostModule = {
	default: ComponentType;
	meta: PostMeta;
};

const postModules = import.meta.glob("../../content/blog/*.mdx", {
	eager: true,
}) as Record<string, PostModule>;

function isPublished(meta: PostMeta) {
	if (import.meta.env.PROD && meta.draft) {
		return false;
	}
	return true;
}

function entries(): Array<PostMeta & { Component: ComponentType }> {
	return Object.values(postModules)
		.map((mod) => {
			const { default: Component, meta } = mod;
			return { ...meta, Component };
		})
		.filter((p) => isPublished(p));
}

export function getAllPostListItems(): PostListItem[] {
	return entries()
		.sort((a, b) => b.date.localeCompare(a.date))
		.map(({ title, description, date, slug, image }) => ({
			title,
			description,
			date,
			slug,
			image,
		}));
}

export function getPostEntryBySlug(slug: string) {
	return entries().find((p) => p.slug === slug);
}
