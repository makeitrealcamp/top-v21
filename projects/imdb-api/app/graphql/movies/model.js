const { DataTypes } = require('sequelize');

const sequelize = require('../../database');

const Message = sequelize.define(
  'movie',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posterURL: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Message;
