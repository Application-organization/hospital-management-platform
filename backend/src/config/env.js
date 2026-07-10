require("dotenv").config();

module.exports = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    version: process.env.API_VERSION,
  },

  database: {
    uri: process.env.MONGODB_URI,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};