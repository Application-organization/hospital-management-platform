const mongoose = require("mongoose");
const env = require("./env");
const logger = require("./logger");

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.database.uri);

    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error(`❌ MongoDB connection failed: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDatabase;