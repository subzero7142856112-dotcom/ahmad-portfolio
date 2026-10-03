import type { Metadata } from "next";
import { posts } from "@/data/blog";
import { ogImage } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and notes on NLP, cybersecurity, machine learning and building applications by Ahmad Al-Zawahrah.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog | Ahmad Al-Zawahrah",
    description:
      "Articles and notes on NLP, cybersecurity, machine learning and building applications.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ahmad Al-Zawahrah",
    description:
      "Articles and notes on NLP, cybersecurity, machine learning and building applications.",
    images: [ogImage.url],
  },
};

export default function BlogIndexPage() {
  return (
    <div className="pb-20 pt-32 md:pt-36">
      <Container>
        <Reveal>
          <span className="label">
            <span className="h-px w-6 bg-primary/70" aria-hidden="true" />
            Blog
          </span>
        <h1 className="mt-3 text-4xl font-semibold sm:text-[2.75rem]">Articles & Notes</h1>
        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-fg-muted">
          Longer-form writing about NLP, security engineering and the applications I build.
          Drafts below will go live as they are finished.
        </p>
        <h2 className="sr-only">All articles</h2>
      </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
