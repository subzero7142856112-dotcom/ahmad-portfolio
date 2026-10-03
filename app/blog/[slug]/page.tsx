import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/blog";
import { ogImage } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconArrowLeft, IconClock, IconCalendar, IconBook } from "@/components/icons";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.isoDate,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const ready = post.status === "published" && (post.body?.length ?? 0) > 0;

  return (
    <article className="pb-20 pt-32 md:pt-36">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] text-fg-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        <header className="mt-6">
          <span className="rounded-lg border border-primary/35 bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary-light">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-fg-dim">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <div className="mt-7 overflow-hidden rounded-2xl border border-line">
          <img
            src={post.image}
            alt=""
            width={1600}
            height={900}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        {ready ? (
          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-fg-muted">
            {post.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-white/[0.02] p-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary-light">
              <IconBook className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">This article is being written</h2>
            <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-fg-muted">
              {post.excerpt} Published drafts will appear here in full — this page is already
              wired up and reserved for the final content.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href="/blog" variant="ghost" size="sm">
                Browse other articles
              </Button>
              <Button href="/#contact" variant="primary" size="sm">
                Get notified
              </Button>
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
