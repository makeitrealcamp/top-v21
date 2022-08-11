const { sign } = require('jsonwebtoken');

const User = require('./model');
const { token } = require('../../config');
const { secret, expires } = token;

const findUserById = async (source, args, context) => {
  const { id } = args;

  const data = await User.findOne({ where: { id } });
  return data;
};

const signup = async (source, args, context) => {
  const { input } = args;

  const data = await User.create(input);
  return data;
};

const signin = async (source, args, context) => {
  const { email, password } = args;

  const user = await User.findOne({ where: { email } });
  if (user) {
    const verified = await user.verifyPassword(password);
    if (verified) {
      const token = sign({ id: user.id }, secret, { expiresIn: expires });

      return {
        ...user.toJSON(),
        token,
      };
    }
  }
  throw new Error('UnAuthorized');
};

module.exports = {
  findUserById,
  signup,
  signin,
};
