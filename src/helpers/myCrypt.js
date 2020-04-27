const bcrypt = require('bcrypt');
const { SALT } = require('../common/config');
const statusCodes = require('../resources/users/user.constants');
const { ErrorHandler } = require('./errorHandler');

const hashPassword = async password => {
  return await bcrypt
    .hash(password, parseInt(SALT, 10))
    .then(hash => {
      return hash;
    })
    .catch(() => {
      throw new ErrorHandler(500, statusCodes[500]);
    });
};

const checkPassword = async (password, hash) => {
  return await bcrypt
    .compare(password, hash)
    .then(result => {
      return result;
    })
    .catch(() => {
      throw new ErrorHandler(500, statusCodes[500]);
    });
};
module.exports = {
  hashPassword,
  checkPassword
};
