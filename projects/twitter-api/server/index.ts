import express, { Request, Response, NextFunction } from 'express';
import { logger, requests, loggerHeader } from './logger';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { RequestWithId, APIError } from './types';

const api = require('./api/v1');
const docs = require('./api/v1/docs');

const app = express();

// Add unique ID to every request
app.use((req, res, next) => {
  (req as RequestWithId).id = uuidv4();
  next();
});

// Log every incoming request
app.use(requests);

app.use(
  cors({
    // origin: '*',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

app.use('/api', api);
app.use('/api/v1', api);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route Not Found',
    // level: 'warn',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { message = '' } = err;
  let { statusCode = 500 } = err as APIError;

  if (err?.name === 'ValidationError') {
    statusCode = 422;
  }

  const log = `${loggerHeader(req)} ${statusCode} ${message}`;
  logger.error(log);

  res.status(statusCode);
  res.json({
    message,
  });
});

export default app;
