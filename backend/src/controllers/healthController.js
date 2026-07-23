const mongoose = require("mongoose");
const env = require("../config/env");

/**
 * Liveness Check
 *
 * Determines whether the application process is alive.
 */
const getLiveness = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Service is alive",
    data: {
      status: "alive",
      uptime: process.uptime(),
      environment: env.app.env,
      version: env.app.version,
      timestamp: new Date().toISOString(),
    },
  });
};

/**
 * Readiness Check
 *
 * Determines whether the application is ready
 * to receive traffic and communicate with MongoDB.
 */
const getReadiness = (req, res) => {
  const databaseStatus =
    mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected";

  const isReady = databaseStatus === "connected";

  return res.status(isReady ? 200 : 503).json({
    success: isReady,
    message: isReady
      ? "Service is ready"
      : "Service is not ready",
    data: {
      status: isReady ? "ready" : "not-ready",
      database: databaseStatus,
      environment: env.app.env,
      version: env.app.version,
      timestamp: new Date().toISOString(),
    },
  });
};

/**
 * General Health Check
 */
const getHealth = (req, res) => {
  const databaseStatus =
    mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected";

  const isHealthy = databaseStatus === "connected";

  return res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy
      ? "Service is healthy"
      : "Service is unhealthy",
    data: {
      status: isHealthy ? "healthy" : "unhealthy",
      database: databaseStatus,
      uptime: process.uptime(),
      environment: env.app.env,
      version: env.app.version,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = {
  getHealth,
  getLiveness,
  getReadiness,
};