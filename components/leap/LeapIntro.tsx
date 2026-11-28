"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import s from "./LeapIntro.module.css";
import { createLeapAudio, type LeapAudio } from "./leapAudio";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "500"], style: ["normal", "italic"], variable: "--font-leap-serif", display: "swap" });
const sans = Montserrat({ subsets: ["latin"], weight: ["300", "500"], variable: "--font-leap-sans", display: "swap" });

/**
 * Cinematic opening for the home page.
 *
 *  1. intro   the film (public/leap/intro.mp4) plays by itself with clean titles timed to it; scroll is locked
 *  2. paused  it holds on "Take the leap" mid-fall and asks you to scroll
 *  3. scroll  scrolling the spacer pixelates the paused frame; the title turns into pixel type
 *  4. dive    ~1.2s: the pixel scene zooms in, light streaks and words fly past, everything blooms to white
 *  5. type    "LEVEL 01" types itself out on a still white screen
 *  6. done    the white fades away to reveal the portfolio underneath; the spacer is removed
 *
 * Sound (leapAudio.ts) is synthesised live and cued from the same loop, so it stays in sync with
 * every phase. Browsers need a click/key press before audio can start: the "Sound" toggle, or any
 * click/key press during the intro, turns it on.
 */

const VW = 1920, VH = 1098;          // film frame size
const LW = 320, LH = 183;            // pixel world resolution (same 1.75 aspect)
const CHAR_BOX = [426, 276, 911, 673]; // cut-out position inside the 1344x768 render
const LINE = "You fell through the city. Welcome to my world.";
const FLY = ["IDEAS", "CODE", "AI", "DATA", "DESIGN", "BUILD", "YORK U", "PYTHON", "REACT", "LEAP", "CURIOUS", "SHIP IT"];
const TITLES = [
  { a: 0.3, b: 1.9, eye: "A short film by", big: "VARUN PATEL" },
  { a: 2.1, b: 3.7, eye: "Computer Science · York University", line: "I build things that think, move and help." },
  { a: 3.9, b: 5.2, line: "Every big idea starts at the edge." },
  { a: 5.6, b: 999, eye: "Chapter one", big: "Take the leap", last: true },
];

let hasPlayed = false;

type Phase = "intro" | "paused" | "scroll" | "dive" | "type" | "fading" | "done";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x: number) => x * x * (3 - 2 * x);
const hash = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
const noopSubscribe = () => () => {};

/** false during SSR and hydration, true afterwards. */
const useMounted = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

