const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const statusCodes = require('./user.constants.js');
const { ErrorHandler } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');

/* const catchErrors = fn => async (res, req, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};
const fun = async (req, res) => {
  const userId = req.params.id;
  console.log('not');
  if (!userId || !isUUID(userId)) {
    console.log('not');
    throw new ErrorHandler(400, statusCodes[400]);
  }
  const statusNum = await usersService.deleteUserById(userId);
  if (statusNum === 404) {
    console.log('notw');
    throw new ErrorHandler(404, statusCodes[404]);
  } else {
    res.statusMessage = statusCodes[statusNum];
    res.status(statusNum).end();
  }
};*/
router
  .route('/')
  .get(async (req, res, next) => {
    res.statusMessage = statusCodes[200].all;
    res.contentType = 'application/json';
    try {
      const users = await usersService.getAll();
      res
        .json(users.map(User.toResponse))
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  })

  .post(async (req, res, next) => {
    try {
      const newUser = req.body;
      const user = await usersService.setUser(newUser);
      res.statusMessage = statusCodes[200].update;
      res
        .json(user.map(User.toResponse)[0])
        .status(status)
        .set('Content-Type', 'application/json')
        .end();
    } catch (error) {
      res.statusMessage = statusCodes[400];
      next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const userId = req.params.id;

      if (!userId || !isUUID(userId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const user = await usersService.getUserById(userId);
      if (!user[0]) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200];
        res.contentType = 'application/json';
        res
          .json(user.map(User.toResponse)[0])
          .status(200)
          .end();
      }
    } catch (error) {
      next(error);
    }
  })

  .put(async (req, res, next) => {
    try {
      const newUserData = req.body;
      const userId = req.params.id;

      if (!userId || !isUUID(userId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }
      const user = await usersService.updateUserById(userId, newUserData);

      if (!user[0]) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].update;
        res.contentType = 'application/json';
        res
          .json(user.map(User.toResponse))
          .status(200)
          .end();
      }
    } catch (error) {
      next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const userId = req.params.id;

      if (!userId || !isUUID(userId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }
      const statusNum = await usersService.deleteUserById(userId);
      if (statusNum === 404) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[statusNum];
        res.status(statusNum).end();
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
