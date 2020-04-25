const bcrypt = require('bcrypt');
const { SALT, JWT_SECRET_KEY } = require('../common/config');
const statusCodes = require('../resources/users/user.constants');
const { ErrorHandler } = require('./errorHandler');
const jwt = require('jsonwebtoken');

const hashPassword = async password => {
  return await bcrypt
    .hash(password, 10)
    .then(hash => {
      // Store hash in your password DB.
      console.log(`new_hash=${hash} Salt=${SALT}`);
      return hash;
    })
    .catch(() => {
      throw new ErrorHandler(500, statusCodes[500]);
    });
  // , (err, encrString) => {
  /*    if (err) {
      throw new ErrorHandler(500, statusCodes[500]);
    }

    console.log(`err=${err}new_hash=${encrString} Salt=${SALT}`);
    return encrString;
  });

  console.log(`new_hash2=${hasnNew} Salt=${SALT}`);
  return hasnNew;*/
};

const checkPassword = async (password, hash) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      throw new ErrorHandler(403, statusCodes[403]);
    }
    return result;
  });
};
const getDataFromToken = async token => {
  return;
};

const createToken = user => {
  const payload = { user: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 10 });
  return token;
};

const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
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
