/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import { prisma } from "@/database/prisma.js";
import { z } from "zod";

export class DeliveriesController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        user_id: z.string(),
        description: z.string(),
      });

      const { user_id, description } = bodySchema.parse(request.body);

      await prisma.delivery.create({ data: { userId: user_id, description } });

      return response.status(201).json({ m: "ok" });
    } catch (error) {
      next(error);
    }
  }

  async index(__: Request, response: Response, _: NextFunction) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
    return response.json(deliveries);
  }
}
