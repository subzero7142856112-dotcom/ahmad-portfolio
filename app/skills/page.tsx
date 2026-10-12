import type { Metadata } from "next";
import { skills } from "@/data/skills";
import { ogImage } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SkillsExplorer } from "@/components/skills/SkillsExplorer";
import { IconArrowLeft } from "@/components/icons";
import Link from "next/link";

const description =
  "The full technology stack — programming languages, AI/ML, web, mobile, cybersecurity and tools — with category filters and search.";

export const metadata: Metadata = {
  title: "Skills",
  description,
  alternates: { canonical: "/skills" },
  openGraph: {
    type: "website",
    url: "/skills",
    title: "Skills & Technologies | Ahmad Al-Zawahrah",
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Technologies | Ahmad Al-Zawahrah",
    description,
    images: [ogImage.url],
  },
};

export default function SkillsPage() {
  return (
    <div className="pb-20 pt-32 md:pt-36">
      <Container>
        <Reveal>
          <Link
            href="/#skills"
            className="inline-flex items-center gap-2 text-[13px] text-fg-muted transition-colors hover:text-fg"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Skills
          </Link>

          <h1 className="mt-6 text-4xl font-semibold sm:text-[2.75rem]">
            Skills & <span className="text-gradient">Technologies</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-fg-muted">
            {skills.length} technologies across programming, AI/ML, web, mobile, security and
            tooling. Filter by category or search to find a specific technology.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <SkillsExplorer />
        </Reveal>
      </Container>
    </div>
  );
}
