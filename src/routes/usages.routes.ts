import { Router } from "express";
import { UsagesController } from "../controllers/usages.controller";

export const usagesRouter = Router();

const controller = new UsagesController();

usagesRouter.post("/", controller.startUsage); // { carId, driverId, startAt?, reason }
usagesRouter.post("/:id/end", controller.endUsage); // { endAt }
usagesRouter.get("/", controller.list); // list usages with car + driver info
