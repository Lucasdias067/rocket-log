import { AppError } from "../utils/app-error.js";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function ErrorHandling(
  error: Error,
  _: Request,
  response: Response,
  __: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "Validation error", issues: error.format() });
  }
  return response.status(500).json({ message: error.message });
}
