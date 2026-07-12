const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createDoctorValidation,
  updateDoctorValidation,
} = require("../validators/doctorValidation");

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
 *                 example: Dr. Jennifer Smith
 *               email:
 *                 type: string
 *                 example: jennifer.smith@hospital.com
 *               phone:
 *                 type: string
 *                 example: "+60195556677"
 *               department:
 *                 type: string
 *                 example: Orthopedics
 *               specialization:
 *                 type: string
 *                 example: Orthopedic Surgeon
 *               experience:
 *                 type: integer
 *                 example: 11
 *               licenseNumber:
 *                 type: string
 *                 example: MED-2026-002
 *               status:
 *                 type: string
 *                 example: Active
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Doctor already exists
 */
router.post(
  "/",
  authMiddleware,
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
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
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
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *       404:
 *         description: Doctor not found
 */
router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
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
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: integer
 *               licenseNumber:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 */
router.put(
  "/:id",
  authMiddleware,
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
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  doctorController.deleteDoctor
);

module.exports = router;