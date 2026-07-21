/// <reference types="vite/client" />

declare module "*.mdx" {
	import type { ComponentType } from "react";
	import type { PostMeta } from "@/lib/blog";
	export const meta: PostMeta;
	const MDXContent: ComponentType;
	export default MDXContent;
}
