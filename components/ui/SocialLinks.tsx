import { socials } from "@/data/socials";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { cn } from "@/lib/utils";

const icons = {
  github: IconGitHub,
  linkedin: IconLinkedIn,
  email: IconMail,
};

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md";
}

export function SocialLinks({ className, showLabels = false, size = "md" }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {socials.map((social) => {
        const Icon = icons[social.platform as keyof typeof icons];
        if (!Icon) return null;
        return (
          <li key={social.platform}>
            <a
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
              aria-label={social.label}
              className={cn(
                "group inline-flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.03] text-fg-muted",
                "transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10 hover:text-white",
                size === "sm" ? "h-10 w-10 justify-center" : "h-11 px-4",
              )}
            >
              <Icon className="h-[18px] w-[18px] transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5" />
              {showLabels ? (
                <span className="text-[13px] font-medium">{social.label}</span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
