const { verify } = require('jsonwebtoken');

const {
  token: { secret },
} = require('../config');

const getUser = ({ token: authToken }) => {
  let token = authToken;
  if (token.startsWith('Bearer')) {
    token = token.substring(7);
  }

  return new Promise((resolve, reject) => {
    verify(token, secret, function (err, user) {
      if (err) {
        reject('UnAuthorized');
      } else {
        resolve(user);
      }
    });
  });
};

module.exports = {
  getUser,
};
