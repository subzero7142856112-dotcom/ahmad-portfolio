import Link from "next/link";
import type { Project } from "@/data/projects";
import { IconArrowRight, IconShield } from "@/components/icons";

interface ProjectShowcaseProps {
  project: Project;
}

export function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const showcase = project.showcase;
  if (!showcase) return null;

  return (
    <article className="group relative isolate flex min-h-[26rem] overflow-hidden rounded-2xl border border-line shadow-lift transition-[border-color,box-shadow] duration-500 ease-smooth hover:border-primary/35 hover:shadow-glow sm:min-h-[28rem] md:aspect-[2172/724] md:min-h-0">
      {/* Panoramic background — cover, centered, subtle zoom on hover */}
      <img
        src={showcase.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center transition-transform duration-700 ease-smooth motion-reduce:group-hover:scale-100 group-hover:scale-[1.04]"
      />
      {/* Directional scrims: bottom-up on mobile, left-in on desktop — keeps the central architecture visible */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20 md:bg-gradient-to-r md:from-ink md:via-ink/55 md:to-transparent"
      />

      <div className="relative flex w-full flex-col justify-end p-6 sm:p-8 md:max-w-[26rem] md:justify-center md:p-10">
        <p className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-2xs font-semibold uppercase tracking-label text-accent">
          <IconShield className="h-3 w-3" />
          Graduation Project
        </p>

        <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">
          <Link href={`/projects/${project.slug}`} className="transition-colors duration-300 hover:text-primary-light">
            {project.title}
            <span className="sr-only"> — view case study</span>
          </Link>
        </h3>

        <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted sm:text-[15px]">
          {showcase.blurb}
        </p>

        <div className="mt-6">
          <Link href={`/projects/${project.slug}`} className="btn btn-primary btn-sm group/showcase">
            View Project
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/showcase:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
