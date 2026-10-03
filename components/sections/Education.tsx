import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconGraduation, IconCalendar, IconSpark, IconBook } from "@/components/icons";

export function Education() {
  return (
    <section id="education" className="section">
      <Container>
        <Reveal>
          <SectionHeading
            label="Education"
            title="Education"
            description="Academic background and the graduation project that started my focus on security and ML."
          />
        </Reveal>

        <div className="grid gap-5">
          {education.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 100}>
              <article className="card overflow-hidden">
                <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-7">
                  <div className="flex items-center gap-4 md:block">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-violet/15 text-primary-light">
                      <IconGraduation className="h-7 w-7" />
                    </span>
                    <div className="md:mt-3">
                      <p className="font-mono text-2xs uppercase tracking-label text-fg-dim">
                        University
                      </p>
                      <p className="mt-1 text-[13.5px] font-semibold leading-snug text-fg">
                        {entry.university}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold sm:text-[1.4rem]">{entry.degree}</h3>
                        <p className="mt-1.5 flex items-center gap-2 text-[13.5px] text-fg-muted">
                          <IconCalendar className="h-4 w-4" />
                          {entry.period}
                          <span className="text-fg-dim">·</span>
                          {entry.location}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[14.5px] leading-relaxed text-fg-muted">
                      {entry.summary}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="chip">
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 rounded-xl border border-line bg-ink-deep/60 p-4">
                      <p className="flex items-center gap-2 text-2xs uppercase tracking-label text-primary-light">
                        <IconSpark className="h-3.5 w-3.5" />
                        Graduation Project
                      </p>
                      <p className="mt-2 text-[15px] font-semibold text-fg">
                        {entry.graduationProject.title}
                      </p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
                        {entry.graduationProject.description}
                      </p>
                      {entry.graduationProject.supervisor ? (
                        <p className="mt-2 flex items-center gap-2 text-[12.5px] text-fg-dim">
                          <IconBook className="h-3.5 w-3.5" />
                          Supervisor: {entry.graduationProject.supervisor}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
