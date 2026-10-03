import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pb-20 pt-32">
      <Container>
        <p className="font-mono text-[13px] uppercase tracking-label text-primary-light">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">This page doesn’t exist</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
          The link may be outdated, or the page hasn’t been published yet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href="/"
            variant="primary"
            icon={<IconArrowLeft className="h-4 w-4" />}
            iconPosition="left"
          >
            Back to home
          </Button>
          <Link
            href="/#projects"
            className="btn btn-ghost"
          >
            View projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
