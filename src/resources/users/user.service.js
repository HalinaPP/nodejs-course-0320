const usersRepo = require('./user.db.repository');
const tasks = require('../tasks/task.memory.repository.js');

const getAll = () => usersRepo.getAll();
const getUserById = async id => usersRepo.getUserById(id);
const setUser = async userData => usersRepo.setUser(userData);
const updateUserById = async (id, userData) =>
  usersRepo.updateUserById(id, userData);
const deleteUserById = async id => {
  await tasks.deleteUserInTask(id);
  return await usersRepo.deleteUserById(id);
};
module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById
};
