/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod";

export class DeliveriesStatusController {
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });
      const bodySchema = z.object({
        status: z.enum(["processing", "shipped", "delivered"]),
      });

      const { status } = bodySchema.parse(request.body);
      const { id } = paramsSchema.parse(request.params);

      await prisma.delivery.update({
        data: { status },
        where: { id },
      });

      await prisma.deliveryLog.create({
        data: {
          description: `Delivery status changed to ${status}`,
          deliveryId: id,
        },
      });

      return response.status(201).json({ m: "ok" });
    } catch (error) {
      next(error);
    }
  }
}
