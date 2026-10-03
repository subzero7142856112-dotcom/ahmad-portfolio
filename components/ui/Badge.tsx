import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "outline";
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  dot = false,
  pulse = false,
  className,
}: BadgeProps) {
  const styles = {
    default: "border-line bg-white/[0.04] text-fg-muted",
    primary: "border-primary/40 bg-primary/10 text-primary-light",
    success: "border-success/30 bg-success/10 text-success",
    outline: "border-line-strong bg-transparent text-fg",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium",
        styles,
        className,
      )}
    >
      {dot ? (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full bg-success",
              pulse && "animate-pulse-dot",
            )}
          />
        </span>
      ) : null}
      {children}
    </span>
  );
}
