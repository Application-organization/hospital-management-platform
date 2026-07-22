/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Hospital Analytics & Reporting APIs
 */

/**
 * @swagger
 * /analytics/monthly-admissions:
 *   get:
 *     summary: Get monthly admission statistics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly admission statistics retrieved successfully
 */

/**
 * @swagger
 * /analytics/monthly-revenue:
 *   get:
 *     summary: Get monthly revenue statistics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly revenue statistics retrieved successfully
 */

/**
 * @swagger
 * /analytics/bed-occupancy:
 *   get:
 *     summary: Get current bed occupancy statistics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bed occupancy statistics retrieved successfully
 */

/**
 * @swagger
 * /analytics/appointment-statistics:
 *   get:
 *     summary: Get appointment statistics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointment statistics retrieved successfully
 */

/**
 * @swagger
 * /analytics/laboratory-statistics:
 *   get:
 *     summary: Get laboratory statistics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Laboratory statistics retrieved successfully
 */

/**
 * @swagger
 * /analytics/doctor-statistics:
 *   get:
 *     summary: Get doctor statistics
 *     description: Returns statistics about registered doctors grouped by current status.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Doctor statistics retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalDoctors:
 *                       type: integer
 *                       example: 15
 *                     active:
 *                       type: integer
 *                       example: 12
 *                     inactive:
 *                       type: integer
 *                       example: 2
 *                     onLeave:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Internal server error
 */