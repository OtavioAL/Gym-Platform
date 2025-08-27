/**
 * @swagger
 * tags:
 *   name: Evaluations
 *   description: IMC Evaluations management
 */

/**
 * @swagger
 * /evaluations:
 *   get:
 *     summary: List all evaluations
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of evaluations
 */

/**
 * @swagger
 * /evaluations:
 *   post:
 *     summary: Create a new evaluation
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - height
 *               - weight
 *             properties:
 *               userId:
 *                 type: string
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: Evaluation created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /evaluations/{id}:
 *   put:
 *     summary: Update an evaluation
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Evaluation updated
 *       404:
 *         description: Evaluation not found
 */

/**
 * @swagger
 * /evaluations/{id}:
 *   delete:
 *     summary: Delete an evaluation
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Evaluation deleted
 *       404:
 *         description: Evaluation not found
 */

/**
 * @swagger
 * /evaluations/me:
 *   get:
 *     summary: Get evaluations of the logged-in student
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student evaluations retrieved
 */
