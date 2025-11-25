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

  async getById(id: number) {
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      const err: any = new Error("Car not found");
      err.statusCode = 404;
      throw err;
    }
    return car;
  }

  async update(id: number, data: Partial<{ plate: string; color: string; brand: string }>) {
    const exists = await prisma.car.findUnique({ where: { id } });
    if (!exists) {
      const err: any = new Error("Car not found");
      err.statusCode = 404;
      throw err;
    }

    return prisma.car.update({ where: { id }, data });
  }

  async delete(id: number) {
    const exists = await prisma.car.findUnique({ where: { id } });
    if (!exists) {
      const err: any = new Error("Car not found");
      err.statusCode = 404;
      throw err;
    }
    await prisma.car.delete({ where: { id } });
    return { deleted: true };
  }
}
