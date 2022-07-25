const { Sequelize } = require('sequelize');

const config = require('./config');
const { database } = config;
const { name, username, password, host, port } = database;

const sequelize = new Sequelize(name, username, password, {
  host,
  port,
  dialect: 'postgres',
  logging: console.log,
});

module.exports = sequelize;
