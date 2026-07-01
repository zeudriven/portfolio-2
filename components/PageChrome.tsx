import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import FooterTicker from "./FooterTicker";
import SectionArrowNav from "./SectionArrowNav";
import StarField from "@/components/ambient/StarField";

/** Shared shell: unified top bar (HUD + nav + social) — identical to the home — content, footer. */
export default function PageChrome({
  children,
  footer,
  max = "max-w-[1280px]",
}: {
  children: ReactNode;
  footer?: string;
  max?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* page-wide night sky + stars behind everything (same as home) */}
      <StarField />
      <SectionArrowNav />
      <div className="relative z-20">
        <SiteHeader />
      </div>

      <main className={`relative z-10 w-full ${max} mx-auto px-5 flex-1`}>{children}</main>

      <div className={`relative z-10 w-full ${max} mx-auto px-5`}>
        <FooterTicker text={footer} />
      </div>
    </div>
  );
}
