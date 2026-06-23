import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelProgressBar from "@/components/pixel/PixelProgressBar";
import Reveal from "@/components/Reveal";

const languages = [
  { l: "Python", v: 90 }, { l: "C++", v: 85 }, { l: "JavaScript", v: 80 },
  { l: "SQL", v: 75 }, { l: "HTML / CSS", v: 85 },
];
const frameworks = [
  { l: "React", v: 90 }, { l: "Node.js", v: 80 }, { l: "Express.js", v: 75 },
  { l: "Tailwind", v: 80 }, { l: "Bootstrap", v: 70 },
];
const tools = [
  { l: "Git & GitHub", v: 90 }, { l: "VS Code", v: 95 }, { l: "Linux", v: 75 },
  { l: "Docker", v: 65 }, { l: "Figma", v: 70 },
];
const coursework = [
  "Data Structures & Algorithms", "Object Oriented Programming",
  "Database Management Systems", "Operating Systems", "Computer Networks",
];
const missionLog = [
  { d: "2024 – Present", t: "Building impactful projects & leveling up my skills." },
  { d: "Summer 2024", t: "Software Engineering Intern @ Tech Company" },
  { d: "Early 2024", t: "Solved 250+ DSA problems across platforms" },
  { d: "2023", t: "Explored Web Dev, APIs & Open Source" },
];
const leaderboard = [
  { r: "#01", n: "Player A", p: "1500 PTS" },
  { r: "#02", n: "Player B", p: "1420 PTS" },
  { r: "#03", n: "Player C", p: "1310 PTS" },
];
const cabinets = ["PYTHON", "CPP", "JS", "REACT", "NODE", "SQL"];

export default function Skills() {
  return (
    <PageChrome footer="">
      <Reveal className="text-center mt-6">
        <h1 className="font-pixel text-cyan text-[30px] md:text-[48px] leading-none text-shadow-blocky">
          <span className="text-orange">✦</span> SKILLS &amp; EXPERIENCE <span className="text-orange">✦</span>
        </h1>
        <p className="font-body text-[20px] text-muted mt-4">
          <span className="text-orange">❖</span> LEVEL UP. BUILD. IMPACT. <span className="text-orange">❖</span>
        </p>
      </Reveal>

      {/* status + arcade + highscore row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-7">
        <PixelPanel title="STATUS" accent="purple" glowing bodyClassName="space-y-3">
          <div className="flex items-center gap-3 font-pixel text-[13px]">
            <span>❤</span><span className="text-rose">100/100 HP</span>
          </div>
          <div className="flex items-center gap-3 font-pixel text-[13px]">
            <span>⭐</span><span className="text-gold">EXP 250/500</span>
          </div>
        </PixelPanel>

        <div className="lg:col-span-2 flex items-end justify-center gap-3">
          {cabinets.map((c, i) => (
            <div key={c} className="flex flex-col items-center">
              <div className="grid place-items-center w-16 h-20 bg-panel-2 border-[3px] border-ink text-[22px]">🕹</div>
              <span className={`font-pixel text-[9px] mt-1 ${i % 2 ? "text-cyan" : "text-green"}`}>{c}</span>
            </div>
          ))}
        </div>

        <PixelPanel title="HIGH SCORE" accent="gold" glowing bodyClassName="space-y-2">
          <div className="flex items-center gap-3 font-pixel text-[16px] text-gold"><span>🏆</span>1250 PTS</div>
          <div className="flex items-center justify-between font-pixel text-[12px] text-muted">
            <span>RANK</span><span className="text-green">#07</span>
          </div>
        </PixelPanel>
      </div>

      {/* skill bar panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
        <PixelPanel title="CORE LANGUAGES" accent="green" bodyClassName="space-y-3">
          {languages.map((s) => <PixelProgressBar key={s.l} label={s.l} value={s.v} tone="green" />)}
        </PixelPanel>
        <PixelPanel title="FRAMEWORKS & LIBRARIES" accent="purple" bodyClassName="space-y-3">
          {frameworks.map((s) => <PixelProgressBar key={s.l} label={s.l} value={s.v} tone="green" />)}
        </PixelPanel>
        <PixelPanel title="TOOLS & TECHNOLOGIES" accent="cyan" bodyClassName="space-y-3">
          {tools.map((s) => <PixelProgressBar key={s.l} label={s.l} value={s.v} tone="green" />)}
        </PixelPanel>
        <PixelPanel title="COURSEWORK HIGHLIGHTS" accent="gold" bodyClassName="space-y-2">
          {coursework.map((c) => (
            <div key={c} className="flex items-start gap-2 font-body text-[17px] text-text/90">
              <span className="text-gold">★</span>{c}
            </div>
          ))}
        </PixelPanel>
      </div>

      {/* experience + mission log + leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 mb-2">
        <PixelPanel title="EXPERIENCE HIGHLIGHTS" accent="green" icon={<span>💼</span>} className="lg:col-span-1" bodyClassName="space-y-3">
          <div className="bg-[#0f0a22] border-[3px] border-ink p-3">
            <div className="font-pixel text-[11px] text-purple">SOFTWARE ENGINEERING INTERN</div>
            <div className="font-body text-[16px] text-muted">Tech Company · May 2024 – Aug 2024</div>
            <div className="font-body text-[16px] text-text/90 mt-1">Built internal tools that improved team productivity by 20%.</div>
          </div>
          <div className="bg-[#0f0a22] border-[3px] border-ink p-3">
            <div className="font-pixel text-[11px] text-cyan">FULL STACK PROJECTS</div>
            <div className="font-body text-[16px] text-text/90 mt-1">Built and deployed web apps using the MERN stack and more.</div>
          </div>
          <div className="bg-[#0f0a22] border-[3px] border-ink p-3">
            <div className="font-pixel text-[11px] text-green">OPEN SOURCE CONTRIBUTOR</div>
            <div className="font-body text-[16px] text-text/90 mt-1">Contributed to open source projects and fixed issues.</div>
          </div>
        </PixelPanel>

        <PixelPanel title="MISSION LOG" accent="green" icon={<span>🗒</span>} bodyClassName="space-y-3">
          {missionLog.map((m) => (
            <div key={m.d} className="flex gap-3">
              <span className="text-green mt-1">◉</span>
              <div>
                <div className="font-pixel text-[11px] text-gold">{m.d}</div>
                <div className="font-body text-[16px] text-muted leading-snug">{m.t}</div>
              </div>
            </div>
          ))}
        </PixelPanel>

        <div className="space-y-5">
          <PixelPanel title="LEADERBOARD — IMPACT ARENA" accent="gold" icon={<span>🏆</span>} bodyClassName="space-y-2">
            {leaderboard.map((p) => (
              <div key={p.r} className="flex items-center justify-between font-body text-[16px] text-text/90">
                <span className="text-muted">{p.r} {p.n}</span><span className="text-cyan">{p.p}</span>
              </div>
            ))}
            <div className="flex items-center justify-between font-body text-[16px] border-t-[3px] border-ink pt-2 mt-2">
              <span className="text-green">#07 VARUN PATEL</span><span className="text-green">1250 PTS</span>
            </div>
          </PixelPanel>
          <div className="grid grid-cols-3 gap-3">
            {[["🏅", "HACKATHONS", "03"], ["👑", "LEADERSHIP", "02"], ["⚡", "WORKSHOPS", "06"]].map(([i, t, v]) => (
              <div key={t} className="pixel-panel-2 p-3 text-center">
                <div className="text-[20px]">{i}</div>
                <div className="font-body text-[14px] text-muted leading-tight mt-1">{t}</div>
                <div className="font-pixel text-[14px] text-gold mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
