import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";
import PixelBadge from "@/components/pixel/PixelBadge";
import Sparkles from "@/components/pixel/Sparkles";
import Reveal from "@/components/Reveal";

const filters = ["▦ ALL", "🌐 WEB", "🧠 AI", "📊 DATA", "⚙ SYSTEMS"];

const projects = [
  {
    icon: "🌐",
    title: "Project One",
    tag: "WEB",
    tone: "cyan" as const,
    desc: "Personal portfolio built with pixel-perfect UI/UX and a gamified experience.",
    stack: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    icon: "🤖",
    title: "Project Two",
    tag: "AI",
    tone: "purple" as const,
    desc: "AI-powered assistant to summarize, explain and quiz any topic.",
    stack: ["Python", "LangChain", "OpenAI"],
  },
  {
    icon: "📊",
    title: "Project Three",
    tag: "DATA",
    tone: "green" as const,
    desc: "Interactive analytics dashboard with real-time visualizations.",
    stack: ["Python", "Pandas", "Plotly", "SQL"],
  },
  {
    icon: "🗄",
    title: "Project Four",
    tag: "SYSTEMS",
    tone: "gold" as const,
    desc: "Automation scripts and tools to streamline dev workflows.",
    stack: ["Bash", "Docker", "GitHub Actions"],
  },
];

const achievements = [
  { icon: "🏆", t: "First Deploy", d: "Deployed your first project", xp: "+100 XP" },
  { icon: "</>", t: "Code Explorer", d: "Completed 10 projects", xp: "+250 XP" },
  { icon: "⭐", t: "Problem Solver", d: "Solved 25 real-world problems", xp: "+500 XP" },
];

export default function Projects() {
  return (
    <PageChrome footer="Every project is a step forward. Keep building.">
      <Reveal className="text-center mt-6">
        <p className="font-pixel text-[11px] text-muted mb-3">
          <span className="text-cyan">HOME</span> &gt; PROJECTS
        </p>
        <h1 className="font-pixel text-cyan text-[34px] md:text-[52px] leading-none text-shadow-blocky">
          <span className="text-orange">❖</span> PROJECTS <span className="text-orange">❖</span>
        </h1>
        <p className="font-body text-[20px] text-muted mt-4">
          <span className="text-cyan">❖</span> A collection of builds, experiments, and real-world solutions. <span className="text-cyan">❖</span>
        </p>
      </Reveal>

      {/* filters */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {filters.map((f, i) => (
          <span
            key={f}
            className={`font-pixel text-[11px] px-3 py-3 border-[3px] cursor-pointer bg-[#0f0a22] ${
              i === 0 ? "text-gold border-gold/60" : "text-muted border-ink hover:text-text"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
        {/* project grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <article key={p.title} className="pixel-panel pixel-interactive group p-4 flex flex-col gap-3">
              <Sparkles />
              <div className="flex items-start gap-3">
                <div className="grid place-items-center w-16 h-16 bg-panel-2 border-[3px] border-ink text-[28px] shrink-0">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-pixel text-[15px] text-text leading-snug">{p.title}</h3>
                  <PixelBadge tone={p.tone} className="mt-2">{p.tag}</PixelBadge>
                </div>
              </div>
              <p className="font-body text-[18px] text-muted leading-snug flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="font-body text-[15px] text-purple px-2 py-1 bg-[#0f0a22] border-2 border-purple/40">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t-[3px] border-ink">
                <span className="font-pixel text-[11px] text-green">VIEW PROJECT →</span>
                <span className="text-gold text-[18px]">☆</span>
              </div>
            </article>
          ))}
          <div className="md:col-span-2 flex justify-center mt-1">
            <PixelButton variant="outline">LOAD MORE PROJECTS ↓</PixelButton>
          </div>
        </div>

        {/* side rail */}
        <div className="space-y-5">
          <PixelPanel title="FEATURED BUILD" accent="purple" icon={<span>✦</span>} glowing bodyClassName="space-y-3">
            <div className="h-32 bg-panel-2 border-[3px] border-ink grid place-items-center text-muted font-body text-[16px]">
              [ artwork slot ]
            </div>
            <h3 className="font-pixel text-[14px] text-text">Project One</h3>
            <PixelBadge tone="cyan">WEB</PixelBadge>
            <p className="font-body text-[17px] text-muted">
              A unique portfolio experience with retro vibes and modern tech.
            </p>
            <PixelButton variant="outline" className="w-full">VIEW FEATURED →</PixelButton>
          </PixelPanel>

          <PixelPanel title="ACHIEVEMENTS" accent="gold" icon={<span>🏅</span>} bodyClassName="space-y-3">
            {achievements.map((a) => (
              <div key={a.t} className="flex items-start gap-3 bg-[#0f0a22] border-[3px] border-ink p-3">
                <span className="text-[20px]">{a.icon}</span>
                <div className="flex-1">
                  <div className="font-pixel text-[12px] text-text">{a.t}</div>
                  <div className="font-body text-[15px] text-muted">{a.d}</div>
                  <div className="font-body text-[15px] text-green">{a.xp}</div>
                </div>
                <span className="text-green">✔</span>
              </div>
            ))}
            <PixelButton variant="outline" className="w-full">VIEW ALL ACHIEVEMENTS →</PixelButton>
          </PixelPanel>
        </div>
      </div>
    </PageChrome>
  );
}
