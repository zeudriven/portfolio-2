/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Door = { name: string; href: string; sign: string; left: number; frames: number; chip: string; loop?: boolean };

const DOORS: Door[] = [
  { name: "about", href: "/about", sign: "ABOUT ME", left: 14, frames: 9, chip: "text-gold border-gold/60" },
  { name: "projects", href: "/projects", sign: "PROJECTS", left: 38, frames: 9, chip: "text-green border-green/60", loop: true },
  { name: "skills", href: "/skills", sign: "SKILLS & EXPERIENCE", left: 62, frames: 9, chip: "text-cyan border-cyan/60", loop: true },
  { name: "contact", href: "/contact", sign: "CONTACT / RESUME", left: 86, frames: 9, chip: "text-purple border-purple/60", loop: true },
];

/** A door that plays its PixelLab open-animation frames while `active`, else shows the closed sprite. */
function AnimatedDoor({ d, active, onEnter, onLeave }: { d: Door; active: boolean; onEnter: () => void; onLeave: () => void }) {
  const [idx, setIdx] = useState(-1); // -1 = closed/static

  useEffect(() => {
    if (!active) { setIdx(-1); return; }
    let i = 0;
    setIdx(0);
    const t = setInterval(() => {
      i += 1;
      if (i >= d.frames - 1) {
        if (d.loop) { i = 0; setIdx(0); }              // loop forever while active
        else { setIdx(d.frames - 1); clearInterval(t); } // play once, hold open
      } else setIdx(i);
    }, d.loop ? 95 : 55);
    return () => clearInterval(t);
  }, [active, d.frames, d.loop]);

  const src = idx < 0 ? `/assets/objects/${d.name}.png` : `/assets/objects/anim/${d.name}/f${String(idx).padStart(2, "0")}.png`;

  return (
    <a
      href={d.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group absolute bottom-[10%] -translate-x-1/2 flex flex-col items-center outline-none"
      style={{ left: `${d.left}%` }}
    >
      <span className={`mb-2 font-pixel text-[9px] sm:text-[10px] px-2 py-1 bg-panel/90 border-[2px] ${d.chip} whitespace-nowrap transition-opacity ${active ? "opacity-100" : "opacity-80"}`}>
        {d.sign}
      </span>
      <img
        src={src}
        alt={d.sign}
        width={128}
        height={128}
        className="w-[clamp(110px,15vw,190px)] aspect-square transition-transform duration-150 group-hover:-translate-y-1"
        style={{ imageRendering: "pixelated" }}
      />
      <span className={`mt-1 font-pixel text-[8px] text-[#0b1206] bg-green px-2 py-1 border-[2px] border-ink transition-opacity ${active ? "opacity-100 animate-glow-pulse" : "opacity-0"}`}>
        ▶ ENTER
      </span>
    </a>
  );
}

export default function WorldHome() {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLImageElement>(null);
  const keys = useRef(new Set<string>());
  const hover = useRef<string | null>(null);
  const pos = useRef({ x: 0, y: 0, dir: "south", frame: 0, acc: 0, w: 0, h: 0 });
  const [active, setActive] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  activeRef.current = active;

  // deterministic stars

  const CW = 140; // character display size

  useEffect(() => {
    // preload frames
    ["south", "north", "east", "west"].forEach((dir) => {
      new Image().src = `/assets/character/${dir}.png`;
      for (let i = 0; i < 6; i++) new Image().src = `/assets/character/walk/${dir}/${i}.png`;
    });
    DOORS.forEach((d) => { for (let i = 0; i < d.frames; i++) new Image().src = `/assets/objects/anim/${d.name}/f${String(i).padStart(2, "0")}.png`; });

    const measure = () => {
      const s = sceneRef.current; if (!s) return;
      pos.current.w = s.clientWidth; pos.current.h = s.clientHeight;
      if (pos.current.x === 0) { pos.current.x = s.clientWidth / 2 - CW / 2; pos.current.y = s.clientHeight * 0.56; }
    };
    measure();
    window.addEventListener("resize", measure);

    const onKey = (e: KeyboardEvent, down: boolean) => {
      const k = e.key.toLowerCase();
      const handled = ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "enter"];
      if (!handled.includes(k)) return;
      e.preventDefault();
      if (k === "enter") {
        if (down && activeRef.current) {
          const d = DOORS.find((x) => x.name === activeRef.current);
          if (d) router.push(d.href);
        }
        return;
      }
      if (down) keys.current.add(k); else keys.current.delete(k);
    };
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);

    let raf = 0; let last = performance.now();
    // --- TUNE ME ---
    const SPD = 8.5;          // movement speed (px/frame). Higher = walks faster across the screen.
    const STEP_MS = 70;       // leg-animation cadence (ms per walk frame). Lower = legs move faster.
    // ---------------
    const loop = (t: number) => {
      const dt = t - last; last = t;
      const p = pos.current;
      let dx = 0, dy = 0;
      if (keys.current.has("a") || keys.current.has("arrowleft")) dx -= SPD;
      if (keys.current.has("d") || keys.current.has("arrowright")) dx += SPD;
      if (keys.current.has("w") || keys.current.has("arrowup")) dy -= SPD;
      if (keys.current.has("s") || keys.current.has("arrowdown")) dy += SPD;
      const img = charRef.current;
      if ((dx || dy) && img) {
        p.x = Math.min(Math.max(p.x + dx, 6), p.w - CW - 6);
        const minY = p.h * 0.12, maxY = p.h - CW - 30;
        p.y = Math.min(Math.max(p.y + dy, minY), maxY);
        if (dx < 0) p.dir = "west"; else if (dx > 0) p.dir = "east"; else if (dy < 0) p.dir = "north"; else if (dy > 0) p.dir = "south";
        p.acc += dt;
        if (p.acc >= STEP_MS) { p.acc = 0; p.frame = (p.frame + 1) % 6; }
        img.src = `/assets/character/walk/${p.dir}/${p.frame}.png`;
      } else if (img) {
        if (p.frame !== 0) { p.frame = 0; img.src = `/assets/character/${p.dir}.png`; }
      }
      if (img) { img.style.left = `${p.x}px`; img.style.top = `${p.y}px`; }

      // nearest door by proximity (only when not hovering one with mouse)
      let near: string | null = null, best = 1e9;
      for (const d of DOORS) {
        const dc = (p.w * d.left) / 100;
        const dist = Math.abs(dc - (p.x + CW / 2));
        if (dist < 150 && dist < best) { best = dist; near = d.name; }
      }
      const want = hover.current ?? near;
      if (want !== activeRef.current) setActive(want);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [router]);

  const setHover = useCallback((name: string | null) => { hover.current = name; }, []);

  return (
    <section
      ref={sceneRef}
      id="world"
      className="relative w-full h-[80vh] min-h-[560px] overflow-hidden"
    >
      {/* transparent — the page-wide StarField sits behind (no seam with the dashboard) */}

      {/* doors */}
      {DOORS.map((d) => (
        <AnimatedDoor key={d.name} d={d} active={active === d.name} onEnter={() => setHover(d.name)} onLeave={() => setHover(null)} />
      ))}

      {/* walking character */}
      <img
        ref={charRef}
        src="/assets/character/south.png"
        alt="Varun character"
        width={CW}
        height={CW}
        className="absolute z-10"
        style={{ width: CW, height: CW, imageRendering: "pixelated", left: 0, top: 0 }}
      />

      {/* hint */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-panel/85 border-[2px] border-ink px-4 py-2 text-center">
        <span className="font-pixel text-[9px] text-text">
          <span className="text-gold">WASD / Arrows</span> to walk · hover or reach a door · <span className="text-gold">ENTER</span> to open
        </span>
      </div>
    </section>
  );
}