export default function LeapIntro() {
  const [done, setDone] = useState(() => hasPlayed);
  const [fading, setFading] = useState(false);
  const [needPlay, setNeedPlay] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<LeapAudio | null>(null);
  const soundRef = useRef({ on: false, chosen: false }); // chosen = the visitor used the toggle themselves
  // The <video> is client-only: video-speed browser extensions inject controls next to any
  // <video> in the server HTML before React hydrates, which breaks hydration.
  const mounted = useMounted();
  const overlayRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const hiRef = useRef<HTMLCanvasElement>(null);
  const loRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const filmRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pxRef = useRef<HTMLDivElement>(null);
  const flyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whiteRef = useRef<HTMLDivElement>(null);
  const wtextRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const api = useRef<{ endIntro: () => void; play: () => void; sound: (on: boolean) => void }>({ endIntro: () => {}, play: () => {}, sound: () => {} });

  // when finished, drop the spacer and put the reader at the top of the portfolio in the same frame
  useLayoutEffect(() => {
    if (!done) return;
    document.documentElement.classList.remove("leap-locked", "leap-portrait");
    window.scrollTo(0, 0);
  }, [done]);

  useEffect(() => {
    if (hasPlayed || !mounted) return;
    const vid = vidRef.current!, hi = hiRef.current!, lo = loRef.current!;
    const h = hi.getContext("2d")!, g = lo.getContext("2d", { willReadFrequently: true })!;
    hi.width = VW; hi.height = VH; lo.width = LW; lo.height = LH;
    g.imageSmoothingEnabled = false;
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phase: Phase = "intro";
    let raf = 0;

    const load = (src: string) => { const i = new Image(); i.src = src; return i; };
    const pauseImg = load("/leap/pause.jpg"), bgImg = load("/leap/bg.jpg"), chImg = load("/leap/char.png");

    /* ---------- layout ---------- */
    let S = 1;
    const fit = () => {
      const portrait = innerWidth < innerHeight * 0.9;
      root.classList.toggle("leap-portrait", portrait);
      S = portrait ? Math.max(innerWidth / LW, (innerHeight * 0.58) / LH) : Math.max(innerWidth / LW, innerHeight / LH);
      const w = LW * S, hh = LH * S, ox = (innerWidth - w) / 2, oy = (innerHeight - hh) / 2;
      for (const c of [vid, hi, lo] as HTMLElement[]) { c.style.width = w + "px"; c.style.height = hh + "px"; c.style.left = ox + "px"; c.style.top = oy + "px"; }
    };
    fit();
    addEventListener("resize", fit);

    const lock = (on: boolean) => root.classList.toggle("leap-locked", on);
    const block = (e: Event) => { if (root.classList.contains("leap-locked")) e.preventDefault(); };
    addEventListener("touchmove", block, { passive: false });
    addEventListener("wheel", block, { passive: false });
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    lock(true);

    const R = (x: number, y: number, w: number, hh: number, c: string) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(hh))); };
    const posterize = (levels: number, w = lo.width, hh = lo.height) => {
      const d = g.getImageData(0, 0, w, hh), a = d.data, st = 255 / (levels - 1);
      for (let i = 0; i < a.length; i += 4) { a[i] = Math.round(a[i] / st) * st; a[i + 1] = Math.round(a[i + 1] / st) * st; a[i + 2] = Math.round(a[i + 2] / st) * st; }
      g.putImageData(d, 0, 0);
    };

    /* ---------- titles ---------- */
    const films = filmRefs.current;
    const filmTitles = (time: number) => {
      films.forEach((el, i) => {
        if (!el) return;
        const { a, b } = TITLES[i];
        const o = Math.min(clamp((time - a) / 0.7), clamp((b - time) / 0.5));
        const rise = (1 - ease(clamp((time - a) / 1.2))) * 18;
        el.style.opacity = String(o);
        el.style.transform = `translateY(${rise.toFixed(1)}px)`;
        el.style.filter = `blur(${((1 - o) * 8).toFixed(1)}px)`;
        el.style.letterSpacing = `${(0.02 + o * 0.06).toFixed(3)}em`;
      });
    };
    const lastFilm = () => films[TITLES.length - 1]!;

    /* ---------- fly words ---------- */
    const flies = FLY.map((_, i) => ({ ang: i * 2.39996 + 0.4, start: ((i * 7) % FLY.length) / FLY.length }));
    const flyText = (p: number, show: boolean) => {
      flies.forEach((f, i) => {
        const el = flyRefs.current[i]; if (!el) return;
        const z = (p * 2.4 + f.start) % 1, sc = 0.2 + z * z * 4.5, r = z * z * Math.min(innerWidth, innerHeight) * 0.75;
        el.style.opacity = show ? String(clamp(z * 3) * clamp((1 - z) * 4)) : "0";
        el.style.transform = `translate(-50%,-50%) translate(${(Math.cos(f.ang) * r * 1.4).toFixed(0)}px,${(Math.sin(f.ang) * r).toFixed(0)}px) scale(${sc.toFixed(2)})`;
      });
    };

    /* ---------- pixel dive scene ---------- */
    const streaks = Array.from({ length: 40 }, (_, i) => ({ x: hash(i) * LW, y: hash(i * 3) * LH, v: 2 + hash(i * 7) * 5, l: 5 + hash(i * 5) * 14 }));
    const fallScene = (p: number, off: number) => {
      const z = 1 + p * 0.7;
      g.imageSmoothingEnabled = true; g.drawImage(bgImg, (LW - LW * z) / 2, (LH - LH * z) * 0.62, LW * z, LH * z); g.imageSmoothingEnabled = false;
      g.globalAlpha = 0.3 + p * 0.3; R(0, 0, LW, LH, "#070a18"); g.globalAlpha = 1;
      for (const st of streaks) { const y = ((st.y - off * 0.02 * st.v) % (LH + 40) + LH + 40) % (LH + 40) - 20; g.globalAlpha = 0.6; R(st.x, y, 1, st.l, hash(st.x) > 0.5 ? "#ffe2a0" : "#bfe4ff"); }
      g.globalAlpha = 1;
      const gr = g.createRadialGradient(LW / 2, LH * 1.05, 4, LW / 2, LH * 1.05, 40 + p * 200);
      gr.addColorStop(0, "rgba(255,240,190,.95)"); gr.addColorStop(0.4, "rgba(255,190,90,.5)"); gr.addColorStop(1, "rgba(255,160,60,0)");
      g.fillStyle = gr; g.fillRect(0, 0, LW, LH);
      const sc = (LW / 1344) * (1 - p * 0.55);
      const cw = (CHAR_BOX[2] - CHAR_BOX[0]) * sc, ch = (CHAR_BOX[3] - CHAR_BOX[1]) * sc;
      const cx0 = ((CHAR_BOX[0] + CHAR_BOX[2]) / 2) * LW / 1344, cy0 = ((CHAR_BOX[1] + CHAR_BOX[3]) / 2) * LH / 768;
      const cx = cx0 + (LW / 2 - cx0) * p, cy = cy0 + (LH * 0.6 - cy0) * p;
      g.drawImage(chImg, Math.round(cx - cw / 2), Math.round(cy - ch / 2), Math.round(cw), Math.round(ch));
    };

    /* ---------- sound ---------- */
    const sfx = () => (soundRef.current.on ? audioRef.current : null);
    const sound = (on: boolean) => {
      if (!audioRef.current) audioRef.current = createLeapAudio();
      audioRef.current.setOn(on);
      soundRef.current.on = on;
      setSoundOn(on);
    };
    // the first click / key press anywhere in the intro turns sound on (unless they used the toggle)
    const onGesture = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-sound-toggle]")) return;
      if (!soundRef.current.chosen && !soundRef.current.on && phase !== "fading" && phase !== "done") sound(true);
    };
    addEventListener("pointerdown", onGesture);
    addEventListener("keydown", onGesture);
    const fired = TITLES.map(() => false); // which title cards have rung their cue
    let bloomed = false, typedN = 0;

    /* ---------- intro control ---------- */
    const showPause = () => { if (pauseImg.complete && pauseImg.naturalWidth) h.drawImage(pauseImg, 0, 0, VW, VH); hi.style.display = ""; vid.style.display = "none"; };
    const endIntro = () => {
      if (phase !== "intro") return;
      phase = "paused";
      if (!fired[TITLES.length - 1]) sfx()?.leap(); // skipped straight to "Take the leap"
      fired.fill(true);
      vid.pause();
      showPause();
      filmTitles(99);
      films.forEach((el, i) => { if (el && !TITLES[i].last) el.style.opacity = "0"; });
      lock(false);
      if (skipRef.current) { skipRef.current.style.opacity = "0"; skipRef.current.style.pointerEvents = "none"; }
    };
    const play = () => { setNeedPlay(false); vid.play().catch(endIntro); };
    api.current = { endIntro, play, sound };
    vid.addEventListener("ended", endIntro);
    vid.addEventListener("error", endIntro);
    const onKey = (e: KeyboardEvent) => { if (phase === "intro" && (e.key === "Escape" || e.key === "Enter")) endIntro(); };
    addEventListener("keydown", onKey);
    // The film plays even with reduced motion on (Windows turns this on when "Animation effects" is off);
    // the Skip button and Esc/Enter are always available, and `reduce` still removes the scroll easing.
    vid.play().catch(() => setNeedPlay(true));

    /* ---------- main loop ---------- */
    let sy = 0, t0 = 0;
    const spacer = spacerRef.current!;
    const loop = (now: number) => {
      if (phase === "intro") {
        const ct = vid.currentTime || 0;
        filmTitles(ct);
        TITLES.forEach((tt, i) => {
          if (fired[i] || ct < tt.a) return;
          fired[i] = true;
          if (tt.last) sfx()?.leap(); else sfx()?.title(i);
        });
        raf = requestAnimationFrame(loop); return;
      }
      if (phase === "done") return;
      sy += (scrollY - sy) * (reduce ? 1 : 0.12);
      if (Math.abs(scrollY - sy) < 0.3) sy = scrollY;
      const span = Math.max(1, spacer.offsetHeight - innerHeight * 0.1);
      const pb = clamp(sy / span);
      if (phase === "paused" && scrollY > 4) phase = "scroll";
      if ((phase === "paused" || phase === "scroll") && pb >= 0.98) {
        phase = "dive"; t0 = now; lock(true);
        sfx()?.dive();
        // park the page with the portfolio exactly at the top, so the white reveals it cleanly
        window.scrollTo(0, spacer.offsetTop + spacer.offsetHeight);
      }

      let white = 0;
      const px = pxRef.current!;
      if (phase === "dive") {
        const k = clamp((now - t0) / 1200);
        hi.style.display = "none"; lo.style.display = "";
        if (lo.width !== LW) { lo.width = LW; lo.height = LH; g.imageSmoothingEnabled = false; }
        fallScene(ease(k), (now - t0) * 0.6);
        posterize(13);
        flyText(k * 0.9, true);
        px.style.opacity = String(clamp(1 - k * 3)); px.style.clipPath = "none";
        px.style.transform = `translateY(${(-30 - k * 200).toFixed(0)}px) scale(${(1 + k * 2.5).toFixed(2)})`;
        lastFilm().style.opacity = "0";
        white = ease(clamp((k - 0.45) / 0.55));
        if (!bloomed && k > 0.45) { bloomed = true; sfx()?.bloom(); }
        if (k >= 1) { phase = "type"; t0 = now; sfx()?.level(); }
      } else if (phase === "type") {
        white = 1; flyText(0, false); px.style.opacity = "0";
        const n = Math.max(0, Math.floor((now - t0 - 500) / 45));
        typedRef.current!.textContent = LINE.slice(0, n);
        if (n > typedN) { if (n <= LINE.length && LINE[n - 1] !== " ") sfx()?.type(); typedN = n; }
        if (n > LINE.length + 22) {
          phase = "fading"; setFading(true);
          audioRef.current?.fadeOut(0.9);
          setTimeout(() => {
            phase = "done"; hasPlayed = true; setDone(true);
            audioRef.current?.dispose(); audioRef.current = null; soundRef.current.on = false;
          }, 950);
        }
      } else if (phase === "fading") {
        white = 1;
      } else {
        // pixelate the paused frame as you scroll: resolution falls smoothly from 1920px to 320px wide
        const e = ease(clamp(pb / 0.85)), q = clamp(pb / 0.45), lf = lastFilm();
        lf.style.opacity = String(1 - q); lf.style.filter = `blur(${(q * 10).toFixed(1)}px)`;
        lf.style.transform = `translateY(${(-q * 24).toFixed(0)}px) scale(${(1 + q * 0.06).toFixed(3)})`;
        if (e < 0.02) showPause();
        else {
          hi.style.display = "none"; lo.style.display = "";
          const rw = Math.round(VW - (VW - LW) * e), rh = Math.round((rw * LH) / LW);
          if (lo.width !== rw) { lo.width = rw; lo.height = rh; g.imageSmoothingEnabled = true; }
          g.drawImage(pauseImg, 0, 0, rw, rh);
          if (e > 0.35) posterize(Math.round(28 - e * 14), rw, rh);
        }
        const r = clamp((pb - 0.2) / 0.4);
        px.style.opacity = r > 0 ? "1" : "0";
        px.style.clipPath = `inset(0 ${((Math.round((1 - r) * 12) / 12) * 100).toFixed(0)}% 0 0)`;
        px.style.transform = `translateY(${(-pb * 30).toFixed(0)}px)`;
        flyText(0, false);
        sfx()?.scroll(pb);
      }
      if (hintRef.current) hintRef.current.style.opacity = phase === "paused" && sy < 40 ? "1" : "0";
      whiteRef.current!.style.opacity = String(white);
      wtextRef.current!.style.opacity = phase === "type" ? "1" : "0";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", fit);
      removeEventListener("touchmove", block);
      removeEventListener("wheel", block);
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onGesture);
      removeEventListener("keydown", onGesture);
      audioRef.current?.dispose(); audioRef.current = null; soundRef.current.on = false;
      vid.removeEventListener("ended", endIntro);
      vid.removeEventListener("error", endIntro);
      root.classList.remove("leap-locked", "leap-portrait");
    };
  }, [mounted]);

  if (done) return null;

  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <div ref={overlayRef} className={`${s.overlay} ${fading ? s.fading : ""}`} aria-label="Intro film">
        {mounted && <video ref={vidRef} className={`${s.stage} ${s.video}`} src="/leap/intro.mp4" muted playsInline preload="auto" aria-label="Varun leaps from a rooftop above a night city" />}
        <canvas ref={hiRef} className={s.stage} style={{ display: "none" }} aria-hidden="true" />
        <canvas ref={loRef} className={`${s.stage} ${s.lo}`} style={{ display: "none" }} aria-hidden="true" />

        {TITLES.map((t, i) => (
          <div key={i} ref={(el) => { filmRefs.current[i] = el; }} className={s.film}>
            {t.eye && <div className={s.eye}>{t.eye}</div>}
            {t.big && <div className={s.big}>{t.big}</div>}
            {t.line && <div className={s.line}>{t.line}</div>}
          </div>
        ))}
        <div ref={pxRef} className={s.pxTitle}>TAKE THE LEAP<small>CHAPTER 01</small></div>
        {FLY.map((w, i) => (<div key={w} ref={(el) => { flyRefs.current[i] = el; }} className={s.fly}>{w}</div>))}

        <div ref={whiteRef} className={s.white} />
        <div ref={wtextRef} className={s.wtext} role="status">
          <div className={s.lv}>LEVEL 01</div>
          <div className={s.ty}><span ref={typedRef} /><span className={s.cur} /></div>
        </div>

        <div ref={hintRef} className={s.hint}><span>Scroll</span><i /></div>
        <button ref={skipRef} className={`${s.btn} ${s.skip}`} onClick={() => api.current.endIntro()}>Skip intro ›</button>
        <button
          data-sound-toggle
          className={`${s.btn} ${s.sound}`}
          aria-pressed={soundOn}
          onClick={() => { soundRef.current.chosen = true; api.current.sound(!soundRef.current.on); }}
        >
          {soundOn ? "♪ Sound on" : "♪ Sound off"}
        </button>
        {needPlay && <button className={`${s.btn} ${s.play}`} onClick={() => api.current.play()}>▶ Play intro</button>}
      </div>
      <div ref={spacerRef} className={s.spacer} aria-hidden="true" />
    </div>
  );
}
