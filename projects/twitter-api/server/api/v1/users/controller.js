const { Model } = require('./model');
const { signToken } = require('../auth');

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const doc = await Model.findById(id);
    if (!doc) {
      const message = `${Model.name} not found`;
      next({
        message,
        statusCode: 404,
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(err);
  }
};

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

    const { _id: id } = user;
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
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const updated = await doc.save();
    res.json({
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const deleted = await doc.remove();
    res.json({
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};
