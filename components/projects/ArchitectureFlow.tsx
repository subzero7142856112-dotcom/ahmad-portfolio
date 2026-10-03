import type { FlowStage } from "@/data/projects";
import { IconArrowRight } from "@/components/icons";

function Stage({ stage }: { stage: FlowStage }) {
  return (
    <div
      className={[
        "min-w-0 flex-1 rounded-xl border p-4 transition-colors duration-300",
        stage.emphasis
          ? "border-primary/45 bg-primary/[0.1] shadow-[0_0_0_1px_rgba(79,125,255,0.18)]"
          : "border-line bg-ink-deep/60",
      ].join(" ")}
    >
      <p
        className={[
          "break-words text-[13.5px] font-semibold",
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
                "break-words rounded-md border px-2 py-1.5 text-center font-mono text-2xs",
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
      className="grid shrink-0 place-items-center text-fg-dim"
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

      {/* Horizontal flow on larger screens */}
      <div className="no-scrollbar hidden items-stretch gap-2 overflow-x-auto md:flex">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex min-w-0 flex-1 items-stretch gap-2">
            {index > 0 ? (
              <span className="grid place-items-center text-fg-dim" aria-hidden="true">
                <IconArrowRight className="h-4 w-4" />
              </span>
            ) : null}
            <Stage stage={stage} />
          </div>
        ))}
      </div>

      {/* Vertical flow on small screens */}
      <div className="flex flex-col gap-2 md:hidden">
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex min-w-0 flex-col gap-2">
            <Stage stage={stage} />
            {index < stages.length - 1 ? <Arrow vertical /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
