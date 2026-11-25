import { ReactNode } from "react";

/**
 * Thin wrapper over NES.css `.nes-btn`, recolored to the V2 palette in
 * globals.css. Variant names are kept so existing call sites keep working:
 *   green  → is-success (cozy green)
 *   purple → is-primary (cyan, the V2 primary CTA)
 *   gold   → is-warning (orange)
 *   outline→ default nes-btn (dark surface)
 * All buttons turn orange on hover (matches v2-preview.html).
 */
type Variant = "green" | "purple" | "outline" | "gold";

const nesClass: Record<Variant, string> = {
  green: "is-success",
  purple: "is-primary",
  gold: "is-warning",
  outline: "",
};

export default function PixelButton({
  children,
  variant = "green",
  className = "",
  href,
  external = false,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  /** open href in a new tab */
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    `nes-btn ${nesClass[variant]} font-pixel text-[11px] leading-none ` +
    `inline-flex items-center justify-center gap-2 select-none ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
