"use client";

import { useMemo, useState } from "react";
import { projects, projectFilters, type ProjectFilterKey } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { IconArrowRight } from "@/components/icons";

export function ProjectsSection() {
  const [active, setActive] = useState<ProjectFilterKey>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.filters.includes(active)),
    [active],
  );

  return (
    <section id="projects" className="section">
      <Container>
        <Reveal>
          <SectionHeading
            label="Projects"
            title="Featured Projects"
            description="A selection of my recent work across AI, security, web and mobile."
          />
        </Reveal>

        <Reveal delay={80}>
          <div
            className="mb-8 flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectFilters.map((filter) => (
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
            <span className="ml-auto hidden text-[12.5px] text-fg-dim sm:block" role="status">
              {visible.length} {visible.length === 1 ? "project" : "projects"}
            </span>
          </div>
        </Reveal>

        <ul
          key={active}
          className="grid gap-5 sm:grid-cols-2"
          aria-live="polite"
          aria-label="Project list"
        >
          {visible.map((project, index) => (
            <li
              key={project.slug}
              className={`animate-fade-up ${project.highlight === "hero" ? "sm:col-span-2" : ""}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line px-6 py-10 text-center text-sm text-fg-muted">
            No projects in this category yet.
          </p>
        ) : null}

        <Reveal delay={120}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">Have a project in mind?</h3>
                <p className="mt-2 max-w-md text-[14.5px] text-fg-muted">
                  Let’s work together to turn an idea into something people can actually use.
                </p>
              </div>
              <Button
                href="#contact"
                variant="primary"
                icon={<IconArrowRight className="h-4 w-4" />}
              >
                Contact Me
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
