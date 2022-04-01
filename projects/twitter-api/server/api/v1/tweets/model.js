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

const tweet = new Schema(fields, {
  timestamps: true,
});

module.exports = mongoose.model('tweet', tweet);
