import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, type MouseEvent } from "react";
import stellarcodeLogo from "@/assets/stellarcode-logo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type SiteNavItem = {
	id: string;
	label: string;
	href: string;
};

type SiteNavBarProps = {
	items: readonly SiteNavItem[];
	ctaLabel: string;
	onCtaClick: () => void;
	/** When set, highlights the matching nav item */
	activeId?: string;
	/**
	 * In-page navigation handler. When provided, link clicks call this
	 * instead of following the href (href remains for progressive enhancement).
	 */
	onItemNavigate?: (item: SiteNavItem) => void;
};

export function SiteNavBar({
	items,
	ctaLabel,
	onCtaClick,
	activeId,
	onItemNavigate,
}: SiteNavBarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleItemClick = (item: SiteNavItem, e: MouseEvent<HTMLAnchorElement>) => {
		if (!onItemNavigate) return;
		e.preventDefault();
		onItemNavigate(item);
		setIsOpen(false);
	};

	const handleCta = () => {
		onCtaClick();
		setIsOpen(false);
	};

	const linkClass = (id: string, size: "desktop" | "mobile") =>
		cn(
			"font-medium transition-stellar hover:text-primary",
			size === "mobile" && "text-lg",
			activeId === id
				? "text-primary"
				: "text-muted-foreground hover:text-stellar-white",
		);

	return (
		<nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-deep-space/30 shadow-lg shadow-primary/5 backdrop-blur-xl">
			<div className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link to="/" className="flex cursor-pointer items-center gap-3">
						<img
							src={stellarcodeLogo}
							alt="Stellar Code"
							className="logo-hover h-8 w-auto"
						/>
					</Link>

					<div className="hidden items-center space-x-8 lg:flex">
						{items.map((item) => (
							<a
								key={item.id}
								href={item.href}
								onClick={(e) => handleItemClick(item, e)}
								className={linkClass(item.id, "desktop")}
							>
								{item.label}
							</a>
						))}
					</div>

					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={handleCta}
							className="hidden rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-stellar hover-glow hover:-translate-y-0.5 lg:block"
						>
							{ctaLabel}
						</button>

						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<button
									type="button"
									className="p-2 text-stellar-white lg:hidden"
									aria-label="Open menu"
								>
									<Menu className="h-6 w-6" />
								</button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[300px] border-l border-white/10 bg-deep-space/95 backdrop-blur-xl"
							>
								<div className="mt-8 flex flex-col gap-8">
									{items.map((item) => (
										<a
											key={item.id}
											href={item.href}
											onClick={(e) => handleItemClick(item, e)}
											className={linkClass(item.id, "mobile")}
										>
											{item.label}
										</a>
									))}
									<button
										type="button"
										onClick={handleCta}
										className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-stellar hover-glow"
									>
										{ctaLabel}
									</button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
}
