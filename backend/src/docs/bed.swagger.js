/**
 * @swagger
 * tags:
 *   name: Beds
 *   description: Hospital Bed Management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Bed:
 *       type: object
 *       required:
 *         - ward
 *         - bedNumber
 *       properties:
 *         _id:
 *           type: string
 *           example: 6878d93d3dcb2b92c18b2001
 *         ward:
 *           type: string
 *           example: 6878d93d3dcb2b92c18b1001
 *         bedNumber:
 *           type: string
 *           example: ICU-001
 *         bedType:
 *           type: string
 *           enum:
 *             - General
 *             - Private
 *             - ICU
 *             - Emergency
 *             - Pediatric
 *             - Maternity
 *         status:
 *           type: string
 *           enum:
 *             - Available
 *             - Occupied
 *             - Reserved
 *             - Maintenance
 *           example: Available
 *         dailyRate:
 *           type: number
 *           format: float
 *           example: 250.00
 *         notes:
 *           type: string
 *           example: Bed near the nurses' station
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /beds:
 *   post:
 *     summary: Create a new bed
 *     tags:
 *       - Beds
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bed'
 *     responses:
 *       201:
 *         description: Bed created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Bed already exists
 */

/**
 * @swagger
 * /beds:
 *   get:
 *     summary: Get all beds
 *     tags:
 *       - Beds
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of hospital beds
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /beds/available:
 *   get:
 *     summary: Get all available beds
 *     tags:
 *       - Beds
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available beds
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /beds/ward/{wardId}:
 *   get:
 *     summary: Get all beds in a ward
 *     tags:
 *       - Beds
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: wardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ward beds retrieved successfully
 *       404:
 *         description: Ward not found
 */

/**
 * @swagger
 * /beds/{id}:
 *   get:
 *     summary: Get bed by ID
 *     tags:
 *       - Beds
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
 *         description: Bed retrieved successfully
 *       404:
 *         description: Bed not found
 */

/**
 * @swagger
 * /beds/{id}:
 *   put:
 *     summary: Update bed
 *     tags:
 *       - Beds
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
 *             $ref: '#/components/schemas/Bed'
 *     responses:
 *       200:
 *         description: Bed updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Bed not found
 */

/**
 * @swagger
 * /beds/{id}:
 *   delete:
 *     summary: Delete bed
 *     tags:
 *       - Beds
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
 *         description: Bed deleted successfully
 *       404:
 *         description: Bed not found
 */