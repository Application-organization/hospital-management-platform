require("dotenv").config();

const requiredEnvVariables = [
  "APP_NAME",
  "NODE_ENV",
  "PORT",
  "API_VERSION",
  "MONGODB_URI",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

const missingEnvVariables = requiredEnvVariables.filter(
  (variable) => !process.env[variable]
);

if (missingEnvVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVariables.join(", ")}`
  );
}

/**
 * Validate PORT
 */
const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port <= 0 || port > 65535) {
  throw new Error(
    "Invalid PORT. PORT must be an integer between 1 and 65535."
  );
}

/**
 * Validate JWT expiration format
 *
 * Supported examples:
 * 1d
 * 7d
 * 12h
 * 30m
 * 60s
 * 3600
 */
const jwtExpiresIn = process.env.JWT_EXPIRES_IN.trim();

const validJwtExpiration =
  /^\d+(s|m|h|d|w|y)?$/i.test(jwtExpiresIn);

if (!validJwtExpiration) {
  throw new Error(
    "Invalid JWT_EXPIRES_IN. Use a valid format such as 1d, 12h, 30m, 60s, or 3600."
  );
}

module.exports = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    port,
    version: process.env.API_VERSION,
  },

  database: {
    uri: process.env.MONGODB_URI,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: jwtExpiresIn,
  },
};