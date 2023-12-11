"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var envalid_1 = require("envalid");
var cors = __importStar(require("cors"));
require("dotenv").config();
var routes_1 = __importDefault(require("./routes"));
var database_1 = __importDefault(require("./config/database"));
var aws_1 = require("./aws");
envalid_1.cleanEnv(process.env, {
    PORT: envalid_1.port(),
    POSTGRES_DB: envalid_1.str(),
    POSTGRES_HOST: envalid_1.str(),
    POSTGRES_PASSWORD: envalid_1.str(),
    POSTGRES_PORT: envalid_1.port(),
    POSTGRES_USER: envalid_1.str(),
    AWS_QUEUE_URL: envalid_1.url(),
});
var PORT = process.env.PORT || 8001;
var app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("tiny"));
app.use(express_1.default.static("public"));
app.use(cors.default());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use(routes_1.default);
console.log("Validation done");
typeorm_1.createConnection(database_1.default)
    .then(function (_connection) {
    aws_1.queueConsumer.consume();
    app.listen(PORT, function () {
        console.log("Server is running on port", PORT);
    });
})
    .catch(function (err) {
    console.log("Unable to connect to db", err);
    process.exit(1);
});
