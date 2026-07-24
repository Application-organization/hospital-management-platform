jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("Environment Configuration Validation", () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  test("loads valid environment configuration successfully", () => {
    process.env.APP_NAME = "Hospital Management Platform";
    process.env.NODE_ENV = "test";
    process.env.PORT = "5000";
    process.env.API_VERSION = "v1";
    process.env.MONGODB_URI =
      "mongodb://localhost:27017/hospital-management-test";
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1d";

    const env = require("../../../src/config/env");

    expect(env.app.name).toBe("Hospital Management Platform");
    expect(env.app.env).toBe("test");
    expect(env.app.port).toBe(5000);
    expect(env.app.version).toBe("v1");
    expect(env.jwt.expiresIn).toBe("1d");
  });

  test("rejects invalid JWT expiration format", () => {
    process.env.APP_NAME = "Hospital Management Platform";
    process.env.NODE_ENV = "test";
    process.env.PORT = "5000";
    process.env.API_VERSION = "v1";
    process.env.MONGODB_URI =
      "mongodb://localhost:27017/hospital-management-test";
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "invalid";

    expect(() => {
      require("../../../src/config/env");
    }).toThrow("Invalid JWT_EXPIRES_IN");
  });

  test("rejects invalid port values", () => {
    process.env.APP_NAME = "Hospital Management Platform";
    process.env.NODE_ENV = "test";
    process.env.PORT = "99999";
    process.env.API_VERSION = "v1";
    process.env.MONGODB_URI =
      "mongodb://localhost:27017/hospital-management-test";
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1d";

    expect(() => {
      require("../../../src/config/env");
    }).toThrow("Invalid PORT");
  });

  test("rejects missing required environment variables", () => {
    process.env.APP_NAME = "Hospital Management Platform";
    process.env.NODE_ENV = "test";
    process.env.PORT = "5000";
    process.env.API_VERSION = "v1";
    process.env.MONGODB_URI =
      "mongodb://localhost:27017/hospital-management-test";
    process.env.JWT_EXPIRES_IN = "1d";

    delete process.env.JWT_SECRET;

    expect(() => {
      require("../../../src/config/env");
    }).toThrow("Missing required environment variables");
  });
});