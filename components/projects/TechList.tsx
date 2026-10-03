import { skills } from "@/data/skills";

export function TechList({ technologies }: { technologies: string[] }) {
  if (technologies.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {technologies.map((technology) => {
        const match = skills.find(
          (skill) => skill.name.toLowerCase() === technology.toLowerCase(),
        );
        const color = match?.color ?? "#4f7dff";
        const mark = match?.mark ?? technology.replace(/[^A-Za-z0-9+#]/g, "").slice(0, 3);

        return (
          <li
            key={technology}
            className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.025] px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border font-display text-[12px] font-bold"
              style={{
                color,
                borderColor: `${color}40`,
                backgroundColor: `${color}14`,
              }}
              aria-hidden="true"
            >
              {mark}
            </span>
            <span className="min-w-0 break-words text-[13.5px] font-medium leading-snug text-fg">
              {technology}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
