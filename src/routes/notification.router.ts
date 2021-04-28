import express from "express";
import HealthController from "../controllers/health.controller";
import NotificationController from "../controllers/notification.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new NotificationController();
  const response = await controller.getNotifications();
  return res.send(response);
});

router.get("/health", async (_req, res) => {
  const controller = new HealthController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default router;
