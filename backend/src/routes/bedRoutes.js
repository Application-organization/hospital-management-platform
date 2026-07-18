const express = require("express");

const router = express.Router();

const bedController = require("../controllers/bedController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

/**
 * ==========================================
 * CREATE BED
 * ==========================================
 */
router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    bedController.createBed
);

/**
 * ==========================================
 * GET ALL BEDS
 * ==========================================
 */
router.get(
    "/",
    authMiddleware,
    authorize("admin", "doctor", "nurse"),
    bedController.getAllBeds
);

/**
 * ==========================================
 * GET AVAILABLE BEDS
 * ==========================================
 */
router.get(
    "/available",
    authMiddleware,
    authorize("admin", "doctor", "nurse"),
    bedController.getAvailableBeds
);

/**
 * ==========================================
 * GET BEDS BY WARD
 * ==========================================
 */
router.get(
    "/ward/:wardId",
    authMiddleware,
    authorize("admin", "doctor", "nurse"),
    bedController.getBedsByWard
);

/**
 * ==========================================
 * GET BED BY ID
 * ==========================================
 */
router.get(
    "/:id",
    authMiddleware,
    authorize("admin", "doctor", "nurse"),
    bedController.getBedById
);

/**
 * ==========================================
 * UPDATE BED
 * ==========================================
 */
router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    bedController.updateBed
);

/**
 * ==========================================
 * DELETE BED
 * ==========================================
 */
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    bedController.deleteBed
);

module.exports = router;