"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface CaseStudyNavProps {
  items: { id: string; label: string }[];
}

/** Sticky section navigation. Below `sm` it becomes an edge-to-edge scrollable tab bar. */
export function CaseStudyNav({ items }: CaseStudyNavProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const [active, setActive] = useState(ids[0] ?? "");
  const [scrollable, setScrollable] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Does the row actually overflow? Only then apply the edge fade.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => setScrollable(el.scrollWidth - el.clientWidth > 4);
    update();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ids.length]);

  // Honour a deep link such as /projects/shieldai#results on first paint.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && ids.includes(hash)) setActive(hash);
  }, [ids]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // The last section can never enter the observer's band once the page is
    // scrolled to its end, so fall back to it whenever we are at the bottom.
    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    const resolve = (best: string) => {
      const last = ids[ids.length - 1];
      setActive(atBottom() && last ? last : best);
    };

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) resolve(best);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (atBottom()) {
        const last = ids[ids.length - 1];
        if (last) setActive(last);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  // Keep the active pill visible inside the scrolling row.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const pill = scroller.querySelector<HTMLElement>('[data-active="true"]');
    if (!pill) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = pill.offsetLeft - scroller.clientWidth / 2 + pill.offsetWidth / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [active, scrollable]);

  return (
    <nav aria-label="Case study sections" className="sticky top-[62px] z-30 -mx-5 sm:mx-0">
      <div className="border-y border-line bg-ink/85 px-4 py-2 backdrop-blur-md sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
        <div
          ref={scrollerRef}
          className={`no-scrollbar overflow-x-auto overscroll-x-contain ${scrollable ? "mask-fade-x" : ""}`}
        >
          <ul className="flex w-max min-w-full items-center gap-1.5 sm:rounded-2xl sm:border sm:border-line sm:bg-ink-soft/90 sm:p-1.5 sm:backdrop-blur">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    data-active={isActive ? "true" : undefined}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setActive(item.id)}
                    className={[
                      "inline-flex h-9 items-center whitespace-nowrap rounded-xl px-3.5 text-[13px] font-medium transition-all duration-300",
                      isActive
                        ? "bg-primary/15 text-white shadow-[inset_0_0_0_1px_rgba(79,125,255,0.4)]"
                        : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
