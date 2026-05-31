import express from "express";
import {
  renderCategoryMap,
  renderDocs,
  renderNarrativePosture,
  renderOverview,
  renderSample,
  renderThesisLane,
  renderVerification,
  renderWhyNow
} from "./services/render.js";
import {
  categoryMap,
  narrativePosture,
  payload,
  riskMap,
  summary,
  thesisLane,
  verification,
  whyNow
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/thesis-lane", (_req, res) => res.type("html").send(renderThesisLane()));
  app.get("/category-map", (_req, res) => res.type("html").send(renderCategoryMap()));
  app.get("/why-now", (_req, res) => res.type("html").send(renderWhyNow()));
  app.get("/narrative-posture", (_req, res) => res.type("html").send(renderNarrativePosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/thesis-lane", (_req, res) => res.json(thesisLane()));
  app.get("/api/category-map", (_req, res) => res.json(categoryMap()));
  app.get("/api/why-now", (_req, res) => res.json(whyNow()));
  app.get("/api/narrative-posture", (_req, res) => res.json(narrativePosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`category-thesis-builder listening on http://127.0.0.1:${port}`);
  });
}
