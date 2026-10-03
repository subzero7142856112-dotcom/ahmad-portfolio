import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  actions,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const hasActions = actions !== undefined && actions !== null && actions !== false;

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 md:mb-12",
        centered && "items-center text-center",
        hasActions && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        <span className="label">
          <span className="h-px w-6 bg-primary/70" aria-hidden="true" />
          {label}
        </span>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-fg-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {hasActions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
