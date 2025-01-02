/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod";
import { AppError } from "@/utils/app-error.js";

export class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        delivery_id: z.string().uuid(),
        description: z.string(),
      });

      const { delivery_id, description } = bodySchema.parse(request.body);

      const delivery = await prisma.delivery.findUnique({
        where: { id: delivery_id },
      });

      if (!delivery) {
        throw new AppError("Delivery not found", 404);
      }

      if (delivery.status === "delivered") {
        throw new AppError("Delivery is already delivered", 400);
      }

      if (delivery.status === "processing") {
        throw new AppError("Delivery is processing", 400);
      }

      await prisma.deliveryLog.create({
        data: { description, deliveryId: delivery_id },
      });

      return response.status(201).json({ delivery });
    } catch (error) {
      next(error);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        delivery_id: z.string().uuid(),
      });
      const { delivery_id } = paramsSchema.parse(request.params);

      const delivery = await prisma.delivery.findUnique({
        where: { id: delivery_id },
        include: { logs: true, user: true },
      });

      if (
        request.user?.role === "customer" &&
        delivery?.userId !== request.user.id
      ) {
        throw new AppError(
          "You don't have permission to access this delivery log",
          403,
        );
      }

      return response.json({ delivery });
    } catch (error) {
      next(error);
    }
  }
}
