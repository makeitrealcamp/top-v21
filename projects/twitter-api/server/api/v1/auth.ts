const { sign, verify } = require('jsonwebtoken');

import configuration from '../../config';
import { Request, Response, NextFunction } from 'express';

const {
  token: { secret, expires },
} = configuration;

type RequestAuth = Request & {
  decoded: Record<string, any>;
  doc?: Record<string, any>;
};

const signToken = (payload: Record<string, string>, expiresIn = expires) =>
  sign(payload, secret, {
    expiresIn,
  });

const auth = async (req: Request, res: Response, next: NextFunction) => {
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

  verify(token, secret, function (err: Error, decoded: Record<string, string>) {
    if (err) {
      next({
        message: 'Unauthorized',
        statusCode: 401,
      });
    } else {
      (req as RequestAuth).decoded = decoded;
      next();
    }
  });
};

const owner = (req: Request, res: Response, next: NextFunction) => {
  const { decoded = {}, doc = {} } = req as RequestAuth;
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

const me = (req: Request, res: Response, next: NextFunction) => {
  const { decoded = {}, doc = {} } = req as RequestAuth;
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

module.exports = {
  signToken,
  auth,
  owner,
  me,
};
