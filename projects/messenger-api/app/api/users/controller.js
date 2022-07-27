const { User } = require('../models');
const { sign } = require('../auth');

exports.signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const user = await User.create(body);

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next({
        message: 'Email or password invalid',
        statusCode: 401,
        code: 'UNAUTHORIZED',
      });
    }

    const verified = await user.verifyPassword(password);
    if (!verified) {
      return next({
        message: 'Email or password invalid',
        statusCode: 401,
        code: 'UNAUTHORIZED',
      });
    }

    const { id } = user;
    const token = sign({ id });

    res.json({
      data: user,
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
