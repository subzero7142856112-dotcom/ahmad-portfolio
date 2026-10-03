import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Skills />
      <ProjectsSection />
      <Experience />
      <Education />
      <Blog />
      <Contact />
    </>
  );
}
