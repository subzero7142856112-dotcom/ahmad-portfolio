"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "@/components/icons";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={[
        "fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-xl border border-line",
        "bg-surface/90 text-fg-muted shadow-card backdrop-blur transition-all duration-300 ease-smooth",
        "hover:border-primary/50 hover:bg-primary/15 hover:text-white focus-visible:opacity-100",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      <IconArrowUp className="h-5 w-5" />
    </button>
  );
}
