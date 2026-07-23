const env = require("./config/env");
const logger = require("./config/logger");
const connectDatabase = require("./config/database");
const app = require("./app");
const mongoose = require("mongoose");

let server;

const startServer = async () => {
  try {
    await connectDatabase();

    server = app.listen(env.app.port, () => {
      logger.info("========================================");
      logger.info(`${env.app.name} started`);
      logger.info(`Environment : ${env.app.env}`);
      logger.info(`Port        : ${env.app.port}`);
      logger.info(`API Version : ${env.app.version}`);
      logger.info("========================================");
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler
 */
const shutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      logger.info("HTTP server closed.");

      try {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed.");
        logger.info("Application shut down successfully.");

        process.exit(0);
      } catch (error) {
        logger.error(
          `Error while closing MongoDB connection: ${error.message}`
        );

        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

/**
 * Handle termination signals
 */
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

/**
 * Handle unexpected errors
 */
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Promise Rejection: ${error.message}`);
  process.exit(1);
});

startServer();