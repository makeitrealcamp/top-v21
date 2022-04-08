const mongoose = require('mongoose');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  content: {
    type: String,
    trim: true,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
};

const references = {
  userId: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
};

const tweet = new Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const virtuals = {
  comments: {
    ref: 'comment',
    localField: '_id',
    foreignField: 'tweetId',
  },
  commentsCount: {
    ref: 'comment',
    localField: '_id',
    foreignField: 'tweetId',
    count: true,
  },
};

tweet.virtual('comments', virtuals.comments);
tweet.virtual('commentsCount', virtuals.commentsCount);

const sanitizers = [body('content').escape()];

module.exports = {
  Model: mongoose.model('tweet', tweet),
  fields,
  references,
  virtuals,
  sanitizers,
};
