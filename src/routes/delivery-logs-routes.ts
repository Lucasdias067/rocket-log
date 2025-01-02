import { DeliveryLogsController } from "@/controllers/deliveriy-logs-controller.js";
import { Router } from "express";
import { EnsureAuthenticated } from "@/middlewares/ensure-authenticated.js";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization.js";

export const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  EnsureAuthenticated,
  verifyUserAuthorization(["sale"]),
  (req, res, next) => {
    deliveryLogsController.create(req, res, next);
  },
);

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  EnsureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  (req, res, next) => {
    deliveryLogsController.show(req, res, next);
  },
);
