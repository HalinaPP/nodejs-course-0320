const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const statusCodes = require('./constants.js');
/** mergeParams */
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.set('Content-Type', 'application/json');
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.set('Content-Type', 'application/json');
  res.json(user.map(User.toResponse)[0]);
});

router.route('/').post(async (req, res) => {
  const newUser = req.body;
  const user = await usersService.setUser(newUser);
  res.set('Content-Type', 'application/json');
  res.json(user.map(User.toResponse)[0]);
});

router.route('/:id').put(async (req, res) => {
  const newUserData = req.body;
  const user = await usersService.updateUserById(req.params.id, newUserData);
  res.set('Content-Type', 'application/json');
  res.json(user.map(User.toResponse)[0]);
});

router.route('/:id').delete(async (req, res) => {
  const statusNum = await usersService.deleteUserById(req.params.id);
  res.statusMessage = statusCodes[statusNum];
  res.status(statusNum).end();

  // res.end(statusCodes[status]);
  // res.end('err');
});

module.exports = router;
