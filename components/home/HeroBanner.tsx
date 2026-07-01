"use client";

import Typewriter from "@/components/Typewriter";

/** Compact hero: small eyebrow, neon title, typewriter role line. (No CTA — the world is right below.) */
export default function HeroBanner() {
  return (
    <header className="text-center select-none">
      <div className="font-pixel text-[8px] sm:text-[10px] text-gold tracking-[0.25em]">
        ✦ WELCOME TO MY WORLD ✦
      </div>

      <h1 className="mt-3 font-pixel text-green leading-[1.05] tracking-wider text-[clamp(30px,6vw,68px)]"
          style={{ textShadow: "0 0 18px rgba(183,255,69,0.45), 5px 5px 0 #000" }}>
        VARUN PATEL
      </h1>

      <div className="mt-3 font-pixel text-[12px] sm:text-[14px] text-cyan min-h-[1.4em]">
        <Typewriter phrases={["CS Student", "Full-Stack Developer", "AI Data Engineer", "Hackathon Builder"]} />
      </div>
    </header>
  );
}
