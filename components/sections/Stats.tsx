import { stats } from "@/data/stats";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <section aria-label="Key statistics" className="relative pb-6 md:pb-10">
      <Container>
        <Reveal className="card overflow-hidden">
          <dl className="grid grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "px-4 py-6 text-center sm:px-6 sm:py-7",
                  index > 0 && "border-l border-line",
                )}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span
                    className={cn(
                      "block font-display text-3xl font-semibold tracking-tight sm:text-[2rem]",
                      stat.accent ? "text-primary-light" : "text-fg",
                    )}
                  >
                    {stat.value !== null ? (
                      <Counter value={stat.value} suffix={stat.suffix} />
                    ) : (
                      stat.text
                    )}
                  </span>
                  <span className="mt-1.5 block text-[12.5px] leading-snug text-fg-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
