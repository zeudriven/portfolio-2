import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";

const journeyStats = [
  { v: "10+", l: "Projects Completed", tone: "text-green" },
  { v: "5+", l: "Technologies Explored", tone: "text-cyan" },
  { v: "500+", l: "Hours Coding", tone: "text-purple" },
  { v: "∞", l: "Curiosity Level", tone: "text-gold" },
];

const milestones = ["Started Coding", "Built My First Project", "Exploring New Tech", "Building What Matters", "Next Level"];

const enjoy = [
  { icon: "🌐", t: "Web Applications", d: "Interactive & responsive apps" },
  { icon: "🛠", t: "Tools & Utilities", d: "Productivity boosters & automations" },
  { icon: "📦", t: "Real-world Solutions", d: "Apps that solve everyday problems" },
];

const values = [
  { icon: "📚", t: "Keep Learning", d: "Always curious, always growing." },
  { icon: "🎯", t: "Build with Purpose", d: "Create things that make an impact." },
  { icon: "🔁", t: "Stay Consistent", d: "Small steps, big progress." },
];

export default function About() {
  return (
    <PageChrome>
      {/* title */}
      <div className="text-center mt-6">
        <h1 className="font-pixel text-green text-[34px] md:text-[52px] leading-none text-shadow-blocky">
          <span className="text-gold">✦</span> ABOUT ME <span className="text-gold">✦</span>
        </h1>
        <p className="font-body text-[20px] text-muted mt-4">
          Get to know the player behind the code.
        </p>
        <div className="mt-5">
          <PixelButton href="/" variant="outline">↔ BACK TO WORLD</PixelButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
        {/* left column */}
        <div className="space-y-5 lg:col-span-1">
          <PixelPanel title="WHO I AM" accent="green" icon={<span>👤</span>} glowing bodyClassName="space-y-4">
            <p className="font-body text-[19px] text-text/90 leading-snug">
              Hi! I&apos;m <span className="text-purple">Varun</span>, a Computer Science student who
              loves turning ideas into real-world digital experiences. I enjoy solving problems,
              building useful things, and constantly learning new technologies.
            </p>
            <p className="font-body text-[19px] text-muted leading-snug">
              When I&apos;m not coding, I&apos;m exploring new tools, reading, or playing strategy games.
            </p>
          </PixelPanel>
        </div>

        {/* middle column */}
        <div className="space-y-5 lg:col-span-1">
          <PixelPanel title="EDUCATION" accent="green" icon={<span>🎓</span>} bodyClassName="space-y-3">
            <div>
              <div className="font-pixel text-[13px] text-text">Bachelor of Technology</div>
              <div className="font-body text-[18px] text-muted">Computer Science &amp; Engineering</div>
            </div>
            <div className="font-body text-[18px] text-cyan">B.Tech CSE Student</div>
            <div className="inline-block font-body text-[16px] text-green px-3 py-2 border-[3px] border-green/50 bg-[#0f0a22]">
              Learning. Building. Growing.
            </div>
          </PixelPanel>

          <PixelPanel title="JOURNEY SO FAR" accent="green" icon={<span>📈</span>}>
            <div className="grid grid-cols-2 gap-3">
              {journeyStats.map((s) => (
                <div key={s.l} className="bg-[#0f0a22] border-[3px] border-ink p-3 text-center pixel-hoverable">
                  <div className={`font-pixel text-[22px] ${s.tone}`}>{s.v}</div>
                  <div className="font-body text-[15px] text-muted leading-tight mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 gap-1">
              {milestones.map((m, i) => (
                <div key={m} className="flex-1 text-center">
                  <div className={`mx-auto w-3 h-3 border-2 border-ink ${i === milestones.length - 1 ? "bg-gold" : "bg-green"}`} />
                  <div className="font-body text-[13px] text-muted mt-1 leading-tight">{m}</div>
                </div>
              ))}
            </div>
          </PixelPanel>
        </div>

        {/* right column */}
        <div className="space-y-5 lg:col-span-1">
          <PixelPanel title="WHAT I ENJOY BUILDING" accent="cyan" icon={<span>{"</>"}</span>} bodyClassName="space-y-4">
            {enjoy.map((e) => (
              <div key={e.t} className="flex items-start gap-3">
                <span className="text-[22px]">{e.icon}</span>
                <div>
                  <div className="font-pixel text-[12px] text-text">{e.t}</div>
                  <div className="font-body text-[17px] text-muted">{e.d}</div>
                </div>
              </div>
            ))}
          </PixelPanel>

          <PixelPanel title="CORE VALUES" accent="gold" icon={<span>❤</span>} bodyClassName="space-y-4">
            {values.map((v) => (
              <div key={v.t} className="flex items-start gap-3">
                <span className="text-[22px]">{v.icon}</span>
                <div>
                  <div className="font-pixel text-[12px] text-gold">{v.t}</div>
                  <div className="font-body text-[17px] text-muted">{v.d}</div>
                </div>
              </div>
            ))}
          </PixelPanel>
        </div>
      </div>
    </PageChrome>
  );
}
