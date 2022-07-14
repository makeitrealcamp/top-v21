const { Model } = require('./model');

exports.account = async (req, res, next) => {
  const { body = {} } = req;
  const { sub = '' } = body;

  try {
    const user = await Model.findOne({ sub });
    if (user) {
      await Model.findOneAndUpdate({ sub }, body);
    } else {
      const account = new Model(body);
      await account.save();
    }
    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
