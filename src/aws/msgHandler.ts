import NotificationController from "../controllers/notification.controller";
import { SQSMessage } from "./queueConsumer";

interface MessageHandler {
  process(sqsMsg: SQSMessage): Promise<boolean>;
}

class SqsMsgHandler implements MessageHandler {
  async process(sqsMsg: SQSMessage): Promise<boolean> {
    try {
      switch (sqsMsg.type) {
        case "user/create":
          const controller = new NotificationController();
          await controller.createNotification({
            type: sqsMsg.type,
            message: sqsMsg.message,
          });
          break;
        default:
          break;
      }
      return true;
    } catch (error) {
      console.log(`[SQS-HANDLER] ${error}`);
    }
    return false;
  }
}

const sqsMsgHandler = new SqsMsgHandler();

export { sqsMsgHandler };
