const mongoose = require('mongoose');
const validator = require('validator');

// Define the database model
const NewPeopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: value => validator.isLength(value, { max: 40 }),
      message: 'Name must not exceed 40 characters.'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: 'Email must be valid.'
    }
  },
  age: {
    type: Number,
    validate: {
      validator: value => {
        // TODO: Implement custom validation for age if needed
        return true;
      },
      message: 'Custom age validation message.'
    }
  },
  gender: {
    type: String,
    validate: {
      validator: value => {
        // TODO: Implement custom validation for gender if needed
        return true;
      },
      message: 'Custom gender validation message.'
    }
  }
});

// Use the unique validation feature in Mongoose
NewPeopleSchema.path('email').validate(async function (value) {
  const user = await this.constructor.findOne({ email: value });
  return !user;
}, 'That {PATH} is already taken.');

const NewPeople = mongoose.model('NewPeople', NewPeopleSchema);

module.exports = NewPeople;
