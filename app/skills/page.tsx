import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelProgressBar from "@/components/pixel/PixelProgressBar";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import AnimatedSprite from "@/components/AnimatedSprite";

const languages = [
  { l: "Python", v: 95 }, { l: "JavaScript", v: 85 }, { l: "TypeScript", v: 80 },
  { l: "C++", v: 80 }, { l: "SQL", v: 88 },
];
const frameworks = [
  { l: "FastAPI", v: 92 }, { l: "SQLAlchemy", v: 85 }, { l: "Node.js", v: 80 },
  { l: "React", v: 75 }, { l: "Next.js", v: 70 },
];
const tools = [
  { l: "Git & GitHub", v: 90 }, { l: "PostgreSQL", v: 85 }, { l: "MongoDB", v: 80 },
  { l: "Linux", v: 80 }, { l: "Docker", v: 70 },
];
type Job = {
  dir: string; role: string; org: string; tone: string;
  d: string; incoming?: boolean; bullets?: string[];
};
const experience: Job[] = [
  {
    dir: "/assets/objects/anim/data",
    role: "PROJECT COORDINATOR CO-OP",
    org: "Government of Ontario — GovTechON, CYSSC · North York · Sep 2026 – Jan 2027",
    tone: "text-gold",
    incoming: true,
    d: "",
    bullets: [
      "Coordinated I&IT project delivery across CYSSC — managing competing priorities, tracking deliverables, and maintaining stakeholder alignment between the OCCIO, Minister's Office, Deputy Minister offices, and Cluster CIOs.",
      "Prepared briefing materials, status reports, and action item summaries for the Executive Advisor to the CIO/ADM — maintaining a bring-forward system and organized filing structure for rapid information retrieval.",
      "Supported expense reporting under the Travel, Meal and Hospitality Expenses Directive, plus invoice tracking, procurement coordination, and calendar management across concurrent office workstreams.",
    ],
  },
  { dir: "/assets/objects/anim/dev", role: "SOFTWARE DEVELOPER / AI DATA ENGINEER", org: "Ayvelis AI · Toronto · Jan 2026 – Present", tone: "text-cyan", d: "Architected a privacy-preserving analytics platform (Python / FastAPI / PostgreSQL) and agentic AI inference pipelines (LLM + N8N) — cutting processing latency by 40%." },
  { dir: "/assets/objects/anim/leader", role: "VICE PRESIDENT OF STUDENT LIFE", org: "Enactus York · Toronto · Sep 2025 – Present", tone: "text-purple", d: "Grew the org from 5 to 8+ members and led teams to 3 regional award wins and $6,000 in funding." },
  { dir: "/assets/objects/anim/trophy", role: "HACKATHONS & AWARDS", org: "2025 – 2026", tone: "text-gold", d: "3rd @ COIE Climathon ($500) · 3rd @ Hult Prize ($300) · Head Delegate @ CUSEC Canada 2025." },
];
const awards = [
  { r: "🥉", n: "COIE Climathon", p: "$500" },
  { r: "🥉", n: "Hult Prize", p: "$300" },
  { r: "🏅", n: "Enactus York — 3 Regional", p: "$6,000" },
  { r: "🎤", n: "Head Delegate — CUSEC", p: "2025" },
];
const techStack = [
  { l: "Python", logo: "/assets/logos/python.svg" },
  { l: "C++", logo: "/assets/logos/cpp.svg" },
  { l: "JavaScript", logo: "/assets/logos/js.svg" },
  { l: "React", logo: "/assets/logos/react.svg" },
  { l: "Node.js", logo: "/assets/logos/node.svg" },
  { l: "MySQL", logo: "/assets/logos/sql.svg" },
];

