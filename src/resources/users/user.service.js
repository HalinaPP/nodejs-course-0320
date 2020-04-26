const usersRepo = require('./user.db.repository');
const tasks = require('../tasks/task.db.repository');
const myCrypt = require('../../helpers/myCrypt');

const getAll = () => usersRepo.getAll();
const getUserById = async id => usersRepo.getUserById(id);
const setUser = async userData => {
  const hash = await myCrypt.hashPassword(userData.password);
  console.log(`hash ser=${typeof hash}`);
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
  console.log(`login=${login} pass=${password}`);
  const user = await usersRepo.getUserByLogin(login);
  if (!user) {
    return 0;
  }
  console.log(`loginU=${user.login} passU=${user.password}`);
  const isCheck = await myCrypt.checkPassword(password, user.password);
  console.log(`is=${isCheck}`);
  return isCheck ? user : 0;
};
const findOneByToken = async token => {
  console.log('in findOne');
  const { user, login } = await myCrypt.getDataFromToken(token);
  // console.log(`pay=${login} p=${user}`);
  console.log(`${`find one pay=${user}` + ' login='}${login}`);
  return await getUserById(user);
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
