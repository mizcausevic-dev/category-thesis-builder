import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("category-thesis-builder app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/thesis-lane", "/category-map", "/why-now", "/narrative-posture", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/thesis-lane",
      "/api/category-map",
      "/api/why-now",
      "/api/narrative-posture",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
    }
  });
});
