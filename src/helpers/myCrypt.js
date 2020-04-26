const bcrypt = require('bcrypt');
const { SALT, JWT_SECRET_KEY } = require('../common/config');
const statusCodes = require('../resources/users/user.constants');
const { ErrorHandler } = require('./errorHandler');
const jwt = require('jsonwebtoken');

const hashPassword = async password => {
  return await bcrypt
    .hash(password, 10)
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
const getDataFromToken = async token => {
  const { user, login } = await jwt.verify(token, JWT_SECRET_KEY);
  return { user, login };
};

const createToken = user => {
  const payload = { user: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 100 });
  return token;
};

const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        throw new ErrorHandler(401, statusCodes[401]);
      } else {
        return next();
      }
    });
  } else {
    throw new ErrorHandler(401, statusCodes[401]);
  }
};
module.exports = {
  hashPassword,
  getDataFromToken,
  createToken,
  checkToken,
  checkPassword
};
