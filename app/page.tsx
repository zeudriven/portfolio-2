import LeapIntro from "@/components/leap/LeapIntro";
import ScrollHeader from "@/components/ScrollHeader";
import WorldBackdrop from "@/components/world/WorldBackdrop";
import ScrollWalker from "@/components/world/ScrollWalker";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ContactSection from "@/components/sections/ContactSection";

/**
 * Opens with LeapIntro (the film → pixel dive → "LEVEL 01"), then the whole portfolio is one
 * continuous parallax scroll through a pixel night world:
 *
 *   Hero
 *   CHAPTER 01 · OVERVIEW        About → Skills → Experience
 *   CHAPTER 02 · PROJECT SHOWCASE pinned full-screen project scenes
 *   Epilogue                      Contact + résumé
 *
 * The world (WorldBackdrop) and the walking character (ScrollWalker) are fixed layers
 * driven by the page scroll; content lives in <main> between them.
 */
export default function Home() {
  return (
    <>
      <WorldBackdrop />
      <ScrollHeader />
      <LeapIntro />
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectShowcase />
        <ContactSection />
      </main>
      <ScrollWalker />
    </>
  );
}
