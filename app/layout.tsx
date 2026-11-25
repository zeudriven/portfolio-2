import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
// NES.css imported AFTER globals/Tailwind so its pixel components survive preflight.
// Accent colors are overridden to the V2 palette in globals.css.
import "nes.css/css/nes.min.css";
import { Analytics } from "@vercel/analytics/next";

const press = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
  display: "swap",
});

const vt = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Varun Patel — Interactive Developer Portfolio",
  description:
    "Scroll through a pixel night world — Varun Patel's overview, skills, experience and project showcase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // night-only site. data-scroll-behavior lets Next keep smooth anchor scrolling.
    <html lang="en" className={`${press.variable} ${vt.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
