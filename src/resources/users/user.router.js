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
    .catch(() => {
      res.status(400).send();
    });
});

router.route('/:id').get(async (req, res) => {
  await usersService
    .getUserById(req.params.id)
    .then(user => {
      if (user[0] === 404) {
        res.statusMessage = statusCodes[404];
        res.status(404).end();
      } else {
        res.statusMessage = statusCodes[200];
        res
          .json(user.map(User.toResponse)[0])
          .status(status)
          .set('Content-Type', 'application/json')
          .end();
      }
    })
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/').post(async (req, res) => {
  const newUser = req.body;
  await usersService
    .setUser(newUser)
    .then(user => {
      res.statusMessage = statusCodes[200].update;
      res
        .json(user.map(User.toResponse)[0])
        .status(status)
        .set('Content-Type', 'application/json')
        .end();
    })
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').put(async (req, res) => {
  const newUserData = req.body;

  await usersService
    .updateUserById(req.params.id, newUserData)
    .then(user => {
      if (user[0] === 404) {
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
    .catch(() => {
      res.statusMessage = statusCodes[400];
      res.status(400).end();
    });
});

router.route('/:id').delete(async (req, res) => {
  const statusNum = await usersService.deleteUserById(req.params.id);
  res.statusMessage = statusCodes[statusNum];
  res.status(statusNum).end();
});

module.exports = router;
