/* eslint-disable @next/next/no-img-element */
import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import RotatingCharacter from "@/components/RotatingCharacter";
import SectionProgress from "@/components/SectionProgress";

const journeyStats = [
  { v: "5+", l: "Major Projects", tone: "text-green" },
  { v: "5+", l: "Awards Won", tone: "text-cyan" },
  { v: "2", l: "Active Roles", tone: "text-purple" },
  { v: "2027", l: "Grad Year", tone: "text-gold" },
];
const milestones = [
  { y: "2023", t: "Started BSc Computer Science at York (Lassonde)", tone: "bg-green" },
  { y: "2025", t: "Director of Student Life @ Enactus York", tone: "bg-cyan" },
  { y: "2026", t: "Won Best UI/UX @ Scotiabank CaseHacks", tone: "bg-gold" },
  { y: "2026", t: "AI Data Engineer @ Ayvelis AI", tone: "bg-purple" },
];
const enjoy = [
  { icon: "🤖", t: "AI Workflow Engines", d: "LLM + agentic pipelines (OpenAI, N8N, FastAPI)" },
  { icon: "🌐", t: "Full-Stack Platforms", d: "FastAPI + React / Next.js, REST APIs" },
  { icon: "📊", t: "Data & Analytics", d: "PostgreSQL pipelines & KPI dashboards" },
];
const values = [
  { icon: "📚", t: "Keep Learning", d: "Always curious, always growing." },
  { icon: "🎯", t: "Build with Purpose", d: "Create things that make an impact." },
  { icon: "🔁", t: "Stay Consistent", d: "Small steps, big progress." },
];

export default function About() {
  return (
    <PageChrome>
      <SectionProgress sections={[
        { id: "about-intro", label: "Who I Am · Education" },
        { id: "about-build", label: "Building · Journey" },
        { id: "about-values", label: "Core Values" },
      ]} />
      <Reveal className="text-center mt-6">
        <h1 className="font-pixel text-cyan text-[34px] md:text-[56px] leading-none text-shadow-blocky">
          <span className="text-gold">✦</span> ABOUT ME <span className="text-gold">✦</span>
        </h1>
        <p className="font-body text-[21px] text-muted mt-4">Get to know the player behind the code.</p>
        <div className="mt-5"><PixelButton href="/" variant="outline">↔ BACK TO WORLD</PixelButton></div>
      </Reveal>

      <div className="relative max-w-[1200px] mx-auto py-12">
        <Parallax speed={0.6} className="pointer-events-none absolute -z-10 top-24 -right-10 w-80 h-80 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(76,201,255,.5),transparent)" }} />
        </Parallax>
        <Parallax speed={-0.5} className="pointer-events-none absolute -z-10 bottom-10 -left-10 w-80 h-80 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(183,255,69,.45),transparent)" }} />
        </Parallax>

        <div className="space-y-12">
          {/* Row 1: Who I Am (left) + Education (right) */}
          <div id="about-intro" className="grid lg:grid-cols-2 gap-6 items-stretch [&>*]:h-full">
            <ScrollReveal>
              <PixelPanel title="WHO I AM" accent="green" icon={<span>👤</span>} glowing bodyClassName="">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="shrink-0"><RotatingCharacter size={150} /></div>
                  <div className="space-y-4">
                    <p className="font-body text-[20px] text-text/90 leading-snug">
                      Hi! I&apos;m <span className="text-purple">Varun</span> — a Computer Science student at York University
                      (Lassonde) and an <span className="text-cyan">AI Data Engineer at Ayvelis AI</span>. I build
                      privacy-preserving analytics platforms, agentic AI pipelines, and full-stack products with FastAPI, React and Python.
                    </p>
                    <p className="font-body text-[20px] text-muted leading-snug">
                      I love shipping real things — from LLM workflow engines to award-winning hackathon builds — and leading teams
                      as Director of Student Life at Enactus York.
                    </p>
                  </div>
                </div>
              </PixelPanel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <PixelPanel title="EDUCATION" accent="cyan" icon={<span>🎓</span>} glowing bodyClassName="">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img src="/assets/book.png" alt="" width={150} height={150} className="shrink-0 w-[150px] h-[150px] animate-soft-float" style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 18px rgba(76,201,255,0.35))" }} />
                  <div className="space-y-3">
                    <div className="font-pixel text-[14px] text-text leading-snug">BSc (Honours), Computer Science</div>
                    <div className="font-body text-[19px] text-muted">York University — Lassonde School of Engineering</div>
                    <div className="font-body text-[18px] text-cyan">Sep 2023 – Sep 2027 · Toronto, ON</div>
                    <div className="inline-block font-body text-[16px] text-green px-3 py-2 border-[3px] border-green/50 bg-[#0f0a22]">
                      DSA · OOP · Databases · Software Design · SDLC
                    </div>
                  </div>
                </div>
              </PixelPanel>
            </ScrollReveal>
          </div>

          {/* Row 2: What I Enjoy Building (left) + Journey So Far (right) */}
          <div id="about-build" className="grid lg:grid-cols-2 gap-6 items-stretch [&>*]:h-full">
            <ScrollReveal>
              <PixelPanel title="WHAT I ENJOY BUILDING" accent="purple" icon={<span>{"</>"}</span>} bodyClassName="space-y-4">
                {enjoy.map((e, i) => (
                  <ScrollReveal key={e.t} delay={i * 0.1} className="flex items-start gap-4 bg-[#0f0a22] border-[3px] border-ink p-4 pixel-hoverable">
                    <span className="text-[30px] leading-none">{e.icon}</span>
                    <div>
                      <div className="font-pixel text-[13px] text-text">{e.t}</div>
                      <div className="font-body text-[18px] text-muted mt-1">{e.d}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </PixelPanel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <PixelPanel title="JOURNEY SO FAR" accent="purple" icon={<span>📈</span>} glowing className="neon-purple border-purple/60" bodyClassName="">
                <div className="grid grid-cols-2 gap-4">
                  {journeyStats.map((s) => (
                    <div key={s.l} className="bg-[#0f0a22] border-[3px] border-ink p-4 text-center pixel-hoverable">
                      <div className={`font-pixel text-[26px] ${s.tone}`}>{s.v}</div>
                      <div className="font-body text-[16px] text-muted leading-tight mt-2">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3 border-l-[3px] border-ink pl-4">
                  {milestones.map((m) => (
                    <div key={m.t} className="flex items-start gap-3">
                      <span className={`mt-[6px] w-3 h-3 border-2 border-ink ${m.tone} shrink-0`} />
                      <div>
                        <span className="font-pixel text-[10px] text-gold mr-2">{m.y}</span>
                        <span className="font-body text-[17px] text-muted">{m.t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </PixelPanel>
            </ScrollReveal>
          </div>

          {/* Core Values (full width, bigger) */}
          <div id="about-values" className="scroll-mt-24" />
          <ScrollReveal>
            <PixelPanel title="CORE VALUES" accent="gold" icon={<span>❤</span>} bodyClassName="">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {values.map((v, i) => (
                  <ScrollReveal key={v.t} delay={i * 0.1} className="flex flex-col items-center text-center gap-3 bg-[#0f0a22] border-[3px] border-ink p-6 pixel-hoverable">
                    <span className="text-[40px]">{v.icon}</span>
                    <div className="font-pixel text-[13px] text-gold">{v.t}</div>
                    <div className="font-body text-[18px] text-muted">{v.d}</div>
                  </ScrollReveal>
                ))}
              </div>
            </PixelPanel>
          </ScrollReveal>
        </div>
      </div>
    </PageChrome>
  );
}
