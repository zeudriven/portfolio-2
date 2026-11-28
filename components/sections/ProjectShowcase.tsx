"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import AnimatedSprite from "@/components/AnimatedSprite";
import HighlightText from "@/components/HighlightText";
import PixelButton from "@/components/pixel/PixelButton";
import { projects, toneStyles, type Project } from "@/lib/content";

/* ============================================================
   CHAPTER 02 — PROJECT SHOWCASE

   One tall section with a single sticky, full-screen stage. The
   page scroll inside it is converted to `u` = "screens scrolled"
   and every layer below is a function of `u`:

     u 0 → 1.4      chapter gate: title, door opens, zoom through it
     u 1.4 → …      each project slides up over the previous one,
                    holds for STEP screens while its own layers
                    (screenshot, giant number, props, grid) drift
                    at different speeds, then shrinks + dims as the
                    next one covers it.

   Tune the pacing with the constants below.
   ============================================================ */

const GATE = 1.4; // screens spent on the chapter gate before project 1 slides in
const STEP = 1.3; // screens each project owns
const ENTER = 0.45; // screens a project takes to slide over the previous one
const N = projects.length;
const TOTAL = GATE + N * STEP + 0.2; // total scroll length of the stage, in screens
const start = (i: number) => GATE + i * STEP;

/** true on desktop widths — scenes use bigger parallax travel there */
function useIsWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

/* ---------------- the chapter gate ---------------- */

const DOOR_FRAMES = 9;

function Gate({ u }: { u: MotionValue<number> }) {
  const doorRef = useRef<HTMLImageElement>(null);
  const titleY = useTransform(u, [0, 0.9], [0, -90]);
  const titleOpacity = useTransform(u, [0.5, 0.85], [1, 0]);
  const doorY = useTransform(u, [0, 0.55], [80, 0]);
  const doorScale = useTransform(u, [0.6, 1.45], [1, 11]);
  const flash = useTransform(u, [1.0, 1.3, 1.75], [0, 1, 0]);

  useEffect(() => {
    for (let i = 0; i < DOOR_FRAMES; i++) new Image().src = `/assets/objects/anim/projects/f0${i}.png`;
  }, []);

  // the door's open animation is scrubbed by scroll (closed sprite before it starts)
  useMotionValueEvent(u, "change", (v) => {
    const f = Math.floor(((v - 0.12) / 0.5) * DOOR_FRAMES);
    const src = f < 0 ? "/assets/objects/projects.png" : `/assets/objects/anim/projects/f0${Math.min(DOOR_FRAMES - 1, f)}.png`;
    const img = doorRef.current;
    if (img && img.getAttribute("src") !== src) img.setAttribute("src", src);
  });

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
      <motion.div style={{ y: titleY, opacity: titleOpacity }}>
        <div className="font-pixel text-[10px] sm:text-[12px] text-gold tracking-[0.35em]">✦ CHAPTER 02 ✦</div>
        <h2 className="mt-4 font-pixel text-[26px] sm:text-[52px] leading-tight">
          <span className="pixel-shine hero-name" data-text="PROJECT SHOWCASE">
            PROJECT SHOWCASE
          </span>
        </h2>
        <p className="mt-4 font-body text-[19px] sm:text-[24px] text-muted">
          {N} builds · keep scrolling to step inside
        </p>
      </motion.div>
      <motion.img
        ref={doorRef}
        src="/assets/objects/projects.png"
        alt=""
        aria-hidden
        width={220}
        height={220}
        style={{ y: doorY, scale: doorScale, imageRendering: "pixelated" }}
        className="mt-8 w-[clamp(140px,20vw,220px)] aspect-square"
      />
      <motion.div
        aria-hidden
        style={{ opacity: flash }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 55%, rgba(183,255,69,0.85), rgba(76,201,255,0.55) 35%, rgb(5,8,22) 80%)" }} />
      </motion.div>
    </div>
  );
}

/* ---------------- one project scene ---------------- */

