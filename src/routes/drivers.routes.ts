import { Router } from "express";
import { DriversController } from "../controllers/drivers.controller";

export const driversRouter = Router();

const controller = new DriversController();

driversRouter.post("/", controller.create);
driversRouter.get("/", controller.list); // supports ?name=
driversRouter.get("/:id", controller.getById);
driversRouter.put("/:id", controller.update);
driversRouter.delete("/:id", controller.delete);
