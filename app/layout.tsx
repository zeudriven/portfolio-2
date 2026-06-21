import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${press.variable} ${vt.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
