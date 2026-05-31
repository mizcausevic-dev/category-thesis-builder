import { rm, writeFile } from "node:fs/promises";
import { sampleCategoryThesisBuilder } from "../src/data/sampleVerticalBrief.js";

async function main() {
  const clean = sampleCategoryThesisBuilder.map((item) => ({
    ...item,
    evidenceState: "CURRENT" as const,
    coherenceScore: Math.max(item.coherenceScore, 76),
    marketTailwindScore: Math.max(item.marketTailwindScore, 70),
    investorClarityScore: Math.max(item.investorClarityScore, 74),
    priorityBand: item.priorityBand === "MUST_FIX" ? ("SHORE_UP" as const) : item.priorityBand,
    whyNowThesis:
      item.evidenceState === "CURRENT"
        ? item.whyNowThesis
        : `${item.whyNowThesis} Proof has been refreshed for the clean investor-ready packet.`
  }));

  await writeFile(
    "fixtures/category-thesis-builder.json",
    JSON.stringify(sampleCategoryThesisBuilder, null, 2) + "\n"
  );
  await writeFile(
    "fixtures/category-thesis-builder-clean.json",
    JSON.stringify(clean, null, 2) + "\n"
  );

  for (const file of ["fixtures/boardroom-sparring-partner.json", "fixtures/boardroom-sparring-partner-clean.json"]) {
    try {
      await rm(file);
    } catch {
      // Ignore missing copied fixtures during scaffold cleanup.
    }
  }
}

await main();
