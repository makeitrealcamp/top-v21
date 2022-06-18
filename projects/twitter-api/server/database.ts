import mongoose from 'mongoose';
import { logger } from './logger';

export const connect = function ({
  protocol = 'mongodb',
  url = '',
  username = '',
  password = '',
}) {
  let dburl = '';

  if (username !== '' && password !== '') {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  mongoose.connect(dburl);
};

export const disconnect = function () {
  mongoose.connection.close(() => {
    logger.info('Database disconnected');
  });
};

mongoose.connection.on('open', () => {
  logger.info('Database connected');
});

mongoose.connection.on('close', () => {
  logger.info('Database disconnected');
});

mongoose.connection.on('error', (err: Error) => {
  logger.error(`Database error: ${err.message}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected');
  });
});
