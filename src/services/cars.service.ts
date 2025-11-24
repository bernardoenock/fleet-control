import { prisma } from "../config/database";

export class CarsService {
  async create(data: { plate: string; color: string; brand: string }) {
    return prisma.car.create({ data });
  }

  async list(filters: { color?: string; brand?: string }) {
    const where: any = {};
    if (filters.color) where.color = filters.color;
    if (filters.brand) where.brand = filters.brand;
    return prisma.car.findMany({ where });
  }

  // getById, update, delete...
}