export default function Skills() {
  return (
    <PageChrome footer="Press ESC to return home.">
      <Reveal className="text-center mt-6">
        <h1 className="font-pixel text-cyan text-[30px] md:text-[48px] leading-none text-shadow-blocky">
          <span className="text-gold">✦</span> SKILLS &amp; EXPERIENCE <span className="text-gold">✦</span>
        </h1>
        <p className="font-body text-[20px] text-muted mt-4">
          <span className="text-gold">❖</span> LEVEL UP. BUILD. IMPACT. <span className="text-gold">❖</span>
        </p>
      </Reveal>

      <div className="relative">
        <Parallax speed={0.55} className="pointer-events-none absolute -z-10 top-10 -right-8 w-72 h-72 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(76,201,255,.45),transparent)" }} />
        </Parallax>
        <Parallax speed={-0.5} className="pointer-events-none absolute -z-10 bottom-32 -left-8 w-72 h-72 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(184,60,255,.4),transparent)" }} />
        </Parallax>

        {/* ===== TECH STACK (real logos) — clean continuous scroll, on top ===== */}
        <div id="sk-tech" className="scroll-mt-24" />
        <ScrollReveal className="mt-10">
          <div className="font-pixel text-[14px] text-cyan text-center mb-6">⚙ TECH STACK</div>
          <div
            className="overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="flex w-max gap-16" style={{ animation: "techscroll 26s linear infinite" }}>
              {[...techStack, ...techStack].map((t, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.logo} alt={t.l} className="w-11 h-11 shrink-0" style={{ imageRendering: "auto" }} />
                  <span className="font-body text-[24px] text-text leading-none">{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* section tag above Experience Highlights */}
        <ScrollReveal className="mt-14">
          <div className="inline-flex items-center gap-2 font-pixel text-[11px] text-green bg-inset px-3 py-2 border-[2px] border-green/50 shadow-blocky-sm">
            <span className="text-gold">⚡</span> EXPERIENCE &amp; STACK
          </div>
        </ScrollReveal>

        {/* ===== EXPERIENCE + AWARDS (left box) · skill bars (right) ===== */}
        <div id="sk-exp" className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4 items-start">
          <div className="lg:col-span-3 space-y-6">
            <ScrollReveal>
              <PixelPanel title="EXPERIENCE HIGHLIGHTS" accent="green" icon={<span>💼</span>} glowing bodyClassName="space-y-5">
                {experience.map((e, i) => (
                  <ScrollReveal
                    key={e.role}
                    delay={i * 0.12}
                    className={`bg-inset border-[2px] border-ink p-5 flex items-start gap-5 pixel-hoverable ${e.incoming ? "incoming-card" : ""}`}
                  >
                    <AnimatedSprite dir={e.dir} frames={4} size={78} fps={6} className="shrink-0" />
                    <div className="relative">
                      {e.incoming && (
                        <div className="incoming-badge inline-flex items-center gap-2 font-pixel text-[10px] text-gold bg-panel border-[2px] border-gold/70 px-2 py-1 mb-2">
                          <span className="incoming-dot inline-block w-[6px] h-[6px] bg-gold" />
                          INCOMING · FALL 2026
                        </div>
                      )}
                      <div className={`font-pixel text-[15px] ${e.tone}`}>{e.role}</div>
                      <div className="font-body text-[18px] text-muted mt-1">{e.org}</div>
                      {e.d && <div className="font-body text-[19px] text-text/90 mt-2">{e.d}</div>}
                      {e.bullets && (
                        <ul className="mt-2 space-y-2">
                          {e.bullets.map((b) => (
                            <li key={b} className="font-body text-[19px] text-text/90 flex gap-2">
                              <span className="text-gold shrink-0">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </PixelPanel>
            </ScrollReveal>

            {/* awards fit right below experience, in the same box area */}
            <ScrollReveal delay={0.1}>
              <PixelPanel title="AWARDS & HONORS" accent="gold" icon={<span>🏆</span>} glowing bodyClassName="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
                  {awards.map((p) => (
                    <div key={p.n} className="flex items-center justify-between gap-3 font-body text-[17px] text-text/90 border-b-2 border-line py-2"><span className="text-muted flex items-center gap-2"><span>{p.r}</span>{p.n}</span><span className="text-green shrink-0">{p.p}</span></div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[["🏅", "HACKATHONS", "04"], ["👑", "LEADERSHIP", "02"], ["💰", "WON", "$6.8K"]].map(([i, t, v]) => (
                    <div key={t} className="pixel-panel-2 p-4 text-center">
                      <div className="text-[24px]">{i}</div>
                      <div className="font-body text-[15px] text-muted leading-tight mt-1">{t}</div>
                      <div className="font-pixel text-[15px] text-gold mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </PixelPanel>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {[
              { title: "CORE LANGUAGES", accent: "green" as const, items: languages },
              { title: "FRAMEWORKS & LIBRARIES", accent: "purple" as const, items: frameworks },
              { title: "TOOLS & TECHNOLOGIES", accent: "cyan" as const, items: tools },
            ].map((panel, i) => (
              <ScrollReveal key={panel.title} delay={i * 0.1}>
                <PixelPanel title={panel.title} accent={panel.accent} glowing bodyClassName="space-y-4">
                  {panel.items.map((s) => <PixelProgressBar key={s.l} label={s.l} value={s.v} tone="green" />)}
                </PixelPanel>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
