const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});

module.exports = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  apiVersion: process.env.API_VERSION,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};