import { personal } from "@/data/personal";
import { education } from "@/data/education";
import { asset } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconDownload, IconPin, IconGraduation, IconCpu } from "@/components/icons";

const focusAreas = [
  "Artificial Intelligence",
  "Cybersecurity",
  "Software Development",
  "Web & Mobile",
];

export function About() {
  const first = education[0];

  return (
    <section id="about" className="section">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              label="About"
              title="About Me"
              description="Computer Engineering graduate focused on applied AI, secure systems and shipping real products."
            />

            <div className="space-y-4 text-[15.5px] leading-relaxed text-fg-muted">
              {personal.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-fg">{personal.aboutHighlight}</p>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <li key={area}>
                  <span className="chip">{area}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={personal.cvPath}
                variant="primary"
                download
                icon={<IconDownload className="h-4 w-4" />}
                iconPosition="left"
              >
                Download CV
              </Button>
              <Button href="#contact" variant="ghost">
                Get in touch
              </Button>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card overflow-hidden">
              <div className="relative overflow-hidden border-b border-line bg-gradient-to-br from-primary/20 via-violet/10 to-accent/10 px-6 py-8">
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -right-4 -top-16 h-40 w-40 rounded-full border border-white/5"
                  aria-hidden="true"
                />
                <div className="relative flex items-end justify-between gap-4">
                  <img
                    src={`${asset("/general images/logo.png")}?v=2`}
                    alt=""
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-2xl border border-white/15 object-contain shadow-glow"
                  />
                  <span className="rounded-lg border border-white/15 bg-ink-deep/60 px-3 py-1.5 font-mono text-2xs text-fg-muted">
                    {personal.location}
                  </span>
                </div>
                <p className="relative mt-5 font-display text-xl font-semibold text-fg">
                  {personal.fullName}
                </p>
                <p className="relative mt-1 text-[13.5px] text-fg-muted">{personal.role}</p>
              </div>

              <dl className="divide-y divide-line">
                {[
                  {
                    icon: <IconGraduation className="h-4 w-4" />,
                    label: "Education",
                    value: first ? first.degree : personal.degree,
                    sub: first ? first.university : personal.university,
                  },
                  {
                    icon: <IconCpu className="h-4 w-4" />,
                    label: "Focus",
                    value: "AI / ML · NLP · Security",
                    sub: "Web & mobile product engineering",
                  },
                  {
                    icon: <IconPin className="h-4 w-4" />,
                    label: "Based in",
                    value: personal.location,
                    sub: "Open to remote opportunities",
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3 px-6 py-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03] text-primary-light">
                      {row.icon}
                    </span>
                    <div className="min-w-0">
                      <dt className="text-2xs uppercase tracking-label text-fg-dim">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 text-[14px] font-medium text-fg">{row.value}</dd>
                      <dd className="text-[12.5px] text-fg-muted">{row.sub}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
