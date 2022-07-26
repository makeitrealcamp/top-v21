const express = require('express');

const api = require('./api');

const app = express();

app.use(express.json());

app.use('/api', api);

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  const { name } = err;

  if (name.startsWith('Sequelize')) {
    if (name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
    }
  }
  if (name === 'UnauthorizedError') {
    statusCode = 401;
  }
  res.status(statusCode).json({
    ...err,
    statusCode,
  });
});

module.exports = app;
