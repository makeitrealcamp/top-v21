const { Model, fields, references } = require('./model');
const { Model: Tweet } = require('../tweets/model');

const {
  paginationParams,
  sortParams,
  filterByNested,
} = require('../../../utils');

const referencesNames = Object.getOwnPropertyNames(references);

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { tweetId = null } = params;

  if (tweetId) {
    const doc = await Tweet.findById(tweetId);
    if (doc) {
      next();
    } else {
      const message = 'Tweet not found';

      next({
        message,
        statusCode: 404,
      });
    }
  } else {
    next();
  }
};

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

exports.list = async (req, res, next) => {
  const { query = {}, params = {} } = req;
  const { limit, skip, page } = paginationParams(query);
  const { sortBy, direction } = sortParams(query, fields);
  const sort = {
    [sortBy]: direction,
  };
  const { filters, populate } = filterByNested(params, referencesNames);

  try {
    const data = await Promise.all([
      Model.find(filters)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate(populate)
        .exec(),
      Model.countDocuments(filters),
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
        sortBy,
        direction,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { body = {}, params = {} } = req;

  Object.assign(body, params);

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
  const { doc = {}, body = {}, params = {} } = req;

  Object.assign(doc, body, params);

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
