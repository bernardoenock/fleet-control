import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fleet Control API",
      version: "1.0.0",
      description:
        "Fleet Control API — manage cars, drivers and usages (Node + Express + Prisma)",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        CarCreate: {
          type: "object",
          required: ["plate", "color", "brand"],
          properties: {
            plate: { type: "string", example: "ABC-1234" },
            color: { type: "string", example: "black" },
            brand: { type: "string", example: "Toyota" },
          },
        },
        CarUpdate: {
          type: "object",
          properties: {
            plate: { type: "string" },
            color: { type: "string" },
            brand: { type: "string" },
          },
        },
        Car: {
          allOf: [
            { $ref: "#/components/schemas/CarCreate" },
            {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          ],
        },
        DriverCreate: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "John Doe" },
          },
        },
        DriverUpdate: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        Driver: {
          allOf: [
            { $ref: "#/components/schemas/DriverCreate" },
            {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          ],
        },
        UsageStart: {
          type: "object",
          required: ["carId", "driverId", "reason"],
          properties: {
            carId: { type: "integer", example: 1 },
            driverId: { type: "integer", example: 1 },
            startAt: { type: "string", format: "date-time", example: "2025-11-25T09:00:00Z" },
            reason: { type: "string", example: "Client visit" },
          },
        },
        UsageEnd: {
          type: "object",
          required: ["endAt"],
          properties: {
            endAt: { type: "string", format: "date-time", example: "2025-11-25T11:00:00Z" },
          },
        },
        Usage: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            startAt: { type: "string", format: "date-time" },
            endAt: { type: "string", format: "date-time", nullable: true },
            reason: { type: "string" },
            car: { $ref: "#/components/schemas/Car" },
            driver: { $ref: "#/components/schemas/Driver" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export { swaggerUi };