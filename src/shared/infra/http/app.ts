import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { AppError } from '../../errors/AppError';
import { HttpCodes } from '../../errors/HttpCodes';
import createConnection from '../typeorm';
import { router } from './routes';

import '../../container';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      statusCode: error.statusCode,
      description: error.description,
    });
  }

  return response.status(HttpCodes.INTERNAL_SERVER).json({
    statusCode: HttpCodes.INTERNAL_SERVER,
    message: `Internal Server Error: ${error.message}`,
  });
});

export { app };
