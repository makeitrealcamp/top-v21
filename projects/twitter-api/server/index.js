const express = require('express');
const { logger, requests } = require('./logger');
const { v4: uuidv4 } = require('uuid');

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const api = require('./api/v1');
const docs = require('./api/v1/docs');

const app = express();

// Add unique ID to every request
app.use((req, res, next) => {
  req.id = uuidv4();
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

app.use((err, req, res, next) => {
  const { message = '', level = 'error' } = err;
  let { statusCode = 500 } = err;

  if (err?.name === 'ValidationError') {
    statusCode = 422;
  }

  const log = `${logger.header(req)} ${statusCode} ${message}`;
  logger[level](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
