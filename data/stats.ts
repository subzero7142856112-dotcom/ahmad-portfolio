export interface Stat {
  /** Numeric value. Set to null to render static text instead of a counter. */
  value: number | null;
  suffix?: string;
  /** Rendered when value is null (e.g. "AI / ML"). */
  text?: string;
  label: string;
  /** Short delay order for the staggered entrance. */
  accent?: boolean;
}

/**
 * Placeholder statistics taken from the design reference.
 * Update these to verified numbers before publishing — nothing here is
 * presented as an independently verified achievement.
 */
export const stats: Stat[] = [
  { value: 8, suffix: "+", label: "Major Projects", accent: true },
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: null, text: "AI / ML", label: "Specialization", accent: true },
  { value: 16, suffix: "+", label: "Technologies" },
];
