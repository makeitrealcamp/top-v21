import { Request } from 'express';
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

import { RequestWithId } from './types';

export const logger = createLogger({
  format: format.simple(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});

export const loggerHeader = (req: Request) => {
  const date = new Date().toISOString();
  return `${req.ip} [${date}] ${(req as RequestWithId).id} "${req.method} ${
    req.originalUrl
  }"`;
};

// Add Request ID to morgan
morgan.token('id', (req) => (req as RequestWithId).id);

const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';

export const requests = morgan(requestFormat, {
  stream: { write: (message) => logger.info(message.trim()) },
});
