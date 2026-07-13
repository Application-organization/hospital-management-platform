const express = require("express");

const router = express.Router();

const medicalRecordController = require("../controllers/medicalRecordController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const validateRequest = require("../middleware/validateRequest");

const {
  createMedicalRecordValidation,
  updateMedicalRecordValidation,
  updateMedicalRecordStatusValidation,
} = require("../validators/medicalRecordValidator");

/**
 * @swagger
 * tags:
 *   name: Medical Records
 *   description: Medical Records Management APIs
 */


/**
 * @swagger
 * /medical-records:
 *   post:
 *     summary: Create a new medical record
 *     tags: [Medical Records]
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
 *               - diagnosis
 *               - symptoms
 *               - treatment
 *             properties:
 *               patient:
 *                 type: string
 *                 example: 6a532dd0202d1ddfe4e8fe5c
 *               doctor:
 *                 type: string
 *                 example: 6a53839bba2319e1f23a9bcc
 *               visitDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-13
 *               diagnosis:
 *                 type: string
 *                 example: Primary Hypertension
 *               symptoms:
 *                 type: string
 *                 example: Persistent headache and dizziness
 *               treatment:
 *                 type: string
 *                 example: Lifestyle modification and medication
 *               prescription:
 *                 type: string
 *                 example: Amlodipine 5mg once daily
 *               allergies:
 *                 type: string
 *                 example: Penicillin
 *               vitalSigns:
 *                 type: object
 *                 properties:
 *                   bloodPressure:
 *                     type: string
 *                     example: 145/92
 *                   heartRate:
 *                     type: number
 *                     example: 82
 *                   temperature:
 *                     type: number
 *                     example: 36.8
 *                   weight:
 *                     type: number
 *                     example: 78
 *                   height:
 *                     type: number
 *                     example: 176
 *               labResults:
 *                 type: string
 *                 example: Blood glucose normal
 *               clinicalNotes:
 *                 type: string
 *                 example: Patient advised to reduce sodium intake
 *               followUpDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-20
 *               status:
 *                 type: string
 *                 enum:
 *                   - Open
 *                   - Closed
 *                   - Follow-up Required
 *     responses:
 *       201:
 *         description: Medical record created successfully
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
  createMedicalRecordValidation,
  validateRequest,
  medicalRecordController.createMedicalRecord
);


/**
 * @swagger
 * /medical-records:
 *   get:
 *     summary: Get all medical records
 *     tags: [Medical Records]
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
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: diagnosis
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Medical records retrieved successfully
 */
router.get(
  "/",
  authMiddleware,
  authorize("admin", "doctor"),
  medicalRecordController.getAllMedicalRecords
);

/**
 * @swagger
 * /medical-records/statistics:
 *   get:
 *     summary: Get medical records statistics
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medical record statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/statistics",
  authMiddleware,
  authorize("admin"),
  medicalRecordController.getMedicalRecordStatistics
);


/**
 * @swagger
 * /medical-records/{id}:
 *   get:
 *     summary: Get medical record by ID
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical Record ID
 *     responses:
 *       200:
 *         description: Medical record retrieved successfully
 *       404:
 *         description: Medical record not found
 */
router.get(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  medicalRecordController.getMedicalRecordById
);


/**
 * @swagger
 * /medical-records/patient/{patientId}:
 *   get:
 *     summary: Get patient's medical history
 *     tags: [Medical Records]
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
 *         description: Patient medical history retrieved successfully
 *       404:
 *         description: Patient not found
 */
router.get(
  "/patient/:patientId",
  authMiddleware,
  authorize("admin", "doctor"),
  medicalRecordController.getPatientMedicalHistory
);


/**
 * @swagger
 * /medical-records/doctor/{doctorId}:
 *   get:
 *     summary: Get doctor's medical records
 *     tags: [Medical Records]
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
 *         description: Doctor medical records retrieved successfully
 *       404:
 *         description: Doctor not found
 */
router.get(
  "/doctor/:doctorId",
  authMiddleware,
  authorize("admin", "doctor"),
  medicalRecordController.getDoctorMedicalRecords
);

/**
 * @swagger
 * /medical-records/{id}:
 *   put:
 *     summary: Update a medical record
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               symptoms:
 *                 type: string
 *               treatment:
 *                 type: string
 *               prescription:
 *                 type: string
 *               allergies:
 *                 type: string
 *               vitalSigns:
 *                 type: object
 *               labResults:
 *                 type: string
 *               clinicalNotes:
 *                 type: string
 *               followUpDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum:
 *                   - Open
 *                   - Closed
 *                   - Follow-up Required
 *     responses:
 *       200:
 *         description: Medical record updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Medical record not found
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("admin", "doctor"),
  updateMedicalRecordValidation,
  validateRequest,
  medicalRecordController.updateMedicalRecord
);


/**
 * @swagger
 * /medical-records/{id}/status:
 *   patch:
 *     summary: Update medical record status
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical Record ID
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
 *                   - Open
 *                   - Closed
 *                   - Follow-up Required
 *     responses:
 *       200:
 *         description: Medical record status updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Medical record not found
 */
router.patch(
  "/:id/status",
  authMiddleware,
  authorize("admin", "doctor"),
  updateMedicalRecordStatusValidation,
  validateRequest,
  medicalRecordController.updateMedicalRecordStatus
);


/**
 * @swagger
 * /medical-records/{id}:
 *   delete:
 *     summary: Delete a medical record
 *     tags: [Medical Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical Record ID
 *     responses:
 *       200:
 *         description: Medical record deleted successfully
 *       404:
 *         description: Medical record not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  medicalRecordController.deleteMedicalRecord
);

module.exports = router;