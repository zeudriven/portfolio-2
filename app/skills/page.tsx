import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelProgressBar from "@/components/pixel/PixelProgressBar";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";

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
const coursework = [
  "Data Structures & Algorithms", "Object-Oriented Programming",
  "Database Systems", "Software Design", "Systems Analysis & SDLC",
];
const experience = [
  { icon: "🤖", role: "SOFTWARE DEVELOPER / AI DATA ENGINEER", org: "Ayvelis AI · Toronto · Jan 2026 – Present", tone: "text-cyan", d: "Architected a privacy-preserving analytics platform (Python / FastAPI / PostgreSQL) and agentic AI inference pipelines (LLM + N8N) — cutting processing latency by 40%." },
  { icon: "👑", role: "DIRECTOR OF STUDENT LIFE", org: "Enactus York · Toronto · Sep 2025 – Present", tone: "text-purple", d: "Grew the org from 5 to 8+ members and led teams to 3 regional award wins and $6,000 in funding." },
  { icon: "🏆", role: "HACKATHONS & AWARDS", org: "2025 – 2026", tone: "text-gold", d: "3rd @ COIE Climathon ($500) · 3rd @ Hult Prize ($300) · Head Delegate @ CUSEC Canada 2025." },
];
const missionLog = [
  { d: "2026 – Present", t: "AI Data Engineer @ Ayvelis AI — privacy-preserving analytics & agentic AI pipelines." },
  { d: "2026", t: "Shipped FinTech & AI builds — Scotia FutureFlex, ComparaVision." },
  { d: "2025 – Present", t: "Director of Student Life @ Enactus York — 3 awards, $6K funding." },
  { d: "2023", t: "Started BSc Computer Science at York University (Lassonde)." },
];
const awards = [
  { r: "🥉", n: "COIE Climathon", p: "$500" },
  { r: "🥉", n: "Hult Prize", p: "$300" },
  { r: "🏅", n: "Enactus York — 3 Regional", p: "$6,000" },
  { r: "🎤", n: "Head Delegate — CUSEC", p: "2025" },
];
const cabinets = [
  { l: "PYTHON", icon: "🐍", hex: "#b7ff45" },
  { l: "C++", icon: "⚙", hex: "#4cc9ff" },
  { l: "JS", icon: "🟨", hex: "#ffd76a" },
  { l: "REACT", icon: "⚛", hex: "#4cc9ff" },
  { l: "NODE", icon: "🟩", hex: "#b7ff45" },
  { l: "SQL", icon: "🗄", hex: "#b83cff" },
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

        {/* ===== EXPERIENCE (big, first) + skill bars on the right ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-14 items-start">
          <ScrollReveal className="lg:col-span-3">
            <PixelPanel title="EXPERIENCE HIGHLIGHTS" accent="green" icon={<span>💼</span>} glowing bodyClassName="space-y-5">
              {experience.map((e, i) => (
                <ScrollReveal key={e.role} delay={i * 0.12} className="bg-[#0f0a22] border-[4px] border-ink p-5 flex items-start gap-4 pixel-hoverable">
                  <span className="text-[34px] leading-none">{e.icon}</span>
                  <div>
                    <div className={`font-pixel text-[14px] ${e.tone}`}>{e.role}</div>
                    <div className="font-body text-[18px] text-muted mt-1">{e.org}</div>
                    <div className="font-body text-[19px] text-text/90 mt-2">{e.d}</div>
                  </div>
                </ScrollReveal>
              ))}
            </PixelPanel>
          </ScrollReveal>

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

        {/* ===== arcade band: cabinets + status/highscore/coursework ===== */}
        <ScrollReveal className="mt-16">
          <div className="flex items-end justify-center gap-2 sm:gap-3 flex-wrap mb-8">
            {cabinets.map((c) => (
              <div key={c.l} className="pixel-hoverable flex flex-col items-center gap-2">
                <div className="relative w-[64px] h-[94px] bg-[#140f2c] border-[4px] border-ink flex flex-col items-center pt-[7px]">
                  <span className="absolute -top-[3px] left-1 right-1 h-[5px]" style={{ background: c.hex, boxShadow: `0 0 8px ${c.hex}` }} />
                  <div className="w-[44px] h-[34px] grid place-items-center text-[18px] border-[3px] border-ink" style={{ background: "#0a1230", boxShadow: `inset 0 0 10px ${c.hex}` }}>{c.icon}</div>
                  <span className="inline-block mt-[10px] w-[10px] h-[10px]" style={{ background: "#e6483f", border: "2px solid #000" }} />
                  <span className="mt-[5px] flex gap-[3px]"><i className="inline-block w-[6px] h-[6px]" style={{ background: c.hex }} /><i className="inline-block w-[6px] h-[6px]" style={{ background: "#e8e6f5" }} /></span>
                </div>
                <span className="font-pixel text-[9px]" style={{ color: c.hex }}>{c.l}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PixelPanel title="STATUS" accent="purple" glowing bodyClassName="space-y-3">
              <div className="flex items-center gap-3 font-pixel text-[13px]"><span>❤</span><span className="text-rose">100/100 HP</span></div>
              <div className="flex items-center gap-3 font-pixel text-[13px]"><span>⭐</span><span className="text-gold">EXP 250/500</span></div>
            </PixelPanel>
            <PixelPanel title="COURSEWORK HIGHLIGHTS" accent="gold" bodyClassName="space-y-2">
              {coursework.map((c) => (<div key={c} className="flex items-start gap-2 font-body text-[17px] text-text/90"><span className="text-gold">★</span>{c}</div>))}
            </PixelPanel>
            <PixelPanel title="HIGH SCORE" accent="gold" glowing bodyClassName="space-y-2">
              <div className="flex items-center gap-3 font-pixel text-[16px] text-gold"><span>🏆</span>1250 PTS</div>
              <div className="flex items-center justify-between font-pixel text-[12px] text-muted"><span>RANK</span><span className="text-green">#07</span></div>
            </PixelPanel>
          </div>
        </ScrollReveal>

        {/* ===== bottom reveal: MISSION LOG + leaderboard ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16 mb-2">
          <ScrollReveal className="lg:col-span-2">
            <PixelPanel title="MISSION LOG" accent="green" icon={<span>🗒</span>} glowing bodyClassName="space-y-4">
              {missionLog.map((m, i) => (
                <ScrollReveal key={m.d} delay={i * 0.12} className="flex gap-4">
                  <span className="text-green mt-1 text-[18px]">◉</span>
                  <div>
                    <div className="font-pixel text-[12px] text-gold">{m.d}</div>
                    <div className="font-body text-[18px] text-muted leading-snug">{m.t}</div>
                  </div>
                </ScrollReveal>
              ))}
            </PixelPanel>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="space-y-6">
            <PixelPanel title="AWARDS & HONORS" accent="gold" icon={<span>🏆</span>} bodyClassName="space-y-2">
              {awards.map((p) => (
                <div key={p.n} className="flex items-center justify-between gap-3 font-body text-[16px] text-text/90"><span className="text-muted flex items-center gap-2"><span>{p.r}</span>{p.n}</span><span className="text-green shrink-0">{p.p}</span></div>
              ))}
              <div className="flex items-center justify-between font-body text-[16px] border-t-[3px] border-ink pt-2 mt-2"><span className="text-green">Total won</span><span className="text-green">$6,800+</span></div>
            </PixelPanel>
            <div className="grid grid-cols-3 gap-3">
              {[["🏅", "HACKATHONS", "04"], ["👑", "LEADERSHIP", "02"], ["💰", "WON", "$6.8K"]].map(([i, t, v]) => (
                <div key={t} className="pixel-panel-2 p-3 text-center">
                  <div className="text-[20px]">{i}</div>
                  <div className="font-body text-[14px] text-muted leading-tight mt-1">{t}</div>
                  <div className="font-pixel text-[14px] text-gold mt-1">{v}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageChrome>
  );
}
