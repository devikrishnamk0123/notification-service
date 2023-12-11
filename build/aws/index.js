"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsSqs = exports.queueConsumer = void 0;
var queueConsumer_1 = require("./queueConsumer");
var aws_sqs_1 = require("./aws-sqs");
var queueConsumer = new queueConsumer_1.QueueConsumer();
exports.queueConsumer = queueConsumer;
var awsSqs = new aws_sqs_1.AwsSqs(process.env.AWS_QUEUE_URL);
exports.awsSqs = awsSqs;
