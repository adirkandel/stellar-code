const CONSENT_STORAGE_KEY = "stellar-code-consent";
export const CONSENT_OPEN_EVENT = "stellar-cookie-settings";

export type ConsentPreferences = {
	analytics: boolean;
};

export function getStoredConsent(): ConsentPreferences | null {
	if (typeof window === "undefined") return null;
	try {
		const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
		if (!value) return null;

		// Backward compatibility with earlier accept/decline strings
		if (value === "accepted") return { analytics: true };
		if (value === "declined") return { analytics: false };

		const parsed = JSON.parse(value) as Partial<ConsentPreferences>;
		if (typeof parsed.analytics === "boolean") {
			return { analytics: parsed.analytics };
		}
		return null;
	} catch {
		return null;
	}
}

export function setStoredConsent(preferences: ConsentPreferences) {
	try {
		window.localStorage.setItem(
			CONSENT_STORAGE_KEY,
			JSON.stringify(preferences),
		);
	} catch {
		// Ignore storage failures (private mode, blocked storage, etc.)
	}
}

/** Reopen cookie preferences from anywhere (e.g. footer). */
export function openCookieSettings() {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
