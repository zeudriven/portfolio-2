"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Lightweight Framer Motion entrance wrapper. Fades + lifts content into view
 * once. Wrap RSC children directly — this is the only client boundary needed
 * to animate otherwise server-rendered pages.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}
