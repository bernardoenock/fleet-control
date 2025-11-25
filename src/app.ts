import express from "express";
import { carsRouter } from "./routes/cars.routes";
import { driversRouter } from "./routes/drivers.routes";
import { usagesRouter } from "./routes/usages.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { swaggerSpec, swaggerUi } from "./config/swagger";

export const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/cars", carsRouter);
app.use("/drivers", driversRouter);
app.use("/usages", usagesRouter);

app.use(errorHandler);
