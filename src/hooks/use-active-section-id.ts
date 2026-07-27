import { useEffect, useState } from "react";

/** Keeps nav highlight in sync with the URL hash when that section exists in the DOM. */
export function useActiveSectionId(fallbackId: string) {
	const [activeId, setActiveId] = useState(fallbackId);

	useEffect(() => {
		const syncHash = () => {
			const hash = window.location.hash.replace("#", "");
			if (hash && document.getElementById(hash)) {
				setActiveId(hash);
			}
		};

		syncHash();
		window.addEventListener("hashchange", syncHash);
		return () => window.removeEventListener("hashchange", syncHash);
	}, []);

	return [activeId, setActiveId] as const;
}
