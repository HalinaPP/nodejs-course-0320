const User = require('./user.model');

const getAll = async () => {
  return User.find();
};

const getUserById = async id => {
  return User.findById(id);
};

const setUser = async userData => {
  return User.create(userData);
};

const updateUserById = async (id, userData) => {
  return User.updateOne({ _id: id }, userData);
};

const deleteUserById = async id => {
  return (await User.deleteOne({ _id: id }).exec()).deletedCount;
};
/*
const checkUserAuth = async (login, password) => {
  return User.findOne({ login, password });
};*/

const getUserByLogin = async login => {
  return User.findOne({ login });
};
module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  /* checkUserAuth,*/
  getUserByLogin
};
