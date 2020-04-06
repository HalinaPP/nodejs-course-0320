const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const setUser = userData => usersRepo.setUser(userData);
const updateUserById = (id, userData) => usersRepo.updateUserById(id, userData);
const deleteUserById = id => usersRepo.deleteUserById(id);

module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById
};
