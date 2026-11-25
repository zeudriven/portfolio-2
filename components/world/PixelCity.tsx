import { useMemo } from "react";

/** Tile width in CSS px. Parallax layers render two tiles side by side and wrap their
 *  x offset modulo this value, so the skyline loops forever without a seam. */
export const CITY_TILE = 1600;

/** Small deterministic PRNG (mulberry32) — same skyline on server and client, no hydration diff. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rect = { x: number; y: number; w: number; h: number };
type Win = { x: number; y: number; c: string };

function buildCity(seed: number, height: number, minH: number, maxH: number, lit: number, windowColors: string[]) {
  const r = rng(seed);
  const blocks: Rect[] = [];
  const wins: Win[] = [];
  let x = 0;
  while (x < CITY_TILE) {
    let w = 48 + Math.floor((r() * 80) / 8) * 8;
    if (x + w > CITY_TILE) w = CITY_TILE - x;
    const h = minH + Math.floor((r() * (maxH - minH)) / 8) * 8;
    const y = height - h;
    blocks.push({ x, y, w, h });
    if (w > 40 && r() < 0.35) blocks.push({ x: x + 8, y: y - 8, w: w - 16, h: 8 }); // roof step
    if (w > 30 && r() < 0.3) blocks.push({ x: x + Math.floor(w / 2) - 2, y: y - 22, w: 4, h: 22 }); // antenna
    for (let wy = y + 10; wy < height - 12; wy += 14) {
      for (let wx = x + 8; wx < x + w - 10; wx += 12) {
        if (r() < lit) wins.push({ x: wx, y: wy, c: windowColors[Math.floor(r() * windowColors.length)] });
      }
    }
    x += w + (r() < 0.22 ? 8 : 0);
  }
  return { blocks, wins };
}

/** One 1600px-wide tile of pixel skyline (pure SVG rects, crisp edges). */
export default function PixelCity({
  seed,
  height,
  minH,
  maxH,
  body,
  lit = 0.18,
  windowColors,
}: {
  seed: number;
  height: number;
  minH: number;
  maxH: number;
  body: string;
  lit?: number;
  windowColors: string[];
}) {
  const city = useMemo(
    () => buildCity(seed, height, minH, maxH, lit, windowColors),
    [seed, height, minH, maxH, lit, windowColors]
  );
  return (
    <svg
      width={CITY_TILE}
      height={height}
      viewBox={`0 0 ${CITY_TILE} ${height}`}
      shapeRendering="crispEdges"
      className="block shrink-0"
    >
      {city.blocks.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={body} />
      ))}
      {city.wins.map((w, i) => (
        <rect key={`w${i}`} x={w.x} y={w.y} width={4} height={6} fill={w.c} />
      ))}
    </svg>
  );
}
