"use client";

import { useMemo, useState } from "react";
import { skills, skillFilters, filterGroupMap, type SkillFilterKey } from "@/data/skills";
import { SkillTile } from "@/components/skills/SkillTile";
import { IconClose, IconSearch } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SkillsExplorer() {
  const [active, setActive] = useState<SkillFilterKey>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const groups = filterGroupMap[active];
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      if (!groups.includes(skill.group)) return false;
      if (!q) return true;
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.group.toLowerCase().includes(q) ||
        skill.mark.toLowerCase().includes(q)
      );
    });
  }, [active, query]);

  const filtered = active !== "All" || query.trim().length > 0;

  return (
    <div>
      {/* ---------------- Controls ---------------- */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter technologies by category"
        >
          {skillFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="filter-pill"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <IconSearch
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-dim"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search technologies…"
            aria-label="Search technologies"
            className="h-11 w-full rounded-xl border border-line bg-white/[0.03] pl-10 pr-10 text-[14px] text-fg
              placeholder:text-fg-dim transition-colors duration-300 focus:border-primary/50 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-fg-dim transition-colors hover:bg-white/[0.06] hover:text-fg"
            >
              <IconClose className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} of {skills.length} technologies
      </p>

      {/* ---------------- Results ---------------- */}
      {visible.length > 0 ? (
        <>
          {active === "All" && !query.trim() ? (
            // Organised view: one labelled group per category.
            <div className="mt-10 space-y-10">
              {skillFilters
                .filter((filter) => filter !== "All")
                .map((filter) => {
                  const groups = filterGroupMap[filter];
                  const items = skills.filter((skill) => groups.includes(skill.group));
                  if (items.length === 0) return null;
                  return (
                    <section key={filter} aria-label={filter}>
                      <div className="mb-4 flex items-center gap-3">
                        <h2 className="text-[15px] font-semibold">{filter}</h2>
                        <span className="h-px flex-1 bg-line" aria-hidden="true" />
                        <span className="text-2xs uppercase tracking-label text-fg-dim">
                          {items.length}
                        </span>
                      </div>
                      <ul className="grid grid-cols-2 gap-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {items.map((skill, index) => (
                          <li
                            key={`${skill.group}-${skill.name}`}
                            className="animate-fade-up"
                            style={{ animationDelay: `${Math.min(index * 22, 360)}ms` }}
                          >
                            <SkillTile skill={skill} layout="card" />
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
            </div>
          ) : (
            <ul
              key={`${active}-${query}`}
              className="mt-10 grid grid-cols-2 gap-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
            >
              {visible.map((skill, index) => (
                <li
                  key={`${skill.group}-${skill.name}`}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(index * 22, 360)}ms` }}
                >
                  <SkillTile skill={skill} layout="card" />
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-ink-deep/40 px-6 py-16 text-center">
          <IconSearch className="h-6 w-6 text-fg-dim" aria-hidden="true" />
          <p className="text-[15px] font-semibold">No technologies found</p>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-fg-muted">
            Nothing matches “{query.trim()}”
            {active !== "All" ? ` in ${active}` : ""}. Try a different search or category.
          </p>
          <button
            type="button"
            className={cn("filter-pill")}
            onClick={() => {
              setQuery("");
              setActive("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      {filtered && visible.length > 0 ? (
        <p className="mt-8 text-[13px] text-fg-dim">
          Showing {visible.length} of {skills.length} technologies
          {active !== "All" ? ` in ${active}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}.
        </p>
      ) : null}
    </div>
  );
}
