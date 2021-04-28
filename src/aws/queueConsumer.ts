import { awsSqs } from ".";
import { sqsMsgHandler } from "./msgHandler";

class SQSMessage {
  type!: string;
  message!: string;
}

class QueueConsumer {
  async consume() {
    for await (const message of awsSqs.getMessages()) {
      try {
        if (message && message.Body) {
          const sqsMsg: SQSMessage = JSON.parse(message.Body);
          console.log(
            `[AWS-CONSUMER] Received from AWS-SQS Type : ${sqsMsg.type}`
          );
          console.log(
            `[AWS-CONSUMER] Received from AWS-SQS. Message: [${sqsMsg.message}]`
          );
          let isSuccess: boolean = false;

          isSuccess = await sqsMsgHandler.process(sqsMsg);

          if (isSuccess && message.ReceiptHandle) {
            await awsSqs.deleteMsg(message.ReceiptHandle);
          }
        }
      } catch (error) {
        console.log(`[AWS-CONSUMER] Message process failed ${error}`);
      }
    }
  }
}

export { QueueConsumer, SQSMessage };
