import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { cleanEnv, port, str, num, url } from "envalid";
import * as cors from "cors";

require("dotenv").config();

import Router from "./routes";
import dbConfig from "./config/database";
import { queueConsumer } from "./aws";

cleanEnv(process.env, {
  PORT: port(),
  POSTGRES_DB: str(),
  POSTGRES_HOST: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_PORT: port(),
  POSTGRES_USER: str(),
  AWS_QUEUE_URL: url(),
});

const PORT = process.env.PORT || 8001;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors.default());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

console.log("Validation done");

createConnection(dbConfig)
  .then((_connection) => {
    queueConsumer.consume();

    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
