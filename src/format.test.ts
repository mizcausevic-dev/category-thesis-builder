import { describe, expect, it } from "vitest";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import { sampleCategoryThesisBuilder } from "./data/sampleVerticalBrief.js";

describe("format", () => {
  it("formats summary and JSON reports", () => {
    const report = analyze(sampleCategoryThesisBuilder, { now: "2026-06-01T00:00:00.000Z" });

    expect(formatSummary(report)).toContain("Generated: 2026-06-01T00:00:00.000Z");
    expect(formatSummary(report)).toContain("OK:");
    expect(JSON.parse(formatJson(report))).toMatchObject({
      generatedAt: "2026-06-01T00:00:00.000Z",
      items: sampleCategoryThesisBuilder.length
    });
  });
});
