import { profile } from "./profile";
import type { Photo } from "@/components/PhotoStrip";

/* ============================================================
   All portfolio content in one place. The single-page parallax
   site (app/page.tsx) reads everything from here — edit text,
   projects, roles and skills without touching the components.
   ============================================================ */

export type Tone = "cyan" | "purple" | "green" | "gold";

/** Tailwind classes + raw colour per accent (lib/ is in tailwind's content globs). */
export const toneStyles: Record<Tone, { text: string; border: string; bg: string; rgb: string }> = {
  cyan: { text: "text-cyan", border: "border-cyan/60", bg: "bg-cyan", rgb: "76,201,255" },
  purple: { text: "text-purple", border: "border-purple/60", bg: "bg-purple", rgb: "184,60,255" },
  green: { text: "text-green", border: "border-green/60", bg: "bg-green", rgb: "183,255,69" },
  gold: { text: "text-gold", border: "border-gold/60", bg: "bg-gold", rgb: "255,215,106" },
};

/* ---------------- navigation + scroll guide ---------------- */

export const navItems = [
  { id: "about", label: "ABOUT", icon: "📖" },
  { id: "skills", label: "SKILLS", icon: "⚡" },
  { id: "experience", label: "EXPERIENCE", icon: "💼" },
  { id: "projects", label: "PROJECTS", icon: "💻" },
  { id: "contact", label: "CONTACT", icon: "✉" },
];

/** Signposts on the ground strip + what the walking character says at each. */
export const walkerStops = [
  { id: "top", label: "START", say: "Welcome! Scroll to explore ↓" },
  { id: "about", label: "ABOUT", say: "This is me — nice to meet you!" },
  { id: "skills", label: "SKILLS", say: "My toolkit of choice." },
  { id: "experience", label: "EXPERIENCE", say: "Where I've levelled up." },
  { id: "projects", label: "PROJECTS", say: "Chapter 2 — things I've built!" },
  { id: "contact", label: "CONTACT", say: "Let's build something together!" },
];

/* ---------------- chapter 1: overview ---------------- */

export const heroRoles = ["CS Student", "Full-Stack Developer", "AI Data Engineer", "Hackathon Builder"];

export const journeyStats = [
  { v: "5+", l: "Major Projects", tone: "text-green" },
  { v: "5+", l: "Awards Won", tone: "text-cyan" },
  { v: "4", l: "Active Roles", tone: "text-purple" },
  { v: "2027", l: "Grad Year", tone: "text-gold" },
];

export const milestones = [
  { y: "2023", t: "Started BSc Computer Science at York (Lassonde)", tone: "bg-green" },
  { y: "2025", t: "Vice President of Student Life @ Enactus York", tone: "bg-cyan" },
  { y: "2025", t: "R&D Lead @ Lassonde Concrete Canoe — $20K+ raised for Nationals", tone: "bg-green" },
  { y: "2026", t: "Won Best UI/UX @ Scotiabank CaseHacks", tone: "bg-gold" },
  { y: "2026", t: "AI Data Engineer @ Ayvelis AI", tone: "bg-purple" },
  { y: "2026", t: "Project Coordinator Co-op @ Government of Ontario (incoming)", tone: "bg-gold" },
];

export const values = [
  { dir: "/assets/objects/anim/beaker", t: "Curiosity Over Comfort", d: "Pick the problem I don't know how to solve yet.", text: "text-green", glow: "var(--glow-green)" },
  { dir: "/assets/objects/anim/leader", t: "Lift the Team", d: "A win only counts if it travels with people.", text: "text-purple", glow: "var(--glow-purple)" },
  { dir: "/assets/objects/anim/trophy", t: "Finish What I Start", d: "Shipped and imperfect beats perfect and unbuilt.", text: "text-gold", glow: "var(--glow-gold)" },
];

