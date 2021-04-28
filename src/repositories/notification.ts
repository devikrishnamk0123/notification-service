import { getRepository } from "typeorm";
import { Notification } from "../models";

export interface INotificationPayload {
  type: string;
  message: string;
}

export const getNotifications = async (): Promise<Array<Notification>> => {
  const notificationRepository = getRepository(Notification);
  return notificationRepository.find();
};

export const createNotification = async (
  payload: INotificationPayload
): Promise<Notification> => {
  const notificationRepository = getRepository(Notification);
  const notification = new Notification();
  const res = await notificationRepository.save({
    ...notification,
    ...payload,
  });
  console.log(res);
  return res;
};
