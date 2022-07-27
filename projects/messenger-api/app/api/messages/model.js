const { DataTypes } = require('sequelize');

const sequelize = require('../../database');

const Message = sequelize.define(
  'message',
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Message;
