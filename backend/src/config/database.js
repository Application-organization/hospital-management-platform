const mongoose = require("mongoose");
const config = require("./env");
const logger = require("./logger");

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error(`❌ MongoDB connection failed: ${error.message}`);

    process.exit(1);
  }
};

module.exports = connectDatabase;