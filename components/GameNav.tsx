"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Centered retro nav. Current route highlighted with a neon-green glow.
 * Icons are emoji glyphs (kept legible); labels in the pixel font.
 */
const items = [
  { href: "/", label: "HOME", icon: "🏠" },
  { href: "/about", label: "ABOUT", icon: "📖" },
  { href: "/projects", label: "PROJECTS", icon: "💻" },
  { href: "/skills", label: "SKILLS", icon: "⚡" },
  { href: "/blog", label: "BLOG", icon: "📝" },
  { href: "/contact", label: "CONTACT", icon: "✉" },
];

export default function GameNav() {
  const path = usePathname();
  return (
    <nav className="bg-panel/90 border-[2px] border-ink shadow-blocky px-2 py-1">
      <ul className="flex items-center gap-0.5 sm:gap-1">
        {items.map((it) => {
          const active = it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`group flex flex-col items-center px-3 py-2 font-pixel text-[10px] transition-colors ${
                  active ? "text-green" : "text-muted hover:text-text"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-[12px] leading-none">{it.icon}</span>
                  <span className="hidden sm:inline">{it.label}</span>
                </span>
                <span
                  className={`block h-[3px] mt-[5px] transition-all ${
                    active ? "w-full bg-green shadow-[0_0_8px_#b7ff45]" : "w-0 bg-green group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
