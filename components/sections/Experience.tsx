import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/icons";

export function Experience() {
  return (
    <section id="experience" className="section">
      <Container>
        <Reveal>
          <SectionHeading
            label="Experience"
            title="Work Experience"
            description="Roles and project work where I applied engineering skills in practice."
          />
        </Reveal>

        <ol className="relative">
          {experience.map((item, index) => (
            <li key={item.id} className="relative pb-7 pl-9 last:pb-0">
              <span
                className="absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-primary bg-ink"
                aria-hidden="true"
              >
                <span className="h-1 w-1 rounded-full bg-primary-light" />
              </span>
              {index !== experience.length - 1 ? (
                <span
                  className="absolute left-[6.5px] top-6 h-full w-px bg-line"
                  aria-hidden="true"
                />
              ) : null}

              <Reveal delay={index * 100}>
                <article className="card card-hover p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-[16.5px] font-semibold">{item.role}</h3>
                      <p className="mt-1 text-[14px] text-primary-light">{item.organisation}</p>
                    </div>
                    <span className="shrink-0 rounded-lg border border-line bg-white/[0.03] px-3 py-1 font-mono text-2xs text-fg-muted">
                      {item.period}
                    </span>
                  </div>

                  {item.summary ? (
                    <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
                      {item.summary}
                    </p>
                  ) : null}

                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md bg-primary/15 text-primary-light">
                          <IconCheck className="h-3 w-3" />
                        </span>
                        <span className="text-[13.5px] leading-relaxed text-fg-muted">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li key={tag} className="chip !text-[11px]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
