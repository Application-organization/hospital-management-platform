const express = require("express");

const router = express.Router();

const laboratoryTestController = require("../controllers/laboratoryTestController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createLaboratoryTestValidation,
  updateLaboratoryTestValidation,
} = require("../validators/laboratoryTestValidator");

/**
 * @swagger
 * tags:
 *   name: Laboratory Tests
 *   description: Laboratory Test Management APIs
 */

/**
 * @swagger
 * /laboratory-tests:
 *   post:
 *     summary: Create a laboratory test
 *     tags: [Laboratory Tests]
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
 *               - testName
 *               - category
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               medicalRecord:
 *                 type: string
 *               testName:
 *                 type: string
 *               category:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               result:
 *                 type: string
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Laboratory test created successfully
 */
router.post(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  createLaboratoryTestValidation,
  validateRequest,
  laboratoryTestController.createLaboratoryTest
);

/**
 * @swagger
 * /laboratory-tests:
 *   get:
 *     summary: Get all laboratory tests
 *     tags: [Laboratory Tests]
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
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: testName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laboratory tests retrieved successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  laboratoryTestController.getAllLaboratoryTests
);

/**
 * @swagger
 * /laboratory-tests/statistics:
 *   get:
 *     summary: Get laboratory statistics
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Laboratory statistics retrieved successfully
 */
router.get(
  "/statistics",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  laboratoryTestController.getLaboratoryStatistics
);

/**
 * @swagger
 * /laboratory-tests:
 *   get:
 *     summary: Get all laboratory tests
 *     tags: [Laboratory Tests]
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
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: testName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laboratory tests retrieved successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  laboratoryTestController.getAllLaboratoryTests
);

/**
 * =====================================================
 * IMPORTANT
 * Static routes MUST come BEFORE "/:id"
 * =====================================================
 */

/**
 * @swagger
 * /laboratory-tests/statistics:
 *   get:
 *     summary: Get laboratory statistics
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Laboratory statistics retrieved successfully
 */
router.get(
  "/statistics",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  laboratoryTestController.getLaboratoryStatistics
);

/**
 * @swagger
 * /laboratory-tests/patients/{patientId}:
 *   get:
 *     summary: Get patient laboratory history
 *     tags: [Laboratory Tests]
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
 *         description: Patient laboratory history retrieved successfully
 */
router.get(
  "/patients/:patientId",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  laboratoryTestController.getPatientLaboratoryHistory
);

/**
 * @swagger
 * /laboratory-tests/doctors/{doctorId}:
 *   get:
 *     summary: Get doctor laboratory tests
 *     tags: [Laboratory Tests]
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
 *         description: Doctor laboratory tests retrieved successfully
 */
router.get(
  "/doctors/:doctorId",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  laboratoryTestController.getDoctorLaboratoryTests
);

/**
 * @swagger
 * /laboratory-tests/{id}/status:
 *   patch:
 *     summary: Update laboratory test status
 *     tags: [Laboratory Tests]
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
 *                   - Requested
 *                   - Sample Collected
 *                   - Processing
 *                   - Completed
 *                   - Cancelled
 */
router.patch(
  "/:id/status",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  laboratoryTestController.updateLaboratoryStatus
);

/**
 * @swagger
 * /laboratory-tests/patients/{patientId}:
 *   get:
 *     summary: Get all laboratory tests for a patient
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/patients/:patientId",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  laboratoryTestController.getPatientLaboratoryHistory
);

/**
 * @swagger
 * /laboratory-tests/doctors/{doctorId}:
 *   get:
 *     summary: Get all laboratory tests requested by a doctor
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/doctors/:doctorId",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  laboratoryTestController.getDoctorLaboratoryTests
);

/**
 * @swagger
 * /laboratory-tests/statistics:
 *   get:
 *     summary: Get laboratory statistics
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/statistics",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  laboratoryTestController.getLaboratoryStatistics
);

/**
 * @swagger
 * /laboratory-tests/{id}:
 *   get:
 *     summary: Get laboratory test by ID
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  laboratoryTestController.getLaboratoryTestById
);

/**
 * @swagger
 * /laboratory-tests/{id}:
 *   delete:
 *     summary: Delete laboratory test
 *     tags: [Laboratory Tests]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  laboratoryTestController.deleteLaboratoryTest
);

module.exports = router;