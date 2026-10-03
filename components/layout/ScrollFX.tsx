"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll effects:
 * 1. Reading-progress bar pinned under the top of the viewport.
 * 2. Sections fade/slide in as they enter the viewport (with a stagger on their
 *    cards). Content that is already on screen at mount is left alone so there
 *    is never a flash of hidden content.
 */
export function ScrollFX() {
  // How far up the viewport a section must travel before it animates.
  // 0.72 = it starts when the section has climbed ~28% from the bottom edge,
  // so the whole animation plays on screen instead of finishing off-frame.
  const REVEAL_AT = 0.72;
  const barRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // ---- reading progress -------------------------------------------------
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // ---- reveal sections on scroll ---------------------------------------
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const register = () => {
      const sections = [...document.querySelectorAll<HTMLElement>("main section")].filter(
        (el) => !el.hasAttribute("data-fx-off"),
      );

      sections.forEach((el) => {
        if (el.classList.contains("fx-in")) return; // already revealed
        if (reduce) {
          el.classList.add("fx-in");
          return;
        }
        if (el.classList.contains("fx-wait")) return;

        // Anything visible at first paint is left alone — hiding it would
        // cause a blink. Only fully off-screen sections are held back.
        if (el.getBoundingClientRect().top < window.innerHeight) return;

        el.classList.add("fx-wait");

        // Only the outermost block animates — never anything nested inside a
        // card (chips, titles and paragraphs stay put).
        const kids = [...el.querySelectorAll<HTMLElement>(".card, article")]
          .filter((kid) => {
            if (kid.hasAttribute("data-reveal") || kid.closest("[data-reveal]")) return false;
            return !kid.parentElement?.closest(".card, article");
          })
          .slice(0, 12);
        kids.forEach((kid, index) => {
          kid.classList.add("fx-kid");
          kid.style.setProperty("--fx-delay", `${index * 90}ms`);
        });
      });
    };

    // A plain position sweep (rather than IntersectionObserver) so sections
    // that jump straight past the viewport — anchor links, fast scrolls —
    // are never left stuck hidden.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * REVEAL_AT;
      document
        .querySelectorAll<HTMLElement>("main section.fx-wait:not(.fx-in)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < limit) el.classList.add("fx-in");
        });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const timer = window.setTimeout(() => {
      register();
      sweep();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }, 60);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-accent to-violet shadow-[0_0_12px_rgba(79,125,255,0.55)]"
      />
    </div>
  );
}
