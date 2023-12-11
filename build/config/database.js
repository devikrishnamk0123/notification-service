"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var config = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "notification_db",
    entities: [models_1.Notification],
    synchronize: false,
    //namingStrategy: new SnakeNamingStrategy(),
    migrations: ["build/migrations/*.js"],
    cli: {
        migrationsDir: "src/migrations",
    },
};
exports.default = config;
