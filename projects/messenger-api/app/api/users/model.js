const { DataTypes } = require('sequelize');
const { hash, compare } = require('bcryptjs');

const sequelize = require('../../database');

const User = sequelize.define(
  'user',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  },
);

User.beforeCreate(async function (user) {
  user.password = await hash(user.password, 10);
});

User.beforeUpdate(async function (user) {
  if (user.changed('password')) {
    user.password = await hash(user.password, 10);
  }
});

User.prototype.verifyPassword = function (value) {
  return compare(value, this.password);
};

module.exports = User;
