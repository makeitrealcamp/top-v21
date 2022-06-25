const { sign, verify } = require('jsonwebtoken');
const {
  token: { secret, expires },
} = require('../../config');

const signToken = (payload, expiresIn = expires) =>
  sign(payload, secret, {
    expiresIn,
  });

const auth = async (req, res, next) => {
  let { headers: { authorization: token = '' } = {} } = req;

  if (token.startsWith('Bearer')) {
    token = token.substring(7);
  }

  if (!token) {
    return next({
      message: 'Unauthorized',
      statusCode: 401,
    });
  }

  verify(token, secret, function (err, decoded) {
    if (err) {
      next({
        message: 'Unauthorized',
        statusCode: 401,
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const owner = (req, res, next) => {
  const { decoded = {}, doc = {} } = req;
  const { id: authId } = decoded;
  const {
    userId: { id: userId },
  } = doc;

  if (authId === userId) {
    next();
  } else {
    next({
      message: 'Forbidden',
      statusCode: 403,
    });
  }
};

const me = (req, res, next) => {
  const { decoded = {}, doc = {} } = req;
  const { id: authId } = decoded;
  const { id: userId } = doc;

  if (authId === userId) {
    next();
  } else {
    next({
      message: 'Forbidden',
      statusCode: 403,
    });
  }
};

const activate = async (req, res, next) => {
  const { params = {} } = req;
  const { token = '' } = params;

  if (!token) {
    return next({
      message: 'Cannot activate account',
      statusCode: 400,
    });
  }

  verify(token, secret, function (err, decoded) {
    if (err) {
      next({
        message: 'Cannot activate account',
        statusCode: 400,
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = {
  signToken,
  auth,
  owner,
  me,
  activate,
};
