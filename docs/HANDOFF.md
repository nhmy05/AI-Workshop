# Handoff — Grocery Capacity Map

## Goal
Clickable front-end prototype: grocery stores on a MapLibre map with traffic-colored
capacity markers. No backend, all data mocked (`src/data/mockStores.ts`).

## Current state (works)
- `npm run dev` → map, 12 markers, search, "Least busy" filter, legend, detail sheet.
- `npm run build` passes clean (Next 16 + Turbopack, TS strict).
- Headless-Chrome smoke test passes: 12 markers, marker click opens detail sheet
  with correct data, search narrows results, **zero console errors in production**.

## Files changed (unpushed work is now committed — see git log)
- `src/components/map/GroceryMap.tsx` — default basemap switched from
  `demotiles.maplibre.org` (countries-only, caused the "blue screen") to free
  CARTO Positron (no API key). Removed duplicate-marker `load` block; marker sync
  effect rebuilds markers on `[stores, selectedStore]`; `onSelectStore` via ref
  to avoid rebuild flicker on each keystroke.
- `src/lib/capacity.ts` — `filterStores` fix: generic queries ("grocery",
  "stores", "market", "food", …) now match all stores. Previously the default
  query `"grocery stores"` matched zero stores (condition was backwards).
- `.env.example` — documents optional `NEXT_PUBLIC_MAP_STYLE_URL` override.
- `package-lock.json` — regenerated after clean `node_modules` reinstall.

## OPEN ISSUE: street tiles don't render (markers + UI fine)
Symptoms: markers/legend/search/detail sheet all render; basemap background stays
blank; CARTO attribution shows. No console errors, no failed network requests.
Verified facts (production build, headless Chrome):
- `style.json`, `tiles.json`, `sprite.json/.png` all load (HTTP 200).
- **Zero** vector-tile (`.mvt`) and **zero** glyph requests are ever made.
- Ruled out: WebGL (context works), `requestAnimationFrame` (fires normally),
  env vars (fallback URL is used), network/adblock (metadata loads fine).
- Dev-only red herring (ignore): Turbopack sometimes serves page HTML for a JS
  chunk URL mid-compile → "non-JavaScript MIME type" console errors. Benign,
  absent in production.
Suggested next steps:
1. Re-add temp hook `(window as any).__map = map` in `GroceryMap.tsx`, rebuild,
   and inspect live state: `__map.loaded()`, `__map.getZoom()`,
   `__map.getSource('carto').loaded()`, `__map.queryRenderedFeatures()`,
   canvas pixel size vs container size.
2. Prime suspect: map renders background layer but tile-loading never triggers —
   check transform/viewport state and whether `load`/`idle` events fire.
3. Fallback option: swap basemap to OpenFreeMap
   (`https://tiles.openfreemap.org/styles/liberty`) to isolate a CARTO-specific
   issue. Override without code change via `.env.local`:
   `NEXT_PUBLIC_MAP_STYLE_URL=<url>`.

## How to run / verify
```bash
cd grocery-capacity-map
npm run dev      # http://localhost:3000
npm run build    # must stay clean
```
Smoke test (kept OUT of repo, no test framework added to project):
`/tmp/smoke/smoke.js` (dev) and `/tmp/smoke/smoke-prod.js` (port 3005) use
`playwright-core` + system Chrome at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
Screenshots land in `/tmp/smoke/*.png`.

## Environment notes (this machine)
- Disk was 100% full → `next dev/build/lint` hung silently at startup. Freed
  space via `npm cache clean --force`. If commands hang again, check `df -h /`.
- `node_modules` was wiped + reinstalled after `kill -9` corruption left Next
  unable to start. If startup hangs with empty output, try
  `rm -rf node_modules .next && npm install` before deeper debugging.
- Remote: `origin` (SSH) on branch `master`. Just `git push`.

## Relevant files only (don't need whole repo)
`src/components/map/GroceryMap.tsx`, `src/lib/capacity.ts`,
`src/app/page.tsx`, `src/data/mockStores.ts`, `src/types/store.ts`,
`.env.example`, `README.md`
