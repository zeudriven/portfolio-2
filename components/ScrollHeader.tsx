"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import PlayerHUD from "./PlayerHUD";
import SocialIcons from "./SocialIcons";
import { navItems } from "@/lib/content";

/**
 * Fixed top bar for the single-page site: HUD (left), section links (center) that
 * light up for the section in view, socials (right), plus a green scroll-progress
 * line along the very top. Turns solid once you scroll off the hero.
 */
export default function ScrollHeader() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("top");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // a section is "active" while it crosses the middle band of the screen
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...navItems.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background-color,border-color] duration-300 border-b-2 ${
        solid ? "bg-night-deep/85 border-ink" : "bg-transparent border-transparent"
      }`}
    >
      <motion.div style={{ scaleX: scrollYProgress }} className="absolute left-0 top-0 h-[3px] w-full origin-left bg-green shadow-[0_0_8px_#b7ff45]" />

      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
        <div className="hidden xl:block">
          <PlayerHUD />
        </div>
        <a
          href="#top"
          className="xl:hidden font-pixel text-[11px] text-green px-2 py-2 bg-panel/90 border-[2px] border-ink shadow-blocky-sm"
          aria-label="Back to top"
        >
          VP
        </a>

        <nav className="bg-panel/90 border-[2px] border-ink shadow-blocky px-1 sm:px-2 py-1">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((it) => {
              const on = active === it.id;
              return (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    className={`group flex flex-col items-center px-2 sm:px-3 py-2 font-pixel text-[10px] transition-colors ${
                      on ? "text-green" : "text-muted hover:text-text"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[12px] leading-none">{it.icon}</span>
                      <span className="hidden md:inline">{it.label}</span>
                    </span>
                    <span
                      className={`block h-[3px] mt-[5px] transition-all ${
                        on ? "w-full bg-green shadow-[0_0_8px_#b7ff45]" : "w-0 bg-green group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <SocialIcons />
        </div>
      </div>
    </header>
  );
}
