/* eslint-disable @next/next/no-img-element */
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelProgressBar from "@/components/pixel/PixelProgressBar";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import AnimatedSprite from "@/components/AnimatedSprite";
import { SectionHeading } from "./Headings";
import { enjoy, skillGroups, techStack } from "@/lib/content";

/** CHAPTER 01 — OVERVIEW, part 2: what I build, tech stack, skill levels. */
export default function SkillsSection() {
  return (
    <section id="skills" className="wide-zoom relative scroll-mt-16 py-16 sm:py-24">
      <div className="max-w-[1200px] lg:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-5 lg:px-10">
        <SectionHeading icon="⚡" title="SKILLS & TECH STACK" sub="The toolkit I reach for — and what I like building with it." tone="cyan" />

        {/* what I enjoy building */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-10">
          {enjoy.map((e, i) => (
            <Parallax key={e.t} speed={[0.2, 0.8, 1.4][i]}>
              <ScrollReveal delay={i * 0.1}>
                <div className="p-5 flex items-center gap-4 lg:gap-6 h-full">
                  <AnimatedSprite dir={e.dir} frames={4} size={72} fps={6} className="shrink-0 lg:!w-32 lg:!h-32" />
                  <div>
                    <div className="font-pixel text-[12px] sm:text-[13px] lg:text-[18px] text-text leading-snug">{e.t}</div>
                    <div className="font-body text-[18px] lg:text-[24px] text-muted mt-2 lg:mt-3 leading-snug">{e.d}</div>
                  </div>
                </div>
              </ScrollReveal>
            </Parallax>
          ))}
        </div>
      </div>

      {/* tech stack marquee — full bleed */}
      <ScrollReveal className="mt-20 sm:mt-28">
        <div
          className="overflow-hidden py-5"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="flex w-max gap-16 lg:gap-24" style={{ animation: "techscroll 26s linear infinite" }}>
            {[...techStack, ...techStack, ...techStack, ...techStack].map((t, idx) => (
              <div key={idx} className="flex items-center gap-3 lg:gap-4 shrink-0">
                <img src={t.logo} alt={idx < techStack.length ? t.l : ""} className="w-10 h-10 lg:w-14 lg:h-14 shrink-0" style={{ imageRendering: "auto" }} />
                <span className="font-body text-[24px] lg:text-[32px] text-text leading-none">{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* skill bars — three panels at three depths */}
      <div className="max-w-[1200px] lg:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-5 lg:px-10 mt-20 sm:mt-28 grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">
        {skillGroups.map((g, i) => (
          <Parallax key={g.title} speed={[0.1, 0.7, 1.3][i]}>
            <ScrollReveal delay={i * 0.1}>
              <PixelPanel title={g.title} accent={g.accent} transparent interactive={false} bodyClassName="space-y-4 lg:space-y-6">
                {g.items.map((s) => (
                  <PixelProgressBar key={s.l} label={s.l} value={s.v} tone="green" />
                ))}
              </PixelPanel>
            </ScrollReveal>
          </Parallax>
        ))}
      </div>
    </section>
  );
}
