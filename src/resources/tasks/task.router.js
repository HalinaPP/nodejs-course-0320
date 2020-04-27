const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const statusCodes = require('./task.constants.js');
const { ErrorHandler, catchError } = require('./../../helpers/errorHandler');
const { isUUID } = require('./../../helpers/validator');
const HttpStatus = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res, next) => {
      const boardId = req.params.boardId;
      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const tasks = await tasksService.getAll(boardId);
      if (!tasks) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].all;
        res.contentType = 'application/json';
        res
          .json(tasks.map(Task.toResponse))
          .status(HttpStatus.OK)
          .end();
      }
      next();
    })
  )

  .post(
    catchError(async (req, res, next) => {
      const newTask = req.body;
      const boardId = req.params.boardId;
      if (!boardId || !isUUID(boardId)) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const task = await tasksService.createTask(newTask, boardId);

      res.statusMessage = statusCodes[HttpStatus.OK].create;
      res.contentType = 'application/json';
      res
        .json(Task.toResponse(task))
        .status(HttpStatus.OK)
        .end();
      next();
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res, next) => {
      const boardId = req.params.boardId;
      const taskId = req.params.id;
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const task = await tasksService.getTaskById(taskId, boardId);
      if (!task) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].all;
        res.contentType = 'application/json';
        res
          .json(Task.toResponse(task))
          .status(HttpStatus.OK)
          .end();
      }
      next();
    })
  )

  .put(
    catchError(async (req, res, next) => {
      const newTaskData = req.body;
      const boardId = req.params.boardId;
      const taskId = req.params.id;
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const task = await tasksService.updateTaskById(
        taskId,
        newTaskData,
        boardId
      );

      if (!task) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.OK].update;
        res.contentType = 'application/json';
        res
          .json(Task.toResponse(task))
          .status(HttpStatus.OK)
          .end();
      }
      next();
    })
  )

  .delete(
    catchError(async (req, res, next) => {
      const boardId = req.params.boardId;
      const taskId = req.params.id;
      if (!boardId || !isUUID(boardId) || !taskId || !isUUID(taskId)) {
        throw new ErrorHandler(HttpStatus.BAD_REQUEST);
      }

      const deleteCount = await tasksService.deleteTaskById(taskId, boardId);
      if (deleteCount === 0) {
        throw new ErrorHandler(
          HttpStatus.NOT_FOUND,
          statusCodes[HttpStatus.NOT_FOUND]
        );
      } else {
        res.statusMessage = statusCodes[HttpStatus.NO_CONTENT];
        res.status(HttpStatus.NO_CONTENT).end();
      }
      next();
    })
  );

module.exports = router;
