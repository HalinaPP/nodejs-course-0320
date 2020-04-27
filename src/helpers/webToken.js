const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const getDataFromToken = async token => {
  const { user, login } = await jwt.verify(token, JWT_SECRET_KEY);
  return { user, login };
};

const createToken = user => {
  const payload = { user: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 100 });
  return token;
};

module.exports = {
  getDataFromToken,
  createToken
};
