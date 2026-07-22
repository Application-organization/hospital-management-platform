const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const patientController = require("../controllers/patientController");

const {
  createPatientValidation,
  updatePatientValidation,
} = require("../validators/patientValidation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient Management APIs
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - gender
 *               - dateOfBirth
 *               - bloodGroup
 *               - address
 *               - emergencyContactName
 *               - emergencyContactPhone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Emily
 *               lastName:
 *                 type: string
 *                 example: Williams
 *               email:
 *                 type: string
 *                 example: emily@example.com
 *               phone:
 *                 type: string
 *                 example: "+60171234567"
 *               gender:
 *                 type: string
 *                 example: female
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1994-08-15"
 *               bloodGroup:
 *                 type: string
 *                 example: O+
 *               address:
 *                 type: string
 *                 example: 25 Jalan Bukit Bintang, Kuala Lumpur
 *               emergencyContactName:
 *                 type: string
 *                 example: David Williams
 *               emergencyContactPhone:
 *                 type: string
 *                 example: "+60179876543"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Patient already exists
 */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  createPatientValidation,
  validateRequest,
  patientController.createPatient
);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve patients with pagination, searching, filtering and sorting.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of patients per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by first name, last name or email
 *
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum:
 *             - male
 *             - female
 *         description: Filter patients by gender
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field used for sorting
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: Patients retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authenticate,
  authorize("admin", "doctor"),
  patientController.getAllPatients
);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *       404:
 *         description: Patient not found
 */
router.get(
  "/:id",
  authenticate,
  authorize("admin", "doctor"),
  patientController.getPatientById
);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               bloodGroup:
 *                 type: string
 *               address:
 *                 type: string
 *               emergencyContactName:
 *                 type: string
 *               emergencyContactPhone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updatePatientValidation,
  validateRequest,
  patientController.updatePatient
);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Soft delete patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  patientController.deletePatient
);

module.exports = router;