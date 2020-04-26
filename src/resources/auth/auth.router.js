const router = require('express').Router();
const usersService = require('../users/user.service');
const authService = require('./auth.service');
const myCrypt = require('../../helpers/myCrypt');
const statusCodes = require('../users/user.constants');

router.route('/').post(authService.authenticateLocal, async (req, res) => {
  if (!req.user) {
    res.status(403).send(statusCodes[403]);
  }
  const user = await usersService.getUserById(req.user._id);
  if (!user) {
    res.status(403).send(statusCodes[403]);
  } else {
    const token = myCrypt.createToken(user);
    res.send({ user, token });
  }
});

module.exports = router;
