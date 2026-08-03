import { Link } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { Cookie, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
	CONSENT_OPEN_EVENT,
	type ConsentPreferences,
	getStoredConsent,
	setStoredConsent,
} from "@/lib/consent";
import { cn } from "@/lib/utils";

type View = "hidden" | "bubble" | "customize";

export default function ConsentBanner() {
	const titleId = useId();
	const descriptionId = useId();
	const necessaryId = useId();
	const analyticsId = useId();

	const [hydrated, setHydrated] = useState(false);
	const [prefs, setPrefs] = useState<ConsentPreferences | null>(null);
	const [view, setView] = useState<View>("hidden");
	const [analyticsDraft, setAnalyticsDraft] = useState(false);

	useEffect(() => {
		const stored = getStoredConsent();
		setPrefs(stored);
		setAnalyticsDraft(stored?.analytics ?? false);
		setView(stored ? "hidden" : "bubble");
		setHydrated(true);
	}, []);

	useEffect(() => {
		const onOpen = () => {
			const stored = getStoredConsent();
			setPrefs(stored);
			setAnalyticsDraft(stored?.analytics ?? false);
			setView("customize");
		};
		window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
		return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
	}, []);

	const save = (next: ConsentPreferences) => {
		setStoredConsent(next);
		setPrefs(next);
		setAnalyticsDraft(next.analytics);
		setView("hidden");
	};

	const closeCustomize = () => {
		// Dismiss is never Accept — return to bubble if undecided, otherwise hide.
		if (prefs === null) {
			setAnalyticsDraft(false);
			setView("bubble");
			return;
		}
		setAnalyticsDraft(prefs.analytics);
		setView("hidden");
	};

	if (!hydrated || view === "hidden") {
		return prefs?.analytics ? <Analytics /> : null;
	}

	const isCustomize = view === "customize";

	return (
		<>
			{prefs?.analytics ? <Analytics /> : null}

			{isCustomize ? (
				<button
					type="button"
					aria-label="Close cookie settings backdrop"
					className="fixed inset-0 z-[99] bg-void-black/70 backdrop-blur-sm animate-in fade-in-0 duration-300"
					onClick={closeCustomize}
				/>
			) : null}

			<div
				role="dialog"
				aria-modal={isCustomize}
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				className={cn(
					"fixed z-[100] origin-bottom-right border border-nebula-blue/30 bg-void-black/95 text-stellar-white shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[width,transform,box-shadow] duration-300 ease-out",
					isCustomize
						? "bottom-6 right-6 w-[min(100vw-1.5rem,26rem)] scale-100 rounded-2xl p-0 md:bottom-8 md:right-8"
						: "bottom-6 right-6 w-[min(100vw-1.5rem,22rem)] scale-100 rounded-2xl p-5 md:bottom-8 md:right-8",
				)}
			>
				{isCustomize ? (
					<div className="animate-in fade-in-0 zoom-in-95 origin-bottom-right duration-300">
						<div className="flex items-start justify-between gap-3 border-b border-nebula-blue/25 px-5 py-4">
							<div className="flex items-center gap-2">
								<span className="flex h-8 w-8 items-center justify-center rounded-lg border border-nebula-blue/30 bg-nebula-blue/20 text-primary">
									<Cookie className="h-4 w-4" />
								</span>
								<h2
									id={titleId}
									className="font-space text-base font-semibold text-stellar-white"
								>
									Cookie settings
								</h2>
							</div>
							<button
								type="button"
								onClick={closeCustomize}
								className="rounded-md p-1.5 text-muted-foreground transition-stellar hover:bg-nebula-blue/30 hover:text-stellar-white"
								aria-label="Close cookie settings"
							>
								<X className="h-4 w-4" />
							</button>
						</div>

						<div className="space-y-4 px-5 py-4">
							<p
								id={descriptionId}
								className="text-muted-foreground text-sm leading-relaxed"
							>
								Choose which optional cookies to allow. Necessary cookies are
								always on. See our{" "}
								<Link
									to="/privacy"
									className="text-primary underline underline-offset-4 hover:text-primary/90"
								>
									Privacy Policy
								</Link>
								.
							</p>

							<div className="space-y-3">
								<div className="rounded-xl border border-nebula-blue/25 bg-deep-space/60 p-4">
									<div className="flex items-center justify-between gap-3">
										<label
											htmlFor={necessaryId}
											className="font-space text-sm font-semibold text-stellar-white"
										>
											Necessary
										</label>
										<span className="rounded-full border border-nebula-blue/40 bg-nebula-blue/20 px-2.5 py-0.5 text-xs text-muted-foreground">
											Always on
										</span>
									</div>
									<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
										Required for basic site function and remembering your cookie
										choice.
									</p>
									<input
										id={necessaryId}
										type="checkbox"
										checked
										disabled
										className="sr-only"
										readOnly
									/>
								</div>

								<div className="rounded-xl border border-nebula-blue/25 bg-deep-space/60 p-4">
									<div className="flex items-center justify-between gap-3">
										<label
											htmlFor={analyticsId}
											className="font-space text-sm font-semibold text-stellar-white"
										>
											Analytics
										</label>
										<Switch
											id={analyticsId}
											checked={analyticsDraft}
											onCheckedChange={setAnalyticsDraft}
										/>
									</div>
									<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
										Helps us understand how the site is used so we can improve
										it. Off by default until you allow it.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2 border-t border-nebula-blue/25 px-5 py-4 sm:flex-row sm:justify-end">
							<Button
								type="button"
								variant="outline"
								className="border-nebula-blue/40 bg-transparent text-stellar-white hover:bg-nebula-blue/30 hover:text-stellar-white"
								onClick={() => save({ analytics: false })}
							>
								Reject optional
							</Button>
							<Button
								type="button"
								onClick={() => save({ analytics: analyticsDraft })}
							>
								Save preferences
							</Button>
						</div>
					</div>
				) : (
					<div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
						<div className="mb-3 flex items-center gap-2">
							<span className="flex h-8 w-8 items-center justify-center rounded-lg border border-nebula-blue/30 bg-nebula-blue/20 text-primary">
								<Cookie className="h-4 w-4" />
							</span>
							<h2
								id={titleId}
								className="font-space text-base font-semibold text-stellar-white"
							>
								We value your privacy
							</h2>
						</div>
						<p
							id={descriptionId}
							className="text-muted-foreground mb-4 text-sm leading-relaxed"
						>
							We use necessary cookies to run the site and optional analytics
							cookies to improve it.{" "}
							<Link
								to="/privacy"
								className="text-primary underline underline-offset-4 hover:text-primary/90"
							>
								Privacy Policy
							</Link>
						</p>
						<div className="flex flex-col gap-2">
							<Button type="button" onClick={() => save({ analytics: true })}>
								Accept all
							</Button>
							<Button
								type="button"
								variant="outline"
								className="border-nebula-blue/40 bg-transparent text-stellar-white hover:bg-nebula-blue/30 hover:text-stellar-white"
								onClick={() => save({ analytics: false })}
							>
								Reject optional
							</Button>
							<button
								type="button"
								className="text-muted-foreground pt-1 text-sm underline-offset-4 transition-stellar hover:text-primary hover:underline"
								onClick={() => {
									setAnalyticsDraft(false);
									setView("customize");
								}}
							>
								Customize
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
