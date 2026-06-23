# PixelLab-ready prompts — scene art & character

PixelLab wasn't available while building, so the app currently uses the small object
PNGs from `portfolio_content/` (door, vault, arcade, portal, desk, mailbox) plus CSS
placeholders. Generate the assets below in PixelLab, then drop them into
`public/assets/` and swap the `src` in the relevant component (all art lives in
replaceable `ArtSlot`s / `<img>` tags).

## Character (highest priority)
**Walk sprite — Home world + TopBar avatar**
> 16-bit pixel-art character sprite for a developer's interactive portfolio world. Friendly
> young developer in a casual cyan hoodie, front-facing idle pose, readable at 48×48,
> transparent background, crisp pixel edges, palette tuned to the V2 dark arcade-cozy world
> (base #13111d / #181527) with cyan (#56c7f5) primary plus orange (#ff9b42) and green
> (#7bd88f) accents, game-asset style, no text. Provide 4-direction walk frames
> (down/up/left/right), 4 frames each.

Swap into: `components/pixel/CharacterSprite.tsx` (replace CSS sprite with the sheet) and
`components/TopBar.tsx` avatar.

## Full scene backgrounds (one per page)
Each: 16-bit pixel art, wide 16:9, crisp edges, limited palette on a dark night base, no text.

1. **Home — night-city world**
   > Wide pixel-art night world: starry purple sky, full moon, distant glowing city skyline,
   > grassy foreground path with lampposts, room for four "doorway" structures in a row.

2. **About — cozy bedroom interior**
   > Cozy pixel-art developer bedroom at night: wooden desk with dual monitors showing code,
   > bookshelf, plants, string lights, bed, warm lamp glow, window to a night city.

3. **Projects — vault / server interior**
   > Dark steel pixel-art vault and server room: a large round vault door on the left, server
   > racks with blinking green/cyan lights, industrial pipes, moody lighting.

4. **Skills — neon arcade hall**
   > Pixel-art retro arcade hall at night: a row of glowing arcade cabinets along both walls,
   > neon trim, checkered floor with reflections, dark ceiling, trophy shelf.

5. **Contact — portal garden at night**
   > Pixel-art moonlit garden: a glowing purple swirling portal on the right, stone path, a
   > wooden mailbox, lanterns, flowers, night city across the water.

## Object refinements (optional)
Re-generate the existing objects at higher resolution to match a unified palette:
arcade machine, corporate vault door, cozy bedroom door, portal, computer desk, mailbox —
all "16-bit, transparent background, front-facing game asset, V2 palette: cyan (#56c7f5)
primary with orange (#ff9b42) and green (#7bd88f) accents on a dark base, crisp edges, no text."

## Where assets map in code
| Asset | File in `public/assets/` | Used by |
|---|---|---|
| About door | `door.png` | Home destination |
| Arcade | `arcade.png` | Home (Projects) destination |
| Vault | `vault.png` | Home (Skills) destination |
| Portal | `portal.png` | Home destination, Contact page |
| Desk | `desk.png` | (available for About) |
| Mailbox | `mailbox.png` | (available for Contact) |
| Character | _to generate_ | `CharacterSprite.tsx`, `TopBar.tsx` |
| Scene backgrounds | _to generate_ | per-page background layers |
