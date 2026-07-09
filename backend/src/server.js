const config = require("./config/env");
const logger = require("./config/logger");
const connectDatabase = require("./config/database");
const app = require("./app");

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(config.port, () => {
    logger.info("========================================");
    logger.info(`${config.appName} started`);
    logger.info(`Environment : ${config.nodeEnv}`);
    logger.info(`Port        : ${config.port}`);
    logger.info(`API Version : ${config.apiVersion}`);
    logger.info("========================================");
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Shutting down gracefully...");

    server.close(() => {
      logger.info("Server stopped.");
      process.exit(0);
    });
  });

  process.on("SIGINT", () => {
    logger.info("SIGINT received. Shutting down gracefully...");

    server.close(() => {
      logger.info("Server stopped.");
      process.exit(0);
    });
  });
};

startServer();