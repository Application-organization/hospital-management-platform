const express = require("express");

const healthController = require("../controllers/healthController");

const router = express.Router();

/**
 * General application health check
 */
router.get("/", healthController.getHealth);

/**
 * Kubernetes liveness probe
 */
router.get("/live", healthController.getLiveness);

/**
 * Kubernetes readiness probe
 */
router.get("/ready", healthController.getReadiness);

module.exports = router;