# LUNE Beauty Studio

**Concept Beauty Salon Landing Page** — a B-T-B-N Web portfolio project.

A Mongolian-language site for a fictional beauty studio, presenting services, pricing and the studio atmosphere.

This is a self-directed concept project built to demonstrate design and front-end work. The brand is fictional and is not a real company or paying client. There is no backend, payment, login or real booking — forms and dialogs are demonstrations only.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Playwright (tests)
- Oxlint

## Key features

- Service cards that pre-select the matching booking option
- Image gallery with arrow navigation and focus restore
- Accessible booking dialog (demo only — nothing is submitted)
- Mobile menu with Escape handling and desktop reset
- Reduced-motion support

## Run
- `npm install`
- `npm run dev -- --port 5174`
- `npm run lint`
- `npm run build`
- `npm test` (install Chromium first with `npx playwright install chromium` if needed)
- `npm run preview`

Build output: `dist/`. Deploy it to any static host.

## Edit
- `src/data.ts`: services, starting prices, durations, navigation, gallery, fictional reviews and contact details.
- `src/App.tsx`: section layouts and page copy.
- `src/components.tsx`: icons, navigation, reveal animations, accessible dialogs, schematic location map.
- `src/index.css`: palette, typography, layouts and responsive styles.
- `public/images/`: compressed, locally hosted photos.
- `index.html`: search and social metadata.

Booking buttons open a service selector with pricing and contact options. The modal identifies the site as a demo and does not claim to reserve a time. Gallery images open a viewer with previous/next buttons and arrow-key support. Dialogs support Escape, focus containment and focus restoration. Animations respect reduced-motion preferences. No runtime photo or font network requests.

All business details, prices, reviews, address and phone number are fictional examples. Social links lead to platform homepages; the map link opens Ulaanbaatar, not a nonexistent salon. Replace these before use for a real business. Set an absolute deployed image URL for og:image before publishing.

## Photo sources
Optimized Unsplash placeholders, not claims of actual LUNE premises or work:
- Portrait: https://images.unsplash.com/photo-1524504388940-b1c1722653e1
- Studio: https://images.unsplash.com/photo-1560066984-138dadb4c035
- Hair styling: https://images.unsplash.com/photo-1562322140-8baeececf3df
- Facial care: https://images.unsplash.com/photo-1570172619644-dfd03ed5d881
- Nails: https://images.unsplash.com/photo-1604654894610-df63bc536371
- Makeup: https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9

Manrope fonts are bundled locally through Fontsource. Display typography uses system Georgia, with a serif fallback.
