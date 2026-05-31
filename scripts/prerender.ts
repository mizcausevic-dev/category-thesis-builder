import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderCategoryMap,
  renderDocs,
  renderNarrativePosture,
  renderOverview,
  renderSample,
  renderThesisLane,
  renderVerification,
  renderWhyNow
} from "../src/services/render.js";
import {
  categoryMap,
  narrativePosture,
  payload,
  riskMap,
  summary,
  thesisLane,
  verification,
  whyNow
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");

async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

await rm(outDir, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("thesis-lane", "index.html")]: renderThesisLane(),
  [path.join("category-map", "index.html")]: renderCategoryMap(),
  [path.join("why-now", "index.html")]: renderWhyNow(),
  [path.join("narrative-posture", "index.html")]: renderNarrativePosture(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://thesis.kineticgain.com/sitemap.xml\n",
  "sitemap.xml":
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://thesis.kineticgain.com/</loc></url><url><loc>https://thesis.kineticgain.com/thesis-lane/</loc></url><url><loc>https://thesis.kineticgain.com/category-map/</loc></url><url><loc>https://thesis.kineticgain.com/why-now/</loc></url><url><loc>https://thesis.kineticgain.com/narrative-posture/</loc></url><url><loc>https://thesis.kineticgain.com/verification/</loc></url><url><loc>https://thesis.kineticgain.com/docs/</loc></url></urlset>',
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "thesis-lane.json")]: JSON.stringify(thesisLane(), null, 2),
  [path.join("api", "category-map.json")]: JSON.stringify(categoryMap(), null, 2),
  [path.join("api", "why-now.json")]: JSON.stringify(whyNow(), null, 2),
  [path.join("api", "narrative-posture.json")]: JSON.stringify(narrativePosture(), null, 2),
  [path.join("api", "risk-map.json")]: JSON.stringify(riskMap(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};

for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
