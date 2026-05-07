import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "Identity Access Audit API");
});

test("GET /api/users returns an array", async () => {
  const response = await request(app).get("/api/users");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/analyze/access-risk returns score and status", async () => {
  const response = await request(app).post("/api/analyze/access-risk").send({
    userName: "Jordan Avery",
    department: "Finance Operations",
    role: "Billing Administrator",
    sensitiveApplications: ["ERP", "Revenue Reporting"],
    privilegedEntitlements: 4,
    daysSinceLastAccessReview: 212,
    hasPolicyException: true,
    isDormant: false,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("GET /api/findings returns an array", async () => {
  const response = await request(app).get("/api/findings");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test("POST /api/analyze/remediation returns recommended next-step output", async () => {
  const response = await request(app).post("/api/analyze/remediation").send({
    userName: "Jordan Avery",
    department: "Finance Operations",
    role: "Billing Administrator",
    sensitiveApplications: ["ERP", "Revenue Reporting"],
    privilegedEntitlements: 4,
    daysSinceLastAccessReview: 212,
    hasPolicyException: true,
    isDormant: false,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.priority, "string");
  assert.equal(typeof response.body.recommendedNextAction, "string");
});
