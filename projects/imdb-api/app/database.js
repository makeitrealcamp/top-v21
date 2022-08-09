const { Sequelize } = require('sequelize');

const config = require('./config');
const { database } = config;
const { name, username, password, host, port } = database;

const sequelize = new Sequelize(name, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

module.exports = sequelize;
