import express, { NextFunction, Request, Response } from "express";
import { ErrorHandling } from "./middlewares/error-handling.js";
import { routes } from "./routes/index.js";
import "express-async-errors";

export const app = express();

app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandling(error, req, res, next);
});
