"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { walkerStops } from "@/lib/content";

/**
 * Fixed ground strip along the bottom of the screen with the pixel character on it.
 *
 *  - The character's x position = how far down the page you are (a walking progress bar).
 *  - Scrolling plays the walk cycle (one frame per STEP_PX scrolled): east going down,
 *    west going back up. Stop scrolling and it drops into its idle bop.
 *  - Signposts mark where each section starts; click one to jump there.
 *  - A speech bubble pops up each time the character reaches a new section.
 *
 * Everything per-frame is written straight to the DOM from one rAF loop (no React
 * re-render per scroll tick) — React state only changes when the current section does.
 */

// --- TUNE ME ---
const STEP_PX = 26; // px of scroll per walk frame (lower = faster legs)
const IDLE_MS = 220; // ms per idle frame
const STOP_MS = 140; // how long after the last scroll before switching to idle
const BUBBLE_MS = 3200; // how long the speech bubble stays up
const PAD = 10; // px kept clear at each screen edge
// ---------------

type Mark = { id: string; label: string; at: number };

export default function ScrollWalker() {
  const charRef = useRef<HTMLImageElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const [marks, setMarks] = useState<Mark[]>([]);
  const marksRef = useRef<Mark[]>([]);
  const [cw, setCw] = useState(102); // character display size
  const cwRef = useRef(102);
  const [stop, setStop] = useState(0);
  const [bubble, setBubble] = useState(false);

  // where each section starts, as a fraction of the scrollable page
  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const next = walkerStops.map((s) => {
        const el = document.getElementById(s.id);
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
        return { id: s.id, label: s.label, at: Math.min(1, Math.max(0, top / max)) };
      });
      marksRef.current = next;
      setMarks(next);
      const size = window.innerWidth < 640 ? 68 : 102;
      cwRef.current = size;
      setCw(size);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // the walk loop
  useEffect(() => {
    (["east", "west"] as const).forEach((d) => {
      for (let i = 0; i < 6; i++) new Image().src = `/assets/character/walk/${d}/${i}.png`;
      for (let i = 0; i < 4; i++) new Image().src = `/assets/character/idle/${d}/f0${i}.png`;
    });

    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let lastMove = -Infinity;
    let dist = 0;
    let dir: "east" | "west" = "east";
    let idleAcc = 0;
    let idleFrame = 0;
    let curSrc = "";
    let curStop = -1;

    const loop = (t: number) => {
      const dt = t - lastT;
      lastT = t;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, y / max));
      const size = cwRef.current;
      const x = PAD + p * (document.documentElement.clientWidth - size - PAD * 2);

      if (Math.abs(dy) > 0.3) {
        lastMove = t;
        dir = dy > 0 ? "east" : "west";
        dist += Math.abs(dy);
      }
      let src: string;
      if (t - lastMove < STOP_MS) {
        src = `/assets/character/walk/${dir}/${Math.floor(dist / STEP_PX) % 6}.png`;
        idleAcc = 0;
      } else {
        idleAcc += dt;
        if (idleAcc >= IDLE_MS) {
          idleAcc = 0;
          idleFrame = (idleFrame + 1) % 4;
        }
        src = `/assets/character/idle/${dir}/f0${idleFrame}.png`;
      }

      const img = charRef.current;
      if (img && src !== curSrc) {
        img.src = src;
        curSrc = src;
      }
      if (walkerRef.current) walkerRef.current.style.transform = `translate3d(${x}px,0,0)`;
      if (groundRef.current) groundRef.current.style.backgroundPositionX = `${-y * 0.35}px`;
      if (trailRef.current) trailRef.current.style.width = `${x + size / 2}px`;

      const ms = marksRef.current;
      let s = 0;
      for (let k = 0; k < ms.length; k++) if (p >= ms[k].at - 0.004) s = k;
      if (s !== curStop) {
        curStop = s;
        setStop(s);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // speech bubble on every new section
  useEffect(() => {
    setBubble(true);
    const t = setTimeout(() => setBubble(false), BUBBLE_MS);
    return () => clearTimeout(t);
  }, [stop]);

  const flipBubble = (marks[stop]?.at ?? 0) > 0.6; // near the right edge → bubble opens leftward
  const markLeft = (at: number) => `calc(${PAD}px + ${at} * (100% - ${cw + PAD * 2}px) + ${cw / 2}px)`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 h-[36px] sm:h-[44px] pointer-events-none select-none">
      {/* ground */}
      <div ref={groundRef} className="pixel-ground absolute inset-0" />
      {/* the path walked so far glows */}
      <div ref={trailRef} className="absolute left-0 top-0 h-[3px] bg-gold shadow-[0_0_10px_rgba(255,215,106,0.7)]" style={{ width: 0 }} />

      {/* signposts */}
      {marks.map((m, k) => (
        <button
          key={m.id}
          type="button"
          aria-label={`Jump to ${m.label.toLowerCase()}`}
          onClick={() => document.getElementById(m.id)?.scrollIntoView({ behavior: "smooth" })}
          className="pointer-events-auto absolute bottom-full -translate-x-1/2 flex flex-col items-center group"
          style={{ left: markLeft(m.at) }}
        >
          <span
            className={`hidden md:block font-pixel text-[7px] px-1.5 py-1 border-2 border-ink transition-colors ${
              k <= stop ? "bg-panel text-gold" : "bg-panel/80 text-muted"
            } group-hover:text-green`}
          >
            {m.label}
          </span>
          <span className={`md:hidden block w-2 h-2 border-2 border-ink ${k <= stop ? "bg-gold" : "bg-panel"}`} />
          <span className="block w-[3px] h-2.5 bg-[#6b4a2b]" />
        </button>
      ))}

      {/* character + speech bubble */}
      <div ref={walkerRef} className="absolute left-0 bottom-full" style={{ width: cw }}>
        <div
          className={`walker-bubble ${flipBubble ? "right-[40%]" : "left-[40%]"} ${bubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
          aria-live="polite"
        >
          {walkerStops[stop]?.say}
        </div>
        <img
          ref={charRef}
          src="/assets/character/idle/east/f00.png"
          alt=""
          aria-hidden
          width={cw}
          height={cw}
          className="block"
          style={{ width: cw, height: cw, imageRendering: "pixelated", marginBottom: -Math.round(cw * 0.1) }}
        />
      </div>
    </div>
  );
}
