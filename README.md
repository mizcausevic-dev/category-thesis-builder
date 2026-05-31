# Category Thesis Builder

Executive narrative surface for category framing, investor-ready positioning, why-now clarity, and thesis-defensible company stories across the Kinetic Gain executive-intelligence estate.

- Live: `http://thesis.kineticgain.com/`
- Repo: `mizcausevic-dev/category-thesis-builder`

## What it does
- turns messy operating proof into a cleaner category claim leaders can defend
- keeps the investor question, why-now thesis, wedge summary, and next move on one lane
- separates themes that are ready to lead from themes that still lack enough evidence or timing support
- exposes the same thesis posture through HTML, JSON APIs, screenshots, and a reproducible CLI

## Routes
- `/`
- `/thesis-lane`
- `/category-map`
- `/why-now`
- `/narrative-posture`
- `/verification`
- `/docs`

## Local run
```powershell
cd category-thesis-builder
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI
```powershell
npx category-thesis-builder fixtures/category-thesis-builder.json --format summary
npx category-thesis-builder fixtures/category-thesis-builder-clean.json --format json
```

## Verification
- synthetic sample data only
- no live investor memos, board decks, or customer private data
- all routes and packets are generated from the sample export in this repo
