"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSqs = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var AwsSqs = /** @class */ (function (_super) {
    __extends(AwsSqs, _super);
    function AwsSqs(url) {
        var _this = _super.call(this, { apiVersion: "2012-11-05" }) || this;
        _this.queueUrl = url;
        return _this;
    }
    AwsSqs.prototype.getMessage = function (maxMsg, waitTime) {
        var _this = this;
        if (maxMsg === void 0) { maxMsg = 1; }
        if (waitTime === void 0) { waitTime = 20; }
        return new Promise(function (resolve) {
            var params = {
                QueueUrl: _this.queueUrl,
                MaxNumberOfMessages: maxMsg,
                WaitTimeSeconds: waitTime,
            };
            _this.receiveMessage(params, function (error, data) {
                if (error) {
                    console.log("[SQS] Error while receiving data from queue: " + error);
                }
                else if (data.Messages) {
                    resolve(data.Messages);
                }
                resolve([]);
            });
        });
    };
    AwsSqs.prototype.getMessages = function () {
        return __asyncGenerator(this, arguments, function getMessages_1() {
            var currentMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, __await(this.getMessage(1))];
                    case 1:
                        currentMsg = _a.sent();
                        return [4 /*yield*/, __await(currentMsg[0])];
                    case 2: return [4 /*yield*/, _a.sent()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AwsSqs.prototype.deleteMsg = function (receiptHandle) {
        var _this = this;
        return new Promise(function (resolve) {
            var params = {
                QueueUrl: _this.queueUrl,
                ReceiptHandle: receiptHandle,
            };
            _this.deleteMessage(params, function (error) {
                if (error) {
                    console.log("[SQS] Error while deleting data from queue: " + error);
                    resolve();
                }
                resolve();
            });
        });
    };
    AwsSqs.prototype.sendMsg = function (msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var params = {
                QueueUrl: _this.queueUrl,
                MessageBody: msg,
            };
            _this.sendMessage(params, function (error) {
                if (error) {
                    console.log("[SQS] Error while sending data to queue: " + error);
                    reject(error);
                }
                resolve();
            });
        });
    };
    return AwsSqs;
}(aws_sdk_1.default.SQS));
exports.AwsSqs = AwsSqs;
