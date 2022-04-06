const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
};

const user = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

user
  .virtual('name')
  .get(function () {
    return this.firstname + ' ' + this.lastname;
  })
  .set(function (value) {
    const [firstname = '', lastname = ''] = value.split(' ');
    this.firstname = firstname;
    this.lastname = lastname;
  });

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
