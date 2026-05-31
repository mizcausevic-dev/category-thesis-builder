import { analyze } from "../analyze.js";
import { sampleCategoryThesisBuilder } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleCategoryThesisBuilder, { now: "2026-05-31T23:40:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageCoherence: report.averageCoherence,
    averageTailwind: report.averageTailwind,
    averageInvestorClarity: report.averageInvestorClarity,
    defensibleThemes: report.defensibleThemes,
    missingEvidenceItems: report.missingEvidenceItems,
    narrativeRiskScore: report.narrativeRiskScore,
    highFindings,
    recommendation:
      "Lead with AI governance, platform margin intelligence, and identity risk; keep FinTech in the next line; compress biotech and nonprofit under regulated-quality and impact-intelligence language; leave robotics as supporting proof only."
  };
}

export function thesisLane() {
  return sampleCategoryThesisBuilder.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    categoryClaim: item.categoryClaim,
    investorQuestion: item.investorQuestion,
    priorityBand: item.priorityBand,
    coherenceScore: item.coherenceScore,
    wedgeSummary: item.wedgeSummary,
    nextMove: item.nextMove
  }));
}

export function categoryMap() {
  return sampleCategoryThesisBuilder.map((item) => ({
    theme: item.theme,
    evidenceState: item.evidenceState,
    investorClarityScore: item.investorClarityScore,
    marketTailwindScore: item.marketTailwindScore,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces
  }));
}

export function whyNow() {
  return sampleCategoryThesisBuilder.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    whyNowThesis: item.whyNowThesis,
    marketTailwindScore: item.marketTailwindScore
  }));
}

export function narrativePosture() {
  return sampleCategoryThesisBuilder.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    categoryClaim: item.categoryClaim,
    coherenceScore: item.coherenceScore,
    investorClarityScore: item.investorClarityScore
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic category-narrative data only - no live investor memos, board decks, or private diligence materials are included.",
    "Coherence, tailwind, and investor-clarity scores are modeled from the sample review set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package category narrative and why-now posture as an executive-intelligence product.",
    "Company tags and related surfaces are synthetic decision aids rather than audited market positions.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    thesisLane: thesisLane(),
    categoryMap: categoryMap(),
    whyNow: whyNow(),
    narrativePosture: narrativePosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleCategoryThesisBuilder
  };
}
