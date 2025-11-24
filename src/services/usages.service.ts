import { prisma } from "../config/database";

export class UsagesService {
  async startUsage({ carId, driverId, startAt, reason }) {
    return prisma.$transaction(async (tx) => {
      // check car active usage
      const carActive = await tx.usage.findFirst({
        where: { carId, endAt: null }
      });
      if (carActive) throw new Error("Car already in use");

      // check driver active usage
      const driverActive = await tx.usage.findFirst({
        where: { driverId, endAt: null }
      });
      if (driverActive) throw new Error("Driver already in use");

      const usage = await tx.usage.create({
        data: { carId, driverId, startAt: new Date(startAt), reason }
      });

      return usage;
    });
  }

  async endUsage(usageId: number, endAt: string) {
    // set endAt only if currently null
    return prisma.usage.updateMany({
      where: { id: usageId, endAt: null },
      data: { endAt: new Date(endAt) },
    });
  }

  async listWithRelations() {
    return prisma.usage.findMany({
      include: {
        driver: true,
        car: true
      },
      orderBy: { startAt: "desc" }
    });
  }
}