/** A small sprite floating in a scene at its own depth. */
function FloatProp({
  u,
  range,
  dir,
  depth,
  className,
}: {
  u: MotionValue<number>;
  range: [number, number];
  dir: string;
  depth: number;
  className: string;
}) {
  const y = useTransform(u, range, [depth, -depth]);
  return (
    <motion.div aria-hidden style={{ y }} className={`absolute pointer-events-none ${className}`}>
      <AnimatedSprite dir={dir} frames={4} size={72} fps={5} className="animate-soft-float opacity-80" style={{ width: "clamp(44px,5vw,76px)", height: "auto" }} />
    </motion.div>
  );
}

/** A glowing pixel square drifting at its own depth. */
function FloatPixel({ u, range, depth, className, rgb }: { u: MotionValue<number>; range: [number, number]; depth: number; className: string; rgb: string }) {
  const y = useTransform(u, range, [depth, -depth]);
  return (
    <motion.span
      aria-hidden
      style={{ y, background: `rgb(${rgb})`, boxShadow: `0 0 12px rgba(${rgb},0.8)` }}
      className={`absolute block pointer-events-none animate-twinkle ${className}`}
    />
  );
}

function Visual({ p }: { p: Project }) {
  const t = toneStyles[p.tone];
  if (p.img) {
    // screenshot inside a chunky pixel monitor
    return (
      <div className="relative">
        <div className="pixel-panel-2 p-2 sm:p-3" style={{ boxShadow: `10px 12px 0 0 #000, 0 0 48px rgba(${t.rgb},0.35)` }}>
          <div className="flex items-center gap-1.5 pb-2">
            <span className="w-2.5 h-2.5 bg-rose border border-ink" />
            <span className="w-2.5 h-2.5 bg-gold border border-ink" />
            <span className="w-2.5 h-2.5 bg-green border border-ink" />
            <span className="ml-2 font-pixel text-[7px] sm:text-[8px] text-muted truncate">{p.title.toUpperCase().replace(/\s+/g, "_")}.EXE</span>
          </div>
          <img src={p.img} alt={`${p.title} screenshot`} className="block w-full aspect-[3/2] object-cover border-2 border-ink bg-inset" style={{ imageRendering: "auto" }} />
        </div>
        <div className="hidden sm:block mx-auto w-16 h-5 bg-panel-2 border-x-2 border-ink" />
        <div className="hidden sm:block mx-auto w-40 h-3 bg-panel-2 border-2 border-ink shadow-blocky" />
      </div>
    );
  }
  // no screenshot → the project's animated pixel object, big, on a glowing pedestal
  return (
    <div className="relative flex flex-col items-center">
      <div aria-hidden className="absolute top-[8%] w-[80%] aspect-square" style={{ background: `radial-gradient(closest-side, rgba(${t.rgb},0.38), transparent)` }} />
      <AnimatedSprite
        dir={p.anim!}
        frames={p.frames ?? 4}
        size={256}
        fps={6}
        className="relative animate-soft-float"
        style={{ width: "min(40vw, 300px)", height: "auto", filter: `drop-shadow(0 0 28px rgba(${t.rgb},0.6))` }}
      />
      <div className="relative mt-2 w-[min(44vw,300px)] h-5 border-2 border-ink" style={{ background: `rgba(${t.rgb},0.28)`, boxShadow: `0 0 26px rgba(${t.rgb},0.45), 6px 6px 0 0 #000` }} />
    </div>
  );
}

