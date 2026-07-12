const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createAppointmentValidation,
  updateAppointmentValidation,
} = require("../validators/appointmentValidation");

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment Management APIs
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
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
 *               - appointmentDate
 *               - appointmentTime
 *               - reason
 *             properties:
 *               patient:
 *                 type: string
 *                 example: 6a51c2171f304352301626ba
 *               doctor:
 *                 type: string
 *                 example: 6a51c2e41f304352301626bb
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-20"
 *               appointmentTime:
 *                 type: string
 *                 example: "09:30"
 *               reason:
 *                 type: string
 *                 example: Routine neurological consultation
 *               status:
 *                 type: string
 *                 example: Scheduled
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient or Doctor not found
 */
router.post(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
  createAppointmentValidation,
  validateRequest,
  appointmentController.createAppointment
);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
  appointmentController.getAllAppointments
);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully
 *       404:
 *         description: Appointment not found
 */
router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  appointmentController.getAppointmentById
);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *               appointmentTime:
 *                 type: string
 *               reason:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: Completed
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  updateAppointmentValidation,
  validateRequest,
  appointmentController.updateAppointment
);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  appointmentController.deleteAppointment
);

module.exports = router;