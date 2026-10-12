import Link from "next/link";
import type { Project } from "@/data/projects";
import { socials } from "@/data/socials";
import { IconArrowRight, IconGitHub, IconShield, IconSpark } from "@/components/icons";

const githubProfile = socials.find((social) => social.platform === "github")?.href ?? "#";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const githubHref = project.github ?? githubProfile;
  const isHero = project.highlight === "hero";
  const previewTechnologies = project.technologies.slice(0, isHero ? 6 : 4);
  const remaining = project.technologies.length - previewTechnologies.length;

  if (isHero) {
    return (
      <article className="card card-hover group relative flex h-full flex-col overflow-hidden md:flex-row md:items-stretch">
        {/* Gradient border accent */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[linear-gradient(130deg,rgba(79,125,255,0.6),rgba(34,211,238,0.25)_40%,transparent_70%)] p-px [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]"
        />
        {/* Soft corner glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        />

        <Link
          href={`/projects/${project.slug}`}
          className="relative block aspect-[16/10] shrink-0 overflow-hidden border-b border-line bg-ink-deep md:aspect-auto md:w-[46%] md:border-b-0 md:border-r"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={project.image}
            alt=""
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/50 bg-primary/20 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-primary-light backdrop-blur">
              <IconSpark className="h-3 w-3" />
              Featured
            </span>
            <span className="rounded-lg border border-line bg-ink-deep/80 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-fg-muted backdrop-blur">
              {project.category}
            </span>
          </span>
        </Link>

        <div className="relative flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-label text-accent">
            <IconShield className="h-3.5 w-3.5" />
            Graduation Project
          </div>

          <h3 className="mt-3 text-2xl font-semibold md:text-[1.75rem]">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors duration-300 hover:text-primary-light"
            >
              {project.title}
              <span className="sr-only"> — view case study</span>
            </Link>
          </h3>

          <p className="mt-3 line-clamp-4 flex-1 text-[14.5px] leading-relaxed text-fg-muted md:line-clamp-3">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {previewTechnologies.map((tech) => (
              <li key={tech} className="chip !text-[11px]">
                {tech}
              </li>
            ))}
            {remaining > 0 ? (
              <li className="chip !text-[11px] !text-fg-dim">+{remaining}</li>
            ) : null}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5">
            <Link
              href={`/projects/${project.slug}`}
              className="btn btn-primary btn-sm"
            >
              View Case Study
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={githubHref}
              target={githubHref.startsWith("http") ? "_blank" : undefined}
              rel={githubHref.startsWith("http") ? "noreferrer noopener" : undefined}
              className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors duration-300 hover:text-fg"
            >
              <IconGitHub className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-ink-deep"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={project.image}
          alt=""
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-lg border border-line bg-ink-deep/80 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-fg-muted backdrop-blur">
          {project.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-300 hover:text-primary-light"
          >
            {project.title}
            <span className="sr-only"> — view case study</span>
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-fg-muted">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {previewTechnologies.map((tech) => (
            <li key={tech} className="chip !text-[11px]">
              {tech}
            </li>
          ))}
          {remaining > 0 ? (
            <li className="chip !text-[11px] !text-fg-dim">+{remaining}</li>
          ) : null}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-light transition-colors duration-300 hover:text-white"
          >
            View Project
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href={githubHref}
            target={githubHref.startsWith("http") ? "_blank" : undefined}
            rel={githubHref.startsWith("http") ? "noreferrer noopener" : undefined}
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors duration-300 hover:text-fg"
          >
            <IconGitHub className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
