const mongoose = require('mongoose');

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
});

module.exports = {
  Model: mongoose.model('tweet', tweet),
  fields,
  references,
};