export const enjoy = [
  { dir: "/assets/objects/anim/ai-engine", t: "AI Workflow Engines", d: "LLM + agentic pipelines (OpenAI, N8N, FastAPI)" },
  { dir: "/assets/objects/anim/fullstack", t: "Full-Stack Platforms", d: "FastAPI + React / Next.js, REST APIs" },
  { dir: "/assets/objects/anim/data", t: "Data & Analytics", d: "PostgreSQL pipelines & KPI dashboards" },
];

export const techStack = [
  { l: "Python", logo: "/assets/logos/python.svg" },
  { l: "C++", logo: "/assets/logos/cpp.svg" },
  { l: "JavaScript", logo: "/assets/logos/js.svg" },
  { l: "React", logo: "/assets/logos/react.svg" },
  { l: "Node.js", logo: "/assets/logos/node.svg" },
  { l: "MySQL", logo: "/assets/logos/sql.svg" },
];

export const skillGroups = [
  {
    title: "CORE LANGUAGES",
    accent: "green" as const,
    items: [{ l: "Python", v: 95 }, { l: "JavaScript", v: 85 }, { l: "TypeScript", v: 80 }, { l: "C++", v: 80 }, { l: "SQL", v: 88 }],
  },
  {
    title: "FRAMEWORKS & LIBRARIES",
    accent: "purple" as const,
    items: [{ l: "FastAPI", v: 92 }, { l: "SQLAlchemy", v: 85 }, { l: "Node.js", v: 80 }, { l: "React", v: 75 }, { l: "Next.js", v: 70 }],
  },
  {
    title: "TOOLS & TECHNOLOGIES",
    accent: "cyan" as const,
    items: [{ l: "Git & GitHub", v: 90 }, { l: "PostgreSQL", v: 85 }, { l: "MongoDB", v: 80 }, { l: "Linux", v: 80 }, { l: "Docker", v: 70 }],
  },
];

export type Job = {
  dir: string;
  role: string;
  org: string;
  tone: string;
  frames?: number;
  d?: string;
  incoming?: boolean;
  bullets?: string[];
  photos?: Photo[];
  photoLabel?: string;
};

/** track 1: paid / professional roles */
export const professional: Job[] = [
  {
    dir: "/assets/objects/anim/data",
    role: "PROJECT COORDINATOR CO-OP",
    org: "Government of Ontario — GovTechON, CYSSC · North York · Sep 2026 – Jan 2027",
    tone: "text-gold",
    incoming: true,
    bullets: [
      "Coordinated I&IT project delivery across CYSSC — managing competing priorities, tracking deliverables, and maintaining stakeholder alignment between the OCCIO, Minister's Office, Deputy Minister offices, and Cluster CIOs.",
      "Prepared briefing materials, status reports, and action item summaries for the Executive Advisor to the CIO/ADM — maintaining a bring-forward system and organized filing structure for rapid information retrieval.",
      "Supported expense reporting under the Travel, Meal and Hospitality Expenses Directive, plus invoice tracking, procurement coordination, and calendar management across concurrent office workstreams.",
    ],
  },
  {
    dir: "/assets/objects/anim/dev",
    role: "SOFTWARE DEVELOPER / AI DATA ENGINEER",
    org: "Ayvelis AI · Toronto · Jan 2026 – Present",
    tone: "text-cyan",
    bullets: [
      "Architected a privacy-preserving analytics platform (Python / FastAPI / PostgreSQL) serving production workloads.",
      "Built agentic AI inference pipelines (LLM + N8N) that cut processing latency by 40%.",
    ],
  },
];

