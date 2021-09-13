require('dotenv').config({ path: __dirname + '/.env' });

import "reflect-metadata";
import express, { NextFunction, Request, response, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "@shared/infra/typeorm";
import "@shared/container";

import swaggerFile from "../../../swagger.json";
import { AppError } from "@shared/Errors/AppError";


const port = process.env.PORT || "3333";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({
      status: "erro",
      message: `Interna server - ${error.message}`,
    });
  }
);

app.listen(port, () => {
  console.log("running server " + port);
});
