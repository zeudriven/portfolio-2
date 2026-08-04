/* eslint-disable @next/next/no-img-element */
import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";
import PixelBadge from "@/components/pixel/PixelBadge";
import Sparkles from "@/components/pixel/Sparkles";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import SectionProgress from "@/components/SectionProgress";
import AnimatedSprite from "@/components/AnimatedSprite";
import { profile } from "@/lib/profile";

type Tone = "cyan" | "purple" | "green" | "gold";
type Project = { icon: string; title: string; year: string; tone: Tone; img?: string; anim?: string; link: string; linkLabel: string; desc: string; highlight?: string[]; stack: string[] };

/** Underline + green-glow key phrases inside a description paragraph. */
function highlightDesc(desc: string, terms?: string[]) {
  if (!terms || terms.length === 0) return desc;
  const esc = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${esc.join("|")})`, "g");
  return desc.split(re).map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className="text-text underline decoration-green decoration-2 underline-offset-2" style={{ textShadow: "0 0 9px rgba(183,255,69,.75)" }}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const projects: Project[] = [
  {
    icon: "💸", title: "Scotia FutureFlex — FinTech Platform", year: "2026", tone: "gold",
    img: "/assets/projects/scotia.png", link: "https://devpost.com/software/scotiabank-futureflex", linkLabel: "DEVPOST",
    desc: "A mobile-first investment platform with goal-based onboarding, a REST API backend and recommendation retrieval for Gen-Z financial engagement — shipped in a 24-hour build.",
    highlight: ["REST API backend", "24-hour build", "Gen-Z financial engagement"],
    stack: ["Python", "FastAPI", "JavaScript", "REST API"],
  },
  {
    icon: "🔭", title: "ComparaVision", year: "2025", tone: "cyan",
    img: "/assets/projects/comparavision.png", link: "https://devpost.com/software/comparavision", linkLabel: "DEVPOST",
    desc: "A real-time model-comparison analytics dashboard with live system metrics and sustainability insights.",
    highlight: ["real-time", "sustainability insights"],
    stack: ["TypeScript", "React", "Analytics"],
  },
  {
    icon: "🤖", title: "AdminSync AI — LLM Workflow Engine", year: "2025", tone: "purple", anim: "/assets/objects/anim/ai-engine", link: profile.github, linkLabel: "GITHUB",
    desc: "An LLM-powered task-automation engine that parses natural language into structured execution plans, audit logs and checkpoint workflows — cutting coordination overhead by 60%.",
    highlight: ["structured execution plans", "cutting coordination overhead by 60%"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "OpenAI API", "N8N"],
  },
  {
    icon: "🧪", title: "Requirements Traceability & Test Validation Tool", year: "2025", tone: "green", anim: "/assets/objects/anim/beaker", link: profile.github, linkLabel: "GITHUB",
    desc: "An enterprise QA traceability platform (inspired by DOORS & Polarion) linking requirements, test cases and verification states with full revision history and SDLC audit trails.",
    highlight: ["full revision history and SDLC audit trails"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "OOP"],
  },
  {
    icon: "📈", title: "CivicFlow Analytics", year: "2025", tone: "purple", anim: "/assets/objects/anim/data", link: profile.github, linkLabel: "GITHUB",
    desc: "A full-stack analytics system with PostgreSQL pipelines, automated SQL validation and Power BI-style KPI dashboards — simulating production-scale government reporting.",
    highlight: ["PostgreSQL pipelines", "Power BI-style KPI dashboards", "production-scale"],
    stack: ["Python", "PostgreSQL", "SQL", "Power BI"],
  },
];

const achievements = [
  { icon: "🥉", t: "3rd Place — $500", d: "COIE Climathon" },
  { icon: "🥉", t: "3rd Place — $300", d: "Hult Prize" },
  { icon: "🏅", t: "3 Regional Awards — $6,000", d: "Enactus York" },
  { icon: "🎤", t: "Head Delegate", d: "CUSEC Canada 2025" },
];

export default function Projects() {
  const featured = projects[0];
  return (
    <PageChrome footer="Every project is a step forward. Keep building.">
      <SectionProgress sections={[
        { id: "pr-projects", label: "Projects" },
        { id: "pr-featured", label: "Featured" },
        { id: "pr-awards", label: "Achievements" },
      ]} />
      <Reveal className="text-center mt-6">
        <p className="font-pixel text-[11px] text-muted mb-3"><span className="text-cyan">HOME</span> &gt; PROJECTS</p>
        <h1 className="font-pixel text-cyan text-[34px] md:text-[52px] leading-none text-shadow-blocky">
          <span className="text-gold">❖</span>{" "}
          <span className="pixel-shine title-glow" data-text="PROJECTS">
            PROJECTS
            <i className="shine-pip" style={{ left: -16, top: 4 }} />
            <i className="shine-pip" style={{ right: -16, bottom: 8 }} />
          </span>{" "}
          <span className="text-gold">❖</span>
        </h1>
        <p className="font-body text-[20px] text-muted mt-4">AI workflow engines, FinTech platforms, and real-world tooling.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a href={profile.github} target="_blank" rel="noreferrer"><PixelButton variant="outline">⛓ GITHUB →</PixelButton></a>
          <a href={profile.devpost} target="_blank" rel="noreferrer"><PixelButton variant="outline">◆ DEVPOST →</PixelButton></a>
        </div>
      </Reveal>

      <div id="pr-projects" className="relative grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
        <Parallax speed={0.5} className="pointer-events-none absolute -z-10 -top-6 right-10 w-72 h-72 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(183,255,69,.4),transparent)" }} />
        </Parallax>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <article className="pixel-panel pixel-interactive group p-4 flex flex-col gap-3 h-full">
                <Sparkles />
                {/* project image / animated object */}
                <div className="relative h-36 bg-panel-2 border-[2px] border-ink overflow-hidden grid place-items-center">
                  {p.img ? (
                    <img src={p.img} alt={p.title} className="w-full h-full object-contain" style={{ imageRendering: "auto" }} />
                  ) : p.anim ? (
                    <AnimatedSprite dir={p.anim} frames={4} size={104} fps={6} />
                  ) : (
                    <span className="text-[44px]">{p.icon}</span>
                  )}
                  <span className="absolute top-1 right-1"><PixelBadge tone={p.tone}>{p.year}</PixelBadge></span>
                </div>
                <h3 className="font-pixel text-[15px] text-text leading-snug">{p.title}</h3>
                <p className="font-body text-[19px] text-muted leading-snug flex-1">{highlightDesc(p.desc, p.highlight)}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (<span key={s} className="font-body text-[15px] text-purple px-2 py-1 bg-inset border-2 border-purple/40">{s}</span>))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t-[2px] border-ink">
                  <a href={p.link} target="_blank" rel="noreferrer" className="font-pixel text-[11px] text-green hover:text-gold transition-colors">{p.linkLabel === "DEVPOST" ? "◆" : "⛓"} {p.linkLabel} →</a>
                  <span className="text-gold text-[18px]">★</span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="space-y-5">
          <div id="pr-featured" className="scroll-mt-24" />
          <ScrollReveal delay={0.1}>
            <PixelPanel title="FEATURED BUILD" accent="gold" icon={<span>✦</span>} glowing bodyClassName="space-y-3">
              <div className="h-32 bg-panel-2 border-[2px] border-ink overflow-hidden grid place-items-center">
                {featured.img ? <img src={featured.img} alt={featured.title} className="w-full h-full object-contain" /> : <span className="text-[44px]">{featured.icon}</span>}
              </div>
              <h3 className="font-pixel text-[13px] text-text leading-snug">{featured.title}</h3>
              <p className="font-body text-[17px] text-muted">{featured.desc}</p>
              <a href={featured.link} target="_blank" rel="noreferrer"><PixelButton variant="outline" className="w-full">◆ VIEW ON DEVPOST →</PixelButton></a>
            </PixelPanel>
          </ScrollReveal>

          <div id="pr-awards" className="scroll-mt-24" />
          <ScrollReveal delay={0.18}>
            <PixelPanel title="ACHIEVEMENTS" accent="gold" icon={<span>🏅</span>} bodyClassName="space-y-3">
              {achievements.map((a) => (
                <div key={a.t} className="flex items-start gap-3 bg-inset border-[2px] border-ink p-3">
                  <span className="text-[20px]">{a.icon}</span>
                  <div className="flex-1">
                    <div className="font-pixel text-[11px] text-text">{a.t}</div>
                    <div className="font-body text-[15px] text-muted">{a.d}</div>
                  </div>
                  <span className="text-green">✔</span>
                </div>
              ))}
            </PixelPanel>
          </ScrollReveal>
        </div>
      </div>
    </PageChrome>
  );
}
