const { Model } = require('./model');
const { signToken } = require('../auth');

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  try {
    const user = await Model.findOne({ email }).exec();
    if (!user) {
      return next({
        message: 'Email or password invalid',
        statusCode: 401,
      });
    }

    const verified = await user.verifyPassword(password);
    if (!verified) {
      return next({
        message: 'Email or password invalid',
        statusCode: 401,
      });
    }

    const { _id: id } = user;
    const token = signToken({ id });

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

exports.signup = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const model = new Model(body);
    const doc = await model.save();

    const { _id: id } = doc;
    const token = signToken({ id });

    res.status(201);
    res.json({
      data: doc,
      meta: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res) => {
  const { params = {} } = req;
  const { username } = params;

  try {
    const doc = await Model.findOne({ username });

    if (doc) {
      res.json({
        data: doc,
      });
    } else {
      next({
        statusCode: 404,
        message: 'User not found',
      });
    }
  } catch (error) {
    next(err);
  }
};
