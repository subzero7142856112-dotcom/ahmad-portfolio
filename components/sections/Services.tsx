import { services, type Service } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconBrain,
  IconCode,
  IconShield,
  IconPuzzle,
} from "@/components/icons";

const iconMap: Record<Service["icon"], typeof IconBrain> = {
  brain: IconBrain,
  code: IconCode,
  shield: IconShield,
  puzzle: IconPuzzle,
};

/**
 * Per-card internal lighting, inspired by the reference: a soft colour wash
 * sweeping in from one corner plus a deep glow pooling at the opposite edge.
 * Restrained portfolio-palette hues keep the four cards coordinated.
 */
const cardGlows: Record<Service["id"], { wash: string; pool: string }> = {
  "ai-ml": {
    wash: "radial-gradient(130% 100% at 100% 0%, rgba(124,107,255,0.20) 0%, rgba(124,107,255,0.06) 38%, transparent 62%)",
    pool: "radial-gradient(120% 90% at 0% 100%, rgba(79,125,255,0.16) 0%, transparent 55%)",
  },
  software: {
    wash: "radial-gradient(130% 100% at 100% 0%, rgba(79,125,255,0.20) 0%, rgba(79,125,255,0.06) 38%, transparent 62%)",
    pool: "radial-gradient(120% 90% at 0% 100%, rgba(34,211,238,0.13) 0%, transparent 55%)",
  },
  security: {
    wash: "radial-gradient(130% 100% at 100% 0%, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.05) 38%, transparent 62%)",
    pool: "radial-gradient(120% 90% at 0% 100%, rgba(53,96,230,0.16) 0%, transparent 55%)",
  },
  "problem-solving": {
    wash: "radial-gradient(130% 100% at 100% 0%, rgba(52,211,153,0.16) 0%, rgba(52,211,153,0.05) 38%, transparent 62%)",
    pool: "radial-gradient(120% 90% at 0% 100%, rgba(124,107,255,0.13) 0%, transparent 55%)",
  },
};

export function Services() {
  return (
    <section id="services" className="section scroll-mt-24 pt-4 md:pt-6">
      <Container>
        <SectionHeading
          label="What I Do"
          title="Four areas I work in"
          description="Each area maps to projects I have built and tools I use day to day."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const glows = cardGlows[service.id];
            return (
              <Reveal key={service.id} delay={index * 90} className="h-full">
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08]
                    bg-[#0a0c12] p-6 shadow-card transition-[transform,border-color,box-shadow] duration-400 ease-smooth
                    hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-lift"
                >
                  {/* internal ambient lighting */}
                  <span
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                    style={{ background: glows.wash }}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{ background: glows.pool }}
                    aria-hidden="true"
                  />
                  {/* top-edge catch light */}
                  <span
                    className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
                    aria-hidden="true"
                  />

                  <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light transition-colors duration-300 group-hover:border-primary/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-[16px] font-semibold">{service.title}</h3>
                  <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-fg-muted">
                    {service.description}
                  </p>
                  <ul className="relative mt-5 flex flex-wrap gap-1.5">
                    {service.items.map((item) => (
                      <li key={item}>
                        <span className="chip !text-[11px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
