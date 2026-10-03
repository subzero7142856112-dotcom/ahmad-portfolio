import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/icons";

/** Right-side hero visual: floating cyber katana (transparent PNG) + soft glow. */
function HeroKatana() {
  return (
    <div
      className="relative flex justify-center lg:-ml-6 lg:justify-end xl:-ml-10"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(79,125,255,0.22),rgba(34,211,238,0.10)_55%,transparent_80%)] blur-3xl" />

      <div className="hero-float relative w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[470px] lg:max-w-[540px] xl:max-w-[640px]">
        <img
          src="/general images/Neon Cyber Katana Code Storm.png"
          alt=""
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
          className="h-auto w-full object-contain drop-shadow-[0_14px_36px_rgba(79,125,255,0.25)]"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden pb-16 pt-28 md:pt-36 lg:pb-24 lg:pt-40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal delay={60}>
              <Badge variant="success" dot pulse>
                {personal.availability}
              </Badge>
            </Reveal>

            <Reveal delay={140}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
                <span className="block text-fg">Hi, I’m</span>
                <span className="text-gradient mt-1 block">{personal.fullName}</span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 text-xl font-medium text-fg sm:text-2xl">{personal.role}</p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-fg-muted sm:text-base">
                {personal.heroDescription}
              </p>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href="#projects"
                  variant="primary"
                  icon={<IconArrowRight className="h-4 w-4" />}
                >
                  View My Projects
                </Button>
                <Button href="#contact" variant="ghost">
                  Contact Me
                </Button>
              </div>
            </Reveal>

            <Reveal delay={460}>
              <div className="mt-9 flex items-center gap-4">
                <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
                <SocialLinks size="sm" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={280} className="relative">
            <HeroKatana />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
