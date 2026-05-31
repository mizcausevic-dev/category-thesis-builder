import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleCategoryThesisBuilder } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleCategoryThesisBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.items).toBe(8);
  });

  it("computes positive coherence and clarity", () => {
    const report = analyze(sampleCategoryThesisBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.averageCoherence).toBeGreaterThanOrEqual(60);
    expect(report.averageInvestorClarity).toBeGreaterThanOrEqual(60);
  });

  it("counts defensible themes and missing evidence", () => {
    const report = analyze(sampleCategoryThesisBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.defensibleThemes).toBeGreaterThanOrEqual(1);
    expect(report.missingEvidenceItems).toBeGreaterThanOrEqual(1);
  });

  it("emits wedge and evidence findings", () => {
    const report = analyze(sampleCategoryThesisBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "missing-evidence")).toBe(true);
    expect(
      report.findingsList.some((finding) => finding.code === "weak-wedge" || finding.code === "narrative-drift")
    ).toBe(true);
  });

  it("rolls up narrative risk", () => {
    const report = analyze(sampleCategoryThesisBuilder, { now: "2026-05-31T23:40:00Z" });
    expect(report.narrativeRiskScore).toBeGreaterThan(0);
  });
});
