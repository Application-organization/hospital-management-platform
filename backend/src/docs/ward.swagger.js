/**
 * @swagger
 * tags:
 *   name: Wards
 *   description: Hospital Ward Management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ward:
 *       type: object
 *       required:
 *         - name
 *         - department
 *         - capacity
 *       properties:
 *         _id:
 *           type: string
 *           example: 6878d93d3dcb2b92c18b1001
 *         name:
 *           type: string
 *           example: ICU
 *         description:
 *           type: string
 *           example: Intensive Care Unit
 *         department:
 *           type: string
 *           example: Critical Care
 *         capacity:
 *           type: integer
 *           example: 20
 *         occupiedBeds:
 *           type: integer
 *           example: 5
 *         availableBeds:
 *           type: integer
 *           example: 15
 *         status:
 *           type: string
 *           enum:
 *             - Active
 *             - Inactive
 *           example: Active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /wards:
 *   post:
 *     summary: Create a new ward
 *     tags:
 *       - Wards
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ward'
 *     responses:
 *       201:
 *         description: Ward created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Ward already exists
 */

/**
 * @swagger
 * /wards:
 *   get:
 *     summary: Get all wards
 *     tags:
 *       - Wards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of hospital wards
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wards/{id}:
 *   get:
 *     summary: Get ward by ID
 *     tags:
 *       - Wards
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
 *         description: Ward retrieved successfully
 *       404:
 *         description: Ward not found
 */

/**
 * @swagger
 * /wards/{id}:
 *   patch:
 *     summary: Update ward
 *     tags:
 *       - Wards
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
 *             $ref: '#/components/schemas/Ward'
 *     responses:
 *       200:
 *         description: Ward updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Ward not found
 */

/**
 * @swagger
 * /wards/{id}:
 *   delete:
 *     summary: Delete ward
 *     tags:
 *       - Wards
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
 *         description: Ward deleted successfully
 *       404:
 *         description: Ward not found
 */