const mongoose = require('mongoose');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  comment: {
    type: String,
    required: true,
    trim: true,
  },
};

const references = {
  userId: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  tweetId: {
    type: mongoose.ObjectId,
    ref: 'tweet',
    required: true,
  },
};

const comment = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

const sanitizers = [body('comment').escape()];

module.exports = {
  Model: mongoose.model('comment', comment),
  fields,
  references,
  sanitizers,
};
