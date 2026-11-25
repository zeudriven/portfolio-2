"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Typewriter from "@/components/Typewriter";
import AnimatedSprite from "@/components/AnimatedSprite";
import PixelButton from "@/components/pixel/PixelButton";
import { heroRoles } from "@/lib/content";

/** A floating pixel object that drifts up at its own depth as the hero scrolls away. */
function Floater({
  progress,
  depth,
  className,
  children,
}: {
  progress: MotionValue<number>;
  depth: number; // px travelled over the hero's scroll (bigger = closer to the viewer)
  className: string;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, [0, 1], [0, -depth]);
  return (
    <motion.div aria-hidden style={{ y }} className={`absolute pointer-events-none ${className}`}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[620px] flex items-center justify-center overflow-hidden">
      {/* floating objects at different depths */}
      <Floater progress={scrollYProgress} depth={420} className="left-[6%] top-[20%] hidden sm:block">
        <img src="/assets/book.png" alt="" width={110} height={110} className="animate-soft-float w-[clamp(70px,8vw,110px)]" style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 18px rgba(76,201,255,0.35))" }} />
      </Floater>
      <Floater progress={scrollYProgress} depth={120} className="right-[9%] top-[24%]">
        <AnimatedSprite dir="/assets/objects/anim/trophy" frames={4} size={84} fps={5} className="animate-float" style={{ width: "clamp(52px,7vw,92px)", height: "auto", filter: "drop-shadow(0 0 18px rgba(255,215,106,0.45))" }} />
      </Floater>
      <Floater progress={scrollYProgress} depth={620} className="left-[12%] bottom-[22%]">
        <AnimatedSprite dir="/assets/objects/anim/ai-engine" frames={4} size={96} fps={6} className="animate-soft-float" style={{ width: "clamp(56px,8vw,104px)", height: "auto", filter: "drop-shadow(0 0 20px rgba(184,60,255,0.5))" }} />
      </Floater>
      <Floater progress={scrollYProgress} depth={300} className="right-[14%] bottom-[26%] hidden sm:block">
        <AnimatedSprite dir="/assets/objects/anim/dev" frames={4} size={80} fps={6} className="animate-float" style={{ width: "clamp(56px,6vw,84px)", height: "auto", filter: "drop-shadow(0 0 18px rgba(183,255,69,0.4))" }} />
      </Floater>

      {/* title block */}
      <motion.header style={{ y: titleY, scale: titleScale, opacity: fade }} className="relative z-10 text-center px-5 select-none">
        <div className="font-pixel text-[9px] sm:text-[11px] text-gold tracking-[0.3em]">✦ WELCOME TO MY WORLD ✦</div>
        <h1 className="mt-5 font-pixel leading-[1.05] tracking-wider text-[clamp(34px,7vw,84px)]">
          <span className="pixel-shine hero-name" data-text="VARUN PATEL">
            VARUN PATEL
            <i className="shine-pip" style={{ left: -14, top: 6 }} />
            <i className="shine-pip" style={{ right: -14, bottom: 10 }} />
          </span>
        </h1>
        <div className="mt-5 font-pixel text-[12px] sm:text-[16px] text-cyan min-h-[1.4em]">
          <Typewriter phrases={heroRoles} />
        </div>
        <p className="mt-5 font-body text-[19px] sm:text-[24px] text-muted max-w-[640px] mx-auto leading-snug">
          Computer Science @ York University · AI Data Engineer @ Ayvelis AI · building AI pipelines and full-stack products in Toronto.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PixelButton href="#about" variant="green">▶ START</PixelButton>
          <PixelButton href="#projects" variant="outline">◆ JUMP TO PROJECTS</PixelButton>
        </div>
      </motion.header>

      {/* scroll cue */}
      <motion.div style={{ opacity: cueOpacity }} aria-hidden className="absolute bottom-[96px] sm:bottom-[120px] left-1/2 -ml-[40px] w-[80px] text-center">
        <div className="font-pixel text-[8px] text-muted tracking-[0.3em]">SCROLL</div>
        <div className="mt-2 text-green text-[18px] animate-bob">▼</div>
      </motion.div>
    </section>
  );
}
