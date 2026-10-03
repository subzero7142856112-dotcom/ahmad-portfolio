import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { ogImage } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { MetricGrid } from "@/components/projects/MetricGrid";
import { TechList } from "@/components/projects/TechList";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconExternalLink,
  IconGitHub,
} from "@/components/icons";

const githubProfile = socials.find((social) => social.platform === "github")?.href ?? "#";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "dataset", label: "Dataset" },
  { id: "stack", label: "Tech Stack" },
  { id: "results", label: "Results" },
  { id: "challenges", label: "Challenges" },
  { id: "links", label: "Links" },
];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [ogImage.url],
    },
  };
}

function CaseSection({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-36">
      <span className="label">
        <span className="h-px w-6 bg-primary/70" aria-hidden="true" />
        {label}
      </span>
      <h2 className="mt-3 text-2xl font-semibold sm:text-[1.75rem]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = project.caseStudy;
  const githubHref = project.github ?? githubProfile;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const verifiedDatasets = study.datasets.filter((dataset) => dataset.verified);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden border-b border-line pb-10 pt-28 md:pt-32">
        <div
          className="absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-[13px] text-fg-muted transition-colors hover:text-fg"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <ul className="flex flex-wrap gap-2">
                {project.filters.map((filter) => (
                  <li
                    key={filter}
                    className="rounded-lg border border-primary/35 bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary-light"
                  >
                    {filter}
                  </li>
                ))}
              </ul>

              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{project.title}</h1>
              <p className="mt-3 font-mono text-[13px] uppercase tracking-label text-fg-dim">
                {project.categoryLine}
              </p>
              <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-fg-muted">
                {study.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href={githubHref}
                  external
                  variant="primary"
                  icon={<IconGitHub className="h-4 w-4" />}
                  iconPosition="left"
                >
                  View Code
                </Button>
                {project.demo ? (
                  <Button
                    href={project.demo}
                    external
                    variant="ghost"
                    icon={<IconExternalLink className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Live Demo
                  </Button>
                ) : (
                  <span className="btn btn-ghost cursor-not-allowed opacity-60" aria-disabled="true">
                    Live Demo — not deployed
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-line shadow-lift">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={1600}
                  height={1000}
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ---------------- Body ---------------- */}
      <Container className="pb-16 pt-8 md:pb-24">
        <CaseStudyNav items={navItems} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          {/* Sidebar (shown first on mobile so highlights stay close to the hero) */}
          <aside className="lg:order-2 lg:col-start-2 lg:row-start-1">
            <div className="lg:sticky lg:top-36 space-y-4">
              <div className="card p-5">
                <h2 className="text-[15px] font-semibold">Key Features</h2>
                <ul className="mt-4 space-y-2.5">
                  {study.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md bg-primary/15 text-primary-light">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      <span className="text-[13.5px] leading-snug text-fg-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-5">
                <h2 className="text-[15px] font-semibold">Project Details</h2>
                <dl className="mt-4 space-y-3 text-[13.5px]">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-fg-dim">Category</dt>
                    <dd className="text-right text-fg">{project.category}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-fg-dim">Year</dt>
                    <dd className="text-fg">{project.year}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-fg-dim">Type</dt>
                    <dd className="text-right text-fg">{project.categoryLine}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 space-y-14 lg:order-1 lg:col-start-1 lg:row-start-1">
            <Reveal>
              <CaseSection id="overview" label="Overview" title="Project Overview">
                <div className="space-y-4 text-[15px] leading-relaxed text-fg-muted">
                  {study.overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="problem" label="Problem" title="What makes this hard">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {study.problem.map((item) => (
                    <li key={item.title} className="card p-4">
                      <h3 className="text-[14.5px] font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="approach" label="Approach" title="How it is built">
                <ol className="space-y-3">
                  {study.approach.map((step) => (
                    <li
                      key={step.index}
                      className="flex gap-4 rounded-xl border border-line bg-white/[0.02] p-4 transition-colors duration-300 hover:border-primary/35"
                    >
                      <span className="font-mono text-[13px] font-semibold text-primary-light">
                        {step.index}
                      </span>
                      <div>
                        <h3 className="text-[14.5px] font-semibold">{step.title}</h3>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection
                id="architecture"
                label="Architecture"
                title="System architecture"
              >
                <ArchitectureFlow stages={study.architecture} />
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="dataset" label="Dataset" title="Data sources">
                {study.datasets.length > 0 ? (
                  <>
                    <p className="mb-4 text-[13.5px] leading-relaxed text-fg-muted">
                      The list below covers datasets considered for this project. Only sources
                      explicitly marked as verified were confirmed as used in the final pipeline
                      ({verifiedDatasets.length} of {study.datasets.length}).
                    </p>
                    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
                      {study.datasets.map((dataset) => (
                        <li
                          key={dataset.name}
                          className="flex flex-col gap-1.5 bg-white/[0.015] px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4"
                        >
                          <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                            <span className="truncate text-[14px] font-semibold text-fg">
                              {dataset.name}
                            </span>
                            <span
                              className={[
                                "ml-auto shrink-0 rounded-md border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider sm:ml-0",
                                dataset.verified
                                  ? "border-success/40 bg-success/10 text-success"
                                  : "border-line bg-white/[0.03] text-fg-dim",
                              ].join(" ")}
                            >
                              {dataset.verified ? "Used" : "Candidate"}
                            </span>
                          </div>
                          <span className="text-[12.5px] text-fg-dim sm:w-40 sm:shrink-0">
                            {dataset.type}
                          </span>
                          <span className="text-[13px] text-fg-muted">{dataset.note}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="rounded-2xl border border-dashed border-line bg-ink-deep/40 px-6 py-8 text-center text-[13.5px] text-fg-muted">
                    This project does not depend on a labelled dataset.
                  </p>
                )}
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="stack" label="Tech Stack" title="Technology stack">
                <TechList technologies={project.technologies} />
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="results" label="Results" title="Model evaluation">
                <MetricGrid metrics={study.results} />
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="challenges" label="Challenges" title="Challenges & lessons">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {study.challenges.map((item) => (
                    <li key={item.title} className="card p-4">
                      <h3 className="text-[14.5px] font-semibold text-primary-light">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-[15px] font-semibold">Lessons learned</h3>
                <ol className="mt-3 space-y-2.5">
                  {study.lessons.map((lesson, lessonIndex) => (
                    <li key={lesson} className="flex gap-3 text-[13.5px] leading-relaxed text-fg-muted">
                      <span className="font-mono text-[12.5px] text-primary-light">
                        {String(lessonIndex + 1).padStart(2, "0")}
                      </span>
                      {lesson}
                    </li>
                  ))}
                </ol>
              </CaseSection>
            </Reveal>

            <Reveal>
              <CaseSection id="links" label="Links" title="Source & demo">
                <div className="flex flex-wrap gap-3">
                  <Button
                    href={githubHref}
                    external
                    variant="primary"
                    icon={<IconGitHub className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    View Code
                  </Button>
                  {project.demo ? (
                    <Button
                      href={project.demo}
                      external
                      variant="ghost"
                      icon={<IconExternalLink className="h-4 w-4" />}
                      iconPosition="left"
                    >
                      Live Demo
                    </Button>
                  ) : null}
                  <Button href="/#projects" variant="ghost">
                    All projects
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.02] p-4">
                  <span className="text-[13px] text-fg-dim">Next project</span>
                  <Link
                    href={`/projects/${next.slug}`}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-fg transition-colors hover:text-primary-light"
                  >
                    {next.title}
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CaseSection>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
