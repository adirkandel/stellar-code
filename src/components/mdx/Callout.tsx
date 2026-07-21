import type { ReactNode } from "react";

export function Callout({ children }: { children: ReactNode }) {
	return (
		<div className="my-6 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-stellar-white not-prose">
			{children}
		</div>
	);
}
