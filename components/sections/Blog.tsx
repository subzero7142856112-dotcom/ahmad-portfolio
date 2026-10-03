import { posts } from "@/data/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/blog/BlogCard";
import { IconArrowRight } from "@/components/icons";

export function Blog() {
  const preview = posts.slice(0, 3);

  return (
    <section id="blog" className="section">
      <Container>
        <Reveal>
          <SectionHeading
            label="Blog"
            title="Latest Articles"
            description="Notes on NLP, security engineering and building applications."
            actions={
              <Button href="/blog" variant="ghost" size="sm" icon={<IconArrowRight className="h-4 w-4" />}>
                View All
              </Button>
            }
          />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((post, index) => (
            <li key={post.slug} className="animate-fade-up" style={{ animationDelay: `${index * 90}ms` }}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
