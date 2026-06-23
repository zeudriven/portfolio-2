/* eslint-disable @next/next/no-img-element */
"use client";

import PlayerHUD from "@/components/PlayerHUD";
import GameNav from "@/components/GameNav";
import SocialIcons from "@/components/SocialIcons";
import HeroBanner from "@/components/HeroBanner";
import StatCards from "@/components/StatCards";

// Deterministic star field (no Math.random at render → no hydration mismatch).
const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  top: (i * 29 + 3) % 56,
  big: i % 7 === 0,
  delay: (i % 9) * 0.27,
}));

// The four destinations, positioned across the world like the reference image.
const DOORS = [
  { name: "about", href: "/about", sign: "1. ABOUT ME", img: "/assets/objects/about.png", left: 15, tone: "text-green border-green/60" },
  { name: "projects", href: "/projects", sign: "2. PROJECTS", img: "/assets/objects/projects.png", left: 38, tone: "text-cyan border-cyan/60" },
  { name: "skills", href: "/skills", sign: "3. SKILLS & EXPERIENCE", img: "/assets/objects/skills.png", left: 62, tone: "text-green border-green/60" },
  { name: "contact", href: "/contact", sign: "4. CONTACT / RESUME", img: "/assets/objects/contact.png", left: 86, tone: "text-purple border-purple/60" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ============ TOP BAR: HUD · NAV · SOCIAL ============ */}
      <div className="w-full max-w-[1600px] mx-auto px-4 pt-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <PlayerHUD />
          <GameNav />
          <SocialIcons />
        </div>
      </div>

      {/* ============ HERO ============ */}
      <div className="w-full max-w-[1200px] mx-auto px-4 mt-8 mb-6">
        <HeroBanner />
      </div>

      {/* ============ INTERACTIVE WORLD (static preview → Phaser in Step 3) ============ */}
      <div className="w-full max-w-[1600px] mx-auto px-4 flex-1">
        <section
          id="world"
          className="relative h-[62vh] min-h-[460px] border-[5px] border-ink overflow-hidden"
          style={{ background: "linear-gradient(180deg,#1a0e3a 0%,#2f1860 26%,#4a2580 46%,#7a4f9a 57%,#26203f 57%)" }}
        >
          {/* sky */}
          <div className="absolute right-[7%] top-[8%] w-[78px] h-[78px] bg-gold"
               style={{ boxShadow: "0 0 0 10px rgba(255,215,106,.12), 0 0 64px 10px rgba(255,215,106,.22)" }} />
          {STARS.map((s, i) => (
            <span key={i} className="absolute bg-[#e3e7ff] animate-twinkle"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.big ? 6 : 4, height: s.big ? 6 : 4, animationDelay: `${s.delay}s` }} />
          ))}
          {/* skyline */}
          <div className="absolute left-0 right-0 top-[34%] h-[110px] bg-[#160c30]/85"
               style={{ clipPath: "polygon(0 60%,5% 60%,5% 26%,10% 26%,10% 55%,16% 55%,16% 18%,22% 18%,22% 50%,28% 50%,28% 36%,34% 36%,34% 62%,40% 62%,40% 24%,46% 24%,46% 52%,52% 52%,52% 16%,58% 16%,58% 48%,64% 48%,64% 32%,70% 32%,70% 58%,76% 58%,76% 22%,82% 22%,82% 50%,88% 50%,88% 38%,94% 38%,94% 60%,100% 60%,100% 100%,0 100%)" }} />
          {/* ground */}
          <div className="absolute left-0 right-0 bottom-0 h-[42%] border-t-[6px] border-[#0c1d10]"
               style={{ background: "repeating-linear-gradient(90deg,#1a3a1e 0 16px,#173420 16px 32px), linear-gradient(#1c3c20,#102a16)" }} />

          {/* doors */}
          {DOORS.map((d) => (
            <a key={d.name} href={d.href}
               className="group absolute bottom-[26%] -translate-x-1/2 flex flex-col items-center"
               style={{ left: `${d.left}%` }}>
              <span className={`mb-2 font-pixel text-[9px] px-2 py-1 bg-panel/90 border-[3px] ${d.tone} whitespace-nowrap`}>{d.sign}</span>
              <img src={d.img} alt={d.sign} width={132} height={132}
                   className="w-[120px] h-[120px] transition-transform duration-150 group-hover:scale-110 group-hover:-translate-y-1"
                   style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 0 transparent)" }} />
            </a>
          ))}

          {/* character */}
          <img src="/assets/character/south.png" alt="Varun character" width={120} height={120}
               className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[100px] h-[100px] animate-soft-float"
               style={{ imageRendering: "pixelated" }} />

          {/* controls hint */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-panel/90 border-[3px] border-ink px-4 py-2 text-center">
            <span className="font-pixel text-[9px] text-text">Use <span className="text-gold">WASD / Arrow Keys</span> to move · <span className="text-gold">ENTER</span> to open</span>
          </div>
        </section>
      </div>

      {/* ============ STAT CARDS ============ */}
      <div className="w-full max-w-[1600px] mx-auto px-4 my-6">
        <StatCards />
      </div>

      <footer className="text-center pb-6 font-body text-[16px] text-muted">
        <span className="text-green">◆</span> Crafting digital experiences, one pixel at a time. <span className="text-green">◆</span>
      </footer>
    </div>
  );
}
