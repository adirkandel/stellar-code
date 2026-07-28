import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { impactFaqs } from "@/lib/impact-service";

const ImpactFaqSection = () => {
	return (
		<section id="impact-faq" className="relative py-24">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />

			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">Questions leaders ask </span>
						<span className="text-primary glow-stellar">before they embed.</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
						Pilots, fit, security, Memory, Policy, tools, and how you know the
						scorecard is working.
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-gradient-card px-5 backdrop-blur-sm md:px-8"
				>
					{impactFaqs.map((faq) => (
						<AccordionItem
							key={faq.id}
							value={faq.id}
							className="border-primary/15"
						>
							<AccordionTrigger className="py-5 text-left font-space text-base font-semibold text-white hover:no-underline hover:text-primary md:text-lg">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="pb-5 text-base leading-relaxed text-stellar-white/85">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};

export default ImpactFaqSection;
