import AWS from "aws-sdk";

class AwsSqs extends AWS.SQS {
  private queueUrl: string;
  constructor(url: string) {
    super({ apiVersion: "2012-11-05" });
    this.queueUrl = url;
  }

  private getMessage(
    maxMsg: number = 1,
    waitTime: number = 20
  ): Promise<AWS.SQS.MessageList> {
    return new Promise((resolve) => {
      const params: AWS.SQS.ReceiveMessageRequest = {
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: maxMsg,
        WaitTimeSeconds: waitTime,
      };

      this.receiveMessage(params, (error, data) => {
        if (error) {
          console.log(`[SQS] Error while receiving data from queue: ${error}`);
        } else if (data.Messages) {
          resolve(data.Messages);
        }
        resolve([]);
      });
    });
  }

  async *getMessages(): AsyncIterableIterator<AWS.SQS.Message> {
    while (true) {
      const currentMsg = await this.getMessage(1);
      yield currentMsg[0];
    }
  }

  deleteMsg(receiptHandle: string): Promise<void> {
    return new Promise((resolve) => {
      const params: AWS.SQS.DeleteMessageRequest = {
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle,
      };

      this.deleteMessage(params, (error) => {
        if (error) {
          console.log(`[SQS] Error while deleting data from queue: ${error}`);
          resolve();
        }
        resolve();
      });
    });
  }

  sendMsg(msg: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: AWS.SQS.SendMessageRequest = {
        QueueUrl: this.queueUrl,
        MessageBody: msg,
      };

      this.sendMessage(params, (error) => {
        if (error) {
          console.log(`[SQS] Error while sending data to queue: ${error}`);
          reject(error);
        }
        resolve();
      });
    });
  }
}

export { AwsSqs };
