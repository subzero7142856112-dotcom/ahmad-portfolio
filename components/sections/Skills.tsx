"use client";

import { useMemo, useState } from "react";
import { skills, skillFilters, filterGroupMap, type SkillFilterKey } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState<SkillFilterKey>("All");

  const visible = useMemo(() => {
    const groups = filterGroupMap[active];
    return skills.filter((skill) => groups.includes(skill.group));
  }, [active]);

  return (
    <section id="skills" className="section">
      <Container>
        <Reveal>
          <SectionHeading
            label="Skills"
            title="Skills & Technologies"
            description="Tools and technologies I work with, grouped by how I actually use them."
          />
        </Reveal>

        <Reveal delay={80}>
          <div
            className="mb-7 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter skills by category"
          >
            {skillFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className="filter-pill"
                aria-pressed={active === filter}
                onClick={() => setActive(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} technologies
        </p>

        <ul key={active} className="grid grid-cols-2 gap-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {visible.map((skill, index) => (
            <li
              key={`${skill.group}-${skill.name}`}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index * 25, 400)}ms` }}
            >
              <div
                className="group flex h-full flex-col items-center gap-3 rounded-xl border border-line bg-gradient-to-b from-white/[0.035] to-white/[0.01] px-3 py-4 text-center
                  transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl border font-display text-[13px] font-bold transition-transform duration-300 group-hover:scale-105"
                  style={{
                    color: skill.color,
                    borderColor: `${skill.color}40`,
                    backgroundColor: `${skill.color}14`,
                  }}
                  aria-hidden="true"
                >
                  {skill.mark}
                </span>
                <span className="text-[12.5px] font-medium leading-tight text-fg-muted transition-colors group-hover:text-fg">
                  {skill.name}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className={cn("mt-6 text-[13px] text-fg-dim")}>
            {active === "All"
              ? `${visible.length} technologies across programming, AI/ML, web, mobile, security and tooling.`
              : `${visible.length} technologies in ${active}.`}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
