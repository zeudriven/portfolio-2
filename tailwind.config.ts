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
        // V3 cyber-fantasy palette — single source of truth.
        // Token names are preserved so existing class usages keep working;
        // only the hexes are re-pointed. Neon green is the new PRIMARY.
        night: "#130b2d", // bg2 (midnight purple, raised world)
        "night-deep": "#050816", // base background (deep navy)
        panel: "#160f33", // surface (dark purple)
        "panel-2": "#1f1545", // surface2 (raised)
        ink: "#000000", // chunky borders / blocky shadows
        line: "#0a0820", // hairlines / grid
        // accents
        cyan: "#4cc9ff", // electric blue (secondary)
        green: "#b7ff45", // neon green (PRIMARY)
        "green-dim": "#7fae2e",
        orange: "#ffd76a", // warm lantern gold (kept name for compatibility)
        purple: "#b83cff", // portal violet
        gold: "#ffd76a", // lantern gold
        rose: "#ff6b8b",
        text: "#f4f2ff",
        muted: "#8f8ab6",
      },
      fontFamily: {
        pixel: ["var(--font-press)", "monospace"],
        body: ["var(--font-vt)", "monospace"],
      },
      boxShadow: {
        blocky: "6px 6px 0 0 #000000",
        "blocky-sm": "4px 4px 0 0 #000000",
        "blocky-lg": "9px 9px 0 0 #000000",
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
      },
    },
  },
  plugins: [],
};

export default config;
