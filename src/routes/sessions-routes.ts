import { SessionsController } from "@/controllers/sessions-controller.js";
import { Router } from "express";

export const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post("/", (req, res, next) => {
  sessionsController.create(req, res, next);
});
