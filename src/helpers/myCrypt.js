const bcrypt = require('bcrypt');
const { SALT, JWT_SECRET_KEY } = require('../common/config');
const statusCodes = require('../resources/users/user.constants');
const { ErrorHandler } = require('./errorHandler');
const jwt = require('jsonwebtoken');

const hashPassword = async password => {
  // return bcrypt.hash(password, 10);
  /* , (err, encrypt) => {
    if (err) {
      throw new ErrorHandler(500, statusCodes[500]);
    }
    console.log(`new_hash=${encrypt} Salt=${SALT}`);
    return encrypt;
  });
  /* console.log(`new_hash2=${hash} Salt=${SALT}`);
  return hash;
  // return hash;
  */
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
  /* await bcrypt.hash(password, 10, (err, encrString) => {
    if (err) {
      throw new ErrorHandler(500, statusCodes[500]);
    }

    console.log(`err=${err}new_hash=${encrString} Salt=${SALT}`);
    return encrString;
  });

  /* console.log(`new_hash2=${hasnNew} Salt=${SALT}`);
  return hasnNew;*/
};

const checkPassword = async (password, hash) => {
  return await bcrypt
    .compare(password, hash)
    .then(result => {
      console.log(`res=${result}`);
      return result;
    })
    .catch(() => {
      throw new ErrorHandler(500, statusCodes[500]);
    });

  /* , (err, result) => {
    if (err) {
      throw new ErrorHandler(403, statusCodes[403]);
    }
    console.log(`res=${result}`);
    return result;
  });*/
};
const getDataFromToken = async token => {
  console.log(`token get data =${token}`);
  const { user, login } = await jwt.verify(token, JWT_SECRET_KEY);
  console.log(`pay=${login} user=${user}`);
  return { user, login };
};

const createToken = user => {
  console.log(`us_id=${user.id} l=${user.login}`);
  const payload = { user: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 100 });
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
