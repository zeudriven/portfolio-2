/* eslint-disable @next/next/no-img-element */
import PixelPanel from "@/components/pixel/PixelPanel";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import ProfilePhoto from "@/components/ProfilePhoto";
import AnimatedSprite from "@/components/AnimatedSprite";
import { ChapterTitle, SectionHeading } from "./Headings";
import { journeyStats, milestones, values } from "@/lib/content";

/** CHAPTER 01 — OVERVIEW, part 1: who I am, stats, education, journey, values. */
export default function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-16">
      <ChapterTitle n="01" title="OVERVIEW" sub="The player behind the code — who I am, what I use, and where I've been." />

      <div className="max-w-[1200px] mx-auto px-5 space-y-24 sm:space-y-32 pb-24">
        {/* ---- who I am: photo and text sit at different depths ---- */}
        <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
          <Parallax speed={0.9} className="justify-self-center relative">
            <ProfilePhoto size={220} />
            <Parallax speed={-1.4} className="absolute -right-10 -top-8">
              <AnimatedSprite dir="/assets/objects/anim/leader" frames={4} size={64} fps={5} className="animate-soft-float" />
            </Parallax>
          </Parallax>
          <Parallax speed={-0.35}>
            <ScrollReveal className="p-6 sm:p-8 space-y-5">
              <div className="font-pixel text-[14px] sm:text-[18px] text-green flex items-center gap-2">
                <span>👤</span>
                <span className="pixel-shine section-head" data-text="WHO I AM" style={{ "--card-glow": "var(--glow-green)" } as React.CSSProperties}>
                  WHO I AM
                </span>
              </div>
              <p className="font-body text-[21px] sm:text-[25px] text-text/90 leading-snug">
                Hi! I&apos;m <span className="text-purple">Varun</span> — a Computer Science student at York University (Lassonde) and an{" "}
                <span className="text-cyan">AI Data Engineer at Ayvelis AI</span>. I build privacy-preserving analytics platforms, agentic AI
                pipelines, and full-stack products with FastAPI, React and Python.
              </p>
              <p className="font-body text-[19px] sm:text-[22px] text-muted leading-snug">
                I love shipping real things — from LLM workflow engines to award-winning hackathon builds — and leading teams as Vice
                President of Student Life at Enactus York.
              </p>
            </ScrollReveal>
          </Parallax>
        </div>

        {/* ---- stats: each tile at its own speed, so the row ripples as it passes ---- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {journeyStats.map((s, i) => (
            <Parallax key={s.l} speed={0.2 + i * 0.35}>
              <ScrollReveal delay={i * 0.08}>
                <div className="text-center py-6 sm:py-8">
                  <div className={`font-pixel text-[26px] sm:text-[34px] ${s.tone}`}>{s.v}</div>
                  <div className="font-body text-[17px] sm:text-[19px] text-muted mt-2">{s.l}</div>
                </div>
              </ScrollReveal>
            </Parallax>
          ))}
        </div>

        {/* ---- education + journey ---- */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <Parallax speed={0.3}>
            <ScrollReveal>
              <PixelPanel title="EDUCATION" accent="cyan" icon={<span>🎓</span>} transparent interactive={false}>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src="/assets/book.png"
                    alt=""
                    width={130}
                    height={130}
                    className="shrink-0 w-[130px] h-[130px] animate-soft-float"
                    style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 18px rgba(76,201,255,0.35))" }}
                  />
                  <div className="space-y-3 text-center sm:text-left">
                    <div className="font-pixel text-[14px] text-text leading-snug">BSc (Honours), Computer Science</div>
                    <div className="font-body text-[20px] text-muted">York University — Lassonde School of Engineering</div>
                    <div className="font-body text-[19px] text-cyan">Sep 2023 – Sep 2027 · Toronto, ON</div>
                    <div className="font-body text-[16px] text-green">
                      DSA · OOP · Databases · Software Design · SDLC
                    </div>
                  </div>
                </div>
              </PixelPanel>
            </ScrollReveal>
          </Parallax>

          <Parallax speed={-0.3}>
            <ScrollReveal delay={0.1}>
              <PixelPanel title="JOURNEY SO FAR" accent="purple" icon={<span>📈</span>} transparent interactive={false}>
                <div className="space-y-3 border-l-[2px] border-ink pl-4">
                  {milestones.map((m, i) => (
                    <ScrollReveal key={m.t} delay={i * 0.07} y={14} className="flex items-start gap-3">
                      <span className={`mt-[6px] w-3 h-3 border-2 border-ink ${m.tone} shrink-0`} />
                      <div>
                        <span className="font-pixel text-[10px] text-gold mr-2">{m.y}</span>
                        <span className="font-body text-[18px] text-muted">{m.t}</span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </PixelPanel>
            </ScrollReveal>
          </Parallax>
        </div>

        {/* ---- core values: three floating islands at three depths ---- */}
        <div>
          <SectionHeading icon="❤" title="CORE VALUES" tone="gold" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {values.map((v, i) => (
              <Parallax key={v.t} speed={[-0.5, 0.6, 1.4][i]}>
                <ScrollReveal delay={i * 0.1}>
                  <div className="value-card flex flex-col items-center text-center gap-3 px-4 py-5" style={{ "--card-glow": v.glow } as React.CSSProperties}>
                    <AnimatedSprite dir={v.dir} frames={4} size={120} className="animate-soft-float value-sprite" />
                    <div className={`font-pixel text-[14px] ${v.text} value-title`}>{v.t}</div>
                    <div className="font-body text-[19px] text-muted">{v.d}</div>
                  </div>
                </ScrollReveal>
              </Parallax>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
