import { describe, expect, it } from "vitest";
import { analyze, toExport } from "./analyze.js";
import type { ThesisItem } from "./types.js";

const baseItem: ThesisItem = {
  id: "test-theme",
  theme: "Test theme",
  sector: "EXECUTIVE_INTELLIGENCE",
  executiveBuyer: "Board",
  categoryClaim: "Test category claim",
  investorQuestion: "What should the board believe?",
  priorityBand: "DEFEND",
  coherenceScore: 82,
  marketTailwindScore: 73,
  investorClarityScore: 80,
  evidenceState: "CURRENT",
  wedgeSummary: "A clear wedge.",
  whyNowThesis: "A clear why-now.",
  nextMove: "Package the evidence.",
  companyTags: ["Kinetic Gain"],
  relatedSurfaces: ["portfolio.kineticgain.com"]
};

describe("analyze", () => {
  it("marks strong current themes as defensible", () => {
    const report = analyze([baseItem], { now: "2026-06-01T00:00:00.000Z" });

    expect(report.generatedAt).toBe("2026-06-01T00:00:00.000Z");
    expect(report.defensibleThemes).toBe(1);
    expect(report.findingsList.some((finding) => finding.code === "category-defensible")).toBe(true);
    expect(report.ok).toBe(true);
  });

  it("flags weak, stale, and missing thesis evidence", () => {
    const weakStale: ThesisItem = {
      ...baseItem,
      id: "weak-stale",
      theme: "Weak stale theme",
      coherenceScore: 60,
      marketTailwindScore: 55,
      investorClarityScore: 65,
      evidenceState: "STALE"
    };
    const missing: ThesisItem = {
      ...baseItem,
      id: "missing",
      theme: "Missing theme",
      coherenceScore: 50,
      marketTailwindScore: 50,
      investorClarityScore: 50,
      evidenceState: "MISSING"
    };

    const report = analyze([weakStale, missing], { now: "2026-06-01T00:00:00.000Z" });
    const codes = report.findingsList.map((finding) => finding.code);
    const severities = report.findingsList.map((finding) => finding.severity);

    expect(codes).toContain("missing-evidence");
    expect(codes).toContain("weak-wedge");
    expect(codes).toContain("timing-fragility");
    expect(codes).toContain("narrative-drift");
    expect(severities).toContain("high");
    expect(report.missingEvidenceItems).toBe(2);
    expect(report.ok).toBe(false);
  });

  it("creates a timestamped export", () => {
    const exported = toExport([baseItem], "2026-06-01T00:00:00.000Z");

    expect(exported.generatedAt).toBe("2026-06-01T00:00:00.000Z");
    expect(exported.items).toHaveLength(1);
  });
});
