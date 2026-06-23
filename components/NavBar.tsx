"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "SKILLS", href: "/skills" },
  { label: "CONTACT", href: "/contact" },
];

function Social({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid place-items-center w-9 h-9 border-[3px] border-ink bg-[#0f0a22] text-muted hover:text-cyan hover:border-cyan/60 transition-colors font-pixel text-[11px]"
    >
      {children}
    </a>
  );
}

export default function NavBar() {
  const path = usePathname();
  return (
    <nav className="flex items-center justify-between gap-4">
      <div className="pixel-panel-2 flex items-center gap-1 px-3 py-2">
        {items.map((it) => {
          const active = it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`font-pixel text-[12px] px-3 py-2 ${
                active
                  ? "text-cyan border-b-[3px] border-cyan"
                  : "text-muted hover:text-text border-b-[3px] border-transparent"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
        <span className="ml-2 w-2 h-2 bg-cyan" />
      </div>

      <div className="hidden md:flex items-center gap-2">
        <Social href="https://github.com/zeudriven" label="GitHub">GH</Social>
        <Social href="https://www.linkedin.com/in/student-cc-yorku-varun-patel/" label="LinkedIn">in</Social>
        <Social href="mailto:varunmkpatel12@gmail.com" label="Email">@</Social>
      </div>
    </nav>
  );
}
