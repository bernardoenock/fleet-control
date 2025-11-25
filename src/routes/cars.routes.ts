import { Router } from "express";
import { CarsController } from "../controllers/cars.controller";
import { validateBody } from "../middlewares/validate";
import { carCreateSchema, carUpdateSchema } from "../validations/cars.validation";

export const carsRouter = Router();
const controller = new CarsController();

/**
 * @openapi
 * tags:
 *   - name: Cars
 *     description: Car resource
 */

/**
 * @openapi
 * /cars:
 *   post:
 *     tags: [Cars]
 *     summary: Create a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarCreate'
 *     responses:
 *       201:
 *         description: Created car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */
carsRouter.post("/", validateBody(carCreateSchema), controller.create);

/**
 * @openapi
 * /cars:
 *   get:
 *     tags: [Cars]
 *     summary: List cars (filter by color and/or brand)
 *     parameters:
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
carsRouter.get("/", controller.list);

/**
 * @openapi
 * /cars/{id}:
 *   get:
 *     tags: [Cars]
 *     summary: Get car by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Not found
 */
carsRouter.get("/:id", controller.getById);

/**
 * @openapi
 * /cars/{id}:
 *   put:
 *     tags: [Cars]
 *     summary: Update a car
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
 *             $ref: '#/components/schemas/CarUpdate'
 *     responses:
 *       200:
 *         description: Updated car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */
carsRouter.put("/:id", validateBody(carUpdateSchema), controller.update);

/**
 * @openapi
 * /cars/{id}:
 *   delete:
 *     tags: [Cars]
 *     summary: Delete a car
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
carsRouter.delete("/:id", controller.delete);
