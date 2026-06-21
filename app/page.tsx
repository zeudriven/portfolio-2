import dynamic from "next/dynamic";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import FooterTicker from "@/components/FooterTicker";
import DestinationDoor from "@/components/DestinationDoor";
import CharacterSprite from "@/components/pixel/CharacterSprite";

const PhaserMount = dynamic(() => import("@/game/PhaserMount"), { ssr: false });

const stats = [
  { icon: "🎓", title: "CS STUDENT", lines: ["B.Tech CSE", "Passionate Learner"], tone: "text-green" },
  { icon: "💻", title: "PROJECTS", lines: ["10+ Completed", "Real-world Solutions"], tone: "text-cyan" },
  { icon: "💼", title: "EXPERIENCE", lines: ["Internships &", "Freelance Work"], tone: "text-purple" },
  { icon: "✉", title: "CONTACT", lines: ["Let's Build", "Something Great!"], tone: "text-gold" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Phaser world background */}
      <div className="absolute inset-0">
        <PhaserMount />
      </div>
      <div className="absolute inset-0 bg-night-deep/20 pointer-events-none" />

      {/* Foreground UI */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="w-full max-w-[1280px] mx-auto px-5 pt-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <TopBar />
            <NavBar />
          </div>
        </div>

        <main className="w-full max-w-[1280px] mx-auto px-5 flex-1 flex flex-col">
          {/* hero */}
          <div className="text-center mt-6">
            <p className="font-pixel text-[14px] text-gold mb-4">
              <span className="text-green">✦</span> Welcome to My World{" "}
              <span className="text-green">✦</span>
            </p>
            <h1 className="font-pixel text-green text-[42px] md:text-[64px] leading-none text-shadow-blocky tracking-wider">
              VARUN PATEL
            </h1>
            <div className="mt-6 inline-block font-pixel text-[14px] text-text px-5 py-3 bg-[#0f0a22]/85 border-[4px] border-ink shadow-blocky pixel-interactive group">
              PRESS ENTER TO EXPLORE ↵
            </div>
          </div>

          {/* destinations */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
            <DestinationDoor index={1} label="ABOUT ME" href="/about" art="/assets/door.png" tone="green" size={200} delay={0} />
            <DestinationDoor index={2} label="PROJECTS" href="/projects" art="/assets/vault.png" tone="cyan" size={200} delay={0.4} />
            <DestinationDoor index={3} label="SKILLS & EXPERIENCE" href="/skills" art="/assets/arcade.png" tone="purple" size={200} delay={0.8} />
            <DestinationDoor index={4} label="CONTACT / RESUME" href="/contact" art="/assets/portal.png" tone="gold" size={200} delay={1.2} />
          </div>

          {/* character + instruction panel */}
          <div className="mt-8 flex flex-col items-center gap-5">
            <CharacterSprite scale={1.2} float />
            <div className="pixel-panel pixel-interactive group px-6 py-4 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="font-pixel text-[16px] text-green">⬆⬇⬅➡</span>
                <span className="font-body text-[18px] text-text leading-tight">
                  Use Arrow Keys
                  <br />
                  to Move
                </span>
              </div>
              <div className="w-[3px] self-stretch bg-ink" />
              <div className="flex items-center gap-3">
                <span className="font-pixel text-[10px] text-gold px-3 py-2 bg-panel-2 border-[3px] border-ink">
                  ENTER
                </span>
                <span className="font-body text-[18px] text-text leading-tight">
                  Enter to Open
                  <br />
                  Destinations
                </span>
              </div>
            </div>
          </div>

          {/* stat chips */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.title} className="pixel-panel-2 pixel-hoverable flex items-start gap-3 p-4">
                <span className="text-[26px] leading-none">{s.icon}</span>
                <div>
                  <div className={`font-pixel text-[12px] ${s.tone} mb-1`}>{s.title}</div>
                  <div className="font-body text-[17px] text-muted leading-tight">
                    {s.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="w-full max-w-[1280px] mx-auto px-5">
          <FooterTicker />
        </div>
      </div>
    </div>
  );
}
