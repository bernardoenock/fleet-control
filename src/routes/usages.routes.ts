import { Router } from "express";
import { UsagesController } from "../controllers/usages.controller";

export const usagesRouter = Router();

const controller = new UsagesController();

/**
 * @openapi
 * tags:
 *  - name: Usages
 *    description: Create and manage car usages
 */

/**
 * @openapi
 * /usages:
 *   post:
 *     tags: [Usages]
 *     summary: Start a car usage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsageStart'
 *     responses:
 *       201:
 *         description: Started usage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usage'
 */
usagesRouter.post("/", controller.startUsage);

/**
 * @openapi
 * /usages/{id}/end:
 *   post:
 *     tags: [Usages]
 *     summary: End a usage
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsageEnd'
 *     responses:
 *       200:
 *         description: Update result (count of updated rows)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 */
usagesRouter.post("/:id/end", controller.endUsage);

/**
 * @openapi
 * /usages:
 *   get:
 *     tags: [Usages]
 *     summary: List usages with car and driver info
 *     responses:
 *       200:
 *         description: Array of usages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usage'
 */
usagesRouter.get("/", controller.list);
