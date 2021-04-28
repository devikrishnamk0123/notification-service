import express from "express";
import NotificationRouter from "./notification.router";

const router = express.Router();

router.use("/notifications", NotificationRouter);

export default router;
