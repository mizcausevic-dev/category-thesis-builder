import type { ThesisExport, ThesisItem, ThesisReport, Finding } from "./types.js";

function finding(
  item: ThesisItem,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    sector: item.sector,
    theme: item.theme
  };
}

function evaluate(item: ThesisItem): Finding[] {
  const findings: Finding[] = [];

  if (item.evidenceState !== "CURRENT") {
    findings.push(
      finding(
        item,
        "missing-evidence",
        item.evidenceState === "MISSING" ? "high" : "medium",
        "The thesis still relies on stale or missing proof, so it should not lead an investor memo or category brief yet."
      )
    );
  }

  if (item.coherenceScore < 68) {
    findings.push(
      finding(
        item,
        "weak-wedge",
        "medium",
        "The category wedge is not crisp enough yet, so the story risks sounding like a bundle of tools instead of a market thesis."
      )
    );
  }

  if (item.marketTailwindScore < 62) {
    findings.push(
      finding(
        item,
        "timing-fragility",
        "low",
        "The timing story is still fragile and needs a stronger why-now frame before this theme becomes a lead category claim."
      )
    );
  }

  if (item.investorClarityScore < 70) {
    findings.push(
      finding(
        item,
        "narrative-drift",
        "medium",
        "Investor-facing language is still too loose, so buyers may understand the assets without understanding the category."
      )
    );
  }

  if (
    item.coherenceScore >= 80 &&
    item.marketTailwindScore >= 72 &&
    item.investorClarityScore >= 78 &&
    item.evidenceState === "CURRENT"
  ) {
    findings.push(
      finding(
        item,
        "category-defensible",
        "high",
        "This theme is strong enough to anchor a category memo, investor narrative, or board-ready why-now story now."
      )
    );
  }

  return findings;
}

export function analyze(items: ThesisItem[], options: { now?: string } = {}): ThesisReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap(evaluate);
  const count = items.length;
  const averageCoherence = Math.round(items.reduce((sum, item) => sum + item.coherenceScore, 0) / count);
  const averageTailwind = Math.round(items.reduce((sum, item) => sum + item.marketTailwindScore, 0) / count);
  const averageInvestorClarity = Math.round(
    items.reduce((sum, item) => sum + item.investorClarityScore, 0) / count
  );
  const defensibleThemes = items.filter(
    (item) =>
      item.coherenceScore >= 80 &&
      item.marketTailwindScore >= 72 &&
      item.investorClarityScore >= 78 &&
      item.evidenceState === "CURRENT"
  ).length;
  const missingEvidenceItems = items.filter((item) => item.evidenceState !== "CURRENT").length;
  const narrativeRiskScore = items.reduce((sum, item) => {
    const evidencePenalty = item.evidenceState === "MISSING" ? 18 : item.evidenceState === "STALE" ? 10 : 0;
    return (
      sum +
      Math.max(0, 82 - item.coherenceScore) +
      Math.max(0, 78 - item.investorClarityScore) +
      Math.max(0, 72 - item.marketTailwindScore) +
      evidencePenalty
    );
  }, 0);

  return {
    generatedAt,
    items: count,
    averageCoherence,
    averageTailwind,
    averageInvestorClarity,
    defensibleThemes,
    missingEvidenceItems,
    narrativeRiskScore,
    findingsList,
    ok: averageCoherence >= 72 && averageInvestorClarity >= 70 && missingEvidenceItems < 4
  };
}

export function toExport(items: ThesisItem[], now?: string): ThesisExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
