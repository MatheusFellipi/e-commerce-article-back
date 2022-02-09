import 'reflect-metadata';
require('dotenv').config({ path: __dirname + '/.env' });
import '@Shared/Container';
import 'express-async-errors';
import '@Shared/Infra/Typeorm';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';

import { AppError } from '@Shared/Errors/AppError';
import swaggerFile from '../../../swagger.json';

import { router } from './Routes/Index';
const port = process.env.PORT || '3333';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(helmet());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    return response.status(500).json({
      status: 'erro',
      message: `Interna server - ${error.message}`,
    });
  }
);

app.listen(port, () => {
  console.log('running server ' + port);
});
