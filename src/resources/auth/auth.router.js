const router = require('express').Router();

const User = require('../users/user.model');
const usersService = require('../users/user.service');
const authService = require('./auth.service');
// const { JWT_SECRET_KEY } = require('../../common/config');
const myCrypt = require('../../helpers/myCrypt');
const passport = require('passport');
// const jwt = require('jsonwebtoken');

router.route('/').post(authService.authenticateLocal, async (req, res) => {
  // res.redirect('/');
  console.log(`after local str =${req.user._id}`);
  const user = await usersService.getUserById(req.user._id);
  if (!user) {
    console.log('before 401');
    res.status(401).send('bad');
  } else {
    console.log(`before create token ${user}`);
    const token = myCrypt.createToken(user);
    req.header('Authorization', `Bearer ${token}`);
    res.header('Authorization', `Bearer ${token}`);
    res.header('x-access-token', `Bearer ${token}`);
    console.log(`post token str =${token}`);
    res.send({ user, token });

    // res.writeHead(200, { Authorization: `Bearer ${token}` }).send(token);
  }
}); /*
router.route('/').post((req, res) => {
  // res.redirect('/');
  console.log('after local str');
  const user = usersService.getUserById(req.body.id);
  if (!user) {
    console.log('before 401');
    res.status(401).send('bad');
  } else {
    console.log('before create token');
    // const token = myCrypt.createToken();
    // res.send(token);
    res.send('of');
  }
  // res.send('of');
});*/

module.exports = router;
