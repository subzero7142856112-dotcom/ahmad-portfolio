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
            return (
              <Reveal key={service.id} delay={index * 90} className="h-full">
                <article className="card card-hover flex h-full flex-col p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light transition-colors duration-300 group-hover:border-primary/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[15.5px] font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-fg-muted">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
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
