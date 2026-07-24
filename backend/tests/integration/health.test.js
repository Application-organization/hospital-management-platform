const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../src/app");

describe("Health Check Integration Tests", () => {
  describe("GET /api/v1/health/live", () => {
    test("returns 200 when the application process is alive", async () => {
      const response = await request(app).get(
        "/api/v1/health/live"
      );

      expect(response.statusCode).toBe(200);

      expect(response.body.success).toBe(true);

      expect(response.body.message).toBe(
        "Service is alive"
      );

      expect(response.body.data.status).toBe("alive");

      expect(response.body.data).toHaveProperty(
        "uptime"
      );

      expect(response.body.data).toHaveProperty(
        "environment"
      );

      expect(response.body.data).toHaveProperty(
        "version"
      );

      expect(response.body.data).toHaveProperty(
        "timestamp"
      );
    });
  });

  describe("GET /api/v1/health", () => {
    test("returns a valid health response", async () => {
      const response = await request(app).get(
        "/api/v1/health"
      );

      expect([200, 503]).toContain(
        response.statusCode
      );

      expect(response.body).toHaveProperty(
        "success"
      );

      expect(response.body).toHaveProperty(
        "message"
      );

      expect(response.body.data).toHaveProperty(
        "status"
      );

      expect(response.body.data).toHaveProperty(
        "database"
      );

      expect([
        "connected",
        "disconnected",
      ]).toContain(
        response.body.data.database
      );
    });
  });

  describe("GET /api/v1/health/ready", () => {
    test("returns a valid readiness response", async () => {
      const response = await request(app).get(
        "/api/v1/health/ready"
      );

      expect([200, 503]).toContain(
        response.statusCode
      );

      expect(response.body).toHaveProperty(
        "success"
      );

      expect(response.body).toHaveProperty(
        "message"
      );

      expect(response.body.data).toHaveProperty(
        "status"
      );

      expect(response.body.data).toHaveProperty(
        "database"
      );

      expect([
        "connected",
        "disconnected",
      ]).toContain(
        response.body.data.database
      );
    });
  });

  describe("Unknown routes", () => {
    test("returns 404 for a route that does not exist", async () => {
      const response = await request(app).get(
        "/api/v1/this-route-does-not-exist"
      );

      expect(response.statusCode).toBe(404);

      expect(response.body.success).toBe(false);

      expect(response.body.message).toContain(
        "not found"
      );
    });
  });
});