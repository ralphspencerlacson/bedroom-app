# My Room

An interactive 3D room built with React, React Three Fiber, Drei, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Use Room, Workspace, and Gaming to explore. Drag to orbit, scroll or pinch to zoom,
and Reset view to return home. Day/night and room lights are independent.
Click the TV or use **A little magic** to float the TV and controllers.
Camera coordinates are available through **Camera info**.

## Checks

```sh
npm run lint
npm run build
npm run test:e2e
```

The browser checks use installed Microsoft Edge in headless mode. For another
Chromium browser, change `channel` in `playwright.config.js`.

## Assets and materials

Models live in `public/models`. The controller, entertainment furniture, and
console have been optimized with glTF Transform 4.5: meshopt compression, geometry
simplification at its default 0.0001 error tolerance, and WebP textures capped at
1024 pixels. Together they decreased from about 60 MiB to 4.7 MiB.
Drei's bundled Meshopt decoder handles these files without a remote decoder.

To optimize a replacement asset, write to a separate output and inspect it before
replacing the original:

```sh
npx gltf-transform optimize input.glb output.glb --compress meshopt --texture-size 1024 --texture-compress webp --flatten false --join false --palette false
```

The computer desk GLB supplies gray placeholder materials. `deskMaterials.js`
assigns procedural oak, charcoal, and metal finishes using its material names and
source geometry. If the desk model changes, review those mappings.

The city lighting map is bundled at `public/environments/city.hdr`, sourced from
the existing Drei city preset:
https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/potsdamer_platz_1k.hdr

The app respects reduced-motion settings for camera transitions and floating.
