/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Hospital dashboard and summary statistics
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retrieve dashboard statistics
 *     description: Returns an overview of hospital operational statistics including patients, doctors, appointments, admissions, beds, laboratory tests, and revenue.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
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
 *                   example: Dashboard statistics retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     patients:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 120
 *                         active:
 *                           type: integer
 *                           example: 115
 *                     doctors:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 25
 *                         active:
 *                           type: integer
 *                           example: 22
 *                     appointments:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 450
 *                     admissions:
 *                       type: object
 *                       properties:
 *                         active:
 *                           type: integer
 *                           example: 18
 *                     beds:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 100
 *                         available:
 *                           type: integer
 *                           example: 60
 *                         occupied:
 *                           type: integer
 *                           example: 40
 *                         occupancyRate:
 *                           type: number
 *                           example: 40
 *                     laboratory:
 *                       type: object
 *                       properties:
 *                         totalTests:
 *                           type: integer
 *                           example: 320
 *                     revenue:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 150000
 *       500:
 *         description: Internal server error
 */