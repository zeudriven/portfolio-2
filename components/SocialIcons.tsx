import { profile } from "@/lib/profile";

/**
 * Top-right pixel-framed social buttons. Hover = neon-green lift + glow.
 * Links come from the central lib/profile.ts config.
 */
const links = [
  { label: "GitHub", href: profile.github, icon: "GH" },
  { label: "LinkedIn", href: profile.linkedin, icon: "in" },
  { label: "Instagram", href: profile.instagram, icon: "IG" },
  { label: "Devpost", href: profile.devpost, icon: "DP" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "@" },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={l.label}
          title={l.label}
          className="grid place-items-center w-11 h-11 bg-panel/90 border-[2px] border-ink text-muted font-pixel text-[11px]
                     shadow-blocky-sm transition-all duration-150 hover:text-green hover:border-green
                     hover:-translate-y-[2px] hover:shadow-[4px_6px_0_0_#000,0_0_14px_rgba(183,255,69,0.45)]"
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
}
