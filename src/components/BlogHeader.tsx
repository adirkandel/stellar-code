import { Link } from "@tanstack/react-router";
import stellarcodeLogo from "@/assets/stellarcode-logo.svg";

export default function BlogHeader() {
	return (
		<header className="sticky top-0 z-50 border-b border-white/10 bg-deep-space/90 backdrop-blur-xl shadow-lg shadow-primary/5">
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				<Link to="/" className="flex items-center gap-3">
					<img
						src={stellarcodeLogo}
						alt="Stellar Code"
						className="logo-hover h-8 w-auto"
					/>
				</Link>
				<nav className="flex items-center gap-6">
					<Link
						to="/blog"
						className="text-muted-foreground font-medium transition-stellar hover:text-stellar-white"
						activeProps={{
							className: "font-medium text-primary transition-stellar",
						}}
					>
						Blog
					</Link>
					<Link
						to="/"
						hash="contact"
						className="text-muted-foreground font-medium transition-stellar hover:text-stellar-white"
					>
						Contact
					</Link>
				</nav>
			</div>
		</header>
	);
}
