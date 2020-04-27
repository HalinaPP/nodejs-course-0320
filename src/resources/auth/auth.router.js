const router = require('express').Router();
const usersService = require('../users/user.service');
const { authenticate, authenticateLocal } = require('./auth.service');
const webToken = require('../../helpers/webToken');
const statusCodes = require('../users/user.constants');

router.route('/').post(authenticateLocal, async (req, res) => {
  if (!req.user) {
    res.status(403).send(statusCodes[403]);
  }
  const user = await usersService.getUserById(req.user._id);
  if (!user) {
    res.status(403).send(statusCodes[403]);
  } else {
    const token = webToken.createToken(user);
    res.send({ user, token });
  }
});

module.exports = { authRouter: router, authenticate };
