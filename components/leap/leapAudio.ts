/**
 * Procedural score for LeapIntro, synthesised live with the Web Audio API (no audio files).
 * LeapIntro calls these at the matching moments of the animation:
 *
 *   film     setOn(true) starts a low night-city drone + wind;  title(i) rings a bell per title card
 *   leap()   "Take the leap": sub boom + impact + a slow swelling chord
 *   scroll   scroll(pb): the film ambience fades out as an 8-bit arpeggio fades in, following the pixelation
 *   dive()   rising whoosh, riser and sub drop, blips for the flying words
 *   bloom()  shimmering chord as the screen blooms to white
 *   level()  "LEVEL 01" jingle;  type() a blip per typed letter
 *   fadeOut  everything fades with the white
 *
 * Browsers only let audio start after a click or key press, so nothing plays until setOn(true)
 * is called from one.
 */

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

function makeNoise(ctx: AudioContext, seconds: number) {
  const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}

/** decaying stereo noise = a cheap, smooth hall reverb */
function makeImpulse(ctx: AudioContext, seconds: number, decay: number) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const b = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return b;
}

const ARP = [69, 72, 76, 81, 76, 72, 74, 77]; // A minor-ish 8-bit loop
const BASS = [45, 45, 41, 43]; // A2 A2 F2 G2, one per bar

