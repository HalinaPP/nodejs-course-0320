const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const statusCodes = require('./user.constants.js');
const { ErrorHandler, catchError } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');

router
  .route('/')
  .get(
    catchError(async (req, res, next) => {
      const users = await usersService.getAll();
      res.statusMessage = statusCodes[200].all;
      res.contentType = 'application/json';
      res
        .json(users.map(User.toResponse))
        .status(200)
        .end();
      next();
    })
  )

  .post(
    catchError(async (req, res, next) => {
      const newUser = req.body;
      const user = await usersService.setUser(newUser);

      res.statusMessage = statusCodes[200].update;
      res.contentType = 'application/json';
      res
        .json(User.toResponse(user))
        .status(200)
        .end();
      next();
    })
  );

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const userId = req.params.id;
      if (!userId || !isUUID(userId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }
      const user = await usersService.getUserById(userId);

      if (!user) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].all;
        res.contentType = 'application/json';
        res
          .json(User.toResponse(user))
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

      if (!user) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[200].update;
        res.contentType = 'application/json';
        res
          .json(User.toResponse(user))
          .status(200)
          .end();
      }
    } catch (error) {
      return next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const userId = req.params.id;

      if (!userId || !isUUID(userId)) {
        throw new ErrorHandler(400, statusCodes[400]);
      }

      const deleteCount = await usersService.deleteUserById(userId);

      if (deleteCount === 0) {
        throw new ErrorHandler(404, statusCodes[404]);
      } else {
        res.statusMessage = statusCodes[204];
        res.status(204).end();
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
