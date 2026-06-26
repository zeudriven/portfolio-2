import PageChrome from "@/components/PageChrome";
import PixelPanel from "@/components/pixel/PixelPanel";
import ContactForm from "./ContactForm";
import ResumeViewer from "@/components/ResumeViewer";
import AnimatedSprite from "@/components/AnimatedSprite";
import Reveal from "@/components/Reveal";
import ScrollReveal from "@/components/ScrollReveal";
import Parallax from "@/components/Parallax";
import { profile } from "@/lib/profile";

const contacts = [
  { icon: "✉", t: "EMAIL", d: profile.email, href: `mailto:${profile.email}`, tone: "text-green" },
  { icon: "in", t: "LINKEDIN", d: profile.linkedinLabel, href: profile.linkedin, tone: "text-cyan" },
  { icon: "GH", t: "GITHUB", d: profile.githubLabel, href: profile.github, tone: "text-purple" },
  { icon: "DP", t: "DEVPOST", d: profile.devpostLabel, href: profile.devpost, tone: "text-gold" },
  { icon: "IG", t: "INSTAGRAM", d: profile.instagramLabel, href: profile.instagram, tone: "text-rose" },
];

export default function Contact() {
  return (
    <PageChrome>
      <Reveal className="text-center mt-6">
        <h1 className="font-pixel text-cyan text-[30px] md:text-[48px] leading-none text-shadow-blocky">CONTACT / RESUME</h1>
        <p className="font-body text-[20px] text-muted mt-4">
          <span className="text-gold">❖</span> Let&apos;s Connect &amp; Build Something Amazing! <span className="text-gold">❖</span>
        </p>
      </Reveal>

      <div className="relative max-w-[1300px] mx-auto py-12">
        <Parallax speed={0.6} className="pointer-events-none absolute -z-10 top-16 -right-10 w-72 h-72 blur-3xl opacity-30">
          <div className="w-full h-full" style={{ background: "radial-gradient(closest-side,rgba(184,60,255,.45),transparent)" }} />
        </Parallax>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* resume (left, big) */}
          <ScrollReveal className="lg:col-span-3">
            <PixelPanel title="RESUME" accent="purple" icon={<span>📄</span>} glowing bodyClassName="">
              <ResumeViewer />
            </PixelPanel>
          </ScrollReveal>

          {/* right column: message + get in touch (fills the height) */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <PixelPanel title="SEND A MESSAGE" accent="green" glowing bodyClassName="">
                <ContactForm />
              </PixelPanel>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <PixelPanel title="GET IN TOUCH" accent="purple" icon={<span>📬</span>} glowing className="neon-purple border-purple/60" bodyClassName="">
                {/* animated portal inside get in touch */}
                <div className="flex justify-center mb-3">
                  <AnimatedSprite dir="/assets/objects/anim/contact" frames={9} size={120} className="animate-soft-float" />
                </div>
                <div className="divide-y-[2px] divide-line">
                  {contacts.map((c) => (
                    <a key={c.t} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                       className="group flex items-center gap-4 py-3 first:pt-1">
                      <span className={`grid place-items-center w-9 h-9 bg-inset font-pixel text-[11px] shrink-0 ${c.tone}`}>{c.icon}</span>
                      <div className="min-w-0">
                        <div className={`font-pixel text-[11px] ${c.tone}`}>{c.t}</div>
                        <div className="font-body text-[16px] text-muted truncate group-hover:text-text transition-colors">{c.d}</div>
                      </div>
                      <span className="ml-auto text-muted group-hover:text-green group-hover:translate-x-1 transition-all">→</span>
                    </a>
                  ))}
                </div>
              </PixelPanel>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
