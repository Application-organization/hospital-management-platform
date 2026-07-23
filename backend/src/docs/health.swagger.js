/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Application health and Kubernetes probe endpoints
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get application health status
 *     description: Checks whether the application and its database connection are healthy.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *       503:
 *         description: Service is unhealthy
 */

/**
 * @swagger
 * /health/live:
 *   get:
 *     summary: Check application liveness
 *     description: Kubernetes liveness probe that confirms the application process is running.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 */

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Check application readiness
 *     description: Kubernetes readiness probe that confirms the application is ready to receive traffic and the database is connected.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *       503:
 *         description: Service is not ready
 */