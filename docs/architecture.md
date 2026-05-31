# Architecture

Category Thesis Builder is a static-friendly TypeScript executive-narrative layer for the Kinetic Gain executive-intelligence estate.

- `src/data/sampleVerticalBrief.ts` holds the modeled category-thesis dataset.
- `src/analyze.ts` scores coherence, timing strength, investor clarity, and narrative fragility.
- `src/services/verticalBriefService.ts` exposes the thesis-lane, category-map, why-now, and narrative-posture packets used by both the app and prerender step.
- `src/services/render.ts` renders the executive HTML surfaces and the sample JSON output.
- `scripts/prerender.ts` emits the static site, API payloads, `robots.txt`, and `sitemap.xml` for GitHub Pages.
