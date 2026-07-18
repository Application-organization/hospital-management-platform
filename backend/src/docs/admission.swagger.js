/**
 * @swagger
 * tags:
 *   name: Admissions
 *   description: Patient Admission Management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admission:
 *       type: object
 *       required:
 *         - patient
 *         - bed
 *         - admissionDate
 *         - reason
 *       properties:
 *         _id:
 *           type: string
 *           example: 6878d93d3dcb2b92c18b5001
 *         patient:
 *           type: string
 *           example: 6878d93d3dcb2b92c18b1001
 *         bed:
 *           type: string
 *           example: 6878d93d3dcb2b92c18b3001
 *         admissionDate:
 *           type: string
 *           format: date
 *           example: 2026-07-18
 *         dischargeDate:
 *           type: string
 *           format: date
 *           nullable: true
 *         reason:
 *           type: string
 *           example: Severe malaria requiring observation
 *         status:
 *           type: string
 *           enum:
 *             - Admitted
 *             - Discharged
 *           example: Admitted
 *         notes:
 *           type: string
 *           example: Patient requires monitoring every 4 hours.
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /admissions:
 *   post:
 *     summary: Admit a patient
 *     tags:
 *       - Admissions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admission'
 *     responses:
 *       201:
 *         description: Patient admitted successfully
 *       400:
 *         description: Invalid request or bed unavailable
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient or bed not found
 *       409:
 *         description: Patient already admitted
 */

/**
 * @swagger
 * /admissions:
 *   get:
 *     summary: Get all admissions
 *     tags:
 *       - Admissions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admissions retrieved successfully
 */

/**
 * @swagger
 * /admissions/{id}:
 *   get:
 *     summary: Get admission by ID
 *     tags:
 *       - Admissions
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
 *         description: Admission retrieved successfully
 *       404:
 *         description: Admission not found
 */

/**
 * @swagger
 * /admissions/{id}:
 *   put:
 *     summary: Update an admission
 *     tags:
 *       - Admissions
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
 *             $ref: '#/components/schemas/Admission'
 *     responses:
 *       200:
 *         description: Admission updated successfully
 *       404:
 *         description: Admission not found
 */

/**
 * @swagger
 * /admissions/{id}/discharge:
 *   patch:
 *     summary: Discharge a patient
 *     tags:
 *       - Admissions
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
 *         description: Patient discharged successfully
 *       400:
 *         description: Patient already discharged
 *       404:
 *         description: Admission not found
 */

/**
 * @swagger
 * /admissions/{id}:
 *   delete:
 *     summary: Delete an admission
 *     tags:
 *       - Admissions
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
 *         description: Admission deleted successfully
 *       404:
 *         description: Admission not found
 */