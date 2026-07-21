import type { ReactNode } from "react";
import BlogHeader from "@/components/BlogHeader";
import Footer from "@/components/Footer";

export default function BlogShell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-deep-space">
			<BlogHeader />
			<main className="pb-16 pt-8">{children}</main>
			<Footer />
		</div>
	);
}
