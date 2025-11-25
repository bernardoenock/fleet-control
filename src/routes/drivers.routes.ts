import { Router } from "express";
import { DriversController } from "../controllers/drivers.controller";

export const driversRouter = Router();

const controller = new DriversController();

/**
 * @openapi
 * tags:
 *  - name: Drivers
 *    description: Driver resource
 */

/**
 * @openapi
 * /drivers:
 *   post:
 *     tags: [Drivers]
 *     summary: Create a new driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverCreate'
 *     responses:
 *       201:
 *         description: Created driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 */
driversRouter.post("/", controller.create);

/**
 * @openapi
 * /drivers:
 *   get:
 *     tags: [Drivers]
 *     summary: List drivers (supports ?name= filter)
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 */
driversRouter.get("/", controller.list);

/**
 * @openapi
 * /drivers/{id}:
 *   get:
 *     tags: [Drivers]
 *     summary: Get driver by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       404:
 *         description: Not found
 */
driversRouter.get("/:id", controller.getById);

/**
 * @openapi
 * /drivers/{id}:
 *   put:
 *     tags: [Drivers]
 *     summary: Update a driver
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverUpdate'
 *     responses:
 *       200:
 *         description: Updated driver
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 */
driversRouter.put("/:id", controller.update);

/**
 * @openapi
 * /drivers/{id}:
 *   delete:
 *     tags: [Drivers]
 *     summary: Delete a driver
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No Content
 */
driversRouter.delete("/:id", controller.delete);
