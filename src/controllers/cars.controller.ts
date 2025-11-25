import { Request, Response } from "express";
import { CarsService } from "../services/cars.service";

export class CarsController {
  private service = new CarsService();

  create = async (req: Request, res: Response) => {
    const car = await this.service.create(req.body);
    res.status(201).json(car);
  };

  list = async (req: Request, res: Response) => {
    const { color, brand } = req.query;
    const cars = await this.service.list({ color: color as string, brand: brand as string });
    res.json(cars);
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const car = await this.service.getById(id);
    res.json(car);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updated = await this.service.update(id, req.body);
    res.json(updated);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(204).send();
  };
}
