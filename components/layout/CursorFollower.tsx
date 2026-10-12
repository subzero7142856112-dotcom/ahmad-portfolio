"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='link'], [role='tab'], [role='menuitem'], input, textarea, select, label, summary, [data-cursor-hover]";

/**
 * Custom cursor: a tight primary-blue dot plus a slower trailing ring.
 * Only activates on fine-pointer devices with no reduced-motion preference;
 * otherwise the native cursor is left untouched.
 */
export function CursorFollower() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("cursor-follower-active");

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let scale = 1;
    let hovering = false;
    let pressed = false;
    let visible = false;
    let frame = 0;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      wrap.dataset.visible = next ? "true" : "false";
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      hovering = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      ring.dataset.hover = hovering ? "true" : "false";
      dot.dataset.hover = hovering ? "true" : "false";
    };

    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => setVisible(false);

    const tick = () => {
      // Dot is snappy, ring trails — the offset between them creates the smooth glide.
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      const goal = (hovering ? 1.9 : 1) * (pressed ? 0.8 : 1);
      scale += (goal - scale) * 0.14;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

      frame = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      root.classList.remove("cursor-follower-active");
    };
  }, []);

  return (
    <div ref={wrapRef} className="cursor-follower" data-visible="false" aria-hidden="true">
      <div ref={ringRef} className="cursor-follower-ring" />
      <div ref={dotRef} className="cursor-follower-dot" />
    </div>
  );
}
