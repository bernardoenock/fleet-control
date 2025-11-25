import { Request, Response } from "express";
import { DriversService } from "../services/drivers.service";

export class DriversController {
  private service = new DriversService();

  create = async (req: Request, res: Response) => {
    const driver = await this.service.create(req.body);
    res.status(201).json(driver);
  };

  list = async (req: Request, res: Response) => {
    const { name } = req.query;
    const drivers = await this.service.list({ name: name as string });
    res.json(drivers);
  };

  getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const driver = await this.service.getById(id);
    res.json(driver);
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
