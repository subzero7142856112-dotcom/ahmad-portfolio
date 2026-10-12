import type { Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

interface SkillTileProps {
  skill: Skill;
  /** "row" = compact horizontal pill for the marquee, "card" = grid card for /skills. */
  layout?: "row" | "card";
  className?: string;
}

/**
 * Single technology tile: colored monogram mark + label, brand-tinted accents,
 * subtle top highlight and a glow that picks up the skill colour on hover.
 */
export function SkillTile({ skill, layout = "row", className }: SkillTileProps) {
  const row = layout === "row";

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-smooth",
        "hover:-translate-y-px hover:border-primary/40 hover:shadow-lift",
        row
          ? "h-14 items-center gap-3.5 rounded-xl border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.014] px-4"
          : "h-full flex-col items-center gap-3 rounded-xl border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.014] px-3 py-4 text-center",
        className,
      )}
    >
      {/* top hairline highlight */}
      <span
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden="true"
      />
      {/* brand-tinted wash on hover */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px 60px at 50% 120%, ${skill.color}1f, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <span
        className={cn(
          "relative grid shrink-0 place-items-center rounded-lg border font-display font-bold transition-transform duration-300 group-hover:scale-105",
          row ? "h-9 w-9 text-[11.5px]" : "h-11 w-11 text-[13px]",
        )}
        style={{
          color: skill.color,
          borderColor: `${skill.color}40`,
          backgroundColor: `${skill.color}14`,
        }}
        aria-hidden="true"
      >
        {skill.mark}
      </span>

      <span
        className={cn(
          "relative font-medium leading-tight text-fg-muted transition-colors duration-300 group-hover:text-fg",
          row ? "whitespace-nowrap text-[14px]" : "text-[12.5px]",
        )}
      >
        {skill.name}
      </span>

      {!row ? (
        <span className="relative text-2xs uppercase tracking-label text-fg-dim transition-colors duration-300 group-hover:text-fg-dim/80">
          {skill.group}
        </span>
      ) : null}
    </div>
  );
}
