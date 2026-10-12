import { Fragment } from "react";
import type { FlowStage } from "@/data/projects";
import { IconArrowRight } from "@/components/icons";

function Stage({ stage }: { stage: FlowStage }) {
  return (
    <div
      className={[
        // Mobile: full-width column. Desktop: a readable ~176–220px lane that
        // grows with available space but never shrinks into letter-stacking.
        "flex h-full w-full flex-col rounded-xl border p-4 transition-colors duration-300",
        "md:w-auto md:max-w-[220px] md:[flex:1_0_176px]",
        stage.emphasis
          ? "border-primary/45 bg-primary/[0.1] shadow-[0_0_0_1px_rgba(79,125,255,0.18)]"
          : "border-line bg-ink-deep/60",
      ].join(" ")}
    >
      <p
        className={[
          "leading-snug text-[13.5px] font-semibold",
          stage.emphasis ? "text-white" : "text-fg",
        ].join(" ")}
      >
        {stage.label}
      </p>
      {stage.detail?.length ? (
        <ul className="mt-2.5 space-y-1.5">
          {stage.detail.map((item) => (
            <li
              key={item}
              className={[
                "break-words rounded-md border px-2.5 py-1.5 text-left leading-snug font-mono text-2xs",
                stage.emphasis
                  ? "border-white/10 bg-white/[0.05] text-fg-muted"
                  : "border-line bg-white/[0.02] text-fg-dim",
              ].join(" ")}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <span
      className="grid shrink-0 place-items-center self-center text-fg-dim"
      aria-hidden="true"
      style={vertical ? { transform: "rotate(90deg)" } : undefined}
    >
      <IconArrowRight className="h-4 w-4" />
    </span>
  );
}

export function ArchitectureFlow({ stages }: { stages: FlowStage[] }) {
  if (stages.length === 0) return null;

  return (
    <div className="card p-5 sm:p-6">
      <p className="sr-only">System architecture flow</p>

      {/* Horizontal pipeline — stages keep a minimum readable width, so long
          flows scroll sideways instead of crushing words. */}
      <div className="hidden items-stretch gap-2 overflow-x-auto pb-2 md:flex">
        {stages.map((stage, index) => (
          <Fragment key={stage.label}>
            {index > 0 ? <Arrow /> : null}
            <Stage stage={stage} />
          </Fragment>
        ))}
      </div>

      {/* Vertical flow on small screens */}
      <div className="flex flex-col gap-2 md:hidden">
        {stages.map((stage, index) => (
          <Fragment key={stage.label}>
            <Stage stage={stage} />
            {index < stages.length - 1 ? <Arrow vertical /> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
