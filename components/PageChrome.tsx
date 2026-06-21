import { ReactNode } from "react";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import FooterTicker from "./FooterTicker";

/** Shared shell: top status bar + nav, content, footer ticker. */
export default function PageChrome({
  children,
  footer,
  max = "max-w-[1200px]",
}: {
  children: ReactNode;
  footer?: string;
  max?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className={`w-full ${max} mx-auto px-5 pt-5`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <TopBar />
          <NavBar />
        </div>
      </div>

      <main className={`w-full ${max} mx-auto px-5 flex-1`}>{children}</main>

      <div className={`w-full ${max} mx-auto px-5`}>
        <FooterTicker text={footer} />
      </div>
    </div>
  );
}
