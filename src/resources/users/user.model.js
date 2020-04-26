const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: { type: String, required: true },
    password: { type: String, required: true },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);
/* const bcrypt = require('bcrypt');
userSchema.pre('save', async next => {
  // Hash the password before saving the user model
  const user = this;
  // if (user.isModified('password')) {
  user.password = await bcrypt.hash(user.password, 10);
  // }
  next();
});*/
userSchema.statics.toResponse = user => {
  user.id = user._id;
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);
module.exports = User;
