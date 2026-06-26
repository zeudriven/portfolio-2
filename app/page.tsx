"use client";

import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import HeroBanner from "@/components/HeroBanner";
import WorldHome from "@/components/WorldHome";
import StarField from "@/components/StarField";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* page-wide night sky + stars behind everything (no seam under the dashboard) */}
      <StarField />

      {/* glowing pixel moon, fully in the top-right corner, behind the social icons */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="night-only pointer-events-none fixed top-1 right-2 w-[clamp(96px,11vw,168px)] aspect-square z-0 opacity-90"
      >
        <img src="/assets/moon.png" alt="" className="w-full h-full object-contain" style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 34px rgba(243,231,166,.25))" }} />
      </motion.div>

      {/* ============ TOP BAR (shared, identical on every page) ============ */}
      <motion.div {...rise(0.05)} className="relative z-20">
        <SiteHeader />
      </motion.div>

      {/* ============ WORLD SCENE with the HERO overlaid on top (stars behind the name) ============ */}
      <motion.div {...rise(0.25)} className="relative w-full flex-1">
        <WorldHome />
        <div className="absolute inset-x-0 top-0 z-10 px-4 pt-8 pointer-events-none">
          <div className="max-w-[1200px] mx-auto pointer-events-auto">
            <HeroBanner />
          </div>
        </div>
      </motion.div>

      <motion.footer {...rise(0.65)} className="text-center pb-6 pt-4 font-body text-[16px] text-muted">
        <span className="text-green">◆</span> Crafting digital experiences, one pixel at a time. <span className="text-green">◆</span>
      </motion.footer>
    </div>
  );
}
