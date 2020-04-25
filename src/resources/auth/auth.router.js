const router = require('express').Router();

const User = require('../users/user.model');
const usersService = require('../users/user.service');
const authService = require('./auth.service');
// const { JWT_SECRET_KEY } = require('../../common/config');
const myCrypt = require('../../helpers/myCrypt');
// const jwt = require('jsonwebtoken');

router.route('/').post(authService.authenticateLocal, (req, res) => {
  // res.redirect('/');
  const user = usersService.getUserById(res.id);
  if (!user) {
    res.status(401).send('bad');
  } else {
    const token = myCrypt.createToken();
    res.send(token);
  }
});

module.exports = router;
