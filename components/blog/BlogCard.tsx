import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { IconArrowUpRight, IconCalendar, IconClock } from "@/components/icons";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const published = post.status === "published";

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink-deep">
        <img
          src={post.image}
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-lg border border-line bg-ink-deep/80 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-primary-light backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={`font-semibold leading-snug ${featured ? "text-lg" : "text-[16px]"}`}>
          {published ? (
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors duration-300 hover:text-primary-light"
            >
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-fg-muted">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-[12px] text-fg-dim">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>

          {published ? (
            <Link
              href={`/blog/${post.slug}`}
              className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-light transition-colors duration-300 hover:text-white"
            >
              Read article
              <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span className="ml-auto rounded-md border border-line bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-fg-muted">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
