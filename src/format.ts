import type { ThesisReport } from "./types.js";

export function formatSummary(report: ThesisReport) {
  return [
    `Generated: ${report.generatedAt}`,
    `Themes: ${report.items}`,
    `Average coherence: ${report.averageCoherence}`,
    `Average tailwind: ${report.averageTailwind}`,
    `Average investor clarity: ${report.averageInvestorClarity}`,
    `Defensible themes: ${report.defensibleThemes}`,
    `Missing evidence: ${report.missingEvidenceItems}`,
    `Narrative risk score: ${report.narrativeRiskScore}`,
    `Findings: ${report.findingsList.length}`,
    `OK: ${report.ok ? "yes" : "no"}`
  ].join("\n");
}

export function formatJson(report: ThesisReport) {
  return JSON.stringify(report, null, 2);
}
