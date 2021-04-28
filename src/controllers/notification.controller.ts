import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Notification } from "../models";
import {
  getNotifications,
  createNotification,
  INotificationPayload,
} from "../repositories/notification";

@Route("notifications")
@Tags("Notification")
export default class NotificationController {
  @Get("/")
  public async getNotifications(): Promise<Array<Notification>> {
    return getNotifications();
  }

  public async createNotification(
    body: INotificationPayload
  ): Promise<Notification> {
    return createNotification(body);
  }
}
