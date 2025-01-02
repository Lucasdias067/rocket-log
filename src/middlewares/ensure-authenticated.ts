/* eslint-disable camelcase */
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error.js";
import { authConfig } from "@/configs/auth.js";
import jwt from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  role: string;
}

export function EnsureAuthenticated(
  request: Request,
  __: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT Token not found", 404);
    }

    const [_, token] = authHeader.split(" ");

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };
    return next();
  } catch (_) {
    throw new AppError("Invalid JWT Token", 401);
  }
}
