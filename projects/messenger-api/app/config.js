require('dotenv').config();

const config = {
  port: process.env.PORT,
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  database: {
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
};

module.exports = config;
