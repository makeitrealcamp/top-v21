const mongoose = require('mongoose');
// const { hash, compare } = require('bcryptjs');
const validator = require('validator');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  nickname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
  },
  given_name: {
    type: String,
  },
  family_name: {
    type: String,
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
    unique: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message(props) {
        return `${props.value} is not a valid email`;
      },
    },
  },
  active: {
    type: Number,
    default: 0,
  },
  sub: {
    type: String,
    unique: true,
    required: true,
  },
};

const user = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

// user
//   .virtual('name')
//   .get(function () {
//     return this.firstname + ' ' + this.lastname;
//   })
//   .set(function (value) {
//     const [firstname = '', lastname = ''] = value.split(' ');
//     this.firstname = firstname;
//     this.lastname = lastname;
//   });

// const hiddenFields = ['password'];

// user.methods.toJSON = function () {
//   const doc = this.toObject();

//   hiddenFields.forEach((field) => {
//     delete doc[field];
//   });

//   return doc;
// };

// user.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     this.password = await hash(this.password, 10);
//   }
//   next();
// });

// user.pre('findOneAndUpdate', async function (next) {
//   // this._update has any modified property
//   if (this._update.password) {
//     this._update.password = await hash(this._update.password, 10);
//   }
//   next();
// });

// user.methods.verifyPassword = function (value) {
//   return compare(value, this.password);
// };

const sanitizers = [body('email'), body('description').escape()];

module.exports = {
  Model: mongoose.model('user', user),
  fields,
  sanitizers,
};
