# Components map

Quick guide to where things live so you can find the right file fast.

```
components/
├── ambient/          ← full-screen day/night background effects (mounted once, sit behind everything)
│   ├── StarField.tsx   night sky + twinkling stars/sparkles (z-0). Used on home + every PageChrome page.
│   ├── PixelSun.tsx    day-mode pixel sun, top-right (z-[2]).
│   └── DayBeach.tsx    day-mode sand + water strip along the bottom (z-[2]).
│
├── home/             ← the landing screen (route: app/page.tsx)
│   ├── HomeLoader.tsx  pixel loading screen: bar fills → character spins → fades to reveal the world.
│   ├── WorldHome.tsx   the walkable scene — character (WASD), doors, idle bop. The main event.
│   └── HeroBanner.tsx  the “VARUN PATEL” neon title + typewriter role line, overlaid on the world.
│
├── pixel/            ← reusable pixel UI primitives (the design-system building blocks)
│   ├── PixelButton.tsx, PixelPanel.tsx, PixelBadge.tsx, PixelInput.tsx,
│   ├── PixelProgressBar.tsx, CharacterSprite.tsx, ArtSlot.tsx, Sparkles.tsx
│
├── (shared shell + nav)
│   ├── PageChrome.tsx      shared page shell for all interior pages (stars + header + content + footer).
│   ├── SiteHeader.tsx      the top dashboard (HUD + nav + socials) — identical on every page.
│   ├── PlayerHUD.tsx       avatar + level + XP bar (left of the header).
│   ├── HudAvatar.tsx       the little rotating avatar inside the HUD.
│   ├── GameNav.tsx         the HOME/ABOUT/PROJECTS/… nav links.
│   ├── SocialIcons.tsx     GitHub / LinkedIn / etc. buttons.
│   ├── ThemeToggle.tsx     day ↔ night switch (sets data-theme + localStorage).
│   ├── FooterTicker.tsx    scrolling footer strip on interior pages.
│   └── SectionArrowNav.tsx ← / → arrow keys to move between sections; ESC → home.
│
├── (motion / reveal helpers)
│   ├── Reveal.tsx, ScrollReveal.tsx   fade/slide-in on mount or on scroll.
│   ├── Parallax.tsx                   scroll-parallax wrapper (background glows, etc.).
│   └── Typewriter.tsx                 typed-text effect (used by HeroBanner).
│
├── (page content pieces)
│   ├── AnimatedSprite.tsx   cycles f00…fN frames — the animated pixel icons across the pages.
│   ├── RotatingCharacter.tsx cycles the 4 facing sprites to “turn” (used on About).
│   ├── ResumeViewer.tsx     resume preview on the Contact page.
│   ├── SectionProgress.tsx, StatCards.tsx, DestinationDoor.tsx  ← older/section-specific pieces.
│
└── (legacy — not in the current design)
    ├── NavBar.tsx, TopBar.tsx   superseded by SiteHeader; safe to ignore.
```

## Where the character art lives
`public/assets/character/`
- `south|north|east|west.png` — static facing sprites.
- `walk/<dir>/0..5.png` — walk cycle.
- `idle/<dir>/f00..f03.png` — idle-bop frames (south/east/west; PixelLab-generated).

## Quick “who mounts what”
- **app/layout.tsx** → `ambient/PixelSun`, `ambient/DayBeach` (global, every page).
- **app/page.tsx** (home) → `home/HomeLoader`, `ambient/StarField`, `SiteHeader`, `home/WorldHome`, `home/HeroBanner`.
- **app/*/page.tsx** (interior) → `PageChrome` (which pulls in `ambient/StarField` + `SiteHeader` + `FooterTicker` + `SectionArrowNav`).
