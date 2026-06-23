"use client";

import Typewriter from "./Typewriter";

/**
 * Cinematic hero: eyebrow, massive neon title, typewriter role line, pulsing CTA.
 * The CTA scrolls down to the interactive world.
 */
export default function HeroBanner() {
  const explore = () =>
    document.getElementById("world")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <header className="text-center select-none">
      <div className="font-pixel text-[10px] sm:text-[12px] text-gold tracking-[0.25em]">
        ✦ WELCOME TO MY WORLD ✦
      </div>

      <h1 className="mt-4 font-pixel text-green leading-[1.05] tracking-wider text-[clamp(34px,7vw,84px)]"
          style={{ textShadow: "0 0 18px rgba(183,255,69,0.45), 5px 5px 0 #000" }}>
        VARUN PATEL
      </h1>

      <div className="mt-4 font-pixel text-[12px] sm:text-[15px] text-cyan min-h-[1.4em]">
        <Typewriter phrases={["CS Student", "Full-Stack Developer", "Software Engineer", "AI Enthusiast"]} />
      </div>

      <button
        onClick={explore}
        className="group mt-7 inline-flex items-center gap-3 bg-green text-[#0b1206] font-pixel text-[11px] sm:text-[13px]
                   px-6 py-4 border-[4px] border-ink shadow-blocky animate-glow-pulse
                   transition-transform active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        PRESS ENTER TO EXPLORE
        <span className="group-hover:translate-x-1 transition-transform">↵</span>
      </button>
    </header>
  );
}
