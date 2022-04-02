require('dotenv').config();

const config = {
  port: process.env.PORT,
  database: {
    protocol: process.env.DB_PROTOCOL,
    url: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pagination: {
    limit: 5,
    skip: 0,
    page: 1,
  },
};

module.exports = config;
