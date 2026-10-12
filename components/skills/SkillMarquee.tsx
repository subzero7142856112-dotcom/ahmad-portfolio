import type { Skill } from "@/data/skills";
import { cn } from "@/lib/utils";
import { SkillTile } from "@/components/skills/SkillTile";

interface SkillMarqueeProps {
  items: Skill[];
  /** "left" = content drifts right-to-left, "right" = left-to-right. */
  direction?: "left" | "right";
  /** Full-loop duration in seconds. */
  duration?: number;
  className?: string;
}

/**
 * Infinite horizontal slider. The item list is rendered twice inside one track;
 * each group carries an identical trailing gap (pr) equal to the item gap, so
 * translating the track by exactly -50% lands on a pixel-identical frame —
 * the loop reset is invisible. Edge fade + reduced-motion fallback live in
 * globals.css. The animation never pauses on hover or focus.
 */
export function SkillMarquee({
  items,
  direction = "left",
  duration = 55,
  className,
}: SkillMarqueeProps) {
  const group = (copy: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-3.5 pr-3.5"
      aria-hidden={copy ? "true" : undefined}
      data-copy={copy ? "" : undefined}
    >
      {items.map((skill) => (
        <li key={`${copy ? "b" : "a"}-${skill.group}-${skill.name}`} className="shrink-0">
          <SkillTile skill={skill} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee mask-fade-marquee", className)}>
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
