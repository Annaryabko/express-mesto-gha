const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)*[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/i.test(v);
      },
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // hide password
  },
});
userSchema.methods.toJSON = function () {
  const editedUser = this.toObject();
  delete editedUser.password;
  return editedUser;
};

module.exports = mongoose.model('user', userSchema);