function Scene({ p, i, u, still = false }: { p: Project; i: number; u: MotionValue<number>; still?: boolean }) {
  const wide = useIsWide();
  const a = wide ? 1 : 0.45; // parallax travel multiplier
  const s = start(i);
  const last = i === N - 1;
  const t = toneStyles[p.tone];
  const span: [number, number] = [s, s + STEP + ENTER];

  // enter (slide over the previous scene) + exit (shrink and dim under the next one)
  const enterY = useTransform(u, [s, s + ENTER], ["100%", "0%"]);
  const exitScale = useTransform(u, [s + STEP, s + STEP + ENTER], [1, last ? 1 : 0.9]);
  const dim = useTransform(u, [s + STEP, s + STEP + ENTER], [0, last ? 0 : 0.7]);

  // inner parallax — every layer travels a different distance over the same scroll
  const visualY = useTransform(u, span, [130 * a, -110 * a]);
  const visualRot = useTransform(u, span, [-4 * a, 3 * a]);
  const textY = useTransform(u, span, [60 * a, -50 * a]);
  const numX = useTransform(u, span, ["12%", "-16%"]);
  const numY = useTransform(u, span, [-40 * a, 80 * a]);
  const gridY = useTransform(u, span, [0, -160]);

  return (
    <motion.article
      style={still ? { zIndex: 10 + i } : { y: enterY, zIndex: 10 + i }}
      className={`${still ? "relative min-h-[100svh]" : "absolute inset-0"} overflow-hidden bg-night-deep border-t-[3px] border-ink`}
      aria-label={`Project ${i + 1}: ${p.title}`}
    >
      <motion.div style={{ scale: exitScale, transformOrigin: "50% 30%" }} className="absolute inset-0">
        {/* tone-tinted backdrop + drifting pixel grid */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(70% 60% at 30% 45%, rgba(${t.rgb},0.2), transparent 70%), var(--page-bg)` }} />
        <motion.div style={{ y: gridY }} className="pixel-grid absolute inset-x-0 top-0 h-[150%] opacity-50" />

        {/* giant outlined project number, slowest layer */}
        <motion.div
          aria-hidden
          style={{ x: numX, y: numY, WebkitTextStroke: `2px rgba(${t.rgb},0.28)` }}
          className="absolute right-0 top-[10%] font-pixel leading-none text-transparent select-none text-[40vw] lg:text-[24vw]"
        >
          {String(i + 1).padStart(2, "0")}
        </motion.div>

        {/* floating props + pixels at their own depths */}
        <FloatProp u={u} range={span} dir={p.props[0]} depth={260 * a} className="left-[4%] top-[18%]" />
        <FloatProp u={u} range={span} dir={p.props[1]} depth={420 * a} className="right-[6%] bottom-[20%] hidden sm:block" />
        <FloatPixel u={u} range={span} depth={180 * a} rgb={t.rgb} className="w-2 h-2 left-[46%] top-[16%]" />
        <FloatPixel u={u} range={span} depth={340 * a} rgb={t.rgb} className="w-3 h-3 left-[8%] bottom-[30%]" />
        <FloatPixel u={u} range={span} depth={520 * a} rgb="255,215,106" className="w-2 h-2 right-[30%] top-[22%]" />
        <FloatPixel u={u} range={span} depth={260 * a} rgb="183,255,69" className="w-2 h-2 right-[12%] top-[60%]" />
      </motion.div>

      {/* content */}
      <motion.div style={{ scale: exitScale, transformOrigin: "50% 30%" }} className="relative h-full">
        <div className={`${still ? "py-24" : "h-full pt-[72px] pb-[56px] sm:pt-24 sm:pb-20"} max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr] gap-5 lg:gap-14 items-center justify-center`}>
          <motion.div style={{ y: visualY, rotate: visualRot }} className="w-full max-w-[300px] sm:max-w-[460px] lg:max-w-[560px] justify-self-center">
            <Visual p={p} />
          </motion.div>

          <motion.div style={{ y: textY }} className="w-full max-w-[600px]">
            <div className={`font-pixel text-[9px] sm:text-[11px] ${t.text} tracking-[0.2em]`}>
              PROJECT {String(i + 1).padStart(2, "0")} · {p.year}
            </div>
            <h3 className="font-pixel text-text text-[17px] sm:text-[26px] lg:text-[32px] leading-tight mt-2 sm:mt-3">{p.title}</h3>
            <div className="font-body text-[18px] sm:text-[22px] text-muted mt-1">{p.kicker}</div>
            {p.award && (
              <div className="inline-flex items-center gap-2 mt-3 border-2 border-gold/70 text-gold bg-inset font-pixel text-[8px] sm:text-[10px] px-2 py-1.5 animate-glow-pulse">
                🏆 {p.award}
              </div>
            )}
            <p className="font-body text-[17px] sm:text-[21px] text-text/85 leading-snug mt-3 sm:mt-4">
              <HighlightText text={p.desc} terms={p.highlight} />
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-5">
              {p.stack.map((x) => (
                <span key={x} className="font-body text-[15px] sm:text-[17px] text-purple px-2 py-0.5 sm:py-1 bg-inset border-2 border-purple/40">
                  {x}
                </span>
              ))}
            </div>
            <div className="mt-4 sm:mt-6">
              <PixelButton href={p.link} external variant="outline">
                {p.linkLabel === "DEVPOST" ? "◆" : "⛓"} VIEW ON {p.linkLabel} →
              </PixelButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* dims as the next scene covers it */}
      {!still && <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-night-deep pointer-events-none" />}
    </motion.article>
  );
}

/* ---------------- progress HUD ---------------- */

function ShowcaseHud({ u }: { u: MotionValue<number> }) {
  const [idx, setIdx] = useState(-1);
  useMotionValueEvent(u, "change", (v) => {
    // a project counts as "current" once it's halfway through sliding in
    const k = v < GATE + ENTER / 2 ? -1 : Math.min(N - 1, Math.floor((v - GATE - ENTER / 2) / STEP));
    setIdx((prev) => (prev === k ? prev : k));
  });
  const shown = Math.max(0, idx);
  return (
    <div
      aria-hidden
      className={`absolute z-[60] right-2 sm:right-5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-2 transition-opacity duration-300 ${
        idx < 0 ? "opacity-0" : "opacity-100"
      }`}
    >
      {projects.map((p, k) => (
        <span
          key={p.title}
          className={`w-3 h-3 border-2 border-ink transition-colors ${
            k === shown ? "bg-green shadow-[0_0_8px_#b7ff45]" : k < shown ? "bg-green/40" : "bg-inset"
          }`}
        />
      ))}
      <span className="font-pixel text-[9px] text-green mt-1">
        {String(shown + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ---------------- section ---------------- */

function PinnedShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const u = useTransform(scrollYProgress, (v) => v * TOTAL);

  return (
    <section ref={ref} id="projects" className="relative" style={{ height: `${(TOTAL + 1) * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Gate u={u} />
        {projects.map((p, i) => (
          <Scene key={p.title} p={p} i={i} u={u} />
        ))}
        <ShowcaseHud u={u} />
      </div>
    </section>
  );
}

/** Reduced-motion fallback: same scenes, stacked normally, nothing pinned or moving. */
function StillScene({ p, i }: { p: Project; i: number }) {
  const u = useMotionValue(start(i) + ENTER);
  return <Scene p={p} i={i} u={u} still />;
}

function StaticShowcase() {
  return (
    <section id="projects" className="relative scroll-mt-16">
      <div className="py-24 text-center px-5">
        <div className="font-pixel text-[10px] sm:text-[12px] text-gold tracking-[0.35em]">✦ CHAPTER 02 ✦</div>
        <h2 className="mt-4 font-pixel text-[26px] sm:text-[52px] leading-tight">
          <span className="hero-name">PROJECT SHOWCASE</span>
        </h2>
      </div>
      {projects.map((p, i) => (
        <StillScene key={p.title} p={p} i={i} />
      ))}
    </section>
  );
}

const noopSubscribe = () => () => {};

export default function ProjectShowcase() {
  const reduce = useReducedMotion();
  // the server can't know the reduced-motion setting, so hydrate as the pinned version first
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return mounted && reduce ? <StaticShowcase /> : <PinnedShowcase />;
}
