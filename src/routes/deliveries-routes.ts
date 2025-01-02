import { DeliveriesController } from "@/controllers/deliveries-controller.js";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller.js";
import { EnsureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization.js";
import { Router } from "express";

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(
  EnsureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
);

deliveriesRoutes.post("/", (req, res, next) => {
  deliveriesController.create(req, res, next);
});

deliveriesRoutes.get("/", (req, res, next) => {
  deliveriesController.index(req, res, next);
});

deliveriesRoutes.patch("/:id/status", (req, res, next) => {
  deliveriesStatusController.update(req, res, next);
});
