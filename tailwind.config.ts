import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./game/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // V3 palette — now CSS-variable driven (rgb channels) so the whole site
        // can switch between night (default) and day themes. Token names preserved.
        // Channel values live in app/globals.css (:root = night, [data-theme="day"] = day).
        night: "rgb(var(--c-night) / <alpha-value>)",
        "night-deep": "rgb(var(--c-night-deep) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        "panel-2": "rgb(var(--c-panel-2) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        inset: "rgb(var(--c-inset) / <alpha-value>)", // inner card bg (was #0f0a22)
        // accents
        cyan: "rgb(var(--c-cyan) / <alpha-value>)",
        green: "rgb(var(--c-green) / <alpha-value>)",
        "green-dim": "rgb(var(--c-green-dim) / <alpha-value>)",
        orange: "rgb(var(--c-gold) / <alpha-value>)", // kept name; maps to gold
        purple: "rgb(var(--c-purple) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        rose: "rgb(var(--c-rose) / <alpha-value>)",
        text: "rgb(var(--c-text) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
      },
      fontFamily: {
        pixel: ["var(--font-press)", "monospace"],
        body: ["var(--font-vt)", "monospace"],
      },
      boxShadow: {
        blocky: "4px 4px 0 0 rgb(var(--c-ink))",
        "blocky-sm": "3px 3px 0 0 rgb(var(--c-ink))",
        "blocky-lg": "6px 6px 0 0 rgb(var(--c-ink))",
      },
      keyframes: {
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        twinkle: { "0%,100%": { opacity: "0.2", transform: "scale(0.7)" }, "50%": { opacity: "1", transform: "scale(1.15)" } },
        "xp-shine": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        caret: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        "glow-pulse": {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(183,255,69,0), 4px 4px 0 0 #000" },
          "50%": { boxShadow: "0 0 22px 2px rgba(183,255,69,0.55), 4px 4px 0 0 #000" },
        },
        "soft-float": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        "cell-pulse": { "0%,100%": { filter: "brightness(1)" }, "50%": { filter: "brightness(1.5)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        flicker: { "0%,100%": { opacity: "1" }, "41%": { opacity: "1" }, "42%": { opacity: "0.35" }, "43%": { opacity: "1" }, "45%": { opacity: "0.5" }, "46%": { opacity: "1" }, "70%": { opacity: "1" }, "71%": { opacity: "0.6" }, "72%": { opacity: "1" } },
      },
      animation: {
        bob: "bob 1.4s steps(2,end) infinite",
        float: "float 3.2s ease-in-out infinite",
        twinkle: "twinkle 1.1s ease-in-out infinite",
        "xp-shine": "xp-shine 2.6s ease-in-out infinite",
        caret: "caret 1s steps(1) infinite",
        "glow-pulse": "glow-pulse 1.8s ease-in-out infinite",
        "soft-float": "soft-float 3s ease-in-out infinite",
        "cell-pulse": "cell-pulse 1.5s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        flicker: "flicker 5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
