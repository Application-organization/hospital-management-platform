const express = require("express");

const router = express.Router();

const medicationController = require("../controllers/medicationController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createMedicationValidation,
  updateMedicationValidation,
} = require("../validators/medicationValidator");

/**
 * @swagger
 * tags:
 *   name: Medications
 *   description: Medication & Prescription Management APIs
 */

/**
 * @swagger
 * /medications:
 *   post:
 *     summary: Create a medication prescription
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient
 *               - doctor
 *               - medicalRecord
 *               - medicationName
 *               - dosage
 *               - frequency
 *               - duration
 *               - quantity
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               medicalRecord:
 *                 type: string
 *               medicationName:
 *                 type: string
 *               genericName:
 *                 type: string
 *               dosage:
 *                 type: string
 *               frequency:
 *                 type: string
 *               duration:
 *                 type: string
 *               route:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               refills:
 *                 type: integer
 *               instructions:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medication created successfully
 */
router.post(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  createMedicationValidation,
  validateRequest,
  medicationController.createMedication
);

/**
 * @swagger
 * /medications:
 *   get:
 *     summary: Get all medications
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: patient
 *         schema:
 *           type: string
 *       - in: query
 *         name: doctor
 *         schema:
 *           type: string
 *       - in: query
 *         name: medicalRecord
 *         schema:
 *           type: string
 *       - in: query
 *         name: route
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medications retrieved successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  medicationController.getAllMedications
);

/**
 * ===========================================
 * IMPORTANT:
 * Place STATIC routes BEFORE "/:id"
 * ===========================================
 */

/**
 * @swagger
 * /medications/statistics:
 *   get:
 *     summary: Get medication statistics
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medication statistics retrieved successfully
 */
router.get(
  "/statistics",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  medicationController.getMedicationStatistics
);

/**
 * @swagger
 * /medications/patients/{patientId}:
 *   get:
 *     summary: Get patient medication history
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient medication history retrieved successfully
 */
router.get(
  "/patients/:patientId",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  medicationController.getPatientMedicationHistory
);

/**
 * @swagger
 * /medications/doctors/{doctorId}:
 *   get:
 *     summary: Get medications prescribed by doctor
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor medications retrieved successfully
 */
router.get(
  "/doctors/:doctorId",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  medicationController.getDoctorMedications
);

/**
 * @swagger
 * /medications/{id}:
 *   get:
 *     summary: Get medication by ID
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medication retrieved successfully
 *       404:
 *         description: Medication not found
 */
router.get(
  "/:id",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  medicationController.getMedicationById
);

/**
 * @swagger
 * /medications/{id}:
 *   put:
 *     summary: Update medication
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Medication updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  updateMedicationValidation,
  validateRequest,
  medicationController.updateMedication
);

/**
 * @swagger
 * /medications/{id}/status:
 *   patch:
 *     summary: Update medication status
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - Completed
 *                   - Discontinued
 *     responses:
 *       200:
 *         description: Medication status updated successfully
 */
router.patch(
  "/:id/status",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  medicationController.updateMedicationStatus
);

/**
 * @swagger
 * /medications/{id}:
 *   delete:
 *     summary: Delete medication
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medication deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  medicationController.deleteMedication
);

module.exports = router;