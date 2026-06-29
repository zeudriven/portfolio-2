import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
// NES.css imported AFTER globals/Tailwind so its pixel components survive preflight.
// Accent colors are overridden to the V2 palette in globals.css.
import "nes.css/css/nes.min.css";
import PixelSun from "@/components/PixelSun";
import DayBeach from "@/components/DayBeach";
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
    "A game-inspired developer portfolio you can explore — projects, skills, experience and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${press.variable} ${vt.variable}`} suppressHydrationWarning>
      <head>
        {/* set the saved theme before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='day'){document.documentElement.dataset.theme='day';}}catch(e){}`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <PixelSun />
        <DayBeach />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
