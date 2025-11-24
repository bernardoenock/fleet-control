import express from "express";
import cors from "cors";
import { carsRouter } from "./routes/cars.routes";
import { driversRouter } from "./routes/drivers.routes";
import { usagesRouter } from "./routes/usages.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();
app.use(cors());
app.use(express.json());

app.use("/cars", carsRouter);
app.use("/drivers", driversRouter);
app.use("/usages", usagesRouter);

app.use(errorHandler);
