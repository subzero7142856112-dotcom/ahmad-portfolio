import { useMemo } from "react";

interface ShieldShowcaseStarsProps {
  /** Number of stars to render. */
  count?: number;
}

/**
 * Deterministic starfield for the ShieldAI showcase.
 *
 * Star positions come from a seeded PRNG (mulberry32) so the layout is stable
 * across renders and between server and client — no hydration mismatch.
 */
export function ShieldShowcaseStars({ count = 46 }: ShieldShowcaseStarsProps) {
  const stars = useMemo(() => {
    let seed = 0x9e3779b9;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 1.8,
      dur: 2.4 + rand() * 3.4,
      delay: rand() * 5,
      drift: 8 + rand() * 7,
      tint: rand() > 0.72,
    }));
  }, [count]);

  return (
    <div className="shield-showcase-stars" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.tint ? "#22d3ee" : "#e6f1ff",
            boxShadow: star.tint
              ? "0 0 6px 1px rgba(34, 211, 238, 0.45)"
              : "0 0 6px 1px rgba(138, 168, 255, 0.3)",
            ["--dur" as string]: `${star.dur}s`,
            ["--delay" as string]: `${star.delay}s`,
            ["--drift" as string]: `${star.drift}s`,
          }}
        />
      ))}
    </div>
  );
}
