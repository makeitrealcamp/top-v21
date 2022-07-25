const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { token } = config;
const { secret, expires } = token;

exports.auth = expressjwt({
  secret,
  algorithms: ['HS256'],
});

exports.sign = (data, expiresIn = expires) =>
  jwt.sign(data, secret, { expiresIn });
