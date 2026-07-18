const express = require("express");

const router = express.Router();

const admissionController = require("../controllers/admissionController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

/**
 * ==========================================
 * CREATE ADMISSION
 * ==========================================
 */
router.post(
    "/",
    authMiddleware,
    authorize(
        "admin",
        "doctor",
        "nurse"
    ),
    admissionController.createAdmission
);

/**
 * ==========================================
 * GET ALL ADMISSIONS
 * ==========================================
 */
router.get(
    "/",
    authMiddleware,
    authorize(
        "admin",
        "doctor",
        "nurse"
    ),
    admissionController.getAllAdmissions
);

/**
 * ==========================================
 * GET ADMISSION BY ID
 * ==========================================
 */
router.get(
    "/:id",
    authMiddleware,
    authorize(
        "admin",
        "doctor",
        "nurse"
    ),
    admissionController.getAdmissionById
);

/**
 * ==========================================
 * UPDATE ADMISSION
 * ==========================================
 */
router.put(
    "/:id",
    authMiddleware,
    authorize(
        "admin",
        "doctor"
    ),
    admissionController.updateAdmission
);

/**
 * ==========================================
 * DISCHARGE PATIENT
 * ==========================================
 */
router.patch(
    "/:id/discharge",
    authMiddleware,
    authorize(
        "admin",
        "doctor"
    ),
    admissionController.dischargePatient
);

/**
 * ==========================================
 * DELETE ADMISSION
 * ==========================================
 */
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    admissionController.deleteAdmission
);

module.exports = router;