import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, Linkedin, Users, Youtube } from "lucide-react";
import stellarcodeLogo from "@/assets/stellarcode-logo.svg";

const Footer = () => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isImpactPage = pathname.startsWith(
		"/services/agentic-sdlc-impact-method",
	);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<footer className="border-t border-nebula-blue/20 bg-void-black py-16">
			<div className="container mx-auto px-6">
				<div className="grid gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-2">
						<img
							src={stellarcodeLogo}
							alt="Stellar Code"
							className="mb-4 h-10 w-auto"
						/>
						<p className="mb-6 max-w-md text-muted-foreground">
							Building stellar web products together. We partner with SaaS
							startups to create top-tier applications and high-performing
							development teams.
						</p>
						<div className="flex items-center gap-4">
							<a
								href="mailto:akandel@stellar-code.dev"
								className="rounded-lg border border-nebula-blue/30 bg-nebula-blue/20 p-2 text-muted-foreground transition-stellar hover-glow hover:border-primary/30 hover:text-primary"
								aria-label="Email Stellar Code"
							>
								<Mail className="h-5 w-5" />
							</a>
							<a
								href="https://www.linkedin.com/in/adir-kandel/"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg border border-nebula-blue/30 bg-nebula-blue/20 p-2 text-muted-foreground transition-stellar hover-glow hover:border-primary/30 hover:text-primary"
								aria-label="Adir Kandel on LinkedIn"
							>
								<Linkedin className="h-5 w-5" />
							</a>
							<a
								href="https://lotechni.dev"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg border border-nebula-blue/30 bg-nebula-blue/20 p-2 text-muted-foreground transition-stellar hover-glow hover:border-primary/30 hover:text-primary"
								aria-label="לא טכני community"
							>
								<Users className="h-5 w-5" />
							</a>
							<a
								href="https://www.youtube.com/results?search_query=adir+kandel"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg border border-nebula-blue/30 bg-nebula-blue/20 p-2 text-muted-foreground transition-stellar hover-glow hover:border-primary/30 hover:text-primary"
								aria-label="Adir Kandel on YouTube"
							>
								<Youtube className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Services */}
					<div>
						<h3 className="mb-4 font-semibold text-stellar-white">Services</h3>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<Link
									to="/services/agentic-sdlc-impact-method"
									className="transition-stellar hover:text-primary"
								>
									IMPACT Method
								</Link>
							</li>
							{!isImpactPage ? (
								<>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("services")}
											className="transition-stellar hover:text-primary"
										>
											Full-Stack Development
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("services")}
											className="transition-stellar hover:text-primary"
										>
											Cloud Infrastructure
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("services")}
											className="transition-stellar hover:text-primary"
										>
											Dedicated Developers
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("services")}
											className="transition-stellar hover:text-primary"
										>
											Team Training
										</button>
									</li>
								</>
							) : (
								<li>
									<Link to="/" className="transition-stellar hover:text-primary">
										All services
									</Link>
								</li>
							)}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h3 className="mb-4 font-semibold text-stellar-white">Company</h3>
						<ul className="space-y-2 text-muted-foreground">
							{isImpactPage ? (
								<>
									<li>
										<a
											href="#impact-about"
											className="transition-stellar hover:text-primary"
										>
											About
										</a>
									</li>
									<li>
										<a
											href="#impact-faq"
											className="transition-stellar hover:text-primary"
										>
											FAQ
										</a>
									</li>
									<li>
										<a
											href="#impact-interest"
											className="transition-stellar hover:text-primary"
										>
											Contact
										</a>
									</li>
									<li>
										<Link
											to="/"
											className="transition-stellar hover:text-primary"
										>
											Home
										</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("why-us")}
											className="transition-stellar hover:text-primary"
										>
											About Us
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("testimonials")}
											className="transition-stellar hover:text-primary"
										>
											Testimonials
										</button>
									</li>
									<li>
										<button
											type="button"
											onClick={() => scrollToSection("contact")}
											className="transition-stellar hover:text-primary"
										>
											Contact
										</button>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>

				<div className="mt-12 border-t border-nebula-blue/20 pt-8 text-center">
					<p className="text-muted-foreground">
						&copy; {new Date().getFullYear()} Stellar Code. All rights reserved.
						Building the future, one stellar project at a time.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