export function createLeapAudio() {
  const AC: typeof AudioContext =
    window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 4;
  comp.connect(master).connect(ctx.destination);

  const verb = ctx.createConvolver();
  verb.buffer = makeImpulse(ctx, 3, 2.6);
  const verbOut = ctx.createGain();
  verbOut.gain.value = 0.4;
  verb.connect(verbOut).connect(comp);

  const noise = makeNoise(ctx, 2);
  const live: AudioScheduledSourceNode[] = [];
  let on = false;

  /** send a node to the mix, with `wet` of it also going to the reverb */
  const route = (node: AudioNode, wet = 0.3) => {
    node.connect(comp);
    if (wet > 0) {
      const s = ctx.createGain();
      s.gain.value = wet;
      node.connect(s).connect(verb);
    }
  };

  const envelope = (g: GainNode, t: number, attack: number, peak: number, decay: number) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  };

  const tone = (type: OscillatorType, freq: number, t: number, attack: number, peak: number, decay: number, wet = 0.3, dest?: AudioNode) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    envelope(g, t, attack, peak, decay);
    o.connect(g);
    if (dest) g.connect(dest);
    else route(g, wet);
    o.start(t);
    o.stop(t + attack + decay + 0.05);
    return o;
  };

  const noiseSweep = (t: number, dur: number, attack: number, peak: number, type: BiquadFilterType, f0: number, f1: number, q = 1, wet = 0.3) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    envelope(g, t, attack, peak, Math.max(0.05, dur - attack));
    src.connect(f).connect(g);
    route(g, wet);
    src.start(t, Math.random() * 1.5);
    src.stop(t + dur + 0.05);
  };

  /* ---------- continuous beds: film ambience + 8-bit loop ---------- */
  let bed: { film: GainNode; chip: GainNode } | null = null;
  const startBed = () => {
    if (bed) return;
    const t = ctx.currentTime;
    const film = ctx.createGain();
    film.gain.setValueAtTime(0.0001, t);
    film.gain.exponentialRampToValueAtTime(1, t + 2.5);
    route(film, 0.3);

    // low drone: detuned saws through a slowly breathing low-pass
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 360;
    lp.Q.value = 0.8;
    lp.connect(film);
    for (const [n, det] of [[33, -8], [33, 8], [40, 0], [45, -5]] as const) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = hz(n);
      o.detune.value = det;
      const g = ctx.createGain();
      g.gain.value = 0.045;
      o.connect(g).connect(lp);
      o.start(t);
      live.push(o);
    }
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.11;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 150;
    lfo.connect(lfoAmt).connect(lp.frequency);
    lfo.start(t);
    live.push(lfo);

    // wind high above the city
    const wind = ctx.createBufferSource();
    wind.buffer = noise;
    wind.loop = true;
    const wf = ctx.createBiquadFilter();
    wf.type = "bandpass";
    wf.frequency.value = 520;
    wf.Q.value = 0.9;
    const wg = ctx.createGain();
    wg.gain.value = 0.07;
    wind.connect(wf).connect(wg).connect(film);
    const gust = ctx.createOscillator();
    gust.frequency.value = 0.19;
    const gustAmt = ctx.createGain();
    gustAmt.gain.value = 280;
    gust.connect(gustAmt).connect(wf.frequency);
    wind.start(t);
    gust.start(t);
    live.push(wind, gust);

    const chip = ctx.createGain();
    chip.gain.value = 0.0001;
    route(chip, 0.18);
    bed = { film, chip };
  };

  let nextNote = 0;
  let step = 0;
  const scheduleArp = () => {
    if (!bed) return;
    const now = ctx.currentTime;
    if (nextNote < now) nextNote = now + 0.03;
    while (nextNote < now + 0.15) {
      tone("square", hz(ARP[step % ARP.length]), nextNote, 0.004, 0.05, 0.1, 0, bed.chip);
      if (step % 8 === 0) tone("triangle", hz(BASS[(step / 8) % BASS.length]), nextNote, 0.01, 0.22, 0.8, 0, bed.chip);
      nextNote += 0.115;
      step++;
    }
  };

  let lastMix = -1;

  return {
    setOn(v: boolean) {
      on = v;
      const t = ctx.currentTime;
      if (v) {
        void ctx.resume();
        startBed();
      }
      master.gain.cancelScheduledValues(t);
      master.gain.setTargetAtTime(v ? 0.9 : 0, t, 0.12);
    },

    /** a bell for each title card of the film */
    title(i: number) {
      if (!on) return;
      const t = ctx.currentTime;
      const f = hz([76, 79, 81][i] ?? 76);
      tone("sine", f, t, 0.008, 0.11, 2.6, 0.6);
      tone("sine", f * 2.76, t, 0.004, 0.03, 1.2, 0.6);
      tone("sine", f * 5.4, t, 0.002, 0.012, 0.5, 0.6);
      if (i === 0) tone("triangle", hz(45), t, 0.6, 0.12, 2.5, 0.4);
    },

    /** "Take the leap" */
    leap() {
      if (!on) return;
      const t = ctx.currentTime;
      const sub = ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.setValueAtTime(72, t);
      sub.frequency.exponentialRampToValueAtTime(30, t + 1);
      const sg = ctx.createGain();
      envelope(sg, t, 0.01, 0.75, 1.3);
      sub.connect(sg);
      route(sg, 0.15);
      sub.start(t);
      sub.stop(t + 1.4);
      noiseSweep(t, 0.9, 0.01, 0.28, "lowpass", 2400, 160, 0.7, 0.5);
      for (const n of [57, 64, 69, 71, 76]) tone("triangle", hz(n), t + 0.05, 0.7, 0.03, 3.2, 0.7);
    },

    /** pb 0→1 while the paused frame pixelates: film ambience out, 8-bit loop in */
    scroll(pb: number) {
      if (!on || !bed) return;
      if (Math.abs(pb - lastMix) > 0.004) {
        const t = ctx.currentTime;
        bed.film.gain.setTargetAtTime(Math.max(0.0001, 1 - pb * 0.85), t, 0.08);
        bed.chip.gain.setTargetAtTime(Math.max(0.0001, Math.min(1, pb * 1.3)), t, 0.08);
        lastMix = pb;
      }
      if (pb > 0.02) scheduleArp();
    },

    /** the 1.2s pixel dive */
    dive() {
      if (!on) return;
      const t = ctx.currentTime;
      noiseSweep(t, 1.25, 0.95, 0.4, "bandpass", 260, 5200, 1.2, 0.35);
      const r = ctx.createOscillator();
      r.type = "sawtooth";
      r.frequency.setValueAtTime(110, t);
      r.frequency.exponentialRampToValueAtTime(1760, t + 1.2);
      const rf = ctx.createBiquadFilter();
      rf.type = "lowpass";
      rf.frequency.setValueAtTime(400, t);
      rf.frequency.exponentialRampToValueAtTime(7000, t + 1.2);
      const rg = ctx.createGain();
      envelope(rg, t, 1.0, 0.09, 0.3);
      r.connect(rf).connect(rg);
      route(rg, 0.3);
      r.start(t);
      r.stop(t + 1.4);
      tone("sine", 60, t, 0.01, 0.5, 0.7, 0.1);
      for (let k = 0; k < 11; k++) {
        const bt = t + 0.08 + k * 0.1 + Math.random() * 0.04;
        tone("square", 500 + Math.random() * 1400, bt, 0.002, 0.035, 0.06, 0.15);
      }
      if (bed) {
        bed.film.gain.setTargetAtTime(0.0001, t + 0.8, 0.12);
        bed.chip.gain.setTargetAtTime(0.0001, t + 0.8, 0.12);
      }
    },

    /** the screen blooms to white */
    bloom() {
      if (!on) return;
      const t = ctx.currentTime;
      for (const n of [81, 85, 88, 93, 97]) {
        tone("sine", hz(n), t, 0.25, 0.045, 2.4, 0.8);
        tone("triangle", hz(n) * 1.003, t, 0.3, 0.015, 2, 0.8);
      }
    },

    /** "LEVEL 01" */
    level() {
      if (!on) return;
      const t = ctx.currentTime;
      [72, 76, 79, 84].forEach((n, i) => tone("square", hz(n), t + i * 0.085, 0.004, 0.07, 0.09, 0.2));
      tone("square", hz(88), t + 0.34, 0.004, 0.07, 0.4, 0.3);
      tone("triangle", hz(48), t + 0.34, 0.01, 0.2, 0.5, 0.2);
    },

    /** one typed character */
    type() {
      if (!on) return;
      tone("square", 880 + Math.random() * 260, ctx.currentTime, 0.002, 0.03, 0.035, 0.05);
    },

    fadeOut(seconds: number) {
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + seconds);
    },

    dispose() {
      for (const s of live) {
        try { s.stop(); } catch { /* already stopped */ }
      }
      void ctx.close();
    },
  };
}

export type LeapAudio = ReturnType<typeof createLeapAudio>;
