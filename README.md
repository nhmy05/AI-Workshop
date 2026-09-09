# Grocery Capacity Map

Prototype grocery store capacity map. Stores display as traffic-colored markers showing crowd levels at a glance.

## Setup

```bash
git clone <repo-url>
cd grocery-capacity-map
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Tech

Next.js, TypeScript, React, Tailwind CSS, MapLibre GL JS

## Notes

- All store data is mocked in `src/data/mockStores.ts`
- Map uses free demo tiles, no API keys needed
- Directions button is a placeholder
