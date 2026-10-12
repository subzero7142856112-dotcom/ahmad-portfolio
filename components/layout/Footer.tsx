import Link from "next/link";
import { footerLinks } from "@/data/nav";
import { personal } from "@/data/personal";
import { asset } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-ink-deep/60">
      <Container>
        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="max-w-sm">
            <Link href="#home" className="inline-flex items-center gap-3">
              <img
                src={asset("/general images/logo.png")}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg border border-primary/40 object-cover"
              />
              <span className="text-[15px] font-semibold tracking-tight text-fg">
                {personal.fullName}
              </span>
            </Link>
            <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted">{personal.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks size="sm" />
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-5 text-[12.5px] text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personal.fullName}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript & Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
