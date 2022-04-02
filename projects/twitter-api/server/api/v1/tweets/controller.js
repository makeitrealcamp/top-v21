const Model = require('./model');

const { paginationParams } = require('../../../utils');

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const doc = await Model.findById(id);
    if (!doc) {
      const message = 'Tweet not found';
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

exports.list = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, skip, page } = paginationParams(query);

  try {
    const data = await Promise.all([
      Model.find({}).skip(skip).limit(limit).exec(),
      Model.countDocuments(),
    ]);
    const [docs, total] = data;

    const pages = Math.ceil(total / limit);

    res.json({
      data: docs,
      meta: {
        pages,
        page,
        skip,
        limit,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { body = {} } = req;

  try {
    const model = new Model(body);
    const doc = await model.save();

    res.status(201);
    res.json({
      data: doc,
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
