const mongoose = require('mongoose');

const fields = {
  content: String,
};

module.exports = mongoose.model('tweet', fields);