/** track 2: campus leadership + student roles */
export const campus: Job[] = [
  {
    dir: "/assets/objects/anim/leader",
    role: "VICE PRESIDENT OF STUDENT LIFE",
    org: "Enactus York · Toronto · Sep 2025 – Present",
    tone: "text-purple",
    bullets: [
      "Grew the organization from 5 to 8+ core members and led teams to 3 regional award wins totalling $6,000 in funding.",
      "Took the York team to the Desjardins Community Empowerment Challenge at Enactus Canada Regionals.",
      "Run student life programming — recruitment, socials, and team culture across concurrent project teams.",
    ],
    photoLabel: "Enactus Canada Regionals",
    photos: [
      { src: "/assets/experience/enactus/enactus-1.jpg", caption: "Enactus York on the Regionals stage with the Desjardins Community Empowerment Challenge award." },
      { src: "/assets/experience/enactus/enactus-2.jpg", caption: "The team after the win at Enactus Canada Regionals, Toronto." },
    ],
  },
  {
    dir: "/assets/objects/anim/trophy",
    role: "RESEARCH & DEVELOPMENT LEAD",
    org: "Lassonde School of Engineering — Concrete Canoe · Sep 2025 – Apr 2026",
    tone: "text-green",
    bullets: [
      "Secured $20,000+ in sponsorship funding for the national concrete canoe competition in Moncton — covering 4 days of hotel accommodation and transportation for 20+ team members.",
      "Coordinated sponsorship outreach, travel logistics, and competition-day operations end to end.",
    ],
    photoLabel: "CNCCC Nationals, Moncton",
    photos: [
      { src: "/assets/experience/canoe/holding-canoe-water.jpg", caption: "Float test — carrying the CA-NEWS canoe into the water at Nationals." },
      { src: "/assets/experience/canoe/canoe-race.jpg", caption: "Race day on the water in Moncton, NB." },
      { src: "/assets/experience/canoe/canoe-boat.jpg", caption: "The finished CA-NEWS canoe and CCYU news stand display at CNCCC." },
      { src: "/assets/experience/canoe/team-dinner-moncton-comp.jpg", caption: "The York team between events at the national competition." },
      { src: "/assets/experience/canoe/flight-moncton.jpg", caption: "Flying the team out to Moncton — part of the travel logistics I coordinated." },
      { src: "/assets/experience/canoe/canoe-id.jpg", caption: "CSCE credentials — Canadian National Concrete Canoe Competition." },
    ],
  },
  {
    dir: "/assets/objects/anim/about",
    frames: 9,
    role: "FROSH LEADER",
    org: "Lassonde School of Engineering · North York · Aug 2025 – Present",
    tone: "text-cyan",
    bullets: [
      "Lead incoming-student orientation groups — schedule and logistics management across a multi-day program.",
      "Trained in crisis and conflict de-escalation; first point of contact for student issues during frosh week.",
    ],
  },
  {
    dir: "/assets/objects/anim/beaker",
    role: "HACKATHONS & COMPETITIONS",
    org: "2025 – 2026",
    tone: "text-gold",
    d: "3rd @ COIE Climathon ($500) · 3rd @ Hult Prize ($300) · Head Delegate @ CUSEC Canada 2025.",
  },
];

export const awards = [
  { r: "🥉", n: "COIE Climathon", p: "3rd · $500" },
  { r: "🥉", n: "Hult Prize", p: "3rd · $300" },
  { r: "🏅", n: "Enactus York — 3 Regional", p: "$6,000" },
  { r: "🎤", n: "Head Delegate — CUSEC", p: "2025" },
];

/* ---------------- chapter 2: project showcase ---------------- */

export type Project = {
  title: string;
  kicker: string;
  year: string;
  tone: Tone;
  /** real screenshot — shown in a pixel monitor frame */
  img?: string;
  /** animated pixel object folder (f00.png …) — used when there's no screenshot */
  anim?: string;
  frames?: number;
  link: string;
  linkLabel: "DEVPOST" | "GITHUB";
  desc: string;
  highlight?: string[];
  stack: string[];
  award?: string;
  /** small animated sprites that float around the scene at different depths */
  props: string[];
};

