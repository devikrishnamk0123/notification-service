import { QueueConsumer } from "./queueConsumer";
import { AwsSqs } from "./aws-sqs";

const queueConsumer = new QueueConsumer();
const awsSqs = new AwsSqs(process.env.AWS_QUEUE_URL!);

export { queueConsumer, awsSqs };
