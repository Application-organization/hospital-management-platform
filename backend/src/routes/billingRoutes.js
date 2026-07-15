const express = require("express");

const router = express.Router();

const billingController = require("../controllers/billingController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createBillingValidation,
  updateBillingValidation,
} = require("../validators/billingValidator");

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: Billing & Payment Management APIs
 */

/**
 * @swagger
 * /billings:
 *   post:
 *     summary: Create a new billing invoice
 *     tags: [Billing]
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
 *             properties:
 *               patient:
 *                 type: string
 *               doctor:
 *                 type: string
 *               medicalRecord:
 *                 type: string
 *               consultationFee:
 *                 type: number
 *               laboratoryFee:
 *                 type: number
 *               medicationFee:
 *                 type: number
 *               otherCharges:
 *                 type: number
 *               discount:
 *                 type: number
 *               tax:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Billing created successfully
 */
router.post(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  createBillingValidation,
  validateRequest,
  billingController.createBilling
);

/**
 * @swagger
 * /billings:
 *   get:
 *     summary: Get all billing records
 *     tags: [Billing]
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
 *         name: paymentStatus
 *         schema:
 *           type: string
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Billing records retrieved successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  billingController.getAllBillings
);

/**
 * ===========================================
 * IMPORTANT
 * Static routes MUST come before "/:id"
 * ===========================================
 */

/**
 * @swagger
 * /billings/statistics:
 *   get:
 *     summary: Get billing statistics
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Billing statistics retrieved successfully
 */
router.get(
  "/statistics",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  billingController.getBillingStatistics
);

/**
 * @swagger
 * /billings/revenue:
 *   get:
 *     summary: Get revenue statistics
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue statistics retrieved successfully
 */
router.get(
  "/revenue",
  authMiddleware,
  authorize(
    "admin"
  ),
  billingController.getRevenueStatistics
);

/**
 * @swagger
 * /billings/patients/{patientId}:
 *   get:
 *     summary: Get patient billing history
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient billing history retrieved successfully
 */
router.get(
  "/patients/:patientId",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  billingController.getPatientBillingHistory
);

/**
 * @swagger
 * /billings/doctors/{doctorId}:
 *   get:
 *     summary: Get doctor billing history
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor billing history retrieved successfully
 */
router.get(
  "/doctors/:doctorId",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  billingController.getDoctorBillings
);

/**
 * @swagger
 * /billings/{id}:
 *   get:
 *     summary: Get billing by ID
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Billing ID
 *     responses:
 *       200:
 *         description: Billing retrieved successfully
 *       404:
 *         description: Billing record not found
 */
router.get(
  "/:id",
  authMiddleware,
  authorize(
    "admin",
    "doctor",
    "nurse"
  ),
  billingController.getBillingById
);

/**
 * @swagger
 * /billings/{id}:
 *   put:
 *     summary: Update billing record
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Billing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Billing updated successfully
 */
router.put(
  "/:id",
  authMiddleware,
  authorize(
    "admin",
    "doctor"
  ),
  updateBillingValidation,
  validateRequest,
  billingController.updateBilling
);

/**
 * @swagger
 * /billings/{id}/payment-status:
 *   patch:
 *     summary: Update payment status
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Billing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum:
 *                   - Pending
 *                   - Partially Paid
 *                   - Paid
 *                   - Refunded
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 */
router.patch(
  "/:id/payment-status",
  authMiddleware,
 authorize(
    "admin",
    "doctor"
  ),
  billingController.updatePaymentStatus
);

/**
 * @swagger
 * /billings/{id}:
 *   delete:
 *     summary: Delete billing record
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Billing ID
 *     responses:
 *       200:
 *         description: Billing deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize(
    "admin"
  ),
  billingController.deleteBilling
);

module.exports = router;