import { UsersController } from "../controllers/users-controller.js";
import { Router } from "express";

export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", (req, res, next) => {
  usersController.create(req, res, next);
});
