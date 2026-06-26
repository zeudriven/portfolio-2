"use client";

import { useEffect, useState } from "react";

/** Day/night theme switch — flips data-theme on <html> and remembers the choice. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"night" | "day">("night");

  useEffect(() => {
    const cur = (document.documentElement.dataset.theme as "night" | "day") || "night";
    setTheme(cur);
  }, []);

  const toggle = () => {
    const next = theme === "night" ? "day" : "night";
    setTheme(next);
    const root = document.documentElement;
    // briefly enable color transitions so the switch fades smoothly
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    window.setTimeout(() => root.classList.remove("theme-anim"), 550);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day or night theme"
      title={theme === "night" ? "Switch to day mode" : "Switch to night mode"}
      className="grid place-items-center w-11 h-11 bg-panel/90 border-[2px] border-ink text-gold font-pixel text-[16px]
                 shadow-blocky-sm transition-all duration-150 hover:border-gold hover:text-gold
                 hover:-translate-y-[2px] hover:shadow-[4px_6px_0_0_#000,0_0_14px_rgba(255,215,106,0.5)]"
    >
      {theme === "night" ? "☀" : "☾"}
    </button>
  );
}
