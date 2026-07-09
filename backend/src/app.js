const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

// =========================
// Middleware
// =========================
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined"));

// =========================
// Health Check
// =========================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Hospital Management API is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;