import { Briefcase, Building2, Linkedin, Mail, Send, User } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { IMPACT_FORM_SUBMIT_LABEL, IMPACT_ROLES } from "@/lib/impact-service";

const ImpactInterestForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		company: "",
		role: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = () => {
		const next: Record<string, string> = {};

		if (!formData.name.trim()) next.name = "Name is required";
		if (!formData.email.trim()) {
			next.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			next.email = "Invalid email address";
		}
		if (!formData.role) next.role = "Role is required";

		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		try {
			const res = await fetch("/api/impact-interest", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = (await res.json().catch(() => ({}))) as { error?: string };

			if (!res.ok) {
				throw new Error(data.error || `Request failed (${res.status})`);
			}

			toast({
				title: "Interest received",
				description:
					"Thanks - we'll follow up about an IMPACT pilot conversation.",
			});
			setFormData({ name: "", email: "", company: "", role: "" });
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.";
			toast({
				variant: "destructive",
				title: "Could not submit",
				description: `${message} You can also reach us at akandel@stellar-code.dev`,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="impact-interest" className="relative py-24">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-2xl text-center">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">Schedule a </span>
						<span className="text-primary glow-stellar">pilot</span>
					</h2>
					<p className="mb-3 text-lg text-stellar-white/85">
						Interested in a pilot? Leave your details and we'll get back to you.
					</p>
					<p className="text-sm text-stellar-white/70">
						Or reach out directly:{" "}
						<a
							href="mailto:akandel@stellar-code.dev"
							className="text-primary underline-offset-2 hover:underline"
						>
							akandel@stellar-code.dev
						</a>
						{" · "}
						<a
							href="https://www.linkedin.com/in/adir-kandel/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
						>
							<Linkedin className="h-3.5 w-3.5" aria-hidden />
							LinkedIn
						</a>
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="mx-auto max-w-xl space-y-5 rounded-xl border border-primary/20 bg-gradient-card p-8 backdrop-blur-sm"
				>
					<div>
						<div className="relative">
							<User className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-stellar-white/85" />
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={(e) => {
									setFormData((prev) => ({ ...prev, name: e.target.value }));
									if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
								}}
								placeholder="Your Name"
								className="w-full rounded-lg border border-nebula-blue/30 bg-input py-3 pr-4 pl-12 text-white outline-none transition-stellar placeholder:text-stellar-white/85 focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>
						</div>
						{errors.name && (
							<p className="mt-1 text-sm text-destructive">{errors.name}</p>
						)}
					</div>

					<div>
						<div className="relative">
							<Mail className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-stellar-white/85" />
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={(e) => {
									setFormData((prev) => ({ ...prev, email: e.target.value }));
									if (errors.email)
										setErrors((prev) => ({ ...prev, email: "" }));
								}}
								placeholder="Work Email"
								className="w-full rounded-lg border border-nebula-blue/30 bg-input py-3 pr-4 pl-12 text-white outline-none transition-stellar placeholder:text-stellar-white/85 focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>
						</div>
						{errors.email && (
							<p className="mt-1 text-sm text-destructive">{errors.email}</p>
						)}
					</div>

					<div>
						<div className="relative">
							<Briefcase className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-stellar-white/85" />
							<select
								name="role"
								value={formData.role}
								onChange={(e) => {
									setFormData((prev) => ({ ...prev, role: e.target.value }));
									if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
								}}
								className="w-full appearance-none rounded-lg border border-nebula-blue/30 bg-input py-3 pr-4 pl-12 text-white outline-none transition-stellar focus:border-primary focus:ring-2 focus:ring-primary/20"
							>
								<option value="" disabled>
									Your Role
								</option>
								{IMPACT_ROLES.map((role) => (
									<option key={role} value={role}>
										{role}
									</option>
								))}
							</select>
						</div>
						{errors.role && (
							<p className="mt-1 text-sm text-destructive">{errors.role}</p>
						)}
					</div>

					<div>
						<div className="relative">
							<Building2 className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-stellar-white/85" />
							<input
								type="text"
								name="company"
								value={formData.company}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, company: e.target.value }))
								}
								placeholder="Company (Optional)"
								className="w-full rounded-lg border border-nebula-blue/30 bg-input py-3 pr-4 pl-12 text-white outline-none transition-stellar placeholder:text-stellar-white/85 focus:border-primary focus:ring-2 focus:ring-primary/20"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-6 py-4 font-semibold text-primary-foreground transition-stellar hover-glow hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isSubmitting ? (
							<>
								<div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
								Sending...
							</>
						) : (
							<>
								{IMPACT_FORM_SUBMIT_LABEL}
								<Send className="h-5 w-5" />
							</>
						)}
					</button>
				</form>
			</div>
		</section>
	);
};

export default ImpactInterestForm;
