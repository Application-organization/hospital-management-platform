const env = require("./config/env");
const logger = require("./config/logger");
const connectDatabase = require("./config/database");
const app = require("./app");

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.app.port, () => {
    logger.info("========================================");
    logger.info(`${env.app.name} started`);
    logger.info(`Environment : ${env.app.env}`);
    logger.info(`Port        : ${env.app.port}`);
    logger.info(`API Version : ${env.app.version}`);
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