import { ReactNode } from "react";
import Sparkles from "./Sparkles";

type Accent = "green" | "purple" | "cyan" | "gold" | "none";

const titleColor: Record<Accent, string> = {
  green: "text-green",
  purple: "text-purple",
  cyan: "text-cyan",
  gold: "text-gold",
  none: "text-text",
};

const glow: Record<Accent, string> = {
  green: "neon-green",
  purple: "neon-purple",
  cyan: "neon-cyan",
  gold: "",
  none: "",
};

// drives the hover shine/halo on the panel's titlebar (see .panel-title in globals.css)
const glowVar: Record<Accent, string> = {
  green: "var(--glow-green)",
  purple: "var(--glow-purple)",
  cyan: "var(--glow-cyan)",
  gold: "var(--glow-gold)",
  none: "var(--glow-cyan)",
};

export default function PixelPanel({
  title,
  icon,
  accent = "green",
  glowing = false,
  transparent = false,
  interactive = true,
  right,
  className = "",
  bodyClassName = "",
  children,
}: {
  title?: string;
  icon?: ReactNode;
  accent?: Accent;
  glowing?: boolean;
  /** frameless, see-through panel: no background, border or shadow; content sits on the world behind */
  transparent?: boolean;
  interactive?: boolean;
  right?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`pixel-panel ${interactive ? "pixel-interactive group" : ""} ${
        glowing ? glow[accent] : ""
      } ${transparent ? "bg-transparent border-0 shadow-none" : ""} ${className}`}
    >
      {interactive && <Sparkles />}
      {title && (
        <header
          className={`pixel-titlebar justify-between lg:text-[16px] ${transparent ? "bg-transparent border-b-0" : ""}`}
          style={{ "--card-glow": glowVar[accent] } as React.CSSProperties}
        >
          <span className={`flex items-center gap-2 ${titleColor[accent]}`}>
            {icon}
            <span className="pixel-shine panel-title" data-text={title}>
              {title}
            </span>
          </span>
          {right}
        </header>
      )}
      <div className={`p-4 lg:p-6 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
