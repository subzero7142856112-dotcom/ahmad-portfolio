"use client";

import Link from "next/link";
import { skills } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SkillMarquee } from "@/components/skills/SkillMarquee";
import { IconArrowRight } from "@/components/icons";

// Interleave so both rows carry a balanced mix of categories.
const topRow = skills.filter((_, index) => index % 2 === 0);
const bottomRow = skills.filter((_, index) => index % 2 === 1);

export function Skills() {
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
          {/* Each row carries its own edge fade (mask on .marquee); no shared
              wrapper, tint or glow behind them so cards dissolve straight into
              the page background. */}
          <div className="space-y-6">
            <SkillMarquee items={topRow} direction="right" duration={58} />
            <SkillMarquee items={bottomRow} direction="left" duration={68} />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-col items-center gap-4 text-center">
            <p className="text-[13px] text-fg-dim">
              {skills.length} technologies across programming, AI/ML, web, mobile, security and
              tooling.
            </p>
            <Link
              href="/skills"
              className="group btn-ghost"
              aria-label="Explore all technologies"
            >
              <span>Explore All</span>
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
