"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, useScroll, useTransform } from "framer-motion";
import PixelCity, { CITY_TILE } from "./PixelCity";

/**
 * The fixed night world behind the whole page. Every layer is driven by the page
 * scroll at a different rate, so scrolling reads as walking through one scene:
 *
 *   sky (static) → stars (drift up slowly) → moon (sets) → clouds → far city → near city
 *
 * The city/cloud layers move sideways — the ground strip + walking character
 * (ScrollWalker) move the same direction, selling the "walk to the right" feel.
 */

const STARS = Array.from({ length: 80 }, (_, i) => ({
  left: (i * 47 + 3) % 100,
  top: (i * 71 + 11) % 100,
  big: i % 9 === 0,
  delay: (i % 11) * 0.23,
}));

const SPARK_COLORS = ["#ffd76a", "#4cc9ff", "#b7ff45", "#ffffff"];
const SPARKLES = Array.from({ length: 9 }, (_, i) => ({
  left: (i * 53 + 9) % 100,
  top: (i * 89 + 7) % 100,
  size: 9 + (i % 3) * 5,
  color: SPARK_COLORS[i % SPARK_COLORS.length],
  delay: (i % 7) * 0.4,
  dur: 2.2 + (i % 4) * 0.6,
}));
const STAR_CLIP = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

/* pixel clouds: each is a few stacked bars, spread across one tile */
const CLOUDS = [
  { x: 80, y: 30, s: 1 },
  { x: 520, y: 0, s: 0.7 },
  { x: 860, y: 60, s: 1.2 },
  { x: 1250, y: 18, s: 0.85 },
];
function CloudTile() {
  return (
    <svg width={CITY_TILE} height={140} viewBox={`0 0 ${CITY_TILE} 140`} shapeRendering="crispEdges" className="block shrink-0">
      {CLOUDS.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) scale(${c.s})`} fill="#3a2a78">
          <rect x={24} y={0} width={56} height={10} />
          <rect x={8} y={10} width={104} height={12} />
          <rect x={0} y={22} width={136} height={12} fill="#2d2063" />
        </g>
      ))}
    </svg>
  );
}

const FAR_WINDOWS = ["rgba(255,215,106,0.35)", "rgba(76,201,255,0.3)"];
const NEAR_WINDOWS = ["#ffd76a", "#ffd76a", "#4cc9ff", "#b7ff45"];

export default function WorldBackdrop() {
  const { scrollY, scrollYProgress } = useScroll();

  // vertical drift (percent of the page scrolled → vh), clamped so no layer runs out
  const starsY = useTransform(scrollYProgress, [0, 1], ["0vh", "-55vh"]);
  const moonY = useTransform(scrollYProgress, [0, 1], ["0vh", "46vh"]);
  const moonX = useTransform(scrollYProgress, [0, 1], ["0vw", "-10vw"]);
  const moonGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.8, 0.55]);
  // the horizon warms up toward the end of the page (night → first light)
  const dawn = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  // horizontal parallax (px of scroll × depth factor), wrapped to the tile width
  const wrap = (f: number) => (v: number) => -((v * f) % CITY_TILE);
  const cloudX = useTransform(scrollY, wrap(0.03));
  const farX = useTransform(scrollY, wrap(0.06));
  const nearX = useTransform(scrollY, wrap(0.14));

  return (
    <div aria-hidden className="sky-layer fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* stars */}
      <motion.div style={{ y: starsY }} className="absolute inset-x-0 top-0 h-[160vh]">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute bg-[#e3e7ff] animate-twinkle"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.big ? 6 : 4, height: s.big ? 6 : 4, animationDelay: `${s.delay}s` }}
          />
        ))}
        {SPARKLES.map((s, i) => (
          <span
            key={`spark-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: s.color,
              clipPath: STAR_CLIP,
              WebkitClipPath: STAR_CLIP,
              filter: `drop-shadow(0 0 5px ${s.color})`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </motion.div>

      {/* moon — slowly sets as you scroll */}
      <motion.div style={{ y: moonY, x: moonX, opacity: moonGlow }} className="absolute top-[11vh] right-[7vw] w-[clamp(84px,10vw,160px)] aspect-square">
        <img
          src="/assets/moon.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 34px rgba(243,231,166,.28))" }}
        />
      </motion.div>

      {/* clouds */}
      <motion.div style={{ x: cloudX }} className="absolute top-[24vh] left-0 flex opacity-60">
        <CloudTile />
        <CloudTile />
      </motion.div>

      {/* first light on the horizon near the end of the page */}
      <motion.div
        style={{ opacity: dawn }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 35%, rgba(255,107,139,0.16) 75%, rgba(255,170,90,0.22) 100%)" }} />
      </motion.div>

      {/* far skyline */}
      <motion.div style={{ x: farX }} className="absolute left-0 bottom-[36px] sm:bottom-[44px] flex opacity-90">
        <PixelCity seed={7} height={240} minH={70} maxH={220} body="#1d1350" lit={0.14} windowColors={FAR_WINDOWS} />
        <PixelCity seed={7} height={240} minH={70} maxH={220} body="#1d1350" lit={0.14} windowColors={FAR_WINDOWS} />
      </motion.div>

      {/* near skyline */}
      <motion.div style={{ x: nearX }} className="absolute left-0 bottom-[36px] sm:bottom-[44px] flex">
        <PixelCity seed={21} height={150} minH={40} maxH={140} body="#0d0826" lit={0.2} windowColors={NEAR_WINDOWS} />
        <PixelCity seed={21} height={150} minH={40} maxH={140} body="#0d0826" lit={0.2} windowColors={NEAR_WINDOWS} />
      </motion.div>
    </div>
  );
}
