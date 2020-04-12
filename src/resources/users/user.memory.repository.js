const uuid = require('uuid');
const data = require('../../data/data.json').users;
/* const data = [
  {
    id: uuid(),
    name: 'Garold',
    login: 'garold12',
    password: '12345'
  },
  {
    id: uuid(),
    name: 'Midel',
    login: 'midel14',
    password: '123456'
  }
];*/
const getAll = async () => {
  return data;
};

const getUserById = async id => {
  const currentUser = data.find(user => {
    return user.id === id;
  });
  return [currentUser];
};

const setUser = async userData => {
  userData.id = uuid();
  data.push(userData);
  return [userData];
};

const updateUserById = async (id, userData) => {
  const userIndex = data.findIndex(user => {
    return user.id === id;
  });
  if (userIndex === -1) {
    return [];
  }
  userData.id = id;
  data.splice(userIndex, 1, userData);
  const newUser = data.find(user => {
    return user.id === id;
  });
  return [newUser];
};

const deleteUserById = async id => {
  const userIndex = data.findIndex(user => {
    return user.id === id;
  });
  let statusCode;
  if (userIndex === -1) {
    statusCode = 404;
    return statusCode;
  }
  try {
    data.splice(userIndex, 1);
    statusCode = 204;
  } catch (error) {
    statusCode = 400;
  }
  return statusCode;
};

module.exports = {
  getAll,
  getUserById,
  setUser,
  updateUserById,
  deleteUserById
};
