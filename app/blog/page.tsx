import PageChrome from "@/components/PageChrome";
import Reveal from "@/components/Reveal";
import PixelButton from "@/components/pixel/PixelButton";
import AnimatedSprite from "@/components/AnimatedSprite";

const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  top: (i * 89 + 11) % 100,
  color: ["#ffd76a", "#4cc9ff", "#b7ff45", "#b83cff"][i % 4],
  size: 7 + (i % 3) * 4,
  delay: (i % 7) * 0.4,
  dur: 2 + (i % 4) * 0.7,
}));
const STAR = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

export default function Blog() {
  return (
    <PageChrome footer="More worlds are being built. Check back soon.">
      <div className="relative min-h-[72vh] flex flex-col items-center justify-center text-center gap-8 py-16 overflow-hidden">
        {/* floating sparkles */}
        {SPARKS.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute animate-twinkle"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, background: s.color, clipPath: STAR, WebkitClipPath: STAR, filter: `drop-shadow(0 0 5px ${s.color})`, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
          />
        ))}

        <Reveal className="relative z-10 flex flex-col items-center gap-7">
          <div className="font-pixel text-[12px] text-cyan tracking-[0.35em]">✦ THE ARCHIVE ✦</div>

          {/* giant glowing, flickering title */}
          <h1
            className="font-pixel text-green leading-none animate-flicker"
            style={{ fontSize: "clamp(56px,14vw,128px)", textShadow: "0 0 22px rgba(183,255,69,.75), 7px 7px 0 #000" }}
          >
            BLOG
          </h1>

          {/* coming soon badge with a shine sweep + glow pulse */}
          <div className="relative overflow-hidden border-[3px] border-gold bg-inset px-8 py-4 animate-glow-pulse">
            <span className="font-pixel text-[18px] md:text-[26px] text-gold tracking-widest">COMING SOON</span>
            <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/35 blur-md animate-xp-shine" />
          </div>

          {/* mascot tinkering away */}
          <AnimatedSprite dir="/assets/objects/anim/ai-engine" frames={4} size={150} className="mt-2" />

          <p className="font-body text-[22px] text-muted max-w-[640px] leading-snug">
            Dev logs, build breakdowns, and hackathon war-stories — currently in the workshop.
            New posts will spawn here soon.
          </p>

          {/* fake build progress bar */}
          <div className="w-[300px]">
            <div className="flex justify-between font-pixel text-[9px] text-muted mb-2">
              <span>BUILDING…</span>
              <span className="text-green">42%</span>
            </div>
            <div className="h-[14px] bg-night-deep border-[2px] border-ink overflow-hidden">
              <div className="h-full bg-green animate-pulse" style={{ width: "42%", backgroundImage: "linear-gradient(90deg,#000 0 1px,transparent 1px 12px)", backgroundSize: "12px 100%" }} />
            </div>
          </div>

          <div className="mt-2"><PixelButton href="/" variant="outline">↔ BACK TO WORLD</PixelButton></div>
        </Reveal>
      </div>
    </PageChrome>
  );
}
