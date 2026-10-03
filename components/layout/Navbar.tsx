"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks } from "@/data/nav";
import { personal } from "@/data/personal";
import { useActiveSection, useLockBodyScroll, useScrolled, useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  IconArrowUpRight,
  IconClose,
  IconDownload,
  IconMenu,
} from "@/components/icons";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(20);
  const reduced = useReducedMotion();
  const onHome = pathname === "/";
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    [],
  );
  const activeSection = useActiveSection(sectionIds, onHome);
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const hrefFor = (href: string) => (onHome ? href : `/${href}`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth",
          scrolled ? "glass shadow-nav" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
            scrolled ? "hairline opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        />
        <Container>
          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-300 ease-smooth",
              scrolled ? "h-[62px]" : "h-[74px]",
            )}
          >
            <Link
              href={hrefFor("#home")}
              className="group flex items-center gap-3"
              aria-label={`${personal.fullName} — home`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary/40 bg-gradient-to-br from-primary/25 to-violet/15 text-[13px] font-bold tracking-wider text-primary-light transition-all duration-300 group-hover:border-primary/70 group-hover:shadow-glow">
                {personal.initials}
              </span>
              <span className="hidden text-[14px] font-semibold tracking-tight text-fg sm:block">
                {personal.fullName}
              </span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = onHome
                  ? activeSection === id
                  : (link.href === "#blog" && pathname.startsWith("/blog")) ||
                    (link.href === "#projects" && pathname.startsWith("/projects"));
                return (
                  <li key={link.href}>
                    <Link
                      href={hrefFor(link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-300",
                        isActive ? "text-white" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-primary transition-all duration-300",
                          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                href={personal.cvPath}
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
                download
                icon={<IconDownload className="h-4 w-4" />}
                iconPosition="left"
              >
                Download CV
              </Button>

              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg transition-colors hover:border-primary/45 hover:text-white lg:hidden"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ---------- Mobile menu ---------- */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink-deep/85 backdrop-blur-md transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-line bg-ink-soft/95 shadow-2xl transition-transform duration-400 ease-smooth",
            open ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="text-[13px] font-semibold tracking-tight text-fg">
              {personal.fullName}
            </span>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-primary/45 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {navLinks.map((link, index) => {
                const id = link.href.replace("#", "");
                const isActive = onHome
                  ? activeSection === id
                  : (link.href === "#blog" && pathname.startsWith("/blog")) ||
                    (link.href === "#projects" && pathname.startsWith("/projects"));
                return (
                  <li
                    key={link.href}
                    className="transition-all duration-400 ease-smooth"
                    style={{
                      transitionDelay: open ? `${60 + index * 35}ms` : "0ms",
                      opacity: open ? 1 : 0,
                      transform: open ? "translateX(0)" : "translateX(16px)",
                    }}
                  >
                    <Link
                      href={hrefFor(link.href)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-white"
                          : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                      )}
                    >
                      {link.label}
                      <span className="text-2xs text-fg-dim">0{index + 1}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-4 border-t border-line px-5 py-5">
            <Button
              href={personal.cvPath}
              variant="primary"
              className="w-full"
              download
              icon={<IconDownload className="h-4 w-4" />}
              iconPosition="left"
            >
              Download CV
            </Button>
            <SocialLinks size="sm" />
            <a
              href={hrefFor("#contact")}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-primary-light transition-colors hover:text-white"
            >
              Start a conversation
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