export const projects: Project[] = [
  {
    title: "Scotia FutureFlex",
    kicker: "FinTech Platform · 24-hour build",
    year: "2026",
    tone: "gold",
    img: "/assets/projects/scotia.png",
    link: "https://devpost.com/software/scotiabank-futureflex",
    linkLabel: "DEVPOST",
    desc: "A mobile-first investment platform with goal-based onboarding, a REST API backend and recommendation retrieval for Gen-Z financial engagement — shipped in a 24-hour build.",
    highlight: ["REST API backend", "24-hour build", "Gen-Z financial engagement"],
    stack: ["Python", "FastAPI", "JavaScript", "REST API"],
    award: "BEST UI/UX — SCOTIABANK CASEHACKS",
    props: ["/assets/objects/anim/trophy", "/assets/objects/anim/data"],
  },
  {
    title: "ComparaVision",
    kicker: "Real-time Analytics Dashboard",
    year: "2025",
    tone: "cyan",
    img: "/assets/projects/comparavision.png",
    link: "https://devpost.com/software/comparavision",
    linkLabel: "DEVPOST",
    desc: "A real-time model-comparison analytics dashboard with live system metrics and sustainability insights.",
    highlight: ["real-time", "sustainability insights"],
    stack: ["TypeScript", "React", "Analytics"],
    props: ["/assets/objects/anim/data", "/assets/objects/anim/dev"],
  },
  {
    title: "AdminSync AI",
    kicker: "LLM Workflow Engine",
    year: "2025",
    tone: "purple",
    anim: "/assets/objects/anim/ai-engine",
    frames: 4,
    link: profile.github,
    linkLabel: "GITHUB",
    desc: "An LLM-powered task-automation engine that parses natural language into structured execution plans, audit logs and checkpoint workflows — cutting coordination overhead by 60%.",
    highlight: ["structured execution plans", "cutting coordination overhead by 60%"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "OpenAI API", "N8N"],
    props: ["/assets/objects/anim/dev", "/assets/objects/anim/fullstack"],
  },
  {
    title: "Requirements Traceability Tool",
    kicker: "Enterprise QA & Test Validation",
    year: "2025",
    tone: "green",
    anim: "/assets/objects/anim/beaker",
    frames: 4,
    link: profile.github,
    linkLabel: "GITHUB",
    desc: "An enterprise QA traceability platform (inspired by DOORS & Polarion) linking requirements, test cases and verification states with full revision history and SDLC audit trails.",
    highlight: ["full revision history and SDLC audit trails"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "OOP"],
    props: ["/assets/objects/anim/data", "/assets/objects/anim/trophy"],
  },
  {
    title: "CivicFlow Analytics",
    kicker: "Government Reporting Pipeline",
    year: "2025",
    tone: "purple",
    anim: "/assets/objects/anim/data",
    frames: 4,
    link: profile.github,
    linkLabel: "GITHUB",
    desc: "A full-stack analytics system with PostgreSQL pipelines, automated SQL validation and Power BI-style KPI dashboards — simulating production-scale government reporting.",
    highlight: ["PostgreSQL pipelines", "Power BI-style KPI dashboards", "production-scale"],
    stack: ["Python", "PostgreSQL", "SQL", "Power BI"],
    props: ["/assets/objects/anim/fullstack", "/assets/objects/anim/leader"],
  },
];

/* ---------------- epilogue: contact ---------------- */

export const contacts = [
  { icon: "✉", t: "EMAIL", d: profile.email, href: `mailto:${profile.email}`, tone: "text-green" },
  { icon: "in", t: "LINKEDIN", d: profile.linkedinLabel, href: profile.linkedin, tone: "text-cyan" },
  { icon: "GH", t: "GITHUB", d: profile.githubLabel, href: profile.github, tone: "text-purple" },
  { icon: "DP", t: "DEVPOST", d: profile.devpostLabel, href: profile.devpost, tone: "text-gold" },
  { icon: "IG", t: "INSTAGRAM", d: profile.instagramLabel, href: profile.instagram, tone: "text-rose" },
];
