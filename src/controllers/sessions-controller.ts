import { prisma } from "@/database/prisma.js";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import { AppError } from "@/utils/app-error.js";
import { authConfig } from "@/configs/auth.js";
import jwt from "jsonwebtoken";

export class SessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });

      const { email, password } = bodySchema.parse(request.body);

      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) {
        throw new AppError("Invalid email or password", 401);
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new AppError("Invalid email or password", 401);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
        subject: user.id,
        expiresIn,
      });

      const { password: _, ...userWithoutPassword } = user;

      return response.status(200).json({ token, user: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }
}
