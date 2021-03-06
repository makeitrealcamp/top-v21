const { Model } = require('./model');
const { signToken } = require('../auth');
const { sendMail } = require('../../../mail');

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  try {
    const user = await Model.findOne({ email }).exec();
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

    req.body.email = doc.email;
    next();
  } catch (error) {
    next(error);
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
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { decoded = {}, body = {} } = req;
  const { id } = decoded;

  try {
    const doc = await Model.findOneAndUpdate({ id }, body, { new: true });

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
    next(error);
  }
};

exports.confirmation = async (req, res, next) => {
  const { body = {} } = req;
  const { email } = body;

  const user = await Model.findOne({ email });

  if (user) {
    const token = signToken({ email }, '1d');

    try {
      await sendMail({
        to: email,
        subject: 'Activate your account',
        text: `
          Visit the following link to activate your account:
          ${process.env.APP_SERVER_URL}/activate/${token}
        `,
        html: `
          <p>
            Visit the following link to activate your account:
            <a href="${process.env.APP_SERVER_URL}/activate/${token}" target="_blank">
              Activate your account
            </a>
          </p>
        `,
      });

      res.json({
        data: {
          email,
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    next({
      statusCode: 404,
      message: 'User not found',
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { body = {} } = req;
  const { email } = body;

  const user = await Model.findOne({ email });

  if (user) {
    const token = signToken({ email }, '1d');

    try {
      await sendMail({
        to: email,
        subject: 'Reset your password',
        text: `
          Visit the following link to reset your password:
          ${process.env.APP_SERVER_URL}/reset-password/${token}
        `,
        html: `
          <p>
            Visit the following link to reset your password:
            <a href="${process.env.APP_SERVER_URL}/reset-password/${token}" target="_blank">
            Reset your password
            </a>
          </p>
        `,
      });

      res.json({
        data: {
          email,
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.json({
      data: {
        email,
      },
    });
  }
};

exports.activate = async (req, res, next) => {
  const { decoded = {} } = req;
  const { email } = decoded;

  try {
    const user = await Model.findOneAndUpdate(
      { email },
      { active: 1 },
      { new: true },
    );

    if (user) {
      res.json({
        success: true,
      });
    } else {
      next({
        statusCode: 404,
        message: 'User not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { decoded = {}, body = {} } = req;
  const { email } = decoded;
  const { password, passwordConfirmation } = body;

  if (password !== passwordConfirmation) {
    return next({
      statusCode: 400,
      message: 'Password and Password confirmarion do not match',
    });
  }

  try {
    const user = await Model.findOneAndUpdate(
      { email },
      { password },
      { new: true },
    );

    if (user) {
      res.json({
        success: true,
      });
    } else {
      next({
        statusCode: 404,
        message: 'User not found',
      });
    }
  } catch (error) {
    next(error);
  }
};
