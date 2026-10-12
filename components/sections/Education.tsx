"use client";

import { useCallback, useEffect, useState } from "react";
import { education, type CertificateInfo } from "@/data/education";
import { useLockBodyScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconGraduation,
  IconCalendar,
  IconSpark,
  IconBook,
  IconClose,
  IconArrowUpRight,
} from "@/components/icons";

function CertificateLightbox({
  certificate,
  title,
  onClose,
}: {
  certificate: CertificateInfo;
  title: string;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/85 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} certificate`}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-zoom-out"
        aria-label="Close certificate viewer"
        onClick={onClose}
        tabIndex={-1}
      />

      <div
        className="lightbox-panel relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft shadow-lift"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-fg">{title}</p>
            <p className="truncate text-[12px] text-fg-dim">
              {certificate.issuedOn} · {certificate.duration} · S/N {certificate.serial}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="filter-pill"
              aria-pressed={zoomed}
              onClick={() => setZoomed((value) => !value)}
            >
              {zoomed ? "Zoom out" : "Zoom in"}
            </button>
            <button
              type="button"
              autoFocus
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-primary/45 hover:text-white"
              onClick={onClose}
              aria-label="Close certificate viewer"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-ink-deep p-3 sm:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={certificate.image}
            alt={certificate.imageAlt}
            width={1280}
            height={905}
            className={cn(
              "mx-auto h-auto w-full max-w-full rounded-lg border border-line transition-transform duration-300 ease-smooth",
              zoomed ? "max-w-none scale-150 cursor-zoom-out" : "cursor-zoom-in",
            )}
            style={{ transformOrigin: "center top" }}
            onClick={() => setZoomed((value) => !value)}
          />
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const [activeCert, setActiveCert] = useState<{
    certificate: CertificateInfo;
    title: string;
  } | null>(null);

  useLockBodyScroll(activeCert !== null);

  return (
    <section id="education" className="section">
      <Container>
        <Reveal>
          <SectionHeading
            label="Education"
            title="Education"
            description="Academic background, professional training, and the graduation project that started my focus on security and ML."
          />
        </Reveal>

        <div className="grid gap-5">
          {education.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 100}>
              <article className="card overflow-hidden">
                <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-7">
                  <div className="flex items-center gap-4 md:block">
                    <span
                      className={cn(
                        "grid h-16 w-16 shrink-0 place-items-center rounded-2xl border text-primary-light",
                        entry.kind === "diploma"
                          ? "border-accent/30 bg-gradient-to-br from-accent/15 to-primary/15"
                          : "border-primary/30 bg-gradient-to-br from-primary/20 to-violet/15",
                      )}
                    >
                      {entry.kind === "diploma" ? (
                        <IconBook className="h-7 w-7" />
                      ) : (
                        <IconGraduation className="h-7 w-7" />
                      )}
                    </span>
                    <div className="md:mt-3">
                      <p className="font-mono text-2xs uppercase tracking-label text-fg-dim">
                        {entry.kind === "diploma" ? "Academy" : "University"}
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
                          {entry.location ? (
                            <>
                              <span className="text-fg-dim">·</span>
                              {entry.location}
                            </>
                          ) : null}
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

                    {entry.graduationProject ? (
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
                    ) : null}

                    {entry.certificate ? (
                      <div className="mt-5 rounded-xl border border-line bg-ink-deep/60 p-4">
                        <p className="flex items-center gap-2 text-2xs uppercase tracking-label text-accent">
                          <IconBook className="h-3.5 w-3.5" />
                          Certificate
                        </p>
                        <dl className="mt-2.5 grid grid-cols-1 gap-1.5 text-[13px] sm:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <dt className="text-fg-dim">Issued</dt>
                            <dd className="text-fg-muted">{entry.certificate.issuedOn}</dd>
                          </div>
                          <div className="flex items-center gap-2">
                            <dt className="text-fg-dim">Duration</dt>
                            <dd className="text-fg-muted">{entry.certificate.duration}</dd>
                          </div>
                          <div className="flex items-center gap-2">
                            <dt className="text-fg-dim">S/N</dt>
                            <dd className="font-mono text-[12.5px] text-fg-muted">
                              {entry.certificate.serial}
                            </dd>
                          </div>
                        </dl>
                        <button
                          type="button"
                          className="btn-ghost btn-sm mt-3.5"
                          onClick={() =>
                            setActiveCert({
                              certificate: entry.certificate!,
                              title: entry.degree,
                            })
                          }
                        >
                          View Certificate
                          <IconArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      {activeCert ? (
        <CertificateLightbox
          certificate={activeCert.certificate}
          title={activeCert.title}
          onClose={() => setActiveCert(null)}
        />
      ) : null}
    </section>
  );
}
