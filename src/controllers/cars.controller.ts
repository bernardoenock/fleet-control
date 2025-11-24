import { Request, Response } from "express";
import { CarsService } from "../services/cars.service";

export class CarsController {
  private service = new CarsService();

  async create(req: Request, res: Response) {
    const car = await this.service.create(req.body);
    res.status(201).json(car);
  }

  async list(req: Request, res: Response) {
    const { color, brand } = req.query;
    const cars = await this.service.list({ color: color as string, brand: brand as string });
    res.json(cars);
  }

  // getById, update, delete similar
}
