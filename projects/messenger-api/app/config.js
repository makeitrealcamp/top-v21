require('dotenv').config();

const config = {
  port: process.env.PORT,
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
};

module.exports = config;
