const { sign, verify } = require('jsonwebtoken');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const {
  token: { secret, expires },
} = require('../../config');

const signToken = (payload, expiresIn = expires) =>
  sign(payload, secret, {
    expiresIn,
  });

const auth = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

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

const authCheck = async (req, res, next) => {
  const { params = {} } = req;
  const { token = '' } = params;

  if (!token) {
    return next({
      message: 'Cannot perform this operation',
      statusCode: 400,
    });
  }

  verify(token, secret, function (err, decoded) {
    if (err) {
      next({
        message: 'Cannot perform this operation',
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
  authCheck,
};
