# Varun Patel — Interactive Developer Portfolio

A game-inspired pixel-art developer portfolio. Built with **Next.js (App Router) + TypeScript +
Tailwind**, with a **Phaser 3** night-world scene on the home page.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Routes
- `/` — Home: Phaser world background + hero, four destination doors, character, instruction
  panel, stat chips.
- `/about` — Who I am, education, journey, what I build, core values.
- `/projects` — Filter chips, project cards, featured build + achievements.
- `/skills` — Status/high-score, arcade cabinets, skill bars, mission log, leaderboard.
- `/contact` — Info, message form, resume panel, portal.

## Design system
Reusable pixel components in `components/pixel/` (PixelPanel, PixelButton, PixelBadge,
PixelProgressBar, PixelInput, ArtSlot, CharacterSprite) + shared chrome (`TopBar`, `NavBar`,
`FooterTicker`, `PageChrome`). Palette/fonts/shadows in `tailwind.config.ts` + `app/globals.css`.
Square corners, chunky black borders, blocky offset shadows.

## Art
Pixel art lives in `public/assets/` and is used through replaceable slots — swap the file or the
`src` to change artwork. To generate the missing scene backgrounds + walking character, see
[`PIXELLAB_PROMPTS.md`](./PIXELLAB_PROMPTS.md).

## Status / next pass
Visual-first build is complete. Planned next pass (separate approval): wire **live WASD/arrow
movement** into the Phaser `WorldScene` so the character walks the world and "Enter" at a door
opens that section. Content currently uses realistic placeholders — replace with real
projects/links/resume.

## Deploy
Vercel-ready: push to a Git repo and import, or `vercel` from the CLI.
```
