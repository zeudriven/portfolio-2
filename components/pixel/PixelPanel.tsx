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
  cyan: "",
  gold: "",
  none: "",
};

export default function PixelPanel({
  title,
  icon,
  accent = "green",
  glowing = false,
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
      } ${className}`}
    >
      {interactive && <Sparkles />}
      {title && (
        <header className="pixel-titlebar justify-between">
          <span className={`flex items-center gap-2 ${titleColor[accent]}`}>
            {icon}
            {title}
          </span>
          {right}
        </header>
      )}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
