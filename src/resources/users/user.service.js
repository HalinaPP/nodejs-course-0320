const usersRepo = require('./user.memory.repository');
const tasks = require('../tasks/task.memory.repository.js');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const setUser = userData => usersRepo.setUser(userData);
const updateUserById = (id, userData) => usersRepo.updateUserById(id, userData);
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
