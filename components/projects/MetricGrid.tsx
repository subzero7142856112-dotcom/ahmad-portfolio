import type { Metric } from "@/data/projects";

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-ink-deep/40 px-6 py-8 text-center">
        <p className="text-[14px] font-medium text-fg">Model Evaluation</p>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-fg-muted">
          Verified accuracy, precision, recall and F1 results will be published here once the
          evaluation is confirmed.
        </p>
      </div>
    );
  }

  const hasValues = metrics.some((metric) => metric.value !== null);

  return (
    <div>
      {!hasValues ? (
        <p className="mb-4 inline-flex rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-fg-muted">
          Values pending verified evaluation results.
        </p>
      ) : null}

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="min-w-0 rounded-xl border border-line bg-gradient-to-b from-white/[0.04] to-white/[0.012] p-4 text-center transition-colors duration-300 hover:border-primary/40"
          >
            <dt className="text-[12px] uppercase tracking-wider text-fg-dim">{metric.label}</dt>
            <dd className="mt-2 break-words font-display text-2xl font-semibold text-fg sm:text-[1.75rem]">
              {metric.value ?? (
                <span className="text-fg-dim" title="Value not yet published">
                  —
                </span>
              )}
            </dd>
            {metric.hint ? (
              <dd className="mt-1 break-words text-[11.5px] leading-snug text-fg-dim">{metric.hint}</dd>
            ) : null}
          </div>
        ))}
      </dl>
    </div>
  );
}
