import { ReactNode } from "react";

type Variant = "green" | "purple" | "outline" | "gold";

const styles: Record<Variant, string> = {
  green: "bg-green text-[#10210a] hover:bg-orange",
  purple: "bg-purple text-[#160a2e] hover:bg-cyan",
  gold: "bg-gold text-[#2a1d05] hover:bg-orange",
  outline:
    "bg-[#150f2e] text-green hover:text-text hover:bg-[#221842] border-green/40",
};

export default function PixelButton({
  children,
  variant = "green",
  className = "",
  href,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    `inline-flex items-center justify-center gap-2 font-pixel text-[11px] leading-none ` +
    `px-4 py-3 border-[4px] border-ink shadow-blocky-sm select-none cursor-pointer ` +
    `transition-[transform,box-shadow,background-color] duration-75 ` +
    `active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ` +
    `${styles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
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
