import { Router } from "express";
import { CarsController } from "../controllers/cars.controller";

export const carsRouter = Router();

const controller = new CarsController();

carsRouter.post("/", controller.create);
carsRouter.get("/", controller.list); // supports ?color=&brand=
carsRouter.get("/:id", controller.getById);
carsRouter.put("/:id", controller.update);
carsRouter.delete("/:id", controller.delete);
