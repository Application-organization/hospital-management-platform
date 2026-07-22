const express = require("express");

const doctorController = require("../controllers/doctorController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createDoctorValidation,
  updateDoctorValidation,
} = require("../validators/doctorValidation");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor Management APIs
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     description: Create a new doctor in the hospital system.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - department
 *               - specialization
 *               - experience
 *               - licenseNumber
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. James Wilson
 *               email:
 *                 type: string
 *                 format: email
 *                 example: james.wilson@example.com
 *               phone:
 *                 type: string
 *                 example: 08012345678
 *               department:
 *                 type: string
 *                 example: Cardiology
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               experience:
 *                 type: integer
 *                 example: 8
 *               licenseNumber:
 *                 type: string
 *                 example: MED-2026-100
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - On Leave
 *                   - Inactive
 *                 example: Active
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authenticate,
  authorize("admin"),
  createDoctorValidation,
  validateRequest,
  doctorController.createDoctor
);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve doctors with pagination, searching, filtering and sorting.
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
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
 *         description: Number of doctors per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by doctor name or email
 *
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - Active
 *             - Inactive
 *             - On Leave
 *         description: Filter by doctor status
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
 *         description: Doctors retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authenticate,
  doctorController.getAllDoctors
);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor MongoDB ID
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Doctor not found
 */
router.get(
  "/:id",
  authenticate,
  doctorController.getDoctorById
);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. James Wilson
 *               email:
 *                 type: string
 *                 format: email
 *                 example: james.wilson@example.com
 *               phone:
 *                 type: string
 *                 example: 08012345678
 *               department:
 *                 type: string
 *                 example: Cardiology
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               experience:
 *                 type: integer
 *                 example: 10
 *               licenseNumber:
 *                 type: string
 *                 example: MED-2026-100
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - On Leave
 *                   - Inactive
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateDoctorValidation,
  validateRequest,
  doctorController.updateDoctor
);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor MongoDB ID
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  doctorController.deleteDoctor
);

module.exports = router;