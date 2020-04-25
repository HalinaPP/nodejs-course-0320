const usersRepo = require('./user.db.repository');
const tasks = require('../tasks/task.db.repository');
const myCrypt = require('../../helpers/myCrypt');

const getAll = () => usersRepo.getAll();
const getUserById = async id => usersRepo.getUserById(id);
const setUser = async userData => {
  const hash = await myCrypt.hashPassword(userData.password);
  userData.password = hash;
  return await usersRepo.setUser(userData);
};

const updateUserById = async (id, userData) => {
  const hash = await myCrypt.hashPassword(userData.password);
  userData.password = hash;
  return await usersRepo.updateUserById(id, userData);
};
const deleteUserById = async id => {
  await tasks.deleteUserInTask(id);
  return await usersRepo.deleteUserById(id);
};
const checkUserAuth = async (login, password) => {
  // const hash = myCrypt.hashPassword(password);
  const user = await usersRepo.getUserByLogin(login);
  const isCheck = await myCrypt.checkPassword(password, user.password);
  return isCheck ? user : 0;
};
const findOneByToken = async token => {
  const { login, password } = myCrypt.getDataFromToken(token);
  return await checkUserAuth(login, password);
};

module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById,
  checkUserAuth,
  findOneByToken
};
