import PlayerHUD from "./PlayerHUD";
import GameNav from "./GameNav";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";

/** The unified top dashboard — identical HUD + nav + social on every page. */
export default function SiteHeader() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 pt-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <PlayerHUD />
        <GameNav />
        <div className="flex items-center gap-2">
          <SocialIcons />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
