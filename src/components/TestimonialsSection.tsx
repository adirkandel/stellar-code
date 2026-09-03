import citySystemsLogo from "@/assets/city-systems-logo.svg";
import flamingoLogo from "@/assets/flamingo-logo.png";
import gilAvatar from "@/assets/gil-cohen.jpg";
import izikAvatar from "@/assets/izik.png";
import meckanoLogo from "@/assets/meckano-logo.png";
import mosheAvatar from "@/assets/moshe-tangi.jpg";
import { cn } from "@/lib/utils";

const FACES = [
	{
		name: "Izik Binaev",
		role: "CEO, Flamingo Holdings",
		company: "Flamingo Holdings",
		image: izikAvatar,
		logo: flamingoLogo,
		logoClassName: "h-8",
		quote:
			"Working with Stellar Code was easy and professional. They built our SaaS platform for property management end to end and really understood what we needed.",
	},
	{
		name: "Gil Cohen",
		role: "CEO, Meckano",
		company: "Meckano",
		image: gilAvatar,
		logo: meckanoLogo,
		logoClassName: "h-10",
		quote:
			"They quickly understood our challenges and built a clear, effective structure. It felt like working with a true partner, not just a service provider.",
	},
	{
		name: "Moshe Tangi",
		role: "CEO, City Systems",
		company: "City Systems",
		image: mosheAvatar,
		logo: citySystemsLogo,
		logoClassName: "h-8",
		quote:
			"They led turning our old Windows system into a modern web-based product, managed the team, and made sure everything moved forward smoothly.",
	},
] as const;

const TestimonialsSection = () => {
	return (
		<section id="testimonials" className="relative bg-void-black py-20 md:py-24">
			<div className="container mx-auto px-6">
				<h2 className="mb-12 text-center font-space text-sm font-semibold tracking-[0.2em] text-neon-teal uppercase md:mb-16 md:text-base">
					Founders we have worked with
				</h2>
				<ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
					{FACES.map((person) => (
						<li key={person.name}>
							<figure className="relative overflow-hidden rounded-2xl bg-deep-space">
								<div className="relative aspect-[3/4]">
									<img
										src={person.image}
										alt=""
										className="h-full w-full object-cover object-top"
									/>
									<div
										aria-hidden
										className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent"
									/>
								</div>
								<figcaption className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-16">
									<img
										src={person.logo}
										alt={`${person.company} logo`}
										className={cn(
											"mb-3 w-auto object-contain brightness-0 invert",
											person.logoClassName,
										)}
									/>
									<p className="font-space text-lg font-semibold text-white">
										{person.name}
									</p>
									<p className="mb-3 text-sm text-white/70">{person.role}</p>
									<blockquote className="text-sm leading-relaxed text-white/90">
										“{person.quote}”
									</blockquote>
								</figcaption>
							</figure>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default TestimonialsSection;
