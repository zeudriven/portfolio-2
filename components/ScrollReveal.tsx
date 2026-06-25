"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveals its children when scrolled into view (fade + slide up).
 * Use to stagger a page's content blocks as the user scrolls.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
