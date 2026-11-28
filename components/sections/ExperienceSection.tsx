"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import AnimatedSprite from "@/components/AnimatedSprite";
import PhotoStrip from "@/components/PhotoStrip";
import Parallax from "@/components/Parallax";
import ScrollReveal from "@/components/ScrollReveal";
import { SectionHeading } from "./Headings";
import { awards, campus, professional, type Job } from "@/lib/content";

/** One role card: animated sprite, title/org, bullets, optional photo strip. */
function JobCard({ e }: { e: Job }) {
  return (
    <div className={`p-5 flex items-start gap-4 sm:gap-5`}>
      <AnimatedSprite dir={e.dir} frames={e.frames ?? 4} size={64} fps={6} className="shrink-0 hidden sm:block lg:!w-32 lg:!h-32" />
      <div className="relative min-w-0">
        {e.incoming && (
          <div className="incoming-badge inline-flex items-center gap-2 font-pixel text-[9px] text-gold bg-inset border-[2px] border-gold/70 px-2 py-1 mb-2">
            <span className="incoming-dot inline-block w-[6px] h-[6px] bg-gold" />
            INCOMING · FALL 2026
          </div>
        )}
        <div className={`font-pixel text-[12px] sm:text-[14px] lg:text-[18px] leading-snug ${e.tone}`}>{e.role}</div>
        <div className="font-body text-[17px] sm:text-[18px] lg:text-[24px] text-muted mt-1 lg:mt-2">{e.org}</div>
        {e.d && <div className="font-body text-[18px] sm:text-[19px] lg:text-[24px] text-text/90 mt-2">{e.d}</div>}
        {e.bullets && (
          <ul className="mt-2 lg:mt-3 space-y-2 lg:space-y-3">
            {e.bullets.map((b) => (
              <li key={b} className="font-body text-[18px] sm:text-[19px] lg:text-[24px] text-text/90 flex gap-2 leading-snug">
                <span className="text-gold shrink-0">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {e.photos && <PhotoStrip photos={e.photos} label={e.photoLabel ?? ""} />}
      </div>
    </div>
  );
}

/** A card on the timeline — slides in from its side, with a node on the line. */
function TimelineItem({ e, side }: { e: Job; side: "left" | "right" }) {
  return (
    <div className="relative lg:grid lg:grid-cols-2 py-4 sm:py-6">
      <span className="absolute left-[22px] lg:left-1/2 top-10 w-4 h-4 -ml-2 bg-gold border-2 border-ink shadow-[0_0_10px_rgba(255,215,106,0.6)] z-10" />
      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -70 : 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`pl-12 lg:pl-0 ${side === "left" ? "lg:pr-12 lg:col-start-1" : "lg:pl-12 lg:col-start-2"}`}
      >
        <JobCard e={e} />
      </motion.div>
    </div>
  );
}

function TrackLabel({ label, tone }: { label: string; tone: string }) {
  return (
    <div className="relative flex lg:justify-center py-6">
      <span className={`relative z-10 ml-0 lg:ml-0 font-pixel text-[9px] sm:text-[11px] lg:text-[15px] px-3 py-2 lg:px-4 lg:py-3 bg-inset border-[2px] border-ink shadow-blocky-sm ${tone}`}>
        {label}
      </span>
    </div>
  );
}

/** CHAPTER 01 — OVERVIEW, part 3: professional + campus roles, awards. */
export default function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="wide-zoom relative scroll-mt-16 py-16 sm:py-24">
      <div className="max-w-[1150px] lg:max-w-[1500px] 2xl:max-w-[1700px] mx-auto px-5 lg:px-10">
        <SectionHeading icon="💼" title="EXPERIENCE & LEADERSHIP" sub="Where I've levelled up — at work and on campus." tone="green" />

        <div ref={trackRef} className="relative">
          {/* the timeline line + its scroll-drawn fill */}
          <div className="absolute left-[22px] lg:left-1/2 top-0 bottom-0 w-[4px] -ml-[2px] bg-line" />
          <motion.div style={{ scaleY: line }} className="absolute left-[22px] lg:left-1/2 top-0 bottom-0 w-[4px] -ml-[2px] origin-top bg-green shadow-[0_0_10px_#b7ff45]" />

          <TrackLabel label="💼 PROFESSIONAL" tone="text-cyan" />
          {professional.map((e, i) => (
            <TimelineItem key={e.role} e={e} side={i % 2 === 0 ? "left" : "right"} />
          ))}
          <TrackLabel label="👥 CAMPUS & LEADERSHIP" tone="text-purple" />
          {campus.map((e, i) => (
            <TimelineItem key={e.role} e={e} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>

        {/* awards */}
        <div className="mt-20">
          <SectionHeading icon="🏆" title="AWARDS & HONORS" tone="gold" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((a, i) => (
              <Parallax key={a.n} speed={0.2 + i * 0.35}>
                <ScrollReveal delay={i * 0.08}>
                  <div className="p-5 text-center h-full">
                    <div className="text-[30px] lg:text-[48px]">{a.r}</div>
                    <div className="font-body text-[19px] lg:text-[25px] text-text mt-2 lg:mt-3 leading-snug">{a.n}</div>
                    <div className="font-pixel text-[12px] lg:text-[16px] text-gold mt-2 lg:mt-3">{a.p}</div>
                  </div>
                </ScrollReveal>
              </Parallax>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
