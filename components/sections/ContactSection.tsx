"use client";

import { useState } from "react";
import PixelPanel from "@/components/pixel/PixelPanel";
import PixelButton from "@/components/pixel/PixelButton";
import AnimatedSprite from "@/components/AnimatedSprite";
import Parallax from "@/components/Parallax";
import ScrollReveal from "@/components/ScrollReveal";
import ResumeViewer from "@/components/ResumeViewer";
import ContactForm from "@/components/ContactForm";
import { SectionHeading } from "./Headings";
import { contacts } from "@/lib/content";

const RESUME = "/resumes/varun_version_c_faang.pdf";

/** Epilogue: contact links, message form, résumé. */
export default function ContactSection() {
  const [showResume, setShowResume] = useState(false);

  return (
    <section id="contact" className="relative scroll-mt-16 pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionHeading eyebrow="✦ EPILOGUE ✦" icon="✉" title="LET'S BUILD SOMETHING" sub="Open to internships, co-ops and good ideas. Say hi!" tone="purple" />

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* portal + links */}
          <div className="lg:col-span-2 space-y-6">
            <Parallax speed={1.2} className="flex justify-center">
              <AnimatedSprite
                dir="/assets/objects/anim/contact"
                frames={9}
                size={150}
                className="animate-soft-float"
                style={{ filter: "drop-shadow(0 0 30px rgba(184,60,255,0.55))" }}
              />
            </Parallax>
            <ScrollReveal>
              <PixelPanel title="GET IN TOUCH" accent="purple" icon={<span>📬</span>} glowing className="neon-purple border-purple/60">
                <div className="divide-y-[2px] divide-line">
                  {contacts.map((c) => (
                    <a
                      key={c.t}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-3 first:pt-1"
                    >
                      <span className={`grid place-items-center w-9 h-9 bg-inset font-pixel text-[11px] shrink-0 ${c.tone}`}>{c.icon}</span>
                      <div className="min-w-0">
                        <div className={`font-pixel text-[11px] ${c.tone}`}>{c.t}</div>
                        <div className="font-body text-[17px] text-muted truncate group-hover:text-text transition-colors">{c.d}</div>
                      </div>
                      <span className="ml-auto text-muted group-hover:text-green group-hover:translate-x-1 transition-all">→</span>
                    </a>
                  ))}
                </div>
              </PixelPanel>
            </ScrollReveal>
          </div>

          {/* message form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <PixelPanel title="SEND A MESSAGE" accent="green" glowing>
              <ContactForm />
            </PixelPanel>
          </ScrollReveal>
        </div>

        {/* résumé */}
        <ScrollReveal className="mt-10">
          <PixelPanel title="RÉSUMÉ" accent="gold" icon={<span>📄</span>} glowing>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-body text-[19px] text-muted">The full story on one page — skills, roles and projects.</p>
              <div className="flex flex-wrap gap-3">
                <PixelButton variant="green" onClick={() => setShowResume((s) => !s)}>
                  {showResume ? "▲ HIDE RÉSUMÉ" : "▼ VIEW RÉSUMÉ"}
                </PixelButton>
                <PixelButton href={RESUME} external variant="outline">
                  OPEN PDF ↗
                </PixelButton>
              </div>
            </div>
            {showResume && (
              <div className="mt-5">
                <ResumeViewer />
              </div>
            )}
          </PixelPanel>
        </ScrollReveal>
      </div>

      <footer className="mt-20 pb-16 text-center font-body text-[18px] text-muted">
        <span className="text-cyan mr-2">◆◆</span>
        Crafting digital experiences, one pixel at a time.
        <span className="text-cyan ml-2">◆◆</span>
      </footer>
    </section>
  );
}
