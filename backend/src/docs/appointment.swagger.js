/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment Management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - patient
 *         - doctor
 *         - appointmentDate
 *         - appointmentTime
 *         - reason
 *       properties:
 *         _id:
 *           type: string
 *           example: 68725f4abf965e74136f9145
 *         patient:
 *           type: string
 *           example: 68725d44bf965e74136f9130
 *         doctor:
 *           type: string
 *           example: 68725d44bf965e74136f9131
 *         appointmentDate:
 *           type: string
 *           format: date
 *           example: 2026-08-22
 *         appointmentTime:
 *           type: string
 *           example: "09:30"
 *         duration:
 *           type: integer
 *           example: 30
 *         endTime:
 *           type: string
 *           example: "10:00"
 *         reason:
 *           type: string
 *           example: Neurology consultation
 *         status:
 *           type: string
 *           enum:
 *             - Scheduled
 *             - Confirmed
 *             - Completed
 *             - Cancelled
 *           example: Scheduled
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation failed or scheduling conflict
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 */

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags:
 *       - Appointments
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
 *         description: Appointment found
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment details
 *     description: Status cannot be updated here. Use PATCH /appointments/{id}/status instead.
 *     tags:
 *       - Appointments
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
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments/{id}/status:
 *   patch:
 *     summary: Update appointment status
 *     description: |
 *       Allowed transitions:
 *
 *       Scheduled → Confirmed
 *
 *       Confirmed → Completed
 *
 *       Scheduled → Cancelled
 *
 *       Confirmed → Cancelled
 *     tags:
 *       - Appointments
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
 *                   - Scheduled
 *                   - Confirmed
 *                   - Completed
 *                   - Cancelled
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *       400:
 *         description: Invalid status transition
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags:
 *       - Appointments
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
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */