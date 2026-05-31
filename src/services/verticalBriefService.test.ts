import { describe, expect, it } from "vitest";
import {
  categoryMap,
  narrativePosture,
  payload,
  riskMap,
  summary,
  thesisLane,
  verification,
  whyNow
} from "./verticalBriefService.js";

describe("category thesis builder service", () => {
  it("returns an executive summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the thesis lane", () => {
    expect(thesisLane()[0]?.theme).toBeTruthy();
  });

  it("returns the category map", () => {
    expect(categoryMap()[0]?.marketTailwindScore).toBeGreaterThan(0);
  });

  it("returns why-now entries", () => {
    expect(whyNow()[0]?.whyNowThesis).toBeTruthy();
  });

  it("returns narrative-posture entries", () => {
    expect(narrativePosture()[0]?.categoryClaim).toBeTruthy();
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
