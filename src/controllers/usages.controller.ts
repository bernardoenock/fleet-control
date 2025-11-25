import { Request, Response } from "express";
import { UsagesService } from "../services/usages.service";
import { z } from "zod";

const endUsageSchema = z.object({
  endAt: z.string().datetime()
});

export class UsagesController {
  private service = new UsagesService();

  startUsage = async (req: Request, res: Response) => {
    const usage = await this.service.startUsage(req.body);
    res.status(201).json(usage);
  };

  endUsage = async (req: Request, res: Response) => {
    const usageId = Number(req.params.id);
    const parsed = endUsageSchema.parse(req.body);
    const result = await this.service.endUsage(usageId, parsed.endAt);
    if (Array.isArray(result)) {
      res.json(result);
    } else {
      res.json(result);
    }
  };

  list = async (req: Request, res: Response) => {
    const usages = await this.service.listWithRelations();
    res.json(usages);
  };
}
