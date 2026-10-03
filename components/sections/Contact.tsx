import { contactChannels } from "@/data/socials";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { IconGitHub, IconLinkedIn, IconMail, IconPin } from "@/components/icons";

const iconMap = {
  mail: IconMail,
  linkedin: IconLinkedIn,
  github: IconGitHub,
  pin: IconPin,
};

export function Contact() {
  return (
    <section id="contact" className="section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <SectionHeading
              label="Contact"
              title="Let’s Work Together"
              description="Have a project in mind or want to discuss an opportunity? Feel free to reach out."
            />

            <ul className="grid gap-3 sm:grid-cols-2">
              {contactChannels.map((channel) => {
                const Icon = iconMap[channel.icon as keyof typeof iconMap];
                const content = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-primary-light transition-colors duration-300">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-2xs uppercase tracking-label text-fg-dim">
                        {channel.title}
                      </span>
                      <span className="mt-0.5 block text-[14px] font-medium text-fg transition-colors duration-300 group-hover:text-primary-light">
                        {channel.value}
                      </span>
                      <span className="block text-[12.5px] leading-snug text-fg-muted">
                        {channel.description}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.title}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white/[0.025] p-4 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.07]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex h-full items-start gap-3 rounded-xl border border-line bg-white/[0.025] p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-xl border border-line bg-ink-deep/50 p-4">
              <p className="text-[13.5px] leading-relaxed text-fg-muted">
                Based in <span className="text-fg">{personal.location}</span> — available for
                freelance work, collaboration and full-time opportunities.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card h-full p-6 sm:p-7">
              <h3 className="text-lg font-semibold">Send a message</h3>
              <p className="mb-5 mt-1.5 text-[13.5px] text-fg-muted">
                All fields are required. I usually reply within a couple of days.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
