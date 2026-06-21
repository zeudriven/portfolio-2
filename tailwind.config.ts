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
        night: "#1a1430",
        "night-deep": "#0e0b1c",
        panel: "#191331",
        "panel-2": "#241c44",
        ink: "#000000",
        line: "#0c0a16",
        green: "#9be34a",
        "green-dim": "#5f8f2e",
        purple: "#a06bff",
        cyan: "#56c7f5",
        gold: "#ffcf5c",
        orange: "#ff9b42",
        rose: "#ff6b8b",
        text: "#f4f2ff",
        muted: "#9b94bd",
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
      },
      animation: {
        bob: "bob 1.4s steps(2,end) infinite",
        float: "float 3.2s ease-in-out infinite",
        twinkle: "twinkle 1.1s ease-in-out infinite",
        "xp-shine": "xp-shine 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
