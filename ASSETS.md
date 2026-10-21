# Assets

Every asset in the game, with its source and licence. Mood-board renders under docs/explorations/ are reference, not
shipped.

| Asset | What | Source | Licence |
|---|---|---|---|
| src/assets/lanterns/keeper.png, keeper.json | The keeper lantern: four 128 x 200 upright frames (yours and theirs, lit and dark), 64 falling frames of 288 x 288 (8 directions x 4 tilts, both sides), and a Phaser hash atlas with the foot and light points | Our own: modelled and rendered in Blender 5.2 by tools/blender/lantern-round/lanterns.py (sprites mode), packed by pack.sh; the model is tools/blender/lantern-round/keeper.blend | Ours (made for this game, 2026-10-19) |
| src/assets/menu/planet.jpg | The menus' hero: the planet's ground (ground round 3, mix E, the recommended mood frame), 1280 x 720 | Our own: rendered in Blender by tools/blender/ground-round/r3-skin-e.py; the frame is docs/explorations/scifi/ground/round-3/e-recommended/mood.png | Ours (made for this game, 2026-10-19) |
| src/assets/ground/plate.jpg | The ground plate: the static backdrop under the board (ground round 3, mix E's hide, seen straight down), 720 x 1280, framed to the game's canvas; the field, lane and home sockets only, no game state. Since 2026-10-21 the sockets sit at the moved homes (y 0.25 and 7.6) without their cage | Our own: rendered in Blender by tools/blender/home-round/plate-homes.py (ground-round/plate.py with knobs: HOME_YOU_Y=0.25 HOME_THEM_Y=7.6 CAGE=0 SOCKET_GLOW=0.6 SOCKET_LIGHT=1.2) | Ours (made for this game, 2026-10-20, re-rendered 2026-10-20) |
| src/assets/homes/stalagmite.png | The home lanterns, the Stalagmite: eight 256 x 320 frames (yours full, half, low, out; theirs the same), flat-toon | Our own: rendered in Blender by tools/blender/home-round-2/homes.py (stalagmite.blend), packed with ffmpeg | Ours (made for this game, 2026-10-21) |
| src/assets/fonts/gloock.woff2 | Gloock (titles), latin subset | Google Fonts, by Duarte Pinheiro | SIL Open Font License 1.1 |
| src/assets/fonts/figtree.woff2 | Figtree (body text), variable weight, latin subset | Google Fonts, by Erik Kennedy | SIL Open Font License 1.1 |
| src/assets/fonts/jetbrains-mono.woff2 | JetBrains Mono (labels), variable weight, latin subset | Google Fonts, by JetBrains | SIL Open Font License 1.1 |
