"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * Big chapter title card. The giant outlined chapter number drifts at a different
 * speed (and direction) than the title in front of it — a mini parallax scene.
 */
export function ChapterTitle({ n, title, sub }: { n: string; title: string; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  return (
    <div ref={ref} className="relative py-24 sm:py-32 text-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span style={{ y: numY }} className="outline-num font-pixel leading-none text-[150px] sm:text-[260px]">
          {n}
        </motion.span>
      </div>
      <motion.div style={{ y: titleY }} className="relative">
        <div className="font-pixel text-[10px] sm:text-[12px] text-gold tracking-[0.35em]">✦ CHAPTER {n} ✦</div>
        <h2 className="mt-4 font-pixel text-[30px] sm:text-[56px] leading-none">
          <span className="pixel-shine hero-name" data-text={title}>
            {title}
          </span>
        </h2>
        <motion.div style={{ scaleX: lineScale }} className="mx-auto mt-6 h-[4px] w-[min(70vw,420px)] bg-green shadow-[0_0_12px_#b7ff45] origin-center" />
        {sub && <p className="mt-6 font-body text-[20px] sm:text-[24px] text-muted max-w-[680px] mx-auto px-5 leading-snug">{sub}</p>}
      </motion.div>
    </div>
  );
}

const toneText = { cyan: "text-cyan", green: "text-green", purple: "text-purple", gold: "text-gold" } as const;

/** Section heading inside a chapter (ABOUT, SKILLS…). */
export function SectionHeading({
  icon,
  title,
  sub,
  tone = "cyan",
  eyebrow,
}: {
  icon?: ReactNode;
  title: string;
  sub?: string;
  tone?: keyof typeof toneText;
  eyebrow?: string;
}) {
  return (
    <ScrollReveal className="text-center mb-12">
      {eyebrow && <div className="font-pixel text-[9px] sm:text-[11px] text-gold tracking-[0.3em] mb-4">{eyebrow}</div>}
      <h2 className={`font-pixel ${toneText[tone]} text-[20px] sm:text-[34px] leading-tight text-shadow-blocky`}>
        {icon && <span className="text-gold mr-2">{icon}</span>}
        <span className="pixel-shine title-glow" data-text={title}>
          {title}
        </span>
      </h2>
      {sub && <p className="font-body text-[20px] sm:text-[22px] text-muted mt-3">{sub}</p>}
    </ScrollReveal>
  );
}
