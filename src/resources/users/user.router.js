const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const statusCodes = require('./user.constants.js');

router.route('/').get(async (req, res) => {
  const status = 200;
  res.statusMessage = statusCodes[status].all;
  await usersService
    .getAll()
    .then(users =>
      res
        .json(users.map(User.toResponse))
        .status(status)
        .set('Content-Type', 'application/json')
        .end()
    )
    .catch(err => {
      res.status(400).send(err);
    });
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  res.set('Content-Type', 'application/json');
  res.json(user.map(User.toResponse)[0]);
  /*
  if (user[1] === 200) {
    res.statusMessage = statusCodes[user[1]].all;
    res
      .json(user[0].map(User.toResponse)[0])
      .status(user[1])
      .end();
  } else {
    res.statusMessage = statusCodes[user[1]];
    res.status(user[1]).end();
  }*/
});

router.route('/').post(async (req, res) => {
  const newUser = req.body;
  const user = await usersService.setUser(newUser);
  res.set('Content-Type', 'application/json');
  res.json(user.map(User.toResponse)[0]);
});

router.route('/:id').put(async (req, res) => {
  const newUserData = req.body;

  await usersService
    .updateUserById(req.params.id, newUserData)
    .then(user => {
      if (user === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200].update;
        res
          .json(user.map(User.toResponse))
          .status(status)
          .set('Content-Type', 'application/json')
          .end();
      }
    })
    .catch(err => {
      res.statusMessage = statusCodes[400];
      res.status(400).end(err);
    });
});

router.route('/:id').delete(async (req, res) => {
  const statusNum = await usersService.deleteUserById(req.params.id);
  res.statusMessage = statusCodes[statusNum];
  res.status(statusNum).end();
});

module.exports = router;
