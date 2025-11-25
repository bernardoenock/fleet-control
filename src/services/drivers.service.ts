import { prisma } from "../config/database";

export class DriversService {
  async create(data: { name: string }) {
    return prisma.driver.create({ data });
  }

  async list(filters: { name?: string }) {
    const where: any = {};
    if (filters.name) {
      where.name = { contains: filters.name, mode: "insensitive" };
    }
    return prisma.driver.findMany({ where });
  }

  async getById(id: number) {
    const driver = await prisma.driver.findUnique({ where: { id } });
    if (!driver) {
      const err: any = new Error("Driver not found");
      err.statusCode = 404;
      throw err;
    }
    return driver;
  }

  async update(id: number, data: Partial<{ name: string }>) {
    const exists = await prisma.driver.findUnique({ where: { id } });
    if (!exists) {
      const err: any = new Error("Driver not found");
      err.statusCode = 404;
      throw err;
    }
    return prisma.driver.update({ where: { id }, data });
  }

  async delete(id: number) {
    const exists = await prisma.driver.findUnique({ where: { id } });
    if (!exists) {
      const err: any = new Error("Driver not found");
      err.statusCode = 404;
      throw err;
    }
    await prisma.driver.delete({ where: { id } });
    return { deleted: true };
  }
}
