const express = require('express');
const cors = require('cors');

const api = require('./api/v1');

const app = express();

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

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  const { message = '' } = err;
  let { statusCode = 500 } = err;

  if (err?.name === 'ValidationError') {
    statusCode = 422;
  }

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
